-- ============================================
-- PLACEMENT PORTAL DATABASE SCHEMA
-- ============================================

-- Create database
CREATE DATABASE IF NOT EXISTS placement_portal;
USE placement_portal;

-- ============================================
-- 1. USERS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    name VARCHAR(100) NOT NULL,
    role ENUM('student', 'recruiter', 'tpo') NOT NULL,
    department VARCHAR(100),
    year INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- ============================================
-- 2. STUDENTS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS students (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    skills TEXT,
    cgpa DECIMAL(3,2),
    resume_url VARCHAR(255),
    portfolio VARCHAR(255),
    linkedin VARCHAR(255),
    github VARCHAR(255),
    bio TEXT,
    phone VARCHAR(20),
    address TEXT,
    city VARCHAR(100),
    state VARCHAR(100),
    pincode VARCHAR(10),
    date_of_birth DATE,
    gender ENUM('Male', 'Female', 'Other'),
    placement_status ENUM('applied', 'shortlisted', 'interview', 'offered', 'selected', 'rejected', 'not_applied') DEFAULT 'not_applied',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- ============================================
-- 3. RECRUITERS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS recruiters (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    company_name VARCHAR(200),
    website VARCHAR(255),
    hr_name VARCHAR(100),
    hr_email VARCHAR(100),
    hr_phone VARCHAR(20),
    description TEXT,
    industry VARCHAR(100),
    company_size VARCHAR(50),
    headquarters VARCHAR(100),
    founded YEAR,
    logo VARCHAR(255),
    cover_image VARCHAR(255),
    status ENUM('active', 'pending', 'inactive') DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- ============================================
-- 4. JOBS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS jobs (
    id INT PRIMARY KEY AUTO_INCREMENT,
    recruiter_id INT NOT NULL,
    title VARCHAR(200) NOT NULL,
    company VARCHAR(200) NOT NULL,
    description TEXT,
    skills_required TEXT,
    salary VARCHAR(50),
    location VARCHAR(100),
    job_type ENUM('Full-time', 'Part-time', 'Internship', 'Contract') DEFAULT 'Full-time',
    experience VARCHAR(50),
    deadline DATE,
    status ENUM('active', 'closed', 'draft') DEFAULT 'active',
    applicants INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (recruiter_id) REFERENCES recruiters(id) ON DELETE CASCADE
);

-- ============================================
-- 5. APPLICATIONS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS applications (
    id INT PRIMARY KEY AUTO_INCREMENT,
    student_id INT NOT NULL,
    job_id INT NOT NULL,
    status ENUM('Applied', 'Reviewed', 'Shortlisted', 'Interview', 'Offered', 'Selected', 'Rejected') DEFAULT 'Applied',
    applied_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    interview_date DATE,
    interview_time TIME,
    interview_mode ENUM('Virtual', 'On-site', 'Phone') DEFAULT 'Virtual',
    interview_link VARCHAR(255),
    notes TEXT,
    FOREIGN KEY (student_id) REFERENCES students(id) ON DELETE CASCADE,
    FOREIGN KEY (job_id) REFERENCES jobs(id) ON DELETE CASCADE
);

-- ============================================
-- 6. PLACEMENT DRIVES TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS placement_drives (
    id INT PRIMARY KEY AUTO_INCREMENT,
    company VARCHAR(200) NOT NULL,
    date DATE,
    time TIME,
    mode ENUM('Virtual', 'On-Campus', 'Off-Campus') DEFAULT 'Virtual',
    location VARCHAR(200),
    description TEXT,
    roles TEXT,
    eligibility_cgpa DECIMAL(3,2),
    eligible_branches TEXT,
    package VARCHAR(50),
    positions INT,
    registration_deadline DATE,
    created_by INT,
    status ENUM('upcoming', 'ongoing', 'completed') DEFAULT 'upcoming',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (created_by) REFERENCES users(id) ON DELETE SET NULL
);

-- ============================================
-- 7. DRIVE REGISTRATIONS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS drive_registrations (
    id INT PRIMARY KEY AUTO_INCREMENT,
    drive_id INT NOT NULL,
    student_id INT NOT NULL,
    registered_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    attended BOOLEAN DEFAULT FALSE,
    shortlisted BOOLEAN DEFAULT FALSE,
    selected BOOLEAN DEFAULT FALSE,
    FOREIGN KEY (drive_id) REFERENCES placement_drives(id) ON DELETE CASCADE,
    FOREIGN KEY (student_id) REFERENCES students(id) ON DELETE CASCADE,
    UNIQUE KEY unique_registration (drive_id, student_id)
);

-- ============================================
-- 8. CHAT HISTORY TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS chat_history (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    message TEXT,
    response TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- ============================================
-- 9. NOTIFICATIONS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS notifications (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    title VARCHAR(200),
    message TEXT,
    type ENUM('info', 'success', 'warning', 'error') DEFAULT 'info',
    is_read BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- ============================================
-- 10. CREATE INDEXES FOR PERFORMANCE
-- ============================================
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_role ON users(role);
CREATE INDEX idx_students_user_id ON students(user_id);
CREATE INDEX idx_recruiters_user_id ON recruiters(user_id);
CREATE INDEX idx_jobs_recruiter_id ON jobs(recruiter_id);
CREATE INDEX idx_jobs_status ON jobs(status);
CREATE INDEX idx_applications_student_id ON applications(student_id);
CREATE INDEX idx_applications_job_id ON applications(job_id);
CREATE INDEX idx_applications_status ON applications(status);
CREATE INDEX idx_placement_drives_date ON placement_drives(date);
CREATE INDEX idx_chat_history_user_id ON chat_history(user_id);