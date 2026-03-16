const login = async (req, res) => {
  try {
    console.log('🔐 Login attempt for:', req.body.email);
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ 
        success: false, 
        message: 'Email and password are required' 
      });
    }

    // Authenticate with Supabase
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    });

    if (error) {
      console.error('❌ Supabase auth error:', error.message);
      return res.status(401).json({ 
        success: false, 
        message: 'Invalid email or password' 
      });
    }

    // Get user profile from your users table
    const { data: userData, error: userError } = await supabase
      .from('users')
      .select('*')
      .eq('id', data.user.id)
      .single();

    if (userError) {
      console.error('❌ User profile error:', userError);
      
      // If user profile doesn't exist, create it
      const { data: newUser, error: createError } = await supabase
        .from('users')
        .insert([{
          id: data.user.id,
          email: data.user.email,
          name: data.user.email.split('@')[0],
          role: 'student', // default role
          department: 'Not specified'
        }])
        .select()
        .single();

      if (createError) {
        return res.status(500).json({ 
          success: false, 
          message: 'Failed to create user profile' 
        });
      }

      return res.status(200).json({
        success: true,
        data: {
          user: newUser,
          token: data.session.access_token
        }
      });
    }

    console.log('✅ Login successful for:', email);

    res.status(200).json({
      success: true,
      data: {
        user: userData,
        token: data.session.access_token
      }
    });
  } catch (error) {
    console.error('❌ Login error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Login failed' 
    });
  }
};