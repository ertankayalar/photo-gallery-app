import {
  getCategory,
  getSubCategories,
  getCategoryCollections,
} from "../../../lib/mongodb/category";

async function handler(req, res) {
  if (req.method !== "GET") {
    return;
  }

  const slug = req.query.slug;
  const skip = req.query.skip;
  const limit = 4;
  const collections = await getCategoryCollections(slug, limit, skip);

  res.json(collections);
}

export default handler;
