import { Link } from "react-router";
import {HiOutlineUser,HiOutlineShoppingBag,HiMenuAlt3} from "react-icons/hi";
import { HiMiniXMark } from "react-icons/hi2";
import logo from "../../assets/logo.png";

import SearchBar from "./SearchBar";
import CartDrawer from "../Layout/CartDrawer";
import { useState } from "react";
import { useSelector } from "react-redux";

function Navbar() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [navDrawerOpen, setNavDrawerOpen] = useState(false);
  const {cart} =useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.auth);

  const cartItemCount = cart?.products?.reduce((total, product) => total + product.quantity, 0) || 0;

  const toggleNavDrawer = () => {
    setNavDrawerOpen(!navDrawerOpen);
  };

  const toggleCartDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  //  Navigation links ek array me
  const navLinks = [
    { name: "Men", path: "collections/all?gender=Men" },
    { name: "Women", path: "collections/all?gender=Women" },
    { name: "Top wear", path: "/collections/all/?category=Top+Wear" },
    { name: "Bottom wear", path: "collections/all?category=Bottom+Wear" },
  ];

  return (
    <>
      <nav className="container mx-auto flex items-center justify-between py-4 px-6 z-50">
        {/* Logo */}
        <div>
          <Link to="/" className="text-2xl font-medium">
            <img className="w-36" src={logo} alt="logoImg" loading="lazy" />
          </Link>
        </div>

        {/* Center navigation links (Desktop) */}
        <div className="hidden md:flex space-x-6">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className="text-gray-700 hover:text-[#ea2e0e] text-md font-medium uppercase"
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* Right - Icons */}
        <div className="flex items-center space-x-4">
          {user && user.role === 'admin' && (
              <div className="flex items-center space-x-4">
          <Link to='/admin' className="block bg-black py-1 rounded-md text-sm text-white px-3">
          Admin
          </Link>
        </div>
          )}
        
          <Link to={user ? "/profile" : "/login"} className="hover:text-black">
            <HiOutlineUser className="h-6 w-6 text-gray-700 hover:text-[#ea2e0e]" />
          </Link>

          <button
            onClick={toggleCartDrawer}
            className="relative hover:text-black cursor-pointer"
          >
            <HiOutlineShoppingBag className="h-6 w-6 text-gray-700 hover:text-[#ea2e0e]" />
            {cartItemCount > 0 && (
              <span className="absolute -top-0.5 bg-[#ea2e0e] text-white text-xs rounded-full px-1">
              {cartItemCount}
            </span>
            )}
            
          </button>

          {/* Search */}
          <div className="overflow-hidden cursor-pointer hover:text-[#ea2e0e]">
            <SearchBar />
          </div>

          <button onClick={toggleNavDrawer} className="md:hidden">
            <HiMenuAlt3 className="h-6 w-6 text-gray-700 hover:text-[#ea2e0e]" />
          </button>
        </div>
      </nav>

      <CartDrawer drawerOpen={drawerOpen} toggleCartDrawer={toggleCartDrawer} />

      {/* Mobile Navigation Drawer */}
      <div
        className={`fixed top-0 left-0 w-3/4 sm:w-1/2 md:w-1/3 h-full bg-white shadow-lg z-50 transition-transform duration-300 transform ${
          navDrawerOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex justify-end p-4">
          <button onClick={toggleNavDrawer}>
            <HiMiniXMark className="h-6 w-6 text-gray-600" />
          </button>
        </div>
        <div className="p-4">
          <h2 className="text-xl font-semibold mb-4">Menu</h2>
          <nav className="space-y-4">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                onClick={toggleNavDrawer}
                className="block text-gray-600 hover:text-black py-2"
              >
                {link.name}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </>
  );
}

export default Navbar;
