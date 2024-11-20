import { NextResponse } from "next/server";
import { supabase } from "@/utils/supabaseClient";
import { Link } from "@/types/models";

export async function POST(req: Request) {
  const { original_url, short_url, user_id }: Link = await req.json();

  const { data, error } = await supabase
    .from("links")
    .insert([{ original_url, short_url, user_id }])
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data);
}
