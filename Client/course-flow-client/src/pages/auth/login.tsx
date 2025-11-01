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
import { Checkbox } from "@/components/ui/checkbox";
import { AiFillFacebook, AiFillGoogleCircle } from "react-icons/ai";
import { useNavigate } from "react-router";
import { toast } from "sonner";

import authenService from "@/services/authen.service";
import { formSchema } from "@/lib/validator";
import { useAuth } from "@/contexts/auth-context";

const LoginPage: FunctionComponent = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const res = await authenService.login(values);
      const accessToken = res.data.data.accessToken;
      const refreshToken = res.data.data.refreshToken;
      const user = res.data.data.user;
      if (accessToken && refreshToken && user) {
        login({ user, accessToken: accessToken, refreshToken: refreshToken });
        navigate("/");
      } else {
        toast.error("Login failed. Please try again.");
      }
    } catch (e) {
      toast.error("An error occurred during login. Please try again.");
    }
  }

  return (
    <LayoutAuthPage>
      <div className="absolute inset-0 bg-black/60" />

      <div className="relative z-10 w-full max-w-md bg-white/10 backdrop-blur-lg rounded-2xl shadow-lg p-8">
        <h2 className="text-3xl font-bold text-center text-white mb-6">
          Welcome Back
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

            <div className="flex justify-between items-center text-sm text-gray-300">
              <div className="flex items-center gap-2">
                <Checkbox id="remember" />
                <label htmlFor="remember">Remember me</label>
              </div>
              <button
                type="button"
                className="hover:underline"
                onClick={() => navigate("/forgot-password")}
              >
                Forgot password?
              </button>
            </div>

            <Button
              type="submit"
              className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded-lg"
            >
              Login
            </Button>

            <div className="text-center text-gray-300">
              Don’t have an account?
              <Button
                variant="link"
                className="text-blue-400 hover:underline ml-1"
                onClick={() => navigate("/auth/register")}
              >
                Register
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

export default LoginPage;
