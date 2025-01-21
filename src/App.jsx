import React, { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { FiPlus, FiDollarSign, FiTrendingUp, FiPieChart } from 'react-icons/fi';

const MONEY_SAVING_TIPS = [
  "Set a realistic monthly budget",
  "Cook meals at home instead of eating out",
  "Use the 50/30/20 rule: 50% needs, 30% wants, 20% savings",
  "Track every expense, no matter how small",
  "Look for free entertainment options"
];

function App() {
  const [expenses, setExpenses] = useState([]);
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');

  const totalExpenses = expenses.reduce((sum, expense) => sum + expense.amount, 0);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!description || !amount) return;

    const newExpense = {
      id: Date.now(),
      description,
      amount: parseFloat(amount),
      date: new Date()
    };

    setExpenses([newExpense, ...expenses]);
    setDescription('');
    setAmount('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-gray-100">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-gray-100 to-gray-300 text-transparent bg-clip-text">
            Fittakka
          </h1>
          <p className="text-gray-400">Take control of  your finances</p>
        </div>

        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {/* Total Balance Card */}
          <div className="bg-gradient-to-br from-gray-800 to-gray-700 p-6 rounded-xl shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold">Total Expenses</h2>
              <FiDollarSign className="text-2xl text-gray-400" />
            </div>
            <p className="text-3xl font-bold">${totalExpenses.toFixed(2)}</p>
          </div>

          {/* Recent Activity Card */}
          <div className="bg-gradient-to-br from-gray-800 to-gray-700 p-6 rounded-xl shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold">Recent Activity</h2>
              <FiTrendingUp className="text-2xl text-gray-400" />
            </div>
            <div className="space-y-3">
              {expenses.slice(0, 3).map(expense => (
                <div key={expense.id} className="flex justify-between items-center">
                  <span className="text-gray-300">{expense.description}</span>
                  <span className="text-gray-400">${expense.amount.toFixed(2)}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Tips Card */}
          <div className="bg-gradient-to-br from-gray-800 to-gray-700 p-6 rounded-xl shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold">Saving Tips</h2>
              <FiPieChart className="text-2xl text-gray-400" />
            </div>
            <div className="space-y-2">
              {MONEY_SAVING_TIPS.slice(0, 3).map((tip, index) => (
                <p key={index} className="text-sm text-gray-400">• {tip}</p>
              ))}
            </div>
          </div>
        </div>

        {/* Add Expense Form */}
        <div className="max-w-md mx-auto bg-gradient-to-br from-gray-800 to-gray-700 p-6 rounded-xl shadow-lg mb-8">
          <h2 className="text-xl font-semibold mb-4">Add New Expense</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <input
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Description"
                className="w-full px-4 py-2 rounded-lg bg-gray-900 border border-gray-700 focus:outline-none focus:border-gray-500"
              />
            </div>
            <div>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="Amount"
                step="0.01"
                className="w-full px-4 py-2 rounded-lg bg-gray-900 border border-gray-700 focus:outline-none focus:border-gray-500"
              />
            </div>
            <button
              type="submit"
              className="w-full py-2 px-4 bg-gradient-to-r from-gray-600 to-gray-500 rounded-lg hover:from-gray-500 hover:to-gray-400 transition-all duration-200 flex items-center justify-center gap-2"
            >
              <FiPlus /> Add Expense
            </button>
          </form>
        </div>

        {/* Expense List */}
        <div className="bg-gradient-to-br from-gray-800 to-gray-700 rounded-xl shadow-lg">
          <h2 className="text-xl font-semibold p-6 border-b border-gray-700">Recent Expenses</h2>
          <div className="divide-y divide-gray-700">
            {expenses.map(expense => (
              <div key={expense.id} className="p-4 flex justify-between items-center">
                <div>
                  <p className="font-medium">{expense.description}</p>
                  <p className="text-sm text-gray-400">
                    {format(expense.date, 'MMM dd, yyyy')}
                  </p>
                </div>
                <span className="text-lg font-semibold">${expense.amount.toFixed(2)}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;