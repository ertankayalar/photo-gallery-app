import * as utils from "../utils";
import axios from "axios";

export async function addNewTags(postedTags) {
  let saveTagIds = postedTags.selected;
  const newTags = postedTags.new;

  newTags.forEach(async (newTag) => {
    const result = await axios.post("/api/tag/add", newTag, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (result.status == 200) {
      utils.showData(`newTag ${newTag.label} result.data`, result.data);
      saveTagIds.push(result.data._id.toString());
      utils.showData("saveTagIds :", saveTagIds);
    } else {
      result.status(result.status).json({ message: result.error });
    }
  });

  return saveTagIds;
}
