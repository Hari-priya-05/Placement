const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Missing Supabase credentials. Please check your .env file');
  console.error('SUPABASE_URL:', supabaseUrl ? '✓ Set' : '✗ Missing');
  console.error('SUPABASE_SERVICE_KEY:', supabaseKey ? '✓ Set' : '✗ Missing');
  throw new Error('Missing Supabase credentials');
}

console.log('✅ Supabase configuration loaded');
console.log('📊 Connecting to:', supabaseUrl);

const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  },
  db: {
    schema: 'public'
  }
});

// Test the connection
async function testConnection() {
  try {
    const { data, error } = await supabase
      .from('users')
      .select('count', { count: 'exact', head: true });
    
    if (error) {
      console.error('❌ Supabase connection test failed:', error.message);
    } else {
      console.log('✅ Supabase connection successful!');
    }
  } catch (err) {
    console.error('❌ Supabase connection error:', err.message);
  }
}

// Run connection test
testConnection();

module.exports = { supabase };