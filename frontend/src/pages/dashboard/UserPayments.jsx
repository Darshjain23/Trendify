const UserPayments = () => {
  const cards = [
    { brand: "Visa", number: "**** **** **** 9012", holder: "Darsh Jain", expiry: "12/28", isDefault: true, bg: "from-slate-800 to-slate-900" },
    { brand: "Mastercard", number: "**** **** **** 3456", holder: "Darsh Jain", expiry: "08/27", isDefault: false, bg: "from-indigo-600 to-indigo-800" },
  ];

  const transactions = [
    { date: "May 18, 2026", id: "TXN-908123", amount: "$89.00", method: "Visa", status: "Success", color: "text-green-600 bg-green-50" },
    { date: "April 29, 2026", id: "TXN-881290", amount: "$45.50", method: "Mastercard", status: "Success", color: "text-green-600 bg-green-50" },
    { date: "March 12, 2026", id: "TXN-854721", amount: "$55.00", method: "Visa", status: "Success", color: "text-green-600 bg-green-50" },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl md:text-2xl font-black text-gray-800 uppercase tracking-wide">
            Payment Details
          </h2>
          <p className="text-xs text-gray-400 font-bold uppercase tracking-wider mt-1">
            Manage your cards, billing info, and payments history
          </p>
        </div>

        <button className="px-4 py-2.5 bg-gray-900 hover:bg-black text-white text-[10px] font-black uppercase tracking-widest rounded-xl shadow-md transition-colors shrink-0">
          Add New Card
        </button>
      </div>

      {/* Credit cards mock */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl">
        {cards.map((card, idx) => (
          <div 
            key={idx} 
            className={`bg-gradient-to-br ${card.bg} rounded-3xl p-6 text-white relative shadow-lg overflow-hidden flex flex-col justify-between h-44`}
          >
            {/* Chip vector */}
            <div className="absolute top-6 right-6 text-2xl opacity-60">
              <i className="ri-wireless-charged-line"></i>
            </div>

            <div>
              <span className="text-[10px] font-black uppercase tracking-widest bg-white/10 px-2.5 py-0.5 rounded-full inline-block">
                {card.brand}
              </span>
              <p className="text-lg font-mono tracking-widest mt-4">
                {card.number}
              </p>
            </div>

            <div className="flex justify-between items-end pt-4">
              <div>
                <p className="text-[8px] text-white/50 uppercase tracking-wider font-extrabold">Card Holder</p>
                <p className="text-xs font-black uppercase tracking-wider mt-0.5">{card.holder}</p>
              </div>
              <div>
                <p className="text-[8px] text-white/50 uppercase tracking-wider font-extrabold">Expires</p>
                <p className="text-xs font-black tracking-wide mt-0.5">{card.expiry}</p>
              </div>
            </div>
            
            {card.isDefault && (
              <span className="absolute bottom-6 right-6 h-2 w-2 rounded-full bg-green-400 border border-white"></span>
            )}
          </div>
        ))}
      </div>

      {/* Payment History card */}
      <div className="bg-white border border-gray-100 rounded-3xl p-6 md:p-8 shadow-sm max-w-4xl">
        <h3 className="text-xs font-black text-gray-800 uppercase tracking-widest pb-4 border-b border-gray-100 mb-6">
          Payment Transactions
        </h3>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-gray-100 pb-3">
                <th className="text-[10px] font-extrabold text-gray-400 uppercase tracking-wider pb-3.5">Date</th>
                <th className="text-[10px] font-extrabold text-gray-400 uppercase tracking-wider pb-3.5">Transaction ID</th>
                <th className="text-[10px] font-extrabold text-gray-400 uppercase tracking-wider pb-3.5">Amount</th>
                <th className="text-[10px] font-extrabold text-gray-400 uppercase tracking-wider pb-3.5">Method</th>
                <th className="text-[10px] font-extrabold text-gray-400 uppercase tracking-wider pb-3.5">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50 text-xs">
              {transactions.map((txn, idx) => (
                <tr key={idx} className="hover:bg-gray-50/50 transition-colors">
                  <td className="py-4 text-gray-600 font-bold">{txn.date}</td>
                  <td className="py-4 text-gray-800 font-extrabold">{txn.id}</td>
                  <td className="py-4 text-gray-800 font-black">{txn.amount}</td>
                  <td className="py-4 text-gray-500 font-bold">{txn.method}</td>
                  <td className="py-4">
                    <span className={`inline-block px-2.5 py-0.5 text-[8px] font-black uppercase tracking-wider rounded-md ${txn.color}`}>
                      {txn.status}
                    </span>
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

export default UserPayments;
