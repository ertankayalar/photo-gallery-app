import { connectToDatabase } from "./db";

export async function getFeaturedCollections() {
  const client = await connectToDatabase();
  const pipeline = [
    {
      $lookup: {
        from: "categories",
        localField: "category",
        foreignField: "_id",
        as: "category",
      },
    },
    {
      $lookup: {
        from: "users-permissions_user",
        localField: "user",
        foreignField: "_id",
        as: "owner",
      },
    },
    {
      $match: {
        featured: true,
      },
    },
    {
      $lookup: {
        from: "tags",
        localField: "tags",
        foreignField: "_id",
        as: "taglist",
      },
    },
    {
      $lookup: {
        from: "photos",
        localField: "_id",
        foreignField: "collection_id",
        as: "photos",
      },
    },
    {
      $lookup: {
        from: "upload_file",
        localField: "photos.photo",
        foreignField: "_id",
        as: "files",
      },
    },
    {
      $project: {
        published_at: 1,
        _id: 0,
        name: 1,
        description: 1,
        slug: 1,
        category: 1,
        photos: 1,
        files: 1,
        category: {
          name: 1,
          slug: 1,
          description: 1,
        },
        photos: {
          caption: 1,
          description: 1,
          featured: 1,
        },
        files: {
          url: 1,
          formats: 1,
        },
        taglist: {
          name: 1,
          slug: 1,
        },
        owner: {
          Firstname: 1,
          Lastname: 1,
        },
      },
    },
    {
      $sort: {
        published_at: -1,
      },
    },
  ];

  let collection = [];

  const collectionRes = await client
    .db()
    .collection("photo_collections")
    .aggregate(pipeline)
    .toArray();

  await collectionRes.forEach((item) => {
    const photos = item.photos.map((photo, index) => {
      return {
        caption: photo.caption,
        description: photo.description,
        formats: item.files[index].formats,
      };
    });

    collection.push({
      name: item.name,
      description: item.description,
      url: `/collection/${item.slug}`,
      photos: photos,
      category: item.category,
      tags: item.taglist,
      owner: item?.owner[0],
    });
  });

  // console.log('collection', collection)
  client.close();
  return collection;
}
