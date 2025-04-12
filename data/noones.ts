import type { FundFlow, RemediationAction, TimelineEvent } from "@/types"

export const flow_data: FundFlow[] = [
    {
      blockchain: "Solana",
      from: "NoOnes Bridge",
      to: "Attacker Wallet",
      amount: "$7.9M Crypto Assets",
      status: "Mixed"
    },
    {
      blockchain: "Ethereum",
      from: "0x7047...d3F1",
      to: "Tornado Cash",
      amount: "4,832 ETH ($7.9M)",
      status: "Mixed"
    }
  ];
  
  export const remediation_data: RemediationAction[] = [
    {
      action: "Bridge Shutdown",
      status: "Complete",
      date: "2025-01-01"
    },
    {
      action: "Penetration Testing",
      status: "Ongoing",
      date: "2025-01-15"
    }
  ];
  
  export const stat_card_data = {
    title: "NoOnes Bridge Exploit",
    value: "$7.9M Drained",
    isCritical: true,
    showProgress: true,
    progressValue: 0 // No recovery
  };
  
  export const timelineNo: TimelineEvent[] = [
    {
      time: "2025-01-01 03:00 UTC",
      title: "Exploit Begins",
      description: "Small transactions bypass detection"
    },
    {
      time: "2025-01-02 05:00 UTC",
      title: "Funds Bridged Out",
      description: "$7.9M moved to Ethereum/BSC"
    }
  ];
  
  export const exploit_diagram_data = {
    title: "NoOnes Bridge Exploit Flow",
    topSteps: [
      "Small Transaction Spam", 
      "Bridge Fee Exploitation",
      "Cross-Chain Obfuscation"
    ],
    bottomSteps: [
      "NoOnes Treasury", 
      "Attacker Wallets",
      "Tornado Cash"
    ],
    bottomArrowLabels: [
      "7000+ Micro TXs", 
      "$7.9M Mixed"
    ]
  };