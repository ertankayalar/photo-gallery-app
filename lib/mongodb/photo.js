import { connectToDatabase } from "./db";

export async function getAllPublishedCollections() {
  const client = await connectToDatabase();
  const pipeline = [
    {
      $match: {
        published_at: {
          $ne: null,
        },
      },
    },
    {
      $project: {
        _id: 0,
        name: 1,
        description: 1,
        slug: 1,
      },
    },
  ];

  const collections = await client
    .db()
    .collection("photo_collections")
    .aggregate(pipeline)
    .toArray();

  // console.log('collections', collections)
  client.close();
  return collections;
}

export async function getCollection(slug) {
  const client = await connectToDatabase();
  const pipeline = [
    {
      $match: {
        slug: slug,
      },
    },
    {
      $lookup: {
        from: "tags",
        localField: "tags",
        foreignField: "_id",
        as: "tags",
      },
    },
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
        as: "user",
      },
    },
    {
      $project: {
        _id: 0,
        name: 1,
        description: 1,
        featured: 1,
        slug: 1,
        user: {
          username: 1,
          Firstname: 1,
          Lastname: 1,
        },
        category: {
          name: 1,
          description: 1,
          slug: 1,
        },
        tags: {
          name: 1,
          slug: 1,
        },
      },
    },
  ];

  const collection = await client
    .db()
    .collection("photo_collections")
    .aggregate(pipeline)
    .toArray();

  client.close();
  return collection[0];
}

export async function getCollectionPhotos(slug) {
  const client = await connectToDatabase();
  const pipeline = [
    {
      $lookup: {
        from: "photo_collections",
        localField: "collection_id",
        foreignField: "_id",
        as: "photocollection",
      },
    },
    {
      $lookup: {
        from: "upload_file",
        localField: "photo",
        foreignField: "_id",
        as: "files",
      },
    },
    {
      $match: {
        "photocollection.slug": slug,
        published_at: {
          $ne: null,
        },
      },
    },
    {
      $project: {
        _id: 0,
        caption: 1,
        description: 1,
        featured: 1,

        files: {
          formats: 1,
          height: 1,
          width: 1,
          url: 1,
        },
      },
    },
  ];

  const collectionPhotos = await client
    .db()
    .collection("photos")
    .aggregate(pipeline)
    .toArray();

  client.close();
  return collectionPhotos;
}

export async function getCollectionTest(slug) {
  const client = await connectToDatabase();

  const pipeline = [
    { $match: { slug: slug } },
    {
      $lookup: {
        from: "photos",
        localField: "_id",
        foreignField: "collection_id",
        as: "photos",
      },
    },
  ];

  let collection = {};
  collection.photos = [];
  const collectionsRes = await client
    .db()
    .collection("photo_collections")
    .aggregate(pipeline);

  await collectionsRes.forEach((doc) => {
    //console.log(`doc`, doc)
    collection.id = doc._id.toString();
    collection.name = doc.name;
    collection.description = doc.description;
    collection.published_at = doc.published_at.toString();
    doc.photos.forEach((photo) => {
      collection.photos.push({
        caption: photo.caption,
        description: photo.description,
      });
    });
  });
  console.log(`collection1`, collection);
  //console.log(`collectionsRes`, collectionsRes)

  client.close();
  return collection;
}
