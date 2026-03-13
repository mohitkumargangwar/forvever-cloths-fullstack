import { TbBrandMeta } from "react-icons/tb";
import { IoLogoInstagram } from "react-icons/io";
import { RiTwitterXLine } from "react-icons/ri";
import { motion } from "framer-motion";

const Topbar = () => {
  return (
    <motion.div 
      className="bg-gradient-to-r from-gray-900 to-black text-white"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto flex flex-col sm:flex-row justify-between items-center py-3 px-4 gap-3 sm:gap-0">
        
        {/* Left icons - Hidden on mobile */}
        <div className="hidden md:flex items-center space-x-4">
          <motion.a 
            href="#" 
            className="hover:text-gray-300 transition-colors p-1 rounded-full hover:bg-white/10"
            whileHover={{ scale: 1.1 }}
          >
            <TbBrandMeta className="h-5 w-5" />
          </motion.a>
          <motion.a 
            href="#" 
            className="hover:text-gray-300 transition-colors p-1 rounded-full hover:bg-white/10"
            whileHover={{ scale: 1.1 }}
          >
            <IoLogoInstagram className="h-5 w-5" />
          </motion.a>
          <motion.a 
            href="#" 
            className="hover:text-gray-300 transition-colors p-1 rounded-full hover:bg-white/10"
            whileHover={{ scale: 1.1 }}
          >
            <RiTwitterXLine className="h-4 w-4" />
          </motion.a>
        </div>

        {/* Center text */}
        <motion.div 
          className="text-xs sm:text-sm text-center flex-grow px-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <span className="font-medium">🌍 We ship worldwide – Fast and reliable shipping!</span>
        </motion.div>

        {/* Right side contact - Hidden on mobile, shown on tablet+ */}
        <motion.div 
          className="text-xs sm:text-sm hidden md:block whitespace-nowrap"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <a href="tel:+1234567890" className="hover:text-gray-300 transition-colors font-medium">
            📞 +1 (234) 567-890
          </a>
        </motion.div>

        {/* Mobile social icons - Visible only on mobile */}
        <div className="flex md:hidden items-center space-x-2 text-sm">
          <a href="#" className="hover:text-gray-300 transition-colors p-1">
            <IoLogoInstagram className="h-4 w-4" />
          </a>
          <a href="#" className="hover:text-gray-300 transition-colors p-1">
            <TbBrandMeta className="h-4 w-4" />
          </a>
        </div>
      </div>
    </motion.div>
  );
};

export default Topbar;