<div className="max-w-3xl mx-auto mt-10">
  <h2 className="text-2xl font-semibold text-green-800 flex items-center mb-4">
    <span className="text-amber-600 mr-2">📦</span> My Products
  </h2>

  {products.length === 0 ? (
    <p className="text-gray-500 italic text-center">No products found.</p>
  ) : (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {products.map((product) => (
        <div key={product.id} className="border border-gray-200 rounded-xl p-4 shadow-sm hover:shadow-lg transition">
          <h3 className="text-lg font-medium text-green-700">{product.name}</h3>
          <p className="text-gray-600">💰 KSh {product.price}</p>
        </div>
      ))}
    </div>
  )}
</div>
