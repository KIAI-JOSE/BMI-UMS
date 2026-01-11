import React from 'react';
import { Book, Search, Filter, Plus, BookOpen, Clock, CheckCircle, RotateCcw } from 'lucide-react';

const Library: React.FC = () => {
  const books = [
    { id: 'BK-1001', title: 'Systematic Theology', author: 'Wayne Grudem', category: 'Theology', status: 'In Stock', location: 'Section A1' },
    { id: 'BK-1002', title: 'Clean Code', author: 'Robert C. Martin', category: 'ICT', status: 'Borrowed', returnDate: '2024-05-25' },
    { id: 'BK-1003', title: 'The Purpose Driven Life', author: 'Rick Warren', category: 'Spirituality', status: 'In Stock', location: 'Section C4' },
    { id: 'BK-1004', title: 'React Design Patterns', author: 'Michael Chan', category: 'ICT', status: 'In Stock', location: 'Section B2' },
  ];

  return (
    <div className="p-8 space-y-8 animate-fade-in pb-20">
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-3xl font-bold text-[#2E004F] dark:text-white">Library Management</h2>
          <p className="text-gray-500 dark:text-gray-400">Track institutional literature and research assets</p>
        </div>
        <button className="flex items-center gap-2 px-6 py-3 bg-[#4B0082] text-white rounded-xl shadow-lg hover:shadow-xl transition-all font-bold text-sm">
          <Plus size={18} /> Register New Book
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700">
          <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Total Volumes</h4>
          <p className="text-3xl font-bold text-[#4B0082] dark:text-white">4,289</p>
        </div>
        <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700">
          <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Active Loans</h4>
          <p className="text-3xl font-bold text-amber-500">156</p>
        </div>
        <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700">
          <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Overdue Items</h4>
          <p className="text-3xl font-bold text-red-500">12</p>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
        <div className="p-6 border-b border-gray-100 dark:border-gray-700 flex flex-col md:flex-row gap-4 justify-between items-center">
          <div className="relative w-full md:w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input type="text" placeholder="Search by title, author, or ISBN..." className="w-full pl-10 pr-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl outline-none text-sm dark:text-white" />
          </div>
          <div className="flex gap-2">
            <button className="flex items-center gap-2 px-4 py-2 bg-purple-50 dark:bg-gray-700 text-[#4B0082] dark:text-purple-300 rounded-lg text-xs font-bold"><BookOpen size={14} /> Issue Book</button>
            <button className="flex items-center gap-2 px-4 py-2 bg-emerald-50 dark:bg-gray-700 text-emerald-600 dark:text-emerald-400 rounded-lg text-xs font-bold"><RotateCcw size={14} /> Return Book</button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-gray-50 dark:bg-gray-700/50 text-gray-500 dark:text-gray-400 uppercase text-[10px] font-bold tracking-widest border-b border-gray-100 dark:border-gray-700">
                <th className="px-6 py-4">Title & Author</th>
                <th className="px-6 py-4">Category</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Details</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50 dark:divide-gray-700">
              {books.map((book) => (
                <tr key={book.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/20 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-purple-50 dark:bg-gray-600 rounded-lg text-[#4B0082] dark:text-purple-300"><Book size={18} /></div>
                      <div>
                        <p className="font-bold text-gray-900 dark:text-white text-sm">{book.title}</p>
                        <p className="text-xs text-gray-500">{book.author}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-xs font-medium text-gray-600 dark:text-gray-300">{book.category}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded-full text-[10px] font-bold uppercase ${book.status === 'In Stock' ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'}`}>
                      {book.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-xs text-gray-500">
                    {book.status === 'In Stock' ? `Loc: ${book.location}` : `Due: ${book.returnDate}`}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Library;