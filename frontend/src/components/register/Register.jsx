import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useRegisterUserMutation } from "../../redux/features/auth/authApi";

const Register = () => {
  const [message, setMessage] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [registerUser, { isLoading }] = useRegisterUserMutation();
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    const data = {
      username,
      email,
      password,
    };

    try {
      await registerUser(data)?.unwrap();
      navigate("/login");
    } catch (error) {
      setMessage("Registration failed. Please check details or try another email.");
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md bg-white border border-gray-200 rounded-2xl shadow-sm p-8 sm:p-10">
        
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-gray-800">
            Create Account
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            Sign up to get started
          </p>
        </div>

        <form className="space-y-4" onSubmit={handleRegister}>
          
          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1.5 uppercase tracking-wide">
              Username
            </label>
            <input
              type="text"
              name="username"
              id="username"
              onChange={(e) => setUsername(e?.target?.value)}
              placeholder="johndoe"
              required
              className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg text-sm text-gray-800 placeholder-gray-400 outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all duration-150"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1.5 uppercase tracking-wide">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              id="email"
              onChange={(e) => setEmail(e?.target?.value)}
              placeholder="name@example.com"
              required
              className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg text-sm text-gray-800 placeholder-gray-400 outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all duration-150"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1.5 uppercase tracking-wide">
              Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              onChange={(e) => setPassword(e?.target?.value)}
              placeholder="••••••••"
              required
              className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg text-sm text-gray-800 placeholder-gray-400 outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all duration-150"
            />
          </div>

          {message && (
            <p className="text-xs text-red-600 bg-red-50 py-2.5 px-3 rounded-lg border border-red-100 font-medium">
              {message}
            </p>
          )}

          <button
            disabled={isLoading}
            className="w-full mt-2 py-3 bg-primary text-white font-semibold text-sm rounded-lg hover:bg-primary-dark transition-all duration-150 disabled:opacity-50"
            type="submit"
          >
            {isLoading ? "Signing Up..." : "Sign Up"}
          </button>

        </form>

        <p className="mt-8 text-center text-sm text-gray-500">
          Already have an account?{" "}
          <Link to="/login" className="text-primary font-semibold hover:underline">
            Login Here
          </Link>
        </p>

      </div>
    </section>
  );
};

export default Register;
