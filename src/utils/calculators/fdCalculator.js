/**
 * Fixed Deposit Calculator
 */
export function calculateFD(principal, annualRate, years, compoundingFrequency = 4) {
  const r = annualRate / 100
  const n = compoundingFrequency
  const t = years

  const maturity = principal * Math.pow(1 + r / n, n * t)
  const interest = maturity - principal

  const chartData = []
  for (let y = 1; y <= years; y++) {
    const value = principal * Math.pow(1 + r / n, n * y)
    chartData.push({
      name: `Yr ${y}`,
      'Maturity Value': Math.round(value),
      'Principal': Math.round(principal),
    })
  }

  return {
    principal: Math.round(principal),
    interest: Math.round(interest),
    maturity: Math.round(maturity),
    chartData,
  }
}
