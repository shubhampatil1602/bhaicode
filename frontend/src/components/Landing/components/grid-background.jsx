import React from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

export function GridBackground({ className, children, pattern = "grid" }) {
  const patternClass =
    pattern === "grid" ? "bg-grid-pattern" : "bg-dot-pattern";

  return (
    <div className={cn("relative overflow-hidden", className)}>
      <div className='absolute inset-0 z-0'>
        <div className={cn("absolute inset-0", patternClass)} />
        <div className='absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-primary/5 dark:to-primary/10' />
      </div>
      <div className='relative z-10'>{children}</div>
    </div>
  );
}

export function HeroGridBackground({ className, children }) {
  return (
    <div className={cn("relative overflow-hidden", className)}>
      <div className='absolute inset-0 z-0'>
        <div className='absolute inset-0 bg-grid-pattern' />
        <motion.div
          className='absolute inset-0 bg-gradient-to-br from-primary/10 dark:from-primary/5 via-transparent to-transparent'
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5 }}
        />
        <motion.div
          className='absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-background via-background/50 to-transparent'
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5, delay: 0.5 }}
        />
        {/* Add some animated grid highlights */}
        <motion.div
          className='absolute top-1/4 left-1/4 w-32 h-32 bg-primary/20 rounded-full blur-3xl'
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 4,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className='absolute top-3/4 right-1/3 w-24 h-24 bg-primary/15 rounded-full blur-2xl'
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.2, 0.5, 0.2],
          }}
          transition={{
            duration: 3,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
            delay: 1,
          }}
        />
      </div>
      <div className='relative z-10'>{children}</div>
    </div>
  );
}

export function DotBackground({ className, children }) {
  return (
    <div className={cn("relative overflow-hidden", className)}>
      <div className='absolute inset-0 z-0'>
        <div className='absolute inset-0 bg-dot-pattern' />
        <div className='absolute inset-0 bg-gradient-to-r from-transparent via-primary/5 to-transparent' />
      </div>
      <div className='relative z-10'>{children}</div>
    </div>
  );
}
