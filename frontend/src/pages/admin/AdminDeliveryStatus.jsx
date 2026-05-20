import { useFetchAllOrdersQuery, useUpdateOrderStatusMutation } from "../../redux/features/orders/ordersApi";
import { formatDate } from "../../utils/formateDate";

const AdminDeliveryStatus = () => {
  const { data: orders = [], isLoading, refetch } = useFetchAllOrdersQuery();
  const [updateOrderStatus] = useUpdateOrderStatusMutation();

  const statuses = ["Order Placed", "Packed", "Shipped", "Out For Delivery", "Delivered"];

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      await updateOrderStatus({ id: orderId, status: newStatus }).unwrap();
      refetch();
    } catch (error) {
      console.error(error);
      alert("Failed to update order status.");
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Order Placed":
        return "bg-blue-50 text-blue-700 border-blue-200";
      case "Packed":
        return "bg-yellow-50 text-yellow-700 border-yellow-200";
      case "Shipped":
        return "bg-purple-50 text-purple-700 border-purple-200";
      case "Out For Delivery":
        return "bg-orange-50 text-orange-700 border-orange-200";
      case "Delivered":
        return "bg-green-50 text-green-700 border-green-200";
      default:
        return "bg-gray-50 text-gray-700 border-gray-200";
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Title */}
      <div>
        <h2 className="text-xl font-bold text-gray-800">
          Delivery Status Control
        </h2>
        <p className="text-sm text-gray-500 mt-1">
          Monitor order logs and advance shipment stages step-by-step
        </p>
      </div>

      {/* Orders log table */}
      <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden max-w-5xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-gray-500">
            <thead className="text-xs text-gray-700 bg-gray-50 uppercase border-b border-gray-200">
              <tr>
                <th className="px-6 py-3">Order ID</th>
                <th className="px-6 py-3">Customer</th>
                <th className="px-6 py-3">Items</th>
                <th className="px-6 py-3">Total Amount</th>
                <th className="px-6 py-3">Date</th>
                <th className="px-6 py-3">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {isLoading ? (
                <tr>
                  <td colSpan="6" className="text-center py-8">
                    Loading order logs...
                  </td>
                </tr>
              ) : orders.length === 0 ? (
                <tr>
                  <td colSpan="6" className="text-center py-8">
                    No orders have been placed yet.
                  </td>
                </tr>
              ) : (
                orders.map((order) => (
                  <tr key={order._id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 font-semibold text-gray-900">
                      {order.orderId}
                    </td>
                    <td className="px-6 py-4">
                      <span className="font-medium text-gray-800 block">
                        {order.email}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="space-y-1">
                        {order.products.map((item, idx) => (
                          <div key={idx} className="text-xs text-gray-600">
                            {item.name} <span className="font-semibold text-gray-800">x{item.quantity}</span>
                          </div>
                        ))}
                      </div>
                    </td>
                    <td className="px-6 py-4 font-medium text-gray-900">
                      ${order.amount.toFixed(2)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {formatDate(order.createdAt)}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <span className={`px-2.5 py-1 text-xs font-semibold rounded-md border ${getStatusColor(order.status)}`}>
                          {order.status}
                        </span>
                        
                        {/* Selector to update delivery status */}
                        <select
                          value={order.status}
                          onChange={(e) => handleStatusChange(order._id, e.target.value)}
                          className="border border-gray-300 rounded-md px-2 py-1 text-xs bg-white text-gray-700 outline-none focus:border-primary transition-colors cursor-pointer"
                        >
                          {statuses.map((s) => (
                            <option key={s} value={s}>
                              {s}
                            </option>
                          ))}
                        </select>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};

export default AdminDeliveryStatus;
