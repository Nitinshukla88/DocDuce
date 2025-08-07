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
      paymentLink: isDev ? 'https://buy.stripe.com/test_eVq7sE6sL1TJbOCbMwdjO00' : 'https://buy.stripe.com/test_5kQaEQcR9gOD2e2cQAdjO02',
      priceId: isDev ? 'price_1RRcvK2ebWCFkXry1kxjX09W' : 'price_1RUSRE2ebWCFkXrynZfOMbsW',
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
      paymentLink: isDev ? 'https://buy.stripe.com/test_5kQ14gbN59mbdWKcQAdjO01' : 'https://buy.stripe.com/test_7sY14geZh55VbOC6scdjO03',
      priceId: isDev ? 'price_1RRcvK2ebWCFkXryUCdCsyxT' : 'price_1RUSRE2ebWCFkXryy7y6YOlt',
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
👉 Build powerful, production-ready React applications with Next.js, a full-stack framework that simplifies development.
👉 Next.js is a React framework for building modern, server-rendered applications with ease.

# Key Highlights
👉 🌐 Covers Next.js fundamentals, routing, and data fetching
👉 ⚡ Hands-on projects to solidify your learning
👉 🚀 Deployment tips for getting your site live fast
👉 🚀 It is SEO friendly and fast
👉 🚀 Next.js simplifies the development process with its powerful features.

# Why it matters
👉 Next.js is the framework powering some of the world’s fastest, most scalable websites—from startups to tech giants. Mastering it means you can build production-ready apps with ease, boost your career, and deliver incredible user experiences.
👉 It solves the core problems of client-side React applications, providing superior performance and SEO benefits through built-in server-side rendering and static site generation.

# Main Points
👉 💡 Learn how Next.js simplifies React development with built-in routing and SSR
👉 🏆 Take advantage of automatic code splitting and performance optimizations
👉 🛠️ Deploy your Next.js site to Vercel or your favorite cloud in minutes

# Pro Tips
👉 ⭐ Use dynamic routing to create flexible, SEO-friendly pages
👉 💎 Leverage API routes to build full-stack features without extra backend setup
👉 🚀 Optimize images with Next.js’ Image component for lightning-fast load times
👉 🚀 Next.js leverage React Server Components to run your code on the server and fetch data, reducing the amount of JavaScript sent to the client and improving initial page load times.

# Key Terms to Know
👉 SSR (Server-Side Rendering): 🚀 Rendering pages on the server for faster load and better SEO
👉 Static Generation: 📦 Pre-building pages at build time for maximum speed
👉 Next.js is pre-rendering, which refers to how Next.js generates HTML for a page in advance, either on the server at build time or on each request.

# Bottom Line
💫 Next.js is your secret weapon for building powerful, scalable, and lightning-fast web applications—start mastering it today!
`;