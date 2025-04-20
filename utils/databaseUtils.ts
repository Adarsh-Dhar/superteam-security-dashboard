/**
 * Mock database for incident tracking
 * In a production environment, this would be replaced with a real database connection
 */

// Mock incident database with sample data
export const incidentDatabase = [
    {
      id: 'inc-4fA7Bd12',
      signature: '4veSBjVKTTujwkR7ZLSy7bYY8j9fYLsF7dcGJPMrXYQcKFjYccWpzA6BPG1pePZPsLgXvk7j9QA3VZqE3hjxpd9i',
      programId: 'TrPwmCNzWpnfF9JZ75xaCKh9MbH3JEsFf7LBfCGKvr9',
      detectionTime: Date.now() - 1000 * 60 * 60 * 72, // 72 hours ago
      recoveryTime: Date.now() - 1000 * 60 * 60 * 68, // 68 hours ago (4 hour response)
      resolved: true,
      fundsLost: 12.45,
      fundsRecovered: 10.2,
      incidentType: 'hack',
      attackVector: 'price oracle manipulation',
      recoveryMethod: 'governance vote'
    },
    {
      id: 'inc-9eC3Ab76',
      signature: '21rJ36jYz8XnEpWz1gDT1XDC8zR1entNjNNZmfXVyPmWBiGPJ4oT5KeSUWu7UZPCNWK7UdUyKPFdbSz6jAKW5ZcJ',
      programId: 'TrPwmCNzWpnfF9JZ75xaCKh9MbH3JEsFf7LBfCGKvr9',
      detectionTime: Date.now() - 1000 * 60 * 60 * 120, // 120 hours ago
      recoveryTime: Date.now() - 1000 * 60 * 60 * 116, // 116 hours ago (4 hour response)
      resolved: true,
      fundsLost: 5.2,
      fundsRecovered: 5.2,
      incidentType: 'bug',
      attackVector: 'arithmetic error in swap function',
      recoveryMethod: 'emergency patch'
    },
    {
      id: 'inc-7bD9Fe32',
      signature: '3gD4eZ7UTKoCqZQZNzdZVTJGHvk2GJnRzvZzqVwZL8VYYf7xJG5X8YYdHXmCXFxPRZwxCjFYpCaMeQ2tCzX3Ldch',
      programId: 'TrPwmCNzWpnfF9JZ75xaCKh9MbH3JEsFf7LBfCGKvr9',
      detectionTime: Date.now() - 1000 * 60 * 60 * 48, // 48 hours ago
      recoveryTime: Date.now() - 1000 * 60 * 60 * 45.5, // 45.5 hours ago (2.5 hour response)
      resolved: true,
      fundsLost: 28.7,
      fundsRecovered: 20.5,
      incidentType: 'phishing',
      attackVector: 'fake interface',
      recoveryMethod: 'multisig recovery'
    },
    {
      id: 'inc-2cE8Gh45',
      signature: '55XpEp3c5W5hjwRBBUUuvcPNMxQz9XcGvjzVTHU7zXZkePDVJPzfegL4mAKudQ9Yx4hRSPjPjbLdPRdSw9Zryomx',
      programId: 'TrPwmCNzWpnfF9JZ75xaCKh9MbH3JEsFf7LBfCGKvr9',
      detectionTime: Date.now() - 1000 * 60 * 60 * 12, // 12 hours ago
      recoveryTime: null, // Still active
      resolved: false,
      fundsLost: 42.1,
      fundsRecovered: 0,
      incidentType: 'hack',
      attackVector: 'reentrancy',
      recoveryMethod: null
    },
    {
      id: 'inc-5fH3Jk91',
      signature: '2mxp3DhZRPbPXgKS9uUdGvpo5QXGcNxG6RrJcvCLJiPYxhCSnMgDv3FxhxUgJTNnrVMedkpxLw96UMJAw59ZSKGH',
      programId: 'TrPwmCNzWpnfF9JZ75xaCKh9MbH3JEsFf7LBfCGKvr9',
      detectionTime: Date.now() - 1000 * 60 * 60 * 168, // 7 days ago
      recoveryTime: Date.now() - 1000 * 60 * 60 * 162, // 162 hours ago (6 hour response)
      resolved: true,
      fundsLost: 3.6,
      fundsRecovered: 3.6,
      incidentType: 'bug',
      attackVector: 'logic error',
      recoveryMethod: 'patch and refund'
    },
    {
      id: 'inc-8aK2Lm67',
      signature: '4aF6hZfKQoL9waJzsSMRvFXGwtCTWPJgPV8LEwvw5cgfLt1Z89oSsN5eSQhFmijb9AQ5XqRPfvwFUrh4RytTB9rq',
      programId: 'TrPwmCNzWpnfF9JZ75xaCKh9MbH3JEsFf7LBfCGKvr9',
      detectionTime: Date.now() - 1000 * 60 * 60 * 6, // 6 hours ago
      recoveryTime: null, // Still active
      resolved: false,
      fundsLost: 15.8,
      fundsRecovered: 0,
      incidentType: 'unknown',
      attackVector: 'under investigation',
      recoveryMethod: null
    }
  ];
  
  /**
   * Get all incidents from the database
   * @returns {Array} All incidents
   */
  export function getAllIncidents() {
    return [...incidentDatabase];
  }
  
  /**
   * Get active (unresolved) incidents
   * @returns {Array} Active incidents
   */
  export function getActiveIncidents() {
    return incidentDatabase.filter(incident => !incident.resolved);
  }
  
  /**
   * Get incident by ID
   * @param {string} id - Incident ID
   * @returns {Object|null} Incident data or null if not found
   */
  export function getIncidentById(id: string) {
    return incidentDatabase.find(incident => incident.id === id) || null;
  }
  
  /**
   * Get incidents by program ID
   * @param {string} programId - Solana program ID
   * @returns {Array} Incidents for the specified program
   */
  export function getIncidentsByProgram(programId: string) {
    return incidentDatabase.filter(incident => incident.programId === programId);
  }
  
  /**
   * Get incidents by type
   * @param {string} type - Incident type (hack, bug, phishing, unknown)
   * @returns {Array} Incidents of the specified type
   */
  export function getIncidentsByType(type: string) {
    return incidentDatabase.filter(incident => incident.incidentType === type);
  }
  
  /**
   * Calculate total funds lost in a given time period
   * @param {number} startTime - Start timestamp
   * @param {number} endTime - End timestamp
   * @returns {number} Total funds lost in the period
   */
  export function calculateFundsLostInPeriod(startTime: number, endTime: number) {
    return incidentDatabase
      .filter(incident => 
        incident.detectionTime >= startTime && 
        incident.detectionTime <= endTime
      )
      .reduce((total, incident) => total + incident.fundsLost, 0);
  }
  
  /**
   * Calculate average response time for resolved incidents
   * @returns {number} Average response time in hours
   */
  export function calculateAverageResponseTime() {
    const resolvedIncidents = incidentDatabase.filter(
      inc => inc.resolved && inc.recoveryTime
    );
    
    if (resolvedIncidents.length === 0) {
      return 0;
    }
    
    const totalResponseTime = resolvedIncidents.reduce((sum, inc) => {
        //@ts-ignore
      const responseTimeHours = (inc.recoveryTime - inc.detectionTime) / (1000 * 60 * 60);
      return sum + responseTimeHours;
    }, 0);
    
    return totalResponseTime / resolvedIncidents.length;
  }
  
  /**
   * Calculate recovery rate (funds recovered / funds lost)
   * @returns {number} Recovery rate as a decimal (0-1)
   */
  export function calculateRecoveryRate() {
    const totalLost = incidentDatabase.reduce((sum, inc) => sum + inc.fundsLost, 0);
    const totalRecovered = incidentDatabase.reduce(
      (sum, inc) => sum + (inc.fundsRecovered || 0), 
      0
    );
    
    return totalLost > 0 ? totalRecovered / totalLost : 0;
  }
  
  /**
   * Get incident statistics by type
   * @returns {Object} Statistics broken down by incident type
   */
  export function getIncidentStatsByType() {
    const stats = {
      hack: { count: 0, fundsLost: 0, avgResponseTime: 0 },
      bug: { count: 0, fundsLost: 0, avgResponseTime: 0 },
      phishing: { count: 0, fundsLost: 0, avgResponseTime: 0 },
      unknown: { count: 0, fundsLost: 0, avgResponseTime: 0 }
    };
    
    // Count incidents and sum funds lost by type
    incidentDatabase.forEach(inc => {
        //@ts-ignore
      if (!stats[inc.incidentType]) {
        //@ts-ignore
        stats[inc.incidentType] = { count: 0, fundsLost: 0, avgResponseTime: 0 };
      }
      //@ts-ignore
      stats[inc.incidentType].count++;
      //@ts-ignore
      stats[inc.incidentType].fundsLost += inc.fundsLost;
    });
    
    // Calculate average response time by type
    Object.keys(stats).forEach(type => {
      const resolvedIncidents = incidentDatabase.filter(
        inc => inc.incidentType === type && inc.resolved && inc.recoveryTime
      );
      
      if (resolvedIncidents.length > 0) {
        const totalResponseTime = resolvedIncidents.reduce((sum, inc) => {
            //@ts-ignore
          return sum + (inc.recoveryTime - inc.detectionTime) / (1000 * 60 * 60);
        }, 0);
        //@ts-ignore
        stats[type].avgResponseTime = totalResponseTime / resolvedIncidents.length;
      }
    });
    
    return stats;
  }