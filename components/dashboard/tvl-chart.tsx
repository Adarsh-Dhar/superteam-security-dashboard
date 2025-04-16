interface TVLData {
  date: string
  value: number
}

interface TVLChartProps {
  data: TVLData[]
  exploitDate: string
  title?: string
  showPercentageChange?: boolean
}

export function TVLChart({
  data,
  exploitDate,
  title = "Protocol TVL Before and After Exploit",
  showPercentageChange = true,
}: TVLChartProps) {
  // Validate inputs
  if (!data || !Array.isArray(data) || data.length === 0) {
    return <div className="w-full h-64 flex items-center justify-center">No data available</div>
  }

  if (!exploitDate) {
    return <div className="w-full h-64 flex items-center justify-center">Exploit date required</div>
  }

  // Chart dimensions and margins
  const width = 400
  const height = 300
  const chartWidth = 300
  const chartHeight = 200
  const marginLeft = 50
  const marginTop = 50
  const marginBottom = 50

  // Parse exploit date
  const exploitDateObj = new Date(exploitDate)

  // Split data into before and after exploit
  const beforeExploit = data.filter((d) => new Date(d.date) < exploitDateObj)
  const afterExploit = data.filter((d) => new Date(d.date) >= exploitDateObj)

  // Calculate TVL before and after exploit (for comparison)
  const lastBeforeExploit = beforeExploit.length > 0 ? beforeExploit[beforeExploit.length - 1] : null
  const firstAfterExploit = afterExploit.length > 0 ? afterExploit[0] : null

  let percentageChange = 0
  if (lastBeforeExploit && firstAfterExploit) {
    percentageChange = ((firstAfterExploit.value - lastBeforeExploit.value) / lastBeforeExploit.value) * 100
  }

  // Calculate scales
  const minDate = new Date(data[0].date).getTime()
  const maxDate = new Date(data[data.length - 1].date).getTime()
  const dateRange = maxDate - minDate

  const values = data.map((d) => d.value)
  const maxValue = Math.max(...values)
  const minValue = Math.min(...values)

  // Determine appropriate value scaling based on data range
  let valueStep, valuePrefix
  if (maxValue >= 1_000_000_000) {
    valueStep = 500_000_000 // 500M steps for billion+ values
    valuePrefix = "B"
  } else if (maxValue >= 100_000_000) {
    valueStep = 100_000_000 // 100M steps
    valuePrefix = "M"
  } else if (maxValue >= 10_000_000) {
    valueStep = 10_000_000 // 10M steps
    valuePrefix = "M"
  } else if (maxValue >= 1_000_000) {
    valueStep = 1_000_000 // 1M steps
    valuePrefix = "M"
  } else if (maxValue >= 100_000) {
    valueStep = 100_000 // 100K steps
    valuePrefix = "K"
  } else {
    valueStep = 10_000 // 10K steps
    valuePrefix = "K"
  }

  // Add some padding to the max value for better visualization
  const paddedMax = Math.ceil(maxValue / valueStep) * valueStep
  // Ensure we show zero if values are close to it
  const paddedMin = minValue < maxValue * 0.2 ? 0 : Math.floor(minValue / valueStep) * valueStep

  const valueRange = paddedMax - paddedMin

  // Function to scale x position
  const scaleX = (date: string): number => {
    const dateObj = new Date(date).getTime()
    const percent = (dateObj - minDate) / dateRange
    return marginLeft + percent * chartWidth
  }

  // Function to scale y position
  const scaleY = (value: number): number => {
    if (valueRange === 0) return marginTop + chartHeight / 2
    const percent = (value - paddedMin) / valueRange
    return marginTop + chartHeight - percent * chartHeight
  }

  // Generate paths for the line
  const beforePath = beforeExploit
    .map((d, i) => {
      const x = scaleX(d.date)
      const y = scaleY(d.value)
      return (i === 0 ? "M" : "L") + x + "," + y
    })
    .join(" ")

  const afterPath = afterExploit
    .map((d, i) => {
      const x = scaleX(d.date)
      const y = scaleY(d.value)
      return (i === 0 ? "M" : "L") + x + "," + y
    })
    .join(" ")

  // Format currency for display
  const formatCurrency = (value: number): string => {
    if (value >= 1000000000) {
      return `$${(value / 1000000000).toFixed(1)}B`
    } else if (value >= 1000000) {
      return `$${(value / 1000000).toFixed(1)}M`
    } else if (value >= 1000) {
      return `$${(value / 1000).toFixed(1)}K`
    }
    return `$${value.toLocaleString()}`
  }

  // Format date labels
  const formatDate = (date: string): string => {
    const dateObj = new Date(date)
    return dateObj.toLocaleDateString("en-US", { month: "short", day: "numeric" })
  }

  // Generate tick marks for y-axis (approximately 5 ticks)
  const yTicks = []
  const yTickCount = 5
  for (let i = 0; i < yTickCount; i++) {
    const value = paddedMin + (valueRange / (yTickCount - 1)) * i
    yTicks.push({
      value,
      y: scaleY(value),
      label: formatCurrency(value),
    })
  }

  // Generate tick marks for x-axis (show ~4-6 tick marks)
  const xTicks = []
  const tickCount = Math.min(data.length, Math.max(4, Math.min(6, Math.floor(data.length / 3))))
  
  for (let i = 0; i < tickCount; i++) {
    const index = Math.floor((i * (data.length - 1)) / (tickCount - 1))
    const item = data[index]
    xTicks.push({
      date: item.date,
      x: scaleX(item.date),
      label: formatDate(item.date),
    })
  }

  // Calculate exploit point x position
  const exploitX = scaleX(exploitDate)

  return (
    <div className="w-full h-80">
      <div className="text-center font-semibold mb-2">{title}</div>
      {showPercentageChange && lastBeforeExploit && firstAfterExploit && (
        <div className="text-center text-sm mb-1">
          Impact: {percentageChange.toFixed(1)}% change (
          {formatCurrency(lastBeforeExploit.value)} → {formatCurrency(firstAfterExploit.value)})
        </div>
      )}

      <svg viewBox={`0 0 ${width} ${height}`} xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        {/* Chart axes */}
        <line 
          x1={marginLeft} 
          y1={marginTop + chartHeight} 
          x2={marginLeft + chartWidth} 
          y2={marginTop + chartHeight} 
          stroke="hsl(var(--muted-foreground))" 
          strokeWidth="1" 
        />
        <line 
          x1={marginLeft} 
          y1={marginTop + chartHeight} 
          x2={marginLeft} 
          y2={marginTop} 
          stroke="hsl(var(--muted-foreground))" 
          strokeWidth="1" 
        />
        
        {/* Y-axis ticks and labels */}
        {yTicks.map((tick, i) => (
          <g key={`y-tick-${i}`}>
            <line 
              x1={marginLeft - 5} 
              y1={tick.y} 
              x2={marginLeft} 
              y2={tick.y} 
              stroke="hsl(var(--muted-foreground))" 
              strokeWidth="1" 
            />
            <text 
              x={marginLeft - 8} 
              y={tick.y + 4} 
              textAnchor="end" 
              fontSize="10" 
              fill="hsl(var(--foreground))"
            >
              {tick.label}
            </text>
          </g>
        ))}
        
        {/* X-axis ticks and labels */}
        {xTicks.map((tick, i) => (
          <g key={`x-tick-${i}`}>
            <line 
              x1={tick.x} 
              y1={marginTop + chartHeight} 
              x2={tick.x} 
              y2={marginTop + chartHeight + 5} 
              stroke="hsl(var(--muted-foreground))" 
              strokeWidth="1" 
            />
            <text 
              x={tick.x} 
              y={marginTop + chartHeight + 20} 
              textAnchor="middle" 
              fontSize="10" 
              fill="hsl(var(--foreground))"
            >
              {tick.label}
            </text>
          </g>
        ))}
        
        {/* Grid lines (optional) */}
        {yTicks.map((tick, i) => (
          <line 
            key={`grid-y-${i}`}
            x1={marginLeft} 
            y1={tick.y} 
            x2={marginLeft + chartWidth} 
            y2={tick.y} 
            stroke="hsl(var(--muted-foreground))" 
            strokeWidth="0.5" 
            strokeDasharray="2,2" 
            opacity="0.3"
          />
        ))}
        
        {/* TVL graph lines */}
        {beforeExploit.length > 1 && (
          <path 
            d={beforePath} 
            stroke="hsl(var(--primary))" 
            strokeWidth="2" 
            fill="none" 
          />
        )}
        
        {afterExploit.length > 1 && (
          <path 
            d={afterPath} 
            stroke="hsl(var(--primary))" 
            strokeWidth="2" 
            fill="none" 
            strokeDasharray={afterExploit[0].date !== exploitDate ? "none" : "none"}
          />
        )}
        
        {/* Data points */}
        {data.map((point, i) => (
          <circle 
            key={`point-${i}`}
            cx={scaleX(point.date)} 
            cy={scaleY(point.value)} 
            r="4" 
            fill={point.date === exploitDate ? "hsl(var(--destructive))" : "hsl(var(--primary))"}
          />
        ))}
        
        {/* Exploit marker */}
        <line 
          x1={exploitX} 
          y1={marginTop} 
          x2={exploitX} 
          y2={marginTop + chartHeight} 
          stroke="hsl(var(--destructive))" 
          strokeWidth="1.5" 
          strokeDasharray="4,3" 
        />
        <text 
          x={exploitX} 
          y={marginTop - 10} 
          textAnchor="middle" 
          fontSize="11" 
          fontWeight="bold"
          fill="hsl(var(--destructive))"
        >
          Exploit
        </text>
      </svg>
    </div>
  )
}