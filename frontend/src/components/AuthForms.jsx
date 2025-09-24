import React from "react";

function AuthForms({ form, onChange, onRegister, onLogin }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
      {/* Register */}
      <div className="bg-white p-6 rounded-lg shadow border border-green-200">
        <h2 className="text-2xl font-semibold mb-4 text-green-700">Register</h2>
        <form onSubmit={onRegister} className="flex flex-col gap-3">
          <input type="text" name="username" placeholder="Username" value={form.username} onChange={onChange} className="border rounded px-3 py-2" required />
          <input type="email" name="email" placeholder="Email" value={form.email} onChange={onChange} className="border rounded px-3 py-2" required />
          <input type="password" name="password" placeholder="Password" value={form.password} onChange={onChange} className="border rounded px-3 py-2" required />
          <input type="password" name="password2" placeholder="Confirm Password" value={form.password2} onChange={onChange} className="border rounded px-3 py-2" required />
          <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">Register</button>
        </form>
      </div>

      {/* Login */}
      <div className="bg-white p-6 rounded-lg shadow border border-green-200">
        <h2 className="text-2xl font-semibold mb-4 text-yellow-600">Login</h2>
        <form onSubmit={onLogin} className="flex flex-col gap-3">
          <input type="text" name="username" placeholder="Username" value={form.username} onChange={onChange} className="border rounded px-3 py-2" required />
          <input type="password" name="password" placeholder="Password" value={form.password} onChange={onChange} className="border rounded px-3 py-2" required />
          <button type="submit" className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600">Login</button>
        </form>
      </div>
    </div>
  );
}

export default AuthForms;
