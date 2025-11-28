// Tipos para productos
export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image_url: string;
  category_id: string;
  category?: Category;
  stock: number;
  featured: boolean;
  active: boolean;
  created_at: string;
  updated_at: string;
}

// Tipos para categorías
export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
  created_at: string;
}

// Tipos para el carrito
export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Cart {
  items: CartItem[];
  total: number;
}

// Tipos para configuración del sitio
export interface SiteConfig {
  whatsapp: string;
  instagram?: string;
  facebook?: string;
  email?: string;
  address?: string;
  businessHours?: string;
  shippingInfo?: string;
  paymentMethods?: string;
}

// Props comunes
export interface PageProps {
  params: { [key: string]: string };
  searchParams: { [key: string]: string | string[] | undefined };
}
