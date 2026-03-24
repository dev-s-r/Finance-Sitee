import { useState } from 'react'
import { TrendingUp, Menu, X, Sun, Moon } from 'lucide-react'

const NAV_LINKS = [
  { key: 'home', label: 'Home' },
  { key: 'sip', label: 'SIP' },
  { key: 'emi', label: 'EMI' },
  { key: 'fd', label: 'FD' },
  { key: 'lumpsum', label: 'Lumpsum' },
  { key: 'cagr', label: 'CAGR' },
  { key: 'inflation', label: 'Inflation' },
  { key: 'savings', label: 'Savings Goal' },
]

export default function Header({ currentPage, navigate, darkMode, toggleDarkMode }) {
  const [menuOpen, setMenuOpen] = useState(false)

  const handleNav = (key) => {
    navigate(key)
    setMenuOpen(false)
  }

  return (
    <header className="sticky top-0 z-50 glass border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <button
            onClick={() => handleNav('home')}
            className="flex items-center gap-2 group"
          >
            <div className="w-8 h-8 bg-primary-500 rounded-lg flex items-center justify-center group-hover:bg-primary-400 transition-colors">
              <TrendingUp size={18} className="text-white" />
            </div>
            <span className="text-xl font-bold text-white">
              Wealth<span className="text-primary-400">Lab</span>
            </span>
          </button>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {NAV_LINKS.map((link) => (
              <button
                key={link.key}
                onClick={() => handleNav(link.key)}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                  currentPage === link.key
                    ? 'bg-primary-500/20 text-primary-400'
                    : 'text-white/70 hover:text-white hover:bg-white/10'
                }`}
              >
                {link.label}
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            {/* Theme toggle */}
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-lg text-white/70 hover:text-white hover:bg-white/10 transition-all"
              aria-label="Toggle theme"
            >
              {darkMode ? <Sun size={18} /> : <Moon size={18} />}
            </button>

            {/* Mobile menu button */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="lg:hidden p-2 rounded-lg text-white/70 hover:text-white hover:bg-white/10 transition-all"
              aria-label="Toggle menu"
            >
              {menuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="lg:hidden border-t border-white/10 bg-dark-200/95 backdrop-blur-md">
          <div className="max-w-7xl mx-auto px-4 py-3 flex flex-col gap-1">
            {NAV_LINKS.map((link) => (
              <button
                key={link.key}
                onClick={() => handleNav(link.key)}
                className={`px-4 py-2.5 rounded-xl text-sm font-medium text-left transition-all ${
                  currentPage === link.key
                    ? 'bg-primary-500/20 text-primary-400'
                    : 'text-white/70 hover:text-white hover:bg-white/10'
                }`}
              >
                {link.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </header>
  )
}
