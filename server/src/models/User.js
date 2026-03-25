const db = require('../config/database');
const bcrypt = require('bcryptjs');

class User {
    static async create(userData) {
        const { email, password, name, role, department, year } = userData;
        const hashedPassword = await bcrypt.hash(password, 10);
        
        const sql = `INSERT INTO users (email, password, name, role, department, year) 
                     VALUES (?, ?, ?, ?, ?, ?)`;
        
        const result = await db.query(sql, [email, hashedPassword, name, role, department, year || null]);
        return { id: result.insertId, email, name, role, department, year };
    }

    static async findByEmail(email) {
        const sql = 'SELECT * FROM users WHERE email = ?';
        const users = await db.query(sql, [email]);
        return users[0];
    }

    static async findById(id) {
        const sql = 'SELECT * FROM users WHERE id = ?';
        const users = await db.query(sql, [id]);
        return users[0];
    }

    static async update(id, data) {
        const fields = [];
        const values = [];
        
        Object.entries(data).forEach(([key, value]) => {
            if (value !== undefined) {
                fields.push(`${key} = ?`);
                values.push(value);
            }
        });
        
        if (fields.length === 0) return null;
        
        values.push(id);
        const sql = `UPDATE users SET ${fields.join(', ')} WHERE id = ?`;
        await db.query(sql, values);
        
        return this.findById(id);
    }

    static async delete(id) {
        const sql = 'DELETE FROM users WHERE id = ?';
        await db.query(sql, [id]);
        return true;
    }

    static async getAllStudents() {
        const sql = `SELECT u.*, s.* FROM users u 
                     LEFT JOIN students s ON u.id = s.user_id 
                     WHERE u.role = 'student'`;
        return await db.query(sql);
    }

    static async getAllRecruiters() {
        const sql = `SELECT u.*, r.* FROM users u 
                     LEFT JOIN recruiters r ON u.id = r.user_id 
                     WHERE u.role = 'recruiter'`;
        return await db.query(sql);
    }
}

module.exports = User;