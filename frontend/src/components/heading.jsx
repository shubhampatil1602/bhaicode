import { motion } from "motion/react";
import { cn } from "@/lib/utils";

export function Heading({ children, className }) {
  return (
    <div className='flex flex-col sm:flex-row sm:items-center'>
      <motion.div
        initial={{
          opacity: 0,
          filter: "blur(10px)",
          y: 10,
        }}
        whileInView={{
          opacity: 1,
          filter: "blur(0px)",
          y: 0,
        }}
        transition={{
          duration: 0.3,
          ease: "easeInOut",
          delay: 0.1,
        }}
        viewport={{ once: true }}
      >
        <h1
          className={cn(
            "px-4 text-2xl font-bold tracking-tight drop-shadow-lg md:text-6xl",
            className
          )}
        >
          {children}
        </h1>
      </motion.div>
    </div>
  );
}
