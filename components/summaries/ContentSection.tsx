import { containerVarients } from "@/lib/constants"
import { MotionDiv } from "../common/MotionWrapper"

export default function ContentSection ({ title, points} : { title : string, points : string[]}){
    return <MotionDiv variants={containerVarients} key={points.join('')} initial="hidden" animate="visible" exit="exit" className="space-y-4 mb-4">
        {points.map((point) => { return <p key={point} className="group relative bg-linear-to-br from-gray-200/[0.08] to-gray-400/[0.03] p-4 rounded-2xl border border-gray-500/10 hover:shadow-lg transition-all">{point}</p> } )}
    </MotionDiv>
}