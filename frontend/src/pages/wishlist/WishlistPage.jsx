import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { removeFromWishlist, clearWishlist } from "../../redux/features/wishlist/wishlistSlice";
import { addToCart } from "../../redux/features/cart/cartSlice";

const WishlistPage = () => {
  const wishlistProducts = useSelector((state) => state.wishlist.products);
  const dispatch = useDispatch();

  const handleRemove = (e, productId) => {
    e.preventDefault();
    dispatch(removeFromWishlist({ _id: productId }));
  };

  const handleClear = () => {
    dispatch(clearWishlist());
  };

  const handleMoveToCart = (e, product) => {
    e.preventDefault();
    dispatch(addToCart(product));
    dispatch(removeFromWishlist({ _id: product._id }));
  };

  return (
    <div className="min-h-screen bg-white pb-20">
      
      {/* Top Header */}
      <section className="bg-gray-50 border-b border-gray-200 py-12">
        <div className="max-w-[1400px] mx-auto px-4 md:px-8">
          <h1 className="text-2xl font-bold text-gray-900">
            My Wishlist
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            You have {wishlistProducts?.length || 0} item{wishlistProducts?.length !== 1 ? "s" : ""} saved in your wishlist
          </p>
        </div>
      </section>

      {/* Main Container */}
      <section className="max-w-[1400px] mx-auto px-4 md:px-8 py-10">
        {wishlistProducts?.length === 0 ? (
          <div className="max-w-md mx-auto text-center py-16 space-y-4">
            <div className="h-16 w-16 bg-gray-100 text-gray-400 rounded-full flex items-center justify-center text-2xl mx-auto">
              <i className="ri-heart-line"></i>
            </div>
            <div className="space-y-1">
              <h2 className="text-base font-semibold text-gray-800">Your wishlist is empty</h2>
              <p className="text-sm text-gray-500">
                Tap the heart on items you like to save them here.
              </p>
            </div>
            <Link
              to="/shop"
              className="inline-block mt-2 px-6 py-2.5 bg-primary hover:bg-primary-dark text-white text-xs font-semibold uppercase tracking-wider rounded transition-colors"
            >
              Browse Shop
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            
            {/* Toolbar */}
            <div className="flex justify-end">
              <button
                onClick={handleClear}
                className="px-4 py-2 border border-gray-300 hover:bg-gray-50 text-gray-700 text-xs font-semibold rounded transition-colors"
              >
                Clear Wishlist
              </button>
            </div>

            {/* Grid list of wishlist items */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
              {wishlistProducts.map((product) => {
                const hasDiscount = product?.oldPrice && product?.oldPrice > product?.price;
                return (
                  <div key={product._id} className="group relative bg-white border border-gray-200 rounded-lg overflow-hidden flex flex-col justify-between hover:shadow-sm transition-shadow">
                    
                    {/* Remove Trigger */}
                    <button
                      onClick={(e) => handleRemove(e, product._id)}
                      className="absolute top-2.5 right-2.5 bg-white/90 hover:bg-red-50 text-gray-500 hover:text-red-600 h-7 w-7 rounded-full flex items-center justify-center shadow-sm border border-gray-200 z-10 transition-colors"
                      title="Remove"
                    >
                      <i className="ri-close-line text-base"></i>
                    </button>

                    {/* Image Area */}
                    <Link to={`/shop/${product._id}`} className="block aspect-[3/4] bg-gray-50 overflow-hidden shrink-0">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="h-full w-full object-cover group-hover:scale-[1.02] transition-transform duration-300"
                      />
                    </Link>

                    {/* Information Area */}
                    <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                      
                      <div className="space-y-1">
                        <p className="text-[10px] font-semibold text-primary uppercase tracking-wider">
                          {product.category}
                        </p>
                        <h4 className="text-xs font-medium text-gray-800 truncate">
                          {product.name}
                        </h4>
                      </div>

                      <div className="space-y-3">
                        {/* Price Row */}
                        <div className="flex items-baseline gap-2 text-xs">
                          <span className="font-semibold text-gray-900">${product.price}</span>
                          {hasDiscount && (
                            <span className="text-[10px] text-gray-400 line-through">
                              ${product.oldPrice}
                            </span>
                          )}
                        </div>

                        {/* Add to cart option */}
                        <button
                          onClick={(e) => handleMoveToCart(e, product)}
                          className="w-full py-2 bg-gray-900 hover:bg-black text-white text-xs font-semibold rounded transition-colors"
                        >
                          Add to Bag
                        </button>
                      </div>

                    </div>

                  </div>
                );
              })}
            </div>

          </div>
        )}
      </section>
      
    </div>
  );
};

export default WishlistPage;
