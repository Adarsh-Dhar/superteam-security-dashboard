import type { FundFlow, RemediationAction, TimelineEvent } from "@/types"

export const vulnerable_code = `
// Malicious code from AI-generated script
const client = new Client("https://solana-rpc-proxy.com");
const keypair = Keypair.fromSecretKey(secretKey); // Key exfiltration
`;

export const fixed_code = `
// Secure implementation using official SDK
const client = new Client("https://api.mainnet-beta.solana.com");
const wallet = Wallet.fromEncryptedJson(keystore, password);
`;

export const flow_data: FundFlow[] = [
  {
    blockchain: "Solana",
    from: "User Wallets",
    to: "3RbBjhVRi8qYoGB5NLiKEszq2ci559so4nPqv2iNjs8Q",
    amount: "$164.1K (Various Assets)",
    status: "Stolen"
  },
  {
    blockchain: "Ethereum",
    from: "0x70479...d3F1",
    to: "Tornado Cash",
    amount: "87.5 ETH ($262K)",
    status: "Mixed"
  },
  {
    blockchain: "Binance Smart Chain",
    from: "Attacker Wallet",
    to: "MEXC/Bybit",
    amount: "$32.1K Frozen",
    status: "Recovered"
  }
];

export const remediation_data: RemediationAction[] = [
  {
    action: "GitHub Repository Takedowns (14 repos)",
    status: "Complete",
    date: "2024-11-25"
  },
  {
    action: "Socket.dev Integration",
    status: "Complete",
    date: "2024-12-01"
  },
  {
    action: "AI Code Scanning Tools",
    status: "Ongoing",
    date: "2025-01-15"
  },
  {
    action: "CEX Freezes ($32.1K)",
    status: "Partial",
    date: "2024-12-10"
  }
];

export const stat_card_data = {
  title: "AI Poisoning Attack Impact",
  value: "$164.1K Stolen via ChatGPT",
  isCritical: true,
  showProgress: true,
  progressValue: 19.5 // $32.1K recovered
};

export const timeline: TimelineEvent[] = [
  {
    time: "2024-11-21 15:20 UTC",
    title: "Attack Initiation",
    description: "First malicious API recommendations via ChatGPT"
  },
  {
    time: "2024-11-21 18:00 UTC",
    title: "Fund Exfiltration Detected",
    description: "ZachXBT identifies 281 suspicious transactions"
  },
  {
    time: "2024-11-21 20:25 UTC",
    title: "npm Package Removal",
    description: "Malicious @solana/web3.js versions 1.95.6/7 deprecated"
  },
  {
    time: "2024-11-22",
    title: "Pump.fun Security Advisory",
    description: "Warns users against AI-generated trading bots"
  },
  {
    time: "2024-12-01",
    title: "Prevention Tools Launched",
    description: "Real-time AI code scanner integrated"
  }
];

export const tvl_chart_data = {
  title: "Pump.fun Activity Post-Attack",
  exploitDate: "2024-11-21",
  showPercentageChange: true,
  data: [
    { date: "2024-10-01", value: 15_400_000 }, // $15.4M revenue
    { date: "2024-11-20", value: 12_100_000 },
    { date: "2024-11-21", value: 1_100_000 },
    { date: "2025-01-01", value: 4_800_000 },
    { date: "2025-03-01", value: 8_200_000 }
  ]
};

export const exploit_diagram_data = {
  title: "AI Poisoning Attack Flow",
  topSteps: [
    "ChatGPT Code Generation", 
    "Malicious API Injection",
    "Private Key Exfiltration"
  ],
  bottomSteps: [
    "Developer Machines", 
    "Attacker SMTP Server",
    "Mixers/CEXs"
  ],
  bottomArrowLabels: [
    "920+ Compromised Wallets", 
    "$164.1K Laundered"
  ]
};
