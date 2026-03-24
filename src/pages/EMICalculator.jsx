import { useState, useEffect } from 'react'
import { Calculator, IndianRupee, Percent } from 'lucide-react'
import CalculatorLayout from '../components/CalculatorLayout'
import InputSlider from '../components/InputSlider'
import ResultCard from '../components/ResultCard'
import ChartComponent from '../components/ChartComponent'
import InsightBox from '../components/InsightBox'
import { calculateEMI } from '../utils/calculators/emiCalculator'
import { saveToStorage, loadFromStorage } from '../utils/localStorage'
import { formatINR, formatINRFull } from '../utils/format'

const STORAGE_KEY = 'emi-inputs'
const DEFAULTS = { principal: 1000000, rate: 8.5, years: 20 }

export default function EMICalculator({ navigate }) {
  const saved = loadFromStorage(STORAGE_KEY, DEFAULTS)
  const [principal, setPrincipal] = useState(saved.principal)
  const [rate, setRate] = useState(saved.rate)
  const [years, setYears] = useState(saved.years)

  useEffect(() => {
    saveToStorage(STORAGE_KEY, { principal, rate, years })
  }, [principal, rate, years])

  const result = calculateEMI(principal, rate, years)

  const interestRatio = ((result.totalInterest / result.totalPayment) * 100).toFixed(0)

  const insights = [
    `Your monthly EMI is ${formatINR(result.emi)} for ${years} years.`,
    `You will pay ${formatINR(result.totalInterest)} in interest — ${interestRatio}% of the total repayment.`,
    `Increasing your EMI by ₹5,000/month can save significant interest and reduce tenure.`,
    `A 0.5% lower interest rate on a ${formatINR(principal)} loan saves ${formatINR(calculateEMI(principal, rate - 0.5, years).totalInterest < result.totalInterest ? result.totalInterest - calculateEMI(principal, rate - 0.5, years).totalInterest : 0)} in total interest.`,
  ]

  const faqs = [
    {
      q: 'What is EMI?',
      a: 'EMI (Equated Monthly Installment) is a fixed monthly payment you make to repay your loan. It includes both principal and interest.',
    },
    {
      q: 'How is EMI calculated?',
      a: 'EMI = P × r × (1+r)^n / ((1+r)^n - 1), where P is principal, r is monthly interest rate, and n is number of months.',
    },
    {
      q: 'Does paying more reduce loan tenure?',
      a: 'Yes! Making part-prepayments reduces the outstanding principal, which in turn reduces the total interest paid.',
    },
    {
      q: 'What is a good EMI-to-income ratio?',
      a: 'Financial advisors typically recommend keeping total EMIs below 40% of your monthly take-home income.',
    },
  ]

  return (
    <CalculatorLayout
      navigate={navigate}
      title="EMI Calculator"
      description="Calculate your Equated Monthly Installment for home loans, car loans, or personal loans. Understand the full cost of borrowing before you decide."
      inputs={
        <>
          <InputSlider
            label="Loan Amount"
            value={principal}
            min={50000}
            max={10000000}
            step={50000}
            onChange={setPrincipal}
            formatValue={(v) => formatINR(v)}
          />
          <InputSlider
            label="Annual Interest Rate"
            value={rate}
            min={1}
            max={30}
            step={0.1}
            onChange={setRate}
            formatValue={(v) => `${v}%`}
            hint="Home loans: 7–9%, Personal loans: 10–24%"
          />
          <InputSlider
            label="Loan Tenure"
            value={years}
            min={1}
            max={30}
            step={1}
            onChange={setYears}
            formatValue={(v) => `${v} yr${v > 1 ? 's' : ''}`}
          />
        </>
      }
      results={
        <>
          <ResultCard
            label="Monthly EMI"
            value={formatINR(result.emi)}
            subtitle={formatINRFull(result.emi) + ' / month'}
            highlight
            icon={<Calculator size={18} />}
          />
          <div className="grid grid-cols-2 gap-4">
            <ResultCard
              label="Principal"
              value={formatINR(result.principal)}
              icon={<IndianRupee size={18} />}
            />
            <ResultCard
              label="Total Interest"
              value={formatINR(result.totalInterest)}
              icon={<Percent size={18} />}
            />
          </div>
          <ResultCard
            label="Total Payment"
            value={formatINR(result.totalPayment)}
            subtitle="Principal + Interest"
          />
        </>
      }
      chart={
        <ChartComponent
          data={result.chartData}
          lines={[
            { key: 'Amount Paid', label: 'Amount Paid' },
            { key: 'Outstanding Loan', label: 'Outstanding Loan' },
          ]}
          title="Loan Repayment Progress"
        />
      }
      insights={<InsightBox insights={insights} />}
      faqs={faqs}
    />
  )
}
