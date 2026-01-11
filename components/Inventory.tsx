import React from 'react';
import { Package, Truck, AlertTriangle, Plus, Search, Layers, Box, BarChart } from 'lucide-react';

const Inventory: React.FC = () => {
  const items = [
    { id: 'AST-001', name: 'Dell Latitude Laptops', category: 'ICT', qty: 45, unit: 'pcs', status: 'Optimal' },
    { id: 'AST-002', name: 'A4 Printing Paper', category: 'Office', qty: 12, unit: 'reams', status: 'Low Stock' },
    { id: 'AST-003', name: 'Chemistry Beakers', category: 'Science Lab', qty: 120, unit: 'units', status: 'Optimal' },
    { id: 'AST-004', name: 'Standard Exam Desks', category: 'Furniture', qty: 450, unit: 'units', status: 'Optimal' },
  ];

  return (
    <div className="p-8 space-y-8 animate-fade-in pb-20">
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-3xl font-bold text-[#2E004F] dark:text-white">Asset & Inventory</h2>
          <p className="text-gray-500 dark:text-gray-400">Track institutional property and consumable stock</p>
        </div>
        <button className="flex items-center gap-2 px-6 py-3 bg-[#4B0082] text-white rounded-xl shadow-lg hover:shadow-xl transition-all font-bold text-sm">
          <Plus size={18} /> New Requisition
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white dark:bg-gray-800 p-5 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm">
           <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Total Fixed Assets</p>
           <div className="flex items-end justify-between">
              <p className="text-2xl font-bold text-[#4B0082] dark:text-white">1,842</p>
              <Layers size={20} className="text-purple-300 mb-1" />
           </div>
        </div>
        <div className="bg-white dark:bg-gray-800 p-5 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm">
           <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Low Stock Items</p>
           <div className="flex items-end justify-between">
              <p className="text-2xl font-bold text-amber-500">14</p>
              <AlertTriangle size={20} className="text-amber-300 mb-1" />
           </div>
        </div>
        <div className="bg-white dark:bg-gray-800 p-5 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm">
           <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Procurement Inbound</p>
           <div className="flex items-end justify-between">
              <p className="text-2xl font-bold text-blue-500">3</p>
              <Truck size={20} className="text-blue-300 mb-1" />
           </div>
        </div>
        <div className="bg-white dark:bg-gray-800 p-5 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm">
           <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Net Valuation</p>
           <div className="flex items-end justify-between">
              <p className="text-2xl font-bold text-emerald-500">$2.4M</p>
              <BarChart size={20} className="text-emerald-300 mb-1" />
           </div>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
        <table className="w-full text-left">
           <thead>
              <tr className="bg-gray-50 dark:bg-gray-700/50 border-b border-gray-100 dark:border-gray-700 text-[10px] font-bold uppercase text-gray-400 tracking-widest">
                 <th className="p-4 pl-6">Item Name</th>
                 <th className="p-4">Category</th>
                 <th className="p-4">Quantity</th>
                 <th className="p-4">Status</th>
                 <th className="p-4 text-right pr-6">Management</th>
              </tr>
           </thead>
           <tbody className="divide-y divide-gray-50 dark:divide-gray-700">
              {items.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/20 transition-colors">
                   <td className="p-4 pl-6 font-bold text-gray-900 dark:text-white text-sm">{item.name}</td>
                   <td className="p-4 text-xs text-gray-500">{item.category}</td>
                   <td className="p-4 text-sm font-semibold">{item.qty} {item.unit}</td>
                   <td className="p-4">
                      <span className={`px-2 py-1 rounded-full text-[10px] font-bold uppercase ${item.status === 'Optimal' ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'}`}>
                        {item.status}
                      </span>
                   </td>
                   <td className="p-4 text-right pr-6">
                      <button className="text-[#4B0082] text-xs font-bold hover:underline">Edit Entry</button>
                   </td>
                </tr>
              ))}
           </tbody>
        </table>
      </div>
    </div>
  );
};

export default Inventory;