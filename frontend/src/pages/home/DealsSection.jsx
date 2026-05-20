import { Link } from "react-router-dom";
import dealsImg from "../../assets/deals.png";

const DealsSection = () => {
  return (
    <section className="my-16 max-w-[1400px] mx-auto px-4 md:px-8">
      <div className="relative overflow-hidden bg-gradient-to-br from-[#111827] via-[#1f1625] to-[#2e1026] text-white rounded-3xl shadow-2xl py-12 md:py-16 px-6 md:px-12 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        
        {/* Decorative background glows */}
        <div className="absolute top-0 right-0 w-[400px] h-[400px] rounded-full bg-pink-500/10 blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-[300px] h-[300px] rounded-full bg-purple-500/10 blur-3xl pointer-events-none"></div>

        {/* Left Side: Product/Deals Image */}
        <div className="relative flex justify-center items-center lg:order-1 order-2">
          {/* Subtle halo glow behind image */}
          <div className="absolute w-[240px] h-[240px] sm:w-[350px] sm:h-[350px] rounded-full bg-gradient-to-tr from-pink-500/20 to-purple-500/15 blur-2xl pointer-events-none"></div>
          
          <img 
            src={dealsImg} 
            alt="deals products" 
            className="relative z-10 max-h-[350px] sm:max-h-[400px] object-contain filter drop-shadow-[0_20px_40px_rgba(0,0,0,0.3)] transform hover:scale-105 transition-transform duration-500"
          />
        </div>

        {/* Right Side: Content & Countdown */}
        <div className="space-y-6 lg:order-2 order-1 text-center lg:text-left">
          <p className="text-xs md:text-sm font-extrabold text-pink-400 uppercase tracking-widest">
            Get Up To 20% Discount
          </p>
          
          <h2 className="text-3xl md:text-5xl font-black tracking-tight leading-tight">
            Deals of This Month
          </h2>
          
          <p className="text-gray-400 text-sm md:text-base leading-relaxed max-w-lg mx-auto lg:mx-0">
            Our exclusive limited-time offers are here. Grab the season's most coveted styles, accessories, and luxury cosmetics before the countdown ends.
          </p>

          {/* Countdown timer blocks with Glassmorphism */}
          <div className="flex flex-wrap gap-4 justify-center lg:justify-start pt-2">
            
            <div className="bg-white/5 backdrop-blur border border-white/10 h-20 w-20 flex flex-col justify-center items-center rounded-2xl shadow-md transform hover:scale-[1.03] transition-all duration-200">
              <span className="text-2xl font-black tracking-tight text-white">14</span>
              <span className="text-[9px] font-black text-pink-300 uppercase tracking-wider mt-0.5">Days</span>
            </div>

            <div className="bg-white/5 backdrop-blur border border-white/10 h-20 w-20 flex flex-col justify-center items-center rounded-2xl shadow-md transform hover:scale-[1.03] transition-all duration-200">
              <span className="text-2xl font-black tracking-tight text-white">21</span>
              <span className="text-[9px] font-black text-pink-300 uppercase tracking-wider mt-0.5">Hours</span>
            </div>

            <div className="bg-white/5 backdrop-blur border border-white/10 h-20 w-20 flex flex-col justify-center items-center rounded-2xl shadow-md transform hover:scale-[1.03] transition-all duration-200">
              <span className="text-2xl font-black tracking-tight text-white">09</span>
              <span className="text-[9px] font-black text-pink-300 uppercase tracking-wider mt-0.5">Mins</span>
            </div>

            <div className="bg-white/5 backdrop-blur border border-white/10 h-20 w-20 flex flex-col justify-center items-center rounded-2xl shadow-md transform hover:scale-[1.03] transition-all duration-200">
              <span className="text-2xl font-black tracking-tight text-white">28</span>
              <span className="text-[9px] font-black text-pink-300 uppercase tracking-wider mt-0.5">Secs</span>
            </div>

          </div>

          <div className="pt-4">
            <Link 
              to="/shop" 
              className="inline-block px-10 py-4 bg-gradient-to-r from-primary to-primary-dark text-white font-bold text-xs tracking-widest rounded-md hover:shadow-lg hover:shadow-primary/30 transform hover:-translate-y-0.5 transition-all duration-200 uppercase"
            >
              SHOP DEALS NOW
            </Link>
          </div>

        </div>

      </div>
    </section>
  );
};

export default DealsSection;
