/**
 * Savings Goal Calculator
 * Calculate required monthly SIP to reach a goal
 */
export function calculateSavingsGoal(goalAmount, annualRate, years) {
  const r = annualRate / 100 / 12
  const n = years * 12

  if (r === 0) {
    const monthly = goalAmount / n
    return {
      monthlyRequired: Math.round(monthly),
      totalInvested: Math.round(monthly * n),
      totalGains: 0,
      goalAmount: Math.round(goalAmount),
      chartData: [],
    }
  }

  const monthlyRequired = goalAmount * r / (((Math.pow(1 + r, n) - 1)) * (1 + r))
  const totalInvested = monthlyRequired * n
  const totalGains = goalAmount - totalInvested

  const chartData = []
  for (let y = 1; y <= years; y++) {
    const months = y * 12
    const accumulated = monthlyRequired * (((Math.pow(1 + r, months) - 1) / r) * (1 + r))
    const invested = monthlyRequired * months
    chartData.push({
      name: `Yr ${y}`,
      'Accumulated': Math.round(accumulated),
      'Invested': Math.round(invested),
      'Goal': Math.round(goalAmount),
    })
  }

  return {
    monthlyRequired: Math.round(monthlyRequired),
    totalInvested: Math.round(totalInvested),
    totalGains: Math.round(totalGains),
    goalAmount: Math.round(goalAmount),
    chartData,
  }
}
