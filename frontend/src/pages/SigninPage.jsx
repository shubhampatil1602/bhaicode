import { Link } from "react-router-dom";

import { Signin } from "@/components/Signin";
import { CodeBg } from "@/components/CodeBg";
import { Code2 } from "lucide-react";

const SigninPage = () => {
  return (
    <div className='grid min-h-svh w-full lg:grid-cols-2'>
      <div className='flex flex-col gap-4 p-6 md:p-10'>
        <div className='flex justify-center gap-2 md:justify-start'>
          <Link to='/' className='flex items-center gap-2 font-medium'>
            <div className='bg-primary text-primary-foreground flex size-6 items-center justify-center rounded-md'>
              <Code2 className='size-4' />
            </div>
            Bhaicode
          </Link>
        </div>
        <div className='flex flex-1 items-center justify-center'>
          <div className='w-full max-w-xs'>
            <Signin />
          </div>
        </div>
      </div>
      <div className='h-full w-full relative hidden lg:block'>
        <CodeBg
          title={"Welcome back to our platform"}
          subtitle={
            "Sign In to access our platform and start using our services"
          }
        />
      </div>
    </div>
  );
};

export default SigninPage;
