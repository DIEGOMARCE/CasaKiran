// Configuración del sitio - Editar estos valores con los datos de la cliente
export const siteConfig = {
  name: "Casa Kiran",
  description: "Velas artesanales para tu hogar",
  tagline: "Ilumina tu espacio con aromas únicos",
  
  // Contacto - ACTUALIZAR CON DATOS REALES
  whatsapp: "+521234567890", // Número de WhatsApp con código de país
  instagram: "https://instagram.com/casakiran",
  facebook: "https://facebook.com/casakiran",
  email: "contacto@casakiran.com",
  
  // Información del negocio
  address: "Ciudad de México, México",
  businessHours: "Lunes a Viernes: 9:00 - 18:00",
  
  // Información de envío y pagos
  shippingInfo: "Envíos a toda la República Mexicana. Tiempo de entrega: 3-5 días hábiles.",
  paymentMethods: "Transferencia bancaria, Efectivo contra entrega",
  
  // Moneda
  currency: "MXN",
  currencySymbol: "$",
};

// Formatear precio
export function formatPrice(price: number): string {
  return new Intl.NumberFormat("es-MX", {
    style: "currency",
    currency: siteConfig.currency,
  }).format(price);
}

// Generar mensaje de WhatsApp
export function generateWhatsAppMessage(items: { name: string; quantity: number; price: number }[], total: number): string {
  let message = "¡Hola! Me interesa hacer un pedido:\n\n";
  
  items.forEach((item) => {
    message += `• ${item.name} x${item.quantity} - ${formatPrice(item.price * item.quantity)}\n`;
  });
  
  message += `\n*Total: ${formatPrice(total)}*\n\n`;
  message += "¿Podrían indicarme la disponibilidad y forma de pago?";
  
  return encodeURIComponent(message);
}

// Generar URL de WhatsApp
export function getWhatsAppUrl(message: string): string {
  const phone = siteConfig.whatsapp.replace(/\D/g, "");
  return `https://wa.me/${phone}?text=${message}`;
}



