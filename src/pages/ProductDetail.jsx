import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import products from "../data/products";

const ProductDetail = () => {
  const { id } = useParams();
  const { addToCart } = useCart();
  const product = products.find((p) => p.id === parseInt(id));

  if (!product) return <p className="text-center mt-10">Product not found.</p>;

  const images = product.images || [product.image];

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState(
    product.variants.find((v) => v.stock > 0)?.size || ""
  );
  const [quantity, setQuantity] = useState(1);

  const selectedVariant = product.variants.find((v) => v.size === selectedSize);
  const maxQuantity = selectedVariant ? selectedVariant.stock : 0;

  const prevImage = () => {
    setCurrentImageIndex((i) => (i === 0 ? images.length - 1 : i - 1));
  };
  const nextImage = () => {
    setCurrentImageIndex((i) => (i === images.length - 1 ? 0 : i + 1));
  };

  const handleAddToCart = () => {
    if (!selectedSize) {
      alert("Please select a size.");
      return;
    }
    if (quantity < 1 || quantity > maxQuantity) {
      alert(`Please select quantity between 1 and ${maxQuantity}.`);
      return;
    }
    addToCart({
      ...product,
      selectedSize,
      quantity,
    });
  };

  // People Also Liked (3 random products excluding current)
  const peopleAlsoLiked = products
    .filter(p => p.id !== product.id)
    .sort(() => 0.5 - Math.random())
    .slice(0, 3);

  return (
    <div className="max-w-5xl mx-auto p-6 bg-white rounded-lg shadow mt-10">
      {/* Back button */}
      <button
        type="button"
        onClick={() => window.history.back()}
        className="mb-6 text-blue-600 hover:underline"
      >
        ← Go Back
      </button>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Left: Image Carousel */}
        <div>
          <div className="relative">
            <img
              src={images[currentImageIndex]}
              alt={`${product.name} - ${currentImageIndex + 1}`}
              className="w-full h-96 object-cover rounded"
            />
            {/* Left arrow */}
            <button
              type="button"
              onClick={prevImage}
              className="absolute top-1/2 left-2 transform -translate-y-1/2 bg-black bg-opacity-40 text-white p-2 rounded-full hover:bg-opacity-60 z-10"
              aria-label="Previous image"
            >
              &#10094;
            </button>
            {/* Right arrow */}
            <button
              type="button"
              onClick={nextImage}
              className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-black bg-opacity-40 text-white p-2 rounded-full hover:bg-opacity-60 z-10"
              aria-label="Next image"
            >
              &#10095;
            </button>
          </div>

          {/* Thumbnails */}
          <div className="flex space-x-2 mt-4 overflow-x-auto">
            {images.map((img, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setCurrentImageIndex(idx)}
                className={`w-20 h-20 rounded overflow-hidden border-2 focus:outline-none ${
                  idx === currentImageIndex ? "border-blue-600" : "border-transparent"
                }`}
              >
                <img
                  src={img}
                  alt={`${product.name} thumbnail ${idx + 1}`}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Right: Product info */}
        <div>
          <h1 className="text-3xl font-bold text-gray-800 mb-4">{product.name}</h1>
          <p className="text-xl text-gray-600 mb-4">${product.price.toFixed(2)}</p>
          <p className="text-gray-700 mb-6">{product.description}</p>

          {/* Size selector */}
          <div className="mb-4">
            <label className="block mb-1 font-semibold" htmlFor="size-select">
              Select Size:
            </label>
            <select
              id="size-select"
              value={selectedSize}
              onChange={(e) => {
                setSelectedSize(e.target.value);
                setQuantity(1); // reset quantity on size change
              }}
              className="w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-400"
            >
              <option value="" disabled>
                Choose a size
              </option>
              {product.variants
                .filter((v) => v.stock > 0)
                .map(({ size }) => (
                  <option key={size} value={size}>
                    {size}
                  </option>
                ))}
            </select>
          </div>

          {/* Quantity selector */}
          <div className="mb-6">
            <label className="block mb-1 font-semibold" htmlFor="qty-select">
              Quantity:
            </label>
            <input
              id="qty-select"
              type="number"
              min={1}
              max={maxQuantity}
              value={quantity}
              onChange={(e) => {
                let val = parseInt(e.target.value, 10);
                if (isNaN(val) || val < 1) val = 1;
                else if (val > maxQuantity) val = maxQuantity;
                setQuantity(val);
              }}
              className="w-20 border rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-400"
              disabled={!selectedSize}
            />
            {selectedSize && (
              <p className="text-sm text-gray-500 mt-1">
                {maxQuantity} item{maxQuantity !== 1 ? "s" : ""} available
              </p>
            )}
          </div>

          {/* Add to Cart */}
          <button
            type="button"
            onClick={handleAddToCart}
            disabled={!selectedSize || maxQuantity === 0}
            className="w-full bg-green-600 text-white py-3 rounded hover:bg-green-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Add to Cart
          </button>
        </div>
      </div>

      {/* People Also Liked Section */}
      <div className="mt-12">
        <h2 className="text-2xl font-semibold mb-6">People Also Liked</h2>
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-3">
          {peopleAlsoLiked.map((p) => (
            <Link
              key={p.id}
              to={`/product/${p.id}`}
              className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow block"
              aria-label={`View details for ${p.name}`}
            >
              <img
                src={p.images && p.images[0] ? p.images[0] : p.image}
                alt={p.name}
                className="w-full h-44 object-cover rounded-t"
              />
              <div className="p-3">
                <h3 className="text-lg font-semibold text-gray-800">{p.name}</h3>
                <p className="text-gray-500">${p.price.toFixed(2)}</p>
                <button
                  type="button"
                  className="mt-2 w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
                >
                  View
                </button>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
