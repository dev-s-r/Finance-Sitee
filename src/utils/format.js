export const formatINR = (amount) => {
  if (amount >= 10000000) return `₹${(amount / 10000000).toFixed(2)} Cr`
  if (amount >= 100000) return `₹${(amount / 100000).toFixed(2)} L`
  if (amount >= 1000) return `₹${(amount / 1000).toFixed(1)} K`
  return `₹${Math.round(amount).toLocaleString('en-IN')}`
}

export const formatINRFull = (amount) =>
  `₹${Math.round(amount).toLocaleString('en-IN')}`
