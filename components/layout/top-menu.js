import Link from "next/link";
export default function TopMenu({ menuItems }) {
  return (
    <nav className="flex flex-wrap items-center justify-center h-auto p-0 ml-5 text-gray-700 bg-gray-100 md:ml-0 md:justify-center md:space-x-4 md:h-14">
      {menuItems.map(({ href, label }) => (
        <Link key={`${href}${label}`} href={href}>
          <a className="w-full px-1 py-2 text-left md:py-1 font-header md:w-auto hover:underline">
            {label}
          </a>
        </Link>
      ))}
    </nav>
  );
}
