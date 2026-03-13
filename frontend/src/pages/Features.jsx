import { motion } from "framer-motion";
import {
  FiTruck,
  FiShield,
  FiRefreshCw,
  FiCreditCard,
  FiAward,
  FiHeadphones,
  FiPackage,
  FiTag,
  FiStar,
  FiZap,
  FiHeart,
  FiGlobe,
} from "react-icons/fi";

function Features() {
  const mainFeatures = [
    {
      icon: <FiTruck className="text-3xl" />,
      title: "Free Shipping",
      description: "Enjoy free delivery on all orders above ₹999. Fast and reliable shipping across India.",
      color: "from-blue-500 to-blue-600",
    },
    {
      icon: <FiRefreshCw className="text-3xl" />,
      title: "Easy Returns",
      description: "7-day hassle-free return policy. Not satisfied? Return it with no questions asked.",
      color: "from-green-500 to-green-600",
    },
    {
      icon: <FiShield className="text-3xl" />,
      title: "Secure Payments",
      description: "Your transactions are protected with bank-grade SSL encryption and secure gateways.",
      color: "from-purple-500 to-purple-600",
    },
    {
      icon: <FiHeadphones className="text-3xl" />,
      title: "24/7 Support",
      description: "Our dedicated support team is always ready to help you with any queries or issues.",
      color: "from-orange-500 to-orange-600",
    },
    {
      icon: <FiAward className="text-3xl" />,
      title: "Premium Quality",
      description: "Handpicked fabrics and materials ensuring durability, comfort, and style.",
      color: "from-pink-500 to-pink-600",
    },
    {
      icon: <FiZap className="text-3xl" />,
      title: "Quick Delivery",
      description: "Express delivery options available. Metro cities receive orders in 2-3 days.",
      color: "from-yellow-500 to-yellow-600",
    },
  ];

  const additionalFeatures = [
    {
      icon: <FiPackage />,
      title: "Gift Wrapping",
      description: "Free gift wrapping service for special occasions.",
    },
    {
      icon: <FiTag />,
      title: "Exclusive Deals",
      description: "Members get early access to sales and exclusive discounts.",
    },
    {
      icon: <FiStar />,
      title: "Loyalty Rewards",
      description: "Earn points on every purchase and redeem for discounts.",
    },
    {
      icon: <FiCreditCard />,
      title: "Multiple Payment Options",
      description: "UPI, Cards, Net Banking, Wallets, and COD available.",
    },
    {
      icon: <FiHeart />,
      title: "Wishlist & Favorites",
      description: "Save your favorite items and get notified of price drops.",
    },
    {
      icon: <FiGlobe />,
      title: "Track Your Order",
      description: "Real-time order tracking from warehouse to your doorstep.",
    },
  ];

  const customerBenefits = [
    {
      title: "Size Guides",
      description: "Comprehensive size charts for perfect fits every time.",
    },
    {
      title: "Style Advice",
      description: "Expert styling tips and outfit recommendations.",
    },
    {
      title: "Virtual Try-On",
      description: "Visualize how clothes look before you buy (coming soon).",
    },
    {
      title: "Eco-Friendly",
      description: "Sustainable packaging and ethical sourcing practices.",
    },
  ];

  return (
    <section className="bg-gray-50 min-h-screen">
      {/* Hero Section */}
      <motion.div
        className="relative overflow-hidden bg-white border-b border-gray-200"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1472851294608-062f824d29cc?q=80&w=1600&auto=format&fit=crop')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-16 sm:py-20 lg:py-24 text-center">
          <motion.h1
            className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-4"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Why Choose Forever Cloths?
          </motion.h1>
          <motion.p
            className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            Experience the perfect blend of quality, convenience, and style. Discover features designed to make your shopping effortless.
          </motion.p>
        </div>
      </motion.div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-16 lg:py-20 space-y-16 lg:space-y-24">
        {/* Main Features Grid */}
        <div>
          <motion.h2
            className="text-3xl sm:text-4xl font-bold text-gray-900 text-center mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            Core Features
          </motion.h2>
          <motion.p
            className="text-gray-600 text-center max-w-2xl mx-auto mb-10"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Everything you need for a seamless shopping experience
          </motion.p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {mainFeatures.map((feature, index) => (
              <motion.div
                key={feature.title}
                className="relative bg-white rounded-2xl p-8 border border-gray-200 shadow-sm overflow-hidden group"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -8, boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1)" }}
              >
                <div
                  className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${feature.color} opacity-5 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-500`}
                />
                <div className="relative">
                  <div className={`inline-flex p-4 rounded-xl bg-gradient-to-br ${feature.color} text-white mb-4`}>
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                  <p className="text-gray-600 leading-7">{feature.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Additional Features */}
        <div className="bg-white rounded-3xl border border-gray-200 p-8 sm:p-10 lg:p-12">
          <motion.h2
            className="text-3xl sm:text-4xl font-bold text-gray-900 text-center mb-10"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            More Reasons to Love Us
          </motion.h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {additionalFeatures.map((feature, index) => (
              <motion.div
                key={feature.title}
                className="flex items-start gap-4 p-5 rounded-xl border border-gray-200 hover:border-gray-400 transition-all"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: index * 0.08 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.03 }}
              >
                <div className="flex-shrink-0 p-3 rounded-lg bg-gray-100 text-gray-900">
                  <span className="text-xl">{feature.icon}</span>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">{feature.title}</h4>
                  <p className="text-sm text-gray-600 leading-6">{feature.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Customer Benefits */}
        <motion.div
          className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-3xl p-8 sm:p-12 lg:p-16"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-white text-center mb-4">
            Enhanced Shopping Experience
          </h2>
          <p className="text-gray-300 text-center max-w-2xl mx-auto mb-10">
            We go the extra mile to ensure you have the best experience
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {customerBenefits.map((benefit, index) => (
              <motion.div
                key={benefit.title}
                className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ backgroundColor: "rgba(255, 255, 255, 0.1)", scale: 1.05 }}
              >
                <h4 className="font-bold text-white text-lg mb-2">{benefit.title}</h4>
                <p className="text-gray-300 text-sm leading-6">{benefit.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Stats Section */}
        <motion.div
          className="grid grid-cols-2 lg:grid-cols-4 gap-6"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          {[
            { number: "50K+", label: "Happy Customers", color: "from-blue-500 to-blue-600" },
            { number: "10K+", label: "Products Delivered", color: "from-green-500 to-green-600" },
            { number: "500+", label: "Unique Styles", color: "from-purple-500 to-purple-600" },
            { number: "4.8/5", label: "Customer Rating", color: "from-orange-500 to-orange-600" },
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              className={`bg-gradient-to-br ${stat.color} rounded-2xl p-6 sm:p-8 text-center text-white`}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05, rotate: 2 }}
            >
              <div className="text-3xl sm:text-4xl font-bold mb-2">{stat.number}</div>
              <div className="text-sm sm:text-base opacity-90">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA Section */}
        <motion.div
          className="bg-white rounded-3xl border border-gray-200 p-8 sm:p-12 lg:p-16 text-center"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Ready to Experience the Difference?
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto mb-8">
            Join thousands of satisfied customers and discover why Forever Cloths is the preferred choice for fashion lovers.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.a
              href="/collections/all"
              className="inline-block bg-black text-white px-8 py-4 rounded-lg font-semibold hover:bg-gray-800 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Start Shopping
            </motion.a>
            <motion.a
              href="/about"
              className="inline-block bg-white text-gray-900 px-8 py-4 rounded-lg font-semibold border-2 border-gray-900 hover:bg-gray-50 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Learn More
            </motion.a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default Features;
