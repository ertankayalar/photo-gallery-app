// Update User Photo
import { getSession } from 'next-auth/client'
import axios from 'axios'

async function handler(req, res) {
  console.log(`req`, req)
  if (req.method !== 'PUT') {
    return
  }

  // is authenticated
  const session = await getSession({ req: req })

  if (!session) {
    res.status(401).json({ message: 'Not authenticated!' })
    return
  }

  // delete photo
  const result = await axios.put(
    `${process.env.API_URL}/photos/${req.body.id}`,
    {
      caption: req.body.caption,
      description: req.body.description,
      photo: req.body.photo_id,
      collection_id: req.body.collection_id,
    },
    {
      headers: {
        Authorization: `Bearer ${session.jwt}`,
      },
    }
  )
  // Result
  if (result.status == 200) {
    res.status(200).json({ status_message: 'Photo updated', ...result.data })
  } else {
    res.status(result.status).json({ message: result.error })
  }
}

export default handler
