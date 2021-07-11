import { getTagCollections } from "../../../lib/mongodb/tags";

async function handler(req, res) {
  if (req.method !== "GET") {
    return;
  }

  const slug = req.query.slug;
  const skip = req.query.skip;
  const limit = 4;
  const collections = await getTagCollections(slug, limit, skip);

  res.json(collections);
}

export default handler;
