import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";

import { cn } from "@/lib/utils";
import { useAuthStore } from "@/store/useAuthStore";
import { SignupSchema } from "@/zodSchemas/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ErrorMessage } from "./ErrorMessage";
import { Loader } from "lucide-react";

export const Signup = ({ className, ...props }) => {
  const [singnUpLoader, setSignUpLoader] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(SignupSchema),
  });

  const { signUp } = useAuthStore();

  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      setSignUpLoader(true);
      const result = await signUp(data);
      if (result.success) {
        navigate("/");
      }
    } catch (err) {
      console.error(err);
    } finally {
      setSignUpLoader(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={cn("flex flex-col gap-6", className)}
      {...props}
    >
      <div className='flex flex-col items-center gap-2 text-center'>
        <h1 className='text-2xl font-bold'>Welcome to Bhaicode</h1>
        <p className='text-muted-foreground text-sm text-balance'>
          Enter your details below to create your account
        </p>
      </div>

      <div className='grid gap-6'>
        <div className='grid gap-3'>
          <Label htmlFor='name'>Name</Label>
          <Input
            id='name'
            type='text'
            {...register("name")}
            placeholder='John Dow'
            required
          />
        </div>
        {errors.name && <ErrorMessage message={errors.name.message} />}
        <div className='grid gap-3'>
          <Label htmlFor='email'>Email</Label>
          <Input
            id='email'
            type='email'
            {...register("email")}
            placeholder='john@example.com'
            required
          />
        </div>
        {errors.email && <ErrorMessage message={errors.email.message} />}
        <div className='grid gap-3'>
          <Label htmlFor='password'>Password</Label>
          <Input
            id='password'
            type='password'
            required
            {...register("password")}
          />
        </div>
        {errors.password && <ErrorMessage message={errors.password.message} />}

        <Button
          disabled={singnUpLoader}
          type='submit'
          className='w-full disabled:pointer-events-none disabled:cursor-not-allowed transition-all duration-300 ease-in-out hover:bg-primary/80 hover:text-primary-foreground'
        >
          {singnUpLoader && (
            <Loader className='animate-spin h-5 w-5 text-white' />
          )}{" "}
          Sign Up
        </Button>
      </div>
      <div className='text-center text-sm'>
        Already have an account?{" "}
        <Link to='/signin' className='underline underline-offset-4'>
          Sign In
        </Link>
      </div>
    </form>
  );
};
