import { useSelector } from "react-redux";
import { useFetchUserOrdersQuery } from "../../redux/features/orders/ordersApi";
import { formatDate } from "../../utils/formateDate";

const UserOrders = () => {
  const { user } = useSelector((store) => store.auth);

  // Fetch orders from the API dynamically using email
  const { data: orders = [], isLoading } = useFetchUserOrdersQuery(user?.email, {
    skip: !user?.email,
  });

  const getStatusColor = (status) => {
    switch (status) {
      case "Order Placed":
        return "text-blue-700 bg-blue-50";
      case "Packed":
        return "text-yellow-700 bg-yellow-50";
      case "Shipped":
        return "text-purple-700 bg-purple-50";
      case "Out For Delivery":
        return "text-orange-700 bg-orange-50";
      case "Delivered":
        return "text-green-700 bg-green-50";
      default:
        return "text-gray-700 bg-gray-50";
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Title */}
      <div>
        <h2 className="text-xl font-bold text-gray-800">
          My Orders
        </h2>
        <p className="text-sm text-gray-500 mt-1">
          Review your purchase history and order statuses
        </p>
      </div>

      {/* Orders list */}
      <div className="space-y-4 max-w-3xl">
        {isLoading ? (
          <div className="text-sm text-gray-500 py-4">Loading your orders...</div>
        ) : orders.length === 0 ? (
          <div className="text-sm text-gray-500 py-4">You have not placed any orders yet.</div>
        ) : (
          orders.map((order) => (
            <div key={order._id} className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm space-y-4">
              
              {/* Header info */}
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center pb-3 border-b border-gray-100 gap-2">
                <div>
                  <span className="text-sm font-semibold text-gray-900">Order #{order.orderId}</span>
                  <span className="text-xs text-gray-400 ml-3">Placed on {formatDate(order.createdAt)}</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className={`px-2.5 py-1 text-xs font-semibold rounded ${getStatusColor(order.status)}`}>
                    {order.status}
                  </span>
                  <span className="text-sm font-semibold text-gray-900">
                    Total: ${order.amount.toFixed(2)}
                  </span>
                </div>
              </div>

              {/* Products in order */}
              <div className="space-y-3">
                {order.products.map((item, itemIdx) => (
                  <div key={itemIdx} className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <img 
                        src={item.image} 
                        alt={item.name} 
                        className="h-12 w-12 object-cover rounded-md border border-gray-200"
                      />
                      <div>
                        <h5 className="text-xs font-semibold text-gray-800">{item.name}</h5>
                        <p className="text-[11px] text-gray-500 mt-0.5">
                          Quantity: {item.quantity} &bull; ${item.price} each
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

            </div>
          ))
        )}
      </div>

    </div>
  );
};

export default UserOrders;
