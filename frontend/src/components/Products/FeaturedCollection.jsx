import { Link } from "react-router"; 
import { motion } from "framer-motion";
import featuredImg from "../../assets/featuredImg.webp"; 

function FeaturedCollection() {
  const imageVariants = {
    hidden: { opacity: 0, x: 50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  const contentVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  return (
    <section className="py-12 sm:py-16 lg:py-20 px-4 lg:px-0">
      <motion.div 
        className="container mx-auto flex flex-col-reverse lg:flex-row items-center rounded-3xl bg-gradient-to-br from-gray-100 to-gray-50 overflow-hidden shadow-xl"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: false, amount: 0.2 }}
      >
        {/* Left Content */}
        <motion.div 
          className="lg:w-1/2 p-6 sm:p-8 lg:p-12 text-center lg:text-left flex flex-col justify-center"
          variants={contentVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.3 }}
        >
          <motion.h2 
            className="text-sm sm:text-base font-semibold text-gray-600 mb-3 uppercase tracking-widest"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            Comfort and Style
          </motion.h2>
          <motion.h1 
            className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold mb-4 sm:mb-6 text-gray-900 leading-tight"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            Apparel made for your everyday life
          </motion.h1>
          <motion.p 
            className="text-base sm:text-lg text-gray-700 mb-6 sm:mb-8 leading-relaxed"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            Discover high-quality, comfortable clothing that effortlessly blends
            fashion and function. Designed to make you look and feel great every
            day.
          </motion.p>

          {/* Call-to-action Button */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <Link
              to="/shop"
              className="inline-block bg-black text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-semibold text-base sm:text-lg hover:bg-gray-800 transition duration-300 shadow-lg hover:shadow-2xl transform hover:scale-105 active:scale-95"
            >
              Shop Now →
            </Link>
          </motion.div>
        </motion.div>

        {/* Right Side: Image */}
        <motion.div 
          className="lg:w-1/2 h-full"
          variants={imageVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.3 }}
        >
          <img
            src={featuredImg} 
            alt="Fashion Apparel"
            className="w-full h-full object-cover min-h-[350px] sm:min-h-[400px] lg:min-h-[500px]"
            loading="lazy"
          />
        </motion.div>
      </motion.div>
    </section>
  );
}

export default FeaturedCollection;