import { useState, useEffect } from 'react'
import { DollarSign, IndianRupee, TrendingUp } from 'lucide-react'
import CalculatorLayout from '../components/CalculatorLayout'
import InputSlider from '../components/InputSlider'
import ResultCard from '../components/ResultCard'
import ChartComponent from '../components/ChartComponent'
import InsightBox from '../components/InsightBox'
import { calculateLumpsum } from '../utils/calculators/lumpSumCalculator'
import { saveToStorage, loadFromStorage } from '../utils/localStorage'
import { formatINR, formatINRFull } from '../utils/format'

const STORAGE_KEY = 'lumpsum-inputs'
const DEFAULTS = { principal: 500000, rate: 12, years: 10 }

export default function LumpSumCalculator({ navigate }) {
  const saved = loadFromStorage(STORAGE_KEY, DEFAULTS)
  const [principal, setPrincipal] = useState(saved.principal)
  const [rate, setRate] = useState(saved.rate)
  const [years, setYears] = useState(saved.years)

  useEffect(() => {
    saveToStorage(STORAGE_KEY, { principal, rate, years })
  }, [principal, rate, years])

  const result = calculateLumpsum(principal, rate, years)
  const multiplier = (result.totalValue / result.principal).toFixed(1)

  const insights = [
    `Your investment of ${formatINR(principal)} grows to ${formatINR(result.totalValue)} — a ${multiplier}x return in ${years} years.`,
    `The rule of 72: at ${rate}% returns, your money doubles every ~${(72 / rate).toFixed(1)} years.`,
    `Returns are ${((result.gains / result.principal) * 100).toFixed(0)}% of the invested amount — powered by compounding.`,
    `Staying invested for 5 more years could push returns to ${formatINR(calculateLumpsum(principal, rate, years + 5).totalValue)}.`,
  ]

  const faqs = [
    {
      q: 'What is a Lumpsum investment?',
      a: 'A lumpsum investment is a one-time investment of a large sum in a mutual fund or instrument, as opposed to regular SIP installments.',
    },
    {
      q: 'Lumpsum vs SIP — which is better?',
      a: 'Lumpsum is better when markets are at a low point. SIP is better for regular income earners as it averages out market volatility.',
    },
    {
      q: 'What returns are realistic?',
      a: 'Large-cap equity funds average 10–12%, mid/small-cap can deliver 14–18% over long periods, but past performance is not a guarantee.',
    },
    {
      q: 'Is lumpsum risky?',
      a: 'Yes, timing risk is higher. Entering at a market peak can lead to short-term losses. A longer horizon (5+ years) reduces this risk significantly.',
    },
  ]

  return (
    <CalculatorLayout
      navigate={navigate}
      title="Lumpsum Calculator"
      description="Calculate how a one-time investment grows over time. Perfect for understanding the impact of investing a bonus, windfall, or savings in equity or debt markets."
      inputs={
        <>
          <InputSlider
            label="Investment Amount"
            value={principal}
            min={10000}
            max={10000000}
            step={10000}
            onChange={setPrincipal}
            formatValue={(v) => formatINR(v)}
          />
          <InputSlider
            label="Expected Annual Return"
            value={rate}
            min={1}
            max={30}
            step={0.5}
            onChange={setRate}
            formatValue={(v) => `${v}%`}
            hint="Equity: 10–14%, Debt: 6–8%, FD: 5–7%"
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
              value={formatINR(result.principal)}
              icon={<IndianRupee size={18} />}
            />
            <ResultCard
              label="Est. Gains"
              value={formatINR(result.gains)}
              icon={<DollarSign size={18} />}
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
          title="Lumpsum Growth Over Time"
        />
      }
      insights={<InsightBox insights={insights} />}
      faqs={faqs}
    />
  )
}
