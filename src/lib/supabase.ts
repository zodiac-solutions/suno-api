import { createClient } from "@supabase/supabase-js";
import { Database } from "@/app/types/supabase";

const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_KEY as string;
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL as string;
console.log(supabaseKey, supabaseUrl);
export const supabase = createClient<Database>(
  supabaseUrl,
  supabaseKey,
  //   {
  //   auth: {
  //     storage: typeof window !== "undefined" ? window.localStorage : undefined,
  //     storageKey: "auth",
  //   },
  // }
);
