import React from 'react';
import { Lock, Unlock } from 'lucide-react';

export const Card: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = "" }) => (
  <div className={`bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden ${className}`}>
    {children}
  </div>
);

interface ResultBadgeProps {
  granted: boolean;
  reason: string;
}

export const ResultBadge: React.FC<ResultBadgeProps> = ({ granted, reason }) => (
  <div className={`flex flex-col items-center justify-center p-6 rounded-2xl transition-all duration-500 border-2 ${granted ? 'bg-green-50 border-green-400' : 'bg-red-50 border-red-400'}`}>
    {granted ? (
      <div className="bg-green-100 p-3 rounded-full mb-3 animate-bounce">
        <Unlock size={40} className="text-green-600" />
      </div>
    ) : (
      <div className="bg-red-100 p-3 rounded-full mb-3 animate-pulse">
        <Lock size={40} className="text-red-600" />
      </div>
    )}
    <span className={`text-xl font-black text-center tracking-wide mb-2 ${granted ? 'text-green-700' : 'text-red-700'}`}>
      {granted ? 'ACCESS GRANTED' : 'ACCESS DENIED'}
    </span>
    <span className="text-sm text-gray-600 text-center font-medium leading-relaxed max-w-xs">
      {reason}
    </span>
  </div>
);

export const InfoBox: React.FC<{ title: string; color: string; children: React.ReactNode }> = ({ title, color, children }) => (
    <div className={`${color} p-5 rounded-xl text-sm border-l-4 shadow-sm mb-6`}>
    <strong className="block text-base mb-1">{title}</strong>
    <div className="opacity-90 leading-relaxed">
        {children}
    </div>
  </div>
)
