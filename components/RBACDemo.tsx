import React, { useState } from 'react';
import { User, ArrowRight } from 'lucide-react';
import { Card, ResultBadge, InfoBox } from './Shared';

type RoleType = 'admin' | 'editor' | 'viewer' | 'guest';

interface RoleDefinition {
  name: string;
  permissions: string[];
  color: string;
}

const RBACDemo: React.FC = () => {
  const [role, setRole] = useState<RoleType>('viewer');
  
  const roles: Record<RoleType, RoleDefinition> = {
    admin: { name: 'Admin', permissions: ['read', 'write', 'delete'], color: 'text-purple-600' },
    editor: { name: 'Editor', permissions: ['read', 'write'], color: 'text-blue-600' },
    viewer: { name: 'Viewer', permissions: ['read'], color: 'text-gray-600' },
    guest: { name: 'Guest', permissions: [], color: 'text-gray-400' }
  };

  const requiredPermission = 'write';
  const hasAccess = roles[role].permissions.includes(requiredPermission);

  return (
    <div className="space-y-8 animate-fadeIn">
      <InfoBox title="RBAC (Role-Based Access Control)" color="bg-blue-50 text-blue-900 border-blue-400">
        Permissions are assigned to roles, not users directly. Users acquire permissions by being assigned a role. 
        In this demo, we are trying to access a file that requires the <strong>'write'</strong> permission.
      </InfoBox>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
        {/* User Side */}
        <Card className="p-8 flex flex-col items-center space-y-6 bg-gradient-to-b from-white to-gray-50">
          <div className="bg-white p-4 rounded-full shadow-md ring-4 ring-gray-100">
            <User size={40} className="text-gray-700" />
          </div>
          <div className="w-full">
            <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">Select User Role</label>
            <select 
              value={role} 
              onChange={(e) => setRole(e.target.value as RoleType)}
              className="w-full p-3 border border-gray-200 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none text-gray-700 bg-white font-medium"
            >
              {Object.keys(roles).map(r => (
                <option key={r} value={r}>{roles[r as RoleType].name}</option>
              ))}
            </select>
          </div>
          <div className="text-sm text-center w-full">
            <p className="font-bold text-gray-500 mb-2 text-xs uppercase">Assigned Permissions</p>
            <div className="flex flex-wrap gap-2 justify-center min-h-[32px]">
              {roles[role].permissions.length > 0 ? (
                roles[role].permissions.map(p => (
                  <span 
                    key={p} 
                    className={`px-3 py-1 rounded-full text-xs font-mono border transition-all duration-300 ${
                      p === requiredPermission 
                        ? 'bg-green-100 text-green-800 border-green-300 font-bold shadow-sm scale-105' 
                        : 'bg-gray-100 text-gray-600 border-gray-200'
                    }`}
                  >
                    {p}
                  </span>
                ))
              ) : <span className="text-gray-400 italic">No permissions</span>}
            </div>
          </div>
        </Card>

        {/* Logic Flow */}
        <div className="flex flex-col items-center justify-center space-y-3 md:space-y-0 md:space-x-4 md:flex-row">
           <div className="hidden md:block w-full h-[2px] bg-gray-200 relative">
             <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gray-800 text-white text-[10px] font-mono px-2 py-1 rounded">
                CHECK: has('{requiredPermission}')
             </div>
           </div>
           <ArrowRight size={32} className="text-gray-300 md:hidden transform rotate-90" />
        </div>

        {/* Result Side */}
        <ResultBadge 
          granted={hasAccess} 
          reason={`The role "${roles[role].name}" ${hasAccess ? 'includes' : 'does not include'} the required '${requiredPermission}' permission.`}
        />
      </div>
    </div>
  );
};

export default RBACDemo;