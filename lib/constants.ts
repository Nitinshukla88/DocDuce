import { isDev } from "@/utils/helpers";

export const pricingPlans = [
    {
      id: "basic",
      name: "Basic",
      description: "Perfect for occasional use",
      items: [
        "5 PDF summaries per month",
        "Standard processing speed",
        "Email support",
      ],
      price: 9,
      paymentLink: isDev ? 'https://buy.stripe.com/test_eVq7sE6sL1TJbOCbMwdjO00' : '',
      priceId: isDev ? 'price_1RRcvK2ebWCFkXry1kxjX09W' : '',
    },
    {
      id: "pro",
      name: "Pro",
      description: "For professionals and teams",
      items: [
        "Unlimited PDF summaries",
        "Priority processing",
        "24/7 priority support",
        "Markdown export",
      ],
      price: 19,
      paymentLink: isDev ? 'https://buy.stripe.com/test_5kQ14gbN59mbdWKcQAdjO01' : '',
      priceId: isDev ? 'price_1RRcvK2ebWCFkXryUCdCsyxT' : '',
    },
  ];

export const containerVarients = {
  hidden: { opacity: 0},
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.1,
    }
  }
}

export const itemVarients = {
  hidden : { opacity : 0, y : 20 },
  visible : {
    opacity : 1, 
    transition : {
      type : 'spring',
      damping : 15,
      stiffness : 50,
      duration : 0.8,
    }
  }
}

export const DEMO_SUMMARY = `
# Overview 
🚀 Mastering Next.js: The Ultimate Beginner-to-Pro Guide
👉 Build blazing-fast, modern web apps with Next.js—no experience required!

# Key Highlights
👉 🌐 Covers Next.js fundamentals, routing, and data fetching
👉 ⚡ Hands-on projects to solidify your learning
👉 🚀 Deployment tips for getting your site live fast

# Why it matters
👉 Next.js is the framework powering some of the world’s fastest, most scalable websites—from startups to tech giants. Mastering it means you can build production-ready apps with ease, boost your career, and deliver incredible user experiences.

# Main Points
👉 💡 Learn how Next.js simplifies React development with built-in routing and SSR
👉 🏆 Take advantage of automatic code splitting and performance optimizations
👉 🛠️ Deploy your Next.js site to Vercel or your favorite cloud in minutes

# Pro Tips
⭐ Use dynamic routing to create flexible, SEO-friendly pages
💎 Leverage API routes to build full-stack features without extra backend setup
⭐ Optimize images with Next.js’ Image component for lightning-fast load times

# Key Terms to Know
👉 SSR (Server-Side Rendering): 🚀 Rendering pages on the server for faster load and better SEO
👉 Static Generation: 📦 Pre-building pages at build time for maximum speed

# Bottom Line
💫 Next.js is your secret weapon for building powerful, scalable, and lightning-fast web applications—start mastering it today!
`;