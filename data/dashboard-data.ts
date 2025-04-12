import { FundFlow, RemediationAction, TimelineEvent } from "@/types";

export const fundFlowData: FundFlow[] = [
  {
    blockchain: "Solana",
    from: "worm...5dTp",
    to: "3Hti...j7Yk",
    amount: "120,000 wETH",
    status: "Stolen"
  },
  {
    blockchain: "Ethereum",
    from: "0x8c7...a4e3",
    to: "0x56b...91f2",
    amount: "93,750 ETH",
    status: "Traced"
  },
  {
    blockchain: "Ethereum",
    from: "0x56b...91f2",
    to: "0xd8d...c420",
    amount: "42,500 ETH",
    status: "Frozen"
  },
  {
    blockchain: "Ethereum",
    from: "0x56b...91f2",
    to: "Tornado Cash",
    amount: "31,250 ETH",
    status: "Mixed"
  }
];

export const remediationData: RemediationAction[] = [
  {
    action: "Vulnerability Patch",
    status: "Complete",
    date: "Feb 3, 2022"
  },
  {
    action: "Funds Replenished",
    status: "Complete",
    date: "Feb 3, 2022"
  },
  {
    action: "Security Audit",
    status: "Complete",
    date: "Feb 17, 2022"
  },
  {
    action: "Asset Recovery",
    status: "In Progress",
    date: "Ongoing"
  },
  {
    action: "Legal Action",
    status: "In Progress",
    date: "Ongoing"
  }
];

export const timelineData: TimelineEvent[] = [
  {
    time: "Feb 2, 2022 - 23:04 UTC",
    title: "Exploit Initiated",
    description: "Attacker bypassed signature verification in Wormhole contract and minted 120,000 wETH on Solana."
  },
  {
    time: "Feb 2, 2022 - 23:33 UTC",
    title: "Bridge Halted",
    description: "Wormhole team detected the exploit and temporarily shut down bridge services."
  },
  {
    time: "Feb 3, 2022 - 01:15 UTC",
    title: "Vulnerability Patched",
    description: "Emergency fix deployed to address the signature verification vulnerability."
  },
  {
    time: "Feb 3, 2022 - 13:45 UTC",
    title: "Jump Crypto Backstop",
    description: "Jump Crypto announced they would provide ETH to ensure Wormhole users' funds are backed 1:1."
  },
  {
    time: "Feb 4, 2022 - 07:30 UTC",
    title: "Bridge Restored",
    description: "Wormhole bridge operations resumed after security audit and additional testing."
  }
];

export const vulnerableCode = `// Vulnerable Code:
function verifySignatures(bytes32 hash, Signature[] memory signatures) 
    internal view returns (bool) {
    // MISSING VALIDATION: Should verify signatures array is not empty
    
    // Count valid signatures
    uint8 validSignatures = 0;
    for (uint i = 0; i < signatures.length; i++) {
        address recovered = ecrecover(
            keccak256(abi.encodePacked("\\x19Ethereum Signed Message:\\n32", hash)),
            signatures[i].v,
            signatures[i].r,
            signatures[i].s
        );
        
        // Check if signer is a guardian
        if (isGuardian[recovered]) {
            validSignatures += 1;
        }
    }
    
    // Attacker could pass empty array to bypass check
    return validSignatures >= quorum();
}`;

export const fixedCode = `// Fixed Code:
function verifySignatures(bytes32 hash, Signature[] memory signatures) 
    internal view returns (bool) {
    // ADDED VALIDATION: Require non-empty signatures array
    require(signatures.length > 0, "No signatures provided");
    
    // Count valid signatures
    uint8 validSignatures = 0;
    for (uint i = 0; i < signatures.length; i++) {
        address recovered = ecrecover(
            keccak256(abi.encodePacked("\\x19Ethereum Signed Message:\\n32", hash)),
            signatures[i].v,
            signatures[i].r,
            signatures[i].s
        );
        
        // Check if signer is a guardian
        if (isGuardian[recovered]) {
            validSignatures += 1;
        }
    }
    
    return validSignatures >= quorum();
}`;