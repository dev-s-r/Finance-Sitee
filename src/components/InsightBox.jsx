import { Lightbulb } from 'lucide-react'

export default function InsightBox({ insights = [] }) {
  if (!insights.length) return null

  return (
    <div className="glass-card p-5">
      <div className="flex items-center gap-2 mb-4">
        <Lightbulb size={16} className="text-amber-400" />
        <h3 className="text-sm font-semibold text-white/70">Key Insights</h3>
      </div>
      <ul className="space-y-2.5">
        {insights.map((insight, i) => (
          <li key={i} className="flex items-start gap-2.5">
            <span className="w-5 h-5 rounded-full bg-primary-500/20 text-primary-400 text-xs flex items-center justify-center flex-shrink-0 mt-0.5 font-semibold">
              {i + 1}
            </span>
            <p className="text-sm text-white/60 leading-relaxed">{insight}</p>
          </li>
        ))}
      </ul>
    </div>
  )
}
