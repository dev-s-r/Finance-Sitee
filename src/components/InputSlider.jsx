export default function InputSlider({
  label,
  value,
  min,
  max,
  step = 1,
  onChange,
  formatValue,
  hint,
}) {
  const percentage = ((value - min) / (max - min)) * 100

  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <label className="text-sm font-medium text-white/70">{label}</label>
        <span className="text-sm font-semibold text-primary-400 bg-primary-500/10 px-3 py-1 rounded-lg">
          {formatValue ? formatValue(value) : value}
        </span>
      </div>
      <div className="relative">
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className="w-full h-2 rounded-full appearance-none cursor-pointer"
          style={{
            background: `linear-gradient(to right, #22c55e ${percentage}%, rgba(255,255,255,0.1) ${percentage}%)`,
          }}
        />
      </div>
      <div className="flex justify-between text-xs text-white/30">
        <span>{formatValue ? formatValue(min) : min}</span>
        <span>{formatValue ? formatValue(max) : max}</span>
      </div>
      {hint && <p className="text-xs text-white/40">{hint}</p>}
    </div>
  )
}
