import React, { useState } from "react";
import NewsList from "./NewsList";

const NewsPage = () => {
  const [selectedCategory, setSelectedCategory] = useState("technology");

  const categories = ["technology", "sports", "health", "business"]; // Example categories

  return (
    <div>
      <h1 className="text-center text-2xl font-bold mb-4">News</h1>
      <div className="flex justify-center space-x-4 mb-6">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-4 py-2 rounded ${
              selectedCategory === category
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-gray-800"
            }`}
          >
            {category.charAt(0).toUpperCase() + category.slice(1)}
          </button>
        ))}
      </div>
      <NewsList category={selectedCategory} />
    </div>
  );
};

export default NewsPage;
