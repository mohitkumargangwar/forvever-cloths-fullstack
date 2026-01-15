import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { HiOutlineChevronDown, HiOutlineChevronUp } from "react-icons/hi";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { createCheckout } from "../../redux/slice/checkoutSlice";
import PayPalButton from "./PayPalButton";

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

  if (loading) return <p>Loading Cart...</p>;
  if (error) return <p>Error loading: {error}</p>;
  if (!cart || !cart.products || cart.products.length === 0) {
    return <p>Your cart is empty.</p>;
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="mx-auto grid max-w-full grid-cols-1 gap-x-12 gap-y-12 px-4 py-3 sm:px-6 lg:px-12 lg:grid-cols-2">
        {/* RIGHT SECTION (Order Summary) */}
        <OrderSummary cart={cart} />

        {/* LEFT SECTION (Shipping Form) */}
        <div className="rounded-lg bg-white p-8 shadow-lg border border-gray-100">
          <h2 className="text-2xl font-bold uppercase text-gray-800 tracking-wide text-center">
            Shipping Details
          </h2>
          <form onSubmit={handleCreateCheckOut} className="mt-3 space-y-8">
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
  <div className="border-b border-gray-200">
    <h3 className=" text-lg font-semibold text-gray-700">{title}</h3>
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
      className="block text-sm font-medium text-gray-600 mb-1"
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
      className="w-full rounded-md border border-gray-300 p-3 shadow-sm 
                 focus:border-black focus:ring-2 focus:ring-black/20 
                 transition-all disabled:bg-gray-100 disabled:cursor-not-allowed"
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
    <div>
      {!checkoutId ? (
        <button
          type="submit"
          className="w-full rounded-md bg-gradient-to-r from-black to-gray-800 py-3 text-white font-bold hover:from-gray-900 hover:to-black transition shadow-md"
        >
          Continue to Payment
        </button>
      ) : (
        <div className="border-t border-gray-200 pt-6">
          <h3 className="mb-4 text-lg font-semibold text-gray-700">
            Pay with PayPal
          </h3>
          <PayPalButton
            amount={totalPrice}
            onSuccess={onPaymentSuccess}
            onError={handlePaymentError}
          />
        </div>
      )}
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
    <div className="lg:order-last">
      <div className="rounded-lg bg-white p-8 shadow-lg border border-gray-100 h-fit">
        {/* Mobile Accordion Header */}
        <div
          className="flex justify-between items-center lg:hidden cursor-pointer"
          onClick={() => setIsOpen(!isOpen)}
        >
          <h2 className="text-2xl uppercase font-semibold text-gray-800 ">
            Order Summary
          </h2>
          {isOpen ? (
            <HiOutlineChevronUp size={24} />
          ) : (
            <HiOutlineChevronDown size={24} />
          )}
        </div>

        {/* Desktop Header */}
        <h2 className="hidden lg:block mb-6 text-2xl uppercase font-bold text-gray-800 text-center">
          Order Summary
        </h2>

        {/* Accordion Content */}
        <div
          className={`transition-all duration-300 ease-in-out overflow-hidden 
                      ${
                        isOpen
                          ? "max-h-screen opacity-100 mt-6"
                          : "max-h-0 opacity-0"
                      } 
                      lg:max-h-full lg:opacity-100`}
        >
          <div className="space-y-6">
            {cart.products.map((product, index) => {
              const uniqueKey = `${product._id || product.id}-${product.size}-${
                product.color
              }`;
              return (
                <div
                  key={uniqueKey || index}
                  className="flex items-start justify-between"
                >
                  <div className="flex items-start">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-20 h-20 object-cover rounded-md mr-4"
                      loading="lazy"
                    />
                    <div>
                      <p className="font-semibold text-gray-800">
                        {product.name}
                      </p>
                      <p className="text-sm text-gray-500 mt-1">
                        Size: {product.size} | Color: {product.color}
                      </p>
                      <p className="text-sm text-gray-500">
                        Qty: {product.quantity || 1}
                      </p>
                      <p className="text-sm font-semibold text-gray-800 mt-2">
                        ${Number(product.price).toFixed(2)}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <hr className="my-6" />

          {/* Price Details */}
          <div className="space-y-3 text-gray-600">
            <div className="flex justify-between">
              <p>Subtotal ({totalItems} items)</p>
              <p>${subtotalValue.toFixed(2)}</p>
            </div>
            <div className="flex justify-between">
              <p>Shipping</p>
              <p>${shippingAmount.toFixed(2)}</p>
            </div>
          </div>

          <hr className="my-6" />

          {/* Total */}
          <div className="flex justify-between text-xl font-bold text-gray-900">
            <p>Total</p>
            <p>${totalPrice.toFixed(2)}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
