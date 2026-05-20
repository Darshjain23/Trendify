import { useSelector } from "react-redux";

const DashboardHome = () => {
  const { user } = useSelector((state) => state.auth);
  const products = useSelector((state) => state.cart.products);
  const wishlistProducts = useSelector((state) => state.wishlist.products);

  const stats = [
    { label: "Total Orders", value: "3", icon: "ri-shopping-bag-line", color: "bg-blue-50 text-blue-600" },
    { label: "Total Spent", value: "$189.50", icon: "ri-money-dollar-circle-line", color: "bg-green-50 text-green-600" },
    { label: "Wishlist Items", value: wishlistProducts?.length || "0", icon: "ri-heart-line", color: "bg-red-50 text-red-600" },
    { label: "Items in Bag", value: products?.length || "0", icon: "ri-shopping-cart-line", color: "bg-purple-50 text-purple-600" },
  ];

  return (
    <div className="space-y-6">
      
      {/* Welcome header */}
      <div>
        <h2 className="text-xl font-bold text-gray-800">
          Account Overview
        </h2>
        <p className="text-sm text-gray-500 mt-1">
          Welcome back, {user?.username || "Valued Guest"}
        </p>
      </div>

      {/* Grid of cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, idx) => (
          <div key={idx} className="p-5 bg-white border border-gray-200 rounded-xl shadow-sm flex items-center gap-4">
            <div className={`h-10 w-10 rounded-lg flex items-center justify-center text-lg shrink-0 ${stat.color}`}>
              <i className={stat.icon}></i>
            </div>
            <div>
              <p className="text-xs font-medium text-gray-500">{stat.label}</p>
              <h4 className="text-lg font-bold text-gray-900 mt-0.5">{stat.value}</h4>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};

export default DashboardHome;
