import menFashion from "../../assets/menFashion.jpg";
import fashion1 from "../../assets/fashion1.jpg";
import { Link } from "react-router";
import { motion } from "framer-motion";

export default function GenderCollections() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  return (
    <section className="py-12 sm:py-16 lg:py-20 px-4 lg:px-0">
      <motion.div 
        className="container mx-auto"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.1 }}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 lg:gap-10">
          {/* Women's Collection */}
          <motion.div 
            className="relative group overflow-hidden rounded-2xl h-[400px] sm:h-[500px] lg:h-[650px]"
            variants={itemVariants}
            whileHover={{ scale: 1.02 }}
          >
            <img
              src={fashion1}
              alt="Women's Collection"
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              loading="lazy"
            />
            
            {/* Unified overlay - Always visible */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/95 via-black/70 to-transparent p-6 sm:p-8 group-hover:via-black/80 transition-all duration-300">
              <motion.h2 
                className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-3 sm:mb-4"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                Women's Collection
              </motion.h2>
              <Link
                to="/collections/all?gender=Women"
                className="inline-flex items-center gap-2 text-white font-semibold hover:text-gray-200 hover:gap-3 transition-all duration-300 text-base sm:text-lg group/link"
              >
                <span>Shop Now</span>
                <span className="transform group-hover/link:translate-x-1 transition-transform">→</span>
              </Link>
            </div>
          </motion.div>

          {/* Men's Collection */}
          <motion.div 
            className="relative group overflow-hidden rounded-2xl h-[400px] sm:h-[500px] lg:h-[650px]"
            variants={itemVariants}
            whileHover={{ scale: 1.02 }}
          >
            <img
              src={menFashion}
              alt="Men's Collection"
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              loading="lazy"
            />
            
            {/* Unified overlay - Always visible */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/95 via-black/70 to-transparent p-6 sm:p-8 group-hover:via-black/80 transition-all duration-300">
              <motion.h2 
                className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-3 sm:mb-4"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                Men's Collection
              </motion.h2>
              <Link
                to="/collections/all?gender=Men"
                className="inline-flex items-center gap-2 text-white font-semibold hover:text-gray-200 hover:gap-3 transition-all duration-300 text-base sm:text-lg group/link"
              >
                <span>Shop Now</span>
                <span className="transform group-hover/link:translate-x-1 transition-transform">→</span>
              </Link>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
