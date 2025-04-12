// pages/api/immunefi-vulnerabilities.ts
import type { NextApiRequest, NextApiResponse } from 'next'

type VulnerabilityResponse = {
  success: boolean
  data?: any[]
  message?: string
}

export const GET = async (req: NextApiRequest, res: NextApiResponse<VulnerabilityResponse>) => {
  try {
    const { chain = 'solana', severity = 'critical' } = req.query
    const apiKey = process.env.IMMUNEFI_API_KEY
    
    if (!apiKey) {
      return res.status(500).json({
        success: false,
        message: 'API key not configured'
      })
    }

    const response = await fetch(
      `https://api.immunefi.com/v2/exploits?chain=${chain}&severity=${severity}`,
      {
        headers: {
          'X-API-KEY': apiKey
        }
      }
    )

    const data = await response.json()
    return res.status(200).json({
      success: true,
      data: data.data
    })
  } catch (error) {
    console.error('Error fetching vulnerability data:', error)
    return res.status(500).json({
      success: false,
      message: 'Failed to fetch vulnerability data'
    })
  }
}