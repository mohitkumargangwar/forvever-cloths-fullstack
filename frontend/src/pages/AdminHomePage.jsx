import { Link } from "react-router";
import { FiDollarSign, FiShoppingCart, FiPackage } from "react-icons/fi";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAdminProducts } from "../redux/slice/adminProductSlice";
import { fetchAllOrders } from "../redux/slice/adminOrderSlice";

const AdminHomePage = () => {
  const dispatch = useDispatch();

  const { products, loading: productsLoading, error: productsError } = useSelector(
    (state) => state.adminProduct
  );
  const { orders, totalOrders, totalSales, loading: ordersLoading, error: ordersError } = useSelector(
    (state) => state.adminOrder
  );

  useEffect(() => {
    dispatch(fetchAdminProducts());
    dispatch(fetchAllOrders());
  }, [dispatch]);

  const stats = [
    {
      title: "Revenue",
      value: `$${(totalSales || 0).toFixed(2)}`,
      icon: FiDollarSign,
      color: "bg-green-100 text-green-600",
    },
    {
      title: "Total Orders",
      value: totalOrders || orders.length || 0,
      icon: FiShoppingCart,
      color: "bg-blue-100 text-blue-600",
      link: "/admin/order-management",
      linkText: "Manage Orders",
    },
    {
      title: "Total Products",
      value: products.length || 0,
      icon: FiPackage,
      color: "bg-amber-100 text-amber-600",
      link: "/admin/products",
      linkText: "Manage Products",
    },
  ];

  const statusStyles = {
    Processing: "bg-yellow-100 text-yellow-800",
    Shipped: "bg-blue-100 text-blue-800",
    Delivered: "bg-green-100 text-green-800",
    Cancelled: "bg-red-100 text-red-800",
  };
  const defaultStatusStyle = "bg-gray-100 text-gray-800";

  const recentOrders = orders.slice(0, 5);

  const isLoading = productsLoading || ordersLoading;
  const errorMessage = productsError || ordersError;

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="p-4 sm:p-6 lg:p-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-8">
          Admin Dashboard
        </h1>

        {isLoading && (
          <p className="text-sm text-gray-600 mb-4">Loading dashboard...</p>
        )}

        {errorMessage && (
          <p className="text-sm text-red-600 mb-4">Error: {errorMessage}</p>
        )}

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
          {stats.map((stat) => (
            <div
              key={stat.title}
              className="bg-white rounded-xl shadow hover:shadow-lg transition-all p-6 border border-gray-100 flex items-center gap-6"
            >
              <div className={`w-14 h-14 rounded-full flex items-center justify-center text-2xl ${stat.color}`}>
                <stat.icon />
              </div>
              <div>
                <h3 className="text-base font-semibold text-gray-600">{stat.title}</h3>
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                {stat.link && (
                  <Link
                    to={stat.link}
                    className="text-sm text-blue-600 hover:text-blue-800 font-medium mt-1 inline-block"
                  >
                    {stat.linkText} →
                  </Link>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Recent Orders */}
        <div className="bg-white rounded-xl shadow-md border border-gray-100">
          <h2 className="text-lg sm:text-xl font-bold text-gray-900 p-6 border-b border-gray-200">
            Recent Orders
          </h2>
          
          {/* Desktop Table */}
          <div className="hidden md:block overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 text-sm">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left font-medium text-gray-500 uppercase tracking-wider">Order ID</th>
                  <th className="px-6 py-3 text-left font-medium text-gray-500 uppercase tracking-wider">User</th>
                  <th className="px-6 py-3 text-left font-medium text-gray-500 uppercase tracking-wider">Total Price</th>
                  <th className="px-6 py-3 text-left font-medium text-gray-500 uppercase tracking-wider">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {recentOrders.map((order) => (
                  <tr key={order._id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap font-mono text-gray-700">{order._id}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-600">{order?.user?.name || "User"}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-800 font-semibold">${(order.totalPrice || 0).toFixed(2)}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${statusStyles[order.status] || defaultStatusStyle}`}>
                        {order.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Cards */}
          <div className="md:hidden">
            <div className="divide-y divide-gray-200">
              {recentOrders.map((order) => (
                <div key={order._id} className="p-4">
                  <div className="flex justify-between items-center mb-2">
                    <p className="font-mono text-sm text-gray-700">{order._id}</p>
                    <span className={`px-3 py-1 inline-flex text-xs font-semibold rounded-full ${statusStyles[order.status] || defaultStatusStyle}`}>
                      {order.status}
                    </span>
                  </div>
                  <p className="text-gray-600 text-sm mb-1">
                    User: <span className="font-medium text-gray-800">{order?.user?.name || "User"}</span>
                  </p>
                  <p className="text-gray-600 text-sm">
                    Total: <span className="font-bold text-lg text-gray-900">${(order.totalPrice || 0).toFixed(2)}</span>
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminHomePage;