import { StorePage } from "@/components/store-page";

type CategoryPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return Object.keys(categoryNames).map((slug) => ({ slug }));
}

const categoryNames: Record<string, string> = {
  accessories: "Accessories",
  electronics: "Electronics",
  fashion: "Fashion",
  "home-living": "Home & Living",
};

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = await params;
  const categoryName =
    categoryNames[slug] ??
    slug
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");

  return (
    <StorePage
      title={categoryName}
      description={`Browse our ${categoryName.toLowerCase()} collection and find products selected for you.`}
      action={`Shop ${categoryName}`}
    />
  );
}
