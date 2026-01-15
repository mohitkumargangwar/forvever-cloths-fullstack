import { use, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import loginImg from "../assets/loginImg.webp";
import {loginUser} from "../redux/slice/authSlice";
import { mergeCart, fetchCart } from "../redux/slice/cartSlice";
import { useDispatch, useSelector } from "react-redux";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const {user, guestId, loading} = useSelector((state) => state.auth);
  const {cart} = useSelector((state) => state.cart);

  // Get redirect parameter and check if it's checkout or something
  const redirect = new URLSearchParams(location.search).get("redirect") || "/";
  const isCheckoutRedirect = redirect.includes("checkout");

  // Load remembered email on component mount
  useEffect(() => {
    const rememberedEmail = localStorage.getItem("rememberedEmail");
    if (rememberedEmail) {
      setEmail(rememberedEmail);
      setRememberMe(true);
    }
  }, []);
  
  // Redirect only after login, not on initial page load
  useEffect(() => {
    if(user && location.state?.justLoggedIn) {
       if(cart?.products?.length > 0 && guestId) {
        const userToken = localStorage.getItem("userToken");
        if(userToken) {
          console.log("mergeCart parameters:", { guestId, userId: user._id });
          dispatch(mergeCart({ guestId, userId: user._id })).then(() => {
            // Fetch updated cart after merge
            dispatch(fetchCart({ userId: user._id, guestId }));
            navigate(isCheckoutRedirect ? "/checkout" : "/");
          }).catch(() => {
            // Even if merge fails, fetch cart and redirect
            dispatch(fetchCart({ userId: user._id, guestId }));
            navigate(isCheckoutRedirect ? "/checkout" : "/");
          });
        } else {
          dispatch(fetchCart({ userId: user._id, guestId }));
          navigate(isCheckoutRedirect ? "/checkout" : "/");
        }
       } else {
        // No guest cart items, just fetch user's cart
        dispatch(fetchCart({ userId: user._id, guestId }));
        navigate(isCheckoutRedirect ? "/checkout" : "/");
       }
    }
  }, [user, cart, guestId, isCheckoutRedirect, navigate, dispatch, location.state]);
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Handle Remember Me
    if (rememberMe) {
      localStorage.setItem("rememberedEmail", email);
    } else {
      localStorage.removeItem("rememberedEmail");
    }
    
    console.log("Login kar rahe ho:", { email, password });
    dispatch(loginUser({email, password})).then(() => {
      navigate(location.pathname, { state: { justLoggedIn: true } });
    });
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen w-full bg-gray-100">
      {/* Left Side: Login Form */}
      <div className="w-full md:w-1/2 flex flex-col justify-center items-center p-4 sm:p-6 md:pb-28">
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
              Welcome Back!
            </h2>
            <p className="text-center text-gray-500 mb-6 sm:mb-8 text-sm sm:text-base">
              Please enter your details to sign in.
            </p>

            {/* Email Input */}
            <div className="mb-5">
              <label
                htmlFor="email"
                className="block text-sm font-semibold mb-2 text-gray-700"
              >
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
              <label
                htmlFor="password"
                className="block text-sm font-semibold mb-2 text-gray-700"
              >
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
              {/* Eye Toggle Button */}
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-11 text-gray-500 hover:text-gray-700"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between mb-6 text-sm sm:text-base">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="h-4 w-4 rounded border-gray-300 text-black focus:ring-black cursor-pointer"
                />
                <label
                  htmlFor="remember-me"
                  className="ml-2 block text-gray-800 cursor-pointer"
                >
                  Remember me
                </label>
              </div>
              <button
                type="button"
                onClick={() => {
                  if (email) {
                    alert(`Password reset link would be sent to: ${email}\n\n(Feature coming soon!)`);
                  } else {
                    alert("Please enter your email address first.");
                  }
                }}
                className="font-medium text-black hover:underline"
              >
                Forgot Password?
              </button>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              className="w-full bg-black text-white py-3 rounded-lg font-bold text-md hover:bg-gray-800 transition-colors duration-300 shadow-md hover:shadow-lg"
            >
              {loading ? "Signing In..." : "Sign In"}
            </button>

            {/* Divider */}
            <div className="flex items-center my-6">
              <hr className="flex-grow border-gray-300" />
              <span className="mx-4 text-xs font-semibold text-gray-400">
                OR
              </span>
              <hr className="flex-grow border-gray-300" />
            </div>

            {/* Social Login */}
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
              Sign in with Google
            </button>

            {/* Register link */}
            <p className="mt-8 text-center text-sm text-gray-600">
              Don’t have an account?{" "}
              <Link
                to={`/register?redirect=${encodeURIComponent(redirect)}`}
                className="text-black font-bold hover:underline"
              >
                Register
              </Link>
            </p>
          </form>
        </div>
      </div>

      {/* Right Side: Image */}
      <div className="hidden md:flex md:w-1/2 items-center justify-center bg-gray-100 md:pb-28">
        <img
          src={loginImg}
          alt="Login"
          className="w-[85%] h-[750px] object-cover rounded-2xl shadow-lg"
          loading="lazy"
        />
      </div>
    </div>
  );
}
