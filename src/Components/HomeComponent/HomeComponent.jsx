import React, { useState, useEffect } from "react";
import axios from "axios"; // Import axios
import { useDispatch } from "react-redux";
import { addToCart as addProductToCart } from "../../Redux/features/cartSlice"; // Rename for clarity
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { emptycartIteam } from "../../Redux/features/cartSlice";
import { auth } from "../../firebase/config";
import { signOut } from "firebase/auth";
import { setUser, selectUsers } from "../../Redux/Authentication/usersSlice";
import LoginComponent from "../LoginComponent/LoginComponent";
import TopBannerInHomePage from "../../assets/TopBannerInHomePage.avif"; // Adjust the path based on your folder structure
import { FaStar } from "react-icons/fa";
import { FaFemale } from "react-icons/fa";

const HomeComponent = () => {
  const [womensProducts, setWomensProducts] = useState([]);
  const [mensProducts, setMensProducts] = useState([]);
  const [jewelleryProducts, setJewelleryProducts] = useState([]);
  const [electronicsProducts, setElectronicsProducts] = useState([]);
  const [isLoadingWomen, setIsLoadingWomen] = useState(true);
  const [isLoadingMen, setIsLoadingMen] = useState(true);
  const [isLoadingJewellery, setIsLoadingJewellery] = useState(true);
  const [isLoadingElectronics, setIsLoadingElectronics] = useState(true);

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

  const dispatch = useDispatch();

  const sendToCart = (product) => {
    dispatch(addProductToCart(product)); // Dispatch product to cart
    toast.success("Item added In Your Cart");
    console.log("Item added In Your Cart", product);
  };

  useEffect(() => {
    getWomensProducts();
    getMensProducts();
    getJewelleryProducts();
    getElectronicsProducts();
  }, []);

  async function getWomensProducts() {
    try {
      const response = await axios.get(
        "https://fakestoreapi.com/products/category/women's clothing?limit=3"
      );

      // Add quantity: 1 to each product
      const modifiedWomensData = response.data.map((product) => ({
        ...product,
        quantity: 0,
      }));

      setWomensProducts(modifiedWomensData);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setIsLoadingWomen(false); // Stop loading once products are fetched
    }
  }
  async function getMensProducts() {
    try {
      const response = await axios.get(
        "https://fakestoreapi.com/products/category/men's clothing?limit=3"
      );

      // Add quantity: 1 to each product
      const modifiedMensData = response.data.map((product) => ({
        ...product,
        quantity: 0,
      }));

      setMensProducts(modifiedMensData);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setIsLoadingMen(false); // Stop loading once products are fetched
    }
  }

  async function getJewelleryProducts() {
    try {
      const response = await axios.get(
        "https://fakestoreapi.com/products/category/jewelery?limit=3"
      );

      // Add quantity: 1 to each product
      const modifiedJewelleryData = response.data.map((product) => ({
        ...product,
        quantity: 0,
      }));

      setJewelleryProducts(modifiedJewelleryData);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setIsLoadingJewellery(false); // Stop loading once products are fetched
    }
  }

  async function getElectronicsProducts() {
    try {
      const response = await axios.get(
        "https://fakestoreapi.com/products/category/electronics?limit=3"
      );

      // Add quantity: 1 to each product
      const modifiedElectronicsData = response.data.map((product) => ({
        ...product,
        quantity: 0,
      }));

      setElectronicsProducts(modifiedElectronicsData);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setIsLoadingElectronics(false); // Stop loading once products are fetched
    }
  }

  return (
    <>
      <div className="mx-4 my-2 flex justify-center items-center ">
        <img
          src={TopBannerInHomePage}
          alt="My AVIF"
          className="w-full   lg:w-[1150px]"
        />
      </div>
      <div className="flex flex-wrap gap-4 py-4 bg-gray-300">
        <div className="border-blue-800 border-2 bg-blue-200 rounded-2xl mx-auto  ">
          <div className=" text-center text-4xl font-semibold ">
            Mens Products
          </div>
          {isLoadingMen ? (
            <div className="flex  h-screen">
              <p>Loading...</p>
            </div>
          ) : (
            <div className="flex justify-center items-center ">
              {mensProducts.map((product) => (
                // <div
                //   key={product.id}
                //   className="bg-white shadow-md rounded-lg p-4 flex flex-col justify-between"
                // >
                //   <img
                //     src={product.image}
                //     alt={product.title}
                //     className="w-full h-48 object-cover mb-4 rounded"
                //   />
                //   <h2 className="text-lg font-semibold">{product.title}</h2>
                //   <p className="text-gray-700 mt-2">${product.price}</p>
                // </div>
                <div
                  key={product.id}
                  className="flex justify-center m-2 items-center rounded-lg shadow-md overflow-hidden bg-white p-1 md:p-3  "
                >
                  <Link to={`/mensList`}>
                    <div className="md:w-48  md:flex md:justify-center md:items-center">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-36 h-40 md:w-52 md:h-80 object-cover rounded-2xl  md:px-2 "
                      />
                    </div>
                    {/* <p className="text-xs font-semibold text-center">
                      {product.title.split(" ").slice(0, 3).join(" ")}
                    </p> */}
                    <div className="flex justify-center items-center ">
                      <div className="flex items-center justify-center bg-green-500 text-white text-xs font-semibold px-2 py-1 rounded my-2 w-fit">
                        <div>
                          <FaStar className="mr-1 text-xs" />
                        </div>
                        <div>
                          <span className="text-xs">
                            {product.rating?.rate || 0} / 5
                          </span>
                        </div>
                      </div>
                    </div>
                    <p className="text-gray-500 text-center text-xs">
                      ${product.price}
                    </p>
                  </Link>
                </div>
              ))}
            </div>
          )}
        </div>
        <div className="border-pink-800 border-2 bg-pink-200 rounded-2xl  mx-auto">
          <div className=" text-center text-4xl font-semibold    ">
            Womens Products
          </div>
          {isLoadingWomen ? (
            <div className="flex  h-screen">
              <p>Loading...</p>
            </div>
          ) : (
            <div className="flex justify-center items-center ">
              {womensProducts.map((product) => (
                // <div
                //   key={product.id}
                //   className="bg-white shadow-md rounded-lg p-4 flex flex-col justify-between"
                // >
                //   <img
                //     src={product.image}
                //     alt={product.title}
                //     className="w-full h-48 object-cover mb-4 rounded"
                //   />
                //   <h2 className="text-lg font-semibold">{product.title}</h2>
                //   <p className="text-gray-700 mt-2">${product.price}</p>
                // </div>
                <div
                  key={product.id}
                  className="flex justify-center m-2 items-center rounded-lg shadow-md overflow-hidden bg-white p-1 md:p-3  "
                >
                  <Link to={`/womensList`}>
                    <div className="md:w-48  md:flex md:justify-center md:items-center">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-36 h-40 md:w-52 md:h-80 object-cover rounded-2xl  md:px-2 "
                      />
                    </div>
                    {/* <p className="text-xs font-semibold text-center">
                      {product.title.split(" ").slice(0, 3).join(" ")}
                    </p> */}
                    <div className="flex justify-center items-center ">
                      <div className="flex items-center justify-center bg-green-500 text-white text-xs font-semibold px-2 py-1 rounded my-2 w-fit">
                        <div>
                          <FaStar className="mr-1 text-xs" />
                        </div>
                        <div>
                          <span className="text-xs">
                            {product.rating?.rate || 0} / 5
                          </span>
                        </div>
                      </div>
                    </div>
                    <p className="text-gray-500 text-center text-xs">
                      ${product.price}
                    </p>
                  </Link>
                </div>
              ))}
            </div>
          )}
        </div>
        <div className="border-yellow-800 border-2 bg-yellow-200 rounded-2xl  mx-auto">
          <div className=" text-center text-4xl font-semibold  ">
            Jewellery Products
          </div>
          {isLoadingJewellery ? (
            <div className="flex  h-screen">
              <p>Loading...</p>
            </div>
          ) : (
            <div className="flex justify-center items-center ">
              {jewelleryProducts.map((product) => (
                // <div
                //   key={product.id}
                //   className="bg-white shadow-md rounded-lg p-4 flex flex-col justify-between"
                // >
                //   <img
                //     src={product.image}
                //     alt={product.title}
                //     className="w-full h-48 object-cover mb-4 rounded"
                //   />
                //   <h2 className="text-lg font-semibold">{product.title}</h2>
                //   <p className="text-gray-700 mt-2">${product.price}</p>
                // </div>
                <div
                  key={product.id}
                  className="flex justify-center m-2 items-center rounded-lg shadow-md overflow-hidden bg-white p-1 md:p-3  "
                >
                  <Link to={`/jeweleryList`}>
                    <div className="md:w-48  md:flex md:justify-center md:items-center">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-36 h-40 md:w-52 md:h-80 object-cover rounded-2xl  md:px-2 "
                      />
                    </div>
                    {/* <p className="text-xs font-semibold text-center">
                      {product.title.split(" ").slice(0, 3).join(" ")}
                    </p> */}
                    <div className="flex justify-center items-center ">
                      <div className="flex items-center justify-center bg-green-500 text-white text-xs font-semibold px-2 py-1 rounded my-2 w-fit">
                        <div>
                          <FaStar className="mr-1 text-xs" />
                        </div>
                        <div>
                          <span className="text-xs">
                            {product.rating?.rate || 0} / 5
                          </span>
                        </div>
                      </div>
                    </div>
                    <p className="text-gray-500 text-center text-xs">
                      ${product.price}
                    </p>
                  </Link>
                </div>
              ))}
            </div>
          )}
        </div>
        <div className="border-gray-800 border-2 bg-gray-200 rounded-2xl  mx-auto">
          <div className=" text-center text-4xl font-semibold  ">
            Electronics Products
          </div>
          {isLoadingElectronics ? (
            <div className="flex  h-screen">
              <p>Loading...</p>
            </div>
          ) : (
            <div className="flex justify-center items-center ">
              {electronicsProducts.map((product) => (
                // <div
                //   key={product.id}
                //   className="bg-white shadow-md rounded-lg p-4 flex flex-col justify-between"
                // >
                //   <img
                //     src={product.image}
                //     alt={product.title}
                //     className="w-full h-48 object-cover mb-4 rounded"
                //   />
                //   <h2 className="text-lg font-semibold">{product.title}</h2>
                //   <p className="text-gray-700 mt-2">${product.price}</p>
                // </div>
                <div
                  key={product.id}
                  className="flex justify-center m-2 items-center rounded-lg shadow-md overflow-hidden bg-white p-1 md:p-3  "
                >
                  <Link to={`/electronicsList`}>
                    <div className="md:w-48  md:flex md:justify-center md:items-center">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-36 h-40 md:w-52 md:h-80 object-cover rounded-2xl  md:px-2 "
                      />
                    </div>
                    {/* <p className="text-xs font-semibold text-center">
                      {product.title.split(" ").slice(0, 3).join(" ")}
                    </p> */}
                    <div className="flex justify-center items-center ">
                      <div className="flex items-center justify-center bg-green-500 text-white text-xs font-semibold px-2 py-1 rounded my-2 w-fit">
                        <div>
                          <FaStar className="mr-1 text-xs" />
                        </div>
                        <div>
                          <span className="text-xs">
                            {product.rating?.rate || 0} / 5
                          </span>
                        </div>
                      </div>
                    </div>
                    <p className="text-gray-500 text-center text-xs">
                      ${product.price}
                    </p>
                  </Link>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      {/* popup for signup and login */}
      {isPopupOpen && <LoginComponent togglePopup={togglePopup} />}
    </>
  );
};

export default HomeComponent;
