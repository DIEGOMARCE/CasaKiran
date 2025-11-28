import { createClient } from "@/lib/supabase/server";
import Link from "next/link";
import Image from "next/image";
import { formatPrice } from "@/lib/config";
import { DeleteProductButton } from "./DeleteProductButton";

interface ProductWithCategory {
  id: string;
  name: string;
  description: string;
  price: number;
  image_url: string;
  category_id: string;
  stock: number;
  featured: boolean;
  active: boolean;
  created_at: string;
  updated_at: string;
  category: { name: string } | null;
}

export default async function ProductsPage() {
  const supabase = await createClient();
  
  const { data, error } = await supabase
    .from("products")
    .select(`
      *,
      category:categories(name)
    `)
    .order("created_at", { ascending: false });

  const products = data as ProductWithCategory[] | null;

  if (error) {
    console.error("Error fetching products:", error);
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-light">Productos</h1>
          <p className="text-neutral-500 mt-1">Gestiona tu catálogo de productos</p>
        </div>
        <Link href="/admin/productos/nuevo" className="btn-primary">
          + Nuevo producto
        </Link>
      </div>

      {/* Products Table */}
      <div className="bg-white border border-neutral-200 overflow-hidden">
        {!products || products.length === 0 ? (
          <div className="p-12 text-center">
            <svg className="w-16 h-16 text-neutral-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
            </svg>
            <p className="text-neutral-500 mb-4">No hay productos todavía</p>
            <Link href="/admin/productos/nuevo" className="btn-primary">
              Crear primer producto
            </Link>
          </div>
        ) : (
          <table className="w-full">
            <thead className="bg-neutral-50 border-b border-neutral-200">
              <tr>
                <th className="text-left text-xs font-medium text-neutral-500 uppercase tracking-wider px-6 py-3">
                  Producto
                </th>
                <th className="text-left text-xs font-medium text-neutral-500 uppercase tracking-wider px-6 py-3">
                  Categoría
                </th>
                <th className="text-left text-xs font-medium text-neutral-500 uppercase tracking-wider px-6 py-3">
                  Precio
                </th>
                <th className="text-left text-xs font-medium text-neutral-500 uppercase tracking-wider px-6 py-3">
                  Stock
                </th>
                <th className="text-left text-xs font-medium text-neutral-500 uppercase tracking-wider px-6 py-3">
                  Estado
                </th>
                <th className="text-right text-xs font-medium text-neutral-500 uppercase tracking-wider px-6 py-3">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-200">
              {products.map((product: ProductWithCategory) => (
                <tr key={product.id} className="hover:bg-neutral-50">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-neutral-100 flex-shrink-0 relative">
                        {product.image_url ? (
                          <Image
                            src={product.image_url}
                            alt={product.name}
                            fill
                            className="object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <svg className="w-6 h-6 text-neutral-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                          </div>
                        )}
                      </div>
                      <div>
                        <p className="font-medium">{product.name}</p>
                        {product.featured && (
                          <span className="text-xs text-neutral-500">Destacado</span>
                        )}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-neutral-600">
                    {product.category?.name || "Sin categoría"}
                  </td>
                  <td className="px-6 py-4 text-sm">
                    {formatPrice(product.price)}
                  </td>
                  <td className="px-6 py-4 text-sm">
                    <span className={product.stock <= 5 ? "text-red-600" : ""}>
                      {product.stock}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex items-center px-2 py-1 text-xs font-medium ${
                        product.active
                          ? "bg-green-100 text-green-800"
                          : "bg-neutral-100 text-neutral-600"
                      }`}
                    >
                      {product.active ? "Activo" : "Inactivo"}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Link
                        href={`/admin/productos/${product.id}`}
                        className="p-2 text-neutral-400 hover:text-black transition-colors"
                        title="Editar"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                      </Link>
                      <DeleteProductButton productId={product.id} productName={product.name} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
