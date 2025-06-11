import { SectionHeading } from "@/components/SectionHeading";

export const Footer = () => {
  return (
    <footer className='py-6 text-sm font-medium border-t border-border text-center flex justify-center items-center gap-3'>
      Build in public by your&apos;s truly
      <a
        href='https://x.com/shubhamsp1602'
        target='_blank'
        className='text-primary hover:underline'
      >
        <SectionHeading className='mt-0'>@shubhamsp1602</SectionHeading>
      </a>
    </footer>
  );
};
