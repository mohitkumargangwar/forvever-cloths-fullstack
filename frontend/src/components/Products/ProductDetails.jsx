import { useState, useEffect } from "react";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";

import ProductGrid from "./ProductGrid";
import {
  fetchProductDetails,
  fetchSimilarProducts,
} from "../../redux/slice/productSlice";
import { addToCart } from "../../redux/slice/cartSlice";

const ProductDetails = ({ productId }) => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const { selectedProduct, loading, error, similarProducts } = useSelector(
    (state) => state.products
  );
  console.log(similarProducts);
  const { user, guestId } = useSelector((state) => state.auth);

  const [mainImage, setMainImage] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  // priority: prop se id (Home se), warna URL se (route se)
  const productFetchId = productId || id;

  // Product details + similar products fetch
  useEffect(() => {
    if (productFetchId) {
      dispatch(fetchProductDetails(productFetchId));
      dispatch(fetchSimilarProducts({ id: productFetchId }));
    }
  }, [dispatch, productFetchId]);

  // main image set jab product aata hai
  useEffect(() => {
    if (selectedProduct?.images?.length > 0) {
      setMainImage(selectedProduct.images[0].url);
    }
  }, [selectedProduct]);

  const handleQuantityChange = (action) => {
    if (action === "plus") {
      setQuantity((prev) => prev + 1);
    }
    if (action === "minus" && quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  };

  const handleAddToCart = () => {
    if (!selectedSize || !selectedColor) {
      toast.error("Please select a size and color before adding to cart.", {
        duration: 1000,
      });
      return;
    }

    setIsButtonDisabled(true);

    dispatch(
      addToCart({
        productId: productFetchId,
        quantity,
        size: selectedSize,
        color: selectedColor,
        guestId,
        userId: user?._id,
      })
    )
      .then(() => {
        toast.success("Product added to cart!", { duration: 1000 });
      })
      .finally(() => {
        setIsButtonDisabled(false);
      });
  };

  // safe UI states
  if (!productFetchId) {
    return (
      <p className="p-6 text-red-500">
        Invalid product id. (productFetchId missing)
      </p>
    );
  }

  if (loading) {
    return <p className="p-6">Loading product...</p>;
  }

  if (error) {
    return (
      <p className="p-6 text-red-500">
        Error: {error}
      </p>
    );
  }

  if (!selectedProduct) {
    return (
      <p className="p-6 text-gray-700">
        Product not found.
      </p>
    );
  }

  // MAIN UI
  return (
    <div className="p-6 ">
      <div className="max-w-6xl mx-auto bg-white p-8 rounded-lg">
        <div className="flex flex-col md:flex-row">
          {/* LEFT THUMBNAILS (Desktop) */}
          <div className="hidden md:flex flex-col space-y-4 mr-6">
            {selectedProduct.images?.map((image, index) => (
              <img
                key={index}
                src={image.url}
                alt={image.altText || `Thumbnail ${index}`}
                className={`w-20 h-20 object-cover rounded-lg cursor-pointer border ${
                  mainImage === image.url ? "border-black" : "border-gray-300"
                }`}
                onClick={() => setMainImage(image.url)}
                loading="lazy"
              />
            ))}
          </div>

          {/* MAIN IMAGE */}
          <div className="md:w-1/2">
            <img
              src={mainImage || selectedProduct.images?.[0]?.url}
              alt="Main Product"
              className="w-full h-auto object-cover rounded-lg"
              loading="lazy"
            />

            {/* MOBILE THUMBNAILS */}
            <div className="md:hidden flex overscroll-x-scroll space-x-4 mt-4">
              {selectedProduct.images?.map((image, index) => (
                <img
                  key={index}
                  src={image.url}
                  alt={image.altText || `Thumbnail ${index}`}
                  className={`w-20 h-20 object-cover rounded-lg cursor-pointer border ${
                    mainImage === image.url
                      ? "border-black"
                      : "border-gray-300"
                  }`}
                  onClick={() => setMainImage(image.url)}
                  loading="lazy"
                />
              ))}
            </div>
          </div>

          {/* RIGHT SIDE CONTENT */}
          <div className="md:w-1/2 md:ml-10">
            {/* NAME */}
            <h1 className="text-2xl text-gray-800 font-semibold mb-2">
              {selectedProduct.name}
            </h1>

            {/* ORIGINAL PRICE (agar discount ho to) */}
            {selectedProduct.discountPrice && (
              <p className="text-lg text-gray-600 mb-1 line-through">
                ${selectedProduct.price}
              </p>
            )}

            {/* CURRENT PRICE */}
            <p className="text-xl text-gray-800 mb-2">
              ${selectedProduct.discountPrice || selectedProduct.price}
            </p>

            {/* DESCRIPTION */}
            <p className="text-gray-600 mb-4">{selectedProduct.description}</p>

            {/* COLORS */}
            {selectedProduct.colors && selectedProduct.colors.length > 0 && (
              <div className="mt-4">
                <p className="text-gray-700 mb-1">Color:</p>
                <div className="flex gap-2 mt-2">
                  {selectedProduct.colors.map((color) => (
                    <button
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      className={`w-8 h-8 rounded-full border ${
                        selectedColor === color
                          ? "border-4 border-black"
                          : "border-gray-300"
                      }`}
                      style={{
                        backgroundColor: color.toLowerCase(),
                        filter: "brightness(0.85)",
                      }}
                    ></button>
                  ))}
                </div>
              </div>
            )}

            {/* SIZES */}
            {selectedProduct.sizes && selectedProduct.sizes.length > 0 && (
              <div className="mt-6">
                <p className="text-gray-700 mb-1">Size:</p>
                <div className="flex gap-2 mt-2">
                  {selectedProduct.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`px-4 py-2 rounded border ${
                        selectedSize === size ? "bg-black text-white" : ""
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* QUANTITY */}
            <div className="mt-6">
              <p className="text-gray-700 mb-1">Quantity:</p>
              <div className="flex items-center space-x-4 mt-2">
                <button
                  onClick={() => handleQuantityChange("minus")}
                  className="px-2 py-1 bg-gray-200 rounded text-lg"
                >
                  -
                </button>

                <span className="text-lg">{quantity}</span>

                <button
                  onClick={() => handleQuantityChange("plus")}
                  className="px-2 py-1 bg-gray-200 rounded text-lg"
                >
                  +
                </button>
              </div>
            </div>

            {/* ADD TO CART BUTTON */}
            <button
              onClick={handleAddToCart}
              disabled={isButtonDisabled}
              className={`bg-black text-white py-2 px-6 rounded w-full mt-8 ${
                isButtonDisabled
                  ? "cursor-not-allowed opacity-50 hover:bg-gray-900"
                  : "hover:bg-gray-900"
              }`}
            >
              {isButtonDisabled ? "Adding..." : "ADD TO CART"}
            </button>

            {/* CHARACTERISTICS TABLE */}
            <div className="mt-10 text-gray-700">
              <h3 className="text-xl font-bold mb-4">Characteristics:</h3>

              <table className="w-full text-left text-sm text-gray-600">
                <tbody>
                  <tr>
                    <td className="py-1 font-semibold">Brand</td>
                    <td className="py-1">{selectedProduct.brand}</td>
                  </tr>
                  <tr>
                    <td className="py-1 font-semibold">Material</td>
                    <td className="py-1">{selectedProduct.material}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Similar Products */}
        <div className="mt-20">
          <h2 className="text-4xl text-center font-extrabold mt-5 p-6 ">
            You May Also Like
          </h2>
          <ProductGrid
            products={similarProducts}
            loading={loading}
            error={error}
          />
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
