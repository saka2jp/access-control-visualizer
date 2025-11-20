import React, { useState } from 'react';
import { Users, Tag, Share2, Shield, LucideIcon } from 'lucide-react';
import RBACDemo from './components/RBACDemo';
import ABACDemo from './components/ABACDemo';
import ReBACDemo from './components/ReBACDemo';
import PBACDemo from './components/PBACDemo';

type TabId = 'rbac' | 'abac' | 'rebac' | 'pbac';

interface TabConfig {
  id: TabId;
  label: string;
  icon: LucideIcon;
  color: string;
  activeColor: string;
}

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabId>('rbac');

  const tabs: TabConfig[] = [
    { id: 'rbac', label: 'RBAC', icon: Users, color: 'hover:bg-blue-50 text-blue-500', activeColor: 'bg-blue-500 text-white shadow-blue-200' },
    { id: 'abac', label: 'ABAC', icon: Tag, color: 'hover:bg-indigo-50 text-indigo-500', activeColor: 'bg-indigo-500 text-white shadow-indigo-200' },
    { id: 'rebac', label: 'ReBAC', icon: Share2, color: 'hover:bg-teal-50 text-teal-500', activeColor: 'bg-teal-500 text-white shadow-teal-200' },
    { id: 'pbac', label: 'PBAC', icon: Shield, color: 'hover:bg-purple-50 text-purple-500', activeColor: 'bg-purple-500 text-white shadow-purple-200' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8 font-sans text-gray-800">
      <div className="max-w-5xl mx-auto">
        <header className="mb-8 text-center">
          <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-3 tracking-tight">
            Access Control Visualizer
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto text-sm md:text-base">
            Interactive playground to understand the differences between RBAC, ABAC, ReBAC, and PBAC security models.
          </p>
        </header>

        {/* Navigation Tabs */}
        <nav className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8 bg-white p-2 rounded-2xl shadow-sm border border-gray-100">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex flex-col sm:flex-row items-center justify-center gap-2 py-3 px-4 rounded-xl transition-all duration-300 ease-in-out ${
                  isActive 
                    ? `${tab.activeColor} shadow-md transform scale-[1.02]` 
                    : `text-gray-500 ${tab.color} bg-transparent`
                }`}
              >
                <Icon size={20} strokeWidth={isActive ? 2.5 : 2} />
                <span className={`font-bold text-xs sm:text-sm ${isActive ? 'opacity-100' : 'opacity-80'}`}>
                  {tab.label}
                </span>
              </button>
            );
          })}
        </nav>

        {/* Content Area */}
        <main className="bg-white p-6 md:p-8 rounded-3xl shadow-xl shadow-gray-200/50 border border-white min-h-[600px] transition-all duration-500">
          {activeTab === 'rbac' && <RBACDemo />}
          {activeTab === 'abac' && <ABACDemo />}
          {activeTab === 'rebac' && <ReBACDemo />}
          {activeTab === 'pbac' && <PBACDemo />}
        </main>
        
        <footer className="mt-12 text-center text-xs text-gray-400 font-medium">
          <p>Designed for educational purposes • Access Control Models Demo</p>
        </footer>
      </div>
    </div>
  );
};

export default App;