
const supabaseUrl = process.env.SUPABASE_API_URL
if (!supabaseUrl) {
  throw new Error('SUPABASE_API_URL is not defined')
}

const supabaseKey = process.env.SUPABASE_ANON_KEY
if (!supabaseKey) {
  throw new Error('SUPABASE_ANON_KEY is not defined')
}

// export const supabaseClient = createClient(supabaseUrl, supabaseKey)

// export const SupabaseEnableProviders = [
//   'facebook',
//   'github',
//   'google',
//   'twitter',
// ]

// export const SupabaseSignInWithProvider = async (p: string) => {
//   const { data, error } = await supabaseClient.auth.signInWithOAuth({
//     provider: p as Provider,
//   })

//   return { data, error }
// }

// export const SupabaseSignUp = async (email: string, password: string) => {
//   const { data, error } = await supabaseClient.auth.signUp({
//     email,
//     password,
//   })

//   return { data, error }
// }

// export const SupabaseLogout = async () => {
//   const error = await supabaseClient.auth.signOut()

//   return error
// }

// export const GetSession = async () => {
//   const { data: { session } } = await supabaseClient.auth.getSession();

//   return session;
// };

// // GetUserIDはstring | undefinedを返す
// export const GetUserID = async () => {
//   const session = await GetSession();

//   if (session) {
//     return session.user.id;
//   }

//   return undefined;
// }
