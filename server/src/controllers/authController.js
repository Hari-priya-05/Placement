const User = require('../models/User');
const Student = require('../models/Student');
const Recruiter = require('../models/Recruiter');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const logout = async (req, res) => {
    // In a stateless JWT setup, logout is handled client-side by removing the token
    // This endpoint exists for API consistency
    res.json({
        success: true,
        message: 'Logout successful'
    });
};

const generateToken = (user) => {
    return jwt.sign(
        { id: user.id, email: user.email, role: user.role },
        process.env.JWT_SECRET || 'your-secret-key',
        { expiresIn: '7d' }
    );
};

const register = async (req, res) => {
    try {
        const { email, password, name, role, department, year } = req.body;

        // Check if user exists
        const existingUser = await User.findByEmail(email);
        if (existingUser) {
            return res.status(400).json({ success: false, message: 'Email already registered' });
        }

        // Create user
        const user = await User.create({ email, password, name, role, department, year });

        // Create role-specific profile
        if (role === 'student') {
            await Student.create({ user_id: user.id });
        } else if (role === 'recruiter') {
            await Recruiter.create({ user_id: user.id, hr_name: name, hr_email: email });
        }

        const token = generateToken(user);
        
        res.status(201).json({
            success: true,
            data: { user, token },
            message: 'Registration successful'
        });
    } catch (error) {
        console.error('Registration error:', error);
        res.status(500).json({ success: false, message: 'Registration failed' });
    }
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findByEmail(email);
        if (!user) {
            return res.status(401).json({ success: false, message: 'Invalid credentials' });
        }

        const isValidPassword = await bcrypt.compare(password, user.password);
        if (!isValidPassword) {
            return res.status(401).json({ success: false, message: 'Invalid credentials' });
        }

        const token = generateToken(user);
        
        // Remove password from response
        delete user.password;
        
        res.json({
            success: true,
            data: { user, token },
            message: 'Login successful'
        });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ success: false, message: 'Login failed' });
    }
};

module.exports = { register, login, logout };