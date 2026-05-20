import { Link } from "react-router-dom";
import RatingStars from "../../components/rating/RatingStars";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../redux/features/cart/cartSlice";
import { addToWishlist, removeFromWishlist } from "../../redux/features/wishlist/wishlistSlice";

const ProductCards = ({ products }) => {
  const dispatch = useDispatch();
  const wishlistProducts = useSelector((state) => state.wishlist.products);

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
  };

  const handleAddToWishlist = (product) => {
    const isExist = wishlistProducts.find((p) => p._id === product._id);
    if (isExist) {
      dispatch(removeFromWishlist({ _id: product._id }));
    } else {
      dispatch(addToWishlist(product));
    }
  };

  return (
    <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
      {products?.map((product, index) => {
        // Calculate discount percentage if oldPrice is present
        const hasDiscount = product?.oldPrice && product?.oldPrice > product?.price;
        const discountPercentage = hasDiscount
          ? Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)
          : 0;

        const isWishlisted = wishlistProducts.some((p) => p._id === product._id);

        return (
          <div 
            key={index} 
            className="group relative flex flex-col bg-white rounded-2xl overflow-hidden border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
          >
            {/* Image Section */}
            <div className="relative overflow-hidden aspect-[3/4] bg-gray-50">
              <Link to={`/shop/${product?._id}`} className="block h-full w-full">
                <img
                  src={product?.image}
                  alt={product?.name || "product image"}
                  className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </Link>
              
              {/* Quick Action Buttons (Mobile: always visible, Desktop: slides down on hover) */}
              <div className="absolute top-3.5 right-3.5 z-10 flex flex-col gap-2 md:opacity-0 md:translate-y-2 md:group-hover:opacity-100 md:group-hover:translate-y-0 transition-all duration-300">
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    handleAddToCart(product);
                  }}
                  className="h-9 w-9 bg-white/95 backdrop-blur text-gray-800 hover:bg-primary hover:text-white rounded-full flex items-center justify-center shadow-md border border-gray-100 transition-colors"
                  title="Add to Bag"
                >
                  <i className="ri-shopping-bag-line text-sm"></i>
                </button>

                <button
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    handleAddToWishlist(product);
                  }}
                  className={`h-9 w-9 bg-white/95 backdrop-blur rounded-full flex items-center justify-center shadow-md border border-gray-100 transition-colors ${
                    isWishlisted 
                      ? "text-primary hover:bg-gray-50" 
                      : "text-gray-800 hover:bg-primary hover:text-white"
                  }`}
                  title={isWishlisted ? "Remove from Wishlist" : "Add to Wishlist"}
                >
                  <i className={isWishlisted ? "ri-heart-fill text-sm" : "ri-heart-line text-sm"}></i>
                </button>
              </div>

              {/* Discount Tag on top left */}
              {hasDiscount && (
                <div className="absolute top-3.5 left-3.5 bg-primary text-white text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded shadow-sm">
                  Sale
                </div>
              )}
            </div>

            {/* Details Section */}
            <div className="p-4 flex-1 flex flex-col justify-between">
              <div>
                {/* Category Tag */}
                <p className="text-[10px] text-gray-400 font-extrabold uppercase tracking-widest mb-1">
                  {product?.category || "Apparel"}
                </p>
                
                {/* Product Name */}
                <h4 className="text-sm font-bold text-gray-800 line-clamp-1 group-hover:text-primary transition-colors mb-1.5">
                  <Link to={`/shop/${product?._id}`}>
                    {product?.name}
                  </Link>
                </h4>
              </div>

              <div>
                {/* Price Information */}
                <div className="flex items-center flex-wrap mb-2">
                  <span className="text-sm font-extrabold text-gray-900">
                    ${product?.price}
                  </span>
                  {hasDiscount && (
                    <>
                      <span className="text-xs text-gray-400 line-through ml-2 font-medium">
                        ${product?.oldPrice}
                      </span>
                      <span className="text-[10px] text-primary font-black ml-2 uppercase tracking-wide">
                        ({discountPercentage}% OFF)
                      </span>
                    </>
                  )}
                </div>

                {/* Rating stars */}
                <div className="flex items-center gap-1.5 pt-1 border-t border-gray-50 mt-1">
                  <RatingStars rating={product?.rating} />
                  <span className="text-[10px] text-gray-400 font-bold">
                    ({product?.rating || 0})
                  </span>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ProductCards;
