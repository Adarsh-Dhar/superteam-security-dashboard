import { NextResponse } from 'next/server';

interface IncidentType {
  name: string;
  value: number;
  color: string;
}

export async function GET() {
  try {
    // In a real implementation, this would query your database
    // Here we'll return fixed data based on the mock in the frontend
    
    const incidentTypeData: IncidentType[] = [
      { name: "Hacks", value: 62, color: "#FF6B6B" },
      { name: "Phishing", value: 23, color: "#FFD166" },
      { name: "Bugs", value: 15, color: "#06D6A0" }
    ];
    
    return NextResponse.json(incidentTypeData);
  } catch (error) {
    console.error('Error fetching incident types:', error);
    return NextResponse.json({ error: 'Failed to fetch incident types' }, { status: 500 });
  }
}