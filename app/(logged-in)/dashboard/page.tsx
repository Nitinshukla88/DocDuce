import BgGradient from "@/components/common/BgGradient";
import EmptySummaryStatus from "@/components/summaries/EmptySummaryStatus";
import SummaryCard from "@/components/summaries/SummaryCard";
import { Button } from "@/components/ui/button";
import { getSummaries } from "@/lib/getSummaries";
import { hasReachedUploadLimit } from "@/lib/user";
import { currentUser } from "@clerk/nextjs/server";
import { ArrowRight, Plus } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
  const user = await currentUser();
  const userId = user?.id;
  if(!userId) {
    return redirect('/sign-in');
  }
  const { hasReachedLimit, uploadLimit } = await hasReachedUploadLimit(userId);
  const summaries = await getSummaries(userId);
  return (
    <main className="min-h-screen">
      <BgGradient>
        <div className="container mx-auto flex flex-col gap-4">
          <div className="px-2 py-12 sm:py-24">
            <div className="flex gap-4 mb-8 justify-between">
              <div className="flex flex-col gap-2">
              <h1 className="text-4xl font-bold tracking-tight bg-linear-to-r from-gray-600 to-gray-900 bg-clip-text text-transparent">Your Summaries</h1>
              <p className="text-gray-600">
                Transform your PDFs into concise, actionable insights with AI
              </p>
              </div>
              {!hasReachedLimit && (<Button
                variant={"link"}
                className="bg-linear-to-r from-rose-500 to-rose-700 hover:from-rose-600 hover:to-rose-800 hover:scale-105 transition-all duration-300 group hover:no-underline"
              >
                <Link href="/upload" className="flex text-white items-center">
                  <Plus className="w-5 h-5 mr-2"/>
                  New Summary
                </Link>
              </Button>)}
            </div>
            {hasReachedLimit && (<div className="mb-6">
              <div className="bg-rose-50 border border-rose-200 rounded-lg p-4 text-rose-800">
                  <p className="text-sm">You've reached the daily limit of {uploadLimit} uploads on basic plan. <Link href="/#pricing" className="text-rose-800 underline font-medium underline-offset-4 inline-flex items-center ">Click here to upgrade to Pro{' '}<ArrowRight className="w-4 h-4 inline-block"/>for unlimited uploads</Link></p>
              </div>
            </div>)}
            {summaries.length === 0 ? (<EmptySummaryStatus/>) : (<div className="grid grid-cols-1 gap-4 md:grid-cols-2 sm:gap-6 sm:px-0 lg:grid-cols-3">
              {summaries.map((summary, index)=> (
                <SummaryCard key={index} summary={summary} />
              ))}
            </div>)}
          </div>
        </div>
      </BgGradient>
    </main>
  );
}
