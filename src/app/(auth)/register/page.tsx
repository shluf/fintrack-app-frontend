'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, FieldValues, SubmitHandler } from 'react-hook-form';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { authApi } from '@/lib/api';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const registerSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(6),
  confirmPassword: z.string()
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

export default function RegisterPage() {
  const { toast } = useToast();
  const router = useRouter();
  const form = useForm({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    try {
      await authApi.register(data.name, data.email, data.password);
      toast({
        title: 'Success',
        description: 'Registration successful! Please login.',
      });
      router.push('/login');
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: `Registration failed. Please try again. ${error}`,
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold text-center">Register</h1>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <Input
            {...form.register('name')}
            placeholder="Full Name"
          />
          <Input
            {...form.register('email')}
            type="email"
            placeholder="Email"
          />
          <Input
            {...form.register('password')}
            type="password"
            placeholder="Password"
          />
          <Input
            {...form.register('confirmPassword')}
            type="password"
            placeholder="Confirm Password"
          />
          <Button type="submit" className="w-full">
            Register
          </Button>
        </form>
        <p className="text-center">
          Already have an account?{' '}
          <Link href="/login" className="text-blue-600 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}