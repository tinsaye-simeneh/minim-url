import { NextResponse } from "next/server";
import { supabase } from "@/utils/supabaseClient";

export async function GET(req: Request) {
  const url = new URL(req.url);
  const slug = url.pathname.split("/").pop();

  const pageRoutes: { [key: string]: string } = {
    login: "/login",
    "": "/",
    links: "/links",
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  if ((slug as any) in pageRoutes) {
    return NextResponse.redirect(
      pageRoutes[slug as keyof typeof pageRoutes],
      301
    );
  }
  const { data, error } = await supabase
    .from("links")
    .select("original_url")
    .eq("short_url", slug)
    .single();

  if (error || !data) {
    return new Response(JSON.stringify({ message: "Link not found" }), {
      status: 404,
    });
  }

  return NextResponse.redirect(data.original_url, 301);
}
