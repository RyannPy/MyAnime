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
    return await supabase.from("animes").insert([anime]).select();
};

// UPDATE
export const updateAnime = async (id, updatedData) => {
    return await supabase.from("animes").update(updatedData).eq("id", id);
};

// DELETE
export const deleteAnimeById = async (id) => {
    return await supabase.from("animes").delete().eq("id", id);
};

// ADD ANIME GENRES
export const addAnimeGenres = async (animeId, genreIds) => {
    const data = genreIds.map((genreId) => ({
        anime_id: animeId,
        genre_id: genreId,
    }));

    return await supabase.from("anime_genres").insert(data);
};

// UPLOAD IMAGE
export const uploadImage = async (file) => {
    const fileName = `${Date.now()}-${file.name}`;

    // eslint-disable-next-line no-unused-vars
    const { data, error } = await supabase.storage
        .from("anime-images")
        .upload(fileName, file);

    if (error) {
        console.log("UPLOAD ERROR:", error);
        return { error };
    }

    const { data: publicUrl } = supabase.storage
        .from("anime-images")
        .getPublicUrl(fileName);

    return { url: publicUrl.publicUrl };
};
