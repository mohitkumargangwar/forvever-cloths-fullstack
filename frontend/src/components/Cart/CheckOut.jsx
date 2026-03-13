import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { HiOutlineChevronDown, HiOutlineChevronUp } from "react-icons/hi";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { createCheckout } from "../../redux/slice/checkoutSlice";
import PayPalButton from "./PayPalButton";
import { CheckoutShimmer } from "../Common/ShimmerLoader";

// ===== Main Component =====
export default function CheckOut() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { cart, loading, error } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.auth);
  const [shippingAddress, setShippingAddress] = useState({
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    postalCode: "",
    country: "",
    phone: "",
  });

  // Ensure cart is loaded before proceeding
  useEffect(() => {
    if (!cart || !cart.products || cart.products.length === 0) {
      navigate("/");
    }
  }, [cart, navigate]);

  const [checkoutId, setCheckoutId] = useState(null);

  async function handleCreateCheckOut(e) {
    e.preventDefault();
    if (cart && cart.products.length > 0) {
      const res = await dispatch(
        createCheckout({
          checkoutItems: cart.products,
          shippingAddress,
          paymentMethod: "Paypal",
          totalPrice: cart.totalPrice,
        })
      );
      if (res.payload && res.payload._id) {
        setCheckoutId(res.payload._id); //set Checkout ID if checkout was successful
      }
    }
  }

  const handlePaymentSuccess = async (details) => {
    try {
      const response = await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/api/checkout/${checkoutId}/pay`,
        { paymentStatus: "paid", paymentDetails: details },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("userToken")}`,
          },
        }
      );

      await handleFinalizeCheckout(checkoutId); //finalize checkout if payment is successful
    } catch (error) {
      console.error("Payment error:", error);
    }
  };

  const handleFinalizeCheckout = async (checkoutId) => {
    try {
      const response = await axios.post(
        `${
          import.meta.env.VITE_BACKEND_URL
        }/api/checkout/${checkoutId}/finalize`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("userToken")}`,
          },
        }
      );
      navigate("/orderconfirmation");
    } catch (error) {
      console.error("Finalize error:", error);
    }
  };

  if (loading) return <CheckoutShimmer />;
  if (error) return <p>Error loading: {error}</p>;
  if (!cart || !cart.products || cart.products.length === 0) {
    return <p>Your cart is empty.</p>;
  }

  return (
    <div className="bg-gradient-to-b from-gray-50 to-white min-h-screen pb-32 lg:pb-0">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-x-12 gap-y-12 px-4 py-8 sm:px-6 lg:px-12 lg:grid-cols-2">
        {/* RIGHT SECTION (Order Summary) */}
        <OrderSummary cart={cart} />

        {/* LEFT SECTION (Shipping Form) */}
        <div className="rounded-xl bg-white p-6 sm:p-8 shadow-2xl border border-gray-100 order-first lg:order-last">
          <h2 className="text-2xl font-bold uppercase text-gray-800 tracking-wide text-center mb-4">
            Shipping Details
          </h2>
          <form onSubmit={handleCreateCheckOut} className="mt-3 space-y-6">
            {/* Contact */}
            <FormSection>
              <FormInput
                label="Email"
                value={user ? user.email : ""}
                disabled
              />
            </FormSection>

            {/* Delivery */}
            <FormSection>
              <div className="grid grid-cols-2 gap-4">
                <FormInput
                  label="First Name"
                  name="firstName"
                  value={shippingAddress.firstName}
                  onChange={setShippingAddress}
                />
                <FormInput
                  label="Last Name"
                  name="lastName"
                  value={shippingAddress.lastName}
                  onChange={setShippingAddress}
                />
              </div>
              <FormInput
                label="Address"
                name="address"
                value={shippingAddress.address}
                onChange={setShippingAddress}
              />
              <div className="grid grid-cols-2 gap-4">
                <FormInput
                  label="City"
                  name="city"
                  value={shippingAddress.city}
                  onChange={setShippingAddress}
                />
                <FormInput
                  label="Postal Code"
                  name="postalCode"
                  value={shippingAddress.postalCode}
                  onChange={setShippingAddress}
                />
              </div>
              <FormInput
                label="Country"
                name="country"
                value={shippingAddress.country}
                onChange={setShippingAddress}
              />
              <FormInput
                label="Phone Number"
                name="phone"
                type="tel"
                value={shippingAddress.phone}
                onChange={setShippingAddress}
              />
            </FormSection>

            {/* Payment */}
            <PaymentSection
              checkoutId={checkoutId}
              totalPrice={cart?.totalPrice}
              onPaymentSuccess={handlePaymentSuccess}
            />

          </form>
        </div>
      </div>
    </div>
  );
}

// ===== Reusable Components =====

const FormSection = ({ title, children }) => (
  <div className="pb-6 border-b border-gray-200 last:border-b-0">
    {title && <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-4">{title}</h3>}
    <div className="space-y-4">{children}</div>
  </div>
);

const FormInput = ({
  label,
  name,
  value,
  onChange,
  disabled = false,
  type = "text",
}) => (
  <div>
    <label
      htmlFor={name}
      className="block text-sm font-semibold text-gray-700 mb-2"
    >
      {label}
    </label>
    <input
      id={name}
      name={name}
      type={type}
      value={value}
      onChange={(e) =>
        onChange((prev) => ({ ...prev, [name]: e.target.value }))
      }
      className="w-full rounded-lg border-2 border-gray-200 p-3 sm:p-4 text-base shadow-sm 
                 focus:border-black focus:ring-2 focus:ring-black/10 
                 transition-all disabled:bg-gray-100 disabled:cursor-not-allowed disabled:border-gray-300"
      disabled={disabled}
      required
    />
  </div>
);

const PaymentSection = ({ checkoutId, totalPrice, onPaymentSuccess }) => {
  const handlePaymentError = (error) => {
    console.error("PayPal error:", error);
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 lg:static bg-white lg:bg-transparent border-t-2 lg:border-t-0 border-gray-200 p-4 sm:p-6 shadow-2xl lg:shadow-none z-40 lg:z-auto rounded-t-2xl lg:rounded-none">
      <div className="max-w-7xl mx-auto">
        {!checkoutId ? (
          <button
            type="submit"
            className="w-full rounded-lg bg-gradient-to-r from-black via-gray-900 to-gray-800 py-3 sm:py-4 text-white font-bold text-base sm:text-lg hover:from-gray-900 hover:via-black hover:to-gray-900 transition shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95"
          >
            Continue to Payment
          </button>
        ) : (
          <div className="space-y-4">
            <h3 className="text-base sm:text-lg font-semibold text-gray-800">
              Complete Your Payment
            </h3>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-4">
              <p className="text-sm text-blue-800">💳 Secure payment powered by PayPal</p>
            </div>
            <PayPalButton
              amount={totalPrice}
              onSuccess={onPaymentSuccess}
              onError={handlePaymentError}
            />
          </div>
        )}
      </div>
    </div>
  );
};

const OrderSummary = ({ cart }) => {
  const [isOpen, setIsOpen] = useState(false);
  const subtotalValue = cart.products.reduce((sum, product) => {
    const qty = Number(product.quantity) || 1;
    const price = Number(product.price) || 0;
    return sum + price * qty;
  }, 0);
  const totalItems = cart.products.reduce(
    (sum, product) => sum + (Number(product.quantity) || 1),
    0
  );
  const shippingAmount = subtotalValue < 99 ? 10 : 0;
  const totalPrice = subtotalValue + shippingAmount;

  return (
    <div className="lg:order-first">
      <div className="rounded-xl bg-white p-6 sm:p-8 shadow-2xl border border-gray-100 h-fit sticky top-24 lg:relative">
        {/* Mobile Accordion Header */}
        <div
          className="flex justify-between items-center lg:hidden cursor-pointer pb-4 border-b border-gray-200"
          onClick={() => setIsOpen(!isOpen)}
        >
          <h2 className="text-xl sm:text-2xl font-bold text-gray-800">
            Order Summary
          </h2>
          {isOpen ? (
            <HiOutlineChevronUp size={24} />
          ) : (
            <HiOutlineChevronDown size={24} />
          )}
        </div>

        {/* Desktop Header */}
        <h2 className="hidden lg:block mb-6 text-2xl font-bold text-gray-800 text-center">
          Order Summary
        </h2>

        {/* Accordion Content */}
        <div
          className={`transition-all duration-300 ease-in-out overflow-hidden 
                      ${
                        isOpen
                          ? "max-h-screen opacity-100 mt-4 lg:mt-0"
                          : "max-h-0 opacity-0 lg:max-h-full lg:opacity-100"
                      }`}
        >
          <div className="space-y-4 lg:space-y-6">
            {cart.products.map((product, index) => {
              const uniqueKey = `${product._id || product.id}-${product.size}-${
                product.color
              }`;
              return (
                <div
                  key={uniqueKey || index}
                  className="flex items-start gap-4 pb-4 border-b border-gray-100 last:border-b-0"
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-20 h-20 sm:w-24 sm:h-24 object-cover rounded-lg flex-shrink-0"
                    loading="lazy"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-gray-800 text-sm sm:text-base truncate">
                      {product.name}
                    </p>
                    <p className="text-xs sm:text-sm text-gray-600 mt-1">
                      {product.size} • {product.color}
                    </p>
                    <p className="text-xs sm:text-sm text-gray-600">
                      Qty: {product.quantity || 1}
                    </p>
                    <p className="text-sm sm:text-base font-bold text-gray-900 mt-2">
                      ${(Number(product.price) * (product.quantity || 1)).toFixed(2)}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-6 pt-4 border-t-2 border-gray-200 space-y-3 text-gray-700">
            <div className="flex justify-between text-sm sm:text-base">
              <p>Subtotal ({totalItems} items)</p>
              <p className="font-semibold">${subtotalValue.toFixed(2)}</p>
            </div>
            <div className="flex justify-between text-sm sm:text-base">
              <p>Shipping</p>
              <p className="font-semibold">{shippingAmount > 0 ? `$${shippingAmount.toFixed(2)}` : 'FREE'}</p>
            </div>
            {shippingAmount > 0 && (
              <div className="bg-amber-50 border border-amber-200 rounded-lg p-2 text-xs text-amber-800">
                💡 Free shipping on orders over $99
              </div>
            )}
          </div>

          <div className="mt-6 pt-4 border-t-2 border-gray-300 flex justify-between">
            <p className="text-base sm:text-lg font-bold text-gray-900">Total</p>
            <p className="text-xl sm:text-2xl font-bold text-black">${totalPrice.toFixed(2)}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
