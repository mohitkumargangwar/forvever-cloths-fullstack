import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { fetchUserOrders } from "../redux/slice/orderSlice";

const MyOrder = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // Guard against missing slice shape so the UI does not crash
  const { orders = [], loading, error } = useSelector(
    (state) => state.orders || {}
  );

  useEffect(() => {
    dispatch(fetchUserOrders());
  }, [dispatch]);


  function handleRowClick(orderId) {
    navigate(`/order/${orderId}`)
  } 
if (loading) return <p>Loading...</p>
if (error) return <p>Error: {error}</p>

  return (
    <div className="w-full min-h-screen bg-gray-50 py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
      {/* Page Header */}
      <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-center text-black">
        🚀 My Orders
      </h2>

      {/* ✅ Desktop Table View */}
      <div className="hidden lg:block relative shadow-xl rounded-lg overflow-x-auto border border-gray-200 min-h-[50vh] bg-white">
        <table className="w-full text-left text-gray-600">
          <thead className="bg-gradient-to-r from-gray-100 via-gray-200 to-gray-100 text-xs uppercase text-gray-700">
            <tr>
              <th className="py-3 px-3 whitespace-nowrap">Image</th>
              <th className="py-3 px-3 whitespace-nowrap">Order ID</th>
              <th className="py-3 px-3 whitespace-nowrap">Created</th>
              <th className="py-3 px-3 whitespace-nowrap">Shipping</th>
              <th className="py-3 px-3 whitespace-nowrap">Items</th>
              <th className="py-3 px-3 whitespace-nowrap">Price</th>
              <th className="py-3 px-3 whitespace-nowrap">Status</th>
            </tr>
          </thead>
          <tbody>
            {orders.length > 0 ? (
              orders.map((order) => (
                <tr
                  key={order._id}
                  onClick={() => handleRowClick(order._id)}
                  className="border-b hover:bg-gradient-to-r hover:from-purple-50 hover:to-pink-50 transition-all duration-300 cursor-pointer"
                >
                  <td className="py-3 px-3">
                    <img
                      src={order.orderItems[0].image}
                      className="w-12 h-12 object-cover rounded-xl shadow-md"
                      alt="Order item"
                      loading="lazy"
                    />
                  </td>
                  <td className="py-3 px-3 font-semibold text-gray-900 max-w-[120px] truncate" title={order._id}>#{order._id.slice(-8)}</td>
                  <td className="py-3 px-3 text-sm whitespace-nowrap">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </td>
                  <td className="py-3 px-3 text-sm max-w-[150px] truncate">
                    {order.shippingAddress
                      ? `${order.shippingAddress.city}, ${order.shippingAddress.country}`
                      : "N/A"}
                  </td>
                  <td className="py-3 px-3 text-center">{order.orderItems.length}</td>
                  <td className="py-3 px-3 font-medium text-gray-900 whitespace-nowrap">
                    ₹{order.totalPrice}
                  </td>
                  <td className="py-3 px-3">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-bold shadow-sm ${
                        order.isPaid
                          ? "bg-green-100 text-green-700 ring-1 ring-green-400 "
                          : "bg-red-100 text-red-700 ring-1 ring-red-400 animate-pulse"
                      }`}
                    >
                      {order.isPaid ? "Paid" : "⌛ Pending"}
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={7} className="py-6 text-center text-gray-500">
                  😕 You have no orders
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* ✅ Mobile Card View */}
      <div className="lg:hidden space-y-4">
        {orders.length > 0 ? (
          orders.map((order) => (
            <div
              key={order._id}
              onClick={() => handleRowClick(order._id)}
              className="bg-white border border-gray-200 rounded-xl shadow-md p-4 hover:shadow-lg active:scale-[0.98] transition-all cursor-pointer"
            >
              <div className="flex items-start gap-3">
                <img
                  src={order.orderItems[0].image}
                  className="w-16 h-16 sm:w-20 sm:h-20 object-cover rounded-lg shadow-sm flex-shrink-0"
                  alt="Order item"
                  loading="lazy"
                />
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-base sm:text-lg truncate" title={order._id}>#{order._id.slice(-8)}</p>
                  <p className="text-xs sm:text-sm text-gray-500 mt-1">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>

              <div className="mt-4 space-y-2 text-gray-700 text-sm">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">📦 Shipping:</span>
                  <span className="font-medium text-right truncate ml-2">
                    {order.shippingAddress
                      ? `${order.shippingAddress.city}, ${order.shippingAddress.country}`
                      : "N/A"}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">🛒 Items:</span>
                  <span className="font-medium">{order.orderItems.length}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">💰 Total:</span>
                  <span className="font-semibold text-lg">₹{order.totalPrice}</span>
                </div>
              </div>

              <div className="mt-4 flex items-center justify-between">
                <span
                  className={`px-3 py-1.5 rounded-full text-xs sm:text-sm font-bold ${
                    order.isPaid
                      ? "bg-green-100 text-green-700 ring-1 ring-green-400"
                      : "bg-red-100 text-red-700 ring-1 ring-red-400 animate-pulse"
                  }`}
                >
                  {order.isPaid ? "Paid" : "⌛ Pending"}
                </span>
              </div>
            </div>
          ))
        ) : (
          <div className="bg-white rounded-xl shadow-md p-8 text-center">
            <p className="text-gray-500 text-lg">😕 You have no orders yet</p>
            <button onClick={() => navigate('/')} className="mt-4 px-6 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition">
              Start Shopping
            </button>
          </div>
        )}
      </div>
      </div>
    </div>
  );
};

export default MyOrder;
