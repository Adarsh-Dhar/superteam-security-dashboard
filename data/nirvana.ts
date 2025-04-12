import type { TimelineEvent } from "@/types"

export const vulnerable_code_nirvana = `
fn get_price() -> f64 {
    ftx_api::get_price("ANA/USDC") // Single oracle source
}
`;

export const fixed_code_nirvana = `
fn get_price() -> f64 {
    sources.median_price(&["FTX", "AscendEX", "Orca"])
}
`;

export const timelineNirvana: TimelineEvent[] = [
  {
    time: "2022-07-28 14:18 UTC",
    title: "Flash Loan Initiated",
    description: "$10M USDC borrowed from Solend"
  },
  {
    time: "2022-07-28 14:35 UTC",
    title: "Price Manipulation",
    description: "ANA pumped from $8.97 to $24"
  }
];