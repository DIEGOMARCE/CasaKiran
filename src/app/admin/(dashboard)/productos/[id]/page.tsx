import { createClient } from "@/lib/supabase/server";
import { ProductForm } from "../ProductForm";
import { notFound } from "next/navigation";

interface EditProductPageProps {
  params: Promise<{ id: string }>;
}

export default async function EditProductPage({ params }: EditProductPageProps) {
  const { id } = await params;
  const supabase = await createClient();
  
  const { data: product, error } = await supabase
    .from("products")
    .select("*")
    .eq("id", id)
    .single();

  if (error || !product) {
    notFound();
  }

  const { data: categories } = await supabase
    .from("categories")
    .select("*")
    .order("name");

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-light">Editar Producto</h1>
        <p className="text-neutral-500 mt-1">Modifica la información del producto</p>
      </div>

      <ProductForm product={product} categories={categories || []} />
    </div>
  );
}





