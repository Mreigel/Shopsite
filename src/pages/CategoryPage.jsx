import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import Select from "react-select";
import products from "../data/products";

const CategoryPage = () => {
  const { categoryName } = useParams();

  let subFilters = [];
  if (categoryName.toLowerCase() === "women") {
    subFilters = ["New Arrivals", "Jeans", "Pants", "Shorts", "T-Shirts", "Dresses"];
  } else if (categoryName.toLowerCase() === "men") {
    subFilters = ["New Arrivals", "Jeans", "Pants", "Shorts", "T-Shirts"];
  } else {
    subFilters = ["New Arrivals", "Jeans", "Pants", "Shorts", "T-Shirts", "Dresses"];
  }

  const options = subFilters.map((filter) => ({ label: filter, value: filter }));
  const [selectedFilters, setSelectedFilters] = useState(new Set());

  const handleSelectChange = (selectedOptions) => {
    const selectedSet = new Set(selectedOptions ? selectedOptions.map((opt) => opt.value) : []);
    setSelectedFilters(selectedSet);
  };

  const filteredProducts = products.filter((product) => {
    const inCategory = product.category.toLowerCase() === categoryName.toLowerCase();
    const matchesFilters = selectedFilters.size === 0 || selectedFilters.has(product.subcategory);
    return inCategory && matchesFilters;
  });

  const MIN_PRODUCTS_TO_SHOW = 4;
  const showRecommendations = filteredProducts.length < MIN_PRODUCTS_TO_SHOW;
  const recommendedProducts = products
    .filter(p => !filteredProducts.some(fp => fp.id === p.id))
    .slice(0, MIN_PRODUCTS_TO_SHOW - filteredProducts.length);

  // People Also Liked: Random 3 products NOT in current category
  const peopleAlsoLiked = products
    .filter(p => p.category.toLowerCase() !== categoryName.toLowerCase())
    .sort(() => 0.5 - Math.random()) // shuffle
    .slice(0, 3);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 p-6">
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={() => window.history.back()}
          className="text-blue-600 hover:underline text-sm font-medium"
        >
          ← Go Back
        </button>
        <Link to="/" className="text-blue-600 hover:underline text-sm font-medium">
          Home
        </Link>
      </div>

      <h1 className="text-4xl font-bold mb-6 capitalize">{categoryName}</h1>

      <section className="mb-8 p-4 border rounded-lg bg-white shadow-sm max-w-full sm:max-w-md">
        <label
          htmlFor="subcategory-select"
          className="block mb-2 font-semibold text-gray-700"
        >
          Filter by Subcategory
        </label>
        <Select
          isMulti
          options={options}
          value={options.filter((opt) => selectedFilters.has(opt.value))}
          onChange={handleSelectChange}
          className="basic-multi-select"
          classNamePrefix="select"
          placeholder="Select subcategories..."
          closeMenuOnSelect={false}
        />
      </section>

      {/* Products Grid */}
      <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {filteredProducts.map((product) => (
          <div
            key={product.id}
            className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow"
          >
            <Link
              to={`/product/${product.id}`}
              className="block cursor-pointer"
              aria-label={`View details for ${product.name}`}
            >
              <img
                src={product.images && product.images[0] ? product.images[0] : product.image}
                alt={product.name}
                className="w-full h-44 sm:h-52 object-cover rounded-t"
              />
              <div className="p-3 sm:p-4">
                <h2 className="text-xl font-semibold text-gray-800">{product.name}</h2>
                <p className="text-gray-500">${product.price.toFixed(2)}</p>
                <button
                  type="button"
                  className="mt-2 w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
                >
                  View
                </button>
              </div>
            </Link>
          </div>
        ))}
      </div>

      {/* Show recommendations if needed */}
      {showRecommendations && recommendedProducts.length > 0 && (
        <>
          <h2 className="text-2xl font-semibold mt-12 mb-6">Recommended for you</h2>
          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {recommendedProducts.map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow"
              >
                <Link
                  to={`/product/${product.id}`}
                  className="block cursor-pointer"
                  aria-label={`View details for ${product.name}`}
                >
                  <img
                    src={product.images && product.images[0] ? product.images[0] : product.image}
                    alt={product.name}
                    className="w-full h-44 sm:h-48 object-cover rounded-t"
                  />
                  <div className="p-3 sm:p-4">
                    <h3 className="text-lg font-semibold text-gray-800">{product.name}</h3>
                    <p className="text-gray-500">${product.price.toFixed(2)}</p>
                    <button
                      type="button"
                      className="mt-2 w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
                    >
                      View
                    </button>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </>
      )}

      {/* People Also Liked Section */}
      {peopleAlsoLiked.length > 0 && (
        <>
          <h2 className="text-2xl font-semibold mt-12 mb-6">People Also Liked</h2>
          <div className="grid gap-6 grid-cols-1 sm:grid-cols-3">
            {peopleAlsoLiked.map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow"
              >
                <Link
                  to={`/product/${product.id}`}
                  className="block cursor-pointer"
                  aria-label={`View details for ${product.name}`}
                >
                  <img
                    src={product.images && product.images[0] ? product.images[0] : product.image}
                    alt={product.name}
                    className="w-full h-44 object-cover rounded-t"
                  />
                  <div className="p-3">
                    <h3 className="text-lg font-semibold text-gray-800">{product.name}</h3>
                    <p className="text-gray-500">${product.price.toFixed(2)}</p>
                    <button
                      type="button"
                      className="mt-2 w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
                    >
                      View
                    </button>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </>
      )}

      {/* Show no results message if absolutely no filtered products */}
      {filteredProducts.length === 0 && (
        <div className="text-center text-gray-500 py-16 flex flex-col items-center space-y-4 bg-white rounded-lg shadow-sm mt-8">
          <svg
            className="w-12 h-12 text-gray-400"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 17v-6a4 4 0 018 0v6" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v.01" />
          </svg>
          <p className="text-lg font-medium">No products found.</p>
        </div>
      )}
    </div>
  );
};

export default CategoryPage;
