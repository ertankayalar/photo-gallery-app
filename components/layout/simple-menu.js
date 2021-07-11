import Link from "next/link";
export default function SimpleMenu({ menuItems }) {
  return (
    <div>
      {menuItems.map(({ href, label }) => (
        <Link href={href} key={href}>
          <a className="mr-1 text-md hover:underline">{label}</a>
        </Link>
      ))}
    </div>
  );
}
