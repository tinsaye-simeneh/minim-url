import { NextApiRequest, NextApiResponse } from "next";
import { supabase } from "@/utils/supabaseClient";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { original_url } = req.body;

  if (!original_url) {
    return res.status(400).json({ message: "Original URL is required" });
  }

  try {
    const short_url = Math.random().toString(36).substring(2, 8);
    const { data, error } = await supabase
      .from("links")
      .insert([{ original_url, short_url }])
      .select();

    if (error) {
      throw error;
    }

    return res.status(201).json({ link: data[0] });
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong", error });
  }
}
