import Link from "next/link";

export default function ProductNotFound() {
  return (
    <div className="container-custom py-24 text-center">
      <h1 className="text-2xl font-light mb-4">Producto no encontrado</h1>
      <p className="text-neutral-500 mb-6">
        El producto que buscas no existe o ya no está disponible.
      </p>
      <Link href="/catalogo" className="btn-secondary">
        Volver al catálogo
      </Link>
    </div>
  );
}








