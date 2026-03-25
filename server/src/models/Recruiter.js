const db = require('../config/database');

class Recruiter {
    static async create(recruiterData) {
        const { user_id, company_name, website, hr_name, hr_email, hr_phone, description, industry, company_size, headquarters, founded, logo, cover_image } = recruiterData;
        
        const sql = `INSERT INTO recruiters (user_id, company_name, website, hr_name, hr_email, hr_phone, description, industry, company_size, headquarters, founded, logo, cover_image) 
                     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
        
        const result = await db.query(sql, [user_id, company_name, website, hr_name, hr_email, hr_phone, description, industry, company_size, headquarters, founded, logo, cover_image]);
        return { id: result.insertId, ...recruiterData };
    }

    static async findByUserId(userId) {
        const sql = `SELECT u.*, r.* FROM users u 
                     LEFT JOIN recruiters r ON u.id = r.user_id 
                     WHERE u.id = ?`;
        const results = await db.query(sql, [userId]);
        return results[0];
    }

    static async findById(id) {
        const sql = `SELECT * FROM recruiters WHERE id = ?`;
        const results = await db.query(sql, [id]);
        return results[0];
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
        const sql = `UPDATE recruiters SET ${fields.join(', ')} WHERE id = ?`;
        await db.query(sql, values);
        
        return this.findById(id);
    }

    static async getStats(userId) {
        const sql = `SELECT COUNT(*) as total_jobs,
                            SUM(CASE WHEN status = 'active' THEN 1 ELSE 0 END) as active_jobs,
                            SUM(applicants) as total_applicants
                     FROM jobs 
                     WHERE recruiter_id = (SELECT id FROM recruiters WHERE user_id = ?)`;
        
        const result = await db.query(sql, [userId]);
        return result[0];
    }

    static async getAll() {
        const sql = `SELECT u.*, r.* FROM users u 
                     INNER JOIN recruiters r ON u.id = r.user_id 
                     WHERE u.role = 'recruiter'`;
        const results = await db.query(sql);
        return results;
    }

    static async updateStatus(id, status) {
        const sql = `UPDATE recruiters SET status = ? WHERE id = ?`;
        await db.query(sql, [status, id]);
        return this.findById(id);
    }
}

module.exports = Recruiter;
