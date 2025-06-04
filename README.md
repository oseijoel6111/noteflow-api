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
##### Create a ```.env``` file in the root directory and define your configuration values. Below is a sample of what to include:
```bash
    # App configuration
APP_NAME=Noteflow
APP_VERSION=1.0.0
APP_EMAIL=no-reply@noteflow.org

PORT=4500
SALT_ROUNDS=10
GENERATE_CODE_LENGTH=6

# Database configuration
DB_HOST=your_db_host
DB_PORT=5432
DB_USERNAME=your_db_username
DB_PASSWORD=your_db_password
DB_NAME=your_db_name
DB_SYNC=true
DB_LOGGING=true

# Mail configuration
MAIL_HOST=your_mail_host
MAIL_PORT=your_mail_port
MAIL_USERNAME=your_mail_username
MAIL_PASSWORD=your_mail_password

# Redis configuration
REDIS_HOST=your_redis_host
REDIS_PORT=your_redis_port
REDIS_MAX_TRIES=3

# JWT configuration
JWT_SECRET=your_jwt_secret

```