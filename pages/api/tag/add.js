// Add User Tag
import { getSession } from "next-auth/client";
import axios from "axios";
import slugify from "slugify";

async function handler(req, res) {
  if (req.method !== "POST") {
    return;
  }

  console.log("req.body", req.body);

  // is authenticated
  const session = await getSession({ req: req });

  if (!session) {
    res.status(401).json({ message: "Not authenticated!" });
    return;
  }

  const result = await axios.post(
    `${process.env.API_URL}/tags`,
    {
      name: req.body.label,
      slug: slugify(req.body.label, { lower: true, strict: true }),
    },
    {
      headers: {
        Authorization: `Bearer ${session.jwt}`,
      },
    }
  );

  if (result.status == 200) {
    res.status(200).json({ status_message: "Tags added", ...result.data });
    console.log("result.data of enw tag", result.data);
  } else {
    res.status(result.status).json({ message: result.error });
  }
}

export default handler;
