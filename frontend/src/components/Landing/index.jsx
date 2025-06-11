import { Hero } from "./components/hero";
import { Features } from "./components/features";
import { Pricing } from "./components/pricing";
import { Footer } from "./components/footer";

export const Landing = () => {
  return (
    <div className='min-h-screen bg-background'>
      <Hero />
      <Features />
      <Pricing />
      <Footer />
    </div>
  );
};
