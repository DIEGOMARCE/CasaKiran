"use client";

import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { formatPrice } from "@/lib/config";
import { Product } from "@/types";
import { useState } from "react";

interface ProductDetailProps {
  product: Product;
}

export function ProductDetail({ product }: ProductDetailProps) {
  const { addItem, setIsOpen } = useCart();
  const [quantity, setQuantity] = useState(1);

  const handleAddToCart = () => {
    addItem(product, quantity);
    setIsOpen(true);
  };

  return (
    <div className="animate-fade-in">
      <div className="container-custom py-8 lg:py-12">
        {/* Breadcrumb */}
        <nav className="text-sm text-neutral-500 mb-8">
          <Link href="/" className="hover:text-black">Inicio</Link>
          <span className="mx-2">/</span>
          <Link href="/catalogo" className="hover:text-black">Catálogo</Link>
          <span className="mx-2">/</span>
          <span className="text-black">{product.name}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Image */}
          <div className="relative aspect-square bg-neutral-100">
            {product.image_url ? (
              <Image
                src={product.image_url}
                alt={product.name}
                fill
                className="object-cover"
                priority
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <svg className="w-24 h-24 text-neutral-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
            )}
          </div>

          {/* Details */}
          <div className="flex flex-col">
            <h1 className="text-2xl lg:text-3xl font-light mb-2">{product.name}</h1>
            <p className="text-2xl mb-6">{formatPrice(product.price)}</p>
            
            <p className="text-neutral-600 leading-relaxed mb-8">
              {product.description}
            </p>

            {/* Quantity */}
            <div className="mb-6">
              <label className="text-sm font-medium mb-2 block">Cantidad</label>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-10 h-10 flex items-center justify-center border border-neutral-200 hover:border-black transition-colors"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                  </svg>
                </button>
                <span className="w-12 text-center">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-10 h-10 flex items-center justify-center border border-neutral-200 hover:border-black transition-colors"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Add to Cart */}
            <button
              onClick={handleAddToCart}
              className="btn-primary w-full lg:w-auto"
            >
              Agregar al carrito — {formatPrice(product.price * quantity)}
            </button>

            {/* Stock */}
            {product.stock > 0 && product.stock <= 5 && (
              <p className="text-sm text-neutral-500 mt-4">
                ¡Solo quedan {product.stock} unidades!
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}




