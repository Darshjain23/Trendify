import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useLocation } from "react-router-dom";
import CartModal from "../../pages/shop/CartModal";
import avatarImg from "../../assets/avatar.png";
import { useLogoutUserMutation } from "../../redux/features/auth/authApi";
import { logout } from "../../redux/features/auth/authSlice";

const Navbar = () => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDropDownOpen, setIsDropDownOpen] = useState(false);
  
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const products = useSelector((state) => state.cart.products);
  const wishlistProducts = useSelector((state) => state.wishlist.products);
  const [logoutUser] = useLogoutUserMutation();
  const navigate = useNavigate();
  const location = useLocation();

  const handleCartToggle = () => {
    setIsCartOpen(!isCartOpen);
  };

  const handDropDownToggle = () => {
    setIsDropDownOpen(!isDropDownOpen);
  };

  // Sync navbar search input value with the URL search query parameter
  useEffect(() => {
    if (location.pathname === "/search") {
      const query = new URLSearchParams(location.search).get("query") || "";
      setSearchQuery(query);
    } else {
      setSearchQuery("");
    }
  }, [location]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    navigate(`/search?query=${encodeURIComponent(searchQuery)}`);
  };

  // admin dropdown menus
  const adminDropDownMenus = [
    { label: "Dashboard", path: "/dashboard/admin" },
    { label: "Manage Items", path: "/dashboard/manage-products" },
    { label: "All Orders", path: "/dashboard/manage-orders" },
    { label: "Add-New Post", path: "/dashboard/add-new-post" },
  ];

  // User dropdown menus
  const userDropDownMenus = [
    { label: "Dashboard", path: "/dashboard" },
    { label: "Profile", path: "/dashboard/profile" },
    { label: "Payments", path: "/dashboard/payments" },
    { label: "Orders", path: "/dashboard/orders" },
  ];

  const dropdownMenus =
    user?.role === "admin" ? [...adminDropDownMenus] : [...userDropDownMenus];

  const handleLogout = async () => {
    try {
      await logoutUser().unwrap();
      dispatch(logout());
      navigate("/");
    } catch (error) {
      console.error("Failed to log out", error);
    }
  };

  const handleNavClick = (path, e) => {
    if (path === "/contact") {
      e.preventDefault();
      if (location.pathname === "/") {
        const footer = document.querySelector("footer");
        footer?.scrollIntoView({ behavior: "smooth" });
      } else {
        navigate("/?scroll=footer");
      }
      setIsMobileMenuOpen(false);
    } else if (path === "/pages") {
      e.preventDefault();
      if (location.pathname === "/") {
        const blogs = document.getElementById("blogs");
        blogs?.scrollIntoView({ behavior: "smooth" });
      } else {
        navigate("/?scroll=blogs");
      }
      setIsMobileMenuOpen(false);
    }
  };

  // Restored original navigations: Home, Shop, Pages, Contact
  const navigations = [
    { name: "Home", path: "/" },
    { name: "Shop", path: "/shop" },
    { name: "Pages", path: "/pages" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <header className="sticky top-0 left-0 right-0 bg-white border-b border-gray-100 shadow-sm z-50 transition-all duration-300">
      <nav className="max-w-[1440px] mx-auto px-4 md:px-8 h-20 flex items-center justify-between gap-4">
        
        {/* Left: Mobile Hamburger & Logo */}
        <div className="flex items-center gap-3">
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} 
            className="md:hidden text-2xl text-gray-700 focus:outline-none hover:text-primary transition-colors"
          >
            <i className={isMobileMenuOpen ? "ri-close-line" : "ri-menu-line"}></i>
          </button>
          
          <Link to="/" className="flex items-center gap-2 select-none shrink-0">
            <svg width="34" height="34" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <linearGradient id="logo-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#ff3f6c" />
                  <stop offset="100%" stopColor="#ed3849" />
                </linearGradient>
              </defs>
              <path d="M20 20C20 20 35 15 50 35C65 55 80 80 80 80C80 80 65 85 50 65C35 45 20 20 20 20Z" fill="url(#logo-grad)" />
              <path d="M80 20C80 20 65 15 50 35C35 55 20 80 20 80C20 80 35 85 50 65C65 45 80 20 80 20Z" fill="url(#logo-grad)" opacity="0.8" />
            </svg>
            <span className="font-black text-xl tracking-wider bg-gradient-to-r from-pink-500 to-red-500 bg-clip-text text-transparent">
              TRENDIFY
            </span>
          </Link>
        </div>

        {/* Middle-Left: Navigations Links (Desktop) */}
        <ul className="hidden md:flex items-center gap-8 h-full shrink-0">
          {navigations.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <li key={item.name} className="relative h-full flex items-center">
                <Link
                  to={item.path}
                  onClick={(e) => {
                    if (item.path === "/contact" || item.path === "/pages") {
                      handleNavClick(item.path, e);
                    }
                  }}
                  className={`text-sm tracking-wide font-semibold px-1 transition-colors duration-200 ${
                    isActive ? "text-primary" : "text-gray-800 hover:text-primary"
                  }`}
                >
                  {item.name}
                </Link>
                {isActive && (
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-primary rounded-t-full" />
                )}
              </li>
            );
          })}
        </ul>

        {/* Middle-Right: Search Input */}
        <form onSubmit={handleSearchSubmit} className="hidden sm:flex items-center flex-1 max-w-md relative">
          <i className="ri-search-line absolute left-4 text-gray-400 text-lg"></i>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search for products, brands and more"
            className="w-full pl-12 pr-4 py-2 bg-gray-100 hover:bg-gray-200/70 focus:bg-white border border-transparent focus:border-gray-200 rounded-md text-sm text-gray-800 placeholder-gray-400 outline-none transition-all duration-300"
          />
        </form>

        {/* Right: Action Icons */}
        <div className="flex items-center gap-4 md:gap-6">
          
          {/* Mobile Search Trigger Icon */}
          <Link to="/search" className="sm:hidden text-2xl text-gray-700 hover:text-primary transition-colors">
            <i className="ri-search-line"></i>
          </Link>

          {/* User Profile Action */}
          <div className="relative">
            <div 
              onClick={handDropDownToggle} 
              className="flex flex-col items-center justify-center cursor-pointer group text-gray-700 hover:text-primary transition-colors select-none"
            >
              {user && user.profileImage ? (
                <img
                  src={user.profileImage}
                  alt="profile"
                  className="w-5 h-5 rounded-full object-cover border border-gray-200 group-hover:border-primary transition-colors"
                />
              ) : (
                <i className="ri-user-line text-lg group-hover:scale-110 transition-transform"></i>
              )}
              <span className="text-[10px] font-bold tracking-wider mt-1 uppercase hidden md:inline">Profile</span>
            </div>
            
            {/* User Dropdown Menu */}
            {isDropDownOpen && (
              <div className="absolute right-0 mt-3 w-64 bg-white border border-gray-100 rounded-2xl shadow-xl z-50 p-6 animate-in fade-in slide-in-from-top-2 duration-200">
                {user ? (
                  <>
                    <div className="mb-4">
                      <p className="text-xs text-gray-400 font-semibold tracking-wide mb-1">Signed in as</p>
                      <p className="text-sm font-extrabold text-slate-800 truncate leading-snug">{user.email || user.username}</p>
                    </div>
                    <div className="border-t border-gray-100/80 my-3"></div>
                    <div className="flex flex-col gap-3.5 mb-4">
                      {dropdownMenus.map((menu, index) => (
                        <Link
                          key={index}
                          to={menu.path}
                          onClick={() => setIsDropDownOpen(false)}
                          className="text-sm font-bold text-slate-600 hover:text-primary transition-colors block"
                        >
                          {menu.label}
                        </Link>
                      ))}
                    </div>
                    <div className="border-t border-gray-100/80 my-3"></div>
                    <button
                      onClick={() => {
                        setIsDropDownOpen(false);
                        handleLogout();
                      }}
                      className="w-full text-left text-sm font-extrabold text-red-600 hover:text-red-700 transition-colors"
                    >
                      Logout
                    </button>
                  </>
                ) : (
                  <div className="px-4 py-2">
                    <p className="text-xs text-gray-500 mb-3">Welcome to Trendify!</p>
                    <Link
                      to="/login"
                      onClick={() => setIsDropDownOpen(false)}
                      className="block text-center py-2 px-4 bg-primary text-white text-xs font-bold rounded hover:bg-primary-dark transition-colors mb-2"
                    >
                      LOGIN / REGISTER
                    </Link>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Wishlist Icon */}
          <Link to="/wishlist" className="flex flex-col items-center justify-center text-gray-700 hover:text-primary transition-colors relative group">
            <div className="relative">
              <i className="ri-heart-line text-lg group-hover:scale-110 transition-transform"></i>
              {wishlistProducts?.length > 0 && (
                <span className="absolute -top-1.5 -right-2 bg-primary text-white text-[9px] font-black rounded-full h-4 w-4 flex items-center justify-center border border-white">
                  {wishlistProducts.length}
                </span>
              )}
            </div>
            <span className="text-[10px] font-bold tracking-wider mt-1 uppercase hidden md:inline">Wishlist</span>
          </Link>

          {/* Bag Icon with Counter */}
          <button 
            onClick={handleCartToggle} 
            className="flex flex-col items-center justify-center text-gray-700 hover:text-primary transition-colors relative group"
          >
            <div className="relative">
              <i className="ri-shopping-bag-line text-lg group-hover:scale-110 transition-transform"></i>
              {products?.length > 0 && (
                <span className="absolute -top-1.5 -right-2 bg-primary text-white text-[9px] font-black rounded-full h-4 w-4 flex items-center justify-center border border-white">
                  {products.length}
                </span>
              )}
            </div>
            <span className="text-[10px] font-bold tracking-wider mt-1 uppercase hidden md:inline">Bag</span>
          </button>

        </div>
      </nav>

      {/* Mobile Drawer Navigation */}
      {isMobileMenuOpen && (
        <div className="md:hidden fixed inset-0 top-20 bg-black/50 z-40 animate-fade-in" onClick={() => setIsMobileMenuOpen(false)}>
          <div 
            className="w-72 bg-white h-full p-6 shadow-2xl animate-in slide-in-from-left duration-300"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mb-6">
              <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">Menu</p>
              <ul className="flex flex-col gap-4">
                {navigations.map((item) => (
                  <li key={item.name}>
                    <Link
                      to={item.path}
                      onClick={(e) => {
                        if (item.path === "/contact" || item.path === "/pages") {
                          handleNavClick(item.path, e);
                        } else {
                          setIsMobileMenuOpen(false);
                        }
                      }}
                      className="text-sm font-bold text-gray-800 hover:text-primary block py-1"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* Cart Drawer Modal */}
      {isCartOpen && (
        <CartModal
          product={products}
          isOpen={isCartOpen}
          onClose={handleCartToggle}
        />
      )}
    </header>
  );
};

export default Navbar;
