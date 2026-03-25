const db = require('../config/database');

class Application {
    static async create(applicationData) {
        const { student_id, job_id, status } = applicationData;
        
        const sql = `INSERT INTO applications (student_id, job_id, status) VALUES (?, ?, ?)`;
        const result = await db.query(sql, [student_id, job_id, status || 'Applied']);
        
        // Update job applicants count
        await db.query('UPDATE jobs SET applicants = applicants + 1 WHERE id = ?', [job_id]);
        
        return { id: result.insertId, ...applicationData };
    }

    static async findByStudentId(studentId) {
        const sql = `SELECT a.*, j.title, j.company 
                     FROM applications a 
                     JOIN jobs j ON a.job_id = j.id 
                     WHERE a.student_id = ? 
                     ORDER BY a.applied_at DESC`;
        return await db.query(sql, [studentId]);
    }

    static async findByJobId(jobId) {
        const sql = `SELECT a.*, u.name, u.email, s.cgpa, s.skills 
                     FROM applications a 
                     JOIN students s ON a.student_id = s.id 
                     JOIN users u ON s.user_id = u.id 
                     WHERE a.job_id = ? 
                     ORDER BY a.applied_at DESC`;
        return await db.query(sql, [jobId]);
    }

    static async updateStatus(id, status, interviewDetails = null) {
        let sql = 'UPDATE applications SET status = ?';
        const values = [status];
        
        if (interviewDetails) {
            sql += ', interview_date = ?, interview_time = ?, interview_mode = ?, interview_link = ?';
            values.push(interviewDetails.date, interviewDetails.time, interviewDetails.mode, interviewDetails.link);
        }
        
        sql += ' WHERE id = ?';
        values.push(id);
        
        await db.query(sql, values);
        return this.findById(id);
    }

    static async findById(id) {
        const sql = `SELECT * FROM applications WHERE id = ?`;
        const results = await db.query(sql, [id]);
        return results[0];
    }

    static async getStats() {
        const sql = `SELECT 
                        COUNT(*) as total,
                        SUM(CASE WHEN status = 'Shortlisted' THEN 1 ELSE 0 END) as shortlisted,
                        SUM(CASE WHEN status = 'Interview' THEN 1 ELSE 0 END) as interviews,
                        SUM(CASE WHEN status IN ('Selected', 'Offered') THEN 1 ELSE 0 END) as offers
                     FROM applications`;
        const result = await db.query(sql);
        return result[0];
    }
}

module.exports = Application;