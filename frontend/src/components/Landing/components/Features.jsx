import { motion } from "framer-motion";
import {
  Code2,
  Users,
  BarChart3,
  Shield,
  Zap,
  CheckCircle,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../ui/card";
import { DotBackground } from "./grid-background";
import { FEATURES, ANIMATION_VARIANTS } from "../constants";

const iconMap = {
  Code2,
  Users,
  BarChart3,
  Shield,
  Zap,
  CheckCircle,
};

export const Features = () => {
  return (
    <DotBackground className='py-20'>
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
            id='features'
          >
            Everything you need to ace your interview
          </h2>
          <p className='text-xl text-muted-foreground max-w-2xl mx-auto'>
            Our AI-powered platform provides comprehensive preparation tools
            used by developers at Google, Meta, and Amazon.
          </p>
        </motion.div>

        <motion.div
          className='grid md:grid-cols-2 lg:grid-cols-3 gap-8'
          variants={ANIMATION_VARIANTS.staggerContainer}
          initial='initial'
          whileInView='animate'
          viewport={{ once: true }}
        >
          {FEATURES.map((feature, index) => {
            const Icon = iconMap[feature.icon];
            return (
              <motion.div key={index} variants={ANIMATION_VARIANTS.fadeInUp}>
                <Card className='h-full hover:shadow-lg transition-shadow duration-300 bg-background border-border'>
                  <CardHeader className='px-6'>
                    <Icon className='h-12 w-12 text-primary mb-4' />
                    <CardTitle className='text-xl'>{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className='text-base text-muted-foreground'>
                      {feature.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </DotBackground>
  );
};
