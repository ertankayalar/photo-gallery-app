import { connectToDatabase } from "./db";

export async function getCategory(slug) {
  const client = await connectToDatabase();
  const categoryCollection = client.db().collection("categories");
  const query = {
    published_at: { $ne: null },
    slug: { $eq: slug },
  };
  const options = {
    projection: {
      _id: 0,
      name: 1,
      description: 1,
      slug: 1,
    },
  };

  const category = await categoryCollection.find(query, options).toArray();

  client.close();
  return category[0];
}

export async function getCategories() {
  const client = await connectToDatabase();
  const categoryCollections = client.db().collection("categories");

  const query = {
    published_at: { $ne: null },
    parent: { $eq: null },
  };
  const options = {
    projection: {
      _id: 0,
      name: 1,
      description: 2,
      slug: 3,
    },
  };
  const category = await categoryCollections.find(query, options).toArray();

  client.close();
  return category;
}

export async function getTopCategories() {
  const client = await connectToDatabase();
  const categoryCollections = client.db().collection("categories");

  const query = {
    published_at: { $ne: null },
    parent: { $eq: null },
  };
  const options = {
    projection: {
      _id: 0,
      name: 1,
      description: 2,
      slug: 3,
    },
  };
  const category = await categoryCollections.find(query, options).toArray();

  let categories = [];
  category.forEach((item) => {
    categories.push({
      name: item.name,
      description: item.description != null ? item.description : "",
      slug: item.slug,
      url: `/category/${item.slug}`,
      photos: [],
    });
  });

  client.close();
  return categories;
}

export async function getMainCategoryCollections() {
  const client = await connectToDatabase();
  const categoryCollections = client.db().collection("categories");

  const query = {
    published_at: { $ne: null },
    parent: { $eq: null },
  };
  const options = {
    projection: {
      _id: 1,
      name: 2,
      slug: 3,
    },
  };
  const category = await categoryCollections.find(query, options);
  const cats = await category.toArray();
  client.close();
  return cats;
}

/**
 *  Get All Collections of Category
 */
export async function getCategoryCollections(slug, limit = null, skip = 0) {
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
        "category.slug": slug,
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
    .aggregate(pipeline)
    .toArray();

  await collectionRes.forEach((item) => {
    const photos = item.photos.map((photo, index) => {
      return {
        caption: photo.caption,
        description: photo?.description,
        formats: item.files[index].formats,
      };
    });

    collection.push({
      name: item.name,
      description: item?.description,
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

export async function getCategoryCollectionCount(slug) {
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
        "category.slug": slug,
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
      $count: "id",
    },
  ];

  const countRes = await client
    .db()
    .collection("photo_collections")
    .aggregate(pipeline)
    .toArray();

  console.log(`countRes`, countRes);
  console.log(`count`, countRes[0].id);
  return countRes[0].id;
}

/**
 * get Sub Categories of Parent Category Slug
 * @param {parentCategorySlug} slug
 * @returns
 */
export async function getSubCategories(slug) {
  const client = await connectToDatabase();

  const pipeline = [
    {
      $lookup: {
        from: "categories",
        localField: "parent",
        foreignField: "_id",
        as: "MainCategory",
      },
    },
    {
      $match: {
        parent: {
          $ne: null,
        },
        "MainCategory.slug": slug,
      },
    },
    {
      $sort: {
        name: 1,
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

  const categoryRes = await client
    .db()
    .collection("categories")
    .aggregate(pipeline)
    .toArray();

  const subCategories = categoryRes.map((category) => {
    return {
      name: category.name,
      description: category.description != null ? category.description : "",
      url: `/category/${category.slug}`,
      slug: category.slug,
      photos: [],
    };
  });
  client.close();
  return subCategories;
}
