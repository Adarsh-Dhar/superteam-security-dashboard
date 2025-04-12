import type { FundFlow, RemediationAction } from "@/types"

export const vulnerable_code_raydium = `
// Admin key stored on vulnerable server
const adminKey = process.env.RAYDIUM_ADMIN_KEY;
`;

export const fixed_code_raydium = `
// Migrated to hardware wallet with multisig
const adminKey = LedgerSigner.getMultisigKey();
`;

export const flow_data_raydium: FundFlow[] = [
  {
    blockchain: "Solana",
    from: "Raydium V4 AMM",
    to: "CQvKSNnYtPTZfQRQ5jkHq8q2swJyRsdQLcFcj3EmKFfX",
    amount: "$5.5M (SOL/USDC/RAY)",
    status: "Mixed"
  },
  {
    blockchain: "Ethereum",
    from: "0x70479...d3F1",
    to: "Tornado Cash",
    amount: "1,746 ETH ($5.2M)",
    status: "Laundered"
  }
];

export const remediationDataRaydium: RemediationAction[] = [
  {
    action: "Admin Key Revocation",
    status: "Complete",
    date: "2022-12-16"
  },
  {
    action: "Hardware Wallet Migration",
    status: "Complete",
    date: "2022-12-17"
  }
];