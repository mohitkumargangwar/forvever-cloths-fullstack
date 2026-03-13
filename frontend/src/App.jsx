import { useEffect, useRef } from "react";
import { BrowserRouter, Route, Routes, useLocation } from "react-router";
import store from "./redux/store";
import { Provider, useDispatch, useSelector } from "react-redux";
import { fetchCart } from "./redux/slice/cartSlice";

// Pages & Components
import UserLayout from "./components/Layout/UserLayout";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import ContactUs from "./pages/ContactUs";
import AboutUs from "./pages/AboutUs";
import FAQs from "./pages/FAQs";
import Features from "./pages/Features";
import Collections from "./pages/Collections";
import ProductDetails from "./components/Products/ProductDetails";
import CheckOut from "./components/Cart/CheckOut";
import OrderConfirmationPage from "./pages/OrderConfirmationPage";
import OrderDetailsPage from "./pages/OrderDetailsPage";
import { Toaster } from "sonner";

import MyOrder from "./pages/MyOrder";
import AdminLayout from "./components/Admin/AdminLayout";
import AdminHomePage from "./pages/AdminHomePage";
import UserManagement from "./components/Admin/UserManagement";
import ProductManagement from "./components/Admin/ProductManagement";
import EditProductPage from "./components/Admin/EditProductPage";
import OrderManagement from "./components/Admin/OrderManagement";
import AdminProtectedRoute from "./components/Common/AdminProtectedRoute";

// ScrollToTop Component
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

// Component to fetch cart on mount
const AppContent = () => {
  const dispatch = useDispatch();
  const { user, guestId } = useSelector((state) => state.auth);
  const { cart } = useSelector((state) => state.cart);
  const lastFetchKeyRef = useRef(null);

  useEffect(() => {
    const fetchKey = user?._id ? `user:${user._id}` : guestId ? `guest:${guestId}` : null;

    if (!fetchKey || lastFetchKeyRef.current === fetchKey) return;

    // Only fetch if cart is empty or has no products
    if (!cart || !cart.products || cart.products.length === 0) {
      lastFetchKeyRef.current = fetchKey;
      dispatch(fetchCart(user?._id ? { userId: user._id } : { guestId }));
    } else {
      // Mark as fetched even if we skip the API call
      lastFetchKeyRef.current = fetchKey;
    }
  }, [user?._id, guestId, dispatch, cart]);

  return null;
};

function App() {
  // const products = useSelector(state => state.products.items);
  // const dispatch = useDispatch();




  return (
    <Provider store={store}>
      <BrowserRouter>
        <ScrollToTop />
        <AppContent />
        <Toaster position="top-right" richColors />

        <Routes>
          {/* User facing routes */}
          <Route path="/" element={<UserLayout />}>
            <Route index element={<Home />} />
            <Route path="profile" element={<Profile />} />
            <Route path="contact" element={<ContactUs />} />
            <Route path="about" element={<AboutUs />} />
            <Route path="faqs" element={<FAQs />} />
            <Route path="features" element={<Features />} />
            <Route path="collections/:collection" element={<Collections />} />
            <Route path="product/:id" element={<ProductDetails />} />
            <Route path="checkout" element={<CheckOut />} />
            <Route
              path="orderconfirmation"
              element={<OrderConfirmationPage />}
            />
            <Route path="order/:id" element={<OrderDetailsPage />} />
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
            <Route path="/my-orders" element={<MyOrder />} />
          </Route>

          {/* Admin facing routes */}
          <Route
            path="/admin"
            element={
              <AdminProtectedRoute>
                <AdminLayout />
              </AdminProtectedRoute>
            }
          >
            <Route index element={<AdminHomePage />} />
            <Route path="users" element={<UserManagement />} />
            <Route path="products" element={<ProductManagement />} />
            <Route path="products/:id/edit" element={<EditProductPage />} />
            <Route path="order-management" element={<OrderManagement />} />
          </Route>

          {/* 404 Page */}
          <Route
            path="*"
            element={
              <div className="flex flex-col items-center justify-center h-screen">
                <h1 className="text-4xl font-bold">404</h1>
                <p className="text-lg text-gray-600 mt-2">Page Not Found</p>
              </div>
            }
          />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
