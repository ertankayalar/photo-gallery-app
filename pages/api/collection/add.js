// Add User Collection
import { getSession } from "next-auth/client";
import axios from "axios";
import slugify from "slugify";

/**
 * Add User Collection
 * @param {*} req
 * @param {*} res
 * @returns
 */

// don't add id field
// add user  id

async function handler(req, res) {
  if (req.method !== "POST") {
    return;
  }

  // is authenticated
  const session = await getSession({ req: req });

  if (!session) {
    res.status(401).json({ message: "Not authenticated!" });
    return;
  }

  // add new tags first
  // req.body.newTags
  const result = await axios.post(
    `${process.env.API_URL}/collections`,
    {
      name: req.body.name,
      description: req.body.description,
      category: req.body.category,
      tags: req.body.tags,
      slug: slugify(req.body.name, { lower: true, strict: true }),
      user: session.user.id,
    },
    {
      headers: {
        Authorization: `Bearer ${session.jwt}`,
      },
    }
  );

  if (result.status == 200) {
    res
      .status(200)
      .json({ status_message: "Collection added", ...result.data });
  } else {
    res.status(result.status).json({ message: result.error });
  }
}

export default handler;
