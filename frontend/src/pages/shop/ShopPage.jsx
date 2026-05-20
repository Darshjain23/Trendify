import { useEffect, useState } from "react";
import ProductCards from "./ProductCards";
import ShopFiltering from "./ShopFiltering";
import { useFetchAllProductsQuery } from "../../redux/features/products/productsApi";

const filters = {
  categories: ["all", "accessories", "dress", "jewellery", "cosmetics"],
  colors: ["all", "black", "red", "gold", "blue", "silver", "beige", "green"],
  priceRanges: [
    { label: "Under $50", min: 0, max: 50 },
    { label: "$50- $100", min: 50, max: 100 },
    { label: "$100 - $200", min: 100, max: 200 },
    { label: "$200 and above", min: 200, max: Infinity },
  ],
};

const ShopPage = () => {
  const [filterState, setFilterState] = useState({
    category: "all",
    color: "all",
    priceRange: "",
  });

  const [currentPage, setCurrentPage] = useState(1);
  const [ProductsPerPage] = useState(8);

  const { category, color, priceRange } = filterState;
  const [minPrice, maxPrice] = priceRange.split("-").map(Number);

  const {
    data: { products = [], totalPages, totalProducts } = {},
    error,
    isLoading,
  } = useFetchAllProductsQuery({
    category: category !== "all" ? category : "",
    color: color !== "all" ? color : "",
    minPrice: isNaN(minPrice) ? "" : minPrice,
    maxPrice: isNaN(maxPrice) ? "" : maxPrice,
    page: currentPage,
    limit: ProductsPerPage,
  });

  const clearFilters = () => {
    setFilterState({ category: "all", color: "all", priceRange: "" });
  };

  const handlePageChange = (pageNumber) => {
    if (pageNumber > 0 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
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
        <p className="text-gray-500 font-bold text-sm">Failed to load products. Please check connection.</p>
      </div>
    );
  }

  const startProduct = (currentPage - 1) * ProductsPerPage + 1;
  const endProduct = startProduct + products.length - 1;

  return (
    <>
      {/* Premium Shop Banner */}
      <section className="bg-gradient-to-r from-[#fff5f6] to-[#f5f8ff] py-16 border-b border-gray-100 text-center">
        <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight">
          Shop Collection
        </h2>
        <p className="mt-3 text-gray-500 text-sm max-w-md mx-auto leading-relaxed">
          Discover handpicked seasonal trends and timeless classic apparel tailored to absolute perfection.
        </p>
      </section>

      <section className="max-w-[1400px] mx-auto px-4 md:px-8 py-12">
        <div className="flex flex-col md:flex-row md:gap-12 gap-8 items-start">
          
          {/* Filters Sidebar */}
          <ShopFiltering
            filters={filters}
            filterState={filterState}
            setFilterState={setFilterState}
            clearFilters={clearFilters}
          />
          
          {/* Products Grid Section */}
          <div className="flex-1 w-full">
            <h3 className="text-xs font-black text-gray-400 uppercase tracking-widest mb-6">
              Showing {startProduct} - {endProduct} of {totalProducts} products
            </h3>
            
            <ProductCards products={products} />

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="mt-12 flex justify-center items-center gap-2">
                <button
                  disabled={currentPage === 1}
                  onClick={() => handlePageChange(currentPage - 1)}
                  className="px-4 py-2 border border-gray-200 rounded-lg text-xs font-bold uppercase tracking-wider bg-white text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none transition-all duration-200"
                >
                  Prev
                </button>
                
                {[...Array(totalPages)].map((_, index) => (
                  <button
                    key={index}
                    onClick={() => handlePageChange(index + 1)}
                    className={`h-9 w-9 flex items-center justify-center border rounded-lg text-xs font-black transition-all duration-200 ${
                      currentPage === index + 1
                        ? "bg-primary border-primary text-white shadow-md shadow-primary/25"
                        : "bg-white border-gray-200 text-gray-700 hover:bg-gray-50"
                    }`}
                  >
                    {index + 1}
                  </button>
                ))}

                <button
                  disabled={currentPage === totalPages}
                  onClick={() => handlePageChange(currentPage + 1)}
                  className="px-4 py-2 border border-gray-200 rounded-lg text-xs font-bold uppercase tracking-wider bg-white text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none transition-all duration-200"
                >
                  Next
                </button>
              </div>
            )}
          </div>

        </div>
      </section>
    </>
  );
};

export default ShopPage;
