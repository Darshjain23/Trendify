import { Link, Outlet, useLocation, Navigate, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useLogoutUserMutation } from "../../redux/features/auth/authApi";
import { logout } from "../../redux/features/auth/authSlice";

const AdminLayout = () => {
  const { user } = useSelector((state) => state.auth);
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [logoutUser] = useLogoutUserMutation();

  // Route protection
  if (!user || user.role !== "admin") {
    return <Navigate to="/admin/login" replace />;
  }

  const sidebarLinks = [
    { label: "Product Upload", path: "/admin/products", icon: "ri-upload-2-line" },
    { label: "Delivery Status", path: "/admin/orders", icon: "ri-truck-line" },
  ];

  const handleLogout = async () => {
    try {
      await logoutUser().unwrap();
      dispatch(logout());
      navigate("/");
    } catch (error) {
      console.error("Failed to log out", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col md:flex-row max-w-[1440px] mx-auto">
      {/* Sidebar Panel */}
      <aside className="w-full md:w-64 bg-white border-r border-gray-200 flex-shrink-0 md:sticky md:top-0 md:h-screen p-6 flex flex-col justify-between animate-in slide-in-from-left duration-200">
        <div className="space-y-6">
          {/* Logo / Title */}
          <div className="flex items-center gap-2 pb-5 border-b border-gray-200">
            <div className="h-10 w-10 bg-primary/10 text-primary rounded-full flex items-center justify-center text-lg font-semibold">
              <i className="ri-shield-user-line"></i>
            </div>
            <div className="min-w-0">
              <h4 className="text-sm font-bold text-gray-800 truncate">Admin Portal</h4>
              <p className="text-xs text-gray-500 truncate">{user?.username}</p>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="flex flex-col gap-1">
            {sidebarLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.label}
                  to={link.path}
                  className={`flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                    isActive
                      ? "bg-primary text-white"
                      : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                  }`}
                >
                  <i className={`${link.icon} text-lg`}></i>
                  <span>{link.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Bottom links and logout */}
        <div className="space-y-2">
          <Link
            to="/"
            className="flex items-center gap-3 px-4 py-2 text-sm text-gray-500 hover:text-gray-800 transition-colors w-full"
          >
            <i className="ri-home-line text-lg"></i>
            <span>Customer Site</span>
          </Link>
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium text-red-600 hover:bg-red-50 transition-colors w-full"
          >
            <i className="ri-logout-box-line text-lg"></i>
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Content Space */}
      <main className="flex-1 p-6 md:p-10">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
