export const FEATURES = [
  {
    icon: "Code2",
    title: "AI-Powered Challenges",
    description:
      "Get personalized coding problems based on your skill level and target companies.",
  },
  {
    icon: "BarChart3",
    title: "Performance Analytics",
    description:
      "Track your progress with detailed insights and identify areas for improvement.",
  },
  {
    icon: "Users",
    title: "Mock Interviews",
    description:
      "Practice with AI interviewers that simulate real company interview experiences.",
  },
  {
    icon: "Shield",
    title: "Company-Specific Prep",
    description:
      "Tailored preparation for Google, Meta, Amazon, Microsoft, and 100+ companies.",
  },
  {
    icon: "Zap",
    title: "Real-time Feedback",
    description:
      "Get instant code reviews and optimization suggestions as you solve problems.",
  },
  {
    icon: "CheckCircle",
    title: "Progress Tracking",
    description:
      "Monitor your improvement with comprehensive dashboards and achievement badges.",
  },
];

export const PRICING_PLANS = [
  {
    name: "Free",
    price: "$0",
    period: "forever",
    description: "Perfect for getting started",
    features: [
      "15 coding problem submissions per day",
      "Basic performance analytics",
      "Community support",
    ],
    cta: "Get Started",
    popular: false,
  },
  {
    name: "Pro",
    price: "$5",
    period: "per month",
    description: "For serious interview preparation",
    features: [
      "Unlimited coding problem submissions",
      "AI-powered mock interviews",
      "Company-specific preparation",
      "Advanced analytics & insights",
    ],
    cta: "Start Free Trial",
    popular: true,
  },
  {
    name: "Pro+",
    price: "$10",
    period: "per month",
    description: "For serious interview preparation",
    features: [
      "Everything in Pro",
      "Detailed dashboard",
      "AI-powered code reviews",
      "Problem specific explanations by AI",
    ],
    cta: "Get Started",
    popular: false,
  },
];

export const CODE_SNIPPET = {
  code: `function twoSum(nums, target) {
  const map = new Map();
  for (let i = 0; i < nums.length; i++) {
    const complement = target - nums[i];
    if (map.has(complement)) {
      return [map.get(complement), i];
    }
    map.set(nums[i], i);
  }
  return [];
}`,
  language: "javascript",
  delay: 1000,
};

export const ANIMATION_VARIANTS = {
  fadeInUp: {
    initial: { opacity: 0, y: 60 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 },
  },
  staggerContainer: {
    animate: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  },
};
