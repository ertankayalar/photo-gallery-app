import '../styles/globals.css'
import { parseCookies } from 'nookies'

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />
}

function redirectUser(ctx, location) {
  if (ctx.req) {
    ctx.res.writeHead(302, { Location: location })
    ctx.res.end()
  } else {
    Router.push(location)
  }
}

MyApp.getInitialProps = async ({ Component, ctx }) => {
  const jwt = parseCookies(ctx).jwt

  if (!jwt) {
    if (ctx.pathname === '/member/upload') {
      redirectUser(ctx, '/login')
    }
  }

  return {}
}

export default MyApp
