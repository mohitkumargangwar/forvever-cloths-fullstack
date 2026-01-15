import { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router"; 
import { FaEye, FaEyeSlash } from "react-icons/fa"; 
import registerImg from "../assets/registerImg.webp"; 
import {registerUser} from "../redux/slice/authSlice";
import { mergeCart } from "../redux/slice/cartSlice";
import { useDispatch, useSelector } from "react-redux";


export default function Register() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const {user, guestId, loading} = useSelector((state) => state.auth);
  const {cart} = useSelector((state) => state.cart);

  // Get redirect parameter and check if it's checkout or something
  const redirect = new URLSearchParams(location.search).get("redirect") || "/";
  const isCheckoutRedirect = redirect.includes("checkout");
  
  // Redirect only after login, not on initial page load
  useEffect(() => {
    if(user && location.state?.justLoggedIn) {
       if(cart?.products?.length > 0 && guestId) {
        const userToken = localStorage.getItem("userToken");
        if(userToken) {
          console.log("mergeCart parameters:", { guestId, userId: user._id });
          dispatch(mergeCart({ guestId, userId: user._id })).then(() => {
            navigate(isCheckoutRedirect ? "/checkout" : "/");
          }).catch(() => {
            // Even if merge fails, still redirect
            navigate(isCheckoutRedirect ? "/checkout" : "/");
          });
        } else {
          navigate(isCheckoutRedirect ? "/checkout" : "/");
        }
       } else {
        navigate(isCheckoutRedirect ? "/checkout" : "/");
       }
    }
  }, [user, cart, guestId, isCheckoutRedirect, navigate, dispatch, location.state]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(registerUser({name: fullName, email, password, confirmPassword})).then(() => {
      navigate(location.pathname, { state: { justLoggedIn: true } });
    });
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen w-full bg-gray-100">
      {/* Left Side: Register Form */}
      <div className="w-full md:w-1/2 flex flex-col justify-center items-center p-4 sm:p-6 md:pb-32">
        <div className="w-full max-w-xl">
          {/* Logo / Brand */}
          <div className="flex justify-center mb-8">
            <h2 className="text-3xl font-bold text-gray-800">🐇 Rabbit</h2>
          </div>

          {/* Form Container */}
          <form
            onSubmit={handleSubmit}
            className="bg-white p-6 sm:p-8 rounded-2xl shadow-lg border border-gray-200 "
          >
            {/* Heading */}
            <h2 className="text-2xl sm:text-3xl font-bold text-center mb-3 text-gray-900">
              Create Your Account
            </h2>
            <p className="text-center text-gray-500 mb-6 sm:mb-8 text-sm sm:text-base">
              Please fill in your details to register.
            </p>

            {/* Full Name */}
            <div className="mb-5">
              <label htmlFor="fullName" className="block text-sm font-semibold mb-2 text-gray-700">
                Full Name
              </label>
              <input
                id="fullName"
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black transition-shadow"
                placeholder="John Doe"
              />
            </div>

            {/* Email Input */}
            <div className="mb-5">
              <label htmlFor="email" className="block text-sm font-semibold mb-2 text-gray-700">
                Email Address
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black transition-shadow"
                placeholder="you@example.com"
              />
            </div>

            {/* Password Input */}
            <div className="mb-5 relative">
              <label htmlFor="password" className="block text-sm font-semibold mb-2 text-gray-700">
                Password
              </label>
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black transition-shadow pr-10"
                placeholder="••••••••"
              />
              {/* Eye Toggle */}
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-11 text-gray-500 hover:text-gray-700"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>

            {/* Confirm Password Input */}
            <div className="mb-5 relative">
              <label htmlFor="confirmPassword" className="block text-sm font-semibold mb-2 text-gray-700">
                Confirm Password
              </label>
              <input
                id="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black transition-shadow pr-10"
                placeholder="••••••••"
              />
              {/* Eye Toggle */}
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-4 top-11 text-gray-500 hover:text-gray-700"
              >
                {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>

            {/* Register Button */}
            <button
              type="submit"
              className="w-full bg-black text-white py-3 rounded-lg font-bold text-md hover:bg-gray-800 transition-colors duration-300 shadow-md hover:shadow-lg"
            >
          { loading ? "Registering..." : "Register"}
            </button>

            {/* Divider */}
            <div className="flex items-center my-6">
              <hr className="flex-grow border-gray-300" />
              <span className="mx-4 text-xs font-semibold text-gray-400">OR</span>
              <hr className="flex-grow border-gray-300" />
            </div>

            {/* Social Register */}
            <button
              type="button"
              className="w-full flex items-center justify-center gap-2 border border-gray-300 text-gray-700 py-3 rounded-lg font-semibold text-md hover:bg-gray-50 transition-colors duration-300"
            >
              <img
                src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/google/google-original.svg"
                alt="Google icon"
                className="h-5 w-5"
                loading="lazy"
              />
              Register with Google
            </button>

            {/* Login link */}
            <p className="mt-8 text-center text-sm text-gray-600">
              Already have an account?{" "}
              <Link to={`/login?redirect=${encodeURIComponent(redirect)}`} className="text-black font-bold hover:underline">
                Sign In
              </Link>
            </p>
          </form>
        </div>
      </div>

     {/* Right Side: Image */}
          <div className="hidden md:flex md:w-1/2 items-center justify-center bg-gray-100 md:pb-28">
            <img
              src={registerImg}
              alt="Login"
              className="w-[85%] h-[850px] object-cover rounded-2xl shadow-lg"
              loading="lazy"
            />
          </div>
    </div>
  );
}
