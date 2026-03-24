import { useState, useEffect } from 'react'
import Header from './components/Header'
import Footer from './components/Footer'
import HomePage from './pages/HomePage'
import SIPCalculator from './pages/SIPCalculator'
import EMICalculator from './pages/EMICalculator'
import FDCalculator from './pages/FDCalculator'
import LumpSumCalculator from './pages/LumpSumCalculator'
import CAGRCalculator from './pages/CAGRCalculator'
import InflationCalculator from './pages/InflationCalculator'
import SavingsGoalCalculator from './pages/SavingsGoalCalculator'

const PAGES = {
  home: HomePage,
  sip: SIPCalculator,
  emi: EMICalculator,
  fd: FDCalculator,
  lumpsum: LumpSumCalculator,
  cagr: CAGRCalculator,
  inflation: InflationCalculator,
  savings: SavingsGoalCalculator,
}

export default function App() {
  const [currentPage, setCurrentPage] = useState('home')
  const [darkMode, setDarkMode] = useState(true)

  useEffect(() => {
    const saved = localStorage.getItem('wealthlab-theme')
    if (saved) setDarkMode(saved === 'dark')
  }, [])

  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode)
    localStorage.setItem('wealthlab-theme', darkMode ? 'dark' : 'light')
  }, [darkMode])

  const navigate = (page) => {
    setCurrentPage(page)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const PageComponent = PAGES[currentPage] || HomePage

  return (
    <div className={`min-h-screen flex flex-col ${darkMode ? 'dark bg-dark-300' : 'bg-gray-50'}`}>
      <Header
        currentPage={currentPage}
        navigate={navigate}
        darkMode={darkMode}
        toggleDarkMode={() => setDarkMode(!darkMode)}
      />
      <main className="flex-1">
        <PageComponent navigate={navigate} />
      </main>
      <Footer navigate={navigate} />
    </div>
  )
}
