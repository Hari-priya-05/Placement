const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_KEY;

let supabase = null;

if (!supabaseUrl || !supabaseKey) {
  console.log('⚠️  Supabase credentials missing - running in demo mode');
  console.log('SUPABASE_URL:', supabaseUrl ? '✓ Set' : '✗ Missing');
  console.log('SUPABASE_SERVICE_KEY:', supabaseKey ? '✓ Set' : '✗ Missing');
  console.log('Using mock authentication instead');
  
  // Create a mock client that just logs operations
  supabase = {
    auth: {
      signInWithPassword: async () => ({ error: new Error('Supabase not configured') }),
      signUp: async () => ({ error: new Error('Supabase not configured') }),
      signOut: async () => ({ error: new Error('Supabase not configured') }),
      getUser: async () => ({ error: new Error('Supabase not configured') })
    },
    from: () => ({
      select: () => ({
        eq: () => ({
          single: async () => ({ error: new Error('Supabase not configured') })
        })
      }),
      insert: () => ({
        select: () => ({
          single: async () => ({ error: new Error('Supabase not configured') })
        })
      })
    })
  };
} else {
  console.log('✅ Supabase configuration loaded');
  console.log('📊 Connecting to:', supabaseUrl);
  
  supabase = createClient(supabaseUrl, supabaseKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    },
    db: {
      schema: 'public'
    }
  });
}

module.exports = { supabase };