import { getSession, signIn } from 'next-auth/client'
import axios from 'axios'

async function handler(req, res) {
  // method is correct
  if (req.method !== 'POST') {
    return
  }

  // is authenticated
  const session = await getSession({ req: req })

  if (!session) {
    res.status(401).json({ message: 'Not authenticated!' })
    return
  }
  console.log(`change password api here`)

  // req içine olması gerekiyor
  const oldPassword = req.body.oldPassword
  const newPassword = req.body.newPassword
  const userId = req.body.userId

  // if ok
  const result = await axios.put(
    `${process.env.API_URL}/users/${userId}`,
    {
      password: newPassword,
    },
    {
      headers: {
        Authorization: `Bearer ${session.jwt}`,
      },
    }
  )
  console.log(`result`, result)

  if ((result.status = 200)) {
    res.status(200).json({ message: 'Password updated!' })
  } else {
    res.status(result.status).json({ message: result.error })
  }
}

export default handler
