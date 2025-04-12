import type { FundFlow, RemediationAction, TimelineEvent } from "@/types"

export const vulnerable_code = `
// Plaintext key logging
Sentry.capture_message({
  event_type: "wallet_error",
  private_key: userKey 
});
`;

export const fixed_code = `
// Encrypted logging
Sentry.capture_message({
  event_type: "wallet_error",
  error_code: sanitizeError(error) 
});
`;

export const flow_data: FundFlow[] = [
  {
    blockchain: "Solana",
    from: "User Wallets",
    to: "Attacker Address",
    amount: "$8M Mixed Assets",
    status: "Stolen"
  }
];

export const remediation_data: RemediationAction[] = [
  {
    action: "Wallet Migration Campaign",
    status: "Complete",
    date: "2022-08-03"
  },
  {
    action: "Third-Party Audit",
    status: "Complete",
    date: "2022-08-10"
  }
];

export const stat_card_data = {
  title: "Slope Wallet Breach",
  value: "$8M Drained",
  isCritical: true,
  showProgress: true,
  progressValue: 15 // Partial tracing
};

export const timeline: TimelineEvent[] = [
  {
    time: "2022-08-02 22:37 UTC",
    title: "First Wallet Drained",
    description: "Attacker begins systematic fund transfers"
  },
  {
    time: "2022-08-03 01:00 UTC",
    title: "Breach Confirmed",
    description: "Solana Foundation isolates incident to Slope"
  }
];