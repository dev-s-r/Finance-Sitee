/**
 * EMI Calculator
 * Calculates Equated Monthly Installment for loans
 */
export function calculateEMI(principal, annualRate, tenureYears) {
  const r = annualRate / 100 / 12
  const n = tenureYears * 12

  if (r === 0) {
    const emi = principal / n
    return {
      emi: Math.round(emi),
      totalPayment: Math.round(principal),
      totalInterest: 0,
      principal: Math.round(principal),
      chartData: [],
    }
  }

  const emi = (principal * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1)
  const totalPayment = emi * n
  const totalInterest = totalPayment - principal

  // Year-by-year outstanding balance
  const chartData = []
  let balance = principal
  for (let y = 1; y <= tenureYears; y++) {
    for (let m = 0; m < 12; m++) {
      const interestPart = balance * r
      const principalPart = emi - interestPart
      balance = Math.max(0, balance - principalPart)
    }
    chartData.push({
      name: `Yr ${y}`,
      'Outstanding Loan': Math.round(balance),
      'Amount Paid': Math.round(emi * y * 12),
    })
  }

  return {
    emi: Math.round(emi),
    totalPayment: Math.round(totalPayment),
    totalInterest: Math.round(totalInterest),
    principal: Math.round(principal),
    chartData,
  }
}
