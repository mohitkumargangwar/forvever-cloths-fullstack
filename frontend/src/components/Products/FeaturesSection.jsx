import { HiShoppingBag, HiOutlineCurrencyDollar, HiOutlineChatAlt2 } from "react-icons/hi";

// Yeh component aapke 3 feature sections ko display karega
const FeaturesSection = () => {
  // 1. Saara data ek array mein daal dein
  const features = [
    {
      icon: <HiShoppingBag className="text-xl" />,
      title: "FREE INTERNATIONAL SHIPPING",
      description: "On all orders over $100.00",
    },
    {
      icon: <HiOutlineCurrencyDollar className="text-xl" />,
      title: "MONEY BACK GUARANTEE",
      description: "We offer a 30-day money-back guarantee",
    },
    {
      icon: <HiOutlineChatAlt2 className="text-xl" />,
      title: "24/7 CUSTOMER SUPPORT",
      description: "Contact us 24 hours a day, 7 days a week",
    },
  ];

  return (
    <section className="py-16 px-4 bg-white">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
        
        {/* 2. .map() function se array ko loop karein */}
        {features.map((feature, index) => (
          <div key={index} className="flex flex-col items-center">
            <div className="p-4 rounded-full bg-gray-100 mb-4">
              {feature.icon}
            </div>
            <h4 className="tracking-tighter mb-2 font-medium text-gray-800">
              {feature.title}
            </h4>
            <p className="text-gray-600 text-sm tracking-tighter">
              {feature.description}
            </p>
          </div>
        ))}

      </div>
    </section>
  );
};

export default FeaturesSection;