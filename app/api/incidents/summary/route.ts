import { NextResponse } from 'next/server';
import { Connection, PublicKey } from '@solana/web3.js';
import { calculateLossFromTransfers } from '@/utils/transactionUtils';
import { incidentDatabase } from '@/utils/databaseUtils';

interface IncidentSummary {
  totalIncidents: number;
  activeIncidents: number;
  totalFundsLost: number;
  avgResponseTime: number;
}

export async function GET() {
  try {
    const connection = new Connection(process.env.QUICKNODE_ENDPOINT || "");
    const programId = new PublicKey(process.env.PROGRAM_ID || "");
    
    // Get the last 30 days of signatures for our program
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    
    const signatures = await connection.getSignaturesForAddress(
      programId,
      { 
        limit: 1000,
        until: thirtyDaysAgo.toISOString()
      }
    );
    
    // Filter for error transactions (incidents)
    const errorSignatures = signatures.filter(sig => sig.err);
    
    // Calculate total incidents
    const totalIncidents = errorSignatures.length;
    
    // Estimate active incidents (those without a recovery tx - in a real system you'd track this in a database)
    // For simplicity, we'll consider incidents in the last 24 hours as possibly active
    const oneDayAgo = new Date();
    oneDayAgo.setDate(oneDayAgo.getDate() - 1);
    
    const activeIncidents = errorSignatures.filter(
      sig => sig.blockTime && sig.blockTime * 1000 > oneDayAgo.getTime()
    ).length;
    
    // Calculate total funds lost (simplified calculation)
    let totalFundsLost = 0;
    for (const sig of errorSignatures.slice(0, 20)) { // Limit to 20 for performance
      if (!sig.signature) continue;
      
      const loss = await calculateLossFromTransfers(
        connection,
        programId,
        sig.signature
      );
      
      totalFundsLost += loss;
    }
    
    // Scale up the total based on our sample size
    if (errorSignatures.length > 20) {
      totalFundsLost = totalFundsLost * (errorSignatures.length / 20);
    }
    
    // Calculate average response time using our database (simplified)
    const avgResponseTime = incidentDatabase
      .filter((inc: { resolved: any; recoveryTime: any; }) => inc.resolved && inc.recoveryTime)
      .reduce((sum: number, inc: { recoveryTime: number; detectionTime: number; }) => {
        if (!inc.recoveryTime) return sum;
        return sum + (inc.recoveryTime - inc.detectionTime) / 3600;
      }, 0) / Math.max(1, incidentDatabase.filter((inc: { resolved: any; }) => inc.resolved).length);
    
    const summary: IncidentSummary = {
      totalIncidents,
      activeIncidents,
      totalFundsLost: Math.round(totalFundsLost),
      avgResponseTime: parseFloat(avgResponseTime.toFixed(1))
    };
    
    return NextResponse.json(summary);
  } catch (error) {
    console.error('Error fetching incident summary:', error);
    return NextResponse.json({ error: 'Failed to fetch incident summary' }, { status: 500 });
  }
}
