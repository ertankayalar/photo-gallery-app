//  add photo to strapi

async function handler(req, res) {
  const formData = new FormData()
  const caption = req.body.caption
  const description = req.body.description
  //const photo = req.body.photo

  console.log(`backend  caption`, caption)
  //formData.append()
}
