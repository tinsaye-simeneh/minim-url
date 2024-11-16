import { NextApiRequest, NextApiResponse } from "next";
import { supabase } from "@/utils/supabaseClient";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { slug } = req.query;
  const { data, error } = await supabase
    .from("links")
    .select("original_url")
    .eq("short_url", slug)
    .single();

  if (error || !data) {
    return res.status(404).json({ message: "Link not found" });
  }

  return res.redirect(301, data.original_url);
};

export default handler;
