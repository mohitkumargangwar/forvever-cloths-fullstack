import { motion } from "framer-motion";
import { FiHeart, FiTrendingUp, FiAward, FiUsers, FiShield, FiStar } from "react-icons/fi";

function AboutUs() {
  const values = [
    {
      icon: <FiHeart className="text-2xl" />,
      title: "Quality First",
      description: "We never compromise on the quality of our fabrics and craftsmanship.",
    },
    {
      icon: <FiShield className="text-2xl" />,
      title: "Trust & Transparency",
      description: "Honest pricing, secure checkout, and reliable delivery every time.",
    },
    {
      icon: <FiUsers className="text-2xl" />,
      title: "Customer Focused",
      description: "Your satisfaction is our priority. We listen, improve, and deliver.",
    },
    {
      icon: <FiStar className="text-2xl" />,
      title: "Trendy Collections",
      description: "Stay ahead with our latest fashion trends and timeless classics.",
    },
  ];

  const stats = [
    { number: "50K+", label: "Happy Customers" },
    { number: "10K+", label: "Products Sold" },
    { number: "500+", label: "Unique Designs" },
    { number: "4.8/5", label: "Average Rating" },
  ];

  const team = [
    {
      name: "Priya Sharma",
      role: "Founder & CEO",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop",
    },
    {
      name: "Rahul Verma",
      role: "Creative Director",
      image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=400&fit=crop",
    },
    {
      name: "Anjali Mehra",
      role: "Head of Operations",
      image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=400&fit=crop",
    },
    {
      name: "Arjun Patel",
      role: "Customer Success",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
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
              "url('https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?q=80&w=1600&auto=format&fit=crop')",
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
            About Forever Cloths
          </motion.h1>
          <motion.p
            className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            Redefining fashion with quality, style, and affordability. Your trusted destination for timeless clothing since 2020.
          </motion.p>
        </div>
      </motion.div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-16 lg:py-20 space-y-16 lg:space-y-24">
        {/* Our Story */}
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="order-2 lg:order-1">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Our Story</h2>
            <p className="text-gray-600 leading-7 mb-4">
              Forever Cloths was born out of a simple idea: fashion should be accessible, stylish, and sustainable. What started as a small boutique in 2020 has grown into a beloved online destination for fashion enthusiasts across the country.
            </p>
            <p className="text-gray-600 leading-7 mb-4">
              We believe that great clothing isn't just about looking good—it's about feeling confident, expressing yourself, and making choices that matter. That's why every piece in our collection is carefully curated with attention to quality, design, and value.
            </p>
            <p className="text-gray-600 leading-7">
              Today, we're proud to serve thousands of happy customers who trust us for their everyday style needs. From casual wear to statement pieces, we're here to help you look and feel your best.
            </p>
          </div>
          <motion.div
            className="order-1 lg:order-2 rounded-2xl overflow-hidden shadow-lg"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3 }}
          >
            <img
              src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=800&auto=format&fit=crop"
              alt="Fashion Store"
              className="w-full h-64 sm:h-80 lg:h-96 object-cover"
            />
          </motion.div>
        </motion.div>

        {/* Mission & Vision */}
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-2 gap-8"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <motion.div
            className="bg-white rounded-2xl p-8 sm:p-10 border border-gray-200 shadow-sm"
            whileHover={{ y: -5, boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1)" }}
            transition={{ duration: 0.3 }}
          >
            <div className="inline-flex p-3 rounded-full bg-black text-white mb-4">
              <FiTrendingUp className="text-2xl" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-3">Our Mission</h3>
            <p className="text-gray-600 leading-7">
              To make premium fashion accessible to everyone by offering high-quality, trendy clothing at affordable prices. We're committed to delivering exceptional customer experiences and building lasting relationships with our community.
            </p>
          </motion.div>

          <motion.div
            className="bg-white rounded-2xl p-8 sm:p-10 border border-gray-200 shadow-sm"
            whileHover={{ y: -5, boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1)" }}
            transition={{ duration: 0.3 }}
          >
            <div className="inline-flex p-3 rounded-full bg-black text-white mb-4">
              <FiAward className="text-2xl" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-3">Our Vision</h3>
            <p className="text-gray-600 leading-7">
              To become India's most trusted online fashion brand, known for our commitment to quality, sustainability, and customer satisfaction. We envision a future where style meets responsibility and fashion empowers individuals.
            </p>
          </motion.div>
        </motion.div>

        {/* Stats */}
        <motion.div
          className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-3xl p-8 sm:p-12 lg:p-16"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-white text-center mb-10">Our Journey in Numbers</h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-2">{stat.number}</div>
                <div className="text-gray-300 text-sm sm:text-base">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Values */}
        <div>
          <motion.h2
            className="text-3xl sm:text-4xl font-bold text-gray-900 text-center mb-10"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            What We Stand For
          </motion.h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm text-center"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -8, borderColor: "#000" }}
              >
                <div className="inline-flex p-4 rounded-full bg-gray-100 text-gray-900 mb-4">
                  {value.icon}
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{value.title}</h3>
                <p className="text-sm text-gray-600 leading-6">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Team */}
        <div>
          <motion.h2
            className="text-3xl sm:text-4xl font-bold text-gray-900 text-center mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            Meet Our Team
          </motion.h2>
          <motion.p
            className="text-gray-600 text-center max-w-2xl mx-auto mb-10"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            The passionate people behind Forever Cloths, working every day to bring you the best fashion experience.
          </motion.p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {team.map((member, index) => (
              <motion.div
                key={member.name}
                className="bg-white rounded-xl overflow-hidden border border-gray-200 shadow-sm"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -8, boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1)" }}
              >
                <motion.div
                  className="overflow-hidden"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                >
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-64 object-cover"
                  />
                </motion.div>
                <div className="p-5 text-center">
                  <h3 className="text-lg font-bold text-gray-900 mb-1">{member.name}</h3>
                  <p className="text-sm text-gray-600">{member.role}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <motion.div
          className="bg-white rounded-3xl border border-gray-200 p-8 sm:p-12 lg:p-16 text-center"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Join Our Fashion Journey</h2>
          <p className="text-gray-600 max-w-2xl mx-auto mb-8">
            Discover the latest trends, exclusive deals, and style inspiration. Start shopping with Forever Cloths today!
          </p>
          <motion.a
            href="/collections/all"
            className="inline-block bg-black text-white px-8 py-4 rounded-lg font-semibold hover:bg-gray-800 transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Explore Collections
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}

export default AboutUs;
