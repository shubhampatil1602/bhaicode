import { motion } from "motion/react";
import { ArrowRight, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { EnhancedGrid } from "./enhanced-grid";
import { Heading } from "@/components/heading";
import { SubHeading } from "@/components/SubHeading";
import { SectionHeading } from "@/components/SectionHeading";
import { AnimatedCode } from "./animate-code";
import { CODE_SNIPPET } from "../constants";

export const Hero = () => {
  return (
    <EnhancedGrid className='pt-24 pb-12 lg:pt-36 lg:pb-20'>
      <div className='container mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='text-center max-w-4xl mx-auto'>
          <motion.div
            className='flex justify-center items-center pt-3 pb-8'
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <SectionHeading>🚀 Trusted by undefined devs</SectionHeading>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <Heading>
              Master Coding Interviews with{" "}
              <span className='text-primary'>AI-Powered</span> Practice
            </Heading>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <SubHeading>
              Get personalized coding challenges, real-time feedback, and
              detailed analytics to land your dream job at top tech companies.
            </SubHeading>
          </motion.div>

          <motion.div
            className='flex flex-col sm:flex-row gap-4 justify-center items-center'
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <Button
              size='lg'
              className='bg-primary hover:bg-primary/90 text-lg px-8 py-3'
            >
              <Link to='/all-problems'>Start Free Trial</Link>
              <ArrowRight className='ml-2 h-5 w-5' />
            </Button>
            <Button variant='outline' size='lg' className='text-lg px-8 py-3'>
              <Play className='mr-2 h-5 w-5' />
              Watch Demo
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <AnimatedCode code={CODE_SNIPPET.code} />
          </motion.div>
        </div>
      </div>
    </EnhancedGrid>
  );
};
