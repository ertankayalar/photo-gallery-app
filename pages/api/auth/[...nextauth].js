import NextAuth from 'next-auth'
import Providers from 'next-auth/providers'
import axios from 'axios'
const options = {
  session: {
    jwt: true,
  },
  callbacks: {
    jwt: async (token, user) => {
      console.log('user', user)
      if (user) {
        token.jwt = user.jwt
        token.user = user.user
      }
      return Promise.resolve(token)
    },
    session: async (session, token) => {
      console.log('token', token)
      session.jwt = token.jwt
      session.user = token.user
      return Promise.resolve(session)
    },
  },
  // jwt: {
  //   signingKey: {
  //     kty: 'oct',
  //     kid: 'VPbYZCD5nyGzfcxbFCcL5YEFa4VHY8S8cjCtoU--gvY',
  //     alg: 'HS512',
  //     k: '6e0B0bvYEAAwmzo8dBoIhR8TQJRHUvNHpsUHq1Ku_3Q',
  //   },
  // },
  providers: [
    Providers.Credentials({
      //   credentials: {
      //     username: { label: 'Email', type: 'Email', placeholder: 'john smith' },
      //     password: { label: 'Password', type: 'password' },
      //   },
      authorize: async (credentials) => {
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
            //return user.data.user
            return {
              name: user.data.user.username,
              email: user.data.user.email,
              jwt: user.data.jwt,
              test: 'anan güzel mi',
            }
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
      // async authorize(credentials) {
      //   console.log(`authorizing...`)
      //   console.log(`credentials`, credentials)

      //   try {
      //     const user = await axios.post(
      //       `${process.env.NEXT_PUBLIC_API_URL}/auth/local`,
      //       {
      //         identifier: credentials.username,
      //         password: credentials.password,
      //       }
      //     )

      //     console.log(`user`, user)
      //     if (user.data) {
      //       return user.data
      //     } else {
      //       return null
      //     }
      //   } catch (error) {
      //     console.log(`HATA VAR`)
      //     const errorMessage =
      //       error.response.data.message[0].messages[0].message
      //     throw new Error(errorMessage)
      //   }
      // },
      database: process.env.NEXT_PUBLIC_DATABASE_URL,
      secret: process.env.SECRET,

      // callbacks: {
      //   jwt: async (token, user) => {
      //     console.log(`user-->`, user)
      //     if (user) {
      //       token.jwt = user.jwt
      //       token.user = user.user
      //     }
      //     return Promise.resolve(token)
      //   },
      //   session: async (session, user) => {
      //     console.log(`user----->`, user)
      //     session.jwt = user.jwt
      //     session.user = user.user
      //     console.log(`session.jwt`, session.jwt)
      //     return Promise.resolve(session)
      //   },
      //   // session: async (session, token) => {
      //   //   session.jwt = token.jwt
      //   //   session.user = token.user
      //   //   console.log(`session.jwt`, session.jwt)
      //   //   return Promise.resolve(session)
      //   // },
      // },
      pages: {
        signIn: '/login',
        error: '/login',
      },
    }),
  ],
}
export default (req, res) => NextAuth(req, res, options)
