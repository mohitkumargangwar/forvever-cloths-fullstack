
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { Link } from "react-router"
import axios from "axios";
import { useEffect, useState, useRef } from "react";
 
function NewArrivals() {
 const [newArrivals, setNewArrivals] = useState([]);
 const scrollRef = useRef(null);

 useEffect(() => {
  const fetchNewArrivals = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/products/new-arrivals`);
      setNewArrivals(response.data);
    } catch (error) {
      console.log("Error: ", error);  
    }
  };
  fetchNewArrivals();
 }, [])

 const scroll = (direction) => {
  if (scrollRef.current) {
    const scrollAmount = 300;
    if (direction === "left") {
      scrollRef.current.scrollBy({ left: -scrollAmount, behavior: "smooth" });
    } else {
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  }
 }
 
  return (
    <section className="py-4 px-4 lg:px-0">
        <div className="container mx-auto mb-10 relative">
            {/* Scroll Buttons */}
                <div className="flex justify-center sm:justify-between space-x-2 items-center">
                <h2 className=" text-3xl font-bold  mb-4">Explore New Arrivals</h2>
                <div className="hidden sm:flex space-x-2">
                <button 
                  onClick={() => scroll("left")}
                  className="p-2 rounded border bg-white text-black hover:bg-gray-100 transition">
                    <FiChevronLeft className="text-2xl" />
                </button>
                <button 
                  onClick={() => scroll("right")}
                  className="p-2 rounded border bg-white text-black hover:bg-gray-100 transition">
                    <FiChevronRight className="text-2xl" />
                </button>
                </div>
                </div>

            <p className="text-lg text-gray-600 mt-8">
            Discover the latest styles straight off the runway, freshly added to
            keep your wardrobe on the cutting edge of fashion.
            </p>

        </div>
  {/* scroller */}
  <div 
    ref={scrollRef}
    className="container mx-auto overflow-x-scroll hide-scrollbar flex space-x-6 relative hover:rounded-lg">
    {newArrivals?.map((product, index) => (
      
        <div
        key={product._id || index}
        className="min-w-[100%] sm:min-w-[50%] lg:min-w-[30%] relative hover:cursor-pointer transition-all duration-300 hover:scale-95 "
        >
        <Link to={`/product/${product._id}`} className="block">
        <img
            src={product.images[0]?.url}
            alt={product.images[0]?.altText || product.name}
            className="w-full h-[500px] object-cover rounded-lg hover:border-2 border-blue-500 transition-all duration-300"
            loading="lazy"
        />
        <div className="absolute bottom-0 left-0 right-0  backdrop-blur-xs  p-4 rounded-b-lg">
            
            <h4 className="font-medium opacity-100  text-white">{product.name}</h4>
            <p className="mt-1 opacity-100  text-white">${product.price}</p>
           
        </div>
        </Link>
        </div>
         
    ))}
</div>
</section>
  )
}

export default NewArrivals;