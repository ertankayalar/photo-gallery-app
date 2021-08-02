import Link from "next/link";
import { useSession, signOut } from "next-auth/client";

function UserMenu() {
  const [session, loading] = useSession();

  function logoutHandler() {
    signOut();
  }

  return (
    <div>
      {/* {!session && !loading && (
        <Link href='/register'>
          <a className='w-full px-1 py-2 text-left md:py-1 font-header md:w-auto hover:underline'>
            Register
          </a>
        </Link>
      )} */}

      {!session && !loading && (
        <Link href="/auth">
          <a className="w-full px-1 py-2 text-left md:py-1 font-header md:w-auto hover:underline">
            Sign in / Sign up
          </a>
        </Link>
      )}

      {session && (
        <Link href="/member/collections">
          <a className="w-full px-1 py-2 text-left md:py-1 font-header md:w-auto hover:underline">
            My Collections
          </a>
        </Link>
      )}

      {session && (
        <Link href="/member/profile">
          <a className="w-full px-1 py-2 text-left md:py-1 font-header md:w-auto hover:underline">
            My Profile
          </a>
        </Link>
      )}

      {session && (
        <button
          onClick={logoutHandler}
          className="w-full px-1 py-2 text-left md:py-1 font-header md:w-auto hover:underline"
        >
          Logout
        </button>
      )}
    </div>
  );
}

export default UserMenu;
