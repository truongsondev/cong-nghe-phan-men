import type { FunctionComponent } from "react";
import LayoutAuthPage from "./layout-auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import authenService from "@/services/authen.service";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";

const FormSchema = z.object({
  pin: z.string().min(6, {
    message: "Your one-time password must be 6 characters.",
  }),
});

const OtpPage: FunctionComponent = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [ttl, setTtl] = useState(60);
  const email = sessionStorage.getItem("email") || "";

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      pin: "",
    },
  });

  // fetch TTL from server
  useEffect(() => {
    const token = searchParams.get("token") || "";
    if (!token) {
      navigate("/");
      return;
    }
    const fetchTtl = async () => {
      try {
        const res = await authenService.getTTL(token);
        const data = res.data.data.ttl;
        setTtl(data);
      } catch (err) {
        toast.error(`${(err as Error).message}` || "Failed to fetch TTL");
        navigate("/auth/register");
      }
    };
    fetchTtl();
  }, [navigate, searchParams]);

  // countdown
  useEffect(() => {
    if (ttl <= 0) return;
    const timer = setInterval(() => {
      setTtl((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, [ttl]);

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    try {
      if (!email) {
        toast.error("Email not found. Please register first.");
        navigate("/register");
        return;
      }

      const otp = data.pin.replace(/\s/g, "");
      const res = await authenService.verifyOtp({ email, otp });
      if (res.status === 200) {
        toast.success("OTP verified successfully!");
        navigate("/auth/login");
      } else {
        toast.error("Failed to verify OTP. Please try again.");
      }
    } catch (error) {
      toast.error(`${(error as Error).message}` || "Failed to verify OTP");
    }
  }

  function handleResendOtp() {
    toast.success("OTP has been resent to your email!");
  }

  return (
    <LayoutAuthPage>
      <div className="absolute inset-0 bg-black/60" />

      <div className="relative z-10 w-full max-w-md bg-white/10 backdrop-blur-lg rounded-2xl shadow-lg p-8">
        <h2 className="text-3xl font-bold text-center text-white mb-6">
          Verify OTP
        </h2>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-6 text-white"
          >
            <FormField
              control={form.control}
              name="pin"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>One-Time Password</FormLabel>
                  <FormControl>
                    <InputOTP maxLength={6} {...field}>
                      <InputOTPGroup>
                        {Array.from({ length: 6 }).map((_, i) => (
                          <InputOTPSlot key={i} index={i} />
                        ))}
                      </InputOTPGroup>
                    </InputOTP>
                  </FormControl>
                  <FormDescription className="text-gray-300">
                    Please enter the OTP sent to your email.
                  </FormDescription>
                  <FormMessage className="text-red-400" />
                </FormItem>
              )}
            />

            <div className="flex items-center justify-between text-sm">
              {ttl > 0 ? (
                <span className="text-gray-300">
                  Resend available in{" "}
                  <span className="text-red-400 font-semibold">{ttl}s</span>
                </span>
              ) : (
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleResendOtp}
                  className="flex-1 flex items-center gap-2 bg-transparent border border-white/50 text-white hover:bg-white/10"
                >
                  Resend OTP
                </Button>
              )}
            </div>

            <Button
              type="submit"
              className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded-lg"
            >
              Submit
            </Button>
          </form>
        </Form>
      </div>
    </LayoutAuthPage>
  );
};

export default OtpPage;
