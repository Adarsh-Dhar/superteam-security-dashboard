import type { FundFlow, RemediationAction, TimelineEvent } from "@/types"

export const vulnerable_code  = `
// Single oracle dependency
fn get_price(symbol: &str) -> f64 {
    ftx_api::get_price(symbol) // Relied solely on FTX feed
}
`;

export const fixed_code  = `
// Multi-oracle with liquidity checks
fn get_price(symbol: &str) -> f64 {
    let sources = [
        pyth::get_price(symbol),
        switchboard::get_price(symbol),
        mango_markets::get_spot_price(symbol)
    ];
    
    sources.iter()
        .filter(|p| p.confidence_interval < MAX_DEVIATION)
        .map(|p| p.value)
        .median()
}
`;

export const flow_data : FundFlow[] = [
  {
    blockchain: "Solana",
    from: "Mango Treasury",
    to: "CQvKSNnYtPTZfQRQ5jkHq8q2swJyRsdQLcFcj3EmKFfX",
    amount: "483M MNGO Perps ($18.4M)",
    status: "Stolen"
  },
  {
    blockchain: "Solana",
    from: "Mango Lending Pool",
    to: "4ND8FVPjUGGjx9VuGFuJefDWpg3THb58c277hbVRnjNa",
    amount: "$116M (USDC/SOL/MSOL)",
    status: "Stolen"
  },
  {
    blockchain: "Ethereum",
    from: "0x4c7A...b71A",
    to: "Tornado Cash",
    amount: "27,400 ETH ($37M)",
    status: "Mixed"
  },
  {
    blockchain: "Solana",
    from: "Eisenberg Wallet",
    to: "Mango DAO",
    amount: "$67M Returned",
    status: "Recovered"
  }
];

export const remediation_data: RemediationAction[] = [
  {
    action: "DAO Negotiation & Partial Recovery",
    status: "Complete",
    date: "2022-10-15"
  },
  {
    action: "CFTC Charges Against Avi Eisenberg",
    status: "Complete",
    date: "2022-12-27"
  },
  {
    action: "SEC Settlement ($700K Fine)",
    status: "Complete",
    date: "2024-09-27"
  },
  {
    action: "Protocol Shutdown",
    status: "Complete",
    date: "2025-01-13"
  }
];

export const stat_card_data  = {
  title: "Mango Markets Collapse",
  value: "$116M Drained + $110M Bad Debt",
  isCritical: true,
  showProgress: true,
  progressValue: 57.8 // $67M recovered / $116M stolen
};

export const timeline: TimelineEvent[] = [
  {
    time: "2022-10-11 18:07 UTC",
    title: "Attack Initiation",
    description: "$10M USDC deposited from FTX to attacker wallets"
  },
  {
    time: "2022-10-11 18:25 UTC",
    title: "MNGO Price Manipulation",
    description: "483M MNGO perpetuals traded, price pumped 2300% to $0.91"
  },
  {
    time: "2022-10-11 18:45 UTC",
    title: "Funds Borrowed",
    description: "$116M withdrawn across 19 tokens"
  },
  {
    time: "2022-10-15",
    title: "DAO Settlement",
    description: "Hacker returns $67M, keeps $47M as 'bounty'"
  },
  {
    time: "2022-12-26",
    title: "Eisenberg Arrest",
    description: "FBI apprehends attacker in Puerto Rico"
  },
  {
    time: "2024-07-29",
    title: "Guilty Verdict",
    description: "Convicted on 3 counts including wire fraud"
  },
  {
    time: "2025-01-13",
    title: "Protocol Shutdown",
    description: "All operations cease permanently"
  }
];

export const tvl_chart_data  = {
  title: "Mango Markets TVL Collapse",
  exploitDate: "2022-10-11",
  showPercentageChange: true,
  data: [
    { date: "2022-09-01", value: 190_000_000 },
    { date: "2022-10-10", value: 104_000_000 },
    { date: "2022-10-11", value: -116_000_000 }, // Negative equity
    { date: "2023-01-01", value: 15_000_000 },
    { date: "2024-09-01", value: 8_000_000 },
    { date: "2025-01-13", value: 0 }
  ]
};

export const exploit_diagram_data  = {
  title: "Mango Markets Attack Flow",
  topSteps: [
    "FTX Price Manipulation", 
    "Cross-Margin Exploitation",
    "Treasury Drainage"
  ],
  bottomSteps: [
    "Mango Liquidity Pools", 
    "Attacker Controlled Wallets",
    "Mixers/CEXs"
  ],
  bottomArrowLabels: [
    "2300% MNGO Spike", 
    "$116M Extracted"
  ]
};
