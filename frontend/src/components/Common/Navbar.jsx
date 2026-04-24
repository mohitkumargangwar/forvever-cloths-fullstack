import { Link } from "react-router";
import { HiOutlineUser, HiOutlineShoppingBag, HiMenuAlt3 } from "react-icons/hi";
import { HiMiniXMark } from "react-icons/hi2";
import logo from "../../assets/logo.png";
import SearchBar from "./SearchBar";
import CartDrawer from "../Layout/CartDrawer";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";

function Navbar() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [navDrawerOpen, setNavDrawerOpen] = useState(false);
  const { cart } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.auth);

  const cartItemCount = cart?.products?.reduce((total, product) => total + product.quantity, 0) || 0;

  const toggleNavDrawer = () => setNavDrawerOpen(!navDrawerOpen);
  const toggleCartDrawer = () => setDrawerOpen(!drawerOpen);

  useEffect(() => {
    if (navDrawerOpen) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
    return () => document.body.classList.remove("overflow-hidden");
  }, [navDrawerOpen]);

  const navLinks = [
    { name: "Men", path: "collections/all?gender=Men" },
    { name: "Women", path: "collections/all?gender=Women" },
    { name: "Top wear", path: "/collections/all/?category=Top+Wear" },
    { name: "Bottom wear", path: "collections/all?category=Bottom+Wear" },
  ];

  const drawerVariants = {
    closed: { x: "-100%", opacity: 0 },
    open: { x: 0, opacity: 1 },
  };

  return (
    <>
      <nav className="container mx-auto flex items-center justify-between py-4 px-4 sm:px-6 z-50 relative">
        {/* Logo */}
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
          <Link to="/" className="text-2xl font-medium">
            <img className="w-28 sm:w-36" src={logo} alt="logoImg" loading="lazy" />
          </Link>
        </motion.div>

        {/* Desktop Links */}
        <motion.div className="hidden md:flex space-x-4 lg:space-x-6" initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1, duration: 0.5 }}>
          {navLinks.map((link) => (
            <Link key={link.name} to={link.path} className="text-gray-700 hover:text-[#ea2e0e] text-sm lg:text-base font-semibold uppercase transition-colors duration-300 relative group">
              {link.name}
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#ea2e0e] group-hover:w-full transition-all duration-300"></span>
            </Link>
          ))}
        </motion.div>

        {/* Icons */}
        <motion.div className="flex items-center space-x-3 sm:space-x-4" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2, duration: 0.5 }}>
          {user && user.role === 'admin' && (
            <Link to='/admin' className="block bg-black hover:bg-gray-800 py-2 rounded-md text-xs sm:text-sm text-white px-3 font-semibold transition-colors">Admin</Link>
          )}
        
          <Link to={user ? "/profile" : "/login"} className="hover:text-black transition-colors">
            <HiOutlineUser className="h-6 w-6 sm:h-7 sm:w-7 text-gray-700 hover:text-[#ea2e0e]" />
          </Link>

          <button onClick={toggleCartDrawer} className="relative hover:text-black cursor-pointer transition-colors">
            <HiOutlineShoppingBag className="h-6 w-6 sm:h-7 sm:w-7 text-gray-700 hover:text-[#ea2e0e]" />
            {cartItemCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-[#ea2e0e] text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                {cartItemCount}
              </span>
            )}
          </button>

          {/* SearchBar remains here */}
          <div className="hidden sm:block">
            <SearchBar />
          </div>

          <button onClick={toggleNavDrawer} className="md:hidden p-1 hover:bg-gray-100 rounded-lg transition-colors">
            <HiMenuAlt3 className="h-6 w-6 text-gray-700 hover:text-[#ea2e0e]" />
          </button>
        </motion.div>
      </nav>

      <CartDrawer drawerOpen={drawerOpen} toggleCartDrawer={toggleCartDrawer} />

      {/* Mobile Drawer */}
      <motion.div
        className="fixed top-0 left-0 w-4/5 sm:w-1/2 md:w-1/3 h-screen bg-white shadow-2xl z-50 md:hidden overflow-y-auto"
        variants={drawerVariants}
        initial="closed"
        animate={navDrawerOpen ? "open" : "closed"}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      >
        <div className="flex justify-between items-center p-4 border-b border-gray-200 sticky top-0 bg-white">
          <h2 className="text-xl font-bold text-gray-800">Menu</h2>
          <HiMiniXMark onClick={toggleNavDrawer} className="h-6 w-6 text-gray-600 hover:text-black cursor-pointer" />
        </div>

        <nav className="p-4 space-y-4">
          {navLinks.map((link) => (
            <Link key={link.name} to={link.path} onClick={toggleNavDrawer} className="block text-gray-700 hover:text-[#ea2e0e] py-3 px-4 rounded-lg font-semibold text-sm uppercase">
              {link.name}
            </Link>
          ))}
          <div className="mt-6 pt-6 border-t border-gray-200">
            <SearchBar /> {/* Mobile Search Added here */}
          </div>
        </nav>
      </motion.div>
    </>
  );
}

export default Navbar;