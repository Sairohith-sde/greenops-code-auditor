'use client';

import React, { useState } from 'react';
import { GreenOpsAudit } from '@/lib/api';
import { Leaf, AlertTriangle, ArrowRight, Check, Copy, Activity, ShieldCheck, Zap } from 'lucide-react';

interface EcoReportPanelProps {
  auditResult: GreenOpsAudit | null;
  isLoading: boolean;
  error: string | null;
}

export const EcoReportPanel: React.FC<EcoReportPanelProps> = ({ auditResult, isLoading, error }) => {
  const [copied, setCopied] = useState(false);

  const handleCopyCode = () => {
    if (auditResult?.optimized_code) {
      navigator.clipboard.writeText(auditResult.optimized_code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  // Helper for Carbon Penalty Color & Status
  const getCarbonSeverity = (score: number) => {
    if (score >= 70) {
      return {
        label: 'CRITICAL OVERHEAD',
        color: 'text-red-400',
        bg: 'bg-red-950/60',
        border: 'border-red-800/80',
        barColor: 'bg-red-500',
        glow: 'glow-red',
      };
    }
    if (score >= 35) {
      return {
        label: 'MODERATE INEFFICIENCY',
        color: 'text-amber-400',
        bg: 'bg-amber-950/60',
        border: 'border-amber-800/80',
        barColor: 'bg-amber-500',
        glow: '',
      };
    }
    return {
      label: 'OPTIMAL GREEN',
      color: 'text-emerald-400',
      bg: 'bg-emerald-950/60',
      border: 'border-emerald-800/80',
      barColor: 'bg-emerald-500',
      glow: 'glow-emerald',
    };
  };

  if (isLoading) {
    return (
      <div className="flex flex-col h-full bg-dark-800 border border-gray-800 rounded-xl p-8 items-center justify-center space-y-6 animate-pulse">
        <div className="relative flex items-center justify-center">
          <div className="w-20 h-20 rounded-full border-4 border-emerald-500/20 border-t-emerald-400 animate-spin" />
          <Leaf className="w-8 h-8 text-emerald-400 absolute" />
        </div>
        <div className="text-center space-y-2">
          <h3 className="text-lg font-semibold text-gray-200">Executing Algorithmic Carbon Audit</h3>
          <p className="text-xs text-gray-400 max-w-sm">
            Evaluating time complexity matrices, calculating CPU cycle waste, and synthesizing optimized code...
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col h-full bg-dark-800 border border-red-900/50 rounded-xl p-8 items-center justify-center space-y-4">
        <AlertTriangle className="w-12 h-12 text-red-500" />
        <h3 className="text-lg font-semibold text-red-400">Audit Processing Error</h3>
        <p className="text-sm text-gray-400 text-center max-w-md">{error}</p>
      </div>
    );
  }

  if (!auditResult) {
    return (
      <div className="flex flex-col h-full bg-dark-800 border border-gray-800 rounded-xl p-8 items-center justify-center text-center space-y-5">
        <div className="w-16 h-16 rounded-2xl bg-dark-900 border border-gray-800 flex items-center justify-center shadow-inner">
          <Activity className="w-8 h-8 text-gray-600" />
        </div>
        <div className="space-y-1">
          <h3 className="text-base font-semibold text-gray-300">Awaiting Audit Request</h3>
          <p className="text-xs text-gray-500 max-w-xs">
            Paste code in the left editor and click &quot;Run Green Audit&quot; to inspect computational efficiency and carbon penalty score.
          </p>
        </div>
      </div>
    );
  }

  const severity = getCarbonSeverity(auditResult.carbon_penalty_score);

  return (
    <div className="flex flex-col h-full bg-dark-800 border border-gray-800 rounded-xl shadow-2xl overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 bg-dark-900/80 border-b border-gray-800">
        <div className="flex items-center space-x-2">
          <Leaf className="w-5 h-5 text-emerald-400" />
          <span className="font-semibold text-sm text-gray-200 tracking-wide">Eco-Report Diagnostic</span>
        </div>
        <span className="text-xs font-mono px-2.5 py-1 rounded bg-emerald-950 text-emerald-400 border border-emerald-800/60">
          STRICT AUDIT COMPLETED
        </span>
      </div>

      <div className="p-6 space-y-6 overflow-y-auto max-h-[640px]">
        {/* 1. Big O Comparison Widget */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Original Complexity */}
          <div className="p-4 rounded-xl bg-red-950/30 border border-red-900/50 flex flex-col justify-between space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-red-400 uppercase tracking-wider">Original Complexity</span>
              <AlertTriangle className="w-4 h-4 text-red-400" />
            </div>
            <div className="text-2xl font-mono font-bold text-red-400">{auditResult.original_complexity}</div>
            <span className="text-[11px] text-red-400/80">High CPU Cycle Load</span>
          </div>

          {/* Optimized Complexity */}
          <div className="p-4 rounded-xl bg-emerald-950/30 border border-emerald-900/50 flex flex-col justify-between space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-emerald-400 uppercase tracking-wider">Optimized Complexity</span>
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
            </div>
            <div className="text-2xl font-mono font-bold text-emerald-400 flex items-center space-x-2">
              <span>{auditResult.optimized_complexity}</span>
              <Zap className="w-5 h-5 text-emerald-400 fill-emerald-400" />
            </div>
            <span className="text-[11px] text-emerald-400/80">Reduced Compute Footprint</span>
          </div>
        </div>

        {/* 2. Carbon Penalty Score Gauge */}
        <div className={`p-5 rounded-xl ${severity.bg} border ${severity.border} space-y-3`}>
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <span className="text-xs font-semibold text-gray-300 uppercase tracking-wider">Carbon Penalty Score</span>
              <div className={`text-xs font-mono font-bold ${severity.color}`}>{severity.label}</div>
            </div>
            <div className={`text-3xl font-mono font-extrabold ${severity.color}`}>
              {auditResult.carbon_penalty_score}<span className="text-sm font-normal text-gray-400">/100</span>
            </div>
          </div>

          {/* Score Bar */}
          <div className="w-full bg-dark-900 rounded-full h-3 p-0.5 overflow-hidden border border-gray-800">
            <div
              className={`h-full rounded-full transition-all duration-700 ${severity.barColor}`}
              style={{ width: `${Math.min(auditResult.carbon_penalty_score, 100)}%` }}
            />
          </div>
          <p className="text-[11px] text-gray-400 leading-tight">
            Heuristic penalization based on loop depth, redundant allocations, and unnecessary memory churn causing thermal output.
          </p>
        </div>

        {/* 3. Architectural Analysis Explanation */}
        <div className="p-4 rounded-xl bg-dark-900/70 border border-gray-800 space-y-2">
          <h4 className="text-xs font-semibold text-gray-300 uppercase tracking-wider flex items-center space-x-1.5">
            <Activity className="w-4 h-4 text-emerald-400" />
            <span>Architectural Flaw Analysis</span>
          </h4>
          <p className="text-xs text-gray-300 leading-relaxed font-sans">{auditResult.explanation}</p>
        </div>

        {/* 4. Optimized Code Block */}
        <div className="rounded-xl bg-dark-900/90 border border-emerald-900/40 overflow-hidden space-y-0">
          <div className="flex items-center justify-between px-4 py-2 bg-dark-900 border-b border-gray-800">
            <span className="text-xs font-mono font-semibold text-emerald-400 flex items-center space-x-1.5">
              <Check className="w-3.5 h-3.5" />
              <span>Optimized Refactored Code</span>
            </span>
            <button
              onClick={handleCopyCode}
              className="flex items-center space-x-1 text-xs text-gray-400 hover:text-emerald-400 transition-colors px-2 py-1 rounded bg-gray-800/50 hover:bg-gray-800"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-emerald-400">Copied</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy Code</span>
                </>
              )}
            </button>
          </div>
          <pre className="p-4 text-xs font-mono text-emerald-300 overflow-x-auto leading-relaxed bg-dark-950/90">
            <code>{auditResult.optimized_code}</code>
          </pre>
        </div>
      </div>
    </div>
  );
};
