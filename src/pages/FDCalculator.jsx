import { useState, useEffect } from 'react'
import { PiggyBank, IndianRupee, Calendar } from 'lucide-react'
import CalculatorLayout from '../components/CalculatorLayout'
import InputSlider from '../components/InputSlider'
import ResultCard from '../components/ResultCard'
import ChartComponent from '../components/ChartComponent'
import InsightBox from '../components/InsightBox'
import { calculateFD } from '../utils/calculators/fdCalculator'
import { saveToStorage, loadFromStorage } from '../utils/localStorage'
import { formatINR, formatINRFull } from '../utils/format'

const STORAGE_KEY = 'fd-inputs'
const DEFAULTS = { principal: 100000, rate: 7.0, years: 5 }

const COMPOUNDING = [
  { label: 'Monthly (12x)', value: 12 },
  { label: 'Quarterly (4x)', value: 4 },
  { label: 'Half-Yearly (2x)', value: 2 },
  { label: 'Yearly (1x)', value: 1 },
]

export default function FDCalculator({ navigate }) {
  const saved = loadFromStorage(STORAGE_KEY, DEFAULTS)
  const [principal, setPrincipal] = useState(saved.principal)
  const [rate, setRate] = useState(saved.rate)
  const [years, setYears] = useState(saved.years)
  const [compounding, setCompounding] = useState(4)

  useEffect(() => {
    saveToStorage(STORAGE_KEY, { principal, rate, years })
  }, [principal, rate, years])

  const result = calculateFD(principal, rate, years, compounding)

  const insights = [
    `Your FD of ${formatINR(principal)} earns ${formatINR(result.interest)} as interest over ${years} years.`,
    `The effective annual yield with ${COMPOUNDING.find(c => c.value === compounding)?.label} is ${((Math.pow(1 + rate / 100 / compounding, compounding) - 1) * 100).toFixed(2)}%.`,
    `Senior citizens typically get 0.25–0.5% higher rates on FDs.`,
    `FD interest is taxable as per your income tax slab — consider tax-efficient alternatives for long tenures.`,
  ]

  const faqs = [
    {
      q: 'What is a Fixed Deposit?',
      a: 'A Fixed Deposit (FD) is a savings instrument where you deposit a lump sum for a fixed tenure at a predetermined interest rate.',
    },
    {
      q: 'What is compounding frequency?',
      a: 'Compounding frequency determines how often interest is calculated and added to your principal. Higher frequency = higher effective returns.',
    },
    {
      q: 'Are FDs safe?',
      a: 'Bank FDs are insured up to ₹5 lakh by DICGC. They are among the safest investment options.',
    },
    {
      q: 'Can I break an FD early?',
      a: 'Yes, but premature withdrawal usually carries a 0.5–1% penalty on the interest rate.',
    },
  ]

  return (
    <CalculatorLayout
      navigate={navigate}
      title="FD Calculator"
      description="Calculate the maturity amount and interest earned on your Fixed Deposit. Compare different tenures and compounding frequencies to maximize your returns."
      inputs={
        <>
          <InputSlider
            label="Principal Amount"
            value={principal}
            min={1000}
            max={10000000}
            step={1000}
            onChange={setPrincipal}
            formatValue={(v) => formatINR(v)}
          />
          <InputSlider
            label="Annual Interest Rate"
            value={rate}
            min={2}
            max={15}
            step={0.1}
            onChange={setRate}
            formatValue={(v) => `${v}%`}
            hint="Bank FD rates: 5–8%, Small finance banks: up to 9%"
          />
          <InputSlider
            label="Tenure"
            value={years}
            min={1}
            max={30}
            step={1}
            onChange={setYears}
            formatValue={(v) => `${v} yr${v > 1 ? 's' : ''}`}
          />
          <div className="space-y-2">
            <label className="text-sm font-medium text-white/70">Compounding Frequency</label>
            <div className="grid grid-cols-2 gap-2">
              {COMPOUNDING.map((c) => (
                <button
                  key={c.value}
                  onClick={() => setCompounding(c.value)}
                  className={`py-2 px-3 rounded-xl text-sm font-medium transition-all ${
                    compounding === c.value
                      ? 'bg-primary-500/20 text-primary-400 border border-primary-500/40'
                      : 'bg-dark-200 text-white/50 border border-white/10 hover:border-white/20'
                  }`}
                >
                  {c.label}
                </button>
              ))}
            </div>
          </div>
        </>
      }
      results={
        <>
          <ResultCard
            label="Maturity Amount"
            value={formatINR(result.maturity)}
            subtitle={formatINRFull(result.maturity)}
            highlight
            icon={<PiggyBank size={18} />}
          />
          <div className="grid grid-cols-2 gap-4">
            <ResultCard
              label="Principal"
              value={formatINR(result.principal)}
              icon={<IndianRupee size={18} />}
            />
            <ResultCard
              label="Interest Earned"
              value={formatINR(result.interest)}
              icon={<Calendar size={18} />}
            />
          </div>
        </>
      }
      chart={
        <ChartComponent
          data={result.chartData}
          lines={[
            { key: 'Maturity Value', label: 'Maturity Value' },
            { key: 'Principal', label: 'Principal' },
          ]}
          title="FD Growth Over Time"
        />
      }
      insights={<InsightBox insights={insights} />}
      faqs={faqs}
    />
  )
}
