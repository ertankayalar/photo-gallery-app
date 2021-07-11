import BreadcrumItem from "./breadcrumb-item";
export default function Breadcrumb({ breadcrumbs }) {
  return (
    <nav
      className="px-2 my-3 text-xs font-semibold text-gray-600 lg:text-sm md:px-0"
      aria-label="Breadcrumb"
    >
      <ol className="inline-flex p-0 list-none">
        {breadcrumbs.map((item) => (
          <BreadcrumItem item={item} key={item.url} />
        ))}
      </ol>
    </nav>
  );
}
