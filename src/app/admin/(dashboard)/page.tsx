import { createClient } from "@/lib/supabase/server";
import Link from "next/link";

export default async function AdminDashboardPage() {
  const supabase = await createClient();
  
  // Obtener estadísticas
  const { count: productCount } = await supabase
    .from("products")
    .select("*", { count: "exact", head: true });

  const { count: categoryCount } = await supabase
    .from("categories")
    .select("*", { count: "exact", head: true });

  const { count: featuredCount } = await supabase
    .from("products")
    .select("*", { count: "exact", head: true })
    .eq("featured", true);

  const stats = [
    { name: "Total Productos", value: productCount || 0, href: "/admin/productos" },
    { name: "Categorías", value: categoryCount || 0, href: "/admin/categorias" },
    { name: "Destacados", value: featuredCount || 0, href: "/admin/productos" },
  ];

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-light">Dashboard</h1>
        <p className="text-neutral-500 mt-1">Bienvenido al panel de administración</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {stats.map((stat) => (
          <Link
            key={stat.name}
            href={stat.href}
            className="bg-white border border-neutral-200 p-6 hover:border-black transition-colors"
          >
            <p className="text-sm text-neutral-500">{stat.name}</p>
            <p className="text-3xl font-light mt-2">{stat.value}</p>
          </Link>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="bg-white border border-neutral-200 p-6">
        <h2 className="text-lg font-medium mb-4">Acciones rápidas</h2>
        <div className="flex flex-wrap gap-4">
          <Link
            href="/admin/productos/nuevo"
            className="btn-primary"
          >
            + Nuevo producto
          </Link>
          <Link
            href="/admin/categorias"
            className="btn-secondary"
          >
            Gestionar categorías
          </Link>
        </div>
      </div>

      {/* Help */}
      <div className="mt-8 p-6 bg-neutral-100 border border-neutral-200">
        <h3 className="font-medium mb-2">¿Necesitas ayuda?</h3>
        <p className="text-sm text-neutral-600">
          Desde este panel puedes gestionar todos los productos de tu tienda. 
          Usa el menú lateral para navegar entre las diferentes secciones.
        </p>
      </div>
    </div>
  );
}

