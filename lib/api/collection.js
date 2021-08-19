import * as utils from "../utils";
import axios from "axios";

export async function buildTags(tags) {
  let tagData = [];

  await tags.reduce(async (memo, tag) => {
    await memo;
    console.log(tag.label);
    if (tag?.__isNew__) {
      const result = await axios.post("/api/tag/add", tag, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (result.status == 200) {
        tagData.push({
          _id: result.data._id,
          name: result.data.name,
        });
      }
    } else {
      tagData.push({
        _id: tag.value,
        name: tag.label,
      });
    }
  }, undefined);

  return tagData;
}

export async function buildTagsForPost(tags) {
  let tagData = [];

  async function checkTags(tag) {
    if (tag?.__isNew__) {
      const result = await addNewTag(tag);

      if (result.status == 200) {
        tagData.push({
          _id: result.data._id,
          name: result.data.name,
        });
      }
    } else {
      tagData.push({
        _id: tag.value,
        name: tag.label,
      });
    }
  }

  await tags.forEach((tag) => checkTags(tag));

  return tagData;
}

export async function addNewTag(data) {
  const result = await axios.post("/api/tag/add", data, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return result;
}

// const asyncForEach = async (array, callback) => {
//   for (let index = 0; index < array.length; index++) {
//     await callback(array[index], index, array);
//   }
// };

// const start = async () => {
//   await asyncForEach(tags, async (tag) => {
//     if (tag?.__isNew__) {
//       const result = addNewTag(tag);

//       if (result.status == 200) {
//         tagData.push({
//           _id: result.data._id,
//           name: result.data.name,
//         });
//       }
//     } else {
//       tagData.push({
//         _id: tag.value,
//         name: tag.label,
//       });
//     }
//   });
// };

// start();
