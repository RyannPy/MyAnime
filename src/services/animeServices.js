import { supabase } from "./supabase";

// GET
export const getAnimes = async (userId) => {
    return await supabase
        .from("animes")
        .select("*")
        .eq("user_id", userId)
        .order("id", { ascending: false });
};

// ADD
export const createAnime = async (anime) => {
    return await supabase
        .from("animes")
        .insert([anime]);
};

// UPDATE
export const updateAnime = async (id, updatedData) => {
    return await supabase
        .from("animes")
        .update(updatedData)
        .eq("id", id);
};

// DELETE
export const deleteAnimeById = async (id) => {
    return await supabase
        .from("animes")
        .delete()
        .eq("id", id);
};