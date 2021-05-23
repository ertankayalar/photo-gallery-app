import NextAuth from 'next-auth'
import Providers from 'next-auth/providers'
import axios from 'axios'

export default NextAuth({
  session: {
    jwt: true,
  },
  providers: [
    Providers.Credentials({
      //   credentials: {
      //     username: { label: 'Email', type: 'Email', placeholder: 'john smith' },
      //     password: { label: 'Password', type: 'password' },
      //   },

      async authorize(credentials) {
        console.log(`authorizing...`)
        console.log(`credentials`, credentials)

        try {
          const user = await axios.post(
            `${process.env.NEXT_PUBLIC_API_URL}/auth/local`,
            {
              identifier: credentials.username,
              password: credentials.password,
            }
          )

          console.log(`user`, user)
          if (user.data) {
            return user.data
          } else {
            return null
          }
        } catch (error) {
          console.log(`HATA VAR`)
          const errorMessage =
            error.response.data.message[0].messages[0].message
          throw new Error(errorMessage)
        }
      },
      database: process.env.NEXT_PUBLIC_DATABASE_URL,
      callbacks: {
        jwt: async (token, user) => {
          if (user) {
            token.jwt = user.jwt
            token.user = user.user
          }
          return Promise.resolve(token)
        },
        session: async (session, token) => {
          session.jwt = token.jwt
          session.user = token.user
          return Promise.resolve(session)
        },
      },
      pages: {
        signIn: '/login',
        error: '/login',
      },
    }),
  ],
})
