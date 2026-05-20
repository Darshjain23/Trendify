import { Link } from "react-router-dom";
import category1 from "../../assets/category-1.jpg";
import category2 from "../../assets/category-2.jpg";
import category3 from "../../assets/category-3.jpg";
import category4 from "../../assets/category-4.jpg";

const Categories = () => {
  const categories = [
    {
      name: "Accessories",
      path: "accessories",
      image: category1,
      tagline: "Finish your look",
    },
    {
      name: "Dress Collection",
      path: "dress",
      image: category2,
      tagline: "Elegant & modern",
    },
    {
      name: "Jewellery",
      path: "jewellery",
      image: category3,
      tagline: "Timeless pieces",
    },
    {
      name: "Cosmetics",
      path: "cosmetics",
      image: category4,
      tagline: "Enhance your glow",
    },
  ];

  return (
    <section className="py-16 bg-white max-w-[1400px] mx-auto px-4 md:px-8">
      
      {/* Section Header */}
      <div className="text-center mb-12">
        <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">
          Shop By Category
        </h2>
        <p className="mt-3 text-gray-500 text-sm max-w-md mx-auto">
          Explore our curated selections crafted for style, comfort, and timeless elegance.
        </p>
      </div>

      {/* Grid of Categories */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
        {categories.map((category) => (
          <Link
            key={category.name}
            to={`/categories/${category.path}`}
            className="group relative block aspect-[4/5] overflow-hidden rounded-2xl bg-gray-100 border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
          >
            {/* Image */}
            <img
              src={category.image}
              alt={category.name}
              className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-500"
            />
            
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent transition-opacity duration-300"></div>
            
            {/* Content Overlay */}
            <div className="absolute bottom-0 left-0 right-0 p-5 text-white">
              <p className="text-[10px] font-bold text-pink-300 uppercase tracking-widest mb-1.5 opacity-80 group-hover:opacity-100 transition-opacity">
                {category.tagline}
              </p>
              <h4 className="text-lg font-extrabold tracking-wide uppercase">
                {category.name}
              </h4>
              
              <div className="mt-3 flex items-center gap-1.5 text-xs font-bold text-white opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
                <span>Shop Now</span>
                <i className="ri-arrow-right-line"></i>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default Categories;
