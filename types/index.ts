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
  
  export interface ExploitType {
    name: string
    count: number
    percentage: number
  }
  
  export interface Exploit {
    id: string
    protocol: string
    type: string
    date: string
    amount: number
    exploitType: string
    technique: string
    audited: string
    link: string
  }
  