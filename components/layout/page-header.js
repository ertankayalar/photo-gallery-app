import Container from "./container";

export default function PageHeader({ title, description }) {
  return (
    <div className="w-full text-gray-600 bg-transparent">
      <Container className="text-center py-14">
        <h1 className="mb-3 text-4xl">{title}</h1>
        {description && <p className="text-gray-500 text-md">{description}</p>}
      </Container>
    </div>
  );
}
