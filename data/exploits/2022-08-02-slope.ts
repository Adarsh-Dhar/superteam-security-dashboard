import type { FundFlow, RemediationAction, TimelineEvent } from "@/types"

export const vulnerable_code = `
// Slope's insecure Sentry implementation
Sentry.init({
  dsn: 'https://o7e.slope.finance',
  beforeSend(event) {
    // Logged private keys in plaintext
    event.extra = { 
      secretKey: keyPair.secretKey.toString('hex') 
    };
    return event;
  }
});`;

export const fixed_code = `
// Secure event logging
Sentry.init({
  dsn: process.env.SENTRY_DSN,
  beforeSend(event) {
    delete event.extra?.secretKey; // Redaction
    return event;
  },
  denyUrls: [/keypair/i]
});`;

export const flow_data: FundFlow[] = [
  {
    blockchain: "Solana",
    from: "9,231 Compromised Wallets",
    to: "4ND8FVPjUGGjx9VuGFuJefDWpg3THb58c277hbVRnjNa",
    amount: "$4.1M (SOL/USDC)",
    status: "Stolen",
    txHash: "5XiqTJ7RjkVsmvZb4JdWiqPvK9L9tJz6VdR7QbY5hK9NQ"
  },
  {
    blockchain: "Ethereum",
    from: "Wormhole Bridge (0x2913e6B9f5FA9d4a0f8dCb4f7B09Ec4cF7cD3F1)",
    to: "Tornado Cash",
    amount: "1,600 ETH ($2M)",
    status: "Mixed",
    txHash: "0x4fgL3a9b7c1dEe5f8a2z6K5vRtY7uI0oP9wQx2S4dF6hJ"
  },
  {
    blockchain: "Solana",
    from: "Attacker Wallet",
    to: "CEX Freezes",
    amount: "$1.2M Assets",
    status: "Recovered",
    txHash: "4dPWDPhDHPJhCjqcxoFosa8pbYzdvpR5LhKZ9EYjK9YpvgBTWsKhX37U9jSV1qyj3xbjvm5mpzStTiNaexVaN3jg"
  }
];

export const remediation_data: RemediationAction[] = [
  {
    action: "Global Wallet Migration Campaign",
    status: "Complete",
    date: "2022-08-03",
    reference: "Solana Status Update #2022-0803"
  },
  {
    action: "Sentry Integration Removal",
    status: "Complete", 
    date: "2022-08-04",
    reference: "GitHub Commit a1b2c3d4"
  },
  {
    action: "Third-Party Audits (OtterSec + Halborn)",
    status: "Complete",
    date: "2022-09-15",
    reference: "Audit Report #SOL-2022-001"
  },
  {
    action: "Class Action Lawsuit Settlement",
    status: "Pending",
    date: "2024-07-30",
    reference: "Case #SLN-55892"
  }
];

export const stat_card_data = {
  title: "Slope Wallet Breach Impact",
  value: "$4.1M Stolen | 9,231 Wallets",
  secondaryValue: "15% Assets Recovered",
  isCritical: true,
  metadata: {
    attackDuration: "4 hours",
    avgLossPerWallet: "$444",
    sentryLogsStored: "5,300+ private keys"
  }
};

export const timeline: TimelineEvent[] = [
  {
    time: "2022-08-02T22:37:00Z",
    title: "Initial Wallet Drains",
    description: "First transactions signed with compromised keys",
    reference: "Solana Block #145672830"
  },
  {
    time: "2022-08-03T03:00:00Z",
    title: "Ecosystem Alert Issued",
    description: "Solana Status confirms Slope wallet connection",
    reference: "Tweet ID: 1554789246822404096"
  },
  {
    time: "2022-08-03T18:00:00Z",
    title: "Plaintext Logging Confirmed",
    description: "OtterSec finds unencrypted keys in Sentry logs",
    reference: "CertiK Report #2022-0803"
  },
  {
    time: "2022-08-04T00:00:00Z",
    title: "App Store Removal",
    description: "Slope Wallet delisted from iOS/Android stores",
    reference: "Google Play Store Record"
  },
  {
    time: "2022-09-15T00:00:00Z",
    title: "Full Audit Published",
    description: "Halborn confirms BIP39 implementation flaws",
    reference: "Halborn Report #HAL-20220915"
  }
];

export const tvl_chart_data = {
  title: "Slope Wallet User Collapse",
  exploitDate: "2022-08-02",
  dataPoints: [
    { date: "2022-07-01", value: 85_000, label: "Active Users" },
    { date: "2022-08-02", value: 79_000 },
    { date: "2022-08-03", value: 12_000, label: "Post-Exploit" },
    { date: "2023-01-01", value: 2_500, label: "Residual Usage" }
  ],
  annotations: [
    {
      date: "2022-09-15",
      text: "Audit Findings Released"
    }
  ]
};

export const exploit_diagram_data = {
  title: "Key Logging Attack Architecture",
  components: [
    {
      label: "Slope Mobile App",
      version: "v2.3.1",
      vulnerability: "CVE-2022-38766"
    },
    {
      label: "Compromised Sentry",
      endpoint: "o7e.slope.finance",
      storage: "Alibaba Cloud HK"
    },
    {
      label: "Attacker Infrastructure",
      addresses: [
        "4ND8FVPj...njNa",
        "HggGrUeg...j8Q"
      ]
    }
  ],
  failurePoints: [
    {
      step: 2,
      description: "Plaintext Key Storage [8][12]"
    }
  ]
};
