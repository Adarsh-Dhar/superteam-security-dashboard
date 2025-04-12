import type { FundFlow } from "@/types"

export const flow_data_pumpx: FundFlow[] = [
    {
      blockchain: "Solana",
      from: "Retail Investors",
      to: "QinShihuang LP",
      amount: "$5M Market Cap",
      status: "Lost"
    },
    {
      blockchain: "Ethereum",
      from: "0x629e...b71A",
      to: "MEXC/Bybit",
      amount: "$3.2M Fiat Off-Ramp",
      status: "Traced"
    }
  ];
  
  export const stat_card_data_pumpx = {
    title: "Pump.fun Social Media Breach",
    value: "$5M Market Cap Manipulation",
    isCritical: true,
    showProgress: true,
    progressValue: 40 // Partial CEX freezes
  };