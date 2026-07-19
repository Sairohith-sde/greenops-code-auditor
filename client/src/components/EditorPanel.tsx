'use client';

import React, { useState } from 'react';
import { Play, RotateCcw, Code2, Loader2, Sparkles } from 'lucide-react';

interface EditorPanelProps {
  onRunAudit: (code: string, language: string) => void;
  isLoading: boolean;
}

const SAMPLE_CODES: Record<string, string> = {
  Python: `def find_duplicates(arr):
    # Inefficient O(N^2) quadratic search
    duplicates = []
    for i in range(len(arr)):
        for j in range(len(arr)):
            if i != j and arr[i] == arr[j]:
                if arr[i] not in duplicates:
                    duplicates.append(arr[i])
    return duplicates

# Test payload
data = [1, 4, 5, 2, 4, 8, 9, 1, 3]
print(find_duplicates(data))`,

  Java: `public class DuplicateFinder {
    public static int[] findDuplicates(int[] arr) {
        // Inefficient O(N^2) nested iteration
        int[] temp = new int[arr.length];
        int count = 0;
        for (int i = 0; i < arr.length; i++) {
            for (int j = 0; j < arr.length; j++) {
                if (i != j && arr[i] == arr[j]) {
                    temp[count++] = arr[i];
                }
            }
        }
        return temp;
    }
}`,

  C: `#include <stdio.h>

void bubbleSort(int arr[], int n) {
    // Inefficient O(N^2) sorting creating excessive CPU cycle load
    for (int i = 0; i < n - 1; i++) {
        for (int j = 0; j < n - i - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                int temp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = temp;
            }
        }
    }
}`,

  'C++': `#include <vector>
#include <iostream>

std::vector<int> findDuplicates(const std::vector<int>& vec) {
    // Inefficient O(N^2) brute force comparison
    std::vector<int> dupes;
    for (size_t i = 0; i < vec.size(); ++i) {
        for (size_t j = 0; j < vec.size(); ++j) {
            if (i != j && vec[i] == vec[j]) {
                dupes.push_back(vec[i]);
            }
        }
    }
    return dupes;
}`,
};

export const EditorPanel: React.FC<EditorPanelProps> = ({ onRunAudit, isLoading }) => {
  const [language, setLanguage] = useState<string>('Python');
  const [code, setCode] = useState<string>(SAMPLE_CODES['Python']);

  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedLang = e.target.value;
    setLanguage(selectedLang);
    setCode(SAMPLE_CODES[selectedLang] || '');
  };

  const handleLoadSample = () => {
    setCode(SAMPLE_CODES[language] || '');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!code.trim() || isLoading) return;
    onRunAudit(code, language);
  };

  return (
    <div className="flex flex-col h-full bg-dark-800 border border-gray-800 rounded-xl shadow-2xl overflow-hidden">
      {/* Editor Header Bar */}
      <div className="flex items-center justify-between px-4 py-3 bg-dark-900/80 border-b border-gray-800">
        <div className="flex items-center space-x-2">
          <Code2 className="w-5 h-5 text-emerald-400" />
          <span className="font-semibold text-sm text-gray-200 tracking-wide">Source Editor</span>
        </div>

        <div className="flex items-center space-x-3">
          <button
            type="button"
            onClick={handleLoadSample}
            disabled={isLoading}
            className="flex items-center space-x-1.5 text-xs text-gray-400 hover:text-emerald-400 transition-colors px-2.5 py-1.5 rounded-lg bg-gray-800/60 hover:bg-gray-800 border border-gray-700/50"
            title="Reset to inefficient sample code"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Load Sample</span>
          </button>

          <div className="relative">
            <select
              value={language}
              onChange={handleLanguageChange}
              disabled={isLoading}
              className="bg-dark-900 text-emerald-400 font-mono text-xs font-semibold px-3 py-1.5 rounded-lg border border-emerald-500/30 focus:outline-none focus:border-emerald-400 cursor-pointer shadow-inner"
            >
              <option value="Python">Python</option>
              <option value="Java">Java</option>
              <option value="C">C</option>
              <option value="C++">C++</option>
            </select>
          </div>
        </div>
      </div>

      {/* Main Code Editing Input */}
      <div className="relative flex-1 p-4 bg-dark-900/40">
        <textarea
          value={code}
          onChange={(e) => setCode(e.target.value)}
          placeholder={`Paste your raw ${language} code snippet here...`}
          disabled={isLoading}
          spellCheck={false}
          className="w-full h-[420px] bg-dark-900/90 text-gray-100 font-mono text-sm leading-relaxed p-4 rounded-lg border border-gray-800 focus:outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/20 resize-none shadow-inner"
        />
        <div className="absolute bottom-6 right-6 text-xs font-mono text-gray-500 bg-dark-800/80 px-2 py-1 rounded border border-gray-800">
          {code.split('\n').length} lines
        </div>
      </div>

      {/* Action Footer */}
      <div className="p-4 bg-dark-900/90 border-t border-gray-800 flex items-center justify-between">
        <div className="flex items-center space-x-2 text-xs text-gray-400">
          <Sparkles className="w-4 h-4 text-emerald-400 animate-pulse" />
          <span>Gemini 2.5 Flash Carbon Auditor</span>
        </div>

        <button
          onClick={handleSubmit}
          disabled={isLoading || !code.trim()}
          className={`flex items-center space-x-2 px-6 py-2.5 rounded-lg font-semibold text-sm transition-all duration-200 shadow-lg ${
            isLoading || !code.trim()
              ? 'bg-gray-800 text-gray-500 border border-gray-700 cursor-not-allowed'
              : 'bg-emerald-500 hover:bg-emerald-400 text-dark-900 border border-emerald-400 glow-emerald active:scale-95'
          }`}
        >
          {isLoading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin text-dark-900" />
              <span>Analyzing computational overhead...</span>
            </>
          ) : (
            <>
              <Play className="w-4 h-4 fill-dark-900 text-dark-900" />
              <span>Run Green Audit</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};
