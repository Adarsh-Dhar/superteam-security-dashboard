import type { FundFlow, RemediationAction } from "@/types"

export const vulnerable_code_revival = `
fn close_account(ctx: Context<Close>) {
    let lamports = ctx.accounts.account_to_close.lamports();
    **ctx.accounts.destination.lamports.borrow_mut() += lamports;
    **ctx.accounts.account_to_close.lamports.borrow_mut() = 0;
}
`;

export const fixed_code_revival = `
#[account(close = receiver)]
pub account_to_close: Account<'info, MyData>,
pub receiver: SystemAccount<'info>
`;

export const flow_data_revival: FundFlow[] = [
  {
    blockchain: "Solana",
    from: "Closed Accounts",
    to: "Attacker Wallet",
    amount: "$750K Various Assets",
    status: "Stolen"
  }
];

export const remediationDataRevival: RemediationAction[] = [
  {
    action: "Anchor Framework Updates",
    status: "Complete",
    date: "2024-10-20"
  },
  {
    action: "Protocol Security Audits",
    status: "Ongoing",
    date: "2024-11-01"
  }
];
