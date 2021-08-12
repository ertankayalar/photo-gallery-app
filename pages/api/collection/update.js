// Update User Collection
import { getSession } from "next-auth/client";
import axios from "axios";

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

  // split tags selected and new
  // const postedTags = splitTagItems(req.body.tags);
  // let tags = postedTags.selected;
  // add new tags

  // add post
  const result = await axios.put(
    `${process.env.API_URL}/collections/${req.body.id}`,
    {
      name: req.body.name,
      description: req.body.description,
      category: req.body.category,
      tags: req.body.tags,
      user: session.user.id, // add yaparken lazım, burda chheck yapcccez
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
      .json({ status_message: "Collection updated", ...result.data });
  } else {
    res.status(result.status).json({ message: result.error });
  }
}

export default handler;
