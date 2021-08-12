import { connectToDatabase } from "./db";

export async function getTags() {}

/**
 * * Get Tag Collections
 * @param {tag.slug} slug
 */
export async function getTagCollections(slug, limit = null, skip = 0) {
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
        from: "tags",
        localField: "tags",
        foreignField: "_id",
        as: "taglist",
      },
    },
    {
      $match: {
        "taglist.slug": slug,
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
        taglist: 1,
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
      },
    },
    {
      $sort: {
        published_at: -1,
      },
    },
  ];

  if (skip > 0) {
    pipeline.push({
      $skip: +skip,
    });
  }

  if (limit != null) {
    pipeline.push({
      $limit: +limit,
    });
  }

  let collection = [];
  const collectionRes = await client
    .db()
    .collection("photo_collections")
    .aggregate(pipeline);

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
    });
  });

  // console.log('collection', collection)
  client.close();
  return collection;
}

export async function getTagCollectionsCount(slug) {
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
        from: "tags",
        localField: "tags",
        foreignField: "_id",
        as: "taglist",
      },
    },
    {
      $match: {
        "taglist.slug": slug,
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
        taglist: 1,
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
      },
    },
    {
      $sort: {
        published_at: -1,
      },
    },
    {
      $count: "id",
    },
  ];

  const countRes = await client
    .db()
    .collection("photo_collections")
    .aggregate(pipeline)
    .toArray();

  return countRes[0].id;
}

export async function getTag(slug) {
  const client = await connectToDatabase();
  const tagCollection = client.db().collection("tags");
  const query = {
    published_at: { $ne: null },
    slug: { $eq: slug },
  };
  const options = {
    projection: {
      _id: 0,
      name: 1,
      slug: 1,
    },
  };

  const tag = await tagCollection.find(query, options).toArray();

  client.close();
  return tag[0];
}

export async function getAllPublishedTags() {
  const pipeline = [
    {
      $project: {
        //  _id: false,
        //  label: "$name",
        //  value: "$_id",
        _id: 1,
        name: 1,
        published_at: 1,
      },
    },
    {
      $match: {
        published_at: {
          $ne: null,
        },
      },
    },
    {
      $sort: {
        name: -1,
      },
    },
  ];

  const client = await connectToDatabase();
  const resTags = await client
    .db()
    .collection("tags")
    .aggregate(pipeline)
    .toArray();
  client.close();
  return resTags;
}
