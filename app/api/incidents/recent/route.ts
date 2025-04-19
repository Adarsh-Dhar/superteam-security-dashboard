import { NextResponse } from 'next/server';
import { Connection, PublicKey } from '@solana/web3.js';
import { calculateLossFromTransfers } from '@/utils/transactionUtils';

interface RecentIncident {
  id: string;
  program: string;
  timestamp: string;
  fundsLost: number;
  responseTime: number;
  type: string;
  status: string;
}

// Helper to determine incident type based on error logs
function determineIncidentType(errorLog: string): string {
  if (!errorLog) return 'unknown';
  
  if (errorLog.includes('overflow') || 
      errorLog.includes('underflow') || 
      errorLog.includes('arithmetic error')) {
    return 'bug';
  }
  
  if (errorLog.includes('unauthorized') || 
      errorLog.includes('permission') || 
      errorLog.includes('access denied')) {
    return 'hack';
  }
  
  if (errorLog.includes('invalid signature') || 
      errorLog.includes('invalid key')) {
    return 'phishing';
  }
  
  return 'unknown';
}

export async function GET() {
  try {
    const connection = new Connection(process.env.QUICKNODE_ENDPOINT || "");
    const programId = new PublicKey(process.env.PROGRAM_ID || "");
    
    // Get recent signatures
    const signatures = await connection.getSignaturesForAddress(
      programId,
      { limit: 10 }
    );
    
    // Process each signature to extract incident details
    const recentIncidents: RecentIncident[] = [];
    
    for (const sig of signatures) {
      if (!sig.err || !sig.signature) continue;
      
      try {
        // Get transaction details
        const tx = await connection.getTransaction(sig.signature, {
          maxSupportedTransactionVersion: 0
        });
        
        if (!tx || !tx.meta) continue;
        
        // Extract program from transaction
        //@ts-ignore
        const programName = tx.transaction.message.accountKeys
          .find((key: { equals: (arg0: PublicKey) => any; }) => key.equals(programId))?.toBase58().slice(0, 8) || 'Unknown';
        
        // Calculate funds lost
        const fundsLost = await calculateLossFromTransfers(
          connection,
          programId,
          sig.signature
        );
        
        // Determine incident type from logs
        const logs = tx.meta.logMessages?.join('\n') || '';
        const type = determineIncidentType(logs);
        
        // For a real implementation, you would look up the incident in your database
        // to find its paired recovery transaction and status
        // Here we'll simulate response time and status
        const responseTime = type === 'bug' ? 1.5 : type === 'phishing' ? 2.8 : 4.5;
        const status = Math.random() > 0.3 ? 'resolved' : 
                      Math.random() > 0.5 ? 'mitigated' : 'investigating';
        
        recentIncidents.push({
          id: `inc-${sig.signature.slice(0, 8)}`,
          program: programName || 'Unknown Program',
          //@ts-ignore
          timestamp: new Date(sig.blockTime * 1000).toISOString(),
          fundsLost,
          responseTime,
          type,
          status
        });
      } catch (error) {
        console.error('Error processing transaction:', sig.signature, error);
        continue;
      }
    }
    
    return NextResponse.json(recentIncidents);
  } catch (error) {
    console.error('Error fetching recent incidents:', error);
    return NextResponse.json({ error: 'Failed to fetch recent incidents' }, { status: 500 });
  }
}