import { Link, useParams } from "react-router-dom";
import RatingStars from "../../../components/rating/RatingStars";
import { useDispatch, useSelector } from "react-redux";
import { useFetchProductByIdQuery } from "../../../redux/features/products/productsApi";
import { addToCart } from "../../../redux/features/cart/cartSlice";
import { addToWishlist, removeFromWishlist } from "../../../redux/features/wishlist/wishlistSlice";
import ReviewsCard from "../reviews/ReviewsCard";

const SingleProduct = () => {
  const { _id } = useParams();
  const dispatch = useDispatch();
  const { data, error, isLoading } = useFetchProductByIdQuery(_id);
  const wishlistProducts = useSelector((state) => state.wishlist.products);

  const singleProduct = data?.product || {};
  const productReviews = data?.reviews || [];

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

  if (isLoading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center space-y-4">
        <i className="ri-error-warning-line text-4xl text-red-500"></i>
        <p className="text-gray-500 font-bold text-sm">Failed to load product details.</p>
      </div>
    );
  }

  const hasDiscount = singleProduct?.oldPrice && singleProduct?.oldPrice > singleProduct?.price;
  const discountPercentage = hasDiscount
    ? Math.round(((singleProduct.oldPrice - singleProduct.price) / singleProduct.oldPrice) * 100)
    : 0;

  const isWishlisted = wishlistProducts.some((p) => p._id === singleProduct?._id);

  return (
    <>
      {/* Breadcrumb section */}
      <section className="bg-gray-50 border-b border-gray-100 py-6">
        <div className="max-w-[1400px] mx-auto px-4 md:px-8 flex items-center gap-2.5 text-[10px] font-black text-gray-400 uppercase tracking-widest">
          <Link to="/" className="hover:text-primary transition-colors">Home</Link>
          <i className="ri-arrow-right-s-line text-xs"></i>
          <Link to="/shop" className="hover:text-primary transition-colors">Shop</Link>
          <i className="ri-arrow-right-s-line text-xs"></i>
          <span className="text-gray-600 truncate">{singleProduct?.name}</span>
        </div>
      </section>

      {/* Main product showcase section */}
      <section className="max-w-[1400px] mx-auto px-4 md:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
          
          {/* Left: Product Image */}
          <div className="aspect-[3/4] rounded-2xl overflow-hidden border border-gray-100 shadow-md bg-gray-50 max-h-[550px] w-full flex justify-center">
            <img 
              src={singleProduct?.image} 
              alt={singleProduct?.name} 
              className="h-full w-full object-cover transform hover:scale-[1.02] transition-transform duration-500" 
            />
          </div>

          {/* Right: Product Meta Info */}
          <div className="space-y-6">
            
            <div className="space-y-3">
              <p className="text-[10px] font-extrabold text-primary uppercase tracking-widest">
                {singleProduct?.category} Collection
              </p>
              
              <h3 className="text-2xl md:text-3xl font-black text-gray-800 tracking-tight leading-tight">
                {singleProduct?.name}
              </h3>

              {/* Rating stars */}
              <div className="flex items-center gap-2 pt-1">
                <RatingStars rating={singleProduct?.rating} />
                <span className="text-xs text-gray-400 font-bold">
                  ({singleProduct?.rating || 0} reviews)
                </span>
              </div>
            </div>

            {/* Price display */}
            <div className="flex items-baseline gap-3 pt-2">
              <span className="text-2xl font-black text-gray-900">
                ${singleProduct?.price}
              </span>
              {hasDiscount && (
                <>
                  <span className="text-sm text-gray-400 line-through font-semibold">
                    ${singleProduct?.oldPrice}
                  </span>
                  <span className="text-xs text-primary font-black uppercase tracking-wide">
                    ({discountPercentage}% OFF)
                  </span>
                </>
              )}
            </div>

            {/* Description box */}
            <p className="text-sm text-gray-500 leading-relaxed border-y border-gray-100 py-5">
              {singleProduct?.description || "Experience the perfect blend of fashion, utility, and premium craftsmanship with Trendify's exclusive designer selection."}
            </p>

            {/* Spec lines */}
            <div className="space-y-3 pt-2 text-xs">
              <p className="flex items-center gap-2.5">
                <span className="w-20 text-gray-400 font-bold uppercase tracking-wider">Category</span>
                <span className="text-gray-800 font-extrabold capitalize">{singleProduct?.category}</span>
              </p>
              <p className="flex items-center gap-2.5">
                <span className="w-20 text-gray-400 font-bold uppercase tracking-wider">Color</span>
                <span className="text-gray-800 font-extrabold capitalize">{singleProduct?.color || "N/A"}</span>
              </p>
            </div>

            {/* Action Cart & Wishlist Trigger */}
            <div className="pt-6 flex flex-wrap items-center gap-4">
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  handleAddToCart(singleProduct);
                }} 
                className="flex-1 md:flex-none px-10 py-4 bg-gradient-to-r from-primary to-primary-dark text-white font-extrabold text-xs tracking-widest rounded-xl hover:shadow-lg hover:shadow-primary/20 transform hover:-translate-y-0.5 transition-all duration-200 uppercase flex items-center justify-center gap-2"
              >
                <i className="ri-shopping-bag-3-line text-sm"></i>
                <span>Add to Bag</span>
              </button>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleAddToWishlist(singleProduct);
                }}
                className={`p-4 border rounded-xl flex items-center justify-center transition-all duration-200 shrink-0 ${
                  isWishlisted
                    ? "border-pink-200 bg-pink-50/50 text-primary"
                    : "border-gray-200 text-gray-500 hover:text-gray-800 hover:bg-gray-50"
                }`}
                title={isWishlisted ? "Remove from Wishlist" : "Add to Wishlist"}
              >
                <i className={`${isWishlisted ? "ri-heart-fill" : "ri-heart-line"} text-lg`}></i>
              </button>
            </div>

          </div>

        </div>
      </section>

      {/* Reviews section */}
      <section className="max-w-[1400px] mx-auto px-4 md:px-8 border-t border-gray-100 py-8">
        <ReviewsCard productReviews={productReviews} />
      </section>
    </>
  );
};

export default SingleProduct;
