const db = require('../config/database');

class Student {
    static async create(studentData) {
        const { user_id, skills, cgpa, resume_url, portfolio, linkedin, github, bio, phone } = studentData;
        
        const sql = `INSERT INTO students (user_id, skills, cgpa, resume_url, portfolio, linkedin, github, bio, phone) 
                     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;
        
        const result = await db.query(sql, [user_id, skills, cgpa, resume_url, portfolio, linkedin, github, bio, phone]);
        return { id: result.insertId, ...studentData };
    }

    static async findByUserId(userId) {
        const sql = `SELECT u.*, s.* FROM users u 
                     LEFT JOIN students s ON u.id = s.user_id 
                     WHERE u.id = ?`;
        const results = await db.query(sql, [userId]);
        return results[0];
    }

    static async update(userId, data) {
        const fields = [];
        const values = [];
        
        Object.entries(data).forEach(([key, value]) => {
            if (value !== undefined) {
                fields.push(`${key} = ?`);
                values.push(value);
            }
        });
        
        if (fields.length === 0) return null;
        
        values.push(userId);
        const sql = `UPDATE students SET ${fields.join(', ')} WHERE user_id = ?`;
        await db.query(sql, values);
        
        return this.findByUserId(userId);
    }

    static async getStats(userId) {
        const sql = `SELECT COUNT(*) as total, 
                            SUM(CASE WHEN status IN ('Shortlisted', 'Interview', 'Offered', 'Selected') THEN 1 ELSE 0 END) as shortlisted,
                            SUM(CASE WHEN status = 'Interview' THEN 1 ELSE 0 END) as interviews,
                            SUM(CASE WHEN status IN ('Selected', 'Offered') THEN 1 ELSE 0 END) as selected
                     FROM applications 
                     WHERE student_id = (SELECT id FROM students WHERE user_id = ?)`;
        
        const result = await db.query(sql, [userId]);
        return result[0];
    }
}

module.exports = Student;