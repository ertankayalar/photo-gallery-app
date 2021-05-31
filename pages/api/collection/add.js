// Add User Collection
import { getSession } from 'next-auth/client'
import axios from 'axios'

/**
 * Add User Collection
 * @param {*} req
 * @param {*} res
 * @returns
 */

// don't add id field
// add user  id

async function handler(req, res) {
  if (req.method !== 'POST') {
    return
  }

  // is authenticated
  const session = await getSession({ req: req })

  if (!session) {
    res.status(401).json({ message: 'Not authenticated!' })
    return
  }
  const result = await axios.post(
    `${process.env.API_URL}/collections`,
    {
      name: req.body.name,
      description: req.body.description,
      user: session.user.id,
    },
    {
      headers: {
        Authorization: `Bearer ${session.jwt}`,
      },
    }
  )

  if (result.status == 200) {
    res.status(200).json({ status_message: 'Collection added', ...result.data })
  } else {
    res.status(result.status).json({ message: result.error })
  }
}

export default handler
