export default function ContentSection ({ title, points} : { title : string, points : string[]}){
    return <div className="space-y-4 mb-4">
        {points.map((point) => { return <p key={point} className="group relative bg-linear-to-br from-gray-200/[0.08] to-gray-400/[0.03] p-4 rounded-2xl border border-gray-500/10 hover:shadow-lg transition-all">{point}</p> } )}
    </div>
}