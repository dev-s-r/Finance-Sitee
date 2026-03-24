const PREFIX = 'wealthlab-'

export function saveToStorage(key, value) {
  try {
    localStorage.setItem(PREFIX + key, JSON.stringify(value))
  } catch (e) {
    // storage unavailable
  }
}

export function loadFromStorage(key, defaultValue) {
  try {
    const item = localStorage.getItem(PREFIX + key)
    return item ? JSON.parse(item) : defaultValue
  } catch (e) {
    return defaultValue
  }
}
