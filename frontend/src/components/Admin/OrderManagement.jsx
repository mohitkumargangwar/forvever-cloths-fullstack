import { FiShoppingBag } from 'react-icons/fi';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllOrders, updateOrderStatus } from '../../redux/slice/adminOrderSlice';

const OrderManagement = () => {
  const dispatch = useDispatch();
  const { orders = [], loading, error } = useSelector((state) => state.adminOrder);
  const orderStatuses = ['Processing', 'Shipped', 'Delivered', 'Cancelled'];

  useEffect(() => {
    dispatch(fetchAllOrders());
  }, [dispatch]);

  // Function to handle status change from the dropdown
  const handleStatusChange = (orderId, newStatus) => {
    dispatch(updateOrderStatus({ id: orderId, status: newStatus }));
  };

  // Function for the "Mark as Delivered" button
  const handleMarkAsDelivered = (orderId) => {
    handleStatusChange(orderId, 'Delivered');
  };

  // Helper function to get styling based on status
  const getStatusClass = (status) => {
    switch (status) {
      case 'Delivered':
        return 'bg-green-100 text-green-800 border-green-300';
      case 'Shipped':
        return 'bg-blue-100 text-blue-800 border-blue-300';
      case 'Cancelled':
        return 'bg-red-100 text-red-800 border-red-300';
      case 'Processing':
        return 'bg-yellow-100 text-yellow-800 border-yellow-300';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-8">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 flex items-center">
            <FiShoppingBag className="mr-3 text-pink-600" />
            Order Management
          </h1>
          <p className="text-gray-500 mt-1">View and manage all customer orders.</p>
        </div>
      </div>

      {loading && <p className="text-sm text-gray-600 mb-3 text-center">Loading orders...</p>}
      {error && <p className="text-sm text-red-600 mb-3">Error: {error}</p>}

      {/* Orders Content Area */}
      <div className="bg-white rounded-xl shadow-md border border-gray-100">
        
        {/* Desktop Table View */}
        <div className="hidden md:block overflow-x-auto">
          {!loading && orders.length === 0 && (
            <p className="text-sm text-gray-600 p-4">No orders found.</p>
          )}
          <table className="min-w-full divide-y divide-gray-200 text-sm">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Price</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {orders.map((order) => (
                <tr key={order._id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap font-mono text-gray-700">{order._id}</td>
                  <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">{order?.user?.name || 'User'}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-700">${(order.totalPrice || 0).toFixed(2)}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <select
                      value={order.status}
                      onChange={(e) => handleStatusChange(order._id, e.target.value)}
                      className={`text-xs font-semibold rounded-md p-2 border focus:outline-none focus:ring-2 focus:ring-pink-500 transition ${getStatusClass(order.status)}`}
                    >
                      {orderStatuses.map(status => (
                        <option key={status} value={status}>{status}</option>
                      ))}
                    </select>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center">
                    <button
                      onClick={() => handleMarkAsDelivered(order._id)}
                      className="px-4 py-2 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-600 transition disabled:bg-gray-300"
                      disabled={order.status === 'Delivered'}
                    >
                      Mark as Delivered
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile Card View */}
        <div className="md:hidden divide-y divide-gray-200">
          {orders.map((order) => (
            <div key={order._id} className="p-4 space-y-3">
              <div>
                <p className="text-xs text-gray-500">Order ID</p>
                <p className="font-mono text-sm text-gray-800">{order._id}</p>
              </div>
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-xs text-gray-500">Customer</p>
                  <p className="font-medium text-gray-900">{order?.user?.name || 'User'}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 text-right">Total</p>
                  <p className="font-bold text-lg text-gray-900">${(order.totalPrice || 0).toFixed(2)}</p>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                <select
                  value={order.status}
                  onChange={(e) => handleStatusChange(order._id, e.target.value)}
                  className={`w-full text-sm font-semibold rounded-md p-2 border focus:outline-none focus:ring-2 focus:ring-pink-500 transition ${getStatusClass(order.status)}`}
                >
                  {orderStatuses.map(status => (
                    <option key={status} value={status}>{status}</option>
                  ))}
                </select>
                <button
                  onClick={() => handleMarkAsDelivered(order._id)}
                  className="w-full px-4 py-2 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-600 transition disabled:bg-gray-300"
                  disabled={order.status === 'Delivered'}
                >
                  Mark as Delivered
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OrderManagement;