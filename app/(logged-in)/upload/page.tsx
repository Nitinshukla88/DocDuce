import BgGradient from "@/components/common/BgGradient";
import { MotionDiv } from "@/components/common/MotionWrapper";
import UploadForm from "@/components/upload/UploadForm";
import UploadHeader from "@/components/upload/UploadHeader";
import { containerVarients } from "@/lib/constants";
import { hasReachedUploadLimit } from "@/lib/user";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function UploadPage() {
  const user = await currentUser();

  if(!user?.id) {
    redirect('/sign-in');
  }

  const userId = user.id;
  const { hasReachedLimit } = await hasReachedUploadLimit(userId);

  if(hasReachedLimit) {
    redirect('/dashboard');
  }

  return (
    <section className="min-h-screen">
      <BgGradient>
        <MotionDiv variants={containerVarients} initial="hidden" animate="visible" className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
          <div className="flex flex-col items-center justify-center gap-6 text-center">
            <UploadHeader />
            <UploadForm />
          </div>
        </MotionDiv>
      </BgGradient>
    </section>
  );
}