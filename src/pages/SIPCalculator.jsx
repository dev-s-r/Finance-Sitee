import { useState, useEffect } from 'react'
import { TrendingUp, IndianRupee, Calendar } from 'lucide-react'
import CalculatorLayout from '../components/CalculatorLayout'
import InputSlider from '../components/InputSlider'
import ResultCard from '../components/ResultCard'
import ChartComponent from '../components/ChartComponent'
import InsightBox from '../components/InsightBox'
import { calculateSIP } from '../utils/calculators/sipCalculator'
import { saveToStorage, loadFromStorage } from '../utils/localStorage'
import { formatINR, formatINRFull } from '../utils/format'

const STORAGE_KEY = 'sip-inputs'
const DEFAULTS = { monthly: 5000, rate: 12, years: 10 }

export default function SIPCalculator({ navigate }) {
  const saved = loadFromStorage(STORAGE_KEY, DEFAULTS)
  const [monthly, setMonthly] = useState(saved.monthly)
  const [rate, setRate] = useState(saved.rate)
  const [years, setYears] = useState(saved.years)

  useEffect(() => {
    saveToStorage(STORAGE_KEY, { monthly, rate, years })
  }, [monthly, rate, years])

  const result = calculateSIP(monthly, rate, years)

  const insights = [
    `Your total investment of ${formatINR(result.invested)} grows to ${formatINR(result.totalValue)} — a ${((result.gains / result.invested) * 100).toFixed(0)}% gain.`,
    `The power of compounding generates ${formatINR(result.gains)} in wealth over ${years} years.`,
    `Starting just 5 years earlier could roughly double your final corpus.`,
    `Increasing monthly SIP by ₹1,000 adds approximately ${formatINR(calculateSIP(1000, rate, years).totalValue)} more to your wealth.`,
  ]

  const faqs = [
    {
      q: 'What is SIP?',
      a: 'SIP (Systematic Investment Plan) lets you invest a fixed amount monthly in mutual funds. Returns are based on compound interest applied monthly.',
    },
    {
      q: 'What rate of return should I use?',
      a: 'Equity mutual funds have historically returned 10–14% p.a. over long periods. For conservative estimates, use 8–10%.',
    },
    {
      q: 'Is this calculator accurate?',
      a: 'The calculator assumes a constant rate of return. Actual returns vary with market conditions. Use this for planning purposes only.',
    },
    {
      q: 'Can I increase my SIP amount over time?',
      a: 'Yes — that is called a Step-Up SIP. Increasing by 10% annually can significantly boost returns.',
    },
  ]

  return (
    <CalculatorLayout
      navigate={navigate}
      title="SIP Calculator"
      description="Calculate how your monthly investments grow over time with the power of compounding. Systematic Investment Plans are one of the best ways to build long-term wealth."
      inputs={
        <>
          <InputSlider
            label="Monthly Investment"
            value={monthly}
            min={500}
            max={100000}
            step={500}
            onChange={setMonthly}
            formatValue={(v) => `₹${v.toLocaleString('en-IN')}`}
          />
          <InputSlider
            label="Expected Annual Return"
            value={rate}
            min={1}
            max={30}
            step={0.5}
            onChange={setRate}
            formatValue={(v) => `${v}%`}
            hint="Equity funds avg 10–14%, debt funds avg 6–8%"
          />
          <InputSlider
            label="Investment Duration"
            value={years}
            min={1}
            max={40}
            step={1}
            onChange={setYears}
            formatValue={(v) => `${v} yr${v > 1 ? 's' : ''}`}
          />
        </>
      }
      results={
        <>
          <ResultCard
            label="Total Value"
            value={formatINR(result.totalValue)}
            subtitle={formatINRFull(result.totalValue)}
            highlight
            icon={<TrendingUp size={18} />}
          />
          <div className="grid grid-cols-2 gap-4">
            <ResultCard
              label="Invested"
              value={formatINR(result.invested)}
              icon={<IndianRupee size={18} />}
            />
            <ResultCard
              label="Est. Gains"
              value={formatINR(result.gains)}
              icon={<Calendar size={18} />}
            />
          </div>
        </>
      }
      chart={
        <ChartComponent
          data={result.chartData}
          lines={[
            { key: 'Total Value', label: 'Total Value' },
            { key: 'Invested', label: 'Invested' },
          ]}
          title="Investment Growth Over Time"
        />
      }
      insights={<InsightBox insights={insights} />}
      faqs={faqs}
    />
  )
}
