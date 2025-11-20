import React, { useState } from 'react';
import { User, Users, Share2, FileText } from 'lucide-react';
import { ResultBadge, InfoBox } from './Shared';

const ReBACDemo: React.FC = () => {
  // Graph state: connections between nodes
  const [isMember, setIsMember] = useState(true);
  const [isOwner, setIsOwner] = useState(true);
  const [isFileInFolder, setIsFileInFolder] = useState(true);

  // Path: User -> Group -> Folder -> File
  // The user has access if they can trace a path through the relationship graph
  const hasAccess = isMember && isOwner && isFileInFolder;

  return (
    <div className="space-y-8 animate-fadeIn">
      <InfoBox title="ReBAC (Relationship-Based Access Control)" color="bg-teal-50 text-teal-900 border-teal-400">
        Access is derived from the relationships between subjects and objects in a graph (e.g., Google Zanzibar).
        <br/>
        <span className="text-xs mt-1 block">
            Try clicking the "Connect/Disconnect" buttons to break the chain of relationships.
        </span>
      </InfoBox>

      <div className="relative min-h-[320px] bg-slate-50 border border-slate-200 rounded-2xl p-8 overflow-hidden flex flex-col md:flex-row items-center justify-between gap-4 shadow-inner">
        
        {/* Background connections effect */}
        <div className="absolute inset-0 pointer-events-none opacity-10" 
             style={{backgroundImage: 'radial-gradient(#0d9488 1px, transparent 1px)', backgroundSize: '20px 20px'}}></div>

        {/* Node: User */}
        <div className="z-10 flex flex-col items-center gap-3 w-32 group">
          <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center border-4 border-blue-200 shadow-lg group-hover:scale-110 transition-transform duration-300">
            <User size={36} className="text-blue-600" />
          </div>
          <span className="font-bold text-sm text-slate-700">User</span>
        </div>

        {/* Edge 1 */}
        <div className="flex flex-col items-center z-10 relative">
          <button 
            onClick={() => setIsMember(!isMember)}
            className={`px-3 py-1.5 rounded-full text-[10px] uppercase tracking-wider font-bold transition-all duration-300 shadow-sm hover:scale-105 active:scale-95 z-20 ${isMember ? 'bg-teal-100 text-teal-700 ring-1 ring-teal-300 hover:bg-red-100 hover:text-red-600' : 'bg-gray-200 text-gray-500 hover:bg-green-100 hover:text-green-600'}`}
          >
            {isMember ? 'member_of' : 'disconnect'}
          </button>
          <div className={`h-1.5 w-16 md:w-24 transition-colors my-3 rounded-full ${isMember ? 'bg-teal-400 shadow-[0_0_10px_rgba(45,212,191,0.6)]' : 'bg-gray-300 border-t-2 border-dashed border-gray-400 bg-transparent'}`} />
        </div>

        {/* Node: Group */}
        <div className="z-10 flex flex-col items-center gap-3 w-32 group">
          <div className={`w-20 h-20 rounded-full flex items-center justify-center border-4 shadow-lg transition-all duration-500 ${isMember ? 'bg-white border-teal-200 scale-100' : 'bg-gray-100 border-gray-300 opacity-60 grayscale'}`}>
            <Users size={36} className={isMember ? "text-teal-600" : "text-gray-400"} />
          </div>
          <span className={`font-bold text-sm transition-colors ${isMember ? 'text-slate-700' : 'text-gray-400'}`}>Dev Team</span>
        </div>

        {/* Edge 2 */}
        <div className="flex flex-col items-center z-10 relative">
          <button 
            onClick={() => setIsOwner(!isOwner)}
             className={`px-3 py-1.5 rounded-full text-[10px] uppercase tracking-wider font-bold transition-all duration-300 shadow-sm hover:scale-105 active:scale-95 z-20 ${isOwner ? 'bg-teal-100 text-teal-700 ring-1 ring-teal-300 hover:bg-red-100 hover:text-red-600' : 'bg-gray-200 text-gray-500 hover:bg-green-100 hover:text-green-600'}`}
          >
            {isOwner ? 'owner_of' : 'disconnect'}
          </button>
          <div className={`h-1.5 w-16 md:w-24 transition-colors my-3 rounded-full ${isOwner ? 'bg-teal-400 shadow-[0_0_10px_rgba(45,212,191,0.6)]' : 'bg-gray-300 border-t-2 border-dashed border-gray-400 bg-transparent'}`} />
        </div>

        {/* Node: Folder */}
        <div className="z-10 flex flex-col items-center gap-3 w-32 group">
          <div className={`w-20 h-20 rounded-2xl flex items-center justify-center border-4 shadow-lg transition-all duration-500 ${(isMember && isOwner) ? 'bg-white border-teal-200 scale-100' : 'bg-gray-100 border-gray-300 opacity-60 grayscale'}`}>
            <Share2 size={36} className={(isMember && isOwner) ? "text-teal-600" : "text-gray-400"} />
          </div>
          <span className={`font-bold text-sm transition-colors ${(isMember && isOwner) ? 'text-slate-700' : 'text-gray-400'}`}>Projects</span>
        </div>

        {/* Edge 3 */}
        <div className="flex flex-col items-center z-10 relative">
          <button 
            onClick={() => setIsFileInFolder(!isFileInFolder)}
             className={`px-3 py-1.5 rounded-full text-[10px] uppercase tracking-wider font-bold transition-all duration-300 shadow-sm hover:scale-105 active:scale-95 z-20 ${isFileInFolder ? 'bg-teal-100 text-teal-700 ring-1 ring-teal-300 hover:bg-red-100 hover:text-red-600' : 'bg-gray-200 text-gray-500 hover:bg-green-100 hover:text-green-600'}`}
          >
            {isFileInFolder ? 'contains' : 'disconnect'}
          </button>
          <div className={`h-1.5 w-16 md:w-24 transition-colors my-3 rounded-full ${isFileInFolder ? 'bg-teal-400 shadow-[0_0_10px_rgba(45,212,191,0.6)]' : 'bg-gray-300 border-t-2 border-dashed border-gray-400 bg-transparent'}`} />
        </div>

        {/* Node: File */}
        <div className="z-10 flex flex-col items-center gap-3 w-32 group">
          <div className={`w-20 h-20 rounded-xl flex items-center justify-center border-4 shadow-lg transition-all duration-500 ${hasAccess ? 'bg-green-50 border-green-400 scale-110 shadow-green-200' : 'bg-gray-100 border-gray-300 opacity-60 grayscale'}`}>
            <FileText size={36} className={hasAccess ? "text-green-600" : "text-gray-400"} />
          </div>
          <span className={`font-bold text-sm transition-colors ${hasAccess ? 'text-green-700' : 'text-gray-400'}`}>Secret.txt</span>
        </div>

      </div>

      <div className="flex justify-center">
         <ResultBadge 
            granted={hasAccess} 
            reason={hasAccess ? "A valid path exists from User to File in the relationship graph." : "The relationship chain is broken. No path found from User to File."}
          />
      </div>
    </div>
  );
};

export default ReBACDemo;