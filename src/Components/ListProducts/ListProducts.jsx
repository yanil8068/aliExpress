// import { Header } from "../../Components/Header/Header";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaStar } from "react-icons/fa";

export default function ListProducts({ ProductType, RelativePath }) {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // Loading state
  const [originalProducts, setOriginalProducts] = useState([]); // To keep track of unfiltered products
  const [isFilterByRating, setIsFilterByRating] = useState(false);
  const [isFilterByPrice, setIsFilterByPrice] = useState(false);
  const [isFilterByPriceAscending, setIsFilterByPriceAscending] =
    useState(false);
  const [isFilterByBelow50, setIsFilterByBelow50] = useState(false);
  const [isFilterByAbove50, setIsFilterByAbove50] = useState(false);
  const [isFilterByRatingAbove3, setIsFilterByRatingAbove3] = useState(false); // New filter for rating > 3
  const [isFilterByRatingBelow3, setIsFilterByRatingBelow3] = useState(false); // Filter for rating <= 3
  const [isRatingAccordionOpen, setIsRatingAccordionOpen] = useState(false);
  const [isPriceAccordionOpen, setIsPriceAccordionOpen] = useState(false);

  useEffect(() => {
    getProducts();
  }, []);

  useEffect(() => {
    getProducts();
  }, [ProductType]);

  async function getProducts() {
    try {
      const response = await fetch(
        `https://fakestoreapi.com/products/category/${ProductType}`
      );
      const data = await response.json();
      setProducts(data);
      setOriginalProducts(data); // Store the original product list for reset
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setIsLoading(false); // Stop loading once products are fetched
    }
  }

  // Update products when any filter state changes
  useEffect(() => {
    let filteredProducts = [...originalProducts];

    // Apply rating filter if checked
    if (isFilterByRating) {
      filteredProducts.sort((a, b) => b.rating.rate - a.rating.rate);
    }

    // Apply price descending filter if checked
    if (isFilterByPrice) {
      filteredProducts.sort((a, b) => b.price - a.price);
    }

    // Apply price ascending filter if checked
    if (isFilterByPriceAscending) {
      filteredProducts.sort((a, b) => a.price - b.price);
    }

    // Filter products by price below 15
    if (isFilterByBelow50) {
      filteredProducts = filteredProducts.filter(
        (product) => product.price < 15
      );
    }

    // Filter products by price above 15
    if (isFilterByAbove50) {
      filteredProducts = filteredProducts.filter(
        (product) => product.price > 15
      );
    }

    // Filter products with rating > 3
    if (isFilterByRatingAbove3) {
      filteredProducts = filteredProducts.filter(
        (product) => product.rating.rate > 3
      );
    }

    // Filter products with rating <= 3
    if (isFilterByRatingBelow3) {
      filteredProducts = filteredProducts.filter(
        (product) => product.rating.rate <= 3
      );
    }

    setProducts(filteredProducts);
  }, [
    isFilterByRating,
    isFilterByPrice,
    isFilterByPriceAscending,
    isFilterByBelow50,
    isFilterByAbove50,
    isFilterByRatingAbove3,
    isFilterByRatingBelow3,
    originalProducts,
  ]);

  // Handlers for checkbox changes
  const handleRatingFilterChange = (e) => setIsFilterByRating(e.target.checked);
  const handlePriceFilterChange = (e) => setIsFilterByPrice(e.target.checked);
  const handlePriceFilterChangeAscending = (e) =>
    setIsFilterByPriceAscending(e.target.checked);
  const handleBelow50FilterChange = (e) =>
    setIsFilterByBelow50(e.target.checked);
  const handleAbove50FilterChange = (e) =>
    setIsFilterByAbove50(e.target.checked);
  const handleRatingAbove3FilterChange = (e) =>
    setIsFilterByRatingAbove3(e.target.checked); // Handler for new filter
  const handleRatingBelow3FilterChange = (e) =>
    setIsFilterByRatingBelow3(e.target.checked); // Handler for rating <= 3 filter

  const toggleRatingAccordion = () =>
    setIsRatingAccordionOpen(!isRatingAccordionOpen);
  const togglePriceAccordion = () =>
    setIsPriceAccordionOpen(!isPriceAccordionOpen);

  return (
    <div className="bg-gray-300">
      {/* <Header /> */}
      {isLoading ? (
        <div className="flex justify-center items-center h-screen">
          <p>Loading...</p>
          {/* You can replace this with a spinner if you want */}
        </div>
      ) : (
        <div className="lg:flex lg:justify-evenly xl:flex xl:justify-evenly 2xl:flex 2xl:justify-evenly ">
          <div className="AllFiltersSmallScreen block lg:hidden   border-black border-2 ">
            <div className="flex justify-evenly items-center text-xs  ">
              <span className="flex items-center text-xs font-semibold">
                Rating:{" "}
              </span>
              <div className="flex items-center my-2  bg-white p-1 rounded-lg">
                <input
                  type="checkbox"
                  id="filterByRating"
                  checked={isFilterByRating}
                  onChange={handleRatingFilterChange}
                  className="mr-2"
                />
                <label htmlFor="filterByRating" className="text-gray-700">
                  High to low
                </label>
              </div>
              <div className="flex items-center my-2  bg-white p-1 rounded-lg">
                <input
                  type="checkbox"
                  id="filterByRatingAbove3"
                  checked={isFilterByRatingAbove3}
                  onChange={handleRatingAbove3FilterChange}
                  className="mr-2"
                />
                <label htmlFor="filterByRatingAbove3" className="text-gray-700">
                  Above 3 star
                </label>
              </div>
              <div className="flex items-center my-2 bg-white p-1 rounded-lg">
                <input
                  type="checkbox"
                  id="filterByRatingBelow3"
                  checked={isFilterByRatingBelow3}
                  onChange={handleRatingBelow3FilterChange}
                  className="mr-2"
                />
                <label htmlFor="filterByRatingBelow3" className="text-gray-700">
                  3 and below star
                </label>
              </div>
            </div>
            <div className="flex justify-evenly  items-center text-xs">
              <span className="flex items-center text-xs font-semibold">
                Price:{" "}
              </span>

              <div className="flex items-center my-2 bg-white p-1 rounded-lg">
                <input
                  type="checkbox"
                  id="filterByPriceAscending"
                  checked={isFilterByPriceAscending}
                  onChange={handlePriceFilterChangeAscending}
                  className="mr-2"
                />
                <label
                  htmlFor="filterByPriceAscending"
                  className="text-gray-700"
                >
                  Low to high
                </label>
              </div>
              <div className="flex items-center my-2 bg-white p-1 rounded-lg">
                <input
                  type="checkbox"
                  id="filterByBelow50"
                  checked={isFilterByBelow50}
                  onChange={handleBelow50FilterChange}
                  className="mr-2"
                />
                <label htmlFor="filterByBelow50" className="text-gray-700">
                  Below $15
                </label>
              </div>
              <div className="flex items-center my-2 bg-white p-1 rounded-lg">
                <input
                  type="checkbox"
                  id="filterByAbove50"
                  checked={isFilterByAbove50}
                  onChange={handleAbove50FilterChange}
                  className="mr-2"
                />
                <label htmlFor="filterByAbove50" className="text-gray-700">
                  Above $15
                </label>
              </div>
            </div>
          </div>
          <div className="Allfilters md:ml-3 hidden lg:block ">
            <h2 className="font-bold text-xl">Refine by</h2>

            {/* Rating Accordion */}
            <div className="w-80 md:w-60 lg:w-56 2xl:w-72 overflow-hidden border border-gray-300 rounded-md mt-4">
              <button
                className="w-full text-left px-4 py-2 font-semibold bg-gray-200 border-b border-gray-300"
                onClick={toggleRatingAccordion}
              >
                Rating
              </button>
              {isRatingAccordionOpen && (
                <div className="px-4 py-2 bg-white">
                  <div className="flex items-center my-4">
                    <input
                      type="checkbox"
                      id="filterByRating"
                      checked={isFilterByRating}
                      onChange={handleRatingFilterChange}
                      className="mr-2"
                    />
                    <label htmlFor="filterByRating" className="text-gray-700">
                      High to low
                    </label>
                  </div>
                  <div className="flex items-center my-4">
                    <input
                      type="checkbox"
                      id="filterByRatingAbove3"
                      checked={isFilterByRatingAbove3}
                      onChange={handleRatingAbove3FilterChange}
                      className="mr-2"
                    />
                    <label
                      htmlFor="filterByRatingAbove3"
                      className="text-gray-700"
                    >
                      Above 3 star
                    </label>
                  </div>
                  <div className="flex items-center my-4">
                    <input
                      type="checkbox"
                      id="filterByRatingBelow3"
                      checked={isFilterByRatingBelow3}
                      onChange={handleRatingBelow3FilterChange}
                      className="mr-2"
                    />
                    <label
                      htmlFor="filterByRatingBelow3"
                      className="text-gray-700"
                    >
                      3 and below star
                    </label>
                  </div>
                </div>
              )}
            </div>

            {/* Price Accordion */}
            <div className="w-80 md:w-60 lg:w-56 2xl:w-72 overflow-hidden border border-gray-300 rounded-md mt-4">
              <button
                className="w-full text-left px-4 py-2 font-semibold bg-gray-200 border-b border-gray-300"
                onClick={togglePriceAccordion}
              >
                Price
              </button>
              {isPriceAccordionOpen && (
                <div className="px-4 py-2 bg-white">
                  <div className="flex items-center my-4">
                    <input
                      type="checkbox"
                      id="filterByPrice"
                      checked={isFilterByPrice}
                      onChange={handlePriceFilterChange}
                      className="mr-2"
                    />
                    <label htmlFor="filterByPrice" className="text-gray-700">
                      High to low
                    </label>
                  </div>
                  <div className="flex items-center my-4">
                    <input
                      type="checkbox"
                      id="filterByPriceAscending"
                      checked={isFilterByPriceAscending}
                      onChange={handlePriceFilterChangeAscending}
                      className="mr-2"
                    />
                    <label
                      htmlFor="filterByPriceAscending"
                      className="text-gray-700"
                    >
                      Low to high
                    </label>
                  </div>
                  <div className="flex items-center my-4">
                    <input
                      type="checkbox"
                      id="filterByBelow50"
                      checked={isFilterByBelow50}
                      onChange={handleBelow50FilterChange}
                      className="mr-2"
                    />
                    <label htmlFor="filterByBelow50" className="text-gray-700">
                      Below $15
                    </label>
                  </div>
                  <div className="flex items-center my-4">
                    <input
                      type="checkbox"
                      id="filterByAbove50"
                      checked={isFilterByAbove50}
                      onChange={handleAbove50FilterChange}
                      className="mr-2"
                    />
                    <label htmlFor="filterByAbove50" className="text-gray-700">
                      Above $15
                    </label>
                  </div>
                </div>
              )}
            </div>
          </div>
          {/* Display products */}
          <div className="flex justify-center ">
            <div className="grid  grid-cols-3 gap-4 sm:grid-cols-3 gap:3 md:gap-4 p-4">
              {products.map((d) => (
                <div
                  key={d.id}
                  className=" rounded-lg shadow-md overflow-hidden bg-white p-1 md:p-3 w-28 md:w-64 lg:w-80 h-64 md:h-auto lg:h-[500px]"
                >
                  <Link to={`/${RelativePath}/${d.id}`}>
                    <img
                      src={d.image}
                      alt={d.name}
                      className="w-36 h-40 md:w-80 md:h-96 object-cover rounded-sm"
                    />
                    <p className="text-xs font-semibold text-center">
                      {d.title.split(" ").slice(0, 5).join(" ")}
                    </p>
                    <div className="flex justify-center items-center ">
                      <div className="flex items-center justify-center bg-green-500 text-white text-xs font-semibold px-2 py-1 rounded my-2 w-fit">
                        <FaStar className="mr-1 text-xs" />
                        <span className="text-xs">
                          {d.rating?.rate || 0} / 5
                        </span>
                      </div>
                    </div>
                    <p className="text-gray-500 text-center text-xs">
                      ${d.price}
                    </p>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
//////////////////////////////////////////////////////implementation is done inn above code , now only responsive making
