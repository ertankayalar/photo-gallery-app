import React from "react";
import Link from "next/link";

const PhotoCard = ({ data }) => {
  const { name, photos, url, owner, tags } = data;

  let mainPhoto = "";

  if (photos[0] != undefined) {
    mainPhoto = (
      <img src={photos[0]?.formats?.medium?.url} className="rounded-l" />
    );
  }

  let secondPhoto = "";

  if (photos[1] != undefined) {
    secondPhoto = photos[1]?.formats?.medium?.url;
  }

  let thirdPhoto = "";
  if (photos[2] != undefined) {
    thirdPhoto = photos[2]?.formats?.medium?.url;
  }

  return (
    <Link href={url}>
      <a>
        <div className="w-full">
          <div className="flex w-full ">
            <div
              className="w-3/4"
              style={{
                paddingRight: "2px",
              }}
            >
              {mainPhoto}
            </div>
            <div className="w-1/4">
              <div
                className="w-full h-1/2"
                style={{
                  paddingBottom: "2px",
                }}
              >
                <div
                  className="w-full h-full bg-center bg-no-repeat bg-cover rounded-tr"
                  style={{
                    backgroundImage: `url(${secondPhoto})`,
                  }}
                ></div>
              </div>

              <div className="w-full h-1/2">
                <div
                  className="h-full bg-center bg-no-repeat bg-cover rounded-br"
                  style={{
                    backgroundImage: `url(${thirdPhoto})`,
                  }}
                ></div>
              </div>
            </div>
          </div>
          <div className="py-2 w-4/4">
            <div className="w-full py-2 font-semibold">{name}</div>
            {/* {owner && (
              <div className='w-full mb-2 text-sm text-gray-700'>
                {owner?.Firstname} {owner?.Lastname}
              </div>
            )} */}
            <div className="w-full text-sm text-gray-600">
              {photos.length > 0 && (
                <span className="mr-2">{photos.length} photos</span>
              )}

              {tags?.map((tag) => (
                <Link href={`/tag/${tag.slug}`} key={tag.slug}>
                  <a className="px-2 py-1 mr-3 text-sm border rounded-sm shadow-sm hover:underline bg-gray-50">
                    {tag.name}
                  </a>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </a>
    </Link>
  );
};

export default PhotoCard;
