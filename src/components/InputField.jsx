export default function InputField({
  label,
  value,
  onChange,
  prefix,
  suffix,
  min,
  max,
  step,
  placeholder,
  hint,
}) {
  const handleChange = (e) => {
    const raw = e.target.value
    if (raw === '' || raw === '-') {
      onChange(raw)
      return
    }
    const num = parseFloat(raw)
    if (!isNaN(num)) {
      if (min !== undefined && num < min) return
      if (max !== undefined && num > max) return
      onChange(num)
    }
  }

  return (
    <div className="space-y-1.5">
      <label className="block text-sm font-medium text-white/70">{label}</label>
      <div className="relative flex items-center">
        {prefix && (
          <span className="absolute left-3 text-white/40 text-sm font-medium select-none">{prefix}</span>
        )}
        <input
          type="number"
          value={value}
          onChange={handleChange}
          min={min}
          max={max}
          step={step}
          placeholder={placeholder}
          className={`input-base ${prefix ? 'pl-8' : ''} ${suffix ? 'pr-12' : ''}`}
        />
        {suffix && (
          <span className="absolute right-3 text-white/40 text-sm font-medium select-none">{suffix}</span>
        )}
      </div>
      {hint && <p className="text-xs text-white/40">{hint}</p>}
    </div>
  )
}
