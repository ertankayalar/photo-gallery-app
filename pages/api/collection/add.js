// Add User Collection
import { getSession } from "next-auth/client";
import axios from "axios";
import slugify from "slugify";
import { splitTagItems } from "../../../lib/tag-utils";
import * as utils from "../../../lib/utils";

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

  // split tags selected and new
  // const postedTags = splitTagItems(req.body.tags);
  // let tags = postedTags.selected;
  // add new tags
  // if (postedTags.new.length) {
  //   postedTags.new.forEach(async (newTag) => {
  //     const newTagResult = await axios.post(`/api/tag/add`, {
  //       name: newTag.name,
  //     });
  //     if (newTagResult.status == 200) {
  //       utils.showData("newTagResult.data", newTagResult.data);
  //       tags.push(newTagResult.data._id);
  //     } else {
  //       newTagResult.status(result.status).json({ message: result.error });
  //     }
  //   });
  // }

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
