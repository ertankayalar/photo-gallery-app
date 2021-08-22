// Update User Collection
import { getSession } from "next-auth/client";
import axios from "axios";
import { buildTags } from "../../../lib/api/tag";

async function handler(req, res) {
  if (req.method !== "POST") {
    return;
  }
  console.clear();

  // is authenticated
  const session = await getSession({ req: req });

  if (!session) {
    res.status(401).json({ message: "Not authenticated!" });
    return;
  }

  // add post
  console.log("Update to STRAPI: req.body.tags", req.body.tags);

  const tagData = await buildTags(req.body.tags);

  console.log("Update to STRAPI: tagData", tagData);

  const result = await axios.put(
    `${process.env.API_URL}/collections/${req.body.id}`,
    {
      name: req.body.name,
      description: req.body.description,
      category: req.body.category,
      tags: tagData,
      user: session.user.id,
    },
    {
      headers: {
        Authorization: `Bearer ${session.jwt}`,
      },
    }
  );
  //console.log("JWT", session.jwt);

  // console.log("result", result);
  if (result.status == 200) {
    res
      .status(200)
      .json({ status_message: "Collection updated", ...result.data });
  } else {
    res.status(result.status).json({ message: result.error });
  }
}

export default handler;
