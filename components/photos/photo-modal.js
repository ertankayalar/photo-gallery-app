import React, { useState, useEffect } from "react";
import Select from "react-dropdown-select";

function PhotoModal({ photos, photo, count, user, large, caption, onCancel }) {
  const [activeIndex, setActiveIndex] = useState(count);
  const [activePhoto, setActivePhoto] = useState(photos[activeIndex]);
  const { Firstname, Lastname } = user;
  const options = [
    {
      id: 0,
      name: "Download",
    },
    {
      id: 1,
      name: "Medium",
    },
    { id: 2, name: "Large" },
    { id: 3, name: "Original" },
  ];

  useEffect(() => {
    setActivePhoto(photos[activeIndex]);
  }, [activeIndex]);

  console.log(`photos`, photos);
  console.log(`activePhoto`, activePhoto);
  console.log(`active index`, activeIndex);
  console.log(`photos.length`, photos.length);

  function modalHandler(event) {
    event.preventDefault();
  }

  function closeHandler(event) {
    event.preventDefault();
    onCancel();
  }

  function nextHandler(event) {
    event.preventDefault();
    if (activeIndex < photos.length) {
      setActiveIndex(activeIndex + 1);
    }
    event.stopPropagation();
  }

  function prevHandler(event) {
    event.preventDefault();
    if (activeIndex > 0) {
      setActiveIndex(activeIndex - 1);
    }
    event.stopPropagation();
  }

  return (
    <div className="fixed top-0 left-0 z-40 flex w-screen h-screen opacity-100 ">
      <div className="z-40 w-full pt-3">
        <button
          className="absolute w-10 h-10 mr-5 text-white  hover:text-gray-400 right-1"
          onClick={closeHandler}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1}
              d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </button>
      </div>

      <div className="fixed top-0 left-0 z-40 flex justify-end w-1/6 h-4/5">
        <button
          className="fixed mr-5 text-white top-60 focus:outline-none disabled:opacity-40"
          onClick={prevHandler}
          disabled={activeIndex == 0}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-8 h-8"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>
      </div>

      <div
        className="fixed z-50 w-3/6 text-gray-600 bg-white rounded modal h-5/6 top-5"
        onClick={modalHandler}
      >
        <div className="flex w-full h-12 px-5 py-3">
          <div className="w-1/2">
            {Firstname && Firstname} {Lastname && Lastname}
          </div>
          <div className="w-1/2">
            {/* <Select
              options={options}
              values={[]}
              onChange={(value) => console.log(value)}
            /> */}
          </div>
        </div>
        <div className="flex items-center justify-center w-full p-2">
          <img src={activePhoto.files[0].formats.large.url} />
        </div>
        <div className="w-full py-5 text-center">
          <p className="text-2xl font-normal text-gray-700">
            {activePhoto.caption}
          </p>
          <p className="text-sm text-gray-500">{activePhoto.descripton}</p>
        </div>
      </div>

      <div className="fixed top-0 right-0 z-40 flex justify-start w-1/6 h-5/6">
        <button
          className="fixed ml-5 text-white top-60 focus:outline-none disabled:opacity-40"
          onClick={nextHandler}
          disabled={activeIndex == photos.length - 1}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-8 h-8"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}

export default PhotoModal;
