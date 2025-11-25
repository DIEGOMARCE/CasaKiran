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

      {/* Featured Products */}
      <section className="container-custom py-16 lg:py-24">
        <div className="flex items-end justify-between mb-8">
          <div>
            <h2 className="text-2xl lg:text-3xl font-light">Productos destacados</h2>
            <p className="text-neutral-500 mt-2">Nuestras velas más populares</p>
          </div>
          <Link
            href="/catalogo"
            className="text-sm font-medium hover:underline hidden sm:block"
          >
            Ver todo →
          </Link>
        </div>
        
        {featuredProducts && featuredProducts.length > 0 ? (
          <ProductGrid products={featuredProducts} columns={4} />
        ) : (
          <div className="text-center py-12 text-neutral-500">
            <p>Pronto habrá productos destacados disponibles.</p>
          </div>
        )}
        
        <div className="text-center mt-8 sm:hidden">
          <Link href="/catalogo" className="btn-secondary">
            Ver todo el catálogo
          </Link>
        </div>
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
