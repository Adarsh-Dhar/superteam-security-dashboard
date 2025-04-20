import { NextResponse } from 'next/server';
import { Connection, PublicKey } from '@solana/web3.js';
import { calculateLossFromTransfers } from '@/utils/transactionUtils';
import { incidentDatabase, calculateAverageResponseTime } from '@/utils/databaseUtils';

export async function GET() {
  try {
    // Check for environment variables
    const rpcUrl = process.env.SOLANA_RPC_URL;
    const programIdStr = process.env.MONITORED_PROGRAM_ID;
    
    if (!rpcUrl || !programIdStr) {
      console.error("Missing environment variables: SOLANA_RPC_URL or MONITORED_PROGRAM_ID");
      return NextResponse.json({ 
        error: 'Missing environment configuration' 
      }, { status: 500 });
    }
    
    // Create connection and program ID
    const connection = new Connection(rpcUrl);
    
    // Validate program ID
    let programId;
    try {
      programId = new PublicKey(programIdStr);
    } catch (err) {
      console.error("Invalid program ID:", err);
      return NextResponse.json({ 
        error: 'Invalid program ID configuration' 
      }, { status: 500 });
    }
    
    // Get recent signatures - without using the 'until' parameter with a date
    const signatures = await connection.getSignaturesForAddress(
      programId,
      { limit: 1000 }
    );
    
    // Filter for signatures in the last 30 days
    const thirtyDaysAgo = Date.now() - (30 * 24 * 60 * 60 * 1000);
    const recentSignatures = signatures.filter(sig => 
      sig.blockTime && sig.blockTime * 1000 >= thirtyDaysAgo
    );
    
    // Filter for error transactions (incidents)
    const errorSignatures = recentSignatures.filter(sig => sig.err);
    
    // Calculate total incidents
    const totalIncidents = errorSignatures.length;
    
    // Estimate active incidents (those in the last 24 hours)
    const oneDayAgo = Date.now() - (24 * 60 * 60 * 1000);
    const activeIncidents = errorSignatures.filter(
      sig => sig.blockTime && sig.blockTime * 1000 >= oneDayAgo
    ).length;
    
    // Calculate total funds lost (simplified calculation)
    let totalFundsLost = 0;
    
    // Limit to 20 transactions for performance reasons
    const sampleSize = Math.min(20, errorSignatures.length);
    const sampleSignatures = errorSignatures.slice(0, sampleSize);
    
    for (const sig of sampleSignatures) {
      if (!sig.signature) continue;
      
      try {
        const loss = await calculateLossFromTransfers(
          connection,
          programId,
          sig.signature
        );
        
        totalFundsLost += loss;
      } catch (err) {
        console.warn(`Error calculating loss for signature ${sig.signature}:`, err);
        // Continue with next signature
      }
    }
    
    // Scale up the total based on our sample size (if needed)
    if (errorSignatures.length > sampleSize) {
      totalFundsLost = totalFundsLost * (errorSignatures.length / sampleSize);
    }
    
    // Use the helper function from databaseUtils to calculate average response time
    const avgResponseTime = calculateAverageResponseTime();
    
    const summary = {
      totalIncidents,
      activeIncidents,
      totalFundsLost: Math.round(totalFundsLost),
      avgResponseTime: parseFloat(avgResponseTime.toFixed(1))
    };
    
    return NextResponse.json(summary);
  } catch (error : any) {
    console.error('Error fetching incident summary:', error);
    return NextResponse.json({ 
      error: 'Failed to fetch incident summary',
      message: error.message
    }, { status: 500 });
  }
}