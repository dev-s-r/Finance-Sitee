import { ArrowRight, TrendingUp, BarChart2, Zap, Shield, Target, DollarSign, Calculator, PiggyBank, Percent, Activity } from 'lucide-react'
import CalculatorCard from '../components/CalculatorCard'

const CALCULATORS = [
  {
    key: 'sip',
    icon: TrendingUp,
    title: 'SIP Calculator',
    description: 'Calculate returns on your monthly Systematic Investment Plan with compound growth.',
  },
  {
    key: 'emi',
    icon: Calculator,
    title: 'EMI Calculator',
    description: 'Find your monthly loan payment for home, car, or personal loans.',
  },
  {
    key: 'fd',
    icon: PiggyBank,
    title: 'FD Calculator',
    description: 'Estimate maturity amount for Fixed Deposits with compound interest.',
  },
  {
    key: 'lumpsum',
    icon: DollarSign,
    title: 'Lumpsum Calculator',
    description: 'See how a one-time investment grows over time with market returns.',
  },
  {
    key: 'cagr',
    icon: Percent,
    title: 'CAGR Calculator',
    description: 'Measure the compound annual growth rate of any investment.',
  },
  {
    key: 'inflation',
    icon: Activity,
    title: 'Inflation Impact',
    description: 'Understand how inflation erodes purchasing power over the years.',
  },
  {
    key: 'savings',
    icon: Target,
    title: 'Savings Goal',
    description: 'Discover how much to invest monthly to reach your financial goal.',
  },
]

const FEATURES = [
  {
    icon: Zap,
    title: 'Real-time Results',
    description: 'Instant calculations as you adjust sliders — no button clicks needed.',
  },
  {
    icon: BarChart2,
    title: 'Visual Insights',
    description: 'Interactive charts showing growth curves and breakdowns.',
  },
  {
    icon: Shield,
    title: 'No Sign-up Required',
    description: 'Use all calculators freely. Your data stays on your device.',
  },
  {
    icon: TrendingUp,
    title: 'Beginner Friendly',
    description: 'Simple language, smart defaults, and key insights for every calculator.',
  },
]

export default function HomePage({ navigate }) {
  return (
    <div className="animate-fade-in">
      {/* Hero Section */}
      <section className="relative overflow-hidden px-4 sm:px-6 lg:px-8 pt-20 pb-24">
        {/* Background glow */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-primary-500/10 rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-primary-500/10 border border-primary-500/20 rounded-full px-4 py-1.5 mb-6">
            <span className="w-2 h-2 bg-primary-400 rounded-full animate-pulse" />
            <span className="text-sm text-primary-400 font-medium">Free &bull; No signup &bull; Instant results</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight mb-6">
            Visualize Your{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-emerald-300">
              Financial Future
            </span>
          </h1>

          <p className="text-lg sm:text-xl text-white/50 mb-10 max-w-2xl mx-auto leading-relaxed">
            Powerful, beginner-friendly financial calculators to help you plan investments, manage loans, and track your financial goals — all in one place.
          </p>

          <button
            onClick={() => navigate('sip')}
            className="btn-primary inline-flex items-center gap-2 text-base"
          >
            Start Calculating
            <ArrowRight size={18} />
          </button>
        </div>
      </section>

      {/* Features Section */}
      <section className="px-4 sm:px-6 lg:px-8 py-16 bg-dark-200/30">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-white text-center mb-12">
            Why <span className="text-primary-400">WealthLab</span>?
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {FEATURES.map((feature) => (
              <div key={feature.title} className="glass-card p-6 text-center hover:border-primary-500/30 transition-all duration-300">
                <div className="w-12 h-12 bg-primary-500/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <feature.icon size={22} className="text-primary-400" />
                </div>
                <h3 className="font-semibold text-white mb-2">{feature.title}</h3>
                <p className="text-sm text-white/50 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Calculator Grid */}
      <section className="px-4 sm:px-6 lg:px-8 py-16">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3">
              All Calculators
            </h2>
            <p className="text-white/50">Choose a calculator to get started</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {CALCULATORS.map((calc) => (
              <CalculatorCard
                key={calc.key}
                icon={calc.icon}
                title={calc.title}
                description={calc.description}
                onClick={() => navigate(calc.key)}
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
