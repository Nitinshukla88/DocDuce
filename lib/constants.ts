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