import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useLogoutUserMutation } from "../../redux/features/auth/authApi";
import { logout } from "../../redux/features/auth/authSlice";

const DashboardLayout = () => {
  const { user } = useSelector((state) => state.auth);
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [logoutUser] = useLogoutUserMutation();

  const sidebarLinks = [
    { label: "Dashboard", path: "/dashboard", icon: "ri-dashboard-line" },
    { label: "Profile", path: "/dashboard/profile", icon: "ri-user-line" },
    { label: "Orders", path: "/dashboard/orders", icon: "ri-shopping-bag-line" },
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
      <aside className="w-full md:w-64 bg-white border-r border-gray-200 flex-shrink-0 md:sticky md:top-20 md:h-[calc(100vh-80px)] p-6 flex flex-col justify-between">
        <div className="space-y-6">
          
          {/* User profile capsule */}
          <div className="flex items-center gap-3 pb-5 border-b border-gray-200">
            <div className="h-10 w-10 bg-primary/10 text-primary rounded-full flex items-center justify-center text-base font-semibold uppercase">
              {user?.username?.charAt(0) || "U"}
            </div>
            <div className="min-w-0">
              <h4 className="text-sm font-semibold text-gray-800 truncate capitalize">{user?.username || "Guest User"}</h4>
              <p className="text-xs text-gray-500">Account Member</p>
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

        {/* Bottom sign out action */}
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium text-red-600 hover:bg-red-50 transition-colors w-full mt-6"
        >
          <i className="ri-logout-box-line text-lg"></i>
          <span>Logout</span>
        </button>
      </aside>

      {/* Content Space */}
      <main className="flex-1 p-6 md:p-10">
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayout;
