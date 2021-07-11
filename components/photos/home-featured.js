import React from "react";
import PhotoCard from "./photo-card";

const HomeFeatured = ({ collections }) => {
  return (
    <div className="w-full py-10 text-center">
      <h2 className="my-3 text-xl text-gray-600 md:text-3xl">
        Featured Collections
      </h2>
      <div className="grid w-full grid-cols-2 gap-4 px-1 py-2">
        {collections.map((collection) => (
          <PhotoCard data={collection} key={collection.url} />
        ))}
      </div>
    </div>
  );
};

export default HomeFeatured;
