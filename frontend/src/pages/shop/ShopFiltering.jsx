const ShopFiltering = ({
  filters,
  filterState,
  setFilterState,
  clearFilters,
}) => {
  return (
    <div className="w-full md:w-64 space-y-6 p-6 bg-white border border-gray-100 rounded-2xl shadow-sm md:sticky md:top-24">
      
      {/* Title */}
      <h3 className="text-sm font-black text-gray-800 uppercase tracking-widest pb-3.5 border-b border-gray-100 flex items-center justify-between">
        <span>Filters</span>
        <i className="ri-filter-3-line text-gray-400"></i>
      </h3>

      {/* Category Section */}
      <div className="space-y-3">
        <h4 className="text-[10px] font-extrabold text-gray-400 uppercase tracking-widest">
          Category
        </h4>
        <div className="flex flex-col gap-2.5">
          {filters.categories.map((category) => (
            <label key={category} className="flex items-center text-xs font-bold text-gray-700 hover:text-primary cursor-pointer transition-colors group">
              <input
                type="radio"
                name="category"
                value={category}
                checked={filterState.category === category}
                onChange={(e) =>
                  setFilterState({ ...filterState, category: e.target.value })
                }
                className="w-4 h-4 text-primary focus:ring-primary border-gray-200 focus:ring-2 rounded-full cursor-pointer accent-primary"
              />
              <span className="ml-2.5 capitalize">{category}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Color Section */}
      <div className="space-y-3 pt-2 border-t border-gray-50">
        <h4 className="text-[10px] font-extrabold text-gray-400 uppercase tracking-widest">
          Color
        </h4>
        <div className="flex flex-col gap-2.5">
          {filters.colors.map((color) => (
            <label key={color} className="flex items-center text-xs font-bold text-gray-700 hover:text-primary cursor-pointer transition-colors group">
              <input
                type="radio"
                name="color"
                value={color}
                checked={filterState.color === color}
                onChange={(e) =>
                  setFilterState({ ...filterState, color: e.target.value })
                }
                className="w-4 h-4 text-primary focus:ring-primary border-gray-200 focus:ring-2 rounded-full cursor-pointer accent-primary"
              />
              <span className="ml-2.5 capitalize">{color}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Price Range Section */}
      <div className="space-y-3 pt-2 border-t border-gray-50">
        <h4 className="text-[10px] font-extrabold text-gray-400 uppercase tracking-widest">
          Price Range
        </h4>
        <div className="flex flex-col gap-2.5">
          {filters.priceRanges.map((price) => (
            <label key={price.label} className="flex items-center text-xs font-bold text-gray-700 hover:text-primary cursor-pointer transition-colors group">
              <input
                type="radio"
                name="priceRange"
                value={`${price.min}-${price.max}`}
                checked={filterState.priceRange === `${price.min}-${price.max}`}
                onChange={(e) =>
                  setFilterState({ ...filterState, priceRange: e.target.value })
                }
                className="w-4 h-4 text-primary focus:ring-primary border-gray-200 focus:ring-2 rounded-full cursor-pointer accent-primary"
              />
              <span className="ml-2.5">{price.label}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Action button */}
      <button
        className="w-full py-2.5 px-4 bg-gray-900 hover:bg-black text-white text-xs font-black uppercase tracking-widest rounded-xl transition-all duration-200"
        onClick={clearFilters}
      >
        Clear All Filters
      </button>

    </div>
  );
};

export default ShopFiltering;
