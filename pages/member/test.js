import React from "react";
import * as utils from "../../lib/utils";
import axios from "axios";

const Test = () => {
  console.clear();
  async function saveCollection() {
    // [
    //   {
    //     _id: "6112a9cce9aeae21506308cd",
    //     name: "yeni etiket 6",
    //     slug: "yeni-etiket-6",
    //   },
    //   {
    //     _id: "6112aa60e9aeae21506308ce",
    //     name: "yeni etiket 7",
    //     slug: "yeni-etiket-7",
    //   },
    //   {
    //     _id: "6113e876ac5829368dd4e0e5",
    //     name: "yeni 50",
    //     slug: "yeni-50",
    //   },
    // ],

    const tagData = [
      {
        value: "6112a9cce9aeae21506308cd",
        label: "yeni etiket 6",
      },
      {
        value: "6112aa60e9aeae21506308ce",
        label: "yeni etiket 7",
      },
      {
        value: "6113e876ac5829368dd4e0e5",
        label: "yeni 50",
      },
      {
        label: "baklava",
        __isNew__: true,
      },
      {
        label: "şöbiyet",
        __isNew__: true,
      },
    ];

    const data = {
      id: "60a65baea5e80f9ccd09c6e1",
      name: "test COLLECTION",
      description: "dddd",
      category: {
        _id: "60b355e40fbc0a69a3d4ac7c",
        name: "alt kategori seviye 2",
      },
      tags: tagData,
    };

    const result = await axios.post("/api/collection/update", data, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    // redirect to view

    utils.showData("Collection Form Result", result);
  }

  saveCollection();

  return <div>hello world</div>;
};

export default Test;
