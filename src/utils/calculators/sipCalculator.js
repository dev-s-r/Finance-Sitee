/**
 * SIP Calculator
 * Calculates returns for Systematic Investment Plan
 */
export function calculateSIP(monthlyInvestment, annualRate, years) {
  const r = annualRate / 100 / 12
  const n = years * 12
  const invested = monthlyInvestment * n

  if (r === 0) {
    return { invested, gains: 0, totalValue: invested, chartData: [] }
  }

  const totalValue = monthlyInvestment * (((Math.pow(1 + r, n) - 1) / r) * (1 + r))
  const gains = totalValue - invested

  // Generate year-by-year chart data
  const chartData = []
  for (let y = 1; y <= years; y++) {
    const months = y * 12
    const value = monthlyInvestment * (((Math.pow(1 + r, months) - 1) / r) * (1 + r))
    const inv = monthlyInvestment * months
    chartData.push({
      name: `Yr ${y}`,
      'Total Value': Math.round(value),
      'Invested': Math.round(inv),
    })
  }

  return {
    invested: Math.round(invested),
    gains: Math.round(gains),
    totalValue: Math.round(totalValue),
    chartData,
  }
}
