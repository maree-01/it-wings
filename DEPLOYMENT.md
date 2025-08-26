# Deployment Guide for IT Wings Website

## Quick Deployment Steps

### 1. Free PHP Hosting (Recommended for Testing)

#### Option A: InfinityFree
1. Sign up at https://infinityfree.net/
2. Create a new account and subdomain (e.g., `itwings.epizy.com`)
3. Upload files via File Manager or FTP
4. Create MySQL database in control panel
5. Update `config.php` with database credentials

#### Option B: 000webhost
1. Sign up at https://www.000webhost.com/
2. Create website and get subdomain (e.g., `itwings.000webhostapp.com`)
3. Use File Manager to upload files
4. Create database and update config

### 2. Custom Domain Setup

#### Purchase Domain:
- **Namecheap**: https://www.namecheap.com/ (Recommended)
- **GoDaddy**: https://www.godaddy.com/
- **Google Domains**: https://domains.google.com/

#### Connect Domain:
1. In hosting control panel, add your domain
2. Update nameservers at domain registrar:
   - InfinityFree: `ns1.epizy.com`, `ns2.epizy.com`
   - 000webhost: `ns01.000webhost.com`, `ns02.000webhost.com`
3. Wait 24-48 hours for DNS propagation

### 3. File Upload Process

#### Via File Manager:
1. Login to hosting control panel
2. Open File Manager
3. Navigate to `public_html` or `htdocs` folder
4. Upload all files from your local website folder
5. Extract if uploaded as ZIP

#### Via FTP:
```
Host: ftp.yourdomain.com (or provided by hosting)
Username: your_ftp_username
Password: your_ftp_password
Port: 21
```

### 4. Database Configuration

#### Create Database:
1. Go to MySQL Databases in hosting panel
2. Create new database (e.g., `itwings_db`)
3. Create database user and assign to database
4. Note down: hostname, database name, username, password

#### Update Config:
1. Rename `config.prod.php` to `config.php`
2. Update database credentials:
```php
$DB_HOST = 'localhost';  // or provided hostname
$DB_USER = 'your_db_user';
$DB_PASS = 'your_db_password';
$DB_NAME = 'your_db_name';
```

### 5. Test Your Website
1. Visit your domain/subdomain
2. Test contact form submission
3. Check if data is saved in database

### 6. SSL Certificate (HTTPS)
- Most free hosting providers offer free SSL
- Enable in hosting control panel
- Force HTTPS redirect if available

## Troubleshooting

### Common Issues:
1. **500 Error**: Check file permissions (755 for folders, 644 for files)
2. **Database Error**: Verify credentials in config.php
3. **Contact Form Not Working**: Check submit_contact.php path
4. **Images Not Loading**: Check file paths are relative

### Support:
- Check hosting provider documentation
- Contact hosting support for technical issues
- Verify PHP version compatibility (7.4+ recommended)
