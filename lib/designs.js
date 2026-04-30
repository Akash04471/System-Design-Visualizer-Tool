import { supabase } from './supabaseClient'

export async function saveDesign(userId, title, nodes, edges) {
  console.log('saveDesign called with userId:', userId, 'type:', typeof userId, 'title:', title)
  
  if (!userId) {
    console.error('saveDesign: userId is missing or null')
    return { data: null, error: { message: 'User ID is missing' } }
  }

  const designData = {
    user_id: userId,
    title,
    data: { nodes, edges }
  }
  
  console.log('Insert payload:', designData)
  
  const { data, error } = await supabase
    .from('designs')
    .insert([designData])
    .select('*')
  
  if (error) {
    console.error('saveDesign error:', error)
    console.error('Error details:', { code: error.code, message: error.message, details: error.details })
  } else {
    console.log('saveDesign success, data:', data)
  }
  
  return { data, error }
}

export async function getDesigns(userId) {
  return await supabase
    .from('designs')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false })
}

export async function updateDesign(id, userId, nodes, edges) {
  return await supabase
    .from('designs')
    .update({
      data: { nodes, edges }
    })
    .eq('id', id)
    .eq('user_id', userId)
}

export async function getPublicDesign(id) {
  return await supabase
    .from('designs')
    .select('*')
    .eq('id', id)
    .eq('is_public', true)
    .single()
}

export async function updateDesignVisibility(id, userId, isPublic) {
  return await supabase
    .from('designs')
    .update({ is_public: isPublic })
    .eq('id', id)
    .eq('user_id', userId)
}

export async function deleteDesign(id, userId) {
  return await supabase
    .from('designs')
    .delete()
    .eq('id', id)
    .eq('user_id', userId)
}