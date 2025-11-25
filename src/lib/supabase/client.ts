import { createBrowserClient } from "@supabase/ssr";

export function createClient() {
  // Si no hay credenciales, devolver un cliente mock
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
    return createMockBrowserClient();
  }

  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}

// Cliente mock para desarrollo sin Supabase
function createMockBrowserClient() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const createQueryBuilder = (): any => {
    const builder = {
      select: () => builder,
      eq: () => builder,
      order: () => builder,
      limit: () => builder,
      single: () => Promise.resolve({ data: null, error: { message: "Supabase no configurado" } }),
      insert: () => Promise.resolve({ data: null, error: { message: "Supabase no configurado" } }),
      update: () => Promise.resolve({ data: null, error: { message: "Supabase no configurado" } }),
      delete: () => Promise.resolve({ data: null, error: { message: "Supabase no configurado" } }),
      then: (resolve: (value: { data: unknown[]; error: null }) => void) => {
        resolve({ data: [], error: null });
      },
    };

    return builder;
  };

  return {
    from: () => createQueryBuilder(),
    auth: {
      signInWithPassword: () =>
        Promise.resolve({ data: null, error: { message: "Supabase no configurado. Por favor configura las variables de entorno." } }),
      signOut: () => Promise.resolve({ error: null }),
      getUser: () => Promise.resolve({ data: { user: null }, error: null }),
    },
    storage: {
      from: () => ({
        upload: () => Promise.resolve({ error: { message: "Supabase no configurado" } }),
        getPublicUrl: () => ({ data: { publicUrl: "" } }),
      }),
    },
  };
}
