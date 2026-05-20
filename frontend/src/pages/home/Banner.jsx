import { Link } from "react-router-dom";
import bannerImg from "../../assets/header.png";

const Banner = () => {
  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-[#fff5f6] via-[#ffffff] to-[#f5f8ff] py-16 lg:py-24 border-b border-gray-100">
      
      {/* Premium Decorative Blur Circles */}
      <div className="absolute top-10 left-10 w-72 h-72 rounded-full bg-pink-200/30 blur-3xl pointer-events-none animate-pulse duration-[6000ms]"></div>
      <div className="absolute bottom-10 right-10 w-96 h-96 rounded-full bg-indigo-100/40 blur-3xl pointer-events-none"></div>

      <div className="max-w-[1400px] mx-auto px-4 md:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
        
        {/* Left Side: Content */}
        <div className="space-y-6 text-center lg:text-left max-w-xl mx-auto lg:mx-0">
          
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-pink-50 border border-pink-100 text-xs font-bold tracking-widest text-primary uppercase animate-bounce-slow">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
            </span>
            Up to 20% discount
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-extrabold text-gray-900 leading-tight">
            Redefine <br />
            Your <span className="font-serif italic font-medium text-primary">Everyday</span> <br />
            Fashion
          </h1>

          <p className="text-gray-500 text-sm sm:text-base leading-relaxed">
            Discover a curated collection of premium apparel, designer jewelry, and luxury cosmetics tailored to reflect your unique persona. Elevate your everyday style effortlessly.
          </p>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
            <Link 
              to="/shop" 
              className="w-full sm:w-auto text-center px-8 py-3.5 bg-gradient-to-r from-primary to-primary-dark text-white font-bold text-xs tracking-widest rounded-md hover:shadow-lg hover:shadow-primary/20 transform hover:-translate-y-0.5 transition-all duration-200 uppercase"
            >
              EXPLORE NOW
            </Link>
            <Link 
              to="/shop" 
              className="w-full sm:w-auto text-center px-8 py-3.5 bg-white border border-gray-200 text-gray-800 font-bold text-xs tracking-widest rounded-md hover:bg-gray-50 transform hover:-translate-y-0.5 transition-all duration-200 uppercase"
            >
              New Arrivals
            </Link>
          </div>

        </div>

        {/* Right Side: Image with Decorative Backdrops */}
        <div className="relative flex justify-center items-center">
          
          {/* Subtle Glow Ring behind Image */}
          <div className="absolute w-[280px] h-[280px] sm:w-[400px] sm:h-[400px] rounded-full bg-gradient-to-tr from-pink-100 to-indigo-100 blur-2xl opacity-60 -z-10"></div>
          
          <div className="relative max-w-[420px] lg:max-w-[480px] xl:max-w-[540px] transform hover:scale-[1.02] transition-transform duration-500">
            <img 
              src={bannerImg} 
              alt="fashion model" 
              className="w-full object-contain filter drop-shadow-[0_20px_50px_rgba(0,0,0,0.06)]"
            />
            
            {/* Float Badge 1 */}
            <div className="absolute top-1/4 -left-6 bg-white/80 backdrop-blur px-4 py-2.5 rounded-lg shadow-md border border-white/50 hidden sm:flex items-center gap-3 animate-float">
              <div className="h-8 w-8 bg-pink-100 rounded-full flex items-center justify-center text-primary">
                <i className="ri-heart-fill"></i>
              </div>
              <div>
                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Top Brands</p>
                <p className="text-xs font-extrabold text-gray-800">100% Original</p>
              </div>
            </div>

            {/* Float Badge 2 */}
            <div className="absolute bottom-12 -right-6 bg-white/80 backdrop-blur px-4 py-2.5 rounded-lg shadow-md border border-white/50 hidden sm:flex items-center gap-3 animate-float-delayed">
              <div className="h-8 w-8 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600">
                <i className="ri-sparkling-fill"></i>
              </div>
              <div>
                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Trending</p>
                <p className="text-xs font-extrabold text-gray-800">New Arrivals</p>
              </div>
            </div>

          </div>

        </div>

      </div>

      {/* Embedded CSS for custom keyframes like floating and bounce-slow */}
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-8px); }
        }
        @keyframes float-delayed {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(8px); }
        }
        .animate-float {
          animation: float 4s ease-in-out infinite;
        }
        .animate-float-delayed {
          animation: float-delayed 4.5s ease-in-out infinite;
        }
        .animate-bounce-slow {
          animation: bounce 3s infinite;
        }
      `}</style>
    </div>
  );
};

export default Banner;
