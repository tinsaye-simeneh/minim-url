import { NextResponse } from "next/server";
import { supabase } from "@/utils/supabaseClient";

export async function GET() {
  try {
    const { data, error } = await supabase.from("links").select("*");

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
