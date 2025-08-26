# IT Wings Website

A modern, responsive website for IT Wings Software Solutions featuring:

## Features
- Modern responsive design with animated banner slider
- DevOps showcase with interactive elements
- Contact form with PHP backend and database storage
- Technology showcase section
- Portfolio and services sections

## Tech Stack
- **Frontend**: HTML5, CSS3, JavaScript
- **Backend**: PHP
- **Database**: MySQL
- **Hosting**: Compatible with cPanel, Heroku, or any PHP hosting

## Local Development
1. Install XAMPP/WAMP/LAMP
2. Place files in `htdocs/website/` directory
3. Create MySQL database `itwings`
4. Run the SQL commands in `config.php` to create tables
5. Access via `http://localhost/website/`

## Database Setup
```sql
CREATE DATABASE itwings CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE itwings;
CREATE TABLE contact_messages (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(150) NOT NULL,
  phone VARCHAR(50),
  service VARCHAR(100),
  message TEXT NOT NULL,
  ip_address VARCHAR(45),
  user_agent VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

## Deployment Options

### Option 1: GitHub Pages (Static Only)
- Only HTML/CSS/JS will work
- Contact form will not save to database
- Enable GitHub Pages in repository settings

### Option 2: Free PHP Hosting
- **InfinityFree**: https://infinityfree.net/
- **000webhost**: https://www.000webhost.com/
- **AwardSpace**: https://www.awardspace.com/

### Option 3: Paid Hosting
- **Hostinger**: https://www.hostinger.com/
- **GoDaddy**: https://www.godaddy.com/
- **Namecheap**: https://www.namecheap.com/

## Domain Setup
1. Purchase domain from registrar (GoDaddy, Namecheap, etc.)
2. Update nameservers to point to your hosting provider
3. Add domain in hosting control panel
4. Update DNS records if needed

## Environment Configuration
Create `.env` file for production:
```
DB_HOST=your_db_host
DB_USER=your_db_user
DB_PASS=your_db_password
DB_NAME=your_db_name
```

## Contact
- Email: info@itwings.com
- Phone: +91 6385792887
- Address: Sivakasi, Tamil Nadu - 626123
