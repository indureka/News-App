import React, { useEffect } from "react";
import { useGlobalStateContext } from "../context/GlobalStateContext";
import NewsCard from "../components/NewsCard";
import CategorySelector from "../components/CategorySelector";
import Loader from "../components/Loader"; // Optional, for handling loading state
import { useNavigate } from "react-router-dom";
import NewsList from "../components/NewsList";
import { useAuthContext } from "../context/AuthContext";
import axios from "axios";
import NewsPage from "../components/NewsPage";

const HomePage = () => {
  const {
    preferences,
    newsData,
    loading,
    updatePreferences,
    setLoading, setNewsData,
   
  } = useGlobalStateContext();

  const { setError } = useAuthContext();

  const navigate = useNavigate();

  const handleSubscribeClick = () => {
    navigate("/dashboard#alert-form"); // Navigate to the dashboard with anchor
  };

  


  return (
    <div className="min-h-screen bg-white p-6">
      {/* Header */}
      <header className="mb-8">
  <h1 className="text-5xl font-normal text-center text-gray-900">
    Discover the Latest Updates with NewsTech!
  </h1>
  <div className="flex justify-center items-center mt-4">
    <p className="text-lg font-normal text-gray-600 mr-4">
      Subscribe to your favorite categories and stay updated instantly!
    </p>
    <button
      onClick={handleSubscribeClick}
      className="px-6 py-2 bg-red-800 text-white font-normal rounded-none hover:bg-red-900 transition-colors"
    >
      Subscribe Now
    </button>
  </div>
</header>
{/* 
      <section className="mb-6">
       <h2 className="text-xl font-semibold mb-2">Select News Categories:</h2>
        <CategorySelector onCategoryChange={handleCategoryChange} />
      </section> */}



      
      <section>
        {/* <h2 className="text-xl font-semibold mb-4">Latest News</h2> */}

        {loading ? (
          <Loader /> // Show loader while fetching news
        ) : (
        
            <div>
            <NewsPage/>
          
          </div>
        )}
      </section> 

      
    </div>
  );
};

export default HomePage;








