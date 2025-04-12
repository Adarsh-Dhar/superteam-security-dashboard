// app/api/solana-mempool/route.ts
import { NextResponse } from 'next/server'
import { Connection, PublicKey } from '@solana/web3.js'
import WebSocket from 'ws'

export const GET = async () => {
  try {
    const SOLANA_RPC_URL = process.env.SOLANA_RPC_URL || 'https://api.mainnet-beta.solana.com'
    const WS_URL = process.env.SOLANA_WS_URL || 'wss://api.mainnet-beta.solana.com'
    const blockedTxs: string[] = []
    
    // Validate and create PublicKey instance
    const address = new PublicKey('C68a6RCGLiPskbPYtAcsCjhG8tfTWYcoB4JjCrXFdqyo')

    // Create Solana connection
    const connection = new Connection(SOLANA_RPC_URL, {
      wsEndpoint: WS_URL,
      commitment: 'confirmed'
    })

    // Create WebSocket subscription
    const ws = new WebSocket(WS_URL)

    // Handle incoming transactions
    ws.on('open', () => {
      const subscribeMessage = {
        jsonrpc: '2.0',
        id: 1,
        method: 'logsSubscribe',
        params: [
          {
            mentions: [address.toString()]
          },
          { commitment: 'confirmed' }
        ]
      }

      ws.send(JSON.stringify(subscribeMessage))
    })

    ws.on('message', async (data) => {
      const message = JSON.parse(data.toString())
      
      if (message.method === 'logsNotification') {
        const signature = message.params.result.context.signature
        const tx = await connection.getTransaction(signature, {
          commitment: 'confirmed'
        })

        if (tx?.meta?.err) {
          blockedTxs.push(signature)
          console.log(`Blocked failed transaction: ${signature}`)
        }

        // // Add custom filtering logic here
        // if (tx?.transaction.instructions.some(ix => 
        //   ix.data.toString('utf-8').includes('malicious_pattern')
        // )) {
        //   blockedTxs.push(signature)
        //   console.log(`Blocked suspicious transaction: ${signature}`)
        // }
      }
    })

    // Return immediate response with monitoring status
    return NextResponse.json({
      success: true,
      message: 'Solana mempool monitoring initialized',
      blockedTransactions: blockedTxs
    })

  } catch (error) {
    console.error('Solana monitoring error:', error)
    return NextResponse.json(
      { success: false, message: 'Failed to initialize Solana monitoring' },
      { status: 500 }
    )
  }
}