import { Link } from "react-router";
import { motion } from "framer-motion";
import { ProductGridShimmer } from "../Common/ShimmerLoader";

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
    return <ProductGridShimmer count={8} />;
  }

  if (error) {
    return (
      <p className="text-center py-6 text-red-500 text-base sm:text-lg">
        Error: {error}
      </p>
    );
  }

  // agar zero hai to kuch bhi mat dikhana
  if (safeProducts.length === 0) {
    return null;
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  return (
    <motion.div 
      className="max-w-7xl w-full mx-auto pb-10 sm:pb-16 px-4 sm:px-6 lg:px-8"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
        {safeProducts.map((product) => (
          <motion.div
            key={product._id}
            variants={itemVariants}
          >
            <Link
              to={`/product/${product._id || product.id}`}
              className="block h-full group"
            >
              <motion.div 
                className="bg-white h-full rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden flex flex-col"
                whileHover={{ y: -8 }}
              >
                {/* Image Container */}
                <div className="w-full aspect-square overflow-hidden rounded-t-2xl bg-gray-100">
                  <motion.img
                    src={product.images?.[0]?.url}
                    alt={product.images?.[0]?.altText || product.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    loading="lazy"
                    whileHover={{ scale: 1.1 }}
                  />
                </div>

                {/* Content Container */}
                <div className="p-4 sm:p-5 flex flex-col flex-grow">
                  <h3 className="text-sm sm:text-base font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-black transition-colors">
                    {product.name}
                  </h3>
                  <p className="text-gray-600 font-medium text-base sm:text-lg tracking-tight mb-3 flex-grow">
                    ${product.price}
                  </p>
                  
                  {/* CTA Button */}
                  <motion.div
                    className="text-xs sm:text-sm font-semibold text-white bg-black rounded-lg py-2 px-4 text-center group-hover:bg-gray-800 transition-colors opacity-0 group-hover:opacity-100"
                    whileHover={{ scale: 1.05 }}
                  >
                    View Details
                  </motion.div>
                </div>
              </motion.div>
            </Link>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

export default ProductGrid;
