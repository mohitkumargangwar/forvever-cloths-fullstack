import { useState, useRef, useEffect } from "react";
import { HiMagnifyingGlass, HiMiniXMark } from "react-icons/hi2";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { setFilters, fetchProductByFilters } from "../../redux/slice/productSlice";

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const searchRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [isOpen]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      dispatch(setFilters({ search: searchTerm }));
      dispatch(fetchProductByFilters({ search: searchTerm }));
      navigate(`/collections/all?search=${searchTerm}`);
      setIsOpen(false);
      setSearchTerm("");
    }
  };

  return (
    <div ref={searchRef} className="flex items-center">
      {isOpen ? (
        <form
          onSubmit={handleSearch}
          className="absolute inset-0 z-50 flex items-center justify-center bg-white px-4 shadow-md sm:px-6"
        >
          <div className="relative flex w-full max-w-2xl items-center">
            <input
              type="text"
              autoFocus
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full rounded-full bg-gray-100 py-3 pl-5 pr-12 text-sm focus:outline-none focus:ring-2 focus:ring-black"
            />
            <button type="submit" className="absolute right-10 text-gray-600 hover:text-black">
              <HiMagnifyingGlass className="h-6 w-6" />
            </button>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="absolute right-3 text-gray-500 hover:text-black"
            >
              <HiMiniXMark className="h-6 w-6" />
            </button>
          </div>
        </form>
      ) : (
        <button 
          onClick={() => setIsOpen(true)} 
          className="flex items-center text-gray-700 hover:text-[#ea2e0e] transition-colors"
        >
          <HiMagnifyingGlass className="h-6 w-6 sm:h-7 sm:w-7" />
        </button>
      )}
    </div>
  );
};

export default SearchBar;