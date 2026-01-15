import { useEffect } from "react";
import { Link, useParams, Navigate } from "react-router";
import { FiPackage, FiTruck, FiHome, FiShoppingBag, FiSend, FiXCircle } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { fetchOrderDetails } from "../redux/slice/orderSlice";

/* ================= ORDER DETAILS PAGE ================= */

export default function OrderDetailsPage() {
  const { id } = useParams();
  const dispatch = useDispatch();

  const { orderDetails: order, loading, error } = useSelector((state) => state.orders);

  useEffect(() => {
    dispatch(fetchOrderDetails(id));
  }, [dispatch, id]);

  /* ================= SAFETY GUARD ================= */
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-600 text-lg">Loading order details...</p>
      </div>
    );
  }

  // Agar token failed hai toh login page pe bhejo
  if (error && (error.includes('Not authorized') || error.includes('token'))) {
    return <Navigate to="/login" replace />;
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-red-600 text-lg">Error: {error}</p>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500 text-lg">Order not found</p>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen p-2 sm:p-2">
      <div className="max-w-6xl mx-auto space-y-10">

        {/* ================= HEADER ================= */}
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900">
            Thank you, {order?.user?.name || 'Customer'}!
          </h2>
          <p className="text-gray-500 mt-1">
            Your order has been placed successfully.
          </p>
        </div>

        {/* ================= TRACKING ================= */}
        <div className="bg-white rounded-2xl shadow-md p-3">
          <OrderStatusStepper currentStatus={order.status} />
        </div>

        {/* ================= ORDER INFO ================= */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <InfoCard title="Order Info">
            <p>
              <span className="font-medium">Order Number:</span> #{order._id}
            </p>
            <p>
              <span className="font-medium">Order Date:</span>{" "}
              {new Date(order.createdAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
          </InfoCard>

          <InfoCard title="Payment Method">
            <div className="flex items-center gap-2">
              <FiShoppingBag />
              <p className="font-medium">{order.paymentMethod}: <span className="text-sm text-gray-500">
              {order.isPaid ? '✅ Paid' : '⏳ Pending'}
            </span></p>
            </div>
            
          </InfoCard>

          <InfoCard title="Shipping Address">
            <p>{order.shippingAddress?.address}</p>
            <p>{order.shippingAddress?.city}, {order.shippingAddress?.postalCode}</p>
            <p>{order.shippingAddress?.country}</p>
          </InfoCard>
        </div>

        {/* ================= ITEMS & SUMMARY ================= */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* ITEMS */}
          <div className="lg:col-span-2">
            <div className="bg-white p-6 rounded-2xl shadow-md">
              <h3 className="text-xl font-semibold mb-4">Order Items</h3>
              <div className="divide-y">
                {order.orderItems?.map((item) => (
                  <div
                    key={item.productId}
                    className="flex items-center py-4"
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-16 h-16 rounded-md mr-4"
                      loading="lazy"
                    />
                    <div className="flex-grow">
                      <p className="font-semibold">{item.name}</p>
                      <p className="text-sm text-gray-500">
                        Qty: {item.quantity}
                      </p>
                    </div>
                    <p className="font-semibold">
                      ${(item.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* SUMMARY */}
          <div className="space-y-6">
            <InfoCard title="Order Summary">
              <div className="space-y-2">
                <div className="flex justify-between font-bold text-lg">
                  <span>Total</span>
                  <span>${(order.totalPrice ?? 0).toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Payment Status</span>
                  <span className={order.isPaid ? 'text-green-600' : 'text-yellow-600'}>
                    {order.isPaid ? 'Paid' : 'Pending'}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Delivery Status</span>
                  <span className={
                    order.status === 'Delivered' ? 'text-green-600' :
                    order.status === 'Cancelled' ? 'text-red-600' :
                    order.status === 'Shipped' ? 'text-blue-600' :
                    'text-yellow-600'
                  }>
                    {order.status}
                  </span>
                </div>
              </div>
            </InfoCard>

            <Link
              to="/my-orders"
              className="block text-center px-6 py-2 bg-black text-white rounded-lg"
            >
              ← Back to Orders
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ================= STATUS STEPPER ================= */

function OrderStatusStepper({ currentStatus }) {
  // Agar order cancelled hai toh alag UI dikhao
  if (currentStatus === "Cancelled") {
    return (
      <div>
        <h3 className="text-lg font-semibold mb-6">Order Status</h3>
        <div className="flex flex-col items-center py-4">
          <div className="h-16 w-16 flex items-center justify-center rounded-full border-2 bg-red-500 text-white border-red-500">
            <FiXCircle size={32} />
          </div>
          <p className="mt-3 text-lg font-semibold text-red-600">Order Cancelled</p>
          <p className="text-sm text-gray-500 mt-1">This order has been cancelled</p>
        </div>
      </div>
    );
  }

  // Normal order flow ke liye
  const statuses = ["Processing", "Shipped", "Delivered"];
  const currentStep = statuses.indexOf(currentStatus);

  const icons = [
    <FiPackage />,
    <FiTruck />,
    <FiHome />,
  ];

  return (
    <div>
      <h3 className="text-lg font-semibold mb-6">Order Status</h3>
      <div className="flex justify-between">
        {statuses.map((status, index) => (
          <div key={status} className="flex flex-col items-center">
            <div
              className={`h-12 w-12 flex items-center justify-center rounded-full border-2 ${
                index <= currentStep
                  ? "bg-black text-white border-black"
                  : "bg-gray-100 text-gray-400 border-gray-300"
              }`}
            >
              {icons[index]}
            </div>
            <p className="mt-2 text-sm">{status}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ================= INFO CARD ================= */

function InfoCard({ title, children }) {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-md">
      <h3 className="text-lg font-semibold mb-4">{title}</h3>
      <div className="text-gray-600">{children}</div>
    </div>
  );
}
