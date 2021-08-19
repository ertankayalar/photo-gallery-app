import axios from "axios";

// export async function buildTags(tags) {
//   const tagData = tags.map(async (tag) => {
//     if (tag?.__isNew__) {
//       const result = await addNewTag(tag);
//       return {
//         _id: result.data._id,
//         name: result.data.name,
//       };
//     } else {
//       return {
//         _id: tag.value,
//         name: tag.label,
//       };
//     }
//   });
//   return Promise.all(tagData);
// }

export async function buildTags(tags) {
  const tagData = await Promise.all(
    tags.map(async (tag) => {
      if (tag?.__isNew__) {
        const result = await addNewTag(tag);
        return {
          _id: result.data._id,
          name: result.data.name,
        };
      } else {
        return {
          _id: tag.value,
          name: tag.label,
        };
      }
    })
  );

  return tagData;
}

export async function addNewTag(data) {
  const result = await axios.post(
    `${process.env.NEXTAUTH_URL}/api/tag/add`,
    data,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  console.log("add New Tag result is", result);
  return result;
}

// async function addNewTag(data) {
//   await fetch("/api/tag/add", {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify({
//       label: data.label,
//     }),
//   })
//     .then((response) => response.json())
//     .then((data) => console.log(data));
// }
