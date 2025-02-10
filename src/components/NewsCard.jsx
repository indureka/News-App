import React from "react";

const NewsCard = ({ title, image, description, link }) => {  // Default empty string for description
  // console.log(image, "Image URL passed to NewsCard");
   // Check if any of the required properties are null or undefined
   if (!title || !link) {
    return null; // If any of the essential props are missing, don't render the card
  }
  
  return (
    <div className="bg-white shadow-md rounded-none overflow-hidden hover:shadow-lg transition-shadow duration-300">
      {/* Image */}
      {image ? (


        <img
      
          src={image ? encodeURI(image) : '/placeholder-image.jpg'}
          alt={title}
          className="w-full h-48 object-cover"
        />
      ) : (
        <div className="w-full h-48 bg-gray-200 flex items-center justify-center">
          <span className="text-gray-500 text-sm">No Image Available</span>
        </div>
      )}

      {/* Content */}
      <div className="p-4">
        {/* Title */}
        <h2 className="text-lg font-normal text-gray-800 mb-2">
          {title}
        </h2>

        {/* Description */}
        <p className="text-sm text-gray-600 mb-4">
          {description && description.length > 120
            ? `${description.substring(0, 120)}...`
            : description || "No description available"}
        </p>

        {/* Link */}
        <a
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          className="text-red-800 hover:underline"
        >
          Read more
        </a>
      </div>
    </div>
  );
};

export default NewsCard;
