import { useEffect, useRef, useState } from "react";
import { FaFilter } from "react-icons/fa";
import SortOptions from "../components/Products/SortOptions";
import FilterSidebar from "../components/Products/FilterSidebar";
import ProductGrid from "../components/Products/ProductGrid";
import { useParams, useSearchParams } from "react-router"; 
import { useDispatch, useSelector } from "react-redux";
import { fetchProductByFilters } from "../redux/slice/productSlice";

function Collections() {
  const { collection } = useParams();
  const [searchParams] = useSearchParams();
  const dispatch = useDispatch();

  const { products, loading, error } = useSelector(
    (state) => state.products
  );

  const [filteredProducts, setFilteredProducts] = useState([]);

  // search params string for stable dependency
  const searchString = searchParams.toString();

  // 🔹 Backend se data lao: collection + URL filters ke basis par
  useEffect(() => {
    const queryParams = Object.fromEntries([...searchParams.entries()]);
    dispatch(fetchProductByFilters({ collection, ...queryParams }));
  }, [dispatch, collection, searchString]); // ✅ searchString

  // 🔹 Sidebar open/close
  const sidebarRef = useRef(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  function toggleSidebar() {
    setIsSidebarOpen((prev) => !prev);
  }

  const handleClickOutside = (e) => {
    if (sidebarRef.current && !sidebarRef.current.contains(e.target)) {
      isSidebarOpen && setIsSidebarOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isSidebarOpen]);

  // 🔹 Frontend side filtering + sorting (URL ke basis par)
  useEffect(() => {
    let processedProducts = Array.isArray(products) ? [...products] : [];

    // 1. URL se saare filter/sort params nikalein
    const sort = searchParams.get("sort") || "";
    const gender = searchParams.get("gender");
    const category = searchParams.get("category");
    const color = searchParams.get("color");

    const minPriceParam = searchParams.get("minPrice");
    const maxPriceParam = searchParams.get("maxPrice");

    const minPrice = minPriceParam ? parseInt(minPriceParam, 10) : null;
    const maxPrice = maxPriceParam ? parseInt(maxPriceParam, 10) : null;

    const brands = searchParams.get("brand")
      ? searchParams.get("brand").split(",")
      : [];
    const materials = searchParams.get("material")
      ? searchParams.get("material").split(",")
      : [];
    const sizes = searchParams.get("size")
      ? searchParams.get("size").split(",")
      : [];

    // 2. Filters apply karo

    if (gender) {
      processedProducts = processedProducts.filter(
        (p) => p.gender === gender
      );
    }

    if (category) {
      processedProducts = processedProducts.filter(
        (p) => p.category === category
      );
    }

    if (color) {
      processedProducts = processedProducts.filter((p) =>
        p.colors?.includes(color)
      );
    }

    if (minPrice !== null || maxPrice !== null) {
      processedProducts = processedProducts.filter((p) => {
        const priceValue = p.discountPrice ?? p.price ?? 0;

        if (minPrice !== null && priceValue < minPrice) return false;
        if (maxPrice !== null && priceValue > maxPrice) return false;
        return true;
      });
    }

    if (brands.length > 0) {
      processedProducts = processedProducts.filter((p) =>
        brands.includes(p.brand)
      );
    }

    if (materials.length > 0) {
      processedProducts = processedProducts.filter((p) =>
        materials.includes(p.material)
      );
    }

    if (sizes.length > 0) {
      processedProducts = processedProducts.filter((p) =>
        p.sizes?.some((s) => sizes.includes(s))
      );
    }

    // 3. Sorting
    if (sort === "priceAsc") {
      processedProducts.sort((a, b) => {
        const aPrice = a.discountPrice ?? a.price ?? 0;
        const bPrice = b.discountPrice ?? b.price ?? 0;
        return aPrice - bPrice;
      });
    } else if (sort === "priceDesc") {
      processedProducts.sort((a, b) => {
        const aPrice = a.discountPrice ?? a.price ?? 0;
        const bPrice = b.discountPrice ?? b.price ?? 0;
        return bPrice - aPrice;
      });
    }

    setFilteredProducts(processedProducts);
  }, [products, searchString, searchParams]); // ✅ searchString + products

  return (
    <div className="flex flex-col lg:flex-row min-h-screen">
      {/* Mobile Filter button */}
      <button
        onClick={toggleSidebar}
        className="lg:hidden border p-2 flex justify-center items-center"
      >
        <FaFilter className="mr-2" /> Filters
      </button>

      {/* Filter Sidebar */}
      <aside
        ref={sidebarRef}
        className={`fixed inset-y-0 z-50 lg:z-0 left-0 w-64 bg-white transition-transform duration-300 transform
        lg:sticky lg:top-0 lg:h-screen lg:translate-x-0
        ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}`}
        data-lenis-prevent
      >
        <FilterSidebar />
      </aside>

      {/* Main Content Area */}
      <div className="flex flex-col flex-grow">
        <div className="p-4 flex-grow overflow-y-auto">
          <div className="flex flex-col space-y-2 sm:flex-row sm:gap-2 justify-between items-center mb-6">
            <h2 className="text-2xl uppercase font-bold">
              {collection ? collection : "All Collections"}
            </h2>
            <SortOptions />
          </div>

          <ProductGrid
            products={filteredProducts}
            loading={loading}
            error={error}
          />
        </div>
      </div>
    </div>
  );
}

export default Collections;
