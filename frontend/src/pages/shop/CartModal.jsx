import { useDispatch } from "react-redux";
import OrderSummary from "./OrderSummary";
import {
  removeFromCart,
  updateQuantity,
} from "../../redux/features/cart/cartSlice";

const CartModal = ({ product, isOpen, onClose }) => {
  const dispatch = useDispatch();
  
  const handleQuantity = (type, _id) => {
    const payload = { type, _id };
    dispatch(updateQuantity(payload));
  };

  const handleRemove = (e, _id) => {
    e.preventDefault();
    const payload = { _id };
    dispatch(removeFromCart(payload));
  };

  return (
    <div
      className={`fixed z-[1000] inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300 ${
        isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
      onClick={onClose}
    >
      <div
        className={`fixed right-0 top-0 w-full sm:max-w-md bg-white h-full shadow-2xl flex flex-col justify-between transition-transform duration-300 ease-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Header */}
        <div className="p-6 border-b border-gray-100 flex items-center justify-between">
          <h4 className="text-sm font-black text-gray-800 uppercase tracking-widest flex items-center gap-2">
            <i className="ri-shopping-bag-3-line text-lg text-primary"></i>
            <span>Your Cart ({product?.length || 0})</span>
          </h4>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-800 p-1 text-2xl transition-colors"
          >
            <i className="ri-close-line"></i>
          </button>
        </div>

        {/* Scrollable Items Container */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {product?.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
              <div className="h-16 w-16 bg-gray-50 text-gray-300 rounded-full flex items-center justify-center text-3xl">
                <i className="ri-shopping-cart-2-line"></i>
              </div>
              <div>
                <p className="text-sm font-bold text-gray-800 uppercase tracking-wide">Your cart is empty</p>
                <p className="text-xs text-gray-400 mt-1">Looks like you haven't added anything yet.</p>
              </div>
            </div>
          ) : (
            <div className="divide-y divide-gray-100">
              {product?.map((item, index) => (
                <div key={item._id || index} className="flex items-center gap-4 py-4 first:pt-0 last:pb-0">
                  
                  {/* Image */}
                  <img
                    src={item?.image}
                    alt={item?.name}
                    className="h-16 w-16 object-cover rounded-xl border border-gray-100 shadow-sm bg-gray-50 shrink-0"
                  />
                  
                  {/* Info & Quantity controls */}
                  <div className="flex-1 min-w-0">
                    <h5 className="text-xs font-bold text-gray-800 truncate mb-0.5 group-hover:text-primary transition-colors">
                      {item?.name}
                    </h5>
                    <p className="text-xs text-primary font-black mb-2">
                      ${Number(item?.price).toFixed(2)}
                    </p>

                    {/* Quantity Pill and Remove Button */}
                    <div className="flex items-center gap-3">
                      <div className="flex items-center border border-gray-200 rounded-full h-7 bg-gray-50 overflow-hidden">
                        <button
                          onClick={() => handleQuantity("decrement", item?._id)}
                          className="w-7 h-full flex items-center justify-center text-gray-500 hover:bg-gray-100 font-extrabold hover:text-gray-800 transition-colors"
                        >
                          -
                        </button>
                        <span className="w-6 text-center text-[10px] font-black text-gray-800">
                          {item?.quantity}
                        </span>
                        <button
                          onClick={() => handleQuantity("increment", item?._id)}
                          className="w-7 h-full flex items-center justify-center text-gray-500 hover:bg-gray-100 font-extrabold hover:text-gray-800 transition-colors"
                        >
                          +
                        </button>
                      </div>

                      <button
                        onClick={(e) => handleRemove(e, item?._id)}
                        className="text-gray-400 hover:text-red-600 p-1 text-sm transition-colors"
                        title="Remove item"
                      >
                        <i className="ri-delete-bin-line"></i>
                      </button>
                    </div>
                  </div>

                </div>
              ))}
            </div>
          )}
        </div>

        {/* Bottom checkout sum box */}
        {product?.length > 0 && (
          <div className="p-6 border-t border-gray-100 bg-gray-50/50">
            <OrderSummary />
          </div>
        )}

      </div>
    </div>
  );
};

export default CartModal;
