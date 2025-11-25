import { Metadata } from "next";
import { siteConfig } from "@/lib/config";

export const metadata: Metadata = {
  title: "Nosotros | Casa Kiran",
  description: "Conoce la historia detrás de Casa Kiran y nuestra pasión por las velas artesanales.",
};

export default function NosotrosPage() {
  return (
    <div className="animate-fade-in">
      {/* Header */}
      <section className="bg-neutral-100 py-12 lg:py-16">
        <div className="container-custom">
          <h1 className="text-3xl lg:text-4xl font-light">Nosotros</h1>
          <p className="text-neutral-600 mt-2">
            Conoce nuestra historia
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="container-custom py-12 lg:py-16">
        <div className="max-w-3xl mx-auto">
          <div className="prose prose-neutral max-w-none">
            <h2 className="text-2xl font-light mb-6">Nuestra Historia</h2>
            <p className="text-neutral-600 leading-relaxed mb-6">
              {siteConfig.name} nació de la pasión por crear ambientes únicos y acogedores. 
              Cada vela que elaboramos es el resultado de dedicación, creatividad y el deseo 
              de llevar momentos especiales a tu hogar.
            </p>
            <p className="text-neutral-600 leading-relaxed mb-6">
              Comenzamos este proyecto con la idea de ofrecer productos artesanales de alta 
              calidad, elaborados con ingredientes naturales y fragancias cuidadosamente 
              seleccionadas. Creemos que una vela puede transformar cualquier espacio y 
              crear la atmósfera perfecta para cada momento.
            </p>

            <h2 className="text-2xl font-light mb-6 mt-12">Nuestros Valores</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 not-prose">
              <div className="border border-neutral-200 p-6">
                <h3 className="font-medium mb-2">Calidad Artesanal</h3>
                <p className="text-sm text-neutral-600">
                  Cada vela es elaborada a mano con atención al detalle y los mejores materiales.
                </p>
              </div>
              <div className="border border-neutral-200 p-6">
                <h3 className="font-medium mb-2">Ingredientes Naturales</h3>
                <p className="text-sm text-neutral-600">
                  Utilizamos ceras vegetales y aceites esenciales de origen natural.
                </p>
              </div>
              <div className="border border-neutral-200 p-6">
                <h3 className="font-medium mb-2">Sustentabilidad</h3>
                <p className="text-sm text-neutral-600">
                  Nos preocupamos por el medio ambiente en cada paso de nuestro proceso.
                </p>
              </div>
              <div className="border border-neutral-200 p-6">
                <h3 className="font-medium mb-2">Pasión</h3>
                <p className="text-sm text-neutral-600">
                  Amamos lo que hacemos y eso se refleja en cada producto que creamos.
                </p>
              </div>
            </div>

            <h2 className="text-2xl font-light mb-6 mt-12">Nuestro Proceso</h2>
            <p className="text-neutral-600 leading-relaxed mb-6">
              Cada vela pasa por un proceso cuidadoso de elaboración. Desde la selección 
              de las materias primas hasta el empaque final, nos aseguramos de que cada 
              detalle sea perfecto. Trabajamos en pequeños lotes para garantizar la 
              calidad y frescura de nuestros productos.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-neutral-50 py-12 lg:py-16">
        <div className="container-custom text-center">
          <h2 className="text-2xl font-light mb-4">¿Tienes alguna pregunta?</h2>
          <p className="text-neutral-600 mb-6">
            Nos encantaría saber de ti
          </p>
          <a href="/contacto" className="btn-primary">
            Contáctanos
          </a>
        </div>
      </section>
    </div>
  );
}

