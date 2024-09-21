import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaPlus } from "react-icons/fa";
import { FaMinus } from "react-icons/fa";
import { FaTrash } from "react-icons/fa";
import { addToCart } from "../../Redux/features/cartSlice";
import { removeToCart } from "../../Redux/features/cartSlice";
import { removeSingleIteams } from "../../Redux/features/cartSlice";
import { emptycartIteam } from "../../Redux/features/cartSlice";
import toast from "react-hot-toast";

const CartComponent = () => {
  const [totalprice, setPrice] = useState(0); // State for storing total price of cart
  const [totalquantity, setTotalQuantity] = useState(0); // State for storing total quantity of items

  const { carts } = useSelector((state) => state.allCart); // Fetch the cart data from Redux store
  const dispatch = useDispatch();

  // Increment item quantity in cart
  const handleIncrement = (e) => {
    dispatch(addToCart(e)); // Dispatch add to cart action
  };

  // Decrement item quantity in cart
  const handleDecrement = (e) => {
    dispatch(removeToCart(e)); // Dispatch remove action for the item
    toast.success("Item Remove From Your Cart"); // Show success toast notification
  };

  // Remove a single item from the cart
  const handleSingleDecrement = (e) => {
    dispatch(removeSingleIteams(e)); // Dispatch action to remove a single item
  };

  // Empty the entire cart
  const emptycart = () => {
    dispatch(emptycartIteam());
    toast.success("Your Cart is Empty");
  };

  // Calculate the total price of the cart
  const total = () => {
    let totalprice = 0;
    carts.map((ele, ind) => {
      totalprice = ele.price * ele.quantity + totalprice; // Sum of price * quantity for each item
    });
    setPrice(totalprice); // Update the total price state
  };

  // Calculate the total quantity of items in the cart
  const countquantity = () => {
    let totalquantity = 0;
    carts.map((ele, ind) => {
      totalquantity = ele.quantity + totalquantity; // Sum of all quantities
    });
    setTotalQuantity(totalquantity); // Update the total quantity state
  };

  // Recalculate total price whenever `carts` is updated
  useEffect(() => {
    total();
  }, [total]);

  // Recalculate total quantity whenever `carts` is updated
  useEffect(() => {
    countquantity();
  }, [countquantity]);

  return (
    <div className="flex justify-center">
      <div className="w-full md:max-w-4xl mt-10 mb-10">
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          {/* Cart Header */}
          <div className="bg-gray-800 p-2 md:p-4 flex justify-between items-center">
            <h5 className="text-white text-lg font-semibold">
              Cart {carts.length > 0 ? `(${carts.length})` : ""}
            </h5>
            <button
              className="bg-red-500 hover:bg-red-600 text-white py-1 px-3 rounded text-sm"
              onClick={emptycart}
            >
              <FaTrash className="inline-block mr-2" />
              Empty Cart
            </button>
          </div>

          {/* Cart Body */}
          <div className="p-2 md:p-4 text-xs md:text-base">
            {carts.length === 0 ? (
              <div className="flex flex-col items-center text-xs md:text-base text-gray-500">
                <FaTrash className="text-2xl md:text-4xl" />
                <p className="mt-4 text-xs md:text-sm ">Your Cart Is Empty</p>
              </div>
            ) : (
              <table className="min-w-full table-auto text-center text-xs md:text-base">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="px-0 py-0 md:px-4 md:py-2 text-xs md:text-base">
                      Action
                    </th>
                    <th className="px-0 py-0 md:px-4 md:py-2 text-xs md:text-base">
                      Product
                    </th>
                    <th className="px-0 py-0 md:px-4 md:py-2 text-xs md:text-base">
                      Name
                    </th>
                    <th className="px-0 py-0 md:px-4 md:py-2 text-xs md:text-base">
                      Price
                    </th>
                    <th className="px-0 py-0 md:px-4 md:py-2 text-xs md:text-base">
                      Qty
                    </th>
                    <th className="px-0 py-0 md:px-4 md:py-2 text-right text-xs md:text-base">
                      Total
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {carts.map((item) => (
                    <tr key={item.id}>
                      <td className="px-1 py-0 md:px-4 md:py-2 text-xs md:text-base">
                        <button
                          className="text-red-600 text-xs md:text-base"
                          onClick={() => handleDecrement(item.id)}
                        >
                          <FaTrash />
                        </button>
                      </td>
                      <td className="px-1 py-0 md:px-4 md:py-2 text-xs md:text-base">
                        <div className="w-9 h-9 md:w-16 md:h-16 bg-gray-200 text-xs md:text-base">
                          <img
                            src={item.image}
                            alt={item.title}
                            className="w-9 md:w-full h-9 md:h-full object-cover text-xs md:text-base"
                          />
                        </div>
                      </td>
                      <td className="px-1 py-0 md:px-4 md:py-2 text-xs md:text-base">
                        {item.title.split(" ").slice(0, 3).join(" ")}
                      </td>
                      <td className="px-1 py-0 md:px-4 md:py-2 text-xs md:text-base">
                        ₹ {item.price}
                      </td>
                      <td className="px-1 py-0 md:px-4 md:py-2 text-xs md:text-base">
                        <div className="flex items-center justify-center space-x-2 text-xs md:text-base">
                          <button
                            className="bg-gray-200 text-gray-600 hover:bg-gray-300 px-2 py-1 rounded text-xs md:text-base"
                            onClick={
                              item.quantity <= 1
                                ? () => handleDecrement(item.id)
                                : () => handleSingleDecrement(item)
                            }
                          >
                            <FaMinus />
                          </button>
                          <input
                            type="text"
                            value={item.quantity}
                            className="w-8 text-center bg-gray-100 border border-gray-300 rounded text-xs md:text-base"
                            disabled
                          />
                          <button
                            className="bg-gray-200 text-gray-600 hover:bg-gray-300 px-2 py-1 rounded text-xs md:text-base"
                            onClick={() => handleIncrement(item)}
                          >
                            <FaPlus />
                          </button>
                        </div>
                      </td>
                      <td className="px-2 py-1 md:px-4 md:py-2 text-right text-xs md:text-base">
                        ₹ {item.quantity * item.price}
                      </td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr>
                    <td colSpan={4}></td>
                    <td className="px-2 py-1 md:px-4 md:py-2 text-right text-xs md:text-base font-semibold">
                      Items In Cart:
                      <span className="text-red-600 ml-2">{totalquantity}</span>
                    </td>
                    <td className="px-2 py-1 md:px-4 md:py-2 text-right text-xs md:text-base font-semibold">
                      Total Price:
                      <span className="text-red-600 ml-2">₹ {totalprice}</span>
                    </td>
                  </tr>
                </tfoot>
              </table>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartComponent;
