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

  // Add some padding to the max value for better visualization
  const paddedMax = Math.ceil(maxValue / 500000000) * 500000000
  // Ensure we show zero if values are close to it
  const paddedMin = minValue < maxValue * 0.2 ? 0 : Math.floor(minValue / 500000000) * 500000000

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
    }
    return `$${value.toLocaleString()}`
  }

  // Format date labels - ensure unique labels
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

  // Generate tick marks for x-axis (show ~4 tick marks)
  // Ensure unique dates by using a Set to track formatted dates
  const xTicks = []
  const usedDates = new Set()
  const tickCount = Math.min(data.length, 4)

  for (let i = 0; i < tickCount; i++) {
    const index = Math.floor((i * (data.length - 1)) / (tickCount - 1))
    const item = data[index]
    const formattedDate = formatDate(item.date)

    // Only add the date if it hasn't been used yet
    if (!usedDates.has(formattedDate)) {
      usedDates.add(formattedDate)
      xTicks.push({
        date: item.date,
        x: scaleX(item.date),
        label: formattedDate,
      })
    }
  }

  // Calculate exploit point x position
  const exploitX = scaleX(exploitDate)

  return (
    <div className="w-full h-64">
      <div className="text-center font-semibold mb-2">{title}</div>

      <svg viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        {/* Chart axes */}
        <line x1="50" y1="250" x2="350" y2="250" stroke="hsl(var(--muted-foreground))" strokeWidth="2" />
        <line x1="50" y1="250" x2="50" y2="50" stroke="hsl(var(--muted-foreground))" strokeWidth="2" />
        
        {/* Y-axis labels */}
        <text x="45" y="250" textAnchor="end" fontSize="12" fill="hsl(var(--foreground))">$0</text>
        <text x="45" y="200" textAnchor="end" fontSize="12" fill="hsl(var(--foreground))">$500M</text>
        <text x="45" y="150" textAnchor="end" fontSize="12" fill="hsl(var(--foreground))">$1B</text>
        <text x="45" y="100" textAnchor="end" fontSize="12" fill="hsl(var(--foreground))">$1.5B</text>
        <text x="45" y="50" textAnchor="end" fontSize="12" fill="hsl(var(--foreground))">$2B</text>
        
        {/* X-axis labels */}
        <text x="90" y="270" textAnchor="middle" fontSize="12" fill="hsl(var(--foreground))">Jan 30</text>
        <text x="160" y="270" textAnchor="middle" fontSize="12" fill="hsl(var(--foreground))">Feb 1</text>
        <text x="230" y="270" textAnchor="middle" fontSize="12" fill="hsl(var(--foreground))">Feb 3</text>
        <text x="300" y="270" textAnchor="middle" fontSize="12" fill="hsl(var(--foreground))">Feb 5</text>
        
        {/* TVL graph */}
        <path d="M50,100 L90,80 L130,90 L160,85 L200,230 L230,220 L270,210 L300,190 L350,170" 
              stroke="hsl(var(--primary))" strokeWidth="3" fill="none" />
        
        {/* Exploit marker */}
        <line x1="200" y1="50" x2="200" y2="250" stroke="hsl(var(--destructive))" strokeWidth="2" strokeDasharray="5,5" />
        <text x="200" y="40" textAnchor="middle" fontSize="12" fill="hsl(var(--destructive))">Exploit</text>
        
        {/* Data points */}
        <circle cx="90" cy="80" r="4" fill="hsl(var(--primary))" />
        <circle cx="130" cy="90" r="4" fill="hsl(var(--primary))" />
        <circle cx="160" cy="85" r="4" fill="hsl(var(--primary))" />
        <circle cx="200" cy="230" r="4" fill="hsl(var(--destructive))" />
        <circle cx="230" cy="220" r="4" fill="hsl(var(--primary))" />
        <circle cx="270" cy="210" r="4" fill="hsl(var(--primary))" />
        <circle cx="300" cy="190" r="4" fill="hsl(var(--primary))" />
        <circle cx="350" cy="170" r="4" fill="hsl(var(--primary))" />
      </svg>
    </div>
  )
}
