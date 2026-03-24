export default function CalculatorCard({ icon: Icon, title, description, onClick, color = 'text-primary-400' }) {
  return (
    <button
      onClick={onClick}
      className="glass-card p-6 text-left w-full group hover:border-primary-500/40 hover:bg-white/8 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-primary-500/10 animate-fade-in"
    >
      <div className={`w-12 h-12 rounded-xl bg-primary-500/10 flex items-center justify-center mb-4 group-hover:bg-primary-500/20 transition-colors ${color}`}>
        <Icon size={24} />
      </div>
      <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-primary-400 transition-colors">
        {title}
      </h3>
      <p className="text-sm text-white/50 leading-relaxed">
        {description}
      </p>
    </button>
  )
}
