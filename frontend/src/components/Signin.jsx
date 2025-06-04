import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";

import { cn } from "@/lib/utils";
import { useAuthStore } from "@/store/useAuthStore";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SigninSchema } from "@/zodSchemas/auth";
import { ErrorMessage } from "./ErrorMessage";
import { Loader } from "lucide-react";

export const Signin = ({ className, ...props }) => {
  const [signInLoader, setSignInLoader] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(SigninSchema),
  });

  const { signIn } = useAuthStore();

  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      setSignInLoader(true);
      signIn(data);
      navigate("/");
    } catch (err) {
      console.error(err);
    } finally {
      setSignInLoader(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={cn("flex flex-col gap-6", className)}
      {...props}
    >
      <div className='flex flex-col items-center gap-2 text-center'>
        <h1 className='text-2xl font-bold'>Welcome back to Bhaicode</h1>
        <p className='text-muted-foreground text-sm text-balance'>
          Enter your details below
        </p>
      </div>

      <div className='grid gap-6'>
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
          disabled={signInLoader}
          type='submit'
          className='w-full disabled:pointer-events-none disabled:cursor-not-allowed transition-all duration-300 ease-in-out hover:bg-primary/80 hover:text-primary-foreground'
        >
          {signInLoader && (
            <Loader className='animate-spin h-5 w-5 text-white' />
          )}{" "}
          Sign In
        </Button>
      </div>
      <div className='text-center text-sm'>
        Don&apos;t have an account?{" "}
        <Link to='/signup' className='underline underline-offset-4'>
          Sign Up
        </Link>
      </div>
    </form>
  );
};
