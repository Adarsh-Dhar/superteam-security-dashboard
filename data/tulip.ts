import type { FundFlow } from "@/types"

export const flow_data_tulip: FundFlow[] = [
    {
      blockchain: "Solana",
      from: "Mango Markets",
      to: "Tulip Vault",
      amount: "$2.5M Recovered",
      status: "Restored"
    }
  ];
  
  export const stat_card_data_tulip = {
    title: "Mango Contagion Impact",
    value: "$2.5M Exposure",
    isCritical: false,
    showProgress: true,
    progressValue: 100 // Full recovery
  };