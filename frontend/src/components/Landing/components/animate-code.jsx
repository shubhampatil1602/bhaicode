import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export function AnimatedCode({
  code,
  language = "javascript",
  delay = 0,
  speed = 50,
}) {
  const [displayedCode, setDisplayedCode] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setTimeout(
      () => {
        if (currentIndex < code.length) {
          setDisplayedCode(code.slice(0, currentIndex + 1));
          setCurrentIndex(currentIndex + 1);
        }
      },
      currentIndex === 0 ? delay : speed
    );

    return () => clearTimeout(timer);
  }, [currentIndex, code, delay, speed]);

  return (
    <div className='bg-white shadow-2xl rounded-2xl dark:bg-transparent dark:border-neutral-950 dark:border-[1.5rem] p-6 dark:p-0 text-left max-w-2xl mx-auto my-14'>
      <motion.div
        className='bg-slate-950 dark:bg-transparent backdrop-blur-sm border border-gray-700/50 rounded-lg p-4 font-mono text-xs sm:text-sm overflow-hidden h-[21rem]'
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: delay / 1000 }}
      >
        <div className='flex items-center justify-between mb-3'>
          <div className='flex space-x-2'>
            <div className='w-3 h-3 bg-red-500 rounded-full'></div>
            <div className='w-3 h-3 bg-yellow-500 rounded-full'></div>
            <div className='w-3 h-3 bg-green-500 rounded-full'></div>
          </div>
          <span className='text-gray-400 text-xs uppercase'>{language}</span>
        </div>
        <pre className='text-gray-300'>
          <code className='block leading-6'>
            {displayedCode}
            <motion.span
              className='inline-block w-2 h-5 bg-blue-400 align-middle'
              animate={{ opacity: [1, 0, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
            />
          </code>
        </pre>
      </motion.div>
    </div>
  );
}
