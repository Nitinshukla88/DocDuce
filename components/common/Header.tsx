import Link from "next/link";
import { FileText } from "lucide-react";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import PlanBadge from "./PlanBadge";

export default function Header() {
  return (
    <nav className="container flex items-center justify-between py-4 lg:px-8 px-2 mx-auto">
      <div className="flex lg:flex-1">
        <Link href="/" className="flex items-center gap-1 lg:gap-2 shrink-0">
          <FileText className="w-5 h-5 lg:w-8 lg:h-8 text-gray-900 hover:rotate-12 transform transition duration-200 ease-in-out" />
          <span className="font-extrabold lg-text-xl text-gray-900">
            DocDuce
          </span>
        </Link>
      </div>
      <div className="flex lg:justify-center gap-4 lg:gap-12 lg:items-center">
        <Link href="/#pricing" className="hover:text-rose-600">
          Pricing
        </Link>
        <SignedIn>
          <Link href="/dashboard" className="hover:text-rose-600">
            Your Summaries
          </Link>
        </SignedIn>
      </div>
      <div className="flex lg:flex-1 lg:justify-end">
        <SignedIn>
          <div className="flex gap-2 items-center">
            <Link href="/upload" className="hover:text-rose-600">
              Upload a PDF
            </Link>
            <PlanBadge/>
            <SignedIn>
              <UserButton />
            </SignedIn>
          </div>
        </SignedIn>

        <SignedOut>
          <Link href="/sign-in" className="hover:text-rose-600">
            Sign In
          </Link>
        </SignedOut>
      </div>
    </nav>
  );
}
