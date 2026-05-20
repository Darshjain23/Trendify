import { Link } from "react-router-dom";
import instaImg1 from "../../assets/instagram-1.jpg";
import instaImg2 from "../../assets/instagram-2.jpg";
import instaImg3 from "../../assets/instagram-3.jpg";
import instaImg4 from "../../assets/instagram-4.jpg";
import instaImg5 from "../../assets/instagram-5.jpg";
import instaImg6 from "../../assets/instagram-6.jpg";

const Footer = () => {
  return (
    <footer className="bg-[#0f172a] text-gray-400 pt-16 border-t border-gray-900">
      
      {/* Upper Footer Grid */}
      <div className="max-w-[1400px] mx-auto px-4 md:px-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 pb-12">
        
        {/* Col 1: Brand & Contact */}
        <div className="space-y-4">
          <Link to="/" className="flex items-center gap-2 select-none">
            <svg width="30" height="30" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <linearGradient id="logo-grad-footer" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#ff3f6c" />
                  <stop offset="100%" stopColor="#ed3849" />
                </linearGradient>
              </defs>
              <path d="M20 20C20 20 35 15 50 35C65 55 80 80 80 80C80 80 65 85 50 65C35 45 20 20 20 20Z" fill="url(#logo-grad-footer)" />
              <path d="M80 20C80 20 65 15 50 35C35 55 20 80 20 80C20 80 35 85 50 65C65 45 80 20 80 20Z" fill="url(#logo-grad-footer)" opacity="0.8" />
            </svg>
            <span className="font-black text-lg tracking-wider text-white">
              TRENDIFY
            </span>
          </Link>
          
          <p className="text-xs text-gray-400 leading-relaxed max-w-sm">
            Premium style at your fingertips. Discover curated collections and elevate your everyday wardrobe with our handpicked designer pieces.
          </p>

          <div className="space-y-2 pt-2 text-xs">
            <p className="flex items-center gap-2.5">
              <i className="ri-map-pin-2-line text-primary text-base"></i>
              <span>123, London Bridge Street, UK</span>
            </p>
            <p className="flex items-center gap-2.5">
              <i className="ri-mail-line text-primary text-base"></i>
              <span>support@trendify.com</span>
            </p>
            <p className="flex items-center gap-2.5">
              <i className="ri-phone-line text-primary text-base"></i>
              <span>+91 98567 89234</span>
            </p>
          </div>
        </div>

        {/* Col 2: Company */}
        <div className="space-y-4">
          <h4 className="text-white text-xs font-black tracking-widest uppercase">
            Company
          </h4>
          <ul className="flex flex-col gap-2.5 text-xs font-bold">
            <li>
              <Link to="/" className="hover:text-white transition-colors duration-200">Home</Link>
            </li>
            <li>
              <a href="#" className="hover:text-white transition-colors duration-200">About Us</a>
            </li>
            <li>
              <a href="#" className="hover:text-white transition-colors duration-200">Work With Us</a>
            </li>
            <li>
              <Link to="/search" className="hover:text-white transition-colors duration-200">Our Blogs</Link>
            </li>
            <li>
              <a href="#" className="hover:text-white transition-colors duration-200">Terms & Conditions</a>
            </li>
          </ul>
        </div>

        {/* Col 3: Useful Links */}
        <div className="space-y-4">
          <h4 className="text-white text-xs font-black tracking-widest uppercase">
            Useful Links
          </h4>
          <ul className="flex flex-col gap-2.5 text-xs font-bold">
            <li>
              <a href="#" className="hover:text-white transition-colors duration-200">Help & Support</a>
            </li>
            <li>
              <a href="#" className="hover:text-white transition-colors duration-200">Track My Order</a>
            </li>
            <li>
              <Link to="/shop" className="hover:text-white transition-colors duration-200">Men Collection</Link>
            </li>
            <li>
              <Link to="/categories/dress" className="hover:text-white transition-colors duration-200">Women Apparel</Link>
            </li>
            <li>
              <Link to="/categories/accessories" className="hover:text-white transition-colors duration-200">Accessories</Link>
            </li>
          </ul>
        </div>

        {/* Col 4: Instagram Grid */}
        <div className="space-y-4">
          <h4 className="text-white text-xs font-black tracking-widest uppercase">
            Instagram
          </h4>
          <div className="grid grid-cols-3 gap-2.5">
            {[instaImg1, instaImg2, instaImg3, instaImg4, instaImg5, instaImg6].map((img, idx) => (
              <a 
                key={idx} 
                href="https://instagram.com" 
                target="_blank" 
                rel="noreferrer"
                className="block aspect-square rounded-lg overflow-hidden bg-gray-800 border border-gray-800 hover:border-gray-700 transition-all duration-300 group"
              >
                <img 
                  src={img} 
                  alt="instagram highlight" 
                  className="h-full w-full object-cover group-hover:scale-105 group-hover:brightness-110 transition-all duration-300"
                />
              </a>
            ))}
          </div>
        </div>

      </div>

      {/* Bottom copyright bar */}
      <div className="bg-[#0b0f19] border-t border-gray-900/60 py-6 text-center text-[10px] font-bold text-gray-500 tracking-wider">
        Copyright &copy; {new Date().getFullYear()} Trendify. Developed by Darsh Jain. All rights reserved.
      </div>

    </footer>
  );
};

export default Footer;
