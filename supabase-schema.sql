-- =============================================
-- ESQUEMA DE BASE DE DATOS PARA CASA KIRAN
-- =============================================
-- Ejecutar este script en el SQL Editor de Supabase
-- https://app.supabase.com -> Tu proyecto -> SQL Editor

-- 1. TABLA DE CATEGORÍAS
-- =============================================
CREATE TABLE IF NOT EXISTS categories (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  slug VARCHAR(100) NOT NULL UNIQUE,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insertar categorías iniciales
INSERT INTO categories (name, slug, description) VALUES
  ('Aromáticas', 'aromaticas', 'Velas con fragancias naturales'),
  ('Decorativas', 'decorativas', 'Velas para decoración del hogar'),
  ('Especiales', 'especiales', 'Ediciones limitadas y temporadas')
ON CONFLICT (slug) DO NOTHING;

-- 2. TABLA DE PRODUCTOS
-- =============================================
CREATE TABLE IF NOT EXISTS products (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR(200) NOT NULL,
  description TEXT,
  price DECIMAL(10, 2) NOT NULL CHECK (price >= 0),
  image_url TEXT,
  category_id UUID REFERENCES categories(id) ON DELETE SET NULL,
  stock INTEGER DEFAULT 0 CHECK (stock >= 0),
  featured BOOLEAN DEFAULT FALSE,
  active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Trigger para actualizar updated_at automáticamente
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_products_updated_at
  BEFORE UPDATE ON products
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- 3. POLÍTICAS DE SEGURIDAD (RLS)
-- =============================================

-- Habilitar RLS en las tablas
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;

-- Políticas para CATEGORIES
-- Lectura pública
CREATE POLICY "Categories are viewable by everyone" 
  ON categories FOR SELECT 
  USING (true);

-- Solo usuarios autenticados pueden modificar
CREATE POLICY "Categories can be inserted by authenticated users" 
  ON categories FOR INSERT 
  TO authenticated 
  WITH CHECK (true);

CREATE POLICY "Categories can be updated by authenticated users" 
  ON categories FOR UPDATE 
  TO authenticated 
  USING (true);

CREATE POLICY "Categories can be deleted by authenticated users" 
  ON categories FOR DELETE 
  TO authenticated 
  USING (true);

-- Políticas para PRODUCTS
-- Lectura pública solo de productos activos
CREATE POLICY "Active products are viewable by everyone" 
  ON products FOR SELECT 
  USING (active = true);

-- Usuarios autenticados pueden ver todos los productos
CREATE POLICY "All products are viewable by authenticated users" 
  ON products FOR SELECT 
  TO authenticated 
  USING (true);

-- Solo usuarios autenticados pueden modificar
CREATE POLICY "Products can be inserted by authenticated users" 
  ON products FOR INSERT 
  TO authenticated 
  WITH CHECK (true);

CREATE POLICY "Products can be updated by authenticated users" 
  ON products FOR UPDATE 
  TO authenticated 
  USING (true);

CREATE POLICY "Products can be deleted by authenticated users" 
  ON products FOR DELETE 
  TO authenticated 
  USING (true);

-- 4. STORAGE BUCKET PARA IMÁGENES
-- =============================================
-- Esto se configura desde el dashboard de Supabase:
-- Storage -> New Bucket -> "product-images"
-- Configurar como público para que las imágenes sean accesibles

-- Política de storage (ejecutar en el SQL Editor):
-- INSERT INTO storage.buckets (id, name, public) 
-- VALUES ('product-images', 'product-images', true);

-- 5. ÍNDICES PARA MEJOR RENDIMIENTO
-- =============================================
CREATE INDEX IF NOT EXISTS idx_products_category ON products(category_id);
CREATE INDEX IF NOT EXISTS idx_products_featured ON products(featured) WHERE featured = true;
CREATE INDEX IF NOT EXISTS idx_products_active ON products(active) WHERE active = true;
CREATE INDEX IF NOT EXISTS idx_categories_slug ON categories(slug);

-- 6. VISTA PARA PRODUCTOS CON CATEGORÍA
-- =============================================
CREATE OR REPLACE VIEW products_with_category AS
SELECT 
  p.*,
  c.name as category_name,
  c.slug as category_slug
FROM products p
LEFT JOIN categories c ON p.category_id = c.id;

-- =============================================
-- FIN DEL ESQUEMA
-- =============================================
-- Después de ejecutar esto:
-- 1. Ve a Authentication -> Users y crea un usuario admin
-- 2. Ve a Storage -> Create new bucket "product-images" (público)
-- 3. Copia las keys de API a tu archivo .env.local






