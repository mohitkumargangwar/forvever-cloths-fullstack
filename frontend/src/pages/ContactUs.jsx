import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiMail, FiMapPin, FiPhoneCall, FiClock, FiChevronDown } from "react-icons/fi";
import { toast } from "sonner";

function ContactUs() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [openFaq, setOpenFaq] = useState(0);

  const faqs = [
    {
      question: "How long does support take to reply?",
      answer: "Our team usually replies within 24 hours on business days.",
    },
    {
      question: "Can I modify or cancel my order?",
      answer: "Yes, if your order has not been shipped yet. Contact us quickly with your order ID.",
    },
    {
      question: "Do you support bulk/corporate orders?",
      answer: "Yes, we handle bulk orders. Share your requirement in the message and we will contact you.",
    },
  ];

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((previous) => ({ ...previous, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
      toast.error("Please fill all fields");
      return;
    }

    toast.success("Message sent successfully!");
    setFormData({ name: "", email: "", subject: "", message: "" });
  };

  return (
    <section className="bg-gray-50 min-h-screen py-8 sm:py-12 lg:py-16 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="relative overflow-hidden rounded-3xl border border-gray-200 bg-white mb-8 sm:mb-10"
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55 }}
          viewport={{ once: true }}
        >
          <div
            className="absolute inset-0 opacity-15"
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?q=80&w=1600&auto=format&fit=crop')",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />
          <div className="relative p-6 sm:p-10 lg:p-12 text-center">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900">Contact Us</h1>
            <p className="mt-4 text-gray-700 max-w-2xl mx-auto">
              Have questions about products, orders, sizing, shipping, or support? Send us a message and our team will get back to you quickly.
            </p>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10">
          <motion.div
            className="bg-white rounded-2xl border border-gray-200 p-6 sm:p-8 shadow-sm"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.45 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Get In Touch</h2>

            <div className="space-y-5">
              <div className="flex items-start gap-4">
                <span className="p-3 rounded-full bg-gray-100 text-gray-900">
                  <FiPhoneCall className="text-lg" />
                </span>
                <div>
                  <p className="font-semibold text-gray-900">Phone</p>
                  <a href="tel:0123456789" className="text-gray-600 hover:text-black transition-colors">0123-456-789</a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <span className="p-3 rounded-full bg-gray-100 text-gray-900">
                  <FiMail className="text-lg" />
                </span>
                <div>
                  <p className="font-semibold text-gray-900">Email</p>
                  <a href="mailto:support@forevercloths.com" className="text-gray-600 hover:text-black transition-colors">support@forevercloths.com</a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <span className="p-3 rounded-full bg-gray-100 text-gray-900">
                  <FiMapPin className="text-lg" />
                </span>
                <div>
                  <p className="font-semibold text-gray-900">Address</p>
                  <p className="text-gray-600">Forever Cloths, Fashion Street, New Delhi, India</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <span className="p-3 rounded-full bg-gray-100 text-gray-900">
                  <FiClock className="text-lg" />
                </span>
                <div>
                  <p className="font-semibold text-gray-900">Working Hours</p>
                  <p className="text-gray-600">Mon - Sat: 10:00 AM - 7:00 PM</p>
                </div>
              </div>
            </div>

            <div className="mt-8 rounded-xl overflow-hidden border border-gray-200">
              <iframe
                title="Forever Cloths Location"
                src="https://www.google.com/maps?q=New%20Delhi%20India&output=embed"
                className="w-full h-56"
                loading="lazy"
              />
            </div>
          </motion.div>

          <motion.div
            className="space-y-8"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.45 }}
            viewport={{ once: true }}
          >
            <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-gray-200 p-6 sm:p-8 shadow-sm space-y-5">
              <h2 className="text-2xl font-bold text-gray-900">Send a Message</h2>

              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Your Name"
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-black/10"
              />

              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Your Email"
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-black/10"
              />

              <input
                type="text"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                placeholder="Subject"
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-black/10"
              />

              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Your Message"
                rows={6}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-black/10 resize-none"
              />

              <button
                type="submit"
                className="w-full bg-black text-white py-3 rounded-lg font-semibold hover:bg-gray-800 transition-colors"
              >
                Send Message
              </button>
            </form>

            <div className="bg-white rounded-2xl border border-gray-200 p-6 sm:p-8 shadow-sm">
              <h3 className="text-xl font-bold text-gray-900 mb-4">FAQs</h3>
              <div className="space-y-3">
                {faqs.map((item, index) => {
                  const isOpen = openFaq === index;
                  return (
                    <motion.div
                      key={item.question}
                      className="border border-gray-200 rounded-lg overflow-hidden"
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      viewport={{ once: true }}
                      whileHover={{ scale: 1.02, borderColor: "#000" }}
                    >
                      <button
                        type="button"
                        onClick={() => setOpenFaq(isOpen ? -1 : index)}
                        className="w-full flex items-center justify-between text-left px-4 py-3 bg-white hover:bg-gray-50 transition-colors"
                      >
                        <span className="font-medium text-gray-900">{item.question}</span>
                        <motion.div
                          animate={{ rotate: isOpen ? 180 : 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          <FiChevronDown />
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
                            <p className="px-4 pb-4 text-sm text-gray-600">{item.answer}</p>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default ContactUs;
