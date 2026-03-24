import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts'

const formatINR = (value) => {
  if (value >= 10000000) return `₹${(value / 10000000).toFixed(1)}Cr`
  if (value >= 100000) return `₹${(value / 100000).toFixed(1)}L`
  if (value >= 1000) return `₹${(value / 1000).toFixed(0)}K`
  return `₹${value}`
}

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null
  return (
    <div className="glass-card px-4 py-3 text-sm">
      <p className="text-white/60 mb-2 font-medium">{label}</p>
      {payload.map((entry) => (
        <p key={entry.name} style={{ color: entry.color }} className="font-semibold">
          {entry.name}: {formatINR(entry.value)}
        </p>
      ))}
    </div>
  )
}

export default function ChartComponent({ data, lines = [], title }) {
  if (!data?.length) return null

  const colors = ['#22c55e', '#60a5fa', '#f59e0b', '#a78bfa']

  return (
    <div className="glass-card p-5">
      {title && <h3 className="text-sm font-semibold text-white/70 mb-4">{title}</h3>}
      <ResponsiveContainer width="100%" height={260}>
        <AreaChart data={data} margin={{ top: 5, right: 10, left: 0, bottom: 5 }}>
          <defs>
            {lines.map((line, i) => (
              <linearGradient key={line.key} id={`gradient-${i}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={colors[i % colors.length]} stopOpacity={0.3} />
                <stop offset="95%" stopColor={colors[i % colors.length]} stopOpacity={0} />
              </linearGradient>
            ))}
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
          <XAxis
            dataKey="name"
            tick={{ fill: 'rgba(255,255,255,0.4)', fontSize: 11 }}
            axisLine={{ stroke: 'rgba(255,255,255,0.1)' }}
            tickLine={false}
          />
          <YAxis
            tickFormatter={formatINR}
            tick={{ fill: 'rgba(255,255,255,0.4)', fontSize: 11 }}
            axisLine={false}
            tickLine={false}
            width={60}
          />
          <Tooltip content={<CustomTooltip />} />
          {lines.length > 1 && (
            <Legend
              wrapperStyle={{ color: 'rgba(255,255,255,0.5)', fontSize: '12px', paddingTop: '12px' }}
            />
          )}
          {lines.map((line, i) => (
            <Area
              key={line.key}
              type="monotone"
              dataKey={line.key}
              name={line.label || line.key}
              stroke={colors[i % colors.length]}
              strokeWidth={2}
              fill={`url(#gradient-${i})`}
              dot={false}
              activeDot={{ r: 5, strokeWidth: 0 }}
            />
          ))}
        </AreaChart>
      </ResponsiveContainer>
    </div>
  )
}
