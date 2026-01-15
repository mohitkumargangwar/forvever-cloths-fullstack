// import { useEffect, useRef, useState } from "react";
// import { FaFilter } from "react-icons/fa";
// import SortOptions from "../components/Products/SortOptions";
// import FilterSidebar from "../components/Products/FilterSidebar";
// import ProductGrid from "../components/Products/ProductGrid";
// import { useSearchParams } from "react-router";

// function Collections() {
  
//   const [collections, setCollections] = useState([]);
//   const [filteredProducts, setFilteredProducts] = useState([]);
//   const [filters, setFilters] = useState({});
//   const [sortOption, setSortOption] = useState("");
//   const [searchParams] = useSearchParams();


//   const sidebarRef = useRef(null);
//   const [isSidebarOpen, setIsSidebarOpen] = useState(false);

//   function toggleSidebar() {
//     setIsSidebarOpen(!isSidebarOpen);
//   }

//   const handleClickOutside = (e) => {
//     if (sidebarRef.current && !sidebarRef.current.contains(e.target)) {
//       isSidebarOpen && setIsSidebarOpen(false);
//     }
//   };

//   useEffect(() => {
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside);
//     };
//   }, [isSidebarOpen]);

//   useEffect(() => {
//     setTimeout(() => {
//      const fetchCollections = [
//     {
//         _id: 1,
//         name: "Men's Classic Cotton T-Shirt",
//         price: 100,
//         images: [{ url: "https://picsum.photos/500/500?random=1" }],
//         category: "Men",
//         type: "Top Wear",
//         size: ["S", "M", "L", "XL"],
//         colour: ["Black", "White", "Navy"],
//         brand: "Roadster",
//         materials: "Cotton",
//     },
//     {
//         _id: 2,
//         name: "Women's Slim Fit Jeans",
//         price: 120,
//         images: [{ url: "https://picsum.photos/500/500?random=2" }],
//         category: "Women",
//         type: "Bottom Wear",
//         size: ["S", "M", "L"],
//         colour: ["Blue", "Black"],
//         brand: "Levi's",
//         materials: "Denim",
//     },
//     {
//         _id: 3,
//         name: "Men's Athletic Polo Shirt",
//         price: 95,
//         images: [{ url: "https://picsum.photos/500/500?random=3" }],
//         category: "Men",
//         type: "Top Wear",
//         size: ["M", "L", "XL"],
//         colour: ["Red", "White"],
//         brand: "Puma",
//         materials: "Polyester",
//     },
//     {
//         _id: 4,
//         name: "Women's Stylish Top",
//         price: 250,
//         images: [{ url: "https://picsum.photos/500/500?random=4" }],
//         category: "Women",
//         type: "Top Wear",
//         size: ["S", "M"],
//         colour: ["Pink", "White", "Yellow"],
//         brand: "Zara",
//         materials: "Silk",
//     },
//     {
//         _id: 5,
//         name: "Men's Casual Shorts",
//         price: 80,
//         images: [{ url: "https://picsum.photos/500/500?random=5" }],
//         category: "Men",
//         type: "Bottom Wear",
//         size: ["M", "L", "XL"],
//         colour: ["Grey", "Black", "Beige"],
//         brand: "H&M",
//         materials: "Cotton",
//     },
//     {
//         _id: 6,
//         name: "Women's Formal Trousers",
//         price: 175,
//         images: [{ url: "https://picsum.photos/500/500?random=6" }],
//         category: "Women",
//         type: "Bottom Wear",
//         size: ["S", "M", "L"],
//         colour: ["Black", "Grey"],
//         brand: "Zara",
//         materials: "Polyester",
//     },
//     {
//         _id: 7,
//         name: "Men's Graphic Print Hoodie",
//         price: 60,
//         images: [{ url: "https://picsum.photos/500/500?random=7" }],
//         category: "Men",
//         type: "Top Wear",
//         size: ["L", "XL", "XXL"],
//         colour: ["Black", "Maroon"],
//         brand: "Nike",
//         materials: "Fleece",
//     },
//     {
//         _id: 8,
//         name: "Women's Woolen Sweater",
//         price: 300,
//         images: [{ url: "https://picsum.photos/500/500?random=8" }],
//         category: "Women",
//         type: "Top Wear",
//         size: ["M", "L"],
//         colour: ["Cream", "Grey"],
//         brand: "H&M",
//         materials: "Wool",
//     },
//     {
//         _id: 9,
//         name: "Men's Relaxed Fit Chinos",
//         price: 100,
//         images: [{ url: "https://picsum.photos/500/500?random=9" }],
//         category: "Men",
//         type: "Bottom Wear",
//         size: ["M", "L", "XL"],
//         colour: ["Beige", "Navy"],
//         brand: "Roadster",
//         materials: "Cotton",
//     },
//     {
//         _id: 10,
//         name: "Women's Athletic Leggings",
//         price: 120,
//         images: [{ url: "https://picsum.photos/500/500?random=10" }],
//         category: "Women",
//         type: "Bottom Wear",
//         size: ["S", "M", "L"],
//         colour: ["Black", "Grey"],
//         brand: "Adidas",
//         materials: "Polyester",
//     },
//     {
//         _id: 11,
//         name: "Men's Formal Shirt",
//         price: 95,
//         images: [{ url: "https://picsum.photos/500/500?random=11" }],
//         category: "Men",
//         type: "Top Wear",
//         size: ["M", "L", "XL", "XXL"],
//         colour: ["White", "Light Blue"],
//         brand: "Van Heusen",
//         materials: "Cotton",
//     },
//     {
//         _id: 12,
//         name: "Women's A-Line Skirt",
//         price: 250,
//         images: [{ url: "https://picsum.photos/500/500?random=12" }],
//         category: "Women",
//         type: "Bottom Wear",
//         size: ["S", "M"],
//         colour: ["Black", "Red", "Floral"],
//         brand: "Zara",
//         materials: "Polyester",
//     },
//     {
//         _id: 13,
//         name: "Men's Denim Jacket",
//         price: 80,
//         images: [{ url: "https://picsum.photos/500/500?random=13" }],
//         category: "Men",
//         type: "Top Wear",
//         size: ["M", "L", "XL"],
//         colour: ["Blue", "Black"],
//         brand: "Levi's",
//         materials: "Denim",
//     },
//     {
//         _id: 14,
//         name: "Women's Casual Dress",
//         price: 175,
//         images: [{ url: "https://picsum.photos/500/500?random=14" }],
//         category: "Women",
//         type: "Top Wear",
//         size: ["S", "M", "L"],
//         colour: ["Green", "Yellow"],
//         brand: "H&M",
//         materials: "Linen",
//     },
//     {
//         _id: 15,
//         name: "Men's Cargo Trousers",
//         price: 60,
//         images: [{ url: "https://picsum.photos/500/500?random=15" }],
//         category: "Men",
//         type: "Bottom Wear",
//         size: ["L", "XL"],
//         colour: ["Olive Green", "Khaki"],
//         brand: "Roadster",
//         materials: "Cotton",
//     },
//     {
//         _id: 16,
//         name: "Women's Running Shorts",
//         price: 300,
//         images: [{ url: "https://picsum.photos/500/500?random=16" }],
//         category: "Women",
//         type: "Bottom Wear",
//         size: ["S", "M", "L"],
//         colour: ["Black", "Pink"],
//         brand: "Nike",
//         materials: "Polyester",
//     },
//     {
//         _id: 17,
//         name: "Men's V-Neck T-Shirt",
//         price: 100,
//         images: [{ url: "https://picsum.photos/500/500?random=17" }],
//         category: "Men",
//         type: "Top Wear",
//         size: ["S", "M", "L"],
//         colour: ["Grey", "White"],
//         brand: "H&M",
//         materials: "Cotton",
//     },
//     {
//         _id: 21,
//         name: "Women's Palazzo Pants",
//         price: 120,
//         images: [{ url: "https://picsum.photos/500/500?random=21" }],
//         category: "Women",
//         type: "Bottom Wear",
//         size: ["M", "L", "XL"],
//         colour: ["Black", "Maroon"],
//         brand: "Zara",
//         materials: "Silk",
//     },
//     {
//         _id: 311,
//         name: "Men's Checkered Shirt",
//         price: 95,
//         images: [{ url: "https://picsum.photos/500/500?random=311" }],
//         category: "Men",
//         type: "Top Wear",
//         size: ["M", "L", "XL"],
//         colour: ["Red", "Blue"],
//         brand: "Levi's",
//         materials: "Cotton",
//     },
//     {
//         _id: 411,
//         name: "Women's Crop Top",
//         price: 250,
//         images: [{ url: "https://picsum.photos/500/500?random=411" }],
//         category: "Women",
//         type: "Top Wear",
//         size: ["XS", "S", "M"],
//         colour: ["White", "Black", "Red"],
//         brand: "H&M",
//         materials: "Cotton",
//     },
//     {
//         _id: 533,
//         name: "Men's Track Pants",
//         price: 80,
//         images: [{ url: "https://picsum.photos/500/500?random=533" }],
//         category: "Men",
//         type: "Bottom Wear",
//         size: ["S", "M", "L", "XL"],
//         colour: ["Black", "Grey"],
//         brand: "Adidas",
//         materials: "Polyester",
//     },
//     {
//         _id: 644,
//         name: "Women's High-Waist Jeans",
//         price: 175,
//         images: [{ url: "https://picsum.photos/500/500?random=644" }],
//         category: "Women",
//         type: "Bottom Wear",
//         size: ["S", "M", "L"],
//         colour: ["Dark Blue", "Light Blue", "Black"],
//         brand: "Zara",
//         materials: "Denim",
//     },
//     {
//         _id: 733,
//         name: "Men's Sleeveless T-Shirt",
//         price: 60,
//         images: [{ url: "https://picsum.photos/500/500?random=733" }],
//         category: "Men",
//         type: "Top Wear",
//         size: ["M", "L"],
//         colour: ["Black", "White"],
//         brand: "Puma",
//         materials: "Cotton",
//     },
//     {
//         _id: 888,
//         name: "Women's Leather Jacket",
//         price: 300,
//         images: [{ url: "https://picsum.photos/500/500?random=888" }],
//         category: "Women",
//         type: "Top Wear",
//         size: ["S", "M", "L"],
//         colour: ["Black", "Brown"],
//         brand: "H&M",
//         materials: "Faux Leather",
//     },
//     {
//         _id: 144,
//         name: "Men's Printed Boxers",
//         price: 100,
//         images: [{ url: "https://picsum.photos/500/500?random=144" }],
//         category: "Men",
//         type: "Bottom Wear",
//         size: ["M", "L", "XL"],
//         colour: ["Multi-Color"],
//         brand: "Jockey",
//         materials: "Cotton",
//     },
//     {
//         _id: 200,
//         name: "Women's Camisole Top",
//         price: 120,
//         images: [{ url: "https://picsum.photos/500/500?random=200" }],
//         category: "Women",
//         type: "Top Wear",
//         size: ["S", "M", "L"],
//         colour: ["White", "Black", "Skin"],
//         brand: "Zara",
//         materials: "Cotton",
//     },
//     {
//         _id: 399,
//         name: "Men's Linen Trousers",
//         price: 95,
//         images: [{ url: "https://picsum.photos/500/500?random=399" }],
//         category: "Men",
//         type: "Bottom Wear",
//         size: ["L", "XL"],
//         colour: ["Beige", "White"],
//         brand: "Roadster",
//         materials: "Linen",
//     },
//     {
//         _id: 488,
//         name: "Women's Boyfriend T-Shirt",
//         price: 250,
//         images: [{ url: "https://picsum.photos/500/500?random=488" }],
//         category: "Women",
//         type: "Top Wear",
//         size: ["M", "L", "XL"],
//         colour: ["Grey", "White", "Black"],
//         brand: "H&M",
//         materials: "Cotton",
//     },
//     {
//         _id: 587,
//         name: "Men's Sweatshirt",
//         price: 80,
//         images: [{ url: "https://picsum.photos/500/500?random=587" }],
//         category: "Men",
//         type: "Top Wear",
//         size: ["S", "M", "L", "XL"],
//         colour: ["Navy", "Grey", "Black"],
//         brand: "Adidas",
//         materials: "Fleece",
//     },
//     {
//         _id: 676,
//         name: "Women's Jeggings",
//         price: 175,
//         images: [{ url: "https://picsum.photos/500/500?random=676" }],
//         category: "Women",
//         type: "Bottom Wear",
//         size: ["S", "M", "L"],
//         colour: ["Black", "Dark Blue"],
//         brand: "Levi's",
//         materials: "Denim",
//     },
//     {
//         _id: 764,
//         name: "Men's Athletic Vest",
//         price: 60,
//         images: [{ url: "https://picsum.photos/500/500?random=764" }],
//         category: "Men",
//         type: "Top Wear",
//         size: ["M", "L", "XL"],
//         colour: ["White", "Black", "Grey"],
//         brand: "Nike",
//         materials: "Polyester",
//     },
//     {
//         _id: 8554,
//         name: "Women's Shrug",
//         price: 300,
//         images: [{ url: "https://picsum.photos/500/500?random=8554" }],
//         category: "Women",
//         type: "Top Wear",
//         size: ["Free Size"],
//         colour: ["Black", "White", "Red"],
//         brand: "Zara",
//         materials: "Cotton",
//     }
// ];
//       setCollections(fetchCollections);
//     }, 1000);
//   }, []);



//   // Collections component ke andar yeh poora useEffect block add karein

// useEffect(() => {
//   // 1. URL se saare filter aur sort options nikalein
//   const sort = searchParams.get("sort") || "";
//   const gender = searchParams.get("gender");
//   const category = searchParams.get("category");
//   const color = searchParams.get("color");
//   const minPrice = parseInt(searchParams.get("minPrice"), 10) || 0;
//   const maxPrice = parseInt(searchParams.get("maxPrice"), 10) || 1000;

//   // Multi-select values ko array mein convert karein
//   const brands = searchParams.get("brand") ? searchParams.get("brand").split(',') : [];
//   const materials = searchParams.get("material") ? searchParams.get("material").split(',') : [];
//   const sizes = searchParams.get("size") ? searchParams.get("size").split(',') : [];

//   // 2. Original products list se shuruaat karein
//   let processedProducts = [...collections];

//   // 3. Ek-ek karke saare filters apply karein
//   // Gender Filter
//   if (gender) {
//     processedProducts = processedProducts.filter(p => p.category === gender);
//   }
//   // Category Filter
//   if (category) {
//     processedProducts = processedProducts.filter(p => p.type === category);
//   }
//   // Color Filter
//   if (color) {
//     processedProducts = processedProducts.filter(p => p.colour.includes(color));
//   }
//   // Price Filter
//   processedProducts = processedProducts.filter(p => p.price >= minPrice && p.price <= maxPrice);

//   // Brand Filter (multiple selection)
//   if (brands.length > 0) {
//     processedProducts = processedProducts.filter(p => brands.includes(p.brand));
//   }
//   // Material Filter (multiple selection)
//   if (materials.length > 0) {
//     processedProducts = processedProducts.filter(p => materials.includes(p.materials));
//   }
//   // Size Filter (multiple selection)
//   if (sizes.length > 0) {
//     processedProducts = processedProducts.filter(p => p.size.some(s => sizes.includes(s)));
//   }

//   // 4. Sorting logic apply karein
//   if (sort === 'priceAsc') {
//     processedProducts.sort((a, b) => a.price - b.price);
//   } else if (sort === 'priceDesc') {
//     processedProducts.sort((a, b) => b.price - a.price);
//   }
//   // 'popularity' ke liye alag se logic lagega agar aapke data mein popularity score ho

//   // 5. Final filtered aur sorted list ko state mein set karein
//   setFilteredProducts(processedProducts);

// }, [searchParams, collections]); // Yeh tabhi chalega jab URL ya collections badlenge

//   return (
//     <div className="flex flex-col lg:flex-row min-h-screen">
//       {/* Mobile Filter button */}
//       <button
//         onClick={toggleSidebar}
//         className="lg:hidden border p-2 flex justify-center items-center"
//       >
//         <FaFilter className="mr-2" /> Filters
//       </button>

//     {/* Filter Sidebar */}
//       <aside
//         ref={sidebarRef}
//         className={`fixed inset-y-0 z-50 lg:z-0 left-0 w-64 bg-white transition-transform duration-300 transform
//         lg:sticky lg:top-30 lg:h-screen lg:translate-x-0
//         ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}`}
//         data-lenis-prevent
//       >
//         <FilterSidebar />
//       </aside>

//    {/* Main Content Area */}
// <div className="flex flex-col flex-grow">
//   {/* Cards Area */}
//   <div className="p-4 flex-grow overflow-y-auto">
//     <div className="flex flex-col space-y-2 sm:flex-row sm:gap-2 justify-between items-center mb-6">
//       <h2 className="text-2xl uppercase font-bold">All Collections</h2>
//       <SortOptions />
//     </div>

//    <ProductGrid products={filteredProducts} />
//   </div>
// </div>

//     </div>
//   );
// }

// export default Collections;
