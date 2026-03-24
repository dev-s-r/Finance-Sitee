import { ArrowLeft } from 'lucide-react'

export default function CalculatorLayout({ navigate, title, description, inputs, results, chart, insights, faqs }) {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-slide-up">
      {/* Back button + title */}
      <div className="mb-8">
        <button
          onClick={() => navigate('home')}
          className="flex items-center gap-2 text-white/50 hover:text-white transition-colors mb-4 text-sm"
        >
          <ArrowLeft size={16} />
          All Calculators
        </button>
        <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2">{title}</h1>
        <p className="text-white/50 text-base leading-relaxed max-w-2xl">{description}</p>
      </div>

      {/* Main grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Inputs */}
        <div className="glass-card p-6 space-y-6">
          <h2 className="text-base font-semibold text-white/70">Input Parameters</h2>
          {inputs}
        </div>

        {/* Results */}
        <div className="space-y-4 lg:sticky lg:top-24 self-start">
          {results}
        </div>
      </div>

      {/* Chart */}
      {chart && (
        <div className="mb-6">
          {chart}
        </div>
      )}

      {/* Insights */}
      {insights && (
        <div className="mb-8">
          {insights}
        </div>
      )}

      {/* FAQs */}
      {faqs && faqs.length > 0 && (
        <div className="glass-card p-6">
          <h2 className="text-lg font-semibold text-white mb-5">Frequently Asked Questions</h2>
          <div className="space-y-5">
            {faqs.map((faq, i) => (
              <div key={i} className="border-b border-white/5 pb-5 last:border-0 last:pb-0">
                <h3 className="text-sm font-semibold text-white mb-1.5">{faq.q}</h3>
                <p className="text-sm text-white/50 leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
