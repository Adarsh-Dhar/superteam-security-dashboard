import type { FundFlow, RemediationAction, TimelineEvent } from "@/types"

export const vulnerable_code_mango = `
// Vulnerable Oracle Implementation
fn get_price(symbol: &str) -> f64 {
    let price = ftx_api::get_price(symbol); // Single exchange dependency
    price
}
`

export const fixed_code_mango = `
// Fixed Oracle Implementation
fn get_price(symbol: &str) -> f64 {
    let sources = [
        ftx_api::get_price(symbol),
        ascendex_api::get_price(symbol),
        mango_markets::get_spot_price(symbol)
    ];
    
    // Time-weighted average price with sanity checks
    sources.iter()
        .filter(|p| p.volume > MIN_LIQUIDITY)
        .map(|p| p.value)
        .median()
}
`

export const flow_data_mango: FundFlow[] = [
    {
        blockchain: "Solana",
        from: "Mango Markets Treasury",
        to: "CQvKSNnYtPTZfQRQ5jkHq8q2swJyRsdQLcFcj3EmKFfX",
        amount: "483M MNGO Perps ($18.4M)",
        status: "Stolen"
    },
    {
        blockchain: "Solana",
        from: "Mango Markets Lending Pool",
        to: "4ND8FVPjUGGjx9VuGFuJefDWpg3THb58c277hbVRnjNa",
        amount: "$116M Crypto Assets",
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
        from: "5XiqTJ...",
        to: "Mango DAO Treasury",
        amount: "$67M Recovered",
        status: "Traced"
    }
]

export const remediationDataMango: RemediationAction[] = [
    {
        action: "Attacker Negotiation & Partial Fund Return",
        status: "Complete",
        date: "2022-10-15"
    },
    {
        action: "CFTC Legal Action Against Avi Eisenberg",
        status: "Complete",
        date: "2022-12-27"
    },
    {
        action: "$47M Bug Bounty Payment",
        status: "Failed",
        date: "2022-10-18"
    },
    {
        action: "SEC Settlement & MNGO Token Burn",
        status: "Complete",
        date: "2024-09-27"
    },
    {
        action: "Platform Shutdown Process",
        status: "Complete",
        date: "2025-01-13"
    }
]

export const stat_card_data_mango = {
    title: "Mango Markets Hack Impact",
    value: "$116M Drained (TVL -99.8%)",
    isCritical: true,
    showProgress: true,
    progressValue: 60 // 3/5 remediation steps complete
}

export const timelineMango: TimelineEvent[] = [
    {
        time: "2022-10-11 18:07 UTC",
        title: "Attack Initiation",
        description: "Attacker wallets funded with $10M USDC"
    },
    {
        time: "2022-10-11 18:25 UTC",
        title: "MNGO Price Manipulation",
        description: "483M MNGO perpetuals traded, price pumped 2300%"
    },
    {
        time: "2022-10-11 18:45 UTC",
        title: "Funds Withdrawn",
        description: "$116M borrowed against inflated collateral"
    },
    {
        time: "2022-10-15",
        title: "Attacker Negotiation",
        description: "$67M returned in exchange for $47M bounty proposal"
    },
    {
        time: "2022-12-27",
        title: "Legal Action",
        description: "Avi Eisenberg arrested in Puerto Rico"
    },
    {
        time: "2024-07-29",
        title: "Conviction",
        description: "Eisenberg found guilty on all charges"
    },
    {
        time: "2025-01-13",
        title: "Platform Shutdown",
        description: "Mango Markets ceases operations"
    }
]

export const tvl_chart_data_mango = {
    title: "Mango Markets TVL Collapse",
    exploitDate: "2022-10-11",
    showPercentageChange: true,
    data: [
        { date: "2022-09-01", value: 190_000_000 },
        { date: "2022-10-10", value: 104_000_000 },
        { date: "2022-10-11", value: 209_000 }, 
        { date: "2023-01-01", value: 15_000_000 },
        { date: "2024-09-01", value: 8_000_000 },
        { date: "2025-01-13", value: 0 }
    ]
}

export const exploit_diagram_data_mango = {
    title: "Mango Markets Exploit Flow",
    topSteps: [
        "Oracle Manipulation", 
        "MNGO Price Inflation",
        "Collateralized Borrowing"
    ],
    bottomSteps: [
        "Mango Markets Pool", 
        "Attacker Wallets",
        "CEXs/Mixers"
    ],
    bottomArrowLabels: [
        "483M MNGO Perps", 
        "$116M Crypto Assets"
    ]
}
