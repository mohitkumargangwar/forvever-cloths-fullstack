import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router';
import { FiBox, FiPlus, FiEdit, FiTrash2 } from 'react-icons/fi';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAdminProducts, deleteProduct } from '../../redux/slice/adminProductSlice';

const ProductManagement = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { products = [], loading, error } = useSelector((state) => state.adminProduct);

  useEffect(() => {
    dispatch(fetchAdminProducts());
  }, [dispatch]);

  // Function to handle product deletion
  const handleDeleteProduct = (productId) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      dispatch(deleteProduct(productId));
    }
  };

  // Function to handle product editing (placeholder)
  const handleEditProduct = (productId) => {
    navigate(`/admin/products/${productId}/edit`);
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-8">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 flex items-center">
            <FiBox className="mr-3 text-pink-600" />
            Product Management
          </h1>
          <p className="text-gray-500 mt-1">Manage all your products here.</p>
        </div>
        <Link 
          to="/admin/products/new" 
          className="mt-4 sm:mt-0 inline-flex items-center px-4 py-2 bg-pink-600 text-white font-semibold rounded-lg hover:bg-pink-700 transition"
        >
          <FiPlus className="mr-2" />
          Add New Product
        </Link>
      </div>

      {loading && <p className="text-sm text-gray-600 mb-3">Loading products...</p>}
      {error && <p className="text-sm text-red-600 mb-3">Error: {error}</p>}

      {/* Products Content Area */}
      <div className="bg-white rounded-xl shadow-md border border-gray-100">
        <h2 className="text-lg sm:text-xl font-bold text-gray-900 p-6 border-b border-gray-200">
            All Products
        </h2>
        
        {/* Desktop Table View */}
        <div className="hidden md:block overflow-x-auto">
          {!loading && products.length === 0 && (
            <p className="text-sm text-gray-600 p-4">No products found.</p>
          )}
          <table className="min-w-full divide-y divide-gray-200 text-sm">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">SKU</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {products.map((product) => (
                <tr key={product._id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">{product.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-700">{`$${(product.price || 0).toFixed(2)}`}</td>
                  <td className="px-6 py-4 whitespace-nowrap font-mono text-gray-600">{product.sku || '—'}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    {/* onClick handlers add kiye gaye */}

                    <Link to ={`/admin/products/${product._id}/edit`}>
                    <button 
                      className="inline-flex items-center px-3 py-1 bg-yellow-100 text-yellow-800 rounded-md hover:bg-yellow-200 transition-colors mr-2" >
                      <FiEdit size={14} className="mr-1" /> Edit
                    </button>
                    </Link>

                    <button 
                      onClick={() => handleDeleteProduct(product._id)}
                      className="inline-flex items-center px-3 py-1 bg-red-100 text-red-800 rounded-md hover:bg-red-200 transition-colors"
                    >
                      <FiTrash2 size={14} className="mr-1" /> Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile Card View */}
        <div className="md:hidden divide-y divide-gray-200">
          {products.map((product) => (
            <div key={product._id} className="p-4">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <p className="text-base font-bold text-gray-900">{product.name}</p>
                  <p className="text-sm font-semibold text-gray-700 mt-1">{`$${(product.price || 0).toFixed(2)}`}</p>
                </div>
                <div className="flex space-x-2">
                  {/* onClick handlers add kiye gaye */}
                  <button 
                    onClick={() => handleEditProduct(product._id)}
                    className="p-2 bg-yellow-100 text-yellow-800 rounded-md hover:bg-yellow-200 transition-colors"
                  >
                    <FiEdit size={18} />
                  </button>
                  <button 
                    onClick={() => handleDeleteProduct(product._id)}
                    className="p-2 bg-red-100 text-red-800 rounded-md hover:bg-red-200 transition-colors"
                  >
                    <FiTrash2 size={18} />
                  </button>
                </div>
              </div>
              <p className="text-xs text-gray-500">SKU: <span className="font-mono">{product.sku || '—'}</span></p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductManagement;