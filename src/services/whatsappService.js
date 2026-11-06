export function createWhatsAppOrder(items, total) {
  const number = (import.meta.env.VITE_WHATSAPP_NUMBER || '').replace(/\D/g, '')
  const lines = items.map(i => `• ${i.name} x ${i.quantity} — ₹${i.price * i.quantity}`).join('\n')
  const message = `Hello FitWellth! I'd like to place an order:\n${lines}\n\nTotal: ₹${total}\nPlease confirm availability.`
  if (!number || number.includes('XXXXXXXXXX')) return { error:'Add your WhatsApp number in .env as VITE_WHATSAPP_NUMBER.' }
  return { url:`https://wa.me/${number}?text=${encodeURIComponent(message)}` }
}
