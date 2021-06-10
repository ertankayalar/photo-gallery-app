import { getSession, signIn } from 'next-auth/client'
import axios from 'axios'

async function handler(req, res) {
  // method is correct
  if (req.method !== 'PUT') {
    return
  }

  // is authenticated
  const session = await getSession({ req: req })

  if (!session) {
    res.status(401).json({ message: 'Not authenticated!' })
    return
  }

  // req içine olması gerekiyor
  const Firstname = req.body.Firstname
  const Lastname = req.body.Lastname
  const userId = session.user.id
  const Institution = req.body.Institution
  const Biography = req.body.Biography

  // if ok

  try {
    const result = await axios.put(
      `${process.env.API_URL}/users/${userId}`,
      {
        Firstname: Firstname,
        Lastname: Lastname,
        Institution: Institution,
        Biography: Biography,
      },
      {
        headers: {
          Authorization: `Bearer ${session.jwt}`,
        },
      }
    )

    if ((result.status = 200)) {
      res.status(200).json({ message: 'Profile updated!' })
    } else {
      res.status(result.status).json({ message: result.error })
    }
  } catch (error) {
    res.status(result.status).json({ message: result.statusText })
  }
}

export default handler
