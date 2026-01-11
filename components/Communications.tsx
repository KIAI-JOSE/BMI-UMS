import React, { useState } from 'react';
import { Send, Mail, Smartphone, Users, Search, History, CheckCircle, Clock, AlertCircle } from 'lucide-react';

const Communications: React.FC = () => {
  const [activeChannel, setActiveChannel] = useState<'sms' | 'email'>('sms');
  const [message, setMessage] = useState('');

  const history = [
    { id: 'MSG-001', type: 'SMS', recipient: 'All Students', date: '2024-05-18', status: 'Delivered', text: 'Reminder: The University will be closed for the public holiday.' },
    { id: 'MSG-002', type: 'Email', recipient: 'Theology Faculty', date: '2024-05-15', status: 'Delivered', text: 'Departmental meeting scheduled for Friday 10 AM.' },
    { id: 'MSG-003', type: 'SMS', recipient: 'BMI-2024-089', date: '2024-05-10', status: 'Failed', text: 'Urgent: Please visit the bursary office regarding your fee balance.' },
  ];

  return (
    <div className="p-8 space-y-8 animate-fade-in pb-20">
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-3xl font-bold text-[#2E004F] dark:text-white">Communications Center</h2>
          <p className="text-gray-500 dark:text-gray-400">Institutional broadcast and messaging service</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Composer */}
        <div className="lg:col-span-2 space-y-6">
           <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
              <div className="flex border-b border-gray-100 dark:border-gray-700">
                <button 
                  onClick={() => setActiveChannel('sms')}
                  className={`flex-1 py-4 text-xs font-bold uppercase tracking-widest flex items-center justify-center gap-2 transition-all ${activeChannel === 'sms' ? 'bg-[#4B0082] text-white' : 'text-gray-400 hover:text-gray-600'}`}
                >
                  <Smartphone size={16} /> SMS Gateway
                </button>
                <button 
                  onClick={() => setActiveChannel('email')}
                  className={`flex-1 py-4 text-xs font-bold uppercase tracking-widest flex items-center justify-center gap-2 transition-all ${activeChannel === 'email' ? 'bg-[#4B0082] text-white' : 'text-gray-400 hover:text-gray-600'}`}
                >
                  <Mail size={16} /> Institutional Email
                </button>
              </div>

              <div className="p-8 space-y-6">
                 <div className="space-y-2">
                    <label className="text-xs font-bold text-gray-500 uppercase tracking-widest">Recipients</label>
                    <div className="relative">
                       <Users className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                       <select className="w-full pl-10 pr-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl text-sm outline-none dark:text-white appearance-none cursor-pointer">
                          <option>All Registered Students (3,547)</option>
                          <option>Faculty Members (124)</option>
                          <option>Finance Department (12)</option>
                          <option>Custom List / Individual ID</option>
                       </select>
                    </div>
                 </div>

                 <div className="space-y-2">
                    <label className="text-xs font-bold text-gray-500 uppercase tracking-widest">Message Content</label>
                    <textarea 
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder={activeChannel === 'sms' ? "Type SMS message (160 characters max)..." : "Draft your institutional email content..."}
                      className="w-full px-4 py-4 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl text-sm outline-none dark:text-white h-40 resize-none"
                    />
                    <div className="flex justify-between items-center text-[10px] text-gray-400 font-bold">
                       <span>{activeChannel === 'sms' ? 'Standard SMS Rate Applies' : 'HTML Templates Supported'}</span>
                       <span>{message.length} / {activeChannel === 'sms' ? '160' : '5000'} Characters</span>
                    </div>
                 </div>

                 <button className="w-full py-4 bg-[#4B0082] text-white rounded-xl shadow-lg font-bold text-sm flex items-center justify-center gap-2 hover:bg-[#3b0066] transition-all transform active:scale-95">
                    <Send size={18} className="text-[#FFD700]" /> Send Broadcast Now
                 </button>
              </div>
           </div>
        </div>

        {/* Recent History */}
        <div className="space-y-6">
           <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2"><History size={16} /> Broadcast History</h3>
           <div className="space-y-4">
              {history.map((msg) => (
                <div key={msg.id} className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
                   <div className="flex justify-between items-start mb-2">
                      <div className="flex items-center gap-2">
                         <span className={`p-1 rounded bg-gray-100 dark:bg-gray-700 text-[9px] font-bold uppercase ${msg.type === 'SMS' ? 'text-blue-600' : 'text-purple-600'}`}>{msg.type}</span>
                         <span className="text-[10px] text-gray-400 font-mono">{msg.id}</span>
                      </div>
                      <span className={`text-[9px] font-bold uppercase flex items-center gap-1 ${msg.status === 'Delivered' ? 'text-green-600' : 'text-red-600'}`}>
                         {msg.status === 'Delivered' ? <CheckCircle size={10} /> : <AlertCircle size={10} />} {msg.status}
                      </span>
                   </div>
                   <p className="text-xs font-bold text-gray-800 dark:text-gray-200 mb-1">{msg.recipient}</p>
                   <p className="text-[10px] text-gray-500 line-clamp-2 leading-relaxed">{msg.text}</p>
                   <p className="text-[9px] text-gray-400 mt-2 flex items-center gap-1"><Clock size={10} /> {msg.date}</p>
                </div>
              ))}
           </div>
        </div>
      </div>
    </div>
  );
};

export default Communications;