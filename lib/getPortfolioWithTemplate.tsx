import { supabase } from './supabaseClient';

export async function getPortfolioWithTemplate(userId: string) {
  const { data, error } = await supabase
    .from('portfolios')
    .select(`
      id,
      name,
      template_id,
      position,
      about,
      created_at,
      templates (
        name,
        category,
        price,
        img
      )
    `)
    .eq('user_id', userId);

  if (error) {
    console.error('Error fetching portfolios with templates:', error);
    return [];
  }

  return data;
}