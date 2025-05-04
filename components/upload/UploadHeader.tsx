import { Sparkles } from "lucide-react";
import { Badge } from "../ui/badge";

export default function UploadHeader() {
  return (
    <div className="flex flex-col items-center justify-center gap-6 text-center">
      <div className="relative p-[1px] overflow-hidded rounded-full bg-linear-to-r from-rose-200 via-rose-500 to-rose-800 animate-gradient-x group">
        <Badge
          className="relative px-4 text-base font-medium bg-rose-50 rounded-full group-hover:bg-rose-50 transition-colors duration-200"
          variant={"secondary"}
        >
          <div className="w-10 h-10 flex items-center justify-center">
            <Sparkles className=" text-rose-600 animate-pulse" />
          </div>

          <p className="text-base text-rose-600">AI-Powered Content Creation</p>
        </Badge>
      </div>
      <div className="captitalize text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
        Start Uploading{" "}
        <span className="relative inline-block">
          <span className="relative z-10 px-2">your PDF's</span>
          <span
            className="absolute inset-0 bg-rose-200/50 -rotate-2 rounded-lg transform -skew-y-1"
            aria-hidden="true"
          ></span>
        </span>
      </div>
      <div className="mt-2 text-lg leading-8 text-gray-600 max-w-2xl text-center">
        <p>Upload your PDF and Let the AI do the Magic! ✨</p>
      </div>
    </div>
  );
}
