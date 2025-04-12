import type {  TimelineEvent } from "@/types"

export const timelineOutage: TimelineEvent[] = [
    {
      time: "2023-02-25 01:00 UTC",
      title: "Validator Malfunction",
      description: "Oversized block with 584k virtual ticks generated"
    },
    {
      time: "2023-02-25 06:00 UTC",
      title: "Manual Chain Restart",
      description: "Downgraded to validator v1.13.7"
    }
  ];
  
  export const tvl_chart_data_outage = {
    title: "Solana Network Health During Outage",
    exploitDate: "2023-02-25",
    data: [
      { date: "2023-02-24", value: 584 }, // TPS
      { date: "2023-02-25", value: 93 },
      { date: "2023-02-26", value: 2973 }
    ]
  };