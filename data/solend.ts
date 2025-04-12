import type { FundFlow, RemediationAction, TimelineEvent } from "@/types"

export const vulnerable_code = `
// Single oracle dependency
fn get_price(symbol: &str) -> f64 {
    let price = saber_api::get_price("USDH/USDC"); 
    price
}
`

export const fixed_code = `
// Multi-oracle with sanity checks
fn get_price(symbol: &str) -> f64 {
    let sources = [
        saber_api::get_price(symbol),
        orca_api::get_price(symbol),
        pyth::get_price(symbol)
    ];
    
    sources.iter()
        .filter(|p| p.confidence < MAX_DEVIATION)
        .map(|p| p.value)
        .median()
}
`

export const flow_data: FundFlow[] = [
  {
    blockchain: "Solana",
    from: "Solend Isolated Pools",
    to: "7W7NJ...dWiq",
    amount: "$1.26M (USDC/SOL)",
    status: "Stolen"
  },
  {
    blockchain: "Ethereum",
    from: "0x70479...d3F1",
    to: "Tornado Cash",
    amount: "420 ETH ($1.1M)",
    status: "Mixed"
  },
  {
    blockchain: "Solana",
    from: "Attacker Wallet",
    to: "CEX Wallets",
    amount: "$160K Frozen",
    status: "Recovered"
  }
]

export const remediation_data: RemediationAction[] = [
  {
    action: "Oracle Configuration Update",
    status: "Complete",
    date: "2022-02-14"
  },
  {
    action: "SLND5/SLND6 Governance Proposals",
    status: "Complete", 
    date: "2022-02-16"
  },
  {
    action: "Third-Party Audit (Halborn)",
    status: "Complete",
    date: "2022-03-01"
  },
  {
    action: "User Compensation",
    status: "Complete",
    date: "2022-08-16"
  }
]

export const stat_card_data = {
  title: "Solend Oracle Attack Impact",
  value: "$1.26M Bad Debt",
  isCritical: true,
  showProgress: true,
  progressValue: 100 // Full user compensation
}

export const timeline: TimelineEvent[] = [
  {
    time: "2022-02-11 12:15 UTC",
    title: "Price Manipulation Initiated",
    description: "100k USDC used to pump USDH on Saber"
  },
  {
    time: "2022-02-11 12:17 UTC",
    title: "Transaction Spamming",
    description: "Saber account write-locked to prevent arbitrage"
  },
  {
    time: "2022-02-11 12:19 UTC",
    title: "Oracle Price Capture",
    description: "Switchboard records inflated $15 USDH price"
  },
  {
    time: "2022-02-11 12:30 UTC",
    title: "Funds Borrowed",
    description: "$1.26M drained from isolated pools"
  },
  {
    time: "2022-02-11 15:00 UTC",
    title: "Protocol Freeze",
    description: "Affected pools suspended"
  },
  {
    time: "2022-08-16",
    title: "Full User Reimbursement",
    description: "Treasury funds used to cover losses"
  }
]

export const tvl_chart_data = {
  title: "Solend TVL Before/After Attack",
  exploitDate: "2022-02-11",
  showPercentageChange: true,
  data: [
    { date: "2022-01-01", value: 350_000_000 },
    { date: "2022-02-10", value: 320_000_000 },
    { date: "2022-02-11", value: 290_000_000 },
    { date: "2022-03-01", value: 250_000_000 },
    { date: "2022-12-01", value: 480_000_000 }
  ]
}

export const exploit_diagram_data = {
  title: "Solend Oracle Attack Flow",
  topSteps: [
    "USDH Price Pump", 
    "Oracle Manipulation",
    "Under-collateralized Borrowing"
  ],
  bottomSteps: [
    "Saber DEX", 
    "Solend Pools",
    "Mixers/CEXs"
  ],
  bottomArrowLabels: [
    "$15 Artificial Price", 
    "$1.26M Drained"
  ]
}
