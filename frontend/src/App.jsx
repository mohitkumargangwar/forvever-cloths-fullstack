import { useEffect } from "react";
import { BrowserRouter, Route, Routes, useLocation } from "react-router";
import Lenis from "lenis";
import store from "./redux/store";
import { Provider, useDispatch, useSelector } from "react-redux";
import { fetchCart } from "./redux/slice/cartSlice";

// Pages & Components
import UserLayout from "./components/Layout/UserLayout";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import Collections from "./pages/Collections";
import ProductDetails from "./components/Products/ProductDetails";
import CheckOut from "./components/Cart/CheckOut";
import OrderConfirmationPage from "./pages/OrderConfirmationPage";
import OrderDetailsPage from "./pages/OrderDetailsPage";
import { Toaster } from "sonner";

// Lenis CSS import (important)
import "lenis/dist/lenis.css";
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

  useEffect(() => {
    // Fetch cart whenever user or guestId changes
    if (user?._id || guestId) {
      dispatch(fetchCart({ userId: user?._id, guestId }));
    }
  }, [user?._id, guestId, dispatch]);

  return null;
};

function App() {
  // Lenis smooth scroll effect
  useEffect(() => {
    const lenis = new Lenis({
      lerp: 0.08, // smoothness
      duration: 1.2,
      smooth: true,
      smoothTouch: false,
    });

    let rafId;
    function raf(time) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

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
