import type { FundFlow, RemediationAction, TimelineEvent } from "@/types"

export const vulnerable_code = `
// No code vulnerability - operational error
$ solana program close <PROGRAM_ID> // Misused CLI command
`

export const fixed_code = `
// Procedural safeguards
#[account(close = receiver)] // Anchor framework constraint
pub account_to_close: Account<'info, MyData>,
#[account(mut)]
pub receiver: SystemAccount<'info>
`

export const flow_data: FundFlow[] = [
  {
    blockchain: "Solana",
    from: "OptiFi Mainnet Program",
    to: "Permanently Closed PDAs",
    amount: "$661K USDC",
    status: "Irrecoverable"
  }
]

export const remediation_data: RemediationAction[] = [
  {
    action: "User Fund Compensation",
    status: "Complete",
    date: "2022-09-02"
  },
  {
    action: "Peer-Surveillance Deployment Process",
    status: "Complete",
    date: "2022-09-05"
  },
  {
    action: "Solana CLI Warning System",
    status: "Complete",
    date: "2023-01-15"
  },
  {
    action: "Protocol Relaunch (New Program ID)",
    status: "Complete",
    date: "2023-03-01"
  }
]

export const stat_card_data = {
  title: "OptiFi Operational Error Impact",
  value: "$661K Permanently Locked",
  isCritical: true,
  showProgress: true,
  progressValue: 100 // Full user compensation
}

export const timeline: TimelineEvent[] = [
  {
    time: "2022-08-29 06:00 UTC",
    title: "Update Attempt Initiated",
    description: "Anchor deploy command executed for program upgrade"
  },
  {
    time: "2022-08-29 06:07 UTC",
    title: "Buffer Account Creation",
    description: "17.2 SOL allocated for new buffer account"
  },
  {
    time: "2022-08-29 06:12 UTC",
    title: "Accidental Program Closure",
    description: "'solana program close' mistakenly executed"
  },
  {
    time: "2022-08-29 18:00 UTC",
    title: "Incident Acknowledgment",
    description: "Team confirms program ID irrecoverable"
  },
  {
    time: "2022-09-02",
    title: "Manual Settlements Completed",
    description: "User funds returned via Pyth oracle data"
  }
]

export const tvl_chart_data = {
  title: "OptiFi TVL Collapse & Recovery",
  exploitDate: "2022-08-29",
  showPercentageChange: true,
  data: [
    { date: "2022-07-01", value: 800_000 },
    { date: "2022-08-28", value: 661_000 }, 
    { date: "2022-08-29", value: 0 },
    { date: "2023-03-01", value: 150_000 }, // Relaunch
    { date: "2024-01-01", value: 400_000 }
  ]
}

export const exploit_diagram_data = {
  title: "OptiFi Operational Error Flow",
  topSteps: [
    "Failed Program Update", 
    "Buffer Account Creation",
    "Incorrect CLI Command"
  ],
  bottomSteps: [
    "OptiFi Mainnet Program", 
    "Permanently Closed PDAs",
    "User Compensation"
  ],
  bottomArrowLabels: [
    "$661K USDC Locked", 
    "Full Refunds Issued"
  ]
}
