'use client';

import React, { useState, useEffect } from 'react';
import { EditorPanel } from '@/components/EditorPanel';
import { EcoReportPanel } from '@/components/EcoReportPanel';
import { auditCode, checkHealth, GreenOpsAudit } from '@/lib/api';
import { Leaf, Cpu, ShieldAlert, Sparkles, CheckCircle2, Server } from 'lucide-react';

export default function Home() {
  const [auditResult, setAuditResult] = useState<GreenOpsAudit | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [apiStatus, setApiStatus] = useState<'online' | 'offline' | 'checking'>('checking');

  // Check Backend API Health on Load
  useEffect(() => {
    const verifyHealth = async () => {
      try {
        await checkHealth();
        setApiStatus('online');
      } catch {
        setApiStatus('offline');
      }
    };
    verifyHealth();
  }, []);

  const handleRunAudit = async (code: string, language: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const result = await auditCode({ code, language });
      setAuditResult(result);
    } catch (err: unknown) {
      if (err && typeof err === 'object' && 'response' in err) {
        const axiosErr = err as { response?: { data?: { detail?: string } } };
        setError(axiosErr.response?.data?.detail || 'Failed to analyze code snippet. Ensure backend is running.');
      } else if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unexpected error occurred during code analysis.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-dark-900 text-gray-100 font-sans selection:bg-emerald-500 selection:text-dark-900">
      {/* Navbar / Top Console Bar */}
      <header className="border-b border-gray-800 bg-dark-900/90 backdrop-blur-md sticky top-0 z-50 px-6 py-4 flex items-center justify-between shadow-xl">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center glow-emerald">
            <Leaf className="w-6 h-6 text-emerald-400" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h1 className="text-lg font-bold tracking-tight text-gray-100 font-mono">GreenOps Code Auditor</h1>
              <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded-full bg-emerald-950 text-emerald-400 border border-emerald-800">
                v1.0 Hackathon
              </span>
            </div>
            <p className="text-xs text-gray-400">Algorithmic Efficiency & Carbon Penalty Analyzer</p>
          </div>
        </div>

        {/* Backend Heartbeat Status */}
        <div className="flex items-center space-x-4">
          <div className="hidden sm:flex items-center space-x-2 text-xs font-mono px-3 py-1.5 rounded-lg bg-dark-800 border border-gray-800">
            <Server className="w-3.5 h-3.5 text-gray-400" />
            <span className="text-gray-400">FastAPI Backend:</span>
            {apiStatus === 'online' && (
              <span className="text-emerald-400 flex items-center space-x-1">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                <span>ONLINE</span>
              </span>
            )}
            {apiStatus === 'offline' && (
              <span className="text-red-400 flex items-center space-x-1">
                <span className="w-2 h-2 rounded-full bg-red-500" />
                <span>OFFLINE (Run server)</span>
              </span>
            )}
            {apiStatus === 'checking' && <span className="text-amber-400">CONNECTING...</span>}
          </div>

          <div className="flex items-center space-x-1 text-xs text-emerald-400 bg-emerald-950/40 px-3 py-1.5 rounded-lg border border-emerald-800/40">
            <Sparkles className="w-3.5 h-3.5" />
            <span className="font-mono text-[11px]">Gemini 2.5 Flash</span>
          </div>
        </div>
      </header>

      {/* Main Workspace (Split Pane Layout) */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Column: Editor Panel */}
        <section className="h-full">
          <EditorPanel onRunAudit={handleRunAudit} isLoading={isLoading} />
        </section>

        {/* Right Column: Eco-Report Diagnostic Panel */}
        <section className="h-full">
          <EcoReportPanel auditResult={auditResult} isLoading={isLoading} error={error} />
        </section>
      </main>

      {/* Footer Operator Info */}
      <footer className="border-t border-gray-800/80 bg-dark-950 py-3 px-6 text-center text-xs text-gray-500 font-mono flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Cpu className="w-3.5 h-3.5 text-emerald-400" />
          <span>GreenOps Pure Software System — Zero Hardware Footprint</span>
        </div>
        <div>FastAPI + Google GenAI SDK (Gemini 2.5 Flash) + Next.js App Router</div>
      </footer>
    </div>
  );
}
