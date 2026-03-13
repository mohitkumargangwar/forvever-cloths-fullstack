import { HiShoppingBag, HiOutlineCurrencyDollar, HiOutlineChatAlt2 } from "react-icons/hi";
import { motion } from "framer-motion";

// Yeh component aapke 3 feature sections ko display karega
const FeaturesSection = () => {
  // 1. Saara data ek array mein daal dein
  const features = [
    {
      icon: <HiShoppingBag className="text-3xl sm:text-4xl" />,
      title: "FREE INTERNATIONAL SHIPPING",
      description: "On all orders over $100.00",
      color: "from-blue-50 to-blue-100",
      borderColor: "border-blue-200",
    },
    {
      icon: <HiOutlineCurrencyDollar className="text-3xl sm:text-4xl" />,
      title: "MONEY BACK GUARANTEE",
      description: "We offer a 30-day money-back guarantee",
      color: "from-green-50 to-green-100",
      borderColor: "border-green-200",
    },
    {
      icon: <HiOutlineChatAlt2 className="text-3xl sm:text-4xl" />,
      title: "24/7 CUSTOMER SUPPORT",
      description: "Contact us 24 hours a day, 7 days a week",
      color: "from-purple-50 to-purple-100",
      borderColor: "border-purple-200",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  return (
    <section className="py-12 sm:py-16 lg:py-20 px-4 bg-gradient-to-b from-white via-gray-50 to-white">
      <motion.div 
        className="container mx-auto"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.2 }}
      >
        <motion.h2 
          className="text-center text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-12 sm:mb-16"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Why Choose Us
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 lg:gap-10">
          {/* 2. .map() function se array ko loop karein */}
          {features.map((feature, index) => (
            <motion.div 
              key={index}
              className={`p-6 sm:p-8 rounded-2xl border-2 ${feature.borderColor} bg-gradient-to-br ${feature.color} text-center shadow-md hover:shadow-lg transition-all duration-300`}
              variants={itemVariants}
              whileHover={{ 
                y: -5,
                transition: { duration: 0.3 },
              }}
            >
              <motion.div 
                className="mb-4 flex justify-center text-gray-700"
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="p-3 sm:p-4 rounded-full bg-white shadow-md">
                  {feature.icon}
                </div>
              </motion.div>
              
              <h4 className="tracking-tighter mb-3 font-bold text-gray-900 text-sm sm:text-base">
                {feature.title}
              </h4>
              <p className="text-gray-700 text-sm sm:text-base tracking-tight leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default FeaturesSection;