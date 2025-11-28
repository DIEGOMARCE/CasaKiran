"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

interface DeleteProductButtonProps {
  productId: string;
  productName: string;
}

export function DeleteProductButton({ productId, productName }: DeleteProductButtonProps) {
  const [isDeleting, setIsDeleting] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const router = useRouter();

  const handleDelete = async () => {
    setIsDeleting(true);

    try {
      const supabase = createClient();

      // Primero obtener la información del producto para acceder a la imagen
      const { data: product } = await supabase
        .from("products")
        .select("image_url")
        .eq("id", productId)
        .single();

      // Eliminar el producto de la base de datos
      const { error } = await supabase
        .from("products")
        .delete()
        .eq("id", productId);

      if (error) {
        console.error("Error al eliminar el producto:", error);
        alert("No se pudo eliminar el producto. Por favor, intenta de nuevo.");
        return;
      }

      // Si el producto tenía imagen, eliminarla del storage
      if (product?.image_url) {
        try {
          // Extraer el nombre del archivo de la URL
          const imageUrl = product.image_url;
          const fileName = imageUrl.split('/').pop();

          if (fileName) {
            await supabase.storage
              .from("product-images")
              .remove([fileName]);
          }
        } catch (storageError) {
          // No bloquear la eliminación si falla borrar la imagen
          console.error("Error al eliminar imagen:", storageError);
        }
      }

      router.refresh();
    } catch {
      alert("Error al eliminar el producto");
    } finally {
      setIsDeleting(false);
      setShowConfirm(false);
    }
  };

  return (
    <>
      <button
        onClick={() => setShowConfirm(true)}
        className="p-2 text-neutral-400 hover:text-red-600 transition-colors"
        title="Eliminar"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
        </svg>
      </button>

      {/* Confirm Dialog */}
      {showConfirm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-6 max-w-md w-full mx-4">
            <h3 className="text-lg font-medium mb-2">¿Eliminar producto?</h3>
            <p className="text-neutral-600 text-sm mb-6">
              ¿Estás seguro de que deseas eliminar <strong>{productName}</strong>?
              Esta acción no se puede deshacer.
            </p>
            <div className="flex gap-3 justify-end">
              <button
                onClick={() => setShowConfirm(false)}
                className="btn-secondary"
                disabled={isDeleting}
              >
                Cancelar
              </button>
              <button
                onClick={handleDelete}
                className="btn bg-red-600 text-white hover:bg-red-700"
                disabled={isDeleting}
              >
                {isDeleting ? "Eliminando..." : "Eliminar"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
