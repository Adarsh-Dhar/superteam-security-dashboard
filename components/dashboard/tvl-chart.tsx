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
    showPercentageChange = true
  }: TVLChartProps) {
    // Validate inputs
    if (!data || !Array.isArray(data) || data.length === 0) {
      return <div className="w-full h-64 flex items-center justify-center">No data available</div>;
    }
    
    if (!exploitDate) {
      return <div className="w-full h-64 flex items-center justify-center">Exploit date required</div>;
    }
  
    // Chart dimensions and margins
    const width = 400;
    const height = 300;
    const chartWidth = 300;
    const chartHeight = 200;
    const marginLeft = 50;
    const marginTop = 50;
    const marginBottom = 50;
  
    // Parse exploit date
    const exploitDateObj = new Date(exploitDate);
    
    // Split data into before and after exploit
    const beforeExploit = data.filter(d => new Date(d.date) < exploitDateObj);
    const afterExploit = data.filter(d => new Date(d.date) >= exploitDateObj);
    
    // Calculate TVL before and after exploit (for comparison)
    const lastBeforeExploit = beforeExploit.length > 0 ? beforeExploit[beforeExploit.length - 1] : null;
    const firstAfterExploit = afterExploit.length > 0 ? afterExploit[0] : null;
    
    let percentageChange = 0;
    if (lastBeforeExploit && firstAfterExploit) {
      percentageChange = ((firstAfterExploit.value - lastBeforeExploit.value) / lastBeforeExploit.value) * 100;
    }
  
    // Calculate scales
    const minDate = new Date(data[0].date).getTime();
    const maxDate = new Date(data[data.length - 1].date).getTime();
    const dateRange = maxDate - minDate;
  
    const values = data.map(d => d.value);
    const maxValue = Math.max(...values);
    const minValue = Math.min(...values);
    
    // Add some padding to the max value for better visualization
    const paddedMax = Math.ceil(maxValue / 500000000) * 500000000;
    // Ensure we show zero if values are close to it
    const paddedMin = minValue < maxValue * 0.2 ? 0 : Math.floor(minValue / 500000000) * 500000000;
    
    const valueRange = paddedMax - paddedMin;
  
    // Function to scale x position
    const scaleX = (date: string): number => {
      const dateObj = new Date(date).getTime();
      const percent = (dateObj - minDate) / dateRange;
      return marginLeft + (percent * chartWidth);
    };
  
    // Function to scale y position
    const scaleY = (value: number): number => {
      if (valueRange === 0) return marginTop + chartHeight / 2;
      const percent = (value - paddedMin) / valueRange;
      return marginTop + chartHeight - (percent * chartHeight);
    };
  
    // Generate paths for the line
    const beforePath = beforeExploit.map((d, i) => {
      const x = scaleX(d.date);
      const y = scaleY(d.value);
      return (i === 0 ? "M" : "L") + x + "," + y;
    }).join(" ");
    
    const afterPath = afterExploit.map((d, i) => {
      const x = scaleX(d.date);
      const y = scaleY(d.value);
      return (i === 0 ? "M" : "L") + x + "," + y;
    }).join(" ");
  
    // Format currency for display
    const formatCurrency = (value: number): string => {
      if (value >= 1000000000) {
        return `$${(value / 1000000000).toFixed(1)}B`;
      } else if (value >= 1000000) {
        return `$${(value / 1000000).toFixed(1)}M`;
      }
      return `$${value.toLocaleString()}`;
    };
  
    // Format date labels
    const formatDate = (date: string): string => {
      const dateObj = new Date(date);
      return dateObj.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    };
  
    // Generate tick marks for y-axis (approximately 5 ticks)
    const yTicks = [];
    const yTickCount = 5;
    for (let i = 0; i < yTickCount; i++) {
      const value = paddedMin + (valueRange / (yTickCount - 1)) * i;
      yTicks.push({
        value,
        y: scaleY(value),
        label: formatCurrency(value)
      });
    }
  
    // Generate tick marks for x-axis (show ~4 tick marks)
    const xTicks = [];
    const tickCount = Math.min(data.length, 4);
    for (let i = 0; i < tickCount; i++) {
      const index = Math.floor(i * (data.length - 1) / (tickCount - 1));
      const item = data[index];
      xTicks.push({
        date: item.date,
        x: scaleX(item.date),
        label: formatDate(item.date)
      });
    }
  
    // Calculate exploit point x position
    const exploitX = scaleX(exploitDate);
  
    return (
      <div className="w-full h-64">
        <div className="text-center font-semibold mb-2">{title}</div>
        
        <svg viewBox={`0 0 ${width} ${height}`} xmlns="http://www.w3.org/2000/svg">
          {/* Chart axes */}
          <line 
            x1={marginLeft} 
            y1={marginTop + chartHeight} 
            x2={marginLeft + chartWidth} 
            y2={marginTop + chartHeight} 
            stroke="hsl(var(--muted-foreground))" 
            strokeWidth="2" 
          />
          <line 
            x1={marginLeft} 
            y1={marginTop + chartHeight} 
            x2={marginLeft} 
            y2={marginTop} 
            stroke="hsl(var(--muted-foreground))" 
            strokeWidth="2" 
          />
  
          {/* Y-axis labels */}
          {yTicks.map((tick, i) => (
            <g key={`y-tick-${i}`}>
              <text 
                x={marginLeft - 5} 
                y={tick.y + 4} 
                textAnchor="end" 
                fontSize="12" 
                fill="hsl(var(--foreground))"
              >
                {tick.label}
              </text>
              <line 
                x1={marginLeft - 3} 
                y1={tick.y} 
                x2={marginLeft} 
                y2={tick.y} 
                stroke="hsl(var(--muted-foreground))" 
                strokeWidth="1" 
              />
            </g>
          ))}
  
          {/* X-axis labels */}
          {xTicks.map((tick, i) => (
            <g key={`x-tick-${i}`}>
              <text 
                x={tick.x} 
                y={marginTop + chartHeight + 20} 
                textAnchor="middle" 
                fontSize="12" 
                fill="hsl(var(--foreground))"
              >
                {tick.label}
              </text>
              <line 
                x1={tick.x} 
                y1={marginTop + chartHeight} 
                x2={tick.x} 
                y2={marginTop + chartHeight + 3} 
                stroke="hsl(var(--muted-foreground))" 
                strokeWidth="1" 
              />
            </g>
          ))}
  
          {/* Background for "before" section */}
          <rect
            x={marginLeft}
            y={marginTop}
            width={exploitX - marginLeft}
            height={chartHeight}
            fill="hsl(var(--primary))"
            fillOpacity="0.05"
          />
          
          {/* Background for "after" section */}
          <rect
            x={exploitX}
            y={marginTop}
            width={marginLeft + chartWidth - exploitX}
            height={chartHeight}
            fill="hsl(var(--destructive))"
            fillOpacity="0.05"
          />
  
          {/* TVL graph paths */}
          {/* Before exploit */}
          {beforeExploit.length > 0 && (
            <path
              d={beforePath}
              stroke="hsl(var(--primary))"
              strokeWidth="3"
              fill="none"
            />
          )}
          
          {/* After exploit */}
          {afterExploit.length > 0 && (
            <path
              d={afterPath}
              stroke="hsl(var(--destructive))"
              strokeWidth="3"
              fill="none"
            />
          )}
  
          {/* Exploit marker */}
          <line
            x1={exploitX}
            y1={marginTop}
            x2={exploitX}
            y2={marginTop + chartHeight}
            stroke="hsl(var(--destructive))"
            strokeWidth="2"
            strokeDasharray="5,5"
          />
          <text 
            x={exploitX} 
            y={marginTop - 10} 
            textAnchor="middle" 
            fontSize="12" 
            fontWeight="bold"
            fill="hsl(var(--destructive))"
          >
            Exploit
          </text>
  
          {/* TVL change annotation */}
          {showPercentageChange && lastBeforeExploit && firstAfterExploit && (
            <g>
              <text 
                x={exploitX + 5} 
                y={marginTop + 15} 
                textAnchor="start" 
                fontSize="12" 
                fontWeight="bold"
                fill={percentageChange < 0 ? "hsl(var(--destructive))" : "hsl(var(--primary))"}
              >
                {percentageChange.toFixed(1)}% change
              </text>
              <text 
                x={exploitX + 5} 
                y={marginTop + 30} 
                textAnchor="start" 
                fontSize="10" 
                fill="hsl(var(--foreground))"
              >
                {formatCurrency(lastBeforeExploit.value)} → {formatCurrency(firstAfterExploit.value)}
              </text>
            </g>
          )}
  
          {/* Data points */}
          {data.map((d, i) => {
            const isExploitPoint = new Date(d.date).getTime() === exploitDateObj.getTime();
            const isBeforeExploit = new Date(d.date) < exploitDateObj;
            return (
              <circle 
                key={`point-${i}`}
                cx={scaleX(d.date)} 
                cy={scaleY(d.value)} 
                r="4" 
                fill={isExploitPoint ? "hsl(var(--destructive))" : (isBeforeExploit ? "hsl(var(--primary))" : "hsl(var(--destructive))")}
              />
            );
          })}
          
          {/* Legend */}
          <rect x={marginLeft} y={height - 20} width="10" height="10" fill="hsl(var(--primary))" />
          <text x={marginLeft + 15} y={height - 12} fontSize="10" fill="hsl(var(--foreground))">Before Exploit</text>
          
          <rect x={marginLeft + 100} y={height - 20} width="10" height="10" fill="hsl(var(--destructive))" />
          <text x={marginLeft + 115} y={height - 12} fontSize="10" fill="hsl(var(--foreground))">After Exploit</text>
        </svg>
      </div>
    );
  }