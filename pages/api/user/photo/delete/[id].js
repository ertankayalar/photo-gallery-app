// Delete User Photo
import { getSession } from 'next-auth/client'
import axios from 'axios'

async function handler(req, res) {
  console.log(`req`, req)
  if (req.method !== 'DELETE') {
    return
  }

  // is authenticated
  const session = await getSession({ req: req })

  if (!session) {
    res.status(401).json({ message: 'Not authenticated!' })
    return
  }

  // delete photo
  const result = await axios.delete(
    `${process.env.API_URL}/photos/${req.query.id}`,
    {
      headers: {
        Authorization: `Bearer ${session.jwt}`,
      },
    }
  )
  // Result
  if (result.status == 200) {
    res.status(200).json({ status_message: 'Photo deleted', ...result.data })
  } else {
    res.status(result.status).json({ message: result.error })
  }
}

export default handler
