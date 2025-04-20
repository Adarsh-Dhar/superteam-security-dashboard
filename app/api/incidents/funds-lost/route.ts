import { NextResponse } from 'next/server';
import { Connection, PublicKey } from '@solana/web3.js';
import { formatDateToMMDD } from '@/utils/dateUtils';

interface FundsLostData {
  day: string;
  amount: number;
}

// Helper function to calculate loss from token transfers
async function calculateLossFromTransfers(
  connection: Connection, 
  address: PublicKey,
  txSignature: string
): Promise<number> {
  try {
    // Get transaction details
    const tx = await connection.getTransaction(txSignature, {
      maxSupportedTransactionVersion: 0,
    });
    
    if (!tx || !tx.meta) return 0;
    
    // Calculate SOL balance change
    const solLoss = tx.meta.preBalances.reduce((acc, balance, index) => {
      const postBalance = tx.meta?.postBalances[index] || 0;
      return acc + Math.max(0, balance - postBalance);
    }, 0) / 1e9; // Convert lamports to SOL
    
    // Calculate SPL token changes if available
    let splTokenLoss = 0;
    if (tx.meta.preTokenBalances && tx.meta.postTokenBalances) {
      // Map token addresses to their USD value (this would come from a price oracle in production)
      const tokenPrices: Record<string, number> = {
        'EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v': 1.0, // USDC
        'So11111111111111111111111111111111111111112': 150.0, // Wrapped SOL (example price)
        // Add other token mint addresses and their prices here
      };
      
      // Calculate token losses
      splTokenLoss = tx.meta.preTokenBalances.reduce((acc, preBalance) => {
        //@ts-ignore
        const postBalance = tx.meta?.postTokenBalances.find(
          post => post.accountIndex === preBalance.accountIndex
        );
        
        if (!postBalance) return acc;
        
        const mintAddress = preBalance.mint;
        const tokenPrice = tokenPrices[mintAddress] || 0;
        
        const preAmount = Number(preBalance.uiTokenAmount.uiAmount || 0);
        const postAmount = Number(postBalance.uiTokenAmount.uiAmount || 0);
        
        const tokenLoss = Math.max(0, preAmount - postAmount) * tokenPrice;
        return acc + tokenLoss;
      }, 0);
    }
    
    // Return total loss in USD (SOL converted to USD + token loss)
    return solLoss * 150 + splTokenLoss; // Assuming 1 SOL = $150 USD
  } catch (error) {
    console.error('Error calculating loss for transaction:', txSignature, error);
    return 0;
  }
}

export async function GET() {
  try {
    // Check if environment variables are set
    const rpcUrl = process.env.SOLANA_RPC_URL;
    const programIdString = process.env.MONITORED_PROGRAM_ID;
    
    if (!rpcUrl) {
      console.error('Missing SOLANA_RPC_URL environment variable');
      return NextResponse.json({ error: 'RPC URL not configured' }, { status: 500 });
    }
    
    if (!programIdString) {
      console.error('Missing MONITORED_PROGRAM_ID environment variable');
      return NextResponse.json({ error: 'Program ID not configured' }, { status: 500 });
    }
    
    // Validate program ID format
    let programId: PublicKey;
    try {
      programId = new PublicKey(programIdString);
      console.log('Using program ID:', programId.toString());
    } catch (error) {
      console.error('Invalid program ID format:', error);
      return NextResponse.json(
        { error: 'Invalid program ID format' }, 
        { status: 400 }
      );
    }
    
    const connection = new Connection(rpcUrl);
    
    // Get current date and calculate 7 days ago
    const endDate = new Date();
    const startDate = new Date();
    startDate.setDate(endDate.getDate() - 6); // 7 days including today
    
    // Create a map to store funds lost by day
    const fundsLostByDay = new Map<string, number>();
    
    // Initialize all days in the past week with 0 funds lost
    for (let i = 0; i < 7; i++) {
      const date = new Date(endDate);
      date.setDate(endDate.getDate() - i);
      fundsLostByDay.set(formatDateToMMDD(date), 0);
    }
    
    try {
      // Get program error logs - fix the params
      // Solana doesn't accept ISO strings for before/until - remove them
      console.log('Fetching signatures for program:', programId.toString());
      const signatures = await connection.getSignaturesForAddress(
        programId,
        { limit: 100 } // Simplified params
      );
      
      console.log(`Fetched ${signatures.length} signatures`);
      
      // Filter for transactions with errors (potential incidents)
      const errorSignatures = signatures.filter(sig => sig.err);
      console.log(`Found ${errorSignatures.length} error signatures`);
      
      // Calculate funds lost per day
      for (const sig of errorSignatures) {
        if (!sig.signature) continue;
        if (!sig.blockTime) continue; // Skip if blockTime is not available
        
        const txDate = new Date(sig.blockTime * 1000);
        
        // Only consider transactions within our date range
        if (txDate >= startDate && txDate <= endDate) {
          const dayKey = formatDateToMMDD(txDate);
          
          if (fundsLostByDay.has(dayKey)) {
            const loss = await calculateLossFromTransfers(
              connection,
              programId,
              sig.signature
            );
            
            fundsLostByDay.set(
              dayKey, 
              (fundsLostByDay.get(dayKey) || 0) + loss
            );
          }
        }
      }
    } catch (error) {
      console.error('Error fetching signatures:', error);
      // Continue with empty data rather than failing completely
    }
    
    // Convert map to array format expected by frontend
    const fundsLostData: FundsLostData[] = Array.from(fundsLostByDay.entries())
      .map(([day, amount]) => ({ day, amount: Math.round(amount) }))
      .sort((a, b) => {
        const dateA = new Date(a.day + " " + new Date().getFullYear());
        const dateB = new Date(b.day + " " + new Date().getFullYear());
        return dateA.getTime() - dateB.getTime();
      });
    
    return NextResponse.json(fundsLostData);
  } catch (error) {
    console.error('Error fetching funds lost data:', error);
    return NextResponse.json({ error: 'Failed to fetch funds lost data' }, { status: 500 });
  }
}