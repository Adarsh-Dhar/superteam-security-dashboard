// pages/api/flipside-decoded.ts
import type { NextApiRequest, NextApiResponse } from 'next'

type DecodedResponse = {
  success: boolean
  data?: any[]
  message?: string
}

export const GET = async (req: NextApiRequest, res: NextApiResponse<DecodedResponse>) => {
  try {
    const { program_id } = req.query
    const apiKey = process.env.FLIPSIDE_API_KEY
    
    if (!apiKey) {
      return res.status(500).json({
        success: false,
        message: 'API key not configured'
      })
    }

    if (!program_id) {
      return res.status(400).json({
        success: false,
        message: 'program_id parameter is required'
      })
    }

    const query = `
      SELECT * FROM solana.core.ez_decoded_instructions 
      WHERE program_id = '${program_id}'
      LIMIT 100
    `

    const response = await fetch('https://api.flipsidecrypto.com/api/v2/queries', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-API-Key': apiKey
      },
      body: JSON.stringify({ query })
    })

    const data = await response.json()
    return res.status(200).json({
      success: true,
      data: data.results
    })
  } catch (error) {
    console.error('Error querying decoded instructions:', error)
    return res.status(500).json({
      success: false,
      message: 'Failed to query decoded instructions'
    })
  }
}