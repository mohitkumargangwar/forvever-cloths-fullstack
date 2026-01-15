import { useState } from 'react';
import { Outlet } from 'react-router';
import Sidebar from './Sidebar'; 
import { FiMenu } from 'react-icons/fi';

const AdminLayout = () => { 
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-100">
      <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />

      <div className="flex-1 md:ml-64">
        {/* Top Header */}
        <header className="flex justify-between items-center p-4 bg-white shadow-sm md:justify-end">
          {/* Hamburger Menu */}
          <button
            onClick={() => setSidebarOpen(true)}
            className="text-gray-500 focus:outline-none md:hidden"
          >
            <FiMenu size={24} />
          </button>

          {/* User profile */}
          <div className="text-gray-700">
            Welcome, Admin!
          </div>
        </header>

        <main className="p-4 sm:p-6 lg:p-8">
            <Outlet />
        </main>

      </div>
    </div>
  );
};

export default AdminLayout;