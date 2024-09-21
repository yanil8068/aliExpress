import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addToCart as addProductToCart } from "../../Redux/features/cartSlice"; // Adjust import as needed
import toast from "react-hot-toast";
import { auth } from "../../firebase/config";
import LoginComponent from "../LoginComponent/LoginComponent";

const SearchComponent = () => {
  const [products, setProducts] = useState([]);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const query = queryParams.get("query");

  useEffect(() => {
    if (query) {
      fetchSearchResults(query);
    }
  }, [query]);

  async function fetchSearchResults(searchTerm) {
    try {
      const response = await axios.get(`https://fakestoreapi.com/products`);
      const filtered = response.data.filter((product) =>
        product.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setProducts(filtered);
    } catch (error) {
      console.error("Error fetching search results:", error);
    }
  }

  const dispatch = useDispatch();

  // Local state to handle the popup for login/signup
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  // Function to toggle the login/signup popup
  function togglePopup() {
    setIsPopupOpen((prevState) => !prevState);
  }

  function handleCartButtonClick(product) {
    if (auth.currentUser) {
      sendToCart(product);
      // navigate("/cart"); // Navigate to the cart if the user is logged in
    } else {
      togglePopup(); // Open the login/signup modal if the user is not logged in
    }
  }
  const sendToCart = (product) => {
    dispatch(addProductToCart(product)); // Dispatch product to cart
    toast.success("Item added In Your Cart");
    console.log("Item added In Your Cart", product);
  };

  // const handleCartButtonClick = (product) => {
  //   dispatch(addProductToCart(product)); // Dispatch product to cart
  //   toast.success("Item added to your cart");
  // };

  return (
    <>
      <div style={{ padding: "20px" }}>
        <h1>Search Results for "{query}"</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.length > 0 ? (
            products.map((product) => (
              <div
                key={product.id}
                className="bg-white shadow-md rounded-lg p-4 flex flex-col justify-between"
              >
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-full h-48 object-cover mb-4 rounded"
                />
                <h2 className="text-lg font-semibold">{product.title}</h2>
                <p className="text-gray-700 mt-2">${product.price}</p>
                <p className="text-gray-500 mt-2">
                  Quantity: {product.quantity}
                </p>
                <button
                  className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                  onClick={() => handleCartButtonClick(product)} // Use the renamed function
                >
                  Add to Cart
                </button>
              </div>
            ))
          ) : (
            <p>No products found for "{query}".</p>
          )}
        </div>
      </div>
      {/* popup for signup and login */}
      {isPopupOpen && <LoginComponent togglePopup={togglePopup} />}
    </>
  );
};

export default SearchComponent;
