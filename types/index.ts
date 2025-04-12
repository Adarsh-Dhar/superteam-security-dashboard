export interface FundFlow {
    blockchain: string
    from: string
    to: string
    amount: string
    status: string
  }
  
  export interface RemediationAction {
    action: string
    status: string
    date: string
  }
  
  export interface TimelineEvent {
    time: string
    title: string
    description: string
  }
  