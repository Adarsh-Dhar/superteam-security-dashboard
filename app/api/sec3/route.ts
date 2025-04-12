// pages/api/sec3-watchtower.ts
import type { NextApiRequest, NextApiResponse } from 'next'

type AlertRequest = {
  network: string
  alert_type: string
  filters?: Record<string, any>
}

type AlertResponse = {
  success: boolean
  alerts?: any[]
  message?: string
}

export const POST = async (req: NextApiRequest, res: NextApiResponse<AlertResponse>) => {
  try {
    const body: AlertRequest = req.body
    const apiKey = process.env.SEC3_API_KEY
    
    if (!apiKey) {
      return res.status(500).json({
        success: false,
        message: 'API key not configured'
      })
    }

    const response = await fetch('https://api.sec3.dev/v1/alerts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify(body)
    })

    const data = await response.json()
    return res.status(200).json({
      success: true,
      alerts: data
    })
  } catch (error) {
    console.error('Error fetching alerts:', error)
    return res.status(500).json({
      success: false,
      message: 'Failed to fetch security alerts'
    })
  }
}