import { createClient } from "@/lib/supabase/server";
import { ProductForm } from "../ProductForm";

export default async function NewProductPage() {
  const supabase = await createClient();
  
  const { data: categories } = await supabase
    .from("categories")
    .select("*")
    .order("name");

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-light">Nuevo Producto</h1>
        <p className="text-neutral-500 mt-1">Agrega un nuevo producto a tu catálogo</p>
      </div>

      <ProductForm categories={categories || []} />
    </div>
  );
}
