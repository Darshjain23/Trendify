import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { clearCart } from "../../redux/features/cart/cartSlice";
import { useCreateOrderMutation } from "../../redux/features/orders/ordersApi";

const OrderSummary = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { tax, taxRate, totalPrice, grandTotal, selectedItems, products } = useSelector(
    (store) => store.cart
  );
  const { user } = useSelector((store) => store.auth);

  const [createOrder, { isLoading }] = useCreateOrderMutation();

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  const handleCheckout = async () => {
    if (!user) {
      alert("Please log in to proceed to checkout.");
      navigate("/login");
      return;
    }

    if (products.length === 0) {
      alert("Your cart is empty.");
      return;
    }

    const orderPayload = {
      products: products.map((item) => ({
        productId: item._id,
        name: item.name,
        price: item.price,
        image: item.image,
        quantity: item.quantity,
      })),
      amount: grandTotal,
    };

    try {
      await createOrder(orderPayload).unwrap();
      alert("Order placed successfully!");
      dispatch(clearCart());
      navigate("/dashboard/orders");
    } catch (error) {
      console.error("Order checkout failed", error);
      alert("Checkout failed. Please try again.");
    }
  };

  return (
    <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm space-y-4">
      
      {/* Title */}
      <h3 className="text-xs font-black text-gray-800 uppercase tracking-widest pb-2 border-b border-gray-100">
        Order Summary
      </h3>

      {/* Bill items details */}
      <div className="space-y-2 text-xs">
        
        <div className="flex justify-between items-center text-gray-500 font-bold">
          <span>Selected Items</span>
          <span className="text-gray-800 font-extrabold">{selectedItems}</span>
        </div>
        
        <div className="flex justify-between items-center text-gray-500 font-bold">
          <span>Subtotal</span>
          <span className="text-gray-800 font-extrabold">${totalPrice.toFixed(2)}</span>
        </div>

        <div className="flex justify-between items-center text-gray-500 font-bold">
          <span>Tax ({taxRate * 100}%)</span>
          <span className="text-gray-800 font-extrabold">${tax.toFixed(2)}</span>
        </div>

        <div className="pt-3 border-t border-gray-100 flex justify-between items-center text-sm font-black text-gray-800 uppercase tracking-wide">
          <span>Grand Total</span>
          <span className="text-primary text-base">${grandTotal.toFixed(2)}</span>
        </div>

      </div>

      {/* Actions */}
      <div className="pt-2 grid grid-cols-2 gap-3.5">
        <button
          onClick={(e) => {
            e.stopPropagation();
            handleClearCart();
          }}
          className="py-2.5 px-3 border border-red-200 hover:bg-red-50 text-red-600 text-[10px] font-black uppercase tracking-widest rounded-xl transition-all duration-200 flex items-center justify-center gap-1.5"
        >
          <span>Clear</span>
          <i className="ri-delete-bin-line text-xs"></i>
        </button>

        <button 
          onClick={(e) => {
            e.stopPropagation();
            handleCheckout();
          }}
          disabled={isLoading}
          className="py-2.5 px-3 bg-gradient-to-r from-primary to-primary-dark text-white text-[10px] font-black uppercase tracking-widest rounded-xl hover:shadow-lg hover:shadow-primary/20 transition-all duration-200 flex items-center justify-center gap-1.5 disabled:opacity-50"
        >
          <span>{isLoading ? "Processing..." : "Checkout"}</span>
          <i className="ri-bank-card-line text-xs"></i>
        </button>
      </div>

    </div>
  );
};

export default OrderSummary;
