export interface FundFlow {
    blockchain: string
    from: string
    to: string
    amount: string
    status: string
    txHash?: string
  }
  
  export interface RemediationAction {
    action: string
    status: string
    date: string
    reference?: string
  }
  
  export interface TimelineEvent {
    time: string
    title: string
    description: string
    reference?: string
  }
  