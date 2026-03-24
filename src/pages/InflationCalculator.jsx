import { useState, useEffect } from 'react'
import { Activity, IndianRupee, TrendingDown } from 'lucide-react'
import CalculatorLayout from '../components/CalculatorLayout'
import InputSlider from '../components/InputSlider'
import ResultCard from '../components/ResultCard'
import ChartComponent from '../components/ChartComponent'
import InsightBox from '../components/InsightBox'
import { calculateInflation } from '../utils/calculators/inflationCalculator'
import { saveToStorage, loadFromStorage } from '../utils/localStorage'
import { formatINR, formatINRFull } from '../utils/format'

const STORAGE_KEY = 'inflation-inputs'
const DEFAULTS = { amount: 100000, inflationRate: 6, years: 10 }

export default function InflationCalculator({ navigate }) {
  const saved = loadFromStorage(STORAGE_KEY, DEFAULTS)
  const [amount, setAmount] = useState(saved.amount)
  const [inflationRate, setInflationRate] = useState(saved.inflationRate)
  const [years, setYears] = useState(saved.years)

  useEffect(() => {
    saveToStorage(STORAGE_KEY, { amount, inflationRate, years })
  }, [amount, inflationRate, years])

  const result = calculateInflation(amount, inflationRate, years)
  const powerLossPct = ((result.purchasingPowerLoss / result.currentAmount) * 100).toFixed(0)

  const insights = [
    `In ${years} years, what costs ${formatINR(amount)} today will cost ${formatINR(result.futureValue)} — a ${Math.round(result.futureValue / amount)}x increase.`,
    `Your purchasing power drops by ${powerLossPct}% — ₹${amount.toLocaleString('en-IN')} today is worth only ${formatINR(result.realValueNow)} in real terms.`,
    `India's average inflation is ~5–6% p.a. Keeping money in savings account (3–4%) means you lose money in real terms.`,
    `To preserve purchasing power, your investments must grow at least ${inflationRate}% annually.`,
  ]

  const faqs = [
    {
      q: 'What is inflation?',
      a: 'Inflation is the general increase in prices over time. As prices rise, the purchasing power of your money decreases.',
    },
    {
      q: 'What is India\'s typical inflation rate?',
      a: 'India\'s CPI inflation has averaged 5–7% over the past decade, with food inflation sometimes higher.',
    },
    {
      q: 'How does inflation affect investments?',
      a: 'If your investment returns are lower than inflation, your real returns are negative. Always compare returns against inflation.',
    },
    {
      q: 'What is "real return"?',
      a: 'Real return = Nominal return − Inflation rate. For example, 10% return with 6% inflation gives a real return of ~4%.',
    },
  ]

  return (
    <CalculatorLayout
      navigate={navigate}
      title="Inflation Impact Calculator"
      description="Understand how inflation erodes the purchasing power of your money over time. See what today's money will be worth in the future and plan accordingly."
      inputs={
        <>
          <InputSlider
            label="Current Amount"
            value={amount}
            min={1000}
            max={10000000}
            step={1000}
            onChange={setAmount}
            formatValue={(v) => formatINR(v)}
          />
          <InputSlider
            label="Expected Inflation Rate"
            value={inflationRate}
            min={1}
            max={20}
            step={0.5}
            onChange={setInflationRate}
            formatValue={(v) => `${v}%`}
            hint="India avg CPI inflation: 5–6% p.a."
          />
          <InputSlider
            label="Time Period"
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
            label="Future Cost"
            value={formatINR(result.futureValue)}
            subtitle={`What ${formatINR(amount)} costs in ${years} years`}
            highlight
            icon={<Activity size={18} />}
          />
          <div className="grid grid-cols-2 gap-4">
            <ResultCard
              label="Real Value Today"
              value={formatINR(result.realValueNow)}
              subtitle="Today's equivalent"
              icon={<IndianRupee size={18} />}
            />
            <ResultCard
              label="Purchasing Power Lost"
              value={formatINR(result.purchasingPowerLoss)}
              subtitle={`${powerLossPct}% erosion`}
              icon={<TrendingDown size={18} />}
            />
          </div>
        </>
      }
      chart={
        <ChartComponent
          data={result.chartData}
          lines={[
            { key: 'Future Cost', label: 'Future Cost' },
            { key: 'Real Value Today', label: 'Real Value Today' },
          ]}
          title="Inflation Impact Over Time"
        />
      }
      insights={<InsightBox insights={insights} />}
      faqs={faqs}
    />
  )
}
