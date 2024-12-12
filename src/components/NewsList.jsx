import React from "react";
import NewsCard from "./NewsCard";

const NewsList = ({ newsItems }) => {
  if (!newsItems || newsItems.length === 0) {
    return (
      <div className="text-center text-gray-500">
        No news articles available.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {newsItems.map((news, index) => (
        <NewsCard
          key={index}
          title={news.title}
          image={news.image}
          description={news.description}
          link={news.link}
        />
      ))}
    </div>
  );
};

export default NewsList;
