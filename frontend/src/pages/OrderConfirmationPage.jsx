import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router";
import { clearCart } from "../redux/slice/cartSlice";

const OrderConfirmationPage = () => {
 const dispatch = useDispatch();
 const navigate = useNavigate();
 const { checkout } = useSelector((state) => state.checkout);


if (!checkout) {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <p className="text-gray-600 text-lg">Loading order details...</p>
    </div>
  );
}

  // clear the cart when the order is confirmed
  useEffect(() => {
  if (!checkout) return;

  if (checkout._id) {
    dispatch(clearCart());
    localStorage.removeItem("cart");
  } else {
    navigate("/my-order");
  }
}, [dispatch, checkout, navigate]);


// DELIVERY DATE CALCULATION
  const calculateEstimatedDelivery = (createdAt) => {
    const orderDate = new Date(createdAt);
    orderDate.setDate(orderDate.getDate() + 10);
    return orderDate.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="bg-gray-50 min-h-screen py-1">
      <div className="max-w-4xl mx-auto">
        {/* Success Message */}
        <div className="bg-white p-8 rounded-xl shadow-lg text-center">
          <svg
            className="w-16 h-16 mx-auto text-emerald-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <h1 className="text-4xl font-bold text-gray-800 mt-4">
            Order Confirmed 🎉
          </h1>
          <p className="text-gray-500 mt-2">
            Thank you for shopping with us! Your order has been placed
            successfully.
          </p>
        </div>

        {/* Order Details */}
        <div className="bg-white p-8 rounded-xl shadow-lg mt-8">
          {/* Order Info */}
          <div className="flex flex-col sm:flex-row justify-between items-start mb-6 pb-6 border-b">
            <div>
              <p className="text-sm text-gray-500">Order ID</p>
              <h2 className="text-lg font-semibold text-gray-800">
                #{checkout._id}
              </h2>
            </div>
            <div className="text-left sm:text-right mt-4 sm:mt-0">
              <p className="text-sm text-gray-500">Estimated Delivery</p>
              <h2 className="text-lg font-semibold text-emerald-600">
                {calculateEstimatedDelivery(checkout.createdAt)}
              </h2>
            </div>
          </div>

          {/* Ordered Items */}
          <div className="mb-6">
            <h3 className="text-xl font-semibold mb-4 text-gray-800">
              Your Items
            </h3>
            <div className="space-y-4">
              {checkout.checkoutItems?.map((item) => (
                <div
                  key={item.productId}
                  className="flex items-center bg-gray-50 rounded-lg p-3 hover:shadow transition"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-20 h-20 object-cover rounded-lg mr-4"
                    loading="lazy"
                  />
                  <div className="flex-grow">
                    <h4 className="font-semibold text-gray-800">{item.name}</h4>
                    <p className="text-sm text-gray-500">
                      Size:{" "}
                      <span className="font-medium text-gray-700">
                        {item.size}
                      </span>{" "}
                      | Color:{" "}
                      <span className="font-medium text-gray-700">
                        {item.color}
                      </span>
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-gray-800">
                      ${(item.price * item.quantity).toFixed(2)}
                    </p>
                    <p className="text-sm text-gray-500">
                      Qty: {item.quantity}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Shipping and Payment Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 border-t pt-6 mt-6">
            <div>
              <h4 className="text-lg font-semibold mb-2 text-gray-800">
                Shipping To
              </h4>
              <p className="text-gray-600">{checkout.shippingAddress.address}</p>
              <p className="text-gray-600">
                {checkout.shippingAddress.city},{" "}
                {checkout.shippingAddress.country}
              </p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-2 text-gray-800">
                Payment Method
              </h4>
              <p className="text-gray-600">PayPal</p>
            </div>
          </div>

          {/* Normal Bottom Buttons */}
          <div className="flex justify-between mt-10">
            <Link to='/' className=" block">
            <button className="px-6 py-3 bg-black  text-white font-semibold rounded-lg shadow-sm transition">
              Continue Shopping
            </button>
            </Link>
            <Link to='/my-orders' className=" block">
            <button className="px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-lg shadow-md transition">
              View Order
            </button>
             </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmationPage;
