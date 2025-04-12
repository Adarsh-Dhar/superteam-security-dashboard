import type { FundFlow, RemediationAction, TimelineEvent } from "@/types"

export const flow_data: FundFlow[] = [
    {
      blockchain: "Ethereum",
      from: "Bybit Cold Wallet",
      to: "Lazarus Wallet",
      amount: "$1.4B (stETH/mETH)",
      status: "Stolen"
    },
    {
      blockchain: "Solana",
      from: "EFmqz...dq2P",
      to: "QinShihuang LP",
      amount: "$26M Trading Volume",
      status: "Artificial"
    },
    {
      blockchain: "Binance Smart Chain",
      from: "30+ Wallets",
      to: "Tornado Cash",
      amount: "$1.1M Washed",
      status: "Mixed"
    },
    {
      blockchain: "Solana",
      from: "Pump.fun Treasury",
      to: "Lazarus Wallets",
      amount: "$8.2M Fees Collected",
      status: "Traced"
    }
  ];

  //remediation_data

  //start_card_data

  export const timeline: TimelineEvent[] = [
    {
      time: "2025-02-15 03:00 UTC",
      title: "Bybit Hack Initiated",
      description: "$1.4B stolen via cold wallet exploit"
    },
    {
      time: "2025-02-22 11:30 UTC",
      title: "Cross-Chain Obfuscation",
      description: "Funds bridged to Solana via Wormhole"
    },
    {
      time: "2025-02-23 14:00 UTC",
      title: "QinShihuang Deployment",
      description: "60 SOL used to create memecoin on Pump.fun"
    },
    {
      time: "2025-02-23 17:00 UTC",
      title: "Volume Manipulation",
      description: "$26M trading volume achieved via wash trading"
    },
    {
      time: "2025-02-24 09:00 UTC",
      title: "ZachXBT Disclosure",
      description: "920+ wallets linked to Lazarus exposed"
    },
    {
      time: "2025-02-24 18:00 UTC",
      title: "Pump.fun Partial Takedown",
      description: "QinShihuang removed from frontend"
    }
  ];

  export const remediation_data: RemediationAction[] = [
    {
      action: "Malicious Token Removal (QinShihuang)",
      status: "Complete",
      date: "2025-02-24"
    },
    {
      action: "Wallet Blacklisting (920+ addresses)",
      status: "Complete",
      date: "2025-02-25"
    },
    {
      action: "CEX Freezes ($32.1K Recovered)",
      status: "Partial",
      date: "2025-02-26"
    },
    {
      action: "OFAC Sanctions (14 Wallets)",
      status: "Complete",
      date: "2025-03-01"
    },
    {
      action: "AI-Powered Launch Screening",
      status: "Ongoing",
      date: "2025-03-15"
    }
  ];
  
  export const stat_card_data = {
    title: "Pump.fun Laundering Impact",
    value: "$1.1M Washed via Memecoins",
    isCritical: true,
    showProgress: true,
    progressValue: 2.9 // $32.1K/$1.1M recovered
  };
  
  export const tvl_chart_data = {
    title: "Pump.fun Activity Post-Laundering",
    exploitDate: "2025-02-22",
    showPercentageChange: true,
    data: [
      { date: "2025-01-01", value: 15_400_000 }, // $15.4M monthly revenue
      { date: "2025-02-21", value: 12_100_000 },
      { date: "2025-02-22", value: 26_000_000 }, // QinShihuang volume spike
      { date: "2025-02-24", value: 1_100_000 }, // Post-disclosure crash
      { date: "2025-03-01", value: 4_800_000 }
    ]
  };
  
  export const exploit_diagram_data = {
    title: "Lazarus Group Laundering Flow",
    topSteps: [
      "$1.4B Bybit Hack", 
      "Cross-Chain Obfuscation",
      "Meme Coin Pump & Dump"
    ],
    bottomSteps: [
      "Bybit Cold Wallets", 
      "920+ Disposable Wallets",
      "Tornado Cash/MEXC"
    ],
    bottomArrowLabels: [
      "60 SOL Seed Capital", 
      "$26M Artificial Volume"
    ]
  };
  
  