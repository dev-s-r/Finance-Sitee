import { useState, useEffect } from 'react'
import { Percent, TrendingUp, Calendar } from 'lucide-react'
import CalculatorLayout from '../components/CalculatorLayout'
import InputSlider from '../components/InputSlider'
import ResultCard from '../components/ResultCard'
import ChartComponent from '../components/ChartComponent'
import InsightBox from '../components/InsightBox'
import { calculateCAGR } from '../utils/calculators/cagrCalculator'
import { saveToStorage, loadFromStorage } from '../utils/localStorage'
import { formatINR } from '../utils/format'

const STORAGE_KEY = 'cagr-inputs'
const DEFAULTS = { beginValue: 100000, endValue: 250000, years: 8 }

export default function CAGRCalculator({ navigate }) {
  const saved = loadFromStorage(STORAGE_KEY, DEFAULTS)
  const [beginValue, setBeginValue] = useState(saved.beginValue)
  const [endValue, setEndValue] = useState(saved.endValue)
  const [years, setYears] = useState(saved.years)

  useEffect(() => {
    saveToStorage(STORAGE_KEY, { beginValue, endValue, years })
  }, [beginValue, endValue, years])

  const result = calculateCAGR(beginValue, endValue, years)

  const insights = [
    `CAGR of ${result.cagr}% means your investment grew at this steady rate every year for ${years} years.`,
    `Absolute return: ${result.absoluteReturn}% over the entire ${years}-year period.`,
    `A CAGR above 12% is generally considered excellent for a diversified equity portfolio.`,
    `Nifty 50 has delivered ~12–14% CAGR over long periods (10+ years).`,
  ]

  const faqs = [
    {
      q: 'What is CAGR?',
      a: 'Compound Annual Growth Rate (CAGR) is the rate at which an investment would have grown if it had grown at a steady rate annually. It smooths out the year-to-year volatility.',
    },
    {
      q: 'CAGR vs Absolute Return — what is the difference?',
      a: 'Absolute return is the total % growth. CAGR is the annualized version of that growth. CAGR is more useful for comparing investments over different periods.',
    },
    {
      q: 'What is a good CAGR?',
      a: 'For equity investments: 12–15% is excellent. For FDs/debt: 6–8% is typical. Context depends on the risk level of the investment.',
    },
    {
      q: 'Does CAGR account for dividends?',
      a: 'Only if you include dividends in the ending value. For total returns, use Total Return CAGR which includes dividends reinvested.',
    },
  ]

  return (
    <CalculatorLayout
      navigate={navigate}
      title="CAGR Calculator"
      description="Measure the Compound Annual Growth Rate of any investment. CAGR gives you a single, normalized rate to compare investments across different time periods."
      inputs={
        <>
          <InputSlider
            label="Beginning Value"
            value={beginValue}
            min={1000}
            max={10000000}
            step={1000}
            onChange={setBeginValue}
            formatValue={(v) => formatINR(v)}
            hint="Initial investment or portfolio value"
          />
          <InputSlider
            label="Ending Value"
            value={endValue}
            min={1000}
            max={50000000}
            step={1000}
            onChange={setEndValue}
            formatValue={(v) => formatINR(v)}
            hint="Current or final portfolio value"
          />
          <InputSlider
            label="Investment Period"
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
            label="CAGR"
            value={`${result.cagr}%`}
            subtitle="Compound Annual Growth Rate"
            highlight
            icon={<Percent size={18} />}
          />
          <div className="grid grid-cols-2 gap-4">
            <ResultCard
              label="Absolute Return"
              value={`${result.absoluteReturn}%`}
              icon={<TrendingUp size={18} />}
            />
            <ResultCard
              label="Over"
              value={`${years} years`}
              icon={<Calendar size={18} />}
            />
          </div>
        </>
      }
      chart={
        <ChartComponent
          data={result.chartData}
          lines={[{ key: 'Value', label: 'Portfolio Value' }]}
          title="Investment Growth at This CAGR"
        />
      }
      insights={<InsightBox insights={insights} />}
      faqs={faqs}
    />
  )
}
