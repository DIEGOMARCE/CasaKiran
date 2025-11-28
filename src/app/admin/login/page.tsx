"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { siteConfig } from "@/lib/config";

export default function AdminLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const supabase = createClient();
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        setError("Credenciales inválidas");
        return;
      }

      router.push("/admin");
      router.refresh();
    } catch {
      setError("Error al iniciar sesión");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-neutral-50">
      <div className="w-full max-w-md p-8 bg-white border border-neutral-200">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-light">{siteConfig.name}</h1>
          <p className="text-sm text-neutral-500 mt-2">Panel de Administración</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          {error && (
            <div className="p-3 bg-red-50 border border-red-200 text-red-600 text-sm">
              {error}
            </div>
          )}

          <div>
            <label htmlFor="email" className="block text-sm font-medium mb-2">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="input"
              placeholder="admin@ejemplo.com"
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium mb-2">
              Contraseña
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input"
              placeholder="••••••••"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="btn-primary w-full"
          >
            {loading ? "Iniciando sesión..." : "Iniciar sesión"}
          </button>
        </form>

        <div className="mt-6 text-center">
          <a href="/" className="text-sm text-neutral-500 hover:text-black">
            ← Volver al sitio
          </a>
        </div>
      </div>
    </div>
  );
}

