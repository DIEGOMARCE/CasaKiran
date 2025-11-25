import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

export async function createClient() {
  // Si no hay credenciales, devolver un cliente mock que no haga nada
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
    return createMockClient();
  }

  const cookieStore = await cookies();

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            );
          } catch {
            // The `setAll` method was called from a Server Component.
            // This can be ignored if you have middleware refreshing
            // user sessions.
          }
        },
      },
    }
  );
}

// Cliente mock para desarrollo sin Supabase
function createMockClient() {
  const mockData = {
    products: [
      {
        id: "1",
        name: "Vela Lavanda",
        description: "Vela aromática con esencia de lavanda natural. Perfecta para relajación y momentos de calma. Elaborada con cera de soya 100% natural.",
        price: 250,
        image_url: "",
        category_id: "1",
        stock: 10,
        featured: true,
        active: true,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        category: { id: "1", name: "Aromáticas", slug: "aromaticas" },
      },
      {
        id: "2",
        name: "Vela Vainilla",
        description: "Dulce aroma de vainilla para crear ambientes cálidos y acogedores. Ideal para el hogar.",
        price: 280,
        image_url: "",
        category_id: "1",
        stock: 15,
        featured: true,
        active: true,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        category: { id: "1", name: "Aromáticas", slug: "aromaticas" },
      },
      {
        id: "3",
        name: "Vela Canela",
        description: "Aroma especiado perfecto para las temporadas frías. Crea un ambiente acogedor.",
        price: 260,
        image_url: "",
        category_id: "1",
        stock: 8,
        featured: true,
        active: true,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        category: { id: "1", name: "Aromáticas", slug: "aromaticas" },
      },
      {
        id: "4",
        name: "Vela Rosa",
        description: "Delicada fragancia floral para momentos especiales. Perfecta para regalar.",
        price: 300,
        image_url: "",
        category_id: "2",
        stock: 12,
        featured: true,
        active: true,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        category: { id: "2", name: "Decorativas", slug: "decorativas" },
      },
      {
        id: "5",
        name: "Vela Menta",
        description: "Fresca y revitalizante. Perfecta para espacios de trabajo.",
        price: 240,
        image_url: "",
        category_id: "1",
        stock: 20,
        featured: false,
        active: true,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        category: { id: "1", name: "Aromáticas", slug: "aromaticas" },
      },
      {
        id: "6",
        name: "Vela Eucalipto",
        description: "Aroma purificante y relajante. Ideal para spa en casa.",
        price: 270,
        image_url: "",
        category_id: "1",
        stock: 18,
        featured: false,
        active: true,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        category: { id: "1", name: "Aromáticas", slug: "aromaticas" },
      },
    ],
    categories: [
      { id: "1", name: "Aromáticas", slug: "aromaticas", description: "Velas con fragancias naturales", created_at: new Date().toISOString() },
      { id: "2", name: "Decorativas", slug: "decorativas", description: "Velas para decoración del hogar", created_at: new Date().toISOString() },
      { id: "3", name: "Especiales", slug: "especiales", description: "Ediciones limitadas", created_at: new Date().toISOString() },
    ],
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const createQueryBuilder = (table: string): any => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let result: any[] = table === "products" ? [...mockData.products] : [...mockData.categories];

    const builder = {
      select: () => builder,
      eq: (column: string, value: unknown) => {
        result = result.filter((item) => item[column] === value);
        return builder;
      },
      order: () => builder,
      limit: (n: number) => {
        result = result.slice(0, n);
        return builder;
      },
      single: () => {
        return Promise.resolve({ data: result[0] || null, error: null });
      },
      then: (resolve: (value: { data: unknown[]; error: null; count?: number }) => void) => {
        resolve({ data: result, error: null, count: result.length });
      },
    };

    return builder;
  };

  return {
    from: (table: string) => createQueryBuilder(table),
    auth: {
      getUser: () => Promise.resolve({ data: { user: null }, error: null }),
    },
  };
}
