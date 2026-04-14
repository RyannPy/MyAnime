import { supabase } from "./supabase";

// GET ALL GENRE
export const getGenres = async () => {
    return await supabase
        .from("genres")
        .select("*")
        .order("name", { ascending: true });
};

