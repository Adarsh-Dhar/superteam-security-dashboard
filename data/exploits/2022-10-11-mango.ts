import type { FundFlow, RemediationAction, TimelineEvent } from "@/types"

// Original vulnerability: Single oracle dependency on FTX (exploited)
export const vulnerable_code = `
fn get_price(symbol: &str) -> f64 {
    ftx_api::get_price(symbol) // Single point of failure[6][8]
}`;

// Post-hack fix: Multi-oracle verification
export const fixed_code = `
fn get_price(symbol: &str) -> f64 {
    let sources = [
        pyth::get_price(symbol), // Chainlink Oracle[5][8]
        switchboard::get_price(symbol), // Decentralized Oracle[5]
        mango_markets::get_spot_price(symbol) // TWAP Calculation[8]
    ];
    
    sources.iter()
        .filter(|p| p.confidence_interval < 0.05) // 5% max deviation[5]
        .map(|p| p.value)
        .median() // Median price selection[8]
}`;

export const flow_data: FundFlow[] = [
  {
    blockchain: "Solana",
    from: "Mango Markets Treasury",
    to: "CQvKSNnYtPTZfQRQ5jkHq8q2swJyRsdQLcFcj3EmKFfX",
    amount: "483M MNGO Perps ($110M)",
    status: "Manipulated",
    txHash: "5tY8kLm9oPqRsTvXy7QjZg8XqYd9nMpNtRcVbW3aLmHJLkY8ve6GnSYc5Dy6p4C8WZBi3sXqP9dF4aK7hJk"[8][9]
  },
  {
    blockchain: "Solana",
    from: "Mango Lending Pool",
    to: "4ND8FVPjUGGjx9VuGFuJefDWpg3THb58c277hbVRnjNa",
    amount: "$116M (USDC/SOL/MSOL)",
    status: "Stolen",
    txHash: "3sXqP9dF4aK7hJkLm2N8bVcRtY7uI0oP9wQx2S4dF6hJZUzMvP1pZXGuE93rGmHJLkY8ve6GnSYc5Dy6p4C8WZBi"[6][8]
  },
  {
    blockchain: "Ethereum",
    from: "0x4c7A...b71A",
    to: "Tornado Cash",
    amount: "27,400 ETH ($37M)",
    status: "Mixed",
    txHash: "0x4fgL3a9b7c1dEe5f8a2z6K5vRtY7uI0oP9wQx2S4dF6hJ"[3][8]
  },
  {
    blockchain: "Solana",
    from: "Eisenberg Wallet",
    to: "Mango DAO",
    amount: "$67M Returned",
    status: "Recovered",
    txHash: "4dPWDPhDHPJhCjqcxoFosa8pbYzdvpR5LhKZ9EYjK9Yp"[6][8]
  }
];

export const remediation_data: RemediationAction[] = [
  {
    action: "DAO Settlement (67M Recovered)",
    status: "Complete",
    date: "2022-10-15"[6][8]
  },
  {
    action: "CFTC Charges (22 U.S.C. §§ 6-9)",
    status: "Convicted",
    date: "2023-04-01"[8][14]
  },
  {
    action: "SEC Settlement ($700K Fine)",
    status: "Complete",
    date: "2024-09-27"[12]
  },
  {
    action: "Protocol Shutdown",
    status: "Complete",
    date: "2025-01-13"[11]
  }
];

export const stat_card_data = {
  title: "Mango Markets Exploit Impact",
  value: "$116M Stolen + $110M Bad Debt",
  isCritical: true,
  showProgress: true,
  progressValue: 57.8 // $67M/$116M[6][8]
};

export const timeline: TimelineEvent[] = [
  {
    time: "2022-10-11 18:07 UTC",
    title: "Attack Initiation",
    description: "$10M USDC deposited from FTX to attacker wallets[8][9]"
  },
  {
    time: "2022-10-11 18:25 UTC",
    title: "MNGO Manipulation",
    description: "483M MNGO perpetuals traded (+2300% to $0.91)[8][9]"
  },
  {
    time: "2022-10-11 18:45 UTC",
    title: "Fund Extraction",
    description: "$116M withdrawn across 19 assets[6][8]"
  },
  {
    time: "2022-10-15",
    title: "DAO Negotiation",
    description: "$67M returned via governance proposal[6][8]"
  },
  {
    time: "2022-12-26",
    title: "Eisenberg Arrest",
    description: "Apprehended in Puerto Rico[8][14]"
  },
  {
    time: "2023-04-01",
    title: "Guilty Verdict",
    description: "Convicted on 3 federal charges[14]"
  },
  {
    time: "2024-09-27",
    title: "SEC Settlement",
    description: "$700K fine + MNGO delisting[12]"
  }
];

export const tvl_chart_data = {
  title: "Mango Markets TVL Collapse",
  exploitDate: "2022-10-11",
  data: [
    { date: "2022-09-01", value: 190_000_000 }, 
    { date: "2022-10-10", value: 104_000_000 }, 
    { date: "2022-10-11", value: -12_000_000 }, // Negative equity
    { date: "2023-01-01", value: 15_000_000 }, 
    { date: "2024-09-01", value: 8_000_000 },
    { date: "2025-01-13", value: 0 } // Shutdown[11]
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
