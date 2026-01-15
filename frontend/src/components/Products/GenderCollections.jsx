import menFashion from "../../assets/menFashion.jpg";
import fashion1 from "../../assets/fashion1.jpg";
import { Link } from "react-router";

export default function GenderCollections() {
  return (
    <section className="py-16 px-4 lg:px-0">
      <div className="container mx-auto flex flex-col md:flex-row gap-8 group">
        {/* Women's Collection */}
        <div className="relative flex-1 transition-transform duration-300 group-hover:blur-sm hover:!blur-none hover:scale-95">
          <img
            src={fashion1}
            alt="Women's Collection"
            className="w-full h-[700px] object-cover"
            loading="lazy"
          />
          <div className="absolute bottom-8 left-8 bg-white opacity-90 p-4">
            <h2 className="text-2xl font-bold text-gray-900 mb-3">
              Women's Collection
            </h2>
            <Link
              to="/collections/all?gender=Women"
              className="text-gray-900 underline hover:text-blue-800"
            >
              Shop Now
            </Link>
          </div>
        </div>

        {/* Men's Collection */}
        <div className="relative flex-1 transition-transform duration-300 group-hover:blur-sm hover:!blur-none hover:scale-95">
          <img
            src={menFashion}
            alt="Men's Collection"
            className="w-full h-[700px] object-cover"
            loading="lazy"
          />
          <div className="absolute bottom-8 left-8 bg-white opacity-90 p-4">
            <h2 className="text-2xl font-bold text-gray-900 mb-3">
              Men's Collection
            </h2>
            <Link
              to="/collections/all?gender=Men"
              className="text-gray-900 underline hover:text-blue-800"
            >
              Shop Now
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
