import { supabase } from './supabase'
export async function uploadProductImage(file) {
  if (!supabase) throw new Error('Configure Supabase Storage first.')
  const safeName = `${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.-]/g, '-')}`
  const { error } = await supabase.storage.from('product-images').upload(safeName, file, { upsert:true })
  if (error) throw error
  return supabase.storage.from('product-images').getPublicUrl(safeName).data.publicUrl
}
