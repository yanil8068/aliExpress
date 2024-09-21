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
  const [totalprice, setPrice] = useState(0);
  const [totalquantity, setTotalQuantity] = useState(0);

  const { carts } = useSelector((state) => state.allCart);
  const dispatch = useDispatch();

  // add to cart
  const handleIncrement = (e) => {
    dispatch(addToCart(e));
  };

  // remove to cart
  const handleDecrement = (e) => {
    dispatch(removeToCart(e));
    toast.success("Item Remove From Your Cart");
  };

  // remove single item
  const handleSingleDecrement = (e) => {
    dispatch(removeSingleIteams(e));
  };

  // empty cart
  const emptycart = () => {
    dispatch(emptycartIteam());
    toast.success("Your Cart is Empty");
  };

  // count total price
  const total = () => {
    let totalprice = 0;
    carts.map((ele, ind) => {
      totalprice = ele.price * ele.quantity + totalprice;
    });
    setPrice(totalprice);
  };

  // count total quantity
  const countquantity = () => {
    let totalquantity = 0;
    carts.map((ele, ind) => {
      totalquantity = ele.quantity + totalquantity;
    });
    setTotalQuantity(totalquantity);
  };

  useEffect(() => {
    total();
  }, [total]);

  useEffect(() => {
    countquantity();
  }, [countquantity]);

  // Calculate total price and total quantity
  // const totalPrice = carts.reduce(
  //   (total, item) => total + item.price * item.quantity,
  //   0
  // );
  // const totalQuantity = carts.reduce((total, item) => total + item.quantity, 0);

  return (
    // <div className="flex justify-center">
    //   <div className="w-96 md:w-full max-w-4xl mt-10 mb-10">
    //     <div className="bg-white shadow-md rounded-lg overflow-hidden">
    //       <div className="bg-gray-800 p-1 md:p-4 flex justify-between items-center">
    //         <h5 className="text-white text-lg font-semibold">
    //           Cart Calculation {carts.length > 0 ? `(${carts.length})` : ""}
    //         </h5>
    //         <button
    //           className="bg-red-500 hover:bg-red-600 text-white py-1 px-3 rounded text-sm"
    //           onClick={emptycart}
    //         >
    //           <i className="fas fa-trash-alt mr-2"></i>Empty Cart
    //         </button>
    //       </div>

    //       <div className="p-0 md:p-4">
    //         {carts.length === 0 ? (
    //           <table className="min-w-fit md:min-w-full text-center">
    //             <tbody>
    //               <tr>
    //                 <td colSpan={6}>
    //                   <div className="flex flex-col items-center text-gray-500">
    //                     <i className="fas fa-shopping-cart text-xs md:text-4xl"></i>
    //                     <p className="mt-4 text-xs md:text-xs">
    //                       Your Cart Is Empty
    //                     </p>
    //                   </div>
    //                 </td>
    //               </tr>
    //             </tbody>
    //           </table>
    //         ) : (
    //           <table className="min-w-fit md:min-w-full  table-auto mt-0 md:mt-4 ">
    //             <thead>
    //               <tr className="bg-gray-100">
    //                 <th className="px-1 py-0 md:px-4 md:py-2">Action</th>
    //                 <th className="px-1 py-0 md:px-4 md:py-2">Product</th>
    //                 <th className="px-1 py-0 md:px-4 md:py-2">Name</th>
    //                 <th className="px-1 py-0 md:px-4 md:py-2">Price</th>
    //                 <th className="px-1 py-0 md:px-4 md:py-2">Qty</th>
    //                 <th className="px-1 py-0 md:px-4 md:py-2 text-right">
    //                   Total Amount
    //                 </th>
    //               </tr>
    //             </thead>
    //             <tbody>
    //               {carts.map((item) => (
    //                 <tr key={item.id}>
    //                   <td className="px-1 py-1 md:px-4 md:py-2 ">
    //                     <button
    //                       className="text-red-600"
    //                       onClick={() => handleDecrement(item.id)}
    //                     >
    //                       <FaTrash />
    //                     </button>
    //                   </td>
    //                   <td className="px-1 py-1 md:px-4 md:py-2 ">
    //                     <div className="w-16 h-16 bg-gray-200">
    //                       <img
    //                         src={item.image}
    //                         alt={item.title}
    //                         className="w-full h-full object-cover"
    //                       />
    //                     </div>
    //                   </td>
    //                   <td className="px-1 py-1 md:px-4 md:py-2 ">
    //                     {item.title}
    //                   </td>
    //                   <td className="px-1 py-1 md:px-4 md:py-2 ">
    //                     ₹ {item.price}
    //                   </td>
    //                   <td className="px-1 py-1 md:px-4 md:py-2 ">
    //                     <div className="flex items-center space-x-2">
    //                       <button
    //                         className="bg-gray-200 text-gray-600 hover:bg-gray-300 px-2 py-1 rounded"
    //                         onClick={
    //                           item.quantity <= 1
    //                             ? () => handleDecrement(item.id)
    //                             : () => handleSingleDecrement(item)
    //                         }
    //                       >
    //                         <FaMinus />
    //                       </button>
    //                       <input
    //                         type="text"
    //                         value={item.quantity}
    //                         className="w-12 text-center bg-gray-100 border border-gray-300 rounded"
    //                         disabled
    //                       />
    //                       <button
    //                         className="bg-gray-200 text-gray-600 hover:bg-gray-300 px-2 py-1 rounded"
    //                         onClick={() => {
    //                           handleIncrement(item);
    //                         }}
    //                       >
    //                         <FaPlus />
    //                       </button>
    //                     </div>
    //                   </td>
    //                   <td className="px-1 py-1 md:px-4 md:py-2  text-right">
    //                     ₹ {item.quantity * item.price}
    //                   </td>
    //                 </tr>
    //               ))}
    //             </tbody>
    //             <tfoot>
    //               <tr>
    //                 <td colSpan={4}></td>
    //                 <td className="px-1 py-1 md:px-4 md:py-2  text-right font-semibold">
    //                   Items In Cart:
    //                   <span className="text-red-600 ml-2">{totalquantity}</span>
    //                 </td>
    //                 <td className="px-1 py-1 md:px-4 md:py-2  text-right font-semibold">
    //                   Total Price:
    //                   <span className="text-red-600 ml-2">₹ {totalprice}</span>
    //                 </td>
    //               </tr>
    //             </tfoot>
    //           </table>
    //         )}
    //       </div>
    //     </div>
    //   </div>
    // </div>
    <div className="flex justify-center">
      <div className="w-full md:max-w-4xl mt-10 mb-10">
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
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
