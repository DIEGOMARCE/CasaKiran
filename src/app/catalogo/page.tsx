import { Metadata } from "next";
import { ProductGrid } from "@/components/products/ProductGrid";
import { createClient } from "@/lib/supabase/server";

export const metadata: Metadata = {
  title: "Catálogo | Casa Kiran",
  description: "Explora nuestra colección completa de velas artesanales.",
};

interface CatalogoPageProps {
  searchParams: Promise<{ categoria?: string }>;
}

export default async function CatalogoPage({ searchParams }: CatalogoPageProps) {
  const params = await searchParams;
  const selectedCategory = params.categoria;
  
  const supabase = await createClient();

  // Obtener categorías
  const { data: categories } = await supabase
    .from("categories")
    .select("*")
    .order("name");

  // Obtener productos
  let query = supabase
    .from("products")
    .select(`
      *,
      category:categories(id, name, slug)
    `)
    .eq("active", true)
    .order("created_at", { ascending: false });

  // Filtrar por categoría si está seleccionada
  if (selectedCategory) {
    const category = categories?.find((c) => c.slug === selectedCategory);
    if (category) {
      query = query.eq("category_id", category.id);
    }
  }

  const { data: products } = await query;

  return (
    <div className="animate-fade-in">
      {/* Header */}
      <section className="bg-neutral-100 py-12 lg:py-16">
        <div className="container-custom">
          <h1 className="text-3xl lg:text-4xl font-light">Catálogo</h1>
          <p className="text-neutral-600 mt-2">
            Descubre nuestra colección de velas artesanales
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="container-custom py-8 lg:py-12">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar - Categories */}
          <aside className="lg:w-64 flex-shrink-0">
            <h2 className="text-sm font-medium uppercase tracking-wider mb-4">
              Categorías
            </h2>
            <ul className="space-y-2">
              <li>
                <a
                  href="/catalogo"
                  className={`block py-2 text-sm transition-colors ${
                    !selectedCategory
                      ? "text-black font-medium"
                      : "text-neutral-500 hover:text-black"
                  }`}
                >
                  Todas
                </a>
              </li>
              {categories?.map((category) => (
                <li key={category.id}>
                  <a
                    href={`/catalogo?categoria=${category.slug}`}
                    className={`block py-2 text-sm transition-colors ${
                      selectedCategory === category.slug
                        ? "text-black font-medium"
                        : "text-neutral-500 hover:text-black"
                    }`}
                  >
                    {category.name}
                  </a>
                </li>
              ))}
            </ul>
          </aside>

          {/* Products */}
          <div className="flex-grow">
            <div className="flex items-center justify-between mb-6">
              <p className="text-sm text-neutral-500">
                {products?.length || 0} producto{products?.length !== 1 ? "s" : ""}
              </p>
            </div>
            <ProductGrid products={products || []} columns={3} />
          </div>
        </div>
      </section>
    </div>
  );
}
