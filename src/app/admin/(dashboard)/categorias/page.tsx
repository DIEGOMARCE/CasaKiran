"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { Category } from "@/types";

export default function CategoriasPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [formData, setFormData] = useState({ name: "", description: "" });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    const supabase = createClient();
    const { data } = await supabase
      .from("categories")
      .select("*")
      .order("name");
    
    setCategories(data || []);
    setLoading(false);
  };

  const generateSlug = (name: string) => {
    return name
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    const supabase = createClient();
    const slug = generateSlug(formData.name);

    try {
      if (editingCategory) {
        await supabase
          .from("categories")
          .update({ name: formData.name, slug, description: formData.description })
          .eq("id", editingCategory.id);
      } else {
        await supabase
          .from("categories")
          .insert([{ name: formData.name, slug, description: formData.description }]);
      }

      await fetchCategories();
      resetForm();
    } catch (error) {
      console.error("Error saving category:", error);
    } finally {
      setSaving(false);
    }
  };

  const handleEdit = (category: Category) => {
    setEditingCategory(category);
    setFormData({ name: category.name, description: category.description || "" });
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("¿Estás seguro de eliminar esta categoría?")) return;

    const supabase = createClient();
    await supabase.from("categories").delete().eq("id", id);
    await fetchCategories();
  };

  const resetForm = () => {
    setShowForm(false);
    setEditingCategory(null);
    setFormData({ name: "", description: "" });
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-light">Categorías</h1>
          <p className="text-neutral-500 mt-1">Organiza tus productos por categorías</p>
        </div>
        {!showForm && (
          <button onClick={() => setShowForm(true)} className="btn-primary">
            + Nueva categoría
          </button>
        )}
      </div>

      {/* Form */}
      {showForm && (
        <div className="bg-white border border-neutral-200 p-6 mb-8 max-w-xl">
          <h2 className="text-lg font-medium mb-4">
            {editingCategory ? "Editar categoría" : "Nueva categoría"}
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium mb-2">
                Nombre *
              </label>
              <input
                id="name"
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="input"
                placeholder="Ej: Aromáticas"
                required
              />
            </div>
            <div>
              <label htmlFor="description" className="block text-sm font-medium mb-2">
                Descripción
              </label>
              <input
                id="description"
                type="text"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="input"
                placeholder="Opcional"
              />
            </div>
            <div className="flex gap-3">
              <button type="submit" disabled={saving} className="btn-primary">
                {saving ? "Guardando..." : editingCategory ? "Guardar cambios" : "Crear"}
              </button>
              <button type="button" onClick={resetForm} className="btn-secondary">
                Cancelar
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Categories List */}
      <div className="bg-white border border-neutral-200">
        {loading ? (
          <div className="p-8 text-center text-neutral-500">Cargando...</div>
        ) : categories.length === 0 ? (
          <div className="p-12 text-center">
            <svg className="w-16 h-16 text-neutral-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
            </svg>
            <p className="text-neutral-500">No hay categorías todavía</p>
          </div>
        ) : (
          <ul className="divide-y divide-neutral-200">
            {categories.map((category) => (
              <li key={category.id} className="flex items-center justify-between p-4 hover:bg-neutral-50">
                <div>
                  <p className="font-medium">{category.name}</p>
                  {category.description && (
                    <p className="text-sm text-neutral-500">{category.description}</p>
                  )}
                  <p className="text-xs text-neutral-400 mt-1">Slug: {category.slug}</p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(category)}
                    className="p-2 text-neutral-400 hover:text-black transition-colors"
                    title="Editar"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                  </button>
                  <button
                    onClick={() => handleDelete(category.id)}
                    className="p-2 text-neutral-400 hover:text-red-600 transition-colors"
                    title="Eliminar"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}







