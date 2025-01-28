"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, FieldValues, SubmitHandler } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { authApi } from "@/lib/api";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowRight } from "lucide-react";

const registerSchema = z
  .object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

export default function RegisterPage() {
  const { toast } = useToast();
  const router = useRouter();
  const form = useForm({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    try {
      await authApi.register(data.name, data.email, data.password);
      toast({
        title: "Success",
        description: "Registration successful! Please login.",
      });
      router.push("/login");
    } catch (error) {
      console.error(error)
      toast({
        variant: "destructive",
        title: "Error",
        description: "Registration failed. Please try again.",
      });
    }
  };

  return (
    <div className="w-full max-w-md space-y-8 relative">
      <div className="absolute inset-0 bg-emerald-500/10 blur-3xl rounded-full" />

      <div className="relative bg-[#0F172A] p-8 rounded-2xl shadow-2xl border border-[#334155]">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Create Account</h1>
          <p className="text-gray-400">
            Join FinTrack to manage your finances better
          </p>
        </div>

        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <Input
              {...form.register("name")}
              placeholder="Full Name"
              className={`bg-[#1E293B] border-[#334155] text-white placeholder:text-gray-400 ${
                form.formState.errors.name
                  ? "border-red-500"
                  : "focus:border-emerald-500"
              }`}
            />
            {form.formState.errors.name && (
              <p className="text-red-500 text-sm mt-1">
                {form.formState.errors.name.message?.toString()}
              </p>
            )}
          </div>

          <div>
            <Input
              {...form.register("email")}
              type="email"
              placeholder="Email"
              className={`bg-[#1E293B] border-[#334155] text-white placeholder:text-gray-400 ${
                form.formState.errors.email
                  ? "border-red-500"
                  : "focus:border-emerald-500"
              }`}
            />
            {form.formState.errors.email && (
              <p className="text-red-500 text-sm mt-1">
                {form.formState.errors.email.message?.toString()}
              </p>
            )}
          </div>

          <div>
            <Input
              {...form.register("password")}
              type="password"
              placeholder="Password"
              className={`bg-[#1E293B] border-[#334155] text-white placeholder:text-gray-400 ${
                form.formState.errors.password
                  ? "border-red-500"
                  : "focus:border-emerald-500"
              }`}
            />
            {form.formState.errors.password && (
              <p className="text-red-500 text-sm mt-1">
                {form.formState.errors.password.message?.toString()}
              </p>
            )}
          </div>

          <div>
            <Input
              {...form.register("confirmPassword")}
              type="password"
              placeholder="Confirm Password"
              className={`bg-[#1E293B] border-[#334155] text-white placeholder:text-gray-400 ${
                form.formState.errors.confirmPassword
                  ? "border-red-500"
                  : "focus:border-emerald-500"
              }`}
            />
            {form.formState.errors.confirmPassword && (
              <p className="text-red-500 text-sm mt-1">
                {form.formState.errors.confirmPassword.message?.toString()}
              </p>
            )}
          </div>

          <Button
            type="submit"
            className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-6"
            disabled={form.formState.isSubmitting}
          >
            {form.formState.isSubmitting ? (
              "Processing..."
            ) : (
              <>
                Create Account
                <ArrowRight className="ml-2 h-4 w-4" />
              </>
            )}
          </Button>
        </form>

        <p className="mt-6 text-center text-gray-400">
          Already have an account?{" "}
          <Link
            href="/login"
            className="text-emerald-500 hover:text-emerald-400"
          >
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
