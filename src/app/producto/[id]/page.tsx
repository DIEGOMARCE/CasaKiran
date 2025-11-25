import { Metadata } from "next";
import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import { ProductDetail } from "./ProductDetail";

interface ProductPageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { id } = await params;
  const supabase = await createClient();
  
  const { data: product } = await supabase
    .from("products")
    .select("name, description")
    .eq("id", id)
    .eq("active", true)
    .single();

  if (!product) {
    return {
      title: "Producto no encontrado | Casa Kiran",
    };
  }

  return {
    title: `${product.name} | Casa Kiran`,
    description: product.description,
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { id } = await params;
  const supabase = await createClient();
  
  const { data: product, error } = await supabase
    .from("products")
    .select(`
      *,
      category:categories(id, name, slug)
    `)
    .eq("id", id)
    .eq("active", true)
    .single();

  if (error || !product) {
    notFound();
  }

  return <ProductDetail product={product} />;
}
