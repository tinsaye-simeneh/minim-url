import { NextResponse } from "next/server";
import { supabase } from "@/utils/supabaseClient";

export async function GET(
  req: Request,
  { params }: { params: { slug: string } }
) {
  const { slug } = params;

  const { data, error } = await supabase
    .from("links")
    .select("original_url")
    .eq("short_url", slug)
    .single();

  if (error || !data) {
    return NextResponse.json({ message: "Link not found" }, { status: 404 });
  }

  return NextResponse.redirect(data.original_url, 301);
}
