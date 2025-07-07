import React, { useState, useEffect, useRef } from "react";  
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import products from "../data/products";

const allCategories = [...new Set(products.map(p => p.category))];
const featuredProducts = products.slice(0, 4); // Change as needed

const categoryNavItems = [
  "Top Selling!",
  "Women",
  "Men",
  "Girls",
  "Boys",
  "Toddler",
  "Today's Deals!"
];

const Home = () => {
  const { addToCart } = useCart();

  const [selectedCategory, setSelectedCategory] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [visibleCount, setVisibleCount] = useState(9);

  const loadingRef = useRef(false);

  // Filtered products for main grid
  const filteredProducts = products.filter(product => {
    const categoryMatch = !selectedCategory || product.category === selectedCategory;
    const searchMatch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    return categoryMatch && searchMatch;
  });

  // Slice products to show only visibleCount number
  const visibleProducts = filteredProducts.slice(0, visibleCount);

  // Handle search submit
  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim() === "") return;
    alert(`Search for: ${searchTerm.trim()}`);
    setSearchTerm("");
  };

  // Scroll handler to load more products when near bottom
  useEffect(() => {
    const onScroll = () => {
      if (loadingRef.current) return;
      const scrollThreshold = 200; // px from bottom to trigger

      if (
        window.innerHeight + window.scrollY >=
        document.body.offsetHeight - scrollThreshold
      ) {
        loadingRef.current = true;
        setTimeout(() => {
          setVisibleCount(count => Math.min(count + 6, filteredProducts.length));
          loadingRef.current = false;
        }, 200);
      }
    };

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, [filteredProducts.length]);

  // Reset visibleCount when filters change
  useEffect(() => {
    setVisibleCount(9);
  }, [selectedCategory, searchTerm]);

  const hasReachedAllProductsEnd = visibleCount >= filteredProducts.length;

  return (
    <div className="bg-stone-50 min-h-screen">

      {/* Promo banner */}
      <div className="bg-red-600 text-white text-center py-2 font-semibold px-4 sm:px-0">
        🎉 50% OFF everything! Use code <span className="underline">HALFPRICE</span> at checkout!
      </div>

      {/* Secondary Nav Bar */}
      <div className="bg-white shadow flex flex-wrap items-center px-6 py-3 sticky top-[56px] z-40">
        <Link
          to="/"
          className="text-2xl font-bold text-blue-600 select-none mb-2 sm:mb-0 flex-shrink-0 w-32"
        >
          ShopSite
        </Link>

        <nav className="flex flex-wrap justify-center sm:justify-start gap-4 flex-grow max-w-3xl mx-auto">
          {categoryNavItems.map((item) => (
            <Link
              key={item}
              to={`/category/${encodeURIComponent(item)}`}
              className="text-gray-700 font-medium hover:text-blue-600 whitespace-nowrap px-3 py-1 rounded transition"
            >
              {item}
            </Link>
          ))}
        </nav>

        <form
          onSubmit={handleSearch}
          className="w-full sm:w-auto flex items-center mt-3 sm:mt-0 flex-shrink-0"
          role="search"
          style={{ minWidth: "260px" }}
        >
          <input
            type="search"
            placeholder="Search products..."
            aria-label="Search products"
            className="border border-gray-300 rounded-l px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 flex-grow sm:flex-grow-0 sm:w-64"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded-r hover:bg-blue-700 transition"
          >
            Search
          </button>
        </form>
      </div>

      {/* Hero Image */}
      <div className="relative h-[200px] sm:h-[350px] w-full overflow-hidden mt-2">
        <img
          src="https://picsum.photos/1200/500?blur=5"
          alt="Hero"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center px-4">
          <h2 className="text-white text-3xl sm:text-6xl font-bold text-center">
            Welcome to ShopSite
          </h2>
        </div>
      </div>

      {/* Featured Products */}
      {hasReachedAllProductsEnd && featuredProducts.length > 0 && (
        <section className="max-w-6xl mx-auto px-4 mt-10">
          <h3 className="text-3xl font-bold mb-6 text-blue-700">Featured Products</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map(product => (
              <div
                key={product.id}
                className="bg-blue-50 rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow"
              >
                <Link
                  to={`/product/${product.id}`}
                  className="block cursor-pointer"
                  aria-label={`View details for ${product.name}`}
                >
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    className="w-full h-52 object-cover"
                  />
                  <div className="p-4">
                    <h4 className="text-lg font-semibold text-gray-800">{product.name}</h4>
                    <p className="text-gray-600">${product.price.toFixed(2)}</p>
                    <button
                      type="button"
                      className="mt-3 w-full bg-blue-700 text-white py-2 rounded hover:bg-gradient-to-r hover:from-blue-600 hover:to-blue-800 transition"
                    >
                      View
                    </button>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Main Products Grid */}
      <section className="max-w-6xl mx-auto px-4 mt-16 pb-12">
        <h3 className="text-3xl font-bold mb-6 text-blue-700">All Products</h3>
        <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {visibleProducts.length === 0 ? (
            <p className="text-center col-span-full text-gray-500">No products found.</p>
          ) : (
            visibleProducts.map(product => (
              <div
                key={product.id}
                className="bg-blue-50 rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow"
              >
                <Link to={`/product/${product.id}`}>
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    className="w-full h-52 object-cover cursor-pointer"
                  />
                </Link>
                <div className="p-4">
                  <h4 className="text-lg font-semibold text-gray-800">{product.name}</h4>
                  <p className="text-gray-500">${product.price.toFixed(2)}</p>

                  <div className="flex gap-2 mt-4 flex-col sm:flex-row">
                    {/* Removed Add to Cart button */}

                    {/* View button */}
                    <Link to={`/product/${product.id}`} className="w-full sm:flex-1">
                      <button className="w-full bg-blue-600 text-white font-medium py-2 px-4 rounded hover:bg-blue-700 transition">
                        View
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </section>

    </div>
  );
};

export default Home;
