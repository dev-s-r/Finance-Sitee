export default function ResultCard({ label, value, subtitle, highlight = false, icon }) {
  return (
    <div className={`glass-card p-5 ${highlight ? 'border-primary-500/40 bg-primary-500/5' : ''}`}>
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-xs text-white/50 font-medium uppercase tracking-wide mb-1">{label}</p>
          <p className={`text-2xl font-bold ${highlight ? 'text-primary-400' : 'text-white'}`}>
            {value}
          </p>
          {subtitle && <p className="text-xs text-white/40 mt-1">{subtitle}</p>}
        </div>
        {icon && (
          <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${highlight ? 'bg-primary-500/20 text-primary-400' : 'bg-white/5 text-white/40'}`}>
            {icon}
          </div>
        )}
      </div>
    </div>
  )
}
