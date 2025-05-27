import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";
import { Badge } from "../ui/badge";
import Link from "next/link";
import {
  MotionDiv,
  MotionH1,
  MotionH2,
  MotionSection,
  MotionSpan,
} from "../common/MotionWrapper";
import { containerVarients, itemVarients } from "@/lib/constants";

const buttonVarients = {
  scale: 1.05,
  transition: {
    type: "spring",
    stiffness: 300,
    damping: 10,
  },
};
export default function HeroSection() {
  return (
    <MotionSection
      variants={containerVarients}
      initial="hidden"
      animate="visible"
      className="relative mx-auto flex flex-col items-center justify-center z-0 py-16 sm:py-20 lg:pb-28 transition-all animate-in lg:px-12 max-w-7xl"
    >
      <MotionDiv
        variants={itemVarients}
        className="relative p-[1px] overflow-hidden rounded-full bg-linear-to-r from-rose-200 via-rose-500 to-rose-800 animate-gradient-x group"
      >
        <Badge
          className="relative px-4 text-base font-medium bg-rose-50 rounded-full group-hover:bg-rose-50 transition-colors duration-200"
          variant={"secondary"}
        >
          <div className="w-10 h-10 flex items-center justify-center">
            <Sparkles className=" text-rose-600 animate-pulse" />
          </div>

          <p className="text-base text-rose-600">Powered by AI</p>
        </Badge>
      </MotionDiv>

      <MotionH1 variants={itemVarients} className="font-bold text-center py-6">
        Transform PDFs into{" "}
        <span className="relative inline-block">
          <MotionSpan whileHover={buttonVarients} className="relative z-10 px-2">concise</MotionSpan>
          <span
            className="absolute inset-0 bg-rose-200/50 -rotate-2 rounded-lg transform -skew-y-1"
            aria-hidden="true"
          ></span>
        </span>
        summaries
      </MotionH1>
      <MotionH2 variants={itemVarients} className="text-lg sm:text-xl lg:text-2xl text-center px-4 lg:px-0 lg:max-w-4xl text-gray-600">
        Get a beautiful summary reel of a document in seconds
      </MotionH2>
      <MotionDiv variants={itemVarients} whileHover={buttonVarients}>
        <Button
          className="bg-rose-600 hover:bg-rose-500 text-white mt-4 text-base sm:text-lg lg:text-xl rounded-full px-6 sm:px-10 lg:px-8 py-5 sm:py-7 lg:py-7 lg:mt-9 bg-linear-to-r from-slate-900 to-rose-500 hover:no-underline hover:from-rose-500 hover:to-slate-900 font-bold shadow-lg transition-all duration-300"
          variant={"link"}
        >
          <Link href={"/#pricing"} className="flex gap-2 items-center">
            <span>Try DocDuce</span>
            <ArrowRight className="animate-pulse" />
          </Link>
        </Button>
      </MotionDiv>
    </MotionSection>
  );
}
