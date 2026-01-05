import React from "react";

const Dashboard: React.FC = () => {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

      <div className="mb-6">
        <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
          Add Product
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-4 rounded shadow">
          <h2 className="font-bold mb-2">Products List</h2>
          {/* Table or cards showing all products */}
        </div>

        <div className="bg-white p-4 rounded shadow">
          <h2 className="font-bold mb-2">Payments</h2>
          {/* Table showing customer payments */}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
