import { NavLink } from "react-router";
import { TbBrandMeta } from "react-icons/tb";
import { IoLogoInstagram } from "react-icons/io5";
import { RiTwitterXLine } from "react-icons/ri";
import { FiPhoneCall } from "react-icons/fi";
import { useState } from "react";
import axiosInstance from "./axiosInstance";
import { toast } from "sonner";

function Footer() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubscribe = async (e) => {
    e.preventDefault();

    if (!email.trim()) {
      toast.error("Please enter your email");
      return;
    }

    setLoading(true);
    try {
      const response = await axiosInstance.post(
        "/api/subscribe",
        { email }
      );
      toast.success(response.data.message || "Subscribed successfully!");
      setEmail("");
    } catch (error) {
      const errorMessage = error.response?.data?.message || "Failed to subscribe";
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <footer className="bg-gray-50 border-t pt-16 pb-8">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 px-4 lg:px-0">
        
        {/* Newsletter Section */}
        <div className="md:col-span-2 lg:col-span-1">
          <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">
            Join our Newsletter
          </h3>
          <p className="text-gray-600 text-sm mb-4">
            Get 10% off your first order when you sign up for our emails.
          </p>
          <form className="flex mt-4" onSubmit={handleSubscribe}>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="p-3 w-full text-sm border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-black transition-all"
              required
              disabled={loading}
            />
            <button
              type="submit"
              className="bg-black text-white px-5 text-sm rounded-r-md hover:bg-gray-800 transition-colors disabled:bg-gray-400"
              disabled={loading}
            >
              {loading ? "Subscribing..." : "Subscribe"}
            </button>
          </form>
        </div>

        {/* Shop Links */}
        <div>
          <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">Shop</h3>
          <ul className="space-y-3 text-gray-600">
            <li><NavLink to="/collections/all?gender=Men" className="hover:text-black transition-colors">Men's Top Wear</NavLink></li>
            <li><NavLink to="/collections/all?gender=Women" className="hover:text-black transition-colors">Women's Top Wear</NavLink></li>
            <li><NavLink to="/collections/all?gender=Men" className="hover:text-black transition-colors">Men's Bottom Wear</NavLink></li>
            <li><NavLink to="/collections/all?gender=Women" className="hover:text-black transition-colors">Women's Bottom Wear</NavLink></li>
          </ul>
        </div>

        {/* Support Links */}
        <div>
          <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">Support</h3>
          <ul className="space-y-3 text-gray-600">
            <li><NavLink to="/contact" className="hover:text-black transition-colors">Contact Us</NavLink></li>
            <li><NavLink to="/about" className="hover:text-black transition-colors">About Us</NavLink></li>
            <li><NavLink to="/faqs" className="hover:text-black transition-colors">FAQs</NavLink></li>
            <li><NavLink to="/features" className="hover:text-black transition-colors">Features</NavLink></li>
          </ul>
        </div>

        {/* Follow Us & Contact */}
        <div>
          <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">Follow Us</h3>
          <div className="flex items-center space-x-3 mb-6">
            <a href="#" target="_blank" rel="noopener noreferrer" className="p-2 bg-gray-200 rounded-full hover:bg-gray-300 transition-colors"><TbBrandMeta size={20} /></a>
            <a href="#" target="_blank" rel="noopener noreferrer" className="p-2 bg-gray-200 rounded-full hover:bg-gray-300 transition-colors"><IoLogoInstagram size={20} /></a>
            <a href="#" target="_blank" rel="noopener noreferrer" className="p-2 bg-gray-200 rounded-full hover:bg-gray-300 transition-colors"><RiTwitterXLine size={20} /></a>
          </div>
          <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-2">Call Us</h3>
          <a href="tel:0123456789" className="flex items-center text-gray-600 hover:text-black transition-colors">
            <FiPhoneCall className="inline-block mr-2" />
            0123-456-789
          </a>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="container mx-auto mt-10 px-4 lg:px-0 border-t border-gray-200 pt-6">
        <p className="text-gray-500 text-sm text-center">
          © 2025, CompileTab. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
}

export default Footer;