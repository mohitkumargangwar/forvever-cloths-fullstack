import { useState, useEffect, useRef } from "react";
import { useSearchParams } from "react-router";
import { FiChevronDown } from "react-icons/fi";

const SortOptions = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const sortOrder = searchParams.get("sort") || "";

  const options = [
    { value: "", label: "Default" },
    { value: "priceAsc", label: "Price: Low to High" },
    { value: "priceDesc", label: "Price: High to Low" },
    { value: "popularity", label: "Popularity" },
  ];

  const selectedOptionLabel =
    options.find((opt) => opt.value === sortOrder)?.label || "Default";

  // Select handler
  const handleSelect = (value) => {
    if (value) {
      searchParams.set("sort", value);
    } else {
      searchParams.delete("sort");
    }
    setSearchParams(searchParams);
    setIsOpen(false);
  };

  // Outside click handler
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative inline-block w-48" ref={dropdownRef}>
      {/* Dropdown Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center justify-between rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2"
      >
        <span>{selectedOptionLabel}</span>
        <FiChevronDown
          className={`ml-2 h-5 w-5 transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 z-10 mt-2 w-full rounded-md border border-gray-200 bg-white shadow-lg">
          <div className="py-1">
            {options.map((option) => (
              <button
                key={option.value}
                onClick={() => handleSelect(option.value)}
                className={`block w-full px-4 py-2 text-left text-sm ${
                  sortOrder === option.value
                    ? "bg-gray-100 font-semibold text-gray-900"
                    : "text-gray-700 hover:bg-gray-50"
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SortOptions;
