import { Link } from "react-router";

function ProductGrid({ products, loading, error }) {
  // default empty array
  let safeProducts = [];

  if (Array.isArray(products)) {
    safeProducts = products;
  } else if (products && Array.isArray(products.similarProducts)) {
    // extra safety agar kahin se object aa jaye
    safeProducts = products.similarProducts;
  } else if (products && Array.isArray(products.products)) {
    safeProducts = products.products;
  }

  if (loading) {
    return <p className="text-center py-6">Loading products...</p>;
  }

  if (error) {
    return (
      <p className="text-center py-6 text-red-500">
        Error: {error}
      </p>
    );
  }

  // agar zero hai to kuch bhi mat dikhana
  if (safeProducts.length === 0) {
    return null;
  }

  return (
    <div className="max-w-7xl w-full mx-auto pb-10 px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
        {safeProducts.map((product) => (
          <Link
            key={product._id}
            to={`/product/${product._id || product.id}`}
            className="block group"
          >
            <div className="bg-white p-4 rounded-lg shadow-sm hover:shadow-lg transition-shadow duration-300">
              <div className="w-full h-80 mb-4 overflow-hidden rounded-lg">
                <img
                  src={product.images?.[0]?.url}
                  alt={product.images?.[0]?.altText || product.name}
                  className="w-full h-full object-cover rounded-lg group-hover:scale-105 transition-transform duration-300"
                  loading="lazy"
                />
              </div>
              <h3 className="text-md mb-2 font-semibold text-gray-800">
                {product.name}
              </h3>
              <p className="text-gray-600 font-medium text-lg tracking-tighter">
                ${product.price}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default ProductGrid;
