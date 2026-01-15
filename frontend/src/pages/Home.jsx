import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

import Hero from "../components/Layout/Hero";
import FeaturedCollection from "../components/Products/FeaturedCollection";
import FeaturesSection from "../components/Products/FeaturesSection";
import GenderCollections from "../components/Products/GenderCollections";
import NewArrivals from "../components/Products/NewArrivals";
import ProductDetails from "../components/Products/ProductDetails";
import ProductGrid from "../components/Products/ProductGrid";

import { fetchProductByFilters } from "../redux/slice/productSlice";

function Home() {
  const dispatch = useDispatch();
  const { products, loading, error } = useSelector((state) => state.products);

  const [bestsellerProduct, setBestSellerProduct] = useState(null);

  useEffect(() => {
    // Women Bottom Wear ke products
    dispatch(
      fetchProductByFilters({
        gender: "Women",
        category: "Bottom Wear",
        limit: 8,
      })
    );

    // Best seller products (array se sirf ek product pick karna)
    const fetchBestSeller = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/products/best-seller`
        );

        const data = response.data;
        let firstProduct = null;

        if (Array.isArray(data) && data.length > 0) {
          firstProduct = data[0]; // sirf pehla best seller product
        }

        setBestSellerProduct(firstProduct);
      } catch (error) {
        console.error("Error fetching best seller:", error);
      }
    };

    fetchBestSeller();
  }, [dispatch]);
  

  return (
    <div>
      <Hero />
      <GenderCollections />
      <NewArrivals />

      {/* Best Seller Section */}
      <h2 className="text-4xl text-center font-extrabold mt-5 p-6 bg-gray-50">
        Best Seller
      </h2>

      {bestsellerProduct && bestsellerProduct._id ? (
        <div className="container mx-auto">
          {/* Yahan sirf ek hi best seller product ka detail show ho raha hai */}
          <ProductDetails productId={bestsellerProduct._id} products={products} />
        </div>
      ) : (
        <p className="text-center mb-6">Loading best seller product...</p>
      )}

      {/* Products Grid Section */}
      <div className="container mx-auto ">
        <h2 className="text-3xl text-center font-bold mb-4">
          Top Wears for Women
        </h2>
        <ProductGrid products={products} loading={loading} error={error} />
      </div>

      <FeaturedCollection />
      <FeaturesSection />
    </div>
  );
}

export default Home;
