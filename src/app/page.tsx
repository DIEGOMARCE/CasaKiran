import Link from "next/link";
import Image from "next/image";
import { ProductGrid } from "@/components/products/ProductGrid";
import { siteConfig } from "@/lib/config";
import { createClient } from "@/lib/supabase/server";
import portadaImage from "@/images/portada.jpg";
import logoImage from "@/images/logocasakiran.jpg";

export default async function HomePage() {
  const supabase = await createClient();

  // Obtener productos destacados
  const { data: featuredProducts } = await supabase
    .from("products")
    .select("*")
    .eq("active", true)
    .eq("featured", true)
    .order("created_at", { ascending: false })
    .limit(4);

  // Obtener TODOS los productos activos
  const { data: allProducts } = await supabase
    .from("products")
    .select("*")
    .eq("active", true)
    .order("created_at", { ascending: false })
    .limit(12); // Limitar a 12 para no sobrecargar

  return (
    <div className="animate-fade-in">
      {/* Hero Section */}
      <section className="bg-stone-50 py-12 lg:py-20">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="w-16 h-16 lg:w-20 lg:h-20 rounded-full overflow-hidden shadow-lg border-2 border-white">
                <Image
                  src={logoImage}
                  alt="Logo Casa Kiran"
                  width={80}
                  height={80}
                  className="object-cover w-full h-full"
                  priority
                />
              </div>
              <h1 className="text-4xl lg:text-6xl font-light tracking-tight text-neutral-900">
                {siteConfig.name}
              </h1>
            </div>
            <p className="text-lg lg:text-xl text-neutral-600 mb-8 leading-relaxed">
              {siteConfig.tagline}. Velas artesanales elaboradas con ingredientes
              naturales para crear momentos especiales en tu hogar.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/catalogo" className="btn-primary">
                Ver catálogo
              </Link>
              <Link href="/nosotros" className="btn-secondary">
                Conoce más
              </Link>
            </div>
          </div>

          <div className="relative w-full max-w-6xl mx-auto rounded-2xl overflow-hidden shadow-2xl bg-neutral-200">
             <div className="relative aspect-[2.35/1] w-full">
                <Image
                    src={portadaImage}
                    alt="Portada Casa Kiran"
                    fill
                    className="object-cover hover:scale-105 transition-transform duration-1000"
                    priority
                    quality={100}
                    placeholder="blur"
                    sizes="(max-width: 1280px) 100vw, 1280px"
                />
             </div>
          </div>
        </div>
      </section>

      {/* Featured Products - Solo si existen */}
      {featuredProducts && featuredProducts.length > 0 && (
        <section className="container-custom py-12 lg:py-16">
          <div className="bg-gradient-to-br from-amber-50 to-orange-50 border-2 border-amber-200 rounded-2xl p-8 lg:p-12">
            <div className="flex items-center justify-center gap-2 mb-6">
              <svg className="w-6 h-6 text-amber-500" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              <h2 className="text-2xl lg:text-3xl font-light text-center">Productos Destacados</h2>
              <svg className="w-6 h-6 text-amber-500" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            </div>
            <p className="text-center text-neutral-600 mb-8">Nuestras velas más populares y especiales</p>
            <ProductGrid products={featuredProducts} columns={4} />
          </div>
        </section>
      )}

      {/* All Products */}
      <section className="container-custom py-16 lg:py-24">
        <div className="flex items-end justify-between mb-8">
          <div>
            <h2 className="text-2xl lg:text-3xl font-light">Nuestros Productos</h2>
            <p className="text-neutral-500 mt-2">Explora nuestra colección completa</p>
          </div>
          <Link
            href="/catalogo"
            className="text-sm font-medium hover:underline hidden sm:block"
          >
            Ver catálogo completo →
          </Link>
        </div>

        {allProducts && allProducts.length > 0 ? (
          <>
            <ProductGrid products={allProducts} columns={4} />
            <div className="text-center mt-12">
              <Link href="/catalogo" className="btn-primary inline-flex items-center gap-2">
                Ver catálogo completo
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
            </div>
          </>
        ) : (
          <div className="text-center py-12 text-neutral-500">
            <svg className="w-16 h-16 text-neutral-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
            </svg>
            <p className="mb-4">Pronto habrá productos disponibles</p>
            <p className="text-sm text-neutral-400">Estamos preparando nuestra colección para ti</p>
          </div>
        )}
      </section>

      {/* Features */}
      <section className="bg-neutral-50 py-16 lg:py-24">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
            <div className="text-center">
              <div className="w-12 h-12 mx-auto mb-4 flex items-center justify-center">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                </svg>
              </div>
              <h3 className="text-lg font-medium mb-2">Artesanales</h3>
              <p className="text-sm text-neutral-600">
                Cada vela es elaborada a mano con dedicación y amor.
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 mx-auto mb-4 flex items-center justify-center">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-medium mb-2">Naturales</h3>
              <p className="text-sm text-neutral-600">
                Ingredientes de origen natural y ceras vegetales.
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 mx-auto mb-4 flex items-center justify-center">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
                </svg>
              </div>
              <h3 className="text-lg font-medium mb-2">Para regalar</h3>
              <p className="text-sm text-neutral-600">
                El regalo perfecto para cualquier ocasión especial.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="container-custom py-16 lg:py-24">
        <div className="bg-black text-white p-8 lg:p-12 text-center">
          <h2 className="text-2xl lg:text-3xl font-light mb-4">
            ¿Lista para iluminar tu espacio?
          </h2>
          <p className="text-neutral-300 mb-8 max-w-xl mx-auto">
            Explora nuestra colección completa y encuentra la vela perfecta para ti.
          </p>
          <Link
            href="/catalogo"
            className="inline-flex items-center justify-center px-8 py-3 bg-white text-black font-medium hover:bg-neutral-100 transition-colors"
          >
            Explorar catálogo
          </Link>
        </div>
      </section>
    </div>
  );
}
