// Add User Collection
import { getSession } from "next-auth/client";
import axios from "axios";
import slugify from "slugify";
import * as utils from "../../../lib/utils";
import { buildTags } from "../../../lib/api/tag";

/**
 * Add User Collection
 * @param {*} req
 * @param {*} res
 * @returns
 */
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

  const tagData = await buildTags(req.body.tags);

  const result = await axios.post(
    `${process.env.API_URL}/collections`,
    {
      name: req.body.name,
      description: req.body.description,
      category: req.body.category,
      tags: tagData,
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
