import { type FunctionComponent } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import LayoutAuthPage from "./layout-auth";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { AiFillFacebook, AiFillGoogleCircle } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

import authenService from "@/services/authen.service";
import { formRegisterSchema } from "@/lib/validator";

const RegisterPage: FunctionComponent = () => {
  const navigate = useNavigate();

  const form = useForm<z.infer<typeof formRegisterSchema>>({
    resolver: zodResolver(formRegisterSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formRegisterSchema>) {
    try {
      const res = await authenService.register(values);
      const token = res.data.data.otpToken;
      sessionStorage.setItem("email", values.email);
      toast.message("Register success, please verify OTP");
      navigate(`/auth/verify-otp?token=${token}`);
    } catch (error) {
      toast.error("Register failed");
    }
  }

  return (
    <LayoutAuthPage>
      <div className="absolute inset-0 bg-black/60" />

      <div className="relative z-10 w-full max-w-md bg-white/10 backdrop-blur-lg rounded-2xl shadow-lg p-8">
        <h2 className="text-3xl font-bold text-center text-white mb-6">
          Create Account
        </h2>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Email"
                      className="bg-transparent text-white placeholder:text-gray-300 border-b border-gray-500 rounded-none focus:ring-0 focus:border-blue-400"
                    />
                  </FormControl>
                  <FormMessage className="text-red-400 text-sm" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      {...field}
                      type="password"
                      placeholder="Password"
                      className="bg-transparent text-white placeholder:text-gray-300 border-b border-gray-500 rounded-none focus:ring-0 focus:border-blue-400"
                    />
                  </FormControl>
                  <FormMessage className="text-red-400 text-sm" />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded-lg"
            >
              Register
            </Button>

            <div className="text-center text-gray-300">
              Already have an account?
              <Button
                variant="link"
                className="text-blue-400 hover:underline ml-1"
                onClick={() => navigate("/login")}
              >
                Login
              </Button>
            </div>

            <div className="flex gap-4 mt-4">
              <Button
                type="button"
                className="flex-1 flex items-center gap-2 bg-transparent border border-white/50 text-white hover:bg-white/10"
              >
                <AiFillGoogleCircle size={20} /> Google
              </Button>
              <Button
                type="button"
                className="flex-1 flex items-center gap-2 bg-transparent border border-white/50 text-white hover:bg-white/10"
              >
                <AiFillFacebook size={20} /> Facebook
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </LayoutAuthPage>
  );
};

export default RegisterPage;
