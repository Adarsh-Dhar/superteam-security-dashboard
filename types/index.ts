export type FundFlow = {
    blockchain: string;
    from: string;
    to: string;
    amount: string;
    status: 'Stolen' | 'Traced' | 'Frozen' | 'Mixed';
  };
  
  export type RemediationAction = {
    action: string;
    status: 'Complete' | 'In Progress';
    date: string;
  };
  
  export type TimelineEvent = {
    time: string;
    title: string;
    description: string;
  };