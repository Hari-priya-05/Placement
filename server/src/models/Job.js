const db = require('../config/database');

class Job {
    static async create(jobData) {
        const { recruiter_id, title, company, description, skills_required, salary, location, job_type, experience, deadline } = jobData;
        
        const sql = `INSERT INTO jobs (recruiter_id, title, company, description, skills_required, salary, location, job_type, experience, deadline) 
                     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
        
        const result = await db.query(sql, [recruiter_id, title, company, description, skills_required, salary, location, job_type, experience, deadline]);
        return { id: result.insertId, ...jobData };
    }

    static async findAll(filters = {}) {
        let sql = 'SELECT * FROM jobs WHERE status = "active"';
        const values = [];
        
        if (filters.search) {
            sql += ' AND (title LIKE ? OR company LIKE ? OR skills_required LIKE ?)';
            const searchTerm = `%${filters.search}%`;
            values.push(searchTerm, searchTerm, searchTerm);
        }
        
        if (filters.location) {
            sql += ' AND location = ?';
            values.push(filters.location);
        }
        
        if (filters.job_type) {
            sql += ' AND job_type = ?';
            values.push(filters.job_type);
        }
        
        sql += ' ORDER BY created_at DESC';
        
        if (filters.limit) {
            sql += ' LIMIT ?';
            values.push(parseInt(filters.limit));
        }
        
        return await db.query(sql, values);
    }

    static async findById(id) {
        const sql = `SELECT j.*, r.company_name as recruiter_company, r.user_id as recruiter_user_id 
                     FROM jobs j 
                     LEFT JOIN recruiters r ON j.recruiter_id = r.id 
                     WHERE j.id = ?`;
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
        const sql = `UPDATE jobs SET ${fields.join(', ')} WHERE id = ?`;
        await db.query(sql, values);
        
        return this.findById(id);
    }

    static async delete(id) {
        const sql = 'DELETE FROM jobs WHERE id = ?';
        await db.query(sql, [id]);
        return true;
    }

    static async getRecruiterJobs(recruiterId) {
        const sql = 'SELECT * FROM jobs WHERE recruiter_id = ? ORDER BY created_at DESC';
        return await db.query(sql, [recruiterId]);
    }
}

module.exports = Job;