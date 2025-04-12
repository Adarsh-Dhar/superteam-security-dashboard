// pages/api/solanafm-parser.ts
import type { NextApiRequest, NextApiResponse } from 'next'
import { SolanaFMParser, ParserType } from "@solanafm/explorer-kit"

type ParserRequest = {
  instruction: string
  idl?: any
}

type ParserResponse = {
  success: boolean
  decoded?: any
  message?: string
}

export const POST = async (req: NextApiRequest, res: NextApiResponse<ParserResponse>) => {
  try {
    const { instruction, idl } = req.body as ParserRequest
    
    if (!instruction) {
      return res.status(400).json({
        success: false,
        message: 'instruction is required'
      })
    }

    // Use default IDL if not provided
    const SFMIdlItem = idl || { /* default IDL structure */ }
    
    const parser = new SolanaFMParser(SFMIdlItem, "sjbgfjdbgj")
    //@ts-ignore
    const decoded = parser.parseInstructions(
      instruction,
      ParserType.INSTRUCTION
    )

    return res.status(200).json({
      success: true,
      decoded
    })
  } catch (error) {
    console.error('Error parsing instruction:', error)
    return res.status(500).json({
      success: false,
      message: 'Failed to parse instruction'
    })
  }
}