import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Upload, Receipt, DollarSign, Users, TrendingUp } from 'lucide-react';

const ExpenseTracker = ({ tripId }) => {
    const [expenses, setExpenses] = useState([
        { id: 1, description: 'Hotel Booking', amount: 5000, paidBy: 'John', date: '2024-01-15' },
        { id: 2, description: 'Restaurant', amount: 1200, paidBy: 'Sarah', date: '2024-01-16' },
        { id: 3, description: 'Cab Fare', amount: 450, paidBy: 'Mike', date: '2024-01-16' }
    ]);
    const [showUpload, setShowUpload] = useState(false);

    const totalExpense = expenses.reduce((sum, exp) => sum + exp.amount, 0);
    const avgExpense = expenses.length > 0 ? totalExpense / expenses.length : 0;

    return (
        <div className="py-8">
            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <motion.div
                    className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20"
                    whileHover={{ scale: 1.02 }}
                >
                    <DollarSign className="w-10 h-10 text-green-400 mb-3" />
                    <div className="text-3xl font-bold text-white mb-1">₹{totalExpense}</div>
                    <div className="text-gray-400 text-sm">Total Expenses</div>
                </motion.div>

                <motion.div
                    className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20"
                    whileHover={{ scale: 1.02 }}
                >
                    <Receipt className="w-10 h-10 text-blue-400 mb-3" />
                    <div className="text-3xl font-bold text-white mb-1">{expenses.length}</div>
                    <div className="text-gray-400 text-sm">Total Transactions</div>
                </motion.div>

                <motion.div
                    className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20"
                    whileHover={{ scale: 1.02 }}
                >
                    <TrendingUp className="w-10 h-10 text-purple-400 mb-3" />
                    <div className="text-3xl font-bold text-white mb-1">₹{avgExpense.toFixed(0)}</div>
                    <div className="text-gray-400 text-sm">Average per Transaction</div>
                </motion.div>
            </div>

            {/* Upload Button */}
            <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-bold text-white">Expense List</h3>
                <button
                    onClick={() => setShowUpload(true)}
                    className="bg-linear-to-r from-blue-500 to-purple-600 text-white px-6 py-3 rounded-xl font-semibold flex items-center gap-2 hover:shadow-lg hover:scale-105 transition-all"
                >
                    <Upload className="w-5 h-5" />
                    Upload Receipt
                </button>
            </div>

            {/* Expenses Table */}
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 overflow-hidden">
                <table className="w-full">
                    <thead className="bg-white/5">
                        <tr>
                            <th className="px-6 py-4 text-left text-gray-300 font-semibold">Description</th>
                            <th className="px-6 py-4 text-left text-gray-300 font-semibold">Amount</th>
                            <th className="px-6 py-4 text-left text-gray-300 font-semibold">Paid By</th>
                            <th className="px-6 py-4 text-left text-gray-300 font-semibold">Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {expenses.map((expense) => (
                            <tr key={expense.id} className="border-t border-white/10 hover:bg-white/5 transition-colors">
                                <td className="px-6 py-4 text-white">{expense.description}</td>
                                <td className="px-6 py-4 text-green-400 font-semibold">₹{expense.amount}</td>
                                <td className="px-6 py-4 text-gray-300">{expense.paidBy}</td>
                                <td className="px-6 py-4 text-gray-400">{expense.date}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Upload Modal */}
            {showUpload && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-6">
                    <motion.div
                        className="bg-slate-900 rounded-2xl p-8 max-w-md w-full border border-white/20"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                    >
                        <h3 className="text-2xl font-bold text-white mb-6">Upload Receipt</h3>
                        <div className="border-2 border-dashed border-white/20 rounded-xl p-8 text-center mb-6">
                            <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                            <p className="text-gray-300 mb-2">Drop your receipt here or click to browse</p>
                            <p className="text-gray-500 text-sm">Supports: JPG, PNG, PDF</p>
                            <input type="file" className="hidden" accept="image/*,application/pdf" />
                        </div>
                        <div className="flex gap-3">
                            <button
                                onClick={() => setShowUpload(false)}
                                className="flex-1 bg-white/10 text-white py-3 rounded-xl hover:bg-white/20 transition-all"
                            >
                                Cancel
                            </button>
                            <button className="flex-1 bg-linear-to-r from-blue-500 to-purple-600 text-white py-3 rounded-xl hover:shadow-lg transition-all">
                                Upload & Scan
                            </button>
                        </div>
                    </motion.div>
                </div>
            )}
        </div>
    );
};

export default ExpenseTracker;