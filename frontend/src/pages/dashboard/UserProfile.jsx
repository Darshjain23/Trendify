import { useState } from "react";
import { useSelector } from "react-redux";

const UserProfile = () => {
  const { user } = useSelector((state) => state.auth);
  
  const [profileData, setProfileData] = useState({
    username: user?.username || "Darsh Jain",
    email: user?.email || "tradeckforyou@gmail.com",
    phone: "+91 98567 89234",
    address: "123, London Bridge Street",
    city: "London",
    country: "United Kingdom",
  });

  const handleChange = (e) => {
    setProfileData({
      ...profileData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Profile information updated successfully!");
  };

  return (
    <div className="space-y-6">
      
      {/* Title */}
      <div>
        <h2 className="text-xl font-bold text-gray-800">
          My Profile
        </h2>
        <p className="text-sm text-gray-500 mt-1">
          Update your profile settings and information
        </p>
      </div>

      {/* Main card */}
      <div className="bg-white border border-gray-200 rounded-xl p-6 md:p-8 shadow-sm max-w-2xl">
        <form onSubmit={handleSubmit} className="space-y-6">
          
          {/* Top profile avatar details */}
          <div className="flex flex-col sm:flex-row items-center gap-5 pb-6 border-b border-gray-100">
            <div className="h-14 w-14 bg-primary/10 text-primary font-semibold uppercase text-xl rounded-full flex items-center justify-center border border-primary/20">
              {profileData.username.charAt(0)}
            </div>
            <div className="text-center sm:text-left space-y-1">
              <h4 className="text-sm font-semibold text-gray-800 capitalize">{profileData.username}</h4>
              <p className="text-xs text-gray-500">{profileData.email}</p>
              <button 
                type="button" 
                className="text-xs text-primary font-medium hover:underline block"
              >
                Change Avatar
              </button>
            </div>
          </div>

          {/* Form grids */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-gray-600">Username</label>
              <input
                type="text"
                name="username"
                value={profileData.username}
                onChange={handleChange}
                className="w-full px-4 py-2.5 bg-white border border-gray-300 rounded-lg text-sm text-gray-800 outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-gray-600">Email Address</label>
              <input
                type="email"
                name="email"
                value={profileData.email}
                onChange={handleChange}
                className="w-full px-4 py-2.5 bg-white border border-gray-300 rounded-lg text-sm text-gray-800 outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-gray-600">Phone Number</label>
              <input
                type="text"
                name="phone"
                value={profileData.phone}
                onChange={handleChange}
                className="w-full px-4 py-2.5 bg-white border border-gray-300 rounded-lg text-sm text-gray-800 outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-gray-600">Street Address</label>
              <input
                type="text"
                name="address"
                value={profileData.address}
                onChange={handleChange}
                className="w-full px-4 py-2.5 bg-white border border-gray-300 rounded-lg text-sm text-gray-800 outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-gray-600">City</label>
              <input
                type="text"
                name="city"
                value={profileData.city}
                onChange={handleChange}
                className="w-full px-4 py-2.5 bg-white border border-gray-300 rounded-lg text-sm text-gray-800 outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-gray-600">Country</label>
              <input
                type="text"
                name="country"
                value={profileData.country}
                onChange={handleChange}
                className="w-full px-4 py-2.5 bg-white border border-gray-300 rounded-lg text-sm text-gray-800 outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
              />
            </div>

          </div>

          {/* Submit button */}
          <div className="pt-2">
            <button
              type="submit"
              className="py-2 px-6 bg-primary hover:bg-primary-dark text-white font-semibold text-sm rounded-lg transition-colors"
            >
              Save Profile
            </button>
          </div>

        </form>
      </div>

    </div>
  );
};

export default UserProfile;
