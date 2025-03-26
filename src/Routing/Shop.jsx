import React, { useState } from "react";
import useCartStore from "../stores/useCartStore";
import { FiShoppingCart } from "react-icons/fi";
import { Link } from "react-router-dom";

const Shop = () => {
  const { addToCart, cart } = useCartStore();

  const items = [
    {
      id: 1,
      name: "T-Shirt",
      price: 500,
      shop: "Clothing Store",
      image:
        "https://plus.unsplash.com/premium_photo-1718913936342-eaafff98834b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8dCUyMHNoaXJ0fGVufDB8fDB8fHww",
    },
    {
      id: 2,
      name: "Random T-Shirt",
      price: 400,
      shop: "Clothing Store",
      image:
        "https://images.unsplash.com/photo-1562157873-818bc0726f68?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8dCUyMHNoaXJ0fGVufDB8fDB8fHww",
    },
    {
      id: 3,
      name: "Pen",
      price: 50,
      shop: "Stationery Store",
      image:
        "https://images.unsplash.com/photo-1583485088034-697b5bc54ccd?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8cGVufGVufDB8fDB8fHww",
    },
    {
      id: 4,
      name: "Pencil Box",
      price: 100,
      shop: "Stationery Store",
      image:
        "https://plus.unsplash.com/premium_photo-1683120848531-77e7b39ebe77?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fHBlbmNpbCUyMGJveHxlbnwwfHwwfHx8MA%3D%3D",
    },
    {
      id: 5,
      name: "Bottle",
      price: 599,
      shop: "Home Goods Store",
      image:
        "https://images.unsplash.com/photo-1544003484-3cd181d17917?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGJvdHRsZXxlbnwwfHwwfHx8MA%3D%3D",
    },
    {
      id: 6,
      name: "Hoodie",
      price: 1999,
      shop: "Clothing Store",
      image:
        "https://images.unsplash.com/photo-1620799140188-3b2a02fd9a77?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGhvb2RpZXxlbnwwfHwwfHx8MA%3D%3D",
    },
  ];

  const shopNames = [...new Set(items.map((item) => item.shop))];
  const [selectedShop, setSelectedShop] = useState("");

  const filteredItems = selectedShop
    ? items.filter((item) => item.shop === selectedShop)
    : items;

  return (
    <div className="text-white min-h-screen">
      {/* Header Section */}
      <div className="flex justify-between items-center p-6 bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-lg rounded-md mb-6">
        <h1 className="text-3xl font-bold tracking-wide">Dukaan</h1>
        <div className="relative">
          <Link to="/cart" className="relative">
            <FiShoppingCart size={28} />
            {cart.length > 0 && (
              <span className="absolute bottom-4 right-3 bg-red-500 text-white rounded-full text-xs px-2 py-1 animate-pulse">
                {cart.length}
              </span>
            )}
          </Link>
        </div>
      </div>

      {/* Shop Selector */}
      <div className="flex justify-center mb-6">
        <select
          className="py-2 px-3 bg-gray-800 text-white rounded-lg shadow-lg outline-none"
          value={selectedShop}
          onChange={(e) => setSelectedShop(e.target.value)}
        >
          <option value="">All Shops</option>
          {shopNames.map((shop, index) => (
            <option key={index} value={shop}>
              {shop}
            </option>
          ))}
        </select>
      </div>

      {/* Product Grid - Responsive for all screen sizes */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6 p-6">
        {filteredItems.map((item) => (
          <div
            key={item.id}
            className="bg-gray-800 rounded-lg shadow-lg overflow-hidden hover:scale-105 transform transition-all duration-300"
          >
            <img
              src={item.image}
              alt={item.name}
              className="w-full h-60  object-fill"
            />
            <div className="p-4">
              <h3 className="font-semibold text-lg text-gray-100">
                {item.name}
              </h3>
              <p className="text-xl font-semibold text-gray-400">
                ₹{item.price}
              </p>
              <button
                className="mt-4 w-full py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition duration-200 transform hover:scale-105"
                onClick={() => addToCart(item)}
              >
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Shop;
