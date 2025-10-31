import React, { useEffect, useState } from "react";
import { getCart } from "../api";

function CartView() {
  const [cartItems, setCartItems] = useState([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    async function loadCart() {
      const data = await getCart();
      setCartItems(data);
      const totalCost = data.reduce((sum, item) => sum + parseFloat(item.total_price), 0);
      setTotal(totalCost);
    }
    loadCart();
  }, []);

  return (
    <div className="max-w-4xl mx-auto mt-10">
      <h2 className="text-2xl font-semibold text-green-800 mb-4">🛒 My Cart</h2>
      {cartItems.length === 0 ? (
        <p className="text-gray-500 italic">Your cart is empty.</p>
      ) : (
        <>
          <ul className="divide-y divide-gray-200">
            {cartItems.map((item) => (
              <li key={item.id} className="py-3 flex justify-between">
                <span>{item.product}</span>
                <span>KSh {item.total_price}</span>
              </li>
            ))}
          </ul>
          <p className="text-right font-semibold mt-4 text-green-700">
            Total: KSh {total.toFixed(2)}
          </p>
        </>
      )}
    </div>
  );
}

export default CartView;