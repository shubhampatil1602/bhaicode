import { useState } from "react";

import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
  useTransform,
} from "motion/react";

import { Link } from "react-router-dom";
import { IconMoon, IconSun } from "@tabler/icons-react";
import { useTheme } from "./ThemeProvider";
import { Code2 } from "lucide-react";
import { useAuthStore } from "@/store/useAuthStore";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LogoutButton } from "./LogoutButton";

export function Navbar() {
  const [hovered, setHovered] = useState(null);
  const [scrolled, setScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLogoHovered, setIsLogoHovered] = useState(false);

  const { setTheme, theme } = useTheme();
  const { authUser } = useAuthStore();

  const getNavItems = () => {
    if (!authUser) {
      return [
        {
          title: "Sign In",
          href: "/signin",
        },
        {
          title: "Sign Up",
          href: "/signup",
        },
        {
          title: "Github",
          href: "/",
        },
      ];
    } else {
      return [
        {
          title: "Contests",
          href: "/contests",
        },
        {
          title: "Github",
          href: "/",
        },
      ];
    }
  };

  const NAV_ITEMS = getNavItems();

  const { scrollY } = useScroll();

  const y = useTransform(scrollY, [0, 100], [0, 10]);
  const width = useTransform(scrollY, [0, 100], ["90%", "80%"]);

  useMotionValueEvent(scrollY, "change", (value) => {
    if (value > 20) {
      setScrolled(true);
    } else {
      setScrolled(false);
    }
  });

  return (
    <div className=''>
      <div className='fixed inset-x-0 top-4 z-50 mx-auto hidden w-max-w-7xl md:block'>
        <motion.nav
          style={{
            width,
            y,
          }}
          transition={{ duration: 0.3, ease: "linear" }}
          className={`mb-px mx-auto flex max-w-7xl items-center justify-between rounded-full bg-primary/10 px-3 py-2 backdrop-blur-sm dark:bg-neutral-950/50 ${
            scrolled ? "shadow-custom" : ""
          }`}
        >
          <Link to='/'>
            <motion.div
              className='relative h-10 w-36 overflow-hidden rounded-full flex items-center justify-center space-x-2 py-1 text-sm font-normal'
              onMouseEnter={() => setIsLogoHovered(true)}
              onMouseLeave={() => setIsLogoHovered(false)}
            >
              <Code2 className='text-primary' />
              <span className='font-semibold'>Bhaicode</span>

              <motion.div
                initial={{ x: "-100%" }}
                animate={{ x: isLogoHovered ? "100%" : "-100%" }}
                transition={{
                  duration: 0.3,
                  ease: "easeInOut",
                }}
                className='absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent'
              />
            </motion.div>
          </Link>
          <div className='flex items-center gap-2'>
            <ToggleThemeButton theme={theme} setTheme={setTheme} />

            {authUser && authUser.role === "ADMIN" && (
              <DropdownMenu>
                <DropdownMenuTrigger className='flex items-center gap-1 px-2 py-1 text-sm rounded-[6px] hover:bg-primary/20 transition-colors duration-200'>
                  <span>Admin</span>
                </DropdownMenuTrigger>

                <DropdownMenuContent align='end' className='w-40'>
                  <DropdownMenuItem asChild className='relative'>
                    <Link to='/profile' className='w-full'>
                      <span>Profile</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild className='relative'>
                    <Link to='/add-problem' className='w-full'>
                      <span>Add Problem</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild className='relative'>
                    <Link to='/all-problems' className='w-full'>
                      <span>All Problems</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild className='relative'>
                    <LogoutButton className='w-full hover:bg-primary/20 transition-colors duration-200'>
                      Logout
                    </LogoutButton>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}

            {authUser && authUser.role === "USER" && (
              <DropdownMenu>
                <DropdownMenuTrigger className='flex items-center gap-1 px-2 py-1 text-sm rounded-[6px] hover:bg-primary/20 transition-colors duration-200'>
                  <span>User</span>
                </DropdownMenuTrigger>

                <DropdownMenuContent align='end' className='w-40'>
                  <DropdownMenuItem asChild className='relative'>
                    <Link to='/profile' className='w-full'>
                      <span>Profile</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild className='relative'>
                    <LogoutButton className='w-full hover:bg-primary/20 transition-colors duration-200'>
                      Logout
                    </LogoutButton>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}

            <div className='flex items-center'>
              {NAV_ITEMS.map((item, idx) => (
                <Link
                  key={idx}
                  to={item.href}
                  className='relative px-2 py-1 text-sm'
                  onMouseEnter={() => setHovered(idx)}
                  onMouseLeave={() => setHovered(null)}
                >
                  {hovered === idx && (
                    <motion.span
                      layoutId='hovered-span'
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className='absolute inset-0 h-full w-full rounded-[6px] bg-primary/20 dark:primary/20'
                    ></motion.span>
                  )}
                  <span className='relative z-10'>{item.title}</span>
                </Link>
              ))}
            </div>
          </div>
        </motion.nav>
      </div>

      <nav className='fixed left-0 top-0 z-50 block w-full border-b border-neutral-100 bg-white dark:border-neutral-800 dark:bg-neutral-900 md:hidden'>
        <div className='flex w-full items-center justify-between px-4 py-3'>
          <Link href='/'>
            <motion.div
              className='relative h-10 w-36 overflow-hidden rounded-full flex items-center justify-center space-x-2 py-1 text-sm font-normal text-primary'
              onMouseEnter={() => setIsLogoHovered(true)}
              onMouseLeave={() => setIsLogoHovered(false)}
            >
              <Code2 />
              <span className='font-semibold'>Bhaicode</span>

              <motion.div
                initial={{ x: "-100%" }}
                animate={{ x: isLogoHovered ? "100%" : "-100%" }}
                transition={{
                  duration: 0.3,
                  ease: "easeInOut",
                }}
                className='absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent'
              />
            </motion.div>
          </Link>
          <button
            className='flex h-10 w-10 items-center justify-center rounded-md text-neutral-700 dark:text-neutral-200'
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth='1.5'
              stroke='currentColor'
              className='h-6 w-6'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5'
              ></path>
            </svg>
          </button>
        </div>
      </nav>

      <AnimatePresence mode='wait'>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{
              opacity: 0,
              transition: { duration: 0.3 },
            }}
            transition={{ duration: 0.3 }}
            className='fixed left-0 right-0 top-0 z-50 flex h-full flex-col items-center justify-center gap-8 bg-white dark:bg-neutral-900 md:hidden'
          >
            <button
              className='absolute right-4 top-3 flex h-10 w-10 items-center justify-center rounded-md text-neutral-700 dark:text-neutral-200'
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth='1.5'
                stroke='currentColor'
                className='h-6 w-6'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='M6 18L18 6M6 6l12 12'
                ></path>
              </svg>
            </button>
            {NAV_ITEMS.map((item, idx) => (
              <motion.div
                key={idx}
                initial={{
                  opacity: 0,
                  y: 20,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  duration: 0.3,
                  delay: idx * 0.1,
                  ease: "linear",
                }}
              >
                <Link
                  className='text-2xl font-medium text-neutral-800 transition-colors hover:text-neutral-500 dark:text-neutral-200 dark:hover:text-neutral-400'
                  to={item.href}
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                >
                  {item.title}
                </Link>
              </motion.div>
            ))}
            {authUser && authUser.role === "ADMIN" && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.3, ease: "linear" }}
              >
                <Link
                  className='text-2xl font-medium text-neutral-800 transition-colors hover:text-neutral-500 dark:text-neutral-200 dark:hover:text-neutral-400'
                  to='/add-problem'
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                >
                  Add Problem
                </Link>
              </motion.div>
            )}
            {authUser && (
              <>
                <motion.div
                  initial={{
                    opacity: 0,
                    y: 20,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  transition={{
                    duration: 0.3,
                    delay: 0.1,
                    ease: "linear",
                  }}
                >
                  <Link
                    className='text-2xl font-medium text-neutral-800 transition-colors hover:text-neutral-500 dark:text-neutral-200 dark:hover:text-neutral-400'
                    to='all-problems'
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                  >
                    All Problems
                  </Link>
                </motion.div>
                <motion.div
                  initial={{
                    opacity: 0,
                    y: 20,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  transition={{
                    duration: 0.3,
                    delay: 0.1,
                    ease: "linear",
                  }}
                >
                  <Link
                    className='text-2xl font-medium text-neutral-800 transition-colors hover:text-neutral-500 dark:text-neutral-200 dark:hover:text-neutral-400'
                    to='/profile'
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                  >
                    Profile
                  </Link>
                </motion.div>
              </>
            )}
            {isMenuOpen && authUser && (
              <LogoutButton className='text-2xl font-medium text-neutral-800 transition-colors hover:text-neutral-500 dark:text-neutral-200 dark:hover:text-neutral-400'>
                Logout
              </LogoutButton>
            )}
            <ToggleThemeButton theme={theme} setTheme={setTheme} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function ToggleThemeButton({ theme, setTheme }) {
  return (
    <>
      {theme === "dark" ? (
        <button
          className='flex items-center rounded-[6px] px-2 py-2 hover:bg-primary/20 dark:hover:bg-primary/20'
          onClick={() => setTheme("light")}
        >
          <motion.div
            key={theme}
            initial={{ rotate: 0 }}
            animate={{ rotate: -90 }}
            transition={{ duration: 0.3 }}
          >
            <IconSun className='size-4 text-neutral-400' />
          </motion.div>
        </button>
      ) : (
        <button
          className='flex items-center rounded-[6px] px-2 py-2 hover:bg-primary/20 dark:hover:bg-primary/20'
          onClick={() => setTheme("dark")}
        >
          <motion.div
            key={theme}
            initial={{ rotate: 0 }}
            animate={{ rotate: 90 }}
            transition={{ duration: 0.3 }}
          >
            <IconMoon className='size-4 -rotate-90 text-neutral-800' />
          </motion.div>
        </button>
      )}
    </>
  );
}
