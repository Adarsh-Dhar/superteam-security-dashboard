export function TVLChart() {
    return (
      <div className="w-full h-64">
        <svg viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg">
          {/* Chart axes */}
          <line x1="50" y1="250" x2="350" y2="250" stroke="#718096" strokeWidth="2" />
          <line x1="50" y1="250" x2="50" y2="50" stroke="#718096" strokeWidth="2" />
          
          {/* Y-axis labels */}
          <text x="45" y="250" textAnchor="end" fontSize="12">$0</text>
          <text x="45" y="200" textAnchor="end" fontSize="12">$500M</text>
          <text x="45" y="150" textAnchor="end" fontSize="12">$1B</text>
          <text x="45" y="100" textAnchor="end" fontSize="12">$1.5B</text>
          <text x="45" y="50" textAnchor="end" fontSize="12">$2B</text>
          
          {/* X-axis labels */}
          <text x="90" y="270" textAnchor="middle" fontSize="12">Jan 30</text>
          <text x="160" y="270" textAnchor="middle" fontSize="12">Feb 1</text>
          <text x="230" y="270" textAnchor="middle" fontSize="12">Feb 3</text>
          <text x="300" y="270" textAnchor="middle" fontSize="12">Feb 5</text>
          
          {/* TVL graph */}
          <path d="M50,100 L90,80 L130,90 L160,85 L200,230 L230,220 L270,210 L300,190 L350,170" 
                stroke="#3182ce" strokeWidth="3" fill="none" />
          
          {/* Exploit marker */}
          <line x1="200" y1="50" x2="200" y2="250" stroke="#e53e3e" strokeWidth="2" strokeDasharray="5,5" />
          <text x="200" y="40" textAnchor="middle" fontSize="12" fill="#e53e3e">Exploit</text>
          
          {/* Data points */}
          <circle cx="90" cy="80" r="4" fill="#3182ce" />
          <circle cx="130" cy="90" r="4" fill="#3182ce" />
          <circle cx="160" cy="85" r="4" fill="#3182ce" />
          <circle cx="200" cy="230" r="4" fill="#e53e3e" />
          <circle cx="230" cy="220" r="4" fill="#3182ce" />
          <circle cx="270" cy="210" r="4" fill="#3182ce" />
          <circle cx="300" cy="190" r="4" fill="#3182ce" />
          <circle cx="350" cy="170" r="4" fill="#3182ce" />
        </svg>
      </div>
    );
  }