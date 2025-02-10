import React, { useState } from "react";
import NewsList from "./NewsList";

const NewsPage = () => {
  const [selectedCategory, setSelectedCategory] = useState("technology");

  const categories = ["technology", "sports", "health", "business"]; // Example categories

  return (
    <div>

      <div className="flex justify-center mb-6 border-y border-red-800">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-4 py-2 rounded-none ${
              selectedCategory === category
                ? "bg-red-800 text-white"
                : "bg-white text-red-800"
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
