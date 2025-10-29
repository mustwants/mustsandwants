import { supabase } from "./supabaseClient"

export async function getCurrentUser() {
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser()
  if (error) throw error
  return user
}

export async function signInWithGoogle() {
  await supabase.auth.signInWithOAuth({ provider: "google" })
}

export async function signOut() {
  await supabase.auth.signOut()
}
