import { useState, useEffect } from "react";
import { useSearchParams } from "react-router"; 
import Slider from "rc-slider";
import "rc-slider/assets/index.css";

export default function FilterSidebar() {
  const [searchParams, setSearchParams] = useSearchParams();

  // State
  const [filters, setFilters] = useState({
    category: "",
    gender: "",
    color: "",
    sizes: [],
    material: [],
    brand: [],
    minPrice: 0,
    maxPrice: 1000,
  });

  const [priceRange, setPriceRange] = useState([0, 1000]);

  // Filter options data
  const categories = ["Top Wear", "Bottom Wear"];
  const genders = ["Men", "Women"];
  const colors = [
  "Red",
  "Blue",
  "Yellow",
  "Black",
  "White",
  "Gray",
  "Navy",
  "Olive",
  "Beige",
  "Brown",
  "Pink",
  "lavender" // lowercase only (CSS supports "lavender")
];


  const sizess = ["XS", "S", "M", "L", "XL", "XXL"];

  const materials = ["Cotton", "Cotton Blend", "Denim", "Viscose", "Fleece", "Polyester", 
    "Linen Blend", "Wool Blend", "Silk Blend", "Chiffon", "Leather", "Suede",];

  const brands = [
  "ActiveWear",
  "Adidas",
  "Allen Solly",
  "Beach Breeze",
  "Biba",
  "BohoVibes",
  "BreezyVibes",
  "Calvin Klein",
  "CasualLook",
  "ChicKnit",
  "ChicStyle",
  "ChicWrap",
  "ChillZone",
  "ClassicStyle",
  "ComfortFit",
  "ComfyFit",
  "ComfyTees",
  "DelicateWear",
  "DenimCo",
  "DenimStyle",
  "Elegance",
  "ElegantStyle",
  "ElegantWear",
  "Everyday Comfort",
  "ExecutiveStyle",
  "Fabindia",
  "FeminineWear",
  "Gucci",
  "H&M",
  "Heritage Wear",
  "Levi's",
  "Louis Vuitton",
  "LoungeWear",
  "Manyavar",
  "Modern Fit",
  "Nike",
  "Peter England",
  "Polo Classics",
  "Polo Ralph Lauren",
  "Prada",
  "Puma",
  "SportX",
  "Street Style",
  "Street Vibes",
  "StreetStyle",
  "StreetWear",
  "SunnyStyle",
  "The North Face",
  "Tommy Hilfiger",
  "Under Armour",
  "Urban Chic",
  "Urban Threads",
  "UrbanStyle",
  "Van Heusen",
  "Winter Basics",
  "Zara"
]

  // URL se state update karna
  useEffect(() => {
    const params = Object.fromEntries([...searchParams.entries()]);

    const updatedFilters = {
      category: params.category || "",
      gender: params.gender || "",
      color: params.color || "",
      sizes: params.sizes ? params.sizes.split(",") : [],
      material: params.material ? params.material.split(",") : [],
      brand: params.brand ? params.brand.split(",") : [],
      minPrice: parseInt(params.minPrice, 10) || 0,
      maxPrice: parseInt(params.maxPrice, 10) || 1000,
    };

    setFilters(updatedFilters);
    setPriceRange([updatedFilters.minPrice, updatedFilters.maxPrice]);
  }, [searchParams]);

  // URL update karne wala function
  const updateUrlParams = (currentFilters) => {
    const params = new URLSearchParams();

    Object.entries(currentFilters).forEach(([key, value]) => {
      if (Array.isArray(value) && value.length > 0) {
        params.set(key, value.join(","));
      } else if (
        !Array.isArray(value) &&
        value !== "" &&
        value !== null &&
        value !== undefined &&
        !(key === "minPrice" && value === 0) && // default ko URL me mat daal
        !(key === "maxPrice" && value === 1000)
      ) {
        params.set(key, value);
      }
    });

    setSearchParams(params);
  };

  const handleFilterChange = (filterName, value) => {
    const newFilters = { ...filters, [filterName]: value };
    setFilters(newFilters);          // ✅ local state update
    updateUrlParams(newFilters);     // ✅ URL update
  };

  const handleMultiSelectChange = (filterName, value) => {
    const currentValues = filters[filterName] || [];
    const newValues = currentValues.includes(value)
      ? currentValues.filter((item) => item !== value)
      : [...currentValues, value];

    handleFilterChange(filterName, newValues);
  };

  const handlePriceChange = (value) => {
    setPriceRange(value);
  };

  const handlePriceAfterChange = (value) => {
    const newFilters = {
      ...filters,
      minPrice: value[0],
      maxPrice: value[1],
    };
    setPriceRange(value);
    setFilters(newFilters);         // ✅ sync
    updateUrlParams(newFilters);
  };

  const handleClearAll = () => {
    setSearchParams({});
    setFilters({
      category: "",
      gender: "",
      color: "",
      sizes: [],
      material: [],
      brand: [],
      minPrice: 0,
      maxPrice: 1000,
    });
    setPriceRange([0, 1000]);
  };

  return (
    <div
      className="w-64 h-screen sticky top-0 p-6 border-r bg-white overflow-y-auto space-y-8"
      data-lenis-prevent-wheel
      data-lenis-prevent-touch
    >
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-bold text-gray-900">Filters</h3>
        <button
          onClick={handleClearAll}
          className="text-sm text-gray-600 hover:text-black"
        >
          Clear All
        </button>
      </div>

      {/* Category */}
      <div>
        <h4 className="font-semibold text-gray-800 mb-3">Category</h4>
        <div className="space-y-2">
          {categories.map((category) => (
            <label
              key={category}
              className="flex items-center cursor-pointer"
            >
              <input
                type="radio"
                name="category"
                value={category}
                checked={filters.category === category}
                onChange={() => handleFilterChange("category", category)}
                className="h-4 w-4 text-black border-gray-300 focus:ring-black"
              />
              <span className="ml-3 text-gray-700">{category}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Gender */}
        <div>
          <h4 className="font-semibold text-gray-800 mb-3">Gender</h4>
          <div className="space-y-2">
            {genders.map((gender) => (
              <label
                key={gender}
                className="flex items-center cursor-pointer"
              >
                <input
                  type="radio"
                  name="gender"
                  value={gender}
                  checked={filters.gender === gender}
                  onChange={() => handleFilterChange("gender", gender)}
                  className="h-4 w-4 text-black border-gray-300 focus:ring-black"
                />
                <span className="ml-3 text-gray-700">{gender}</span>
              </label>
            ))}
          </div>
        </div>

      {/* Colors */}
        <div>
          <h4 className="font-semibold text-gray-800 mb-3">Color</h4>
          <div className="flex flex-wrap gap-3">
            {colors.map((color) => (
              <button
                key={color}
                onClick={() => handleFilterChange("color", color)}
                className={`w-8 h-8 rounded-full border-2 transition-transform duration-200 ${
                  filters.color === color ? "border-black scale-110" : "border-gray-300"
                }`}
                style={{ backgroundColor: color.toLowerCase() }}
              />
            ))}
          </div>
        </div>

      {/* sizes */}
      <div>
        <h4 className="font-semibold text-gray-800 mb-3">sizes</h4>
        <div className="flex flex-wrap gap-2">
          {sizess.map((sizes) => (
            <button
              key={sizes}
              onClick={() => handleMultiSelectChange("sizes", sizes)}
              className={`h-10 w-12 border rounded-md flex items-center justify-center font-medium transition-colors ${
                filters.sizes.includes(sizes)
                  ? "bg-black text-white"
                  : "bg-white text-black hover:bg-gray-100"
              }`}
            >
              {sizes}
            </button>
          ))}
        </div>
      </div>

      {/* Price Range */}
      <div>
        <h4 className="font-semibold text-gray-800 mb-3">Price Range</h4>
        <div className="px-2">
          <Slider
            range
            min={0}
            max={1000}
            value={priceRange}
            onChange={handlePriceChange}
            onAfterChange={handlePriceAfterChange}
            trackStyle={[{ backgroundColor: "black" }]}
            handleStyle={[{ borderColor: "black" }, { borderColor: "black" }]}
          />
        </div>
        <div className="flex justify-between items-center mt-3 text-sm text-gray-700">
          <span>₹{priceRange[0]}</span>
          <span>₹{priceRange[1]}</span>
        </div>
      </div>

      {/* Materials */}
      <div>
        <h4 className="font-semibold text-gray-800 mb-3">Materials</h4>
        <div className="space-y-2">
          {materials.map((material) => (
            <label
              key={material}
              className="flex items-center cursor-pointer"
            >
              <input
                type="checkbox"
                value={material}
                checked={filters.material.includes(material)}
                onChange={() => handleMultiSelectChange("material", material)}
                className="h-4 w-4 text-black border-gray-300 rounded focus:ring-black"
              />
              <span className="ml-3 text-gray-700">{material}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Brands */}
      <div>
        <h4 className="mb-3 font-semibold text-gray-800">Brand</h4>
        <div className="space-y-2 overflow-y-auto max-h-48 pr-1">
          {brands.map((brand) => (
            <label
              key={brand}
              className="flex cursor-pointer items-center"
            >
              <input
                type="checkbox"
                value={brand}
                checked={filters.brand.includes(brand)}
                onChange={() => handleMultiSelectChange("brand", brand)}
                className="h-4 w-4 rounded border-gray-300 text-black focus:ring-black"
              />
              <span className="ml-3 text-gray-700">{brand}</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
}
