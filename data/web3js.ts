import type {  TimelineEvent } from "@/types"

export const vulnerable_code_web3js = `
Sentry.captureMessage({
  event_type: "key_generated",
  private_key: keyPair.secretKey
});
`;

export const fixed_code_web3js = `
// Removed sensitive logging
Sentry.captureMessage({
  event_type: "key_generated",
  key_type: "ed25519"
});
`;

export const timelineWeb3js: TimelineEvent[] = [
  {
    time: "2024-12-03 15:20 UTC",
    title: "Malicious Package Published",
    description: "Versions 1.95.6/1.95.7 pushed to npm"
  },
  {
    time: "2024-12-03 20:25 UTC",
    title: "Packages Unpublished",
    description: "Clean version 1.95.8 released"
  }
];