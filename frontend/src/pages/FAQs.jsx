import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiChevronDown, FiShoppingBag, FiTruck, FiCreditCard, FiPackage, FiRefreshCw, FiHelpCircle } from "react-icons/fi";

function FAQs() {
  const [openFaq, setOpenFaq] = useState(0);
  const [activeCategory, setActiveCategory] = useState("all");

  const categories = [
    { id: "all", label: "All FAQs", icon: <FiHelpCircle /> },
    { id: "orders", label: "Orders", icon: <FiShoppingBag /> },
    { id: "shipping", label: "Shipping", icon: <FiTruck /> },
    { id: "payment", label: "Payment", icon: <FiCreditCard /> },
    { id: "products", label: "Products", icon: <FiPackage /> },
    { id: "returns", label: "Returns", icon: <FiRefreshCw /> },
  ];

  const faqs = [
    {
      category: "orders",
      question: "How do I place an order?",
      answer: "Browse our collections, add items to your cart, and proceed to checkout. Fill in your shipping details, choose a payment method, and confirm your order. You'll receive a confirmation email with your order details.",
    },
    {
      category: "orders",
      question: "Can I modify or cancel my order?",
      answer: "Yes, you can modify or cancel your order within 2 hours of placing it. Go to 'My Orders' section and select the order you want to modify. If it's already being processed, please contact our support team immediately.",
    },
    {
      category: "orders",
      question: "How do I track my order?",
      answer: "Once your order is shipped, you'll receive a tracking link via email and SMS. You can also track your order by logging into your account and visiting the 'My Orders' section.",
    },
    {
      category: "orders",
      question: "What if I don't receive my order confirmation email?",
      answer: "Check your spam/junk folder first. If you still can't find it, contact our support team with your order details, and we'll resend the confirmation.",
    },
    {
      category: "shipping",
      question: "What are the shipping charges?",
      answer: "We offer free shipping on orders above ₹999. For orders below that, a flat shipping fee of ₹99 applies. Express delivery options are available at additional charges during checkout.",
    },
    {
      category: "shipping",
      question: "How long does delivery take?",
      answer: "Standard delivery takes 5-7 business days. Metro cities usually receive orders within 3-5 days. Express delivery (1-2 days) is available for select pin codes at extra cost.",
    },
    {
      category: "shipping",
      question: "Do you ship internationally?",
      answer: "Currently, we only ship within India. We're working on expanding to international markets soon. Subscribe to our newsletter to stay updated!",
    },
    {
      category: "shipping",
      question: "What if my delivery address is incorrect?",
      answer: "Contact us immediately after placing the order. If the order hasn't been shipped yet, we can update the address. Once shipped, address changes may not be possible.",
    },
    {
      category: "payment",
      question: "What payment methods do you accept?",
      answer: "We accept Credit/Debit Cards (Visa, Mastercard, RuPay), Net Banking, UPI, and popular digital wallets. Cash on Delivery (COD) is available for orders below ₹5000.",
    },
    {
      category: "payment",
      question: "Is it safe to use my card on your website?",
      answer: "Absolutely! We use industry-standard SSL encryption and secure payment gateways. Your card details are never stored on our servers and are processed through PCI-DSS compliant payment partners.",
    },
    {
      category: "payment",
      question: "Can I pay with multiple payment methods?",
      answer: "Currently, we only support single payment method per order. However, you can use gift cards or store credit along with one primary payment method.",
    },
    {
      category: "payment",
      question: "What if my payment fails?",
      answer: "If your payment fails, the amount will be automatically refunded to your account within 5-7 business days. You can retry the payment or choose a different payment method. Contact your bank if the issue persists.",
    },
    {
      category: "products",
      question: "How do I choose the right size?",
      answer: "Each product page has a detailed size chart. You can also refer to our universal sizing guide in the footer. If you're between sizes, we recommend sizing up for a comfortable fit.",
    },
    {
      category: "products",
      question: "Are the colors accurate in product images?",
      answer: "We strive to display accurate colors, but slight variations may occur due to screen settings and lighting. Check the product description for detailed color information.",
    },
    {
      category: "products",
      question: "How do I care for my clothes?",
      answer: "Care instructions are provided on the product page and on the garment's care label. Generally, we recommend washing in cold water, avoiding bleach, and air drying for longevity.",
    },
    {
      category: "products",
      question: "Do you restock sold-out items?",
      answer: "Popular items are usually restocked within 2-3 weeks. Click 'Notify Me' on sold-out products to receive an email when they're back in stock.",
    },
    {
      category: "returns",
      question: "What is your return policy?",
      answer: "We offer a 7-day easy return policy from the date of delivery. Items must be unused, unwashed, with original tags intact. Innerwear, accessories, and sale items are non-returnable.",
    },
    {
      category: "returns",
      question: "How do I initiate a return?",
      answer: "Go to 'My Orders', select the order, and click 'Return Item'. Choose the reason for return and submit. Our team will arrange a pickup within 2-3 business days.",
    },
    {
      category: "returns",
      question: "When will I receive my refund?",
      answer: "Once we receive and inspect the returned item (2-3 days), refunds are processed within 5-7 business days to your original payment method. Store credit refunds are instant.",
    },
    {
      category: "returns",
      question: "Can I exchange an item instead of returning?",
      answer: "Yes! During the return process, select 'Exchange' instead of 'Return'. Choose your preferred size or color, and we'll ship the replacement once we receive the original item.",
    },
  ];

  const filteredFaqs = activeCategory === "all" 
    ? faqs 
    : faqs.filter(faq => faq.category === activeCategory);

  return (
    <section className="bg-gray-50 min-h-screen py-8 sm:py-12 lg:py-16 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        {/* Hero */}
        <motion.div
          className="relative overflow-hidden rounded-3xl border border-gray-200 bg-white mb-8 sm:mb-12"
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55 }}
        >
          <div
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1516321497487-e288fb19713f?q=80&w=1600&auto=format&fit=crop')",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />
          <div className="relative p-6 sm:p-10 lg:p-14 text-center">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-3">
              Frequently Asked Questions
            </h1>
            <p className="text-gray-600 max-w-2xl mx-auto text-sm sm:text-base">
              Find answers to common questions about orders, shipping, payments, products, and returns. 
              Can't find what you're looking for? Contact our support team!
            </p>
          </div>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          className="mb-8 sm:mb-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="flex flex-wrap gap-3 justify-center">
            {categories.map((category, index) => (
              <motion.button
                key={category.id}
                onClick={() => {
                  setActiveCategory(category.id);
                  setOpenFaq(-1);
                }}
                className={`flex items-center gap-2 px-4 sm:px-5 py-2.5 sm:py-3 rounded-lg font-medium transition-all ${
                  activeCategory === category.id
                    ? "bg-black text-white shadow-lg"
                    : "bg-white text-gray-700 border border-gray-200 hover:border-gray-400"
                }`}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: 0.3 + index * 0.05 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="text-lg">{category.icon}</span>
                <span className="text-sm sm:text-base">{category.label}</span>
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* FAQ List */}
        <motion.div
          className="max-w-4xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <div className="bg-white rounded-2xl border border-gray-200 p-4 sm:p-6 lg:p-8 shadow-sm">
            <div className="space-y-3">
              <AnimatePresence mode="wait">
                {filteredFaqs.map((faq, index) => {
                  const isOpen = openFaq === index;
                  return (
                    <motion.div
                      key={`${activeCategory}-${index}`}
                      className="border border-gray-200 rounded-lg overflow-hidden"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                      whileHover={{ scale: 1.01, borderColor: "#000" }}
                    >
                      <button
                        type="button"
                        onClick={() => setOpenFaq(isOpen ? -1 : index)}
                        className="w-full flex items-start justify-between text-left px-4 sm:px-5 py-3.5 sm:py-4 bg-white hover:bg-gray-50 transition-colors"
                      >
                        <span className="font-semibold text-gray-900 text-sm sm:text-base pr-4">
                          {faq.question}
                        </span>
                        <motion.div
                          animate={{ rotate: isOpen ? 180 : 0 }}
                          transition={{ duration: 0.3 }}
                          className="flex-shrink-0 mt-1"
                        >
                          <FiChevronDown className="text-lg" />
                        </motion.div>
                      </button>
                      <AnimatePresence>
                        {isOpen && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                          >
                            <div className="px-4 sm:px-5 pb-4 pt-1">
                              <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                                {faq.answer}
                              </p>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>

            {filteredFaqs.length === 0 && (
              <motion.div
                className="text-center py-12"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4 }}
              >
                <p className="text-gray-500">No FAQs found in this category.</p>
              </motion.div>
            )}
          </div>
        </motion.div>

        {/* Contact CTA */}
        <motion.div
          className="mt-12 sm:mt-16 bg-gradient-to-br from-gray-900 to-gray-800 rounded-3xl p-8 sm:p-12 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3">
            Still have questions?
          </h2>
          <p className="text-gray-300 mb-6 max-w-xl mx-auto text-sm sm:text-base">
            Our support team is here to help! Reach out to us and we'll get back to you within 24 hours.
          </p>
          <motion.a
            href="/contact"
            className="inline-block bg-white text-gray-900 px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Contact Support
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}

export default FAQs;
