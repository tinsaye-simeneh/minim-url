import { NextResponse } from 'next/server';
import { supabase } from '@/utils/supabaseClient';

export async function GET(req: Request) {
  const url = new URL(req.url);  // Parse the request URL
  const slug = url.pathname.split('/').pop();  // Extract the slug from the URL

  if (!slug) {
    return NextResponse.json({ message: 'Slug not found' }, { status: 400 });
  }

  const { data, error } = await supabase
    .from('links')
    .select('original_url')
    .eq('short_url', slug)
    .single();

  if (error || !data) {
    return NextResponse.json({ message: 'Link not found' }, { status: 404 });
  }

  return NextResponse.redirect(data.original_url, 301);
}
