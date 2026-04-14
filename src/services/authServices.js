import { supabase } from "./supabase";

// REGISTER
export const signUp = async (email, password) => {
    return await supabase.auth.signUp({
        email,
        password
    });
};

// LOGIN
export const signIn = async (email, password) => {
    return await supabase.auth.signInWithPassword({
        email,
        password
    });
};

// LOGOUT
export const signOut = async () => {
    return await supabase.auth.signOut();
};

// GET USER
export const getCurrentUser = async () => {
    const { data } = await supabase.auth.getUser();
    return data?.user;
}