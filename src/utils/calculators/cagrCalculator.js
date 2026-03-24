/**
 * CAGR Calculator
 * Compound Annual Growth Rate
 */
export function calculateCAGR(beginningValue, endingValue, years) {
  if (beginningValue <= 0 || endingValue <= 0 || years <= 0) {
    return { cagr: 0, absoluteReturn: 0, chartData: [] }
  }

  const cagr = (Math.pow(endingValue / beginningValue, 1 / years) - 1) * 100
  const absoluteReturn = ((endingValue - beginningValue) / beginningValue) * 100

  const chartData = []
  for (let y = 0; y <= years; y++) {
    const value = beginningValue * Math.pow(1 + cagr / 100, y)
    chartData.push({
      name: `Yr ${y}`,
      'Value': Math.round(value),
    })
  }

  return {
    cagr: parseFloat(cagr.toFixed(2)),
    absoluteReturn: parseFloat(absoluteReturn.toFixed(2)),
    chartData,
  }
}

/**
 * Calculate future value given CAGR
 */
export function projectWithCAGR(presentValue, cagr, years) {
  return presentValue * Math.pow(1 + cagr / 100, years)
}
