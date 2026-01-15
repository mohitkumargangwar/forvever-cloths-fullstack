import { Link } from "react-router"; 
import featuredImg from "../../assets/featuredImg.webp"; 

function FeaturedCollection() {
  return (
    <section className="py-16 px-4 lg:px-0">
      <div className="container mx-auto flex flex-col-reverse lg:flex-row items-center rounded-3xl bg-gray-100 overflow-hidden">
        {/* Left Content */}
        <div className="lg:w-1/2 p-8 text-center lg:text-left">
          <h2 className="text-lg font-semibold text-gray-700 mb-2">
            Comfort and Style
          </h2>
          <h1 className="text-4xl lg:text-5xl font-bold mb-6 text-gray-900">
            Apparel made for your everyday life
          </h1>
          <p className="text-lg text-gray-600 mb-8">
            Discover high-quality, comfortable clothing that effortlessly blends
            fashion and function. Designed to make you look and feel great every
            day.
          </p>

          {/* Call-to-action Button */}
          <Link
            to="/shop"
            className="inline-block bg-black text-white px-8 py-3 rounded-lg font-semibold text-lg hover:bg-gray-800 transition duration-300 shadow-md"
          >
            Shop Now
          </Link>
        </div>

        {/* Right Side: Image */}
        <div className="lg:w-1/2 h-full">
          <img
            src={featuredImg} 
            alt="Fashion Apparel"
            className="w-full h-full object-cover"
            loading="lazy"
          />
        </div>
      </div>
    </section>
  );
}

export default FeaturedCollection;