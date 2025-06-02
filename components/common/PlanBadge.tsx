import { pricingPlans } from "@/lib/constants";
import { getPriceId } from "@/lib/user";
import { currentUser } from "@clerk/nextjs/server";
import { Badge } from "../ui/badge";
import { Crown } from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";

export default async function PlanBadge () {
    const user = await currentUser();
    if(!user?.id) return null;

    const email = user?.emailAddresses?.[0]?.emailAddress;
    
    let priceId: string | null =  null;

    if(email) {
        priceId = await getPriceId(email);
    }

    let planName = 'Buy a plan';

    const plan = pricingPlans.find((plan) => plan.priceId === priceId);

    if(plan) {
        planName = plan.name;
    }

    return (
        <Link href="/#pricing">
            <Badge variant="outline" className={cn('ml-2 bg-linear-to-r from-amber-100 to-amber-200 border-amber-300 hidden lg:flex flex-row items-center hover:cursor-pointer', !priceId && 'from-red-100 to-red-200 border-red-300 hover:cursor-pointer')}>
                <Crown className={cn('w-3 h-3 mr-1 text-amber-600', !priceId && 'text-red-600')}/>
                {planName}
            </Badge>
        </Link>
    );
}