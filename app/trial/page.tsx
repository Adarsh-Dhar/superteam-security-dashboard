"use client"
import { useState } from 'react';
import { NextPage } from 'next';

interface ApiResponse {
  endpoint: string;
  status: 'idle' | 'loading' | 'success' | 'error';
  data: any;
  error?: string;
}

const SecurityDashboard: NextPage = () => {
  // Form state for each API
  const [heliusWebhook, setHeliusWebhook] = useState({
    webhookURL: "https://your-service.com/webhook",
    transactionTypes: ["ANY"],
    accountAddresses: [""],
    authHeader: "your-secret"
  });

  const [blocknativeFilter, setBlocknativeFilter] = useState("malicious_pattern");
  
  const [sec3Alert, setSec3Alert] = useState({
    network: "solana",
    alert_type: "contract_anomaly"
  });
  
  const [immunefiParams, setImmunefiParams] = useState({
    chain: "solana",
    severity: "critical"
  });
  
  const [compassParams, setCompassParams] = useState({
    status: "active",
    riskLevel: "high"
  });
  
  const [flipsideProgramId, setFlipsideProgramId] = useState("");
  
  const [solanaFmInstruction, setSolanaFmInstruction] = useState("");
  
  const [anchorLogs, setAnchorLogs] = useState<string[]>([]);
  const [anchorLogInput, setAnchorLogInput] = useState("");

  // Response state
  const [responses, setResponses] = useState<ApiResponse[]>([
    { endpoint: 'helius', status: 'idle', data: null },
    { endpoint: 'blocknative', status: 'idle', data: null },
    { endpoint: 'sec3', status: 'idle', data: null },
    { endpoint: 'immunefi', status: 'idle', data: null },
    { endpoint: 'compass', status: 'idle', data: null },
    { endpoint: 'flipside', status: 'idle', data: null },
    { endpoint: 'solanaFM', status: 'idle', data: null },
    { endpoint: 'anchor', status: 'idle', data: null }
  ]);

  // Update response state helper
  const updateResponse = (endpoint: string, status: ApiResponse['status'], data: any = null, error: string = '') => {
    setResponses(prev => 
      prev.map(res => 
        res.endpoint === endpoint 
          ? { ...res, status, data, error }
          : res
      )
    );
  };

  // API call functions
  const callHeliusWebhook = async () => {
    updateResponse('helius-webhook', 'loading');
    try {
      const response = await fetch('/api/helius', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(heliusWebhook)
      });
      const data = await response.json();
      updateResponse('helius-webhook', 'success', data);
      console.log('Helius webhook response:', data);
    } catch (error) {
      updateResponse('helius-webhook', 'error', null, error instanceof Error ? error.message : 'Unknown error');
      console.error('Helius webhook error:', error);
    }
  };

  const callBlocknativeMempool = async () => {
    updateResponse('blocknative-mempool', 'loading');
    try {
      const response = await fetch(`/api/blocknative?filter=${blocknativeFilter}`);
      const data = await response.json();
      updateResponse('blocknative-mempool', 'success', data);
      console.log('Blocknative mempool response:', data);
    } catch (error) {
      updateResponse('blocknative-mempool', 'error', null, error instanceof Error ? error.message : 'Unknown error');
      console.error('Blocknative mempool error:', error);
    }
  };

  const callSec3Watchtower = async () => {
    updateResponse('sec3-watchtower', 'loading');
    try {
      const response = await fetch('/api/sec3', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(sec3Alert)
      });
      const data = await response.json();
      updateResponse('sec3-watchtower', 'success', data);
      console.log('Sec3 Watchtower response:', data);
    } catch (error) {
      updateResponse('sec3-watchtower', 'error', null, error instanceof Error ? error.message : 'Unknown error');
      console.error('Sec3 Watchtower error:', error);
    }
  };

  const callImmunefiVulnerabilities = async () => {
    updateResponse('immunefi-vulnerabilities', 'loading');
    try {
      const queryParams = new URLSearchParams({
        chain: immunefiParams.chain,
        severity: immunefiParams.severity
      }).toString();
      
      const response = await fetch(`/api/immunefi?${queryParams}`);
      const data = await response.json();
      updateResponse('immunefi-vulnerabilities', 'success', data);
      console.log('Immunefi vulnerabilities response:', data);
    } catch (error) {
      updateResponse('immunefi-vulnerabilities', 'error', null, error instanceof Error ? error.message : 'Unknown error');
      console.error('Immunefi vulnerabilities error:', error);
    }
  };

  const callSolanaCompass = async () => {
    updateResponse('solana-compass', 'loading');
    try {
      const queryParams = new URLSearchParams({
        status: compassParams.status,
        riskLevel: compassParams.riskLevel
      }).toString();
      
      const response = await fetch(`/api/compass?${queryParams}`);
      const data = await response.json();
      updateResponse('solana-compass', 'success', data);
      console.log('Solana Compass response:', data);
    } catch (error) {
      updateResponse('solana-compass', 'error', null, error instanceof Error ? error.message : 'Unknown error');
      console.error('Solana Compass error:', error);
    }
  };

  const callFlipsideDecoded = async () => {
    updateResponse('flipside-decoded', 'loading');
    try {
      const response = await fetch(`/api/flipside?program_id=${flipsideProgramId}`);
      const data = await response.json();
      updateResponse('flipside-decoded', 'success', data);
      console.log('Flipside decoded response:', data);
    } catch (error) {
      updateResponse('flipside-decoded', 'error', null, error instanceof Error ? error.message : 'Unknown error');
      console.error('Flipside decoded error:', error);
    }
  };

  const callSolanaFmParser = async () => {
    updateResponse('solanafm-parser', 'loading');
    try {
      const response = await fetch('/api/solanaFM', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ instruction: solanaFmInstruction })
      });
      const data = await response.json();
      updateResponse('solanafm-parser', 'success', data);
      console.log('SolanaFM parser response:', data);
    } catch (error) {
      updateResponse('solanafm-parser', 'error', null, error instanceof Error ? error.message : 'Unknown error');
      console.error('SolanaFM parser error:', error);
    }
  };

  const callAnchorLogParser = async () => {
    updateResponse('anchor-log-parser', 'loading');
    try {
      const response = await fetch('/api/anchor', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ logs: anchorLogs })
      });
      const data = await response.json();
      updateResponse('anchor-log-parser', 'success', data);
      console.log('Anchor log parser response:', data);
    } catch (error) {
      updateResponse('anchor-log-parser', 'error', null, error instanceof Error ? error.message : 'Unknown error');
      console.error('Anchor log parser error:', error);
    }
  };

  const addAnchorLog = () => {
    if (anchorLogInput.trim()) {
      setAnchorLogs([...anchorLogs, anchorLogInput.trim()]);
      setAnchorLogInput('');
    }
  };

  const removeAnchorLog = (index: number) => {
    setAnchorLogs(anchorLogs.filter((_, i) => i !== index));
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Security Monitoring API Testing Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Helius Webhook */}
        <div className="border p-4 rounded">
          <h2 className="text-xl font-semibold mb-3">Helius Webhook API</h2>
          <div className="space-y-2">
            <div>
              <label className="block text-sm mb-1">Webhook URL:</label>
              <input 
                type="text" 
                value={heliusWebhook.webhookURL} 
                onChange={(e) => setHeliusWebhook({...heliusWebhook, webhookURL: e.target.value})}
                className="w-full p-2 border rounded"
              />
            </div>
            <div>
              <label className="block text-sm mb-1">Account Address:</label>
              <input 
                type="text" 
                value={heliusWebhook.accountAddresses[0]} 
                onChange={(e) => setHeliusWebhook({
                  ...heliusWebhook, 
                  accountAddresses: [e.target.value]
                })}
                className="w-full p-2 border rounded"
                placeholder="Solana address"
              />
            </div>
            <div>
              <label className="block text-sm mb-1">Auth Header:</label>
              <input 
                type="text" 
                value={heliusWebhook.authHeader} 
                onChange={(e) => setHeliusWebhook({...heliusWebhook, authHeader: e.target.value})}
                className="w-full p-2 border rounded"
              />
            </div>
            <button 
              onClick={callHeliusWebhook}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              disabled={responses.find(r => r.endpoint === 'helius-webhook')?.status === 'loading'}
            >
              {responses.find(r => r.endpoint === 'helius-webhook')?.status === 'loading' ? 'Loading...' : 'Create Webhook'}
            </button>
          </div>
          <div className="mt-4">
            <div className="text-sm font-semibold">Response:</div>
            <pre className="bg-gray-100 p-2 rounded text-xs overflow-auto max-h-32">
              {JSON.stringify(responses.find(r => r.endpoint === 'helius-webhook')?.data || {}, null, 2)}
            </pre>
          </div>
        </div>

        {/* Blocknative Mempool */}
        <div className="border p-4 rounded">
          <h2 className="text-xl font-semibold mb-3">Blocknative Mempool</h2>
          <div className="space-y-2">
            <div>
              <label className="block text-sm mb-1">Malicious Pattern:</label>
              <input 
                type="text" 
                value={blocknativeFilter} 
                onChange={(e) => setBlocknativeFilter(e.target.value)}
                className="w-full p-2 border rounded"
              />
            </div>
            <button 
              onClick={callBlocknativeMempool}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              disabled={responses.find(r => r.endpoint === 'blocknative-mempool')?.status === 'loading'}
            >
              {responses.find(r => r.endpoint === 'blocknative-mempool')?.status === 'loading' ? 'Loading...' : 'Start Monitoring'}
            </button>
          </div>
          <div className="mt-4">
            <div className="text-sm font-semibold">Response:</div>
            <pre className="bg-gray-100 p-2 rounded text-xs overflow-auto max-h-32">
              {JSON.stringify(responses.find(r => r.endpoint === 'blocknative-mempool')?.data || {}, null, 2)}
            </pre>
          </div>
        </div>

        {/* Sec3 WatchTower */}
        <div className="border p-4 rounded">
          <h2 className="text-xl font-semibold mb-3">Sec3 WatchTower</h2>
          <div className="space-y-2">
            <div>
              <label className="block text-sm mb-1">Network:</label>
              <input 
                type="text" 
                value={sec3Alert.network} 
                onChange={(e) => setSec3Alert({...sec3Alert, network: e.target.value})}
                className="w-full p-2 border rounded"
              />
            </div>
            <div>
              <label className="block text-sm mb-1">Alert Type:</label>
              <input 
                type="text" 
                value={sec3Alert.alert_type} 
                onChange={(e) => setSec3Alert({...sec3Alert, alert_type: e.target.value})}
                className="w-full p-2 border rounded"
              />
            </div>
            <button 
              onClick={callSec3Watchtower}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              disabled={responses.find(r => r.endpoint === 'sec3-watchtower')?.status === 'loading'}
            >
              {responses.find(r => r.endpoint === 'sec3-watchtower')?.status === 'loading' ? 'Loading...' : 'Create Alert'}
            </button>
          </div>
          <div className="mt-4">
            <div className="text-sm font-semibold">Response:</div>
            <pre className="bg-gray-100 p-2 rounded text-xs overflow-auto max-h-32">
              {JSON.stringify(responses.find(r => r.endpoint === 'sec3-watchtower')?.data || {}, null, 2)}
            </pre>
          </div>
        </div>

        {/* Immunefi Vulnerabilities */}
        <div className="border p-4 rounded">
          <h2 className="text-xl font-semibold mb-3">Immunefi Vulnerabilities</h2>
          <div className="space-y-2">
            <div>
              <label className="block text-sm mb-1">Chain:</label>
              <input 
                type="text" 
                value={immunefiParams.chain} 
                onChange={(e) => setImmunefiParams({...immunefiParams, chain: e.target.value})}
                className="w-full p-2 border rounded"
              />
            </div>
            <div>
              <label className="block text-sm mb-1">Severity:</label>
              <select
                value={immunefiParams.severity}
                onChange={(e) => setImmunefiParams({...immunefiParams, severity: e.target.value})}
                className="w-full p-2 border rounded"
              >
                <option value="critical">Critical</option>
                <option value="high">High</option>
                <option value="medium">Medium</option>
                <option value="low">Low</option>
              </select>
            </div>
            <button 
              onClick={callImmunefiVulnerabilities}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              disabled={responses.find(r => r.endpoint === 'immunefi-vulnerabilities')?.status === 'loading'}
            >
              {responses.find(r => r.endpoint === 'immunefi-vulnerabilities')?.status === 'loading' ? 'Loading...' : 'Get Vulnerabilities'}
            </button>
          </div>
          <div className="mt-4">
            <div className="text-sm font-semibold">Response:</div>
            <pre className="bg-gray-100 p-2 rounded text-xs overflow-auto max-h-32">
              {JSON.stringify(responses.find(r => r.endpoint === 'immunefi-vulnerabilities')?.data || {}, null, 2)}
            </pre>
          </div>
        </div>

        {/* Solana Compass */}
        <div className="border p-4 rounded">
          <h2 className="text-xl font-semibold mb-3">Solana Compass Security Registry</h2>
          <div className="space-y-2">
            <div>
              <label className="block text-sm mb-1">Status:</label>
              <select
                value={compassParams.status}
                onChange={(e) => setCompassParams({...compassParams, status: e.target.value})}
                className="w-full p-2 border rounded"
              >
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
                <option value="archived">Archived</option>
              </select>
            </div>
            <div>
              <label className="block text-sm mb-1">Risk Level:</label>
              <select
                value={compassParams.riskLevel}
                onChange={(e) => setCompassParams({...compassParams, riskLevel: e.target.value})}
                className="w-full p-2 border rounded"
              >
                <option value="high">High</option>
                <option value="medium">Medium</option>
                <option value="low">Low</option>
              </select>
            </div>
            <button 
              onClick={callSolanaCompass}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              disabled={responses.find(r => r.endpoint === 'solana-compass')?.status === 'loading'}
            >
              {responses.find(r => r.endpoint === 'solana-compass')?.status === 'loading' ? 'Loading...' : 'Query Registry'}
            </button>
          </div>
          <div className="mt-4">
            <div className="text-sm font-semibold">Response:</div>
            <pre className="bg-gray-100 p-2 rounded text-xs overflow-auto max-h-32">
              {JSON.stringify(responses.find(r => r.endpoint === 'solana-compass')?.data || {}, null, 2)}
            </pre>
          </div>
        </div>

        {/* Flipside Decoded */}
        <div className="border p-4 rounded">
          <h2 className="text-xl font-semibold mb-3">Flipside Decoded Instructions</h2>
          <div className="space-y-2">
            <div>
              <label className="block text-sm mb-1">Program ID:</label>
              <input 
                type="text" 
                value={flipsideProgramId} 
                onChange={(e) => setFlipsideProgramId(e.target.value)}
                className="w-full p-2 border rounded"
                placeholder="Solana Program ID"
              />
            </div>
            <button 
              onClick={callFlipsideDecoded}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              disabled={responses.find(r => r.endpoint === 'flipside-decoded')?.status === 'loading'}
            >
              {responses.find(r => r.endpoint === 'flipside-decoded')?.status === 'loading' ? 'Loading...' : 'Query Instructions'}
            </button>
          </div>
          <div className="mt-4">
            <div className="text-sm font-semibold">Response:</div>
            <pre className="bg-gray-100 p-2 rounded text-xs overflow-auto max-h-32">
              {JSON.stringify(responses.find(r => r.endpoint === 'flipside-decoded')?.data || {}, null, 2)}
            </pre>
          </div>
        </div>

        {/* SolanaFM Parser */}
        <div className="border p-4 rounded">
          <h2 className="text-xl font-semibold mb-3">SolanaFM Instruction Parser</h2>
          <div className="space-y-2">
            <div>
              <label className="block text-sm mb-1">Instruction Data:</label>
              <textarea 
                value={solanaFmInstruction} 
                onChange={(e) => setSolanaFmInstruction(e.target.value)}
                className="w-full p-2 border rounded h-24"
                placeholder="Base64 instruction data"
              />
            </div>
            <button 
              onClick={callSolanaFmParser}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              disabled={responses.find(r => r.endpoint === 'solanafm-parser')?.status === 'loading'}
            >
              {responses.find(r => r.endpoint === 'solanafm-parser')?.status === 'loading' ? 'Loading...' : 'Parse Instruction'}
            </button>
          </div>
          <div className="mt-4">
            <div className="text-sm font-semibold">Response:</div>
            <pre className="bg-gray-100 p-2 rounded text-xs overflow-auto max-h-32">
              {JSON.stringify(responses.find(r => r.endpoint === 'solanafm-parser')?.data || {}, null, 2)}
            </pre>
          </div>
        </div>

        {/* Anchor Log Parser */}
        <div className="border p-4 rounded">
          <h2 className="text-xl font-semibold mb-3">Anchor Log Parser</h2>
          <div className="space-y-2">
            <div>
              <label className="block text-sm mb-1">Log Entry:</label>
              <div className="flex">
                <input 
                  type="text" 
                  value={anchorLogInput} 
                  onChange={(e) => setAnchorLogInput(e.target.value)}
                  className="flex-1 p-2 border rounded"
                  placeholder="Program log message"
                />
                <button 
                  onClick={addAnchorLog}
                  className="ml-2 bg-green-500 text-white px-3 py-2 rounded hover:bg-green-600"
                >
                  Add
                </button>
              </div>
            </div>
            
            <div>
              <label className="block text-sm mb-1">Current Logs:</label>
              <div className="bg-gray-100 p-2 rounded max-h-24 overflow-auto">
                {anchorLogs.length === 0 ? (
                  <div className="text-gray-500">No logs added</div>
                ) : (
                  <ul>
                    {anchorLogs.map((log, index) => (
                      <li key={index} className="flex justify-between items-center mb-1">
                        <span className="text-xs break-all">{log}</span>
                        <button 
                          onClick={() => removeAnchorLog(index)}
                          className="ml-2 text-red-500 text-xs hover:text-red-700"
                        >
                          ✕
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
            
            <button 
              onClick={callAnchorLogParser}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              disabled={responses.find(r => r.endpoint === 'anchor-log-parser')?.status === 'loading' || anchorLogs.length === 0}
            >
              {responses.find(r => r.endpoint === 'anchor-log-parser')?.status === 'loading' ? 'Loading...' : 'Parse Logs'}
            </button>
          </div>
          <div className="mt-4">
            <div className="text-sm font-semibold">Response:</div>
            <pre className="bg-gray-100 p-2 rounded text-xs overflow-auto max-h-32">
              {JSON.stringify(responses.find(r => r.endpoint === 'anchor-log-parser')?.data || {}, null, 2)}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SecurityDashboard;