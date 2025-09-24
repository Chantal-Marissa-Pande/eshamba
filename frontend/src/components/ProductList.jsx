import React from "react";

function ProductList({ products }) {
  return (
    <section className="mt-8">
      <h2 className="text-2xl font-semibold text-brown-700">📦 Products</h2>
      <ul className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {products.length > 0 ? (
          products.map((p) => (
            <li key={p.id} className="bg-white p-4 rounded-lg shadow flex justify-between border border-yellow-200">
              <span className="font-medium">{p.name}</span>
              <span className="text-green-700 font-semibold">Ksh {p.price}</span>
            </li>
          ))
        ) : (
          <p className="col-span-full text-gray-500">No products found.</p>
        )}
      </ul>
    </section>
  );
}

export default ProductList;
