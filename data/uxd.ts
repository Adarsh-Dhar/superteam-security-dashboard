import type { FundFlow, RemediationAction, TimelineEvent } from "@/types"

export const flow_data: FundFlow[] = [
    {
      blockchain: "Solana",
      from: "Mango Markets",
      to: "UXD Insurance Fund",
      amount: "$19.9M Exposure",
      status: "Recovered"
    }
  ];
  
  export const remediation_data: RemediationAction[] = [
    {
      action: "Insurance Fund Activation",
      status: "Complete",
      date: "2022-10-26"
    },
    {
      action: "Asset Recovery from Mango",
      status: "Complete",
      date: "2022-10-26"
    }
  ];
  
  export const stat_card_data = {
    title: "UXD Protocol Exposure",
    value: "$19.9M At Risk",
    isCritical: false,
    showProgress: true,
    progressValue: 100 // Full recovery
  };

  