import React, { useState } from 'react';
import { 
  CreditCard, 
  Download, 
  Plus, 
  Search, 
  Filter, 
  TrendingUp, 
  ArrowUpRight, 
  ArrowDownRight, 
  DollarSign, 
  CheckCircle,
  Clock,
  FileText
} from 'lucide-react';

interface FinanceProps {
  theme: string;
}

const Finance: React.FC<FinanceProps> = ({ theme }) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'invoices' | 'payments'>('overview');

  const stats = [
    { label: 'Total Revenue', value: '$1,370,000', change: '+12%', icon: DollarSign, color: 'bg-emerald-100 text-emerald-600' },
    { label: 'Pending Fees', value: '$245,000', change: '+2%', icon: Clock, color: 'bg-amber-100 text-amber-600' },
    { label: 'Scholarships', value: '$120,000', change: '-4%', icon: ArrowDownRight, color: 'bg-blue-100 text-blue-600' },
    { label: 'Net Profit', value: '$840,000', change: '+8%', icon: TrendingUp, color: 'bg-purple-100 text-purple-600' },
  ];

  return (
    <div className="p-8 space-y-8 animate-fade-in pb-20">
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-3xl font-bold text-[#2E004F] dark:text-white">Bursary & Finance</h2>
          <p className="text-gray-500 dark:text-gray-400">Manage institutional accounts, tuition, and payroll</p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-4 py-2 border border-gray-200 dark:border-gray-700 rounded-xl text-sm font-medium hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
            <Download size={18} /> Export Report
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-[#4B0082] text-white rounded-xl shadow-lg hover:shadow-xl transition-all font-medium text-sm">
            <Plus size={18} /> New Transaction
          </button>
        </div>
      </div>

      {/* Financial Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <div key={i} className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700">
            <div className="flex justify-between items-start mb-4">
              <div className={`p-3 rounded-xl ${stat.color}`}>
                <stat.icon size={24} />
              </div>
              <span className={`text-xs font-bold px-2 py-1 rounded-lg ${stat.change.startsWith('+') ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'}`}>
                {stat.change}
              </span>
            </div>
            <h3 className="text-gray-500 dark:text-gray-400 text-sm font-medium">{stat.label}</h3>
            <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Main Finance Content */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
        <div className="flex border-b border-gray-100 dark:border-gray-700">
          <button onClick={() => setActiveTab('overview')} className={`px-8 py-4 text-sm font-bold transition-all ${activeTab === 'overview' ? 'border-b-2 border-[#4B0082] text-[#4B0082] dark:text-[#FFD700] dark:border-[#FFD700]' : 'text-gray-400 hover:text-gray-600'}`}>Transaction Ledger</button>
          <button onClick={() => setActiveTab('invoices')} className={`px-8 py-4 text-sm font-bold transition-all ${activeTab === 'invoices' ? 'border-b-2 border-[#4B0082] text-[#4B0082] dark:text-[#FFD700] dark:border-[#FFD700]' : 'text-gray-400 hover:text-gray-600'}`}>Unpaid Invoices</button>
        </div>

        <div className="p-6">
          <div className="flex flex-col md:flex-row gap-4 justify-between items-center mb-6">
            <div className="relative w-full md:w-96">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input type="text" placeholder="Search by Student ID or Reference..." className="w-full pl-10 pr-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl outline-none text-sm dark:text-white" />
            </div>
            <div className="flex items-center gap-2">
              <Filter size={18} className="text-gray-400" />
              <select className="bg-transparent text-sm font-medium outline-none text-gray-600 dark:text-gray-300">
                <option>All Semesters</option>
                <option>Semester 1 2024</option>
                <option>Semester 2 2023</option>
              </select>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-gray-50 dark:bg-gray-700/50 text-gray-500 dark:text-gray-400 uppercase text-[10px] font-bold tracking-widest border-b border-gray-100 dark:border-gray-700">
                  <th className="px-4 py-3">Reference</th>
                  <th className="px-4 py-3">Student Name</th>
                  <th className="px-4 py-3">Description</th>
                  <th className="px-4 py-3">Date</th>
                  <th className="px-4 py-3">Amount</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50 dark:divide-gray-700">
                {[
                  { ref: 'TRX-9001', name: 'John Doe', desc: 'Tuition Fee - Sem 1', date: '2024-05-10', amt: '$3,200', status: 'Paid' },
                  { ref: 'TRX-9002', name: 'Jane Smith', desc: 'Library Fine', date: '2024-05-12', amt: '$25', status: 'Pending' },
                  { ref: 'TRX-9003', name: 'Robert Fox', desc: 'Hostel Deposit', date: '2024-05-14', amt: '$500', status: 'Paid' },
                  { ref: 'TRX-9004', name: 'Emily Blunt', desc: 'Graduation Fee', date: '2024-05-15', amt: '$150', status: 'Failed' },
                ].map((row, idx) => (
                  <tr key={idx} className="hover:bg-gray-50 dark:hover:bg-gray-700/30 transition-colors">
                    <td className="px-4 py-4 text-sm font-mono text-[#4B0082] dark:text-purple-300 font-bold">{row.ref}</td>
                    <td className="px-4 py-4 text-sm font-medium text-gray-900 dark:text-white">{row.name}</td>
                    <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-400">{row.desc}</td>
                    <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-400">{row.date}</td>
                    <td className="px-4 py-4 text-sm font-bold text-gray-900 dark:text-white">{row.amt}</td>
                    <td className="px-4 py-4">
                      <span className={`px-2 py-1 rounded-full text-[10px] font-bold uppercase ${
                        row.status === 'Paid' ? 'bg-green-100 text-green-700' : 
                        row.status === 'Pending' ? 'bg-amber-100 text-amber-700' : 
                        'bg-red-100 text-red-700'
                      }`}>
                        {row.status}
                      </span>
                    </td>
                    <td className="px-4 py-4 text-right">
                      <button className="p-2 text-gray-400 hover:text-[#4B0082] transition-colors"><FileText size={18} /></button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Finance;