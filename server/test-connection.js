const { supabase } = require('./src/config/supabase');
require('dotenv').config();

async function testFullConnection() {
  console.log('🔍 Testing Supabase Connection...');
  console.log('URL:', process.env.SUPABASE_URL);
  console.log('Key present:', !!process.env.SUPABASE_SERVICE_KEY);
  
  try {
    // Test 1: Simple query
    console.log('\n📊 Testing query...');
    const { data, error } = await supabase
      .from('users')
      .select('count', { count: 'exact', head: true });
    
    if (error) {
      console.error('❌ Query failed:', error.message);
    } else {
      console.log('✅ Query successful!');
    }

    // Test 2: Try to create a test user
    console.log('\n👤 Testing user creation...');
    const testId = '11111111-1111-1111-1111-111111111111';
    
    // First, create auth user (this would normally be done through auth.signUp)
    console.log('Note: Direct table insert bypasses auth - this is just for testing');
    
    const { error: insertError } = await supabase
      .from('users')
      .insert([{
        id: testId,
        name: 'Test User',
        email: 'test@example.com',
        role: 'student',
        department: 'Test Department',
        year: 3
      }]);

    if (insertError) {
      console.error('❌ Insert failed:', insertError.message);
    } else {
      console.log('✅ Insert successful!');
      
      // Clean up
      await supabase.from('users').delete().eq('id', testId);
      console.log('✅ Test user cleaned up');
    }

  } catch (error) {
    console.error('❌ Unexpected error:', error);
  }
}

testFullConnection();