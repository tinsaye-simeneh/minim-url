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
    .select("*")
    .eq("short_url", short_url)
    .single();

  if (error) {
    console.error("Supabase query error:", error);
  } else {
    console.log("Supabase query result:", data);
  }

  return NextResponse.json({ exists: !!data });
}
