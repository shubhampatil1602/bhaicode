import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SignupSchema } from "@/zodSchemas/auth";
import ErrorMessage from "./ErrorMessage";

export const Signup = ({ className, ...props }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(SignupSchema),
  });

  const onSubmit = async (data) => {
    console.log(data);
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

        <Button type='submit' className='w-full'>
          Register
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
