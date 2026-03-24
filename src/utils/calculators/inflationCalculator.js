/**
 * Inflation Impact Calculator
 */
export function calculateInflation(currentAmount, inflationRate, years) {
  const futureValue = currentAmount * Math.pow(1 + inflationRate / 100, years)
  const realValueNow = currentAmount / Math.pow(1 + inflationRate / 100, years)
  const purchasingPowerLoss = currentAmount - realValueNow

  const chartData = []
  for (let y = 0; y <= years; y++) {
    const futureEquivalent = currentAmount * Math.pow(1 + inflationRate / 100, y)
    const realPower = currentAmount / Math.pow(1 + inflationRate / 100, y)
    chartData.push({
      name: `Yr ${y}`,
      'Future Cost': Math.round(futureEquivalent),
      'Real Value Today': Math.round(realPower),
    })
  }

  return {
    currentAmount: Math.round(currentAmount),
    futureValue: Math.round(futureValue),
    realValueNow: Math.round(realValueNow),
    purchasingPowerLoss: Math.round(purchasingPowerLoss),
    chartData,
  }
}
