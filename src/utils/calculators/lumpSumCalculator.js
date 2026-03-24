/**
 * Lumpsum Investment Calculator
 */
export function calculateLumpsum(principal, annualRate, years) {
  const r = annualRate / 100
  const totalValue = principal * Math.pow(1 + r, years)
  const gains = totalValue - principal

  const chartData = []
  for (let y = 1; y <= years; y++) {
    const value = principal * Math.pow(1 + r, y)
    chartData.push({
      name: `Yr ${y}`,
      'Total Value': Math.round(value),
      'Invested': Math.round(principal),
    })
  }

  return {
    principal: Math.round(principal),
    gains: Math.round(gains),
    totalValue: Math.round(totalValue),
    chartData,
  }
}
