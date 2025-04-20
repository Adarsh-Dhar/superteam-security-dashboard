import { Connection, ParsedTransactionWithMeta, PublicKey } from '@solana/web3.js';

/**
 * Calculates the total funds lost from transfers in a transaction
 * by analyzing the pre and post balances of accounts involved.
 * 
 * @param connection - Solana RPC connection
 * @param programId - The program ID associated with the incident
 * @param signature - Transaction signature to analyze
 * @returns Total funds lost in SOL
 */
export async function calculateLossFromTransfers(
  connection: Connection,
  programId: PublicKey,
  signature: string
): Promise<number> {
  try {
    // Get transaction details
    const tx = await connection.getParsedTransaction(signature, {
      maxSupportedTransactionVersion: 0
    });
    
    if (!tx || !tx.meta) {
      return 0;
    }
    
    return calculateLossFromTransaction(tx, programId);
  } catch (error) {
    console.error('Error calculating loss from transfers:', error);
    return 0;
  }
}

/**
 * Analyzes a transaction to determine funds lost
 * 
 * @param tx - Parsed transaction with metadata
 * @param programId - Program ID to focus analysis on
 * @returns Total funds lost in SOL
 */
export function calculateLossFromTransaction(
  tx: ParsedTransactionWithMeta,
  programId: PublicKey
): number {
  if (!tx.meta) return 0;
  
  const { preBalances, postBalances } = tx.meta;
  const accounts = tx.transaction.message.accountKeys;
  
  // Initialize with zero loss
  let totalLoss = 0;
  
  // Identify program accounts (accounts interacting with the program)
  const programAccounts = new Set<number>();
  
  // Find program invocation indices in the logs
  if (tx.meta.logMessages) {
    tx.meta.logMessages.forEach((log, i) => {
      if (log.includes(`Program ${programId.toString()} invoke`)) {
        // Next few logs might mention accounts being accessed
        for (let j = i + 1; j < Math.min(i + 10, tx.meta!.logMessages!.length); j++) {
          const logLine = tx.meta!.logMessages![j];
          
          // Look for account access patterns in the logs
          if (logLine.includes('Account:')) {
            const accountMatch = logLine.match(/Account: (\w+)/);
            if (accountMatch) {
              const accountAddress = accountMatch[1];
              const accountIndex = accounts.findIndex(
                acc => acc.pubkey.toString() === accountAddress
              );
              
              if (accountIndex >= 0) {
                programAccounts.add(accountIndex);
              }
            }
          }
        }
      }
    });
  }
  
  // Analyze balance changes for accounts associated with the program
  accounts.forEach((account, index) => {
    // Check if account is related to the program
    const isProgramAccount = 
      account.pubkey.equals(programId) || 
      programAccounts.has(index) ||
      tx.meta?.logMessages?.some(log => log.includes(account.pubkey.toString()));
    
    if (isProgramAccount) {
      const preBal = preBalances[index] || 0;
      const postBal = postBalances[index] || 0;
      
      // If balance decreased, it might indicate a loss
      if (preBal > postBal) {
        // Convert from lamports to SOL (1 SOL = 1,000,000,000 lamports)
        totalLoss += (preBal - postBal) / 1_000_000_000;
      }
    }
  });
  
  // Additional analysis for token transfers
  if (tx.meta.preTokenBalances && tx.meta.postTokenBalances) {
    // Analyze token balance changes
    // This is a simplified approach - in a real implementation, you'd need to:
    // - Match pre and post balances by mint and owner
    // - Calculate differences
    // - Convert to USD or SOL equivalent value
    
    const preTokenMap = new Map();
    const postTokenMap = new Map();
    
    tx.meta.preTokenBalances.forEach(balance => {
      const key = `${balance.mint}-${balance.owner}`;
      preTokenMap.set(key, BigInt(balance.uiTokenAmount.amount));
    });
    
    tx.meta.postTokenBalances.forEach(balance => {
      const key = `${balance.mint}-${balance.owner}`;
      postTokenMap.set(key, BigInt(balance.uiTokenAmount.amount));
    });
    
    // Find token balances that decreased
    for (const [key, preAmount] of preTokenMap.entries()) {
      const postAmount = postTokenMap.get(key) || BigInt(0);
      
      if (preAmount > postAmount) {
        // In a production system, you would convert this to SOL or USD value
        // For this example, we'll add a nominal amount based on the difference
        const tokenDiff = Number(preAmount - postAmount);
        // Assuming a very simple conversion factor for demonstration
        // In reality, you'd use an oracle or price feed
        totalLoss += tokenDiff * 0.00001; // Sample conversion factor
      }
    }
  }
  
  return Number(totalLoss.toFixed(4));
}

/**
 * Estimates the potential value of funds at risk in a vulnerable program
 * 
 * @param connection - Solana RPC connection
 * @param programId - Program ID to analyze
 * @returns Total value at risk in SOL
 */
export async function estimateFundsAtRisk(
  connection: Connection,
  programId: PublicKey
): Promise<number> {
  try {
    // Get program accounts
    const accounts = await connection.getProgramAccounts(programId);
    
    // Calculate total balance across all program accounts
    let totalBalance = 0;
    for (const account of accounts) {
      totalBalance += account.account.lamports / 1_000_000_000; // Convert to SOL
    }
    
    return totalBalance;
  } catch (error) {
    console.error('Error estimating funds at risk:', error);
    return 0;
  }
}