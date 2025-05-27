# NoteFlow API

A robust, TypeScript-powered RESTful API for managing notes. Built for scalability, clarity, and performance.

## 🚀 Features

- 📚 CRUD operations for notes
- ✅ TypeScript for type safety
- ⚡️ Fast and optimized performance
- 🛡️ Input validation and error handling
- 🔐 JWT Authentication
- 📁 Organized project structure

## 🛠️ Tech Stack

- Node.js
- TypeScript
- Express 
- PostgreSQL
- dotenv
- esbuild / ts-node / tsc (edit depending on build method)

## 📂 Project Structure

noteflow-api/
├── src/
│ ├── controllers/
│ ├── routes/
│ ├── models/
│ ├── middlewares/
│ ├── utils/
│ └── index.ts
├── .env
├── .gitignore
├── package.json
├── tsconfig.json
└── README.md


## ⚙️ Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/oseijoel6111/noteflow-api.git
cd noteflow-api
```

### 2. Install dependencies
```bash
    npm install
```

### 3. Configure environment
```bash
    PORT=3000
    DB_URL=your_database_connection_string
    JWT_SECRET=your_jwt_secret

```