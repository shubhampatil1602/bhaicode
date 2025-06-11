import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../ui/card";
import { GridBackground } from "./grid-background";
import { PRICING_PLANS, ANIMATION_VARIANTS } from "../constants";

export const Pricing = () => {
  return (
    <GridBackground className='py-20 bg-background'>
      <div className='container mx-auto px-4 sm:px-6 lg:px-8'>
        <motion.div
          className='text-center mb-16'
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2
            className='text-3xl lg:text-4xl font-bold text-foreground mb-4'
            id='pricing'
          >
            Choose your plan
          </h2>
          <p className='text-xl text-muted-foreground'>
            Start free, upgrade when you're ready to accelerate your career
          </p>
        </motion.div>

        <motion.div
          className='grid md:grid-cols-3 gap-8 max-w-5xl mx-auto'
          variants={ANIMATION_VARIANTS.staggerContainer}
          initial='initial'
          whileInView='animate'
          viewport={{ once: true }}
        >
          {PRICING_PLANS.map((plan, index) => (
            <motion.div key={index} variants={ANIMATION_VARIANTS.fadeInUp}>
              <Card
                className={`h-full relative bg-card border-border ${
                  plan.popular ? "border-primary border-2" : ""
                }`}
              >
                {plan.popular && (
                  <Badge className='absolute -top-3 left-1/2 transform -translate-x-1/2 bg-primary'>
                    Most Popular
                  </Badge>
                )}
                <CardHeader className='text-center'>
                  <CardTitle className='text-2xl'>{plan.name}</CardTitle>
                  <div className='mt-4'>
                    <span className='text-4xl font-bold'>{plan.price}</span>
                    <span className='text-muted-foreground'>
                      /{plan.period}
                    </span>
                  </div>
                  <CardDescription className='mt-2'>
                    {plan.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className='space-y-4'>
                  <ul className='space-y-3'>
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className='flex items-center'>
                        <CheckCircle className='h-5 w-5 text-primary mr-3 flex-shrink-0' />
                        <span className='text-sm'>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button
                    className={`w-full mt-6 ${
                      plan.popular ? "bg-primary hover:bg-primary/90" : ""
                    }`}
                    variant={plan.popular ? "default" : "outline"}
                  >
                    {plan.cta}
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </GridBackground>
  );
};
