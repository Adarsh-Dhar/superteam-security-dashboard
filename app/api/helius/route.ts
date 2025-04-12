// pages/api/helius-webhook.ts
import type { NextApiRequest, NextApiResponse } from 'next'

type WebhookRequest = {
  webhookURL: string
  transactionTypes: string[]
  accountAddresses: string[]
  authHeader?: string
}

type WebhookResponse = {
  id: string
  success: boolean
  message?: string
}

export const POST = async (req: NextApiRequest, res: NextApiResponse<WebhookResponse>) => {
  try {
    const body: WebhookRequest = req.body
    const apiKey = process.env.HELIUS_API_KEY

    if (!apiKey) {
      return res.status(500).json({
        id: '',
        success: false,
        message: 'API key not configured'
      })
    }

    const response = await fetch(
      `https://api.helius.xyz/v0/webhooks?api-key=${apiKey}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      }
    )

    const data = await response.json()
    return res.status(200).json(data)
  } catch (error) {
    console.error('Error creating webhook:', error)
    return res.status(500).json({
      id: '',
      success: false,
      message: 'Failed to create webhook'
    })
  }
}