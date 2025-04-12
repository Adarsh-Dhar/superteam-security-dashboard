// pages/api/anchor-log-parser.ts
import type { NextApiRequest, NextApiResponse } from 'next'

type LogParserRequest = {
  logs: string[]
}

type LogParserResponse = {
  success: boolean
  result: {
    hasExploitPattern: boolean
    matches?: string[]
  }
  message?: string
}

export const POST = async (req: NextApiRequest, res: NextApiResponse<LogParserResponse>) => {
  try {
    const { logs } = req.body as LogParserRequest
    
    if (!logs || !Array.isArray(logs)) {
      return res.status(400).json({
        success: false,
        result: { hasExploitPattern: false },
        message: 'logs array is required'
      })
    }

    // Simple pattern matching example
    // In a real implementation, this would be more sophisticated
    const exploitPatterns = [
      'exploit_pattern',
      'unauthorized_transfer',
      'privilege_escalation',
      'overflow_detected'
    ]
    
    const matches = logs.filter(log => 
      exploitPatterns.some(pattern => log.includes(pattern))
    )
    
    return res.status(200).json({
      success: true,
      result: {
        hasExploitPattern: matches.length > 0,
        matches
      }
    })
  } catch (error) {
    console.error('Error parsing logs:', error)
    return res.status(500).json({
      success: false,
      result: { hasExploitPattern: false },
      message: 'Failed to parse logs'
    })
  }
}