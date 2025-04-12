// pages/api/blocknative-mempool.ts
import type { NextApiRequest, NextApiResponse } from 'next'
import Blocknative from 'bnc-sdk'

type MempoolResponse = {
  success: boolean
  message: string
  blockedTransactions?: string[]
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<MempoolResponse>
) {
  try {
    // Initialize Blocknative client
    const blocknative = new Blocknative({
        //@ts-ignore
      dappId: process.env.BLOCKNATIVE_API_KEY,
      networkId: 5, // 5 = Solana mainnet
      transactionHandlers: [handleTransaction]
    })

    // Start mempool monitoring
    //@ts-ignore
    const { emitter } = blocknative.mempool()
    const blockedTxs: string[] = []

    // Transaction handler
    function handleTransaction(tx: any) {
      if (tx.input?.startsWith('malicious_pattern')) {
        blockedTxs.push(tx.hash)
        console.log(`Blocked suspicious transaction: ${tx.hash}`)
      }
    }

    // Close connection after 5 seconds for demo purposes
    setTimeout(() => {
      emitter.off('tx', handleTransaction)
    }, 5000)

    return res.status(200).json({
      success: true,
      message: 'Mempool monitoring initialized',
      blockedTransactions: blockedTxs
    })

  } catch (error) {
    console.error('Mempool monitoring error:', error)
    return res.status(500).json({
      success: false,
      message: 'Failed to initialize mempool monitoring'
    })
  }
}
