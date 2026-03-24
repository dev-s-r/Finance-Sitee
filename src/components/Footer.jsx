import { TrendingUp } from 'lucide-react'

export default function Footer({ navigate }) {
  return (
    <footer className="border-t border-white/10 bg-dark-200/50 backdrop-blur-md mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 bg-primary-500 rounded-lg flex items-center justify-center">
              <TrendingUp size={15} className="text-white" />
            </div>
            <span className="text-lg font-bold text-white">
              Wealth<span className="text-primary-400">Lab</span>
            </span>
          </div>

          <nav className="flex flex-wrap justify-center gap-4 text-sm text-white/50">
            <button onClick={() => navigate('home')} className="hover:text-white/80 transition-colors">
              Home
            </button>
            <button onClick={() => navigate('sip')} className="hover:text-white/80 transition-colors">
              SIP Calculator
            </button>
            <button onClick={() => navigate('emi')} className="hover:text-white/80 transition-colors">
              EMI Calculator
            </button>
            <button onClick={() => navigate('fd')} className="hover:text-white/80 transition-colors">
              FD Calculator
            </button>
          </nav>

          <p className="text-xs text-white/30 text-center">
            Built as a personal project &bull; For educational purposes only
          </p>
        </div>
        <p className="mt-4 text-xs text-white/20 text-center">
          ⚠️ Disclaimer: All calculations are approximate and for informational purposes only. Do not make financial decisions based solely on these results.
        </p>
      </div>
    </footer>
  )
}
