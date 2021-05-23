import Link from 'next/link'
import { useSession, signOut } from 'next-auth/client'

function UserMenu() {
  const [session, loading] = useSession()

  function logoutHandler() {
    signOut()
  }

  return (
    <div>
      {!session && !loading && (
        <Link href='/register'>
          <a className='w-full text-left  py-2 md:py-1 px-1 font-header md:w-auto hover:underline'>
            Register
          </a>
        </Link>
      )}

      {!session && !loading && (
        <Link href='/login'>
          <a className='w-full text-left  py-2 md:py-1 px-1 font-header md:w-auto hover:underline'>
            Login
          </a>
        </Link>
      )}

      {session && (
        <Link href='/member/collections'>
          <a className='w-full text-left  py-2 md:py-1 px-1 font-header md:w-auto hover:underline'>
            My Collections
          </a>
        </Link>
      )}

      {session && (
        <Link href='/member/upload'>
          <a className='w-full text-left  py-2 md:py-1 px-1 font-header md:w-auto hover:underline'>
            Upload
          </a>
        </Link>
      )}

      {session && (
        <button
          onClick={logoutHandler}
          className='w-full text-left  py-2 md:py-1 px-1 font-header md:w-auto hover:underline'
        >
          Logout
        </button>
      )}
    </div>
  )
}

export default UserMenu
