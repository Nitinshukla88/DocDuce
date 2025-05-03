import BgGradient from "@/components/common/BgGradient";
import DemoSection from "@/components/Home/DemoSection";
import HeroSection from "@/components/Home/HeroSection";
import HowItWorksSection from "@/components/Home/HowItWorksSection";
import PricingSection from "@/components/Home/PricingSection";

export default function Home() {
  return (
    <div className="relative w-full">
      <BgGradient>
        <div className="flex flex-col ">
          <HeroSection />
          <DemoSection />
          <HowItWorksSection />
          <PricingSection />
        </div>
      </BgGradient>

      {/* <CTASection /> */}
    </div>
  );
}
