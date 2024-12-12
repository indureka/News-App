import React, { useEffect } from "react";
import { useGlobalStateContext } from "../context/GlobalStateContext";
import NewsCard from "../components/NewsCard";
import CategorySelector from "../components/CategorySelector";
import Loader from "../components/Loader"; // Optional, for handling loading state
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const {
    preferences,
    newsData,
    loading,
    updatePreferences,
    fetchNewsData,
  } = useGlobalStateContext();

  const navigate = useNavigate();

  const handleSubscribeClick = () => {
    navigate("/dashboard#alert-form"); // Navigate to the dashboard with anchor
  };

  useEffect(() => {
    // Fetch news when the component mounts or preferences change
    fetchNewsData();
  }, [preferences, fetchNewsData]);

  const handleCategoryChange = (newCategory) => {
    updatePreferences({ categories: [newCategory] });
  };

  const handleSubscribe = (category) => {
    const updatedCategories = [...preferences.categories, category];
    updatePreferences({ categories: updatedCategories });
    alert(`Subscribed to ${category}!`);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* Header */}
      <header className="mb-8">
  <h1 className="text-5xl font-extrabold text-center text-gray-800">
    Discover the Latest Updates with News App
  </h1>
  <div className="flex justify-center items-center mt-4">
    <p className="text-lg text-gray-600 mr-4">
      Subscribe to your favorite categories and stay updated instantly!
    </p>
    <button
      onClick={handleSubscribeClick}
      className="px-6 py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition-colors"
    >
      Subscribe Now
    </button>
  </div>
</header>

      <section className="mb-6">
       <h2 className="text-xl font-semibold mb-2">Select News Categories:</h2>
        <CategorySelector onCategoryChange={handleCategoryChange} />
      </section>



      {/* Latest News */}
      <section>
        <h2 className="text-xl font-semibold mb-4">Latest News</h2>

        {loading ? (
          <Loader /> // Show loader while fetching news
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {newsData.length > 0 ? (
              newsData.map((article, index) => (
                <NewsCard
                  key={article.id || `${article.link}-${index}`}
                  title={article.title}
                  image={article.urlToImage || "/placeholder-image.jpg"}
                  description={article.description || "No description available"}
                  link={article.url}
                  showSaveToFavorites={true} // Enables "Save to Favorites" button
                />
              ))
            ) : (
              <p>No news available for the selected category</p>
            )}
          </div>
        )}
      </section>
    </div>
  );
};

export default HomePage;








