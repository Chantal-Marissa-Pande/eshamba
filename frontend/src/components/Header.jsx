import React from "react";

function Header({ user, onLogout }) {
  return (
    <header className="bg-green-700 text-white p-4 flex justify-between items-center rounded-md shadow">
      <h1 className="text-3xl font-bold flex items-center gap-2">
        🌱 E-Shamba
      </h1>
      {user && (
        <button
          onClick={onLogout}
          className="bg-yellow-500 text-brown-900 px-4 py-2 rounded hover:bg-yellow-600"
        >
          Logout
        </button>
      )}
    </header>
  );
}

export default Header;
