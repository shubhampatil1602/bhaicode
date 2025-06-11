import { motion } from "motion/react";

import { cn } from "@/lib/utils";

export function SubHeading({ children, className }) {
  return (
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
        delay: 0.2,
      }}
      viewport={{ once: true }}
    >
      <h3
        className={cn(
          "max-w-[38rem] px-4 py-8 text-sm md:text-lg mx-auto",
          className
        )}
      >
        {children}
      </h3>
    </motion.div>
  );
}
