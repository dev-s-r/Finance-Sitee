import { useState, useEffect } from 'react'
import { Target, IndianRupee, TrendingUp } from 'lucide-react'
import CalculatorLayout from '../components/CalculatorLayout'
import InputSlider from '../components/InputSlider'
import ResultCard from '../components/ResultCard'
import ChartComponent from '../components/ChartComponent'
import InsightBox from '../components/InsightBox'
import { calculateSavingsGoal } from '../utils/calculators/savingsGoalCalculator'
import { saveToStorage, loadFromStorage } from '../utils/localStorage'
import { formatINR, formatINRFull } from '../utils/format'

const STORAGE_KEY = 'savings-inputs'
const DEFAULTS = { goal: 5000000, rate: 12, years: 15 }

export default function SavingsGoalCalculator({ navigate }) {
  const saved = loadFromStorage(STORAGE_KEY, DEFAULTS)
  const [goal, setGoal] = useState(saved.goal)
  const [rate, setRate] = useState(saved.rate)
  const [years, setYears] = useState(saved.years)

  useEffect(() => {
    saveToStorage(STORAGE_KEY, { goal, rate, years })
  }, [goal, rate, years])

  const result = calculateSavingsGoal(goal, rate, years)
  const gainsPct = result.totalInvested > 0 ? ((result.totalGains / result.totalInvested) * 100).toFixed(0) : 0

  const insights = [
    `You need to invest ${formatINR(result.monthlyRequired)}/month to reach ${formatINR(goal)} in ${years} years.`,
    `Total invested: ${formatINR(result.totalInvested)} — the market does the rest, generating ${formatINR(result.totalGains)} in gains.`,
    `Starting 5 years earlier reduces monthly requirement to ${formatINR(calculateSavingsGoal(goal, rate, years + 5).monthlyRequired)}.`,
    `Higher returns mean lower monthly requirement — at 15%: ${formatINR(calculateSavingsGoal(goal, 15, years).monthlyRequired)}/month vs ${formatINR(result.monthlyRequired)}/month at ${rate}%.`,
  ]

  const faqs = [
    {
      q: 'How does this calculator work?',
      a: 'It calculates the monthly SIP amount needed to accumulate a target corpus, using compound interest formula for SIP investments.',
    },
    {
      q: 'What goal can I plan for?',
      a: 'Child\'s education, retirement corpus, home down payment, emergency fund, vacation — any financial goal with a target amount and timeline.',
    },
    {
      q: 'What if I can\'t invest the full required amount?',
      a: 'Start with whatever you can. Even investing 50% of the calculated amount gets you halfway there. Increase SIP amount as your income grows.',
    },
    {
      q: 'Should I account for inflation in my goal?',
      a: 'Yes! If your goal is 10 years away, the real cost will be higher due to inflation. Multiply your goal by (1 + inflation rate)^years for a more accurate target.',
    },
  ]

  return (
    <CalculatorLayout
      navigate={navigate}
      title="Savings Goal Calculator"
      description="Find out exactly how much you need to invest each month to reach your financial goal. Whether it is a dream home, retirement, or your child's education — start planning today."
      inputs={
        <>
          <InputSlider
            label="Target Corpus (Goal Amount)"
            value={goal}
            min={100000}
            max={100000000}
            step={100000}
            onChange={setGoal}
            formatValue={(v) => formatINR(v)}
            hint="Dream home down payment, retirement fund, education corpus..."
          />
          <InputSlider
            label="Expected Annual Return"
            value={rate}
            min={1}
            max={30}
            step={0.5}
            onChange={setRate}
            formatValue={(v) => `${v}%`}
            hint="Equity MF: 10–14%, Balanced fund: 8–10%, Debt: 6–8%"
          />
          <InputSlider
            label="Time to Achieve Goal"
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
            label="Monthly Investment Required"
            value={formatINR(result.monthlyRequired)}
            subtitle={formatINRFull(result.monthlyRequired) + ' / month'}
            highlight
            icon={<Target size={18} />}
          />
          <div className="grid grid-cols-2 gap-4">
            <ResultCard
              label="Total Invested"
              value={formatINR(result.totalInvested)}
              icon={<IndianRupee size={18} />}
            />
            <ResultCard
              label="Gains from Market"
              value={formatINR(result.totalGains)}
              subtitle={`${gainsPct}% of invested`}
              icon={<TrendingUp size={18} />}
            />
          </div>
        </>
      }
      chart={
        <ChartComponent
          data={result.chartData}
          lines={[
            { key: 'Accumulated', label: 'Accumulated' },
            { key: 'Invested', label: 'Invested' },
            { key: 'Goal', label: 'Goal' },
          ]}
          title="Progress Towards Your Goal"
        />
      }
      insights={<InsightBox insights={insights} />}
      faqs={faqs}
    />
  )
}
