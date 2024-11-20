import { NextResponse } from "next/server";
import { supabase } from "@/utils/supabaseClient";

export async function GET(req: Request) {
  const url = new URL(req.url);
  const short_url = url.searchParams.get("short_url");

  if (!short_url) {
    return NextResponse.json(
      { error: "short_url is required" },
      { status: 400 }
    );
  }

  const { data, error } = await supabase
    .from("links")
    .select("id")
    .eq("short_url", short_url)
    .single();

  if (error && error.code !== "PGRST116") {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ exists: !!data });
}
