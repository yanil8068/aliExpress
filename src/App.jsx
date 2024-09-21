import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import HomeComponent from "./Components/HomeComponent/HomeComponent";
import HeaderComponent from "./Components/HeaderComponent/HeaderComponent";
import FooterComponent from "./Components/FooterComponent/FooterComponent";
import SearchComponent from "./Components/SearchComponent/SearchComponent";

import ProductDetailComponent from "./Components/ProductDetailComponent/ProductDetailComponent";

import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { setUser, selectUsers } from "./Redux/Authentication/usersSlice";
import { auth } from "./firebase/config";
import CartComponent from "./Components/CartComponent/CartComponent";
import toast, { Toaster } from "react-hot-toast";
import ListProducts from "./Components/ListProducts/ListProducts";

function App() {
  const dispatch = useDispatch(); // Get the dispatch function from Redux
  const user = useSelector(selectUsers); // Select the current user from Redux state
  const [loading, setLoading] = useState(true); // Local loading state

  useEffect(() => {
    // Listen for authentication state changes
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in
        dispatch(setUser({ id: user.uid, email: user.email }));
      } else {
        // User is signed out
        dispatch(setUser(null));
      }
      setLoading(false); // Stop loading once auth state is resolved
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, [dispatch]);

  if (loading) {
    return <div>Loading...</div>; // Show loading state while checking auth
  }

  return (
    <>
      <BrowserRouter>
        <HeaderComponent />
        {user.currentUser ? (
          <>
            {" "}
            <Routes>
              {/* Home route */}
              <Route path="/" element={<HomeComponent />} />
              {/* Cart route */}
              <Route path="/Cart" element={<CartComponent />} />{" "}
              {/* Search route */}
              <Route path="/search" element={<SearchComponent />} />{" "}
              {/* Product lists by category */}
              <Route
                path="/mensList"
                element={
                  <ListProducts
                    ProductType="men's clothing"
                    RelativePath="mens"
                  />
                }
              />
              <Route
                path="/womensList"
                element={
                  <ListProducts
                    ProductType="women's clothing"
                    RelativePath="womens"
                  />
                }
              />
              <Route
                path="/electronicsList"
                element={
                  <ListProducts
                    ProductType="electronics"
                    RelativePath="electronics"
                  />
                }
              />
              <Route
                path="/jeweleryList"
                element={
                  <ListProducts
                    ProductType="jewelery"
                    RelativePath="jewelery"
                  />
                }
              />
              {/* Product detail route */}
              <Route
                path="/:product/:id"
                element={<ProductDetailComponent />}
              />
            </Routes>
            <Toaster /> {/* Toast notifications */}
          </>
        ) : (
          <>
            {" "}
            <Routes>
              {/* Home route */}
              <Route path="/" element={<HomeComponent />} />
              {/* search route */}
              <Route path="/search" element={<SearchComponent />} />
              {/* Product lists by category */}
              <Route
                path="/mensList"
                element={
                  <ListProducts
                    ProductType="men's clothing"
                    RelativePath="mens"
                  />
                }
              />
              <Route
                path="/womensList"
                element={
                  <ListProducts
                    ProductType="women's clothing"
                    RelativePath="womens"
                  />
                }
              />
              <Route
                path="/electronicsList"
                element={
                  <ListProducts
                    ProductType="electronics"
                    RelativePath="electronics"
                  />
                }
              />
              <Route
                path="/jeweleryList"
                element={
                  <ListProducts
                    ProductType="jewelery"
                    RelativePath="jewelery"
                  />
                }
              />
              {/* product details route */}
              <Route
                path="/:product/:id"
                element={<ProductDetailComponent />}
              />
            </Routes>
            {/* Toast notifications */}
            <Toaster />
          </>
        )}
        {/* Render footer */}
        <FooterComponent />
      </BrowserRouter>
    </>
  );
}

export default App;
