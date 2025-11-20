import React, { useState } from 'react';
import { User, FileText, ArrowRight } from 'lucide-react';
import { Card, ResultBadge, InfoBox } from './Shared';

const ABACDemo: React.FC = () => {
  const [userAttrs, setUserAttrs] = useState({ dept: 'engineering', clearance: 'level-2' });
  const [resourceAttrs, setResourceAttrs] = useState({ dept: 'engineering', classification: 'level-2' });

  // Policy Logic
  const isDeptMatch = userAttrs.dept === resourceAttrs.dept;
  const userClearanceLevel = parseInt(userAttrs.clearance.split('-')[1]);
  const resourceLevel = parseInt(resourceAttrs.classification.split('-')[1]);
  const isClearanceSufficient = userClearanceLevel >= resourceLevel;
  
  const hasAccess = isDeptMatch && isClearanceSufficient;

  return (
    <div className="space-y-8 animate-fadeIn">
      <InfoBox title="ABAC (Attribute-Based Access Control)" color="bg-indigo-50 text-indigo-900 border-indigo-400">
        Permissions are determined by policies that combine attributes of the User, the Resource, and the Environment. 
        <br/>
        <strong>Current Policy:</strong> Access allowed if <span className="font-mono bg-indigo-100 px-1 rounded">User.Dept == Resource.Dept</span> AND <span className="font-mono bg-indigo-100 px-1 rounded">User.Clearance &ge; Resource.Level</span>.
      </InfoBox>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* User Attributes */}
        <Card className="p-5 bg-indigo-50/30 border-indigo-100">
          <div className="flex items-center gap-3 mb-6 pb-4 border-b border-indigo-100">
            <div className="bg-indigo-100 p-2 rounded-lg">
                <User size={20} className="text-indigo-600" />
            </div>
            <h3 className="font-bold text-gray-700">User Attributes</h3>
          </div>
          <div className="space-y-5">
            <div>
              <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Department</label>
              <select 
                className="w-full mt-1 p-2.5 border border-gray-200 rounded-lg bg-white focus:ring-2 focus:ring-indigo-400 focus:outline-none"
                value={userAttrs.dept}
                onChange={(e) => setUserAttrs({...userAttrs, dept: e.target.value})}
              >
                <option value="engineering">Engineering</option>
                <option value="sales">Sales</option>
                <option value="hr">HR</option>
              </select>
            </div>
            <div>
              <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Clearance Level</label>
              <select 
                className="w-full mt-1 p-2.5 border border-gray-200 rounded-lg bg-white focus:ring-2 focus:ring-indigo-400 focus:outline-none"
                value={userAttrs.clearance}
                onChange={(e) => setUserAttrs({...userAttrs, clearance: e.target.value})}
              >
                <option value="level-1">Level 1 (Low)</option>
                <option value="level-2">Level 2 (Medium)</option>
                <option value="level-3">Level 3 (High)</option>
              </select>
            </div>
          </div>
        </Card>

        {/* Policy Engine Visualization */}
        <div className="flex flex-col justify-center space-y-4">
           <div className="bg-gray-900 text-gray-300 p-5 font-mono text-xs shadow-xl rounded-xl border border-gray-700">
             <div className="text-gray-500 mb-3 flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                Policy Evaluation
             </div>
             <div className={`flex justify-between items-center p-2 rounded ${isDeptMatch ? "bg-green-900/20" : "bg-red-900/20"}`}>
               <span>dept match?</span>
               <span className={isDeptMatch ? "text-green-400 font-bold" : "text-red-400 font-bold"}>{isDeptMatch ? "PASS" : "FAIL"}</span>
             </div>
             <div className="text-center text-gray-600 text-[10px] py-1">AND</div>
             <div className={`flex justify-between items-center p-2 rounded ${isClearanceSufficient ? "bg-green-900/20" : "bg-red-900/20"}`}>
               <span>clearance &ge; level?</span>
               <span className={isClearanceSufficient ? "text-green-400 font-bold" : "text-red-400 font-bold"}>{isClearanceSufficient ? "PASS" : "FAIL"}</span>
             </div>
           </div>
           <div className="flex justify-center">
             <ArrowRight className="text-gray-300 rotate-90 md:rotate-90" />
           </div>
           <ResultBadge 
            granted={hasAccess} 
            reason={hasAccess ? "Policy satisfied: Attributes align with requirements." : "Policy violation: Attributes do not match requirements."}
          />
        </div>

        {/* Resource Attributes */}
        <Card className="p-5 bg-orange-50/30 border-orange-100">
          <div className="flex items-center gap-3 mb-6 pb-4 border-b border-orange-100">
             <div className="bg-orange-100 p-2 rounded-lg">
                <FileText size={20} className="text-orange-600" />
            </div>
            <h3 className="font-bold text-gray-700">Resource Attributes</h3>
          </div>
          <div className="space-y-5">
            <div>
              <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Owner Department</label>
              <select 
                className="w-full mt-1 p-2.5 border border-gray-200 rounded-lg bg-white focus:ring-2 focus:ring-orange-400 focus:outline-none"
                value={resourceAttrs.dept}
                onChange={(e) => setResourceAttrs({...resourceAttrs, dept: e.target.value})}
              >
                <option value="engineering">Engineering</option>
                <option value="sales">Sales</option>
                <option value="hr">HR</option>
              </select>
            </div>
            <div>
              <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Required Level</label>
              <select 
                className="w-full mt-1 p-2.5 border border-gray-200 rounded-lg bg-white focus:ring-2 focus:ring-orange-400 focus:outline-none"
                value={resourceAttrs.classification}
                onChange={(e) => setResourceAttrs({...resourceAttrs, classification: e.target.value})}
              >
                <option value="level-1">Level 1 (Low)</option>
                <option value="level-2">Level 2 (Medium)</option>
                <option value="level-3">Level 3 (High)</option>
              </select>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default ABACDemo;