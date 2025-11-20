import React, { useState } from 'react';
import { Shield, Settings, Clock, MapPin, Wifi } from 'lucide-react';
import { Card, ResultBadge, InfoBox } from './Shared';

const PBACDemo: React.FC = () => {
  const [time, setTime] = useState(10); // 9-17 is working hours
  const [ipType, setIpType] = useState<'corporate' | 'public'>('corporate');
  const [deviceStatus, setDeviceStatus] = useState<'secure' | 'compromised'>('secure');

  // Logic
  const isWorkingHours = time >= 9 && time <= 17;
  const isCorporateIp = ipType === 'corporate';
  const isSecureDevice = deviceStatus === 'secure';

  // Updated Strict Policy: 
  // Must be Corporate IP AND WorkingHours AND SecureDevice
  const hasAccess = isCorporateIp && isWorkingHours && isSecureDevice;

  return (
    <div className="space-y-8 animate-fadeIn">
      <InfoBox title="PBAC (Policy-Based Access Control)" color="bg-purple-50 text-purple-900 border-purple-400">
        An evolution of ABAC that emphasizes logic and context (Time, Location, Device Health). Often used in Zero Trust architectures.
        <br/>
        <strong>Policy:</strong> Access requires <span className="font-bold">Corporate VPN</span> AND <span className="font-bold">Working Hours</span> AND <span className="font-bold">Secure Device</span>.
      </InfoBox>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Context Controls */}
        <Card className="p-6 space-y-8 border-purple-100">
          <h3 className="font-bold text-gray-700 flex items-center gap-2 pb-4 border-b border-gray-100">
            <Settings size={20} className="text-purple-500" /> 
            Context Simulator
          </h3>

          <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
            <label className="flex justify-between text-sm font-medium text-gray-700 mb-4">
              <span className="flex items-center gap-2"><Clock size={16} className="text-gray-500"/> Time of Day: <span className="font-mono text-lg">{time}:00</span></span>
              <span className={`px-2 py-0.5 rounded text-xs font-bold ${isWorkingHours ? "bg-green-100 text-green-700" : "bg-red-100 text-red-600"}`}>
                {isWorkingHours ? "Working Hours (9-17)" : "After Hours"}
              </span>
            </label>
            <input 
              type="range" min="0" max="23" value={time} 
              onChange={(e) => setTime(parseInt(e.target.value))}
              className="w-full h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-purple-600"
            />
            <div className="flex justify-between text-[10px] text-gray-400 mt-2 font-mono">
              <span>00:00</span><span>12:00</span><span>23:00</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-bold text-gray-500 mb-3"><MapPin size={16} className="inline mr-1"/> Network</label>
              <div className="flex flex-col gap-2">
                <button 
                  onClick={() => setIpType('corporate')}
                  className={`p-3 rounded-lg text-sm font-bold border transition-all flex items-center gap-2 ${ipType === 'corporate' ? 'bg-purple-100 border-purple-500 text-purple-800 shadow-sm' : 'border-gray-200 text-gray-500 hover:bg-gray-50'}`}
                >
                  <Wifi size={16} /> Corp VPN
                </button>
                <button 
                  onClick={() => setIpType('public')}
                  className={`p-3 rounded-lg text-sm font-bold border transition-all flex items-center gap-2 ${ipType === 'public' ? 'bg-purple-100 border-purple-500 text-purple-800 shadow-sm' : 'border-gray-200 text-gray-500 hover:bg-gray-50'}`}
                >
                  <Wifi size={16} className="text-red-400" /> Public Wi-Fi
                </button>
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-bold text-gray-500 mb-3"><Shield size={16} className="inline mr-1"/> Device Health</label>
              <div className="flex flex-col gap-2">
                <button 
                  onClick={() => setDeviceStatus('secure')}
                  className={`p-3 rounded-lg text-sm font-bold border transition-all flex items-center gap-2 ${deviceStatus === 'secure' ? 'bg-purple-100 border-purple-500 text-purple-800 shadow-sm' : 'border-gray-200 text-gray-500 hover:bg-gray-50'}`}
                >
                  <Shield size={16} /> Secure
                </button>
                <button 
                  onClick={() => setDeviceStatus('compromised')}
                  className={`p-3 rounded-lg text-sm font-bold border transition-all flex items-center gap-2 ${deviceStatus === 'compromised' ? 'bg-purple-100 border-purple-500 text-purple-800 shadow-sm' : 'border-gray-200 text-gray-500 hover:bg-gray-50'}`}
                >
                  <Shield size={16} className="text-red-400" /> Compromised
                </button>
              </div>
            </div>
          </div>
        </Card>

        {/* Policy Logic Visualizer */}
        <div className="space-y-4 flex flex-col">
          <Card className="bg-slate-900 text-slate-300 p-6 font-mono text-sm shadow-2xl h-full border-l-8 border-purple-500 flex flex-col justify-center relative overflow-hidden">
             {/* Code highlighting effect */}
             <div className="absolute top-0 right-0 p-4 opacity-10">
                <Shield size={120} />
             </div>
             
             <div className="text-purple-400 mb-4 font-bold tracking-wider text-xs">Running Policy Check...</div>
             
             <div className="pl-4 border-l-2 border-slate-700 space-y-3 relative z-10">
               <div><span className="text-purple-300">if</span> (</div>
               
               {/* Condition 1 */}
               <div className={`pl-6 transition-colors duration-300 flex justify-between items-center p-1 rounded ${isCorporateIp ? 'bg-green-500/10 text-green-400' : 'bg-red-500/10 text-red-400'}`}>
                 <span>network.isVPN</span>
                 <span className="text-xs font-bold border border-current px-1 rounded">{isCorporateIp ? 'PASS' : 'FAIL'}</span>
               </div>
               
               <div className="pl-4 text-white font-bold">AND</div>
               
               {/* Condition 2 */}
               <div className={`pl-6 transition-colors duration-300 flex justify-between items-center p-1 rounded ${isWorkingHours ? 'bg-green-500/10 text-green-400' : 'bg-red-500/10 text-red-400'}`}>
                 <span>time.isWorkingHours</span>
                 <span className="text-xs font-bold border border-current px-1 rounded">{isWorkingHours ? 'PASS' : 'FAIL'}</span>
               </div>
               
               <div className="pl-4 text-white font-bold">AND</div>
               
               {/* Condition 3 */}
               <div className={`pl-6 transition-colors duration-300 flex justify-between items-center p-1 rounded ${isSecureDevice ? 'bg-green-500/10 text-green-400' : 'bg-red-500/10 text-red-400'}`}>
                 <span>device.isSecure</span>
                 <span className="text-xs font-bold border border-current px-1 rounded">{isSecureDevice ? 'PASS' : 'FAIL'}</span>
               </div>

               <div className="pl-4 text-white">)</div>
               <div>) <span className="text-purple-300">return</span> <span className={hasAccess ? "text-green-400 font-bold bg-green-900/30 px-2 py-0.5 rounded" : "text-slate-500"}>ALLOW</span></div>
               <div><span className="text-purple-300">else return</span> <span className={!hasAccess ? "text-red-400 font-bold bg-red-900/30 px-2 py-0.5 rounded" : "text-slate-500"}>DENY</span></div>
             </div>
          </Card>
        </div>
      </div>

      <ResultBadge 
        granted={hasAccess} 
        reason={
          !isCorporateIp 
            ? "Violation: Must be on Corporate VPN." 
            : (!isWorkingHours 
                ? "Violation: Access is only allowed during working hours (9-17)." 
                : (!isSecureDevice 
                    ? "Violation: Device health check failed. Must be Secure."
                    : "Access Granted: All policy requirements met.")
            )
        }
      />
    </div>
  );
};

export default PBACDemo;