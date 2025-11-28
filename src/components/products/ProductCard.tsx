"use client";

import Image from "next/image";
import Link from "next/link";
import { Product } from "@/types";
import { formatPrice } from "@/lib/config";
import { useCart } from "@/context/CartContext";
import { useState } from "react";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { addItem, setIsOpen } = useCart();
  const [isAdding, setIsAdding] = useState(false);

  // Validaciones para evitar errores
  if (!product || !product.id) {
    return null;
  }

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsAdding(true);
    addItem(product);
    setIsOpen(true);
    setTimeout(() => setIsAdding(false), 300);
  };

  const productName = product.name || "Producto sin nombre";
  const productPrice = product.price || 0;

  return (
    <Link href={`/producto/${product.id}`} className="group">
      <article className={`card-hover ${product.featured ? 'ring-2 ring-amber-400 shadow-lg' : ''}`}>
        {/* Image */}
        <div className="relative aspect-square bg-neutral-100 overflow-hidden">
          {product.image_url ? (
            <Image
              src={product.image_url}
              alt={product.name}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <svg className="w-16 h-16 text-neutral-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
          )}

          {/* Quick Add Button - Visible en móvil, hover en desktop */}
          <button
            onClick={handleAddToCart}
            disabled={isAdding}
            className={`
              absolute bottom-4 left-1/2 -translate-x-1/2
              bg-white text-black px-6 py-2.5 text-sm font-medium rounded-lg
              shadow-lg md:shadow-none
              md:opacity-0 md:group-hover:opacity-100
              transition-all duration-300
              md:transform md:translate-y-2 md:group-hover:translate-y-0
              hover:bg-black hover:text-white
              active:scale-95
              disabled:opacity-50
              ${isAdding ? 'scale-110' : ''}
            `}
          >
            {isAdding ? (
              <svg className="w-4 h-4 animate-spin inline" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
            ) : (
              <span className="flex items-center gap-1">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                Agregar
              </span>
            )}
          </button>

          {/* Featured Badge */}
          {product.featured && (
            <span className="absolute top-4 left-4 bg-gradient-to-r from-amber-400 to-orange-500 text-white text-xs px-3 py-1.5 font-semibold rounded-full shadow-lg flex items-center gap-1">
              <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              Destacado
            </span>
          )}
        </div>

        {/* Info */}
        <div className="p-4">
          <h3 className="text-sm font-medium truncate group-hover:underline">
            {productName}
          </h3>
          <p className="text-sm text-neutral-600 mt-1 font-medium">
            {formatPrice(productPrice)}
          </p>
        </div>
      </article>
    </Link>
  );
}
