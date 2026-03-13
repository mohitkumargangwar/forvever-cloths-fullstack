import { NavLink } from "react-router";
import { TbBrandMeta } from "react-icons/tb";
import { IoLogoInstagram } from "react-icons/io5";
import { RiTwitterXLine } from "react-icons/ri";
import { FiPhoneCall, FiArrowRight } from "react-icons/fi";
import { useState } from "react";
import axiosInstance from "./axiosInstance";
import { toast } from "sonner";
import { motion } from "framer-motion";

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

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  return (
    <motion.footer 
      className="bg-gradient-to-b from-gray-900 to-black text-white border-t border-gray-800"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div 
        className="container mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10 px-4 sm:px-6 lg:px-0 py-16 lg:py-20"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.1 }}
      >
        
        {/* Newsletter Section */}
        <motion.div className="sm:col-span-2 lg:col-span-1" variants={itemVariants}>
          <h3 className="text-base font-bold text-white uppercase tracking-wider mb-4">
            Join our Newsletter
          </h3>
          <p className="text-gray-300 text-sm mb-6 leading-relaxed">
            Get 10% off your first order when you sign up for our exclusive emails.
          </p>
          <form className="flex flex-col gap-2" onSubmit={handleSubscribe}>
            <div className="relative flex">
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="p-3 w-full text-sm border-2 border-gray-600 bg-gray-800 text-white rounded-lg focus:outline-none focus:border-white focus:ring-2 focus:ring-white/20 transition-all placeholder-gray-500"
                required
                disabled={loading}
              />
              <button
                type="submit"
                className="absolute right-1 top-1/2 transform -translate-y-1/2 bg-white text-black p-2 rounded-md hover:bg-gray-100 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={loading}
                title={loading ? "Subscribing..." : "Subscribe"}
              >
                <FiArrowRight className="text-lg" />
              </button>
            </div>
            {loading && <p className="text-xs text-gray-400">Subscribing...</p>}
          </form>
        </motion.div>

        {/* Shop Links */}
        <motion.div variants={itemVariants}>
          <h3 className="text-base font-bold text-white uppercase tracking-wider mb-6">Shop</h3>
          <ul className="space-y-3">
            <li><NavLink to="/collections/all?gender=Men" className="text-gray-300 hover:text-white transition-colors text-sm flex items-center gap-2 group"><span className="opacity-0 group-hover:opacity-100 transition-opacity">→</span> Men's Top Wear</NavLink></li>
            <li><NavLink to="/collections/all?gender=Women" className="text-gray-300 hover:text-white transition-colors text-sm flex items-center gap-2 group"><span className="opacity-0 group-hover:opacity-100 transition-opacity">→</span> Women's Top Wear</NavLink></li>
            <li><NavLink to="/collections/all?gender=Men" className="text-gray-300 hover:text-white transition-colors text-sm flex items-center gap-2 group"><span className="opacity-0 group-hover:opacity-100 transition-opacity">→</span> Men's Bottom Wear</NavLink></li>
            <li><NavLink to="/collections/all?gender=Women" className="text-gray-300 hover:text-white transition-colors text-sm flex items-center gap-2 group"><span className="opacity-0 group-hover:opacity-100 transition-opacity">→</span> Women's Bottom Wear</NavLink></li>
          </ul>
        </motion.div>

        {/* Support Links */}
        <motion.div variants={itemVariants}>
          <h3 className="text-base font-bold text-white uppercase tracking-wider mb-6">Support</h3>
          <ul className="space-y-3">
            <li><NavLink to="/contact" className="text-gray-300 hover:text-white transition-colors text-sm flex items-center gap-2 group"><span className="opacity-0 group-hover:opacity-100 transition-opacity">→</span> Contact Us</NavLink></li>
            <li><NavLink to="/about" className="text-gray-300 hover:text-white transition-colors text-sm flex items-center gap-2 group"><span className="opacity-0 group-hover:opacity-100 transition-opacity">→</span> About Us</NavLink></li>
            <li><NavLink to="/faqs" className="text-gray-300 hover:text-white transition-colors text-sm flex items-center gap-2 group"><span className="opacity-0 group-hover:opacity-100 transition-opacity">→</span> FAQs</NavLink></li>
            <li><NavLink to="/features" className="text-gray-300 hover:text-white transition-colors text-sm flex items-center gap-2 group"><span className="opacity-0 group-hover:opacity-100 transition-opacity">→</span> Features</NavLink></li>
          </ul>
        </motion.div>

        {/* Follow Us & Contact */}
        <motion.div variants={itemVariants}>
          <h3 className="text-base font-bold text-white uppercase tracking-wider mb-6">Follow Us</h3>
          <div className="flex items-center space-x-3 mb-8">
            <motion.a 
              href="#" 
              target="_blank" 
              rel="noopener noreferrer"
              className="p-3 bg-gray-800 hover:bg-white hover:text-black rounded-full transition-all duration-300"
              whileHover={{ scale: 1.1, rotate: 5 }}
            >
              <TbBrandMeta size={20} />
            </motion.a>
            <motion.a 
              href="#" 
              target="_blank" 
              rel="noopener noreferrer"
              className="p-3 bg-gray-800 hover:bg-white hover:text-black rounded-full transition-all duration-300"
              whileHover={{ scale: 1.1, rotate: 5 }}
            >
              <IoLogoInstagram size={20} />
            </motion.a>
            <motion.a 
              href="#" 
              target="_blank" 
              rel="noopener noreferrer"
              className="p-3 bg-gray-800 hover:bg-white hover:text-black rounded-full transition-all duration-300"
              whileHover={{ scale: 1.1, rotate: 5 }}
            >
              <RiTwitterXLine size={20} />
            </motion.a>
          </div>
          <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-3">Call Us</h3>
          <a href="tel:0123456789" className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors text-sm group">
            <span className="p-2 bg-gray-800 rounded-full group-hover:bg-white group-hover:text-black transition-all">
              <FiPhoneCall className="text-lg" />
            </span>
            0123-456-789
          </a>
        </motion.div>
      </motion.div>

      {/* Footer Bottom */}
      <motion.div 
        className="container mx-auto px-4 sm:px-6 lg:px-0 border-t border-gray-800 py-8"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-gray-400 text-sm">
          <p className="text-center sm:text-left">
            © 2025 Forever Cloths. All Rights Reserved.
          </p>
          <div className="flex gap-4">
            <NavLink to="#" className="hover:text-white transition-colors">Privacy Policy</NavLink>
            <NavLink to="#" className="hover:text-white transition-colors">Terms of Service</NavLink>
          </div>
        </div>
      </motion.div>
    </motion.footer>
  );
}

export default Footer;