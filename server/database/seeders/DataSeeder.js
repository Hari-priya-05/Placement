const mysql = require('mysql2/promise');
const bcrypt = require('bcryptjs');
require('dotenv').config();

class DataSeeder {
    constructor() {
        this.pool = null;
    }

    async connect() {
        this.pool = mysql.createPool({
            host: process.env.DB_HOST || 'localhost',
            user: process.env.DB_USER || 'root',
            password: process.env.DB_PASSWORD || '',
            database: process.env.DB_NAME || 'placement_portal',
            waitForConnections: true,
            connectionLimit: 10,
            queueLimit: 0
        });
        console.log('✅ Database connected');
    }

    async seed() {
        try {
            await this.connect();
            
            // Clear existing data
            await this.clearTables();
            
            // Seed users
            const users = await this.seedUsers();
            
            // Seed students
            await this.seedStudents(users);
            
            // Seed recruiters
            await this.seedRecruiters(users);
            
            // Seed jobs
            await this.seedJobs();
            
            // Seed applications
            await this.seedApplications();
            
            // Seed placement drives
            await this.seedPlacementDrives();
            
            // Seed chat history
            await this.seedChatHistory();
            
            console.log('✅ All data seeded successfully!');
            
        } catch (error) {
            console.error('❌ Seeding error:', error);
        } finally {
            if (this.pool) await this.pool.end();
        }
    }

    async clearTables() {
        const tables = [
            'drive_registrations',
            'placement_drives',
            'applications',
            'jobs',
            'students',
            'recruiters',
            'users',
            'chat_history',
            'notifications'
        ];
        
        for (const table of tables) {
            await this.pool.query(`DELETE FROM ${table}`);
            await this.pool.query(`ALTER TABLE ${table} AUTO_INCREMENT = 1`);
            console.log(`✅ Cleared table: ${table}`);
        }
    }

    async seedUsers() {
        const users = [
            {
                email: 'student@demo.com',
                password: await bcrypt.hash('demo123', 10),
                name: 'Rahul Sharma',
                role: 'student',
                department: 'Computer Science',
                year: 4
            },
            {
                email: 'student2@demo.com',
                password: await bcrypt.hash('demo123', 10),
                name: 'Priya Patel',
                role: 'student',
                department: 'Information Technology',
                year: 4
            },
            {
                email: 'recruiter@demo.com',
                password: await bcrypt.hash('demo123', 10),
                name: 'Amit Kumar',
                role: 'recruiter',
                department: 'HR'
            },
            {
                email: 'tpo@demo.com',
                password: await bcrypt.hash('demo123', 10),
                name: 'Dr. Ajay Kumar',
                role: 'tpo',
                department: 'Training & Placement'
            }
        ];
        
        const insertedUsers = [];
        for (const user of users) {
            const [result] = await this.pool.query(
                'INSERT INTO users (email, password, name, role, department, year) VALUES (?, ?, ?, ?, ?, ?)',
                [user.email, user.password, user.name, user.role, user.department, user.year || null]
            );
            insertedUsers.push({ id: result.insertId, ...user });
            console.log(`✅ Created user: ${user.name}`);
        }
        return insertedUsers;
    }

    async seedStudents(users) {
        const studentUsers = users.filter(u => u.role === 'student');
        
        const students = [
            {
                user_id: studentUsers[0].id,
                skills: 'React, Node.js, Python, JavaScript, SQL',
                cgpa: 8.7,
                linkedin: 'https://linkedin.com/in/rahul',
                github: 'https://github.com/rahul',
                bio: 'Passionate Computer Science student looking for SDE roles',
                phone: '+91 98765 43210',
                placement_status: 'interview'
            },
            {
                user_id: studentUsers[1].id,
                skills: 'Java, Spring Boot, MySQL, AWS',
                cgpa: 8.9,
                linkedin: 'https://linkedin.com/in/priya',
                github: 'https://github.com/priya',
                bio: 'Aspiring software engineer with backend focus',
                phone: '+91 98765 43211',
                placement_status: 'shortlisted'
            }
        ];
        
        for (const student of students) {
            await this.pool.query(
                `INSERT INTO students (user_id, skills, cgpa, linkedin, github, bio, phone, placement_status) 
                 VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
                [student.user_id, student.skills, student.cgpa, student.linkedin, student.github, student.bio, student.phone, student.placement_status]
            );
            console.log(`✅ Created student: ${student.user_id}`);
        }
    }

    async seedRecruiters(users) {
        const recruiterUser = users.find(u => u.role === 'recruiter');
        
        const recruiters = [
            {
                user_id: recruiterUser.id,
                company_name: 'Tech Corp India',
                website: 'https://techcorp.com',
                hr_name: 'Amit Kumar',
                hr_email: 'amit@techcorp.com',
                hr_phone: '+91 98765 43212',
                description: 'Leading technology company specializing in AI and Cloud Computing',
                industry: 'Technology',
                company_size: '500-1000 employees',
                headquarters: 'Bangalore',
                status: 'active'
            }
        ];
        
        for (const recruiter of recruiters) {
            await this.pool.query(
                `INSERT INTO recruiters (user_id, company_name, website, hr_name, hr_email, hr_phone, description, industry, company_size, headquarters, status)
                 VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
                [recruiter.user_id, recruiter.company_name, recruiter.website, recruiter.hr_name, recruiter.hr_email, recruiter.hr_phone, recruiter.description, recruiter.industry, recruiter.company_size, recruiter.headquarters, recruiter.status]
            );
            console.log(`✅ Created recruiter: ${recruiter.company_name}`);
        }
    }

    async seedJobs() {
        const [recruiters] = await this.pool.query('SELECT id FROM recruiters LIMIT 1');
        const recruiterId = recruiters[0]?.id;
        
        if (!recruiterId) return;
        
        const jobs = [
            {
                recruiter_id: recruiterId,
                title: 'Senior Frontend Developer',
                company: 'Tech Corp India',
                description: 'Looking for an experienced frontend developer to lead our UI team',
                skills_required: 'React, TypeScript, Next.js, Tailwind CSS',
                salary: '₹15-20 LPA',
                location: 'Bangalore',
                job_type: 'Full-time',
                experience: '3-5 years',
                deadline: '2024-12-31',
                status: 'active',
                applicants: 0
            },
            {
                recruiter_id: recruiterId,
                title: 'Backend Engineer',
                company: 'Tech Corp India',
                description: 'Join our backend team to build scalable APIs',
                skills_required: 'Node.js, Python, PostgreSQL, AWS',
                salary: '₹18-25 LPA',
                location: 'Hyderabad',
                job_type: 'Full-time',
                experience: '2-4 years',
                deadline: '2024-12-31',
                status: 'active',
                applicants: 0
            },
            {
                recruiter_id: recruiterId,
                title: 'Full Stack Developer',
                company: 'Tech Corp India',
                description: 'Exciting opportunity for a full stack developer',
                skills_required: 'React, Node.js, MongoDB, Express',
                salary: '₹12-18 LPA',
                location: 'Remote',
                job_type: 'Full-time',
                experience: '2-4 years',
                deadline: '2024-11-30',
                status: 'active',
                applicants: 0
            }
        ];
        
        for (const job of jobs) {
            const [result] = await this.pool.query(
                `INSERT INTO jobs (recruiter_id, title, company, description, skills_required, salary, location, job_type, experience, deadline, status, applicants)
                 VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
                [job.recruiter_id, job.title, job.company, job.description, job.skills_required, job.salary, job.location, job.job_type, job.experience, job.deadline, job.status, job.applicants]
            );
            console.log(`✅ Created job: ${job.title}`);
        }
    }

    async seedApplications() {
        const [students] = await this.pool.query('SELECT id FROM students LIMIT 2');
        const [jobs] = await this.pool.query('SELECT id FROM jobs LIMIT 3');
        
        const applications = [
            {
                student_id: students[0]?.id,
                job_id: jobs[0]?.id,
                status: 'Shortlisted',
                interview_date: '2024-03-25',
                interview_time: '11:00:00',
                interview_mode: 'Virtual'
            },
            {
                student_id: students[0]?.id,
                job_id: jobs[1]?.id,
                status: 'Interview',
                interview_date: '2024-03-28',
                interview_time: '14:00:00',
                interview_mode: 'Virtual'
            },
            {
                student_id: students[1]?.id,
                job_id: jobs[0]?.id,
                status: 'Applied'
            }
        ];
        
        for (const app of applications) {
            await this.pool.query(
                `INSERT INTO applications (student_id, job_id, status, interview_date, interview_time, interview_mode)
                 VALUES (?, ?, ?, ?, ?, ?)`,
                [app.student_id, app.job_id, app.status, app.interview_date || null, app.interview_time || null, app.interview_mode || null]
            );
            console.log(`✅ Created application`);
            
            // Update job applicants count
            await this.pool.query(
                `UPDATE jobs SET applicants = applicants + 1 WHERE id = ?`,
                [app.job_id]
            );
        }
    }

    async seedPlacementDrives() {
        const [tpo] = await this.pool.query('SELECT id FROM users WHERE role = "tpo" LIMIT 1');
        const createdBy = tpo[0]?.id;
        
        const drives = [
            {
                company: 'Google',
                date: '2024-03-25',
                time: '10:00:00',
                mode: 'Virtual',
                roles: 'Software Engineer, Data Scientist, Product Manager',
                eligibility_cgpa: 7.5,
                eligible_branches: 'Computer Science, Information Technology',
                package: '₹45-60 LPA',
                positions: 25,
                registration_deadline: '2024-03-20',
                created_by: createdBy,
                status: 'upcoming'
            },
            {
                company: 'Microsoft',
                date: '2024-04-05',
                time: '09:30:00',
                mode: 'On-Campus',
                roles: 'SDE, Cloud Engineer, Program Manager',
                eligibility_cgpa: 7.0,
                eligible_branches: 'Computer Science, Information Technology, Electronics',
                package: '₹40-55 LPA',
                positions: 30,
                registration_deadline: '2024-03-30',
                created_by: createdBy,
                status: 'upcoming'
            },
            {
                company: 'Amazon',
                date: '2024-03-28',
                time: '11:00:00',
                mode: 'Virtual',
                roles: 'SDE, Data Scientist',
                eligibility_cgpa: 7.0,
                eligible_branches: 'Computer Science, Information Technology',
                package: '₹35-50 LPA',
                positions: 40,
                registration_deadline: '2024-03-22',
                created_by: createdBy,
                status: 'upcoming'
            }
        ];
        
        for (const drive of drives) {
            await this.pool.query(
                `INSERT INTO placement_drives (company, date, time, mode, roles, eligibility_cgpa, eligible_branches, package, positions, registration_deadline, created_by, status)
                 VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
                [drive.company, drive.date, drive.time, drive.mode, drive.roles, drive.eligibility_cgpa, drive.eligible_branches, drive.package, drive.positions, drive.registration_deadline, drive.created_by, drive.status]
            );
            console.log(`✅ Created placement drive: ${drive.company}`);
        }
    }

    async seedChatHistory() {
        const [students] = await this.pool.query('SELECT id FROM users WHERE role = "student" LIMIT 1');
        const userId = students[0]?.id;
        
        if (!userId) return;
        
        const chats = [
            {
                user_id: userId,
                message: 'What skills should I learn for web development?',
                response: 'React, Node.js, Python, and JavaScript are essential for web development.'
            },
            {
                user_id: userId,
                message: 'How to prepare for interviews?',
                response: 'Practice coding problems daily, understand DSA concepts, and prepare your introduction.'
            }
        ];
        
        for (const chat of chats) {
            await this.pool.query(
                'INSERT INTO chat_history (user_id, message, response) VALUES (?, ?, ?)',
                [chat.user_id, chat.message, chat.response]
            );
            console.log(`✅ Created chat history`);
        }
    }
}

// Run seeder
const seeder = new DataSeeder();
seeder.seed();