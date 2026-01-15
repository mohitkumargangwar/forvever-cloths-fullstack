import { NavLink, useNavigate } from 'react-router';
import { FiLayout, FiUsers, FiBox, FiShoppingBag, FiLogOut, FiCommand, FiX } from 'react-icons/fi';
import { IoInfinite } from "react-icons/io5";
import { useDispatch } from "react-redux";
import { logout } from "../../redux/slice/authSlice";
import { clearCart } from "../../redux/slice/cartSlice";
import { toast } from "sonner";

const navItems = [
  { name: 'Admin Dashboard', icon: FiLayout, path: '/admin' }, 
  { name: 'Users', icon: FiUsers, path: '/admin/users' },
  { name: 'Products', icon: FiBox, path: '/admin/products' },
  { name: 'Orders', icon: FiShoppingBag, path: '/admin/order-management' },
  { name: 'Shop', icon: FiCommand, path: '/' },
];

const Sidebar = ({ isOpen, setIsOpen }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
    dispatch(clearCart());
    setIsOpen(false);
    toast.success("Logged out successfully", { duration: 1500 });
    navigate('/login');
  };

  const handleBrandClick = () => {
    setIsOpen(false);
    navigate('/');
  };

  return (
    <>
      {/* Mobile Overlay */}
      <div
        className={`fixed inset-0 bg-black/30 z-30 md:hidden transition-opacity ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setIsOpen(false)}
      ></div>

      {/* Sidebar */}
      <div
        className={`flex flex-col h-screen bg-gray-900 text-white w-64 fixed top-0 left-0 z-40 
                   transform transition-transform duration-300 ease-in-out 
                   ${isOpen ? 'translate-x-0' : '-translate-x-full'} 
                   md:translate-x-0`}
      >
        {/* Logo Section */}
        <div className="flex items-center justify-between h-20 border-b border-gray-800 px-4">
          <button onClick={handleBrandClick} className="flex items-center focus:outline-none">
            <IoInfinite className="text-pink-600 text-4xl mr-3" />
            <span className="text-2xl font-semibold tracking-wide">FOREVER</span>
          </button>
          <button onClick={() => setIsOpen(false)} className="md:hidden text-gray-400 hover:text-white">
            <FiX className="h-6 w-6" />
          </button>
        </div>

        {/* Nav Links */}
        <nav className="flex-grow p-4 space-y-2">
          {navItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              end={item.path === '/admin'} // 'end' prop add kiya taki '/admin/users' par '/admin' active na ho
              className={({ isActive }) =>
                `flex items-center px-4 py-2 rounded-lg transition-colors duration-200 ${
                  isActive
                    ? 'bg-pink-600 text-white shadow-md'
                    : 'hover:bg-gray-800 text-gray-300'
                }`
              }
              onClick={() => setIsOpen(false)}
            >
              <item.icon className="mr-3 text-xl" />
              <span className="text-lg font-medium">{item.name}</span>
            </NavLink>
          ))}
        </nav>

        {/* Logout */}
        <div className="p-4 border-t border-gray-800">
          <button 
            onClick={handleLogout}
            className="flex items-center justify-center w-full px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg transition-colors duration-200 text-white font-medium"
          >
            <FiLogOut className="mr-3 text-lg" />
            Logout
          </button>
        </div>
      </div>
    </>
  );
};

export default Sidebar;