# 📝 Notes App - MERN Stack (with MySQL)

A full-stack notes application built with the MERN stack (MySQL, Express.js, React.js, Node.js). This application allows users to create, read, update, and delete notes with a modern and responsive user interface.

## 🚀 Features

- ✅ Create, Read, Update, and Delete (CRUD) operations for notes
- 🔐 User authentication and authorization
- 📱 Responsive design for mobile and desktop
- 🎨 Modern and intuitive UI
- 🔒 Secure backend API
- 💾 MySQL database for data persistence
- ⚡ Fast and efficient performance

## 🛠️ Technologies Used

### Frontend
- **React.js** - JavaScript library for building user interfaces
- **React Hooks** - useState, useEffect for state management
- **Axios** - Promise-based HTTP client for API calls
- **React Router DOM** - Client-side routing
- **CSS/Tailwind CSS** - Styling and responsive design
- **Vite** - Fast build tool and development server

### Backend
- **Node.js** - JavaScript runtime environment
- **Express.js** - Web application framework
- **MySQL** - Relational database management system
- **MySQL2** - ORM for MySQL database
- **JWT (JSON Web Tokens)** - Authentication and authorization
- **bcrypt.js** - Password hashing
- **dotenv** - Environment variable management
- **CORS** - Cross-Origin Resource Sharing
- **Express Validator** - Input validation

## 📋 Prerequisites

Before running this project, make sure you have the following installed:

- Node.js (v14 or higher)
- npm or yarn
- MySQL (v5.7 or higher) or MySQL Workbench
- Git

## 🔧 Installation & Setup

### 1. Clone the repository

```bash
git clone https://github.com/YOUR_USERNAME/notes-app-mern.git
cd notes-app-mern
```

### 2. Backend Setup

```bash
# Navigate to backend folder
cd backend

# Install dependencies
npm install

# Create .env file
touch .env - Mention your secure credentials
```


```bash
# Create MySQL database
# Login to MySQL
mysql -u root -p

# Create database
CREATE DATABASE notesapp;
exit;

# Start backend server
npm start
# OR for development with auto-reload
npm run dev
```

Backend will run on `http://localhost:5000`

### 3. Frontend Setup

```bash
# Open new terminal and navigate to frontend folder
cd frontend

# Install dependencies
npm install

# Create .env file (if needed)
touch .env
```

Add the following to frontend `.env`:

```env
VITE_API_URL=http://localhost:5000/api
```

```bash
# Start frontend development server
npm run dev
```

Frontend will run on `http://localhost:5173` (or another port if 5173 is busy)


## 🔑 API Endpoints

### Authentication Routes
```
POST   /api/auth/register    - Register new user
POST   /api/auth/login       - Login user
GET    /api/auth/user        - Get current user (protected)
```

### Notes Routes
```
GET    /api/notes            - Get all notes for logged-in user (protected)
GET    /api/notes/:id        - Get single note (protected)
POST   /api/notes            - Create new note (protected)
PUT    /api/notes/:id        - Update note (protected)
DELETE /api/notes/:id        - Delete note (protected)
```

## 💡 Key Concepts & Features Implemented

### Frontend Concepts
- ⚛️ React functional components
- 🎣 React Hooks (useState, useEffect, useContext, useNavigate)
- 🛣️ React Router for navigation and routing
- 🔄 Context API for global state management
- 📡 Axios for HTTP requests
- 🎨 Responsive design principles
- 🔐 Protected routes and authentication flow
- ⚠️ Form validation and error handling

### Backend Concepts
- 🏗️ RESTful API architecture
- 🔒 JWT-based authentication
- 🛡️ Password hashing with bcrypt
- ✅ Input validation and sanitization
- 🚦 Middleware for authentication and error handling
- 📊 MySQL database design with Sequelize ORM
- 🔗 Database relationships (User-Notes with foreign keys)
- 🌐 CORS configuration
- 🔧 Environment variable management
- 🗄️ SQL queries and database operations

## 🖥️ Usage

1. **Register**: Create a new account with email and password
2. **Login**: Sign in with your credentials
3. **Create Note**: Click "Add Note" button to create a new note
4. **View Notes**: All your notes are displayed on the dashboard
5. **Edit Note**: Click on edit icon to modify a note
6. **Delete Note**: Click on delete icon to remove a note
7. **Logout**: Click logout button to end session

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a new branch (`git checkout -b feature/YourFeature`)
3. Commit your changes (`git commit -m 'Add some feature'`)
4. Push to the branch (`git push origin feature/YourFeature`)
5. Open a Pull Request

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 👤 Author

**Sadham Hussain**
- GitHub: https://github.com/sadhamhussain13
- LinkedIn: https://www.linkedin.com/in/sadhamhussain-webdeveloper

## 🙏 Acknowledgments

- MySQL Documentation
- React Documentation
- Express.js Documentation
- Node.js Documentation

---

⭐ If you found this project helpful, please give it a star!

**Made with ❤️ by Sadham Hussain**