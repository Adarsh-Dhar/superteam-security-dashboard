import { NextResponse } from 'next/server';
import { Connection, PublicKey } from '@solana/web3.js';

// Constants
const QUICKNODE_ENDPOINT = process.env.SOLANA_RPC_URL || 'your_fallback_endpoint_here';
const PROGRAM_ID = process.env.MONITORED_PROGRAM_ID || 'your_program_id_here';

interface IncidentData {
  day: string;
  incidents: number;
}

// Helper to format date to "MMM DD" format
function formatDateToMMDD(date: Date): string {
  return date.toLocaleDateString('en-US', { month: 'short', day: '2-digit' });
}

// Get incident frequency data for the past week
export async function GET() {
  try {
    const connection = new Connection(QUICKNODE_ENDPOINT);
    
    // Validate program ID format before creating PublicKey
    let programId: PublicKey;
    try {
      programId = new PublicKey(PROGRAM_ID);
      console.log('Using program ID:', programId.toString());
    } catch (error) {
      console.error('Invalid program ID format:', error);
      return NextResponse.json(
        { error: 'Invalid program ID format. Please check your environment variables.' }, 
        { status: 400 }
      );
    }
    
    // Get current date and calculate 7 days ago
    const endDate = new Date();
    const startDate = new Date();
    startDate.setDate(endDate.getDate() - 6); // 7 days including today
    
    // Initialize all days in the past week with 0 incidents
    const incidentsByDay = new Map<string, number>();
    for (let i = 0; i < 7; i++) {
      const date = new Date(endDate);
      date.setDate(endDate.getDate() - i);
      incidentsByDay.set(formatDateToMMDD(date), 0);
    }
    
    try {
      // Get program error logs using Solana connection
      console.log('Fetching signatures for program:', programId.toString());
      
      // Remove the "until" parameter as it might be causing issues
      const signatures = await connection.getSignaturesForAddress(
        programId,
        { limit: 100 }
      );
      
      console.log(`Fetched ${signatures.length} signatures`);
      
      // Count incidents by day based on transaction signatures
      for (const sig of signatures) {
        if (sig.err) { // Only count transactions with errors as incidents
          if(!sig.blockTime) continue; // Skip if blockTime is not available
          
          const txDate = new Date(sig.blockTime * 1000); // blockTime is in seconds
          
          // Only count if within our date range
          if (txDate >= startDate && txDate <= endDate) {
            const dayKey = formatDateToMMDD(txDate);
            if (incidentsByDay.has(dayKey)) {
              incidentsByDay.set(dayKey, (incidentsByDay.get(dayKey) || 0) + 1);
            }
          }
        }
      }
    } catch (error) {
      console.error('Error fetching signatures:', error);
      // Continue with empty data rather than failing
    }
    
    // Convert map to array format expected by frontend
    const incidentData: IncidentData[] = Array.from(incidentsByDay.entries())
      .map(([day, incidents]) => ({ day, incidents }))
      .sort((a, b) => {
        // Sort by date (converting MMM DD format back to sortable dates)
        const dateA = new Date(a.day + " " + new Date().getFullYear());
        const dateB = new Date(b.day + " " + new Date().getFullYear());
        return dateA.getTime() - dateB.getTime();
      });
    
    return NextResponse.json(incidentData);
  } catch (error) {
    console.error('Error fetching incident frequency data:', error);
    return NextResponse.json({ error: 'Failed to fetch incident data' }, { status: 500 });
  }
}