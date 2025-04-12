import type { FundFlow } from "@/types"

export const flow_data_optifi: FundFlow[] = [
    {
      blockchain: "Solana",
      from: "OptiFi Program",
      to: "Irrecoverable PDA",
      amount: "$661K USDC",
      status: "Lost"
    }
  ];
  
  export const stat_card_data_optifi = {
    title: "OptiFi Program Closure",
    value: "$661K Permanently Locked",
    isCritical: true,
    showProgress: false
  };