// pages/api/solana-compass.ts
import type { NextApiRequest, NextApiResponse } from 'next'

type SecurityRegistryRequest = {
  status?: string
  riskLevel?: string
}

type SecurityRegistryResponse = {
  success: boolean
  contracts?: any[]
  message?: string
}

export const GET = async (req: NextApiRequest, res: NextApiResponse<SecurityRegistryResponse>) => {
  try {
    const { status = 'active', riskLevel = 'high' } = req.query
    const apiKey = process.env.SOLANA_COMPASS_API_KEY
    
    if (!apiKey) {
      return res.status(500).json({
        success: false,
        message: 'API key not configured'
      })
    }

    // This is a placeholder for the actual API endpoint
    const response = await fetch(
      `https://api.solanacompass.com/security-registry?status=${status}&riskLevel=${riskLevel}`,
      {
        headers: {
          'Authorization': `Bearer ${apiKey}`
        }
      }
    )

    const data = await response.json()
    return res.status(200).json({
      success: true,
      contracts: data
    })
  } catch (error) {
    console.error('Error fetching security registry data:', error)
    return res.status(500).json({
      success: false,
      message: 'Failed to fetch security registry data'
    })
  }
}