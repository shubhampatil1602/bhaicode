import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import React, { useRef, useState, useEffect } from "react";

export function EnhancedGrid({ className, children }) {
  const containerRef = useRef(null);
  const parentRef = useRef(null);

  // Define beams that align with grid lines (every 50px based on your grid pattern)
  const beams = [
    // Left side beams
    {
      initialX: 50,
      translateX: 50,
      duration: 10,
      repeatDelay: 4,
      delay: 0,
    },
    {
      initialX: 150,
      translateX: 150,
      duration: 12,
      repeatDelay: 6,
      delay: 0,
    },
    {
      initialX: 250,
      translateX: 250,
      duration: 14,
      repeatDelay: 5,
      delay: 0.5,
      className: "h-8",
    },
    // Right side beams
    {
      initialX: 1200,
      translateX: 1200,
      duration: 10,
      repeatDelay: 4,
      delay: 0,
    },
    {
      initialX: 1300,
      translateX: 1300,
      duration: 12,
      repeatDelay: 6,
      delay: 0,
    },
    {
      initialX: 1400,
      translateX: 1400,
      duration: 14,
      repeatDelay: 5,
      delay: 0.5,
      className: "h-8",
    },
  ];

  return (
    <div ref={parentRef} className={cn("relative overflow-hidden", className)}>
      {/* Main grid background */}
      <div className='absolute inset-0 z-0'>
        <svg
          className='absolute inset-0 h-full w-full'
          xmlns='http://www.w3.org/2000/svg'
        >
          <defs>
            <pattern
              id='grid'
              width='50'
              height='50'
              patternUnits='userSpaceOnUse'
            >
              <path
                d='M 50 0 L 0 0 0 50'
                fill='none'
                stroke='currentColor'
                strokeWidth='1.5'
                className='text-border opacity-40'
              />
            </pattern>
            <pattern
              id='smallGrid'
              width='8'
              height='8'
              patternUnits='userSpaceOnUse'
            >
              <path
                d='M 8 0 L 0 0 0 8'
                fill='none'
                stroke='currentColor'
                strokeWidth='0.5'
                className='text-border opacity-10'
              />
            </pattern>
          </defs>
          <rect width='100%' height='100%' fill='url(#smallGrid)' />
          <rect width='100%' height='100%' fill='url(#grid)' />
        </svg>

        {/* Animated beams with collision detection */}
        {beams.map((beam) => (
          <CollisionMechanism
            key={beam.initialX + "beam-idx"}
            beamOptions={beam}
            containerRef={containerRef}
            parentRef={parentRef}
          />
        ))}

        {/* Gradient overlays */}
        <div className='absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-primary/20 dark:from-primary/5 dark:to-primary/10' />

        {/* Animated highlights */}
        <motion.div
          className='absolute top-1/3 left-1/4 w-64 h-64 bg-primary/10 rounded-full blur-3xl'
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 6,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className='absolute bottom-1/3 right-1/4 w-48 h-48 bg-primary/15 rounded-full blur-2xl'
          animate={{
            scale: [1.1, 1, 1.1],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 4,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
            delay: 2,
          }}
        />
      </div>

      {/* Collision floor */}
      <div
        ref={containerRef}
        className='absolute bottom-0 w-full h-px pointer-events-none z-10'
      />

      <div className='relative z-20'>{children}</div>
    </div>
  );
}

const CollisionMechanism = React.forwardRef(
  ({ parentRef, containerRef, beamOptions = {} }) => {
    const beamRef = useRef(null);
    const [collision, setCollision] = useState({
      detected: false,
      coordinates: null,
    });
    const [beamKey, setBeamKey] = useState(0);
    const [cycleCollisionDetected, setCycleCollisionDetected] = useState(false);

    useEffect(() => {
      const checkCollision = () => {
        if (
          beamRef.current &&
          containerRef.current &&
          parentRef.current &&
          !cycleCollisionDetected
        ) {
          const beamRect = beamRef.current.getBoundingClientRect();
          const containerRect = containerRef.current.getBoundingClientRect();
          const parentRect = parentRef.current.getBoundingClientRect();

          if (beamRect.bottom >= containerRect.top) {
            const relativeX =
              beamRect.left - parentRect.left + beamRect.width / 2;
            const relativeY = beamRect.bottom - parentRect.top;

            setCollision({
              detected: true,
              coordinates: {
                x: relativeX,
                y: relativeY,
              },
            });
            setCycleCollisionDetected(true);
          }
        }
      };

      const animationInterval = setInterval(checkCollision, 50);

      return () => clearInterval(animationInterval);
    }, [cycleCollisionDetected, containerRef]);

    useEffect(() => {
      if (collision.detected && collision.coordinates) {
        setTimeout(() => {
          setCollision({ detected: false, coordinates: null });
          setCycleCollisionDetected(false);
        }, 2000);

        setTimeout(() => {
          setBeamKey((prevKey) => prevKey + 1);
        }, 2000);
      }
    }, [collision]);

    return (
      <>
        <motion.div
          key={beamKey}
          ref={beamRef}
          animate='animate'
          initial={{
            translateY: beamOptions.initialY || "-200px",
            translateX: beamOptions.initialX || "0px",
            rotate: beamOptions.rotate || 0,
          }}
          variants={{
            animate: {
              translateY: beamOptions.translateY || "1800px",
              translateX: beamOptions.translateX || "0px",
              rotate: beamOptions.rotate || 0,
            },
          }}
          transition={{
            duration: beamOptions.duration || 8,
            repeat: Infinity,
            repeatType: "loop",
            ease: "linear",
            delay: beamOptions.delay || 0,
            repeatDelay: beamOptions.repeatDelay || 0,
          }}
          className={cn(
            "absolute left-0 top-0 m-auto h-14 w-px rounded-full bg-gradient-to-t from-primary via-primary/80 to-transparent shadow-lg",
            beamOptions.className
          )}
          style={{
            boxShadow:
              "0 0 8px rgb(var(--primary) / 0.6), 0 0 16px rgb(var(--primary) / 0.3)",
          }}
        />
        <AnimatePresence>
          {collision.detected && collision.coordinates && (
            <Explosion
              key={`${collision.coordinates.x}-${collision.coordinates.y}`}
              className=''
              style={{
                left: `${collision.coordinates.x}px`,
                top: `${collision.coordinates.y}px`,
                transform: "translate(-50%, -50%)",
              }}
            />
          )}
        </AnimatePresence>
      </>
    );
  }
);

CollisionMechanism.displayName = "CollisionMechanism";

const Explosion = ({ ...props }) => {
  const spans = Array.from({ length: 20 }, (_, index) => ({
    id: index,
    initialX: 0,
    initialY: 0,
    directionX: Math.floor(Math.random() * 80 - 40),
    directionY: Math.floor(Math.random() * -50 - 10),
  }));

  return (
    <div {...props} className={cn("absolute z-50 h-2 w-2", props.className)}>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className='absolute -inset-x-10 top-0 m-auto h-2 w-10 rounded-full bg-gradient-to-r from-transparent via-primary to-transparent blur-sm'
      />
      {spans.map((span) => (
        <motion.span
          key={span.id}
          initial={{ x: span.initialX, y: span.initialY, opacity: 1 }}
          animate={{
            x: span.directionX,
            y: span.directionY,
            opacity: 0,
          }}
          transition={{ duration: Math.random() * 1.5 + 0.5, ease: "easeOut" }}
          className='absolute h-1 w-1 rounded-full bg-gradient-to-b from-primary to-primary/60'
        />
      ))}
    </div>
  );
};
