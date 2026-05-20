import blogsData from "../../data/blogs.json";

const Blogs = () => {
  return (
    <section className="py-16 bg-[#f9faff] rounded-3xl max-w-[1400px] mx-auto px-4 md:px-8 mb-16 border border-gray-100">
      
      {/* Section Header */}
      <div className="text-center mb-12">
        <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">
          Latest From Blog
        </h2>
        <p className="mt-3 text-gray-500 text-sm max-w-md mx-auto">
          Stay updated with the latest trends, lifestyle advice, and exclusive collection previews.
        </p>
      </div>

      {/* Grid of Blog posts */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {blogsData?.map((blog, index) => (
          <div
            key={index}
            className="group flex flex-col bg-white rounded-2xl overflow-hidden border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer"
          >
            {/* Image Wrapper */}
            <div className="relative overflow-hidden aspect-[16/10] bg-gray-50">
              <img 
                src={blog?.imageUrl} 
                alt={blog?.title || "blog post"} 
                className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>

            {/* Content Details */}
            <div className="p-5 flex-1 flex flex-col justify-between">
              <div>
                {/* Category/Subtitle tag */}
                <p className="text-[10px] font-extrabold text-primary uppercase tracking-widest mb-1.5">
                  {blog?.subtitle || "Fashion"}
                </p>
                
                {/* Blog Title */}
                <h4 className="text-sm font-bold text-gray-800 leading-snug line-clamp-2 group-hover:text-primary transition-colors mb-4">
                  {blog?.title}
                </h4>
              </div>

              {/* Date & Action Row */}
              <div className="flex items-center justify-between text-[11px] font-bold border-t border-gray-50 pt-3.5 mt-auto">
                <span className="text-gray-400">
                  {blog?.date}
                </span>
                
                <span className="text-primary hover:text-primary-dark transition-colors flex items-center gap-1">
                  <span>Read More</span>
                  <i className="ri-arrow-right-line group-hover:translate-x-0.5 transition-transform"></i>
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Blogs;
