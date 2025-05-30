# Bookstagram

Bookstagram is a full-stack book-sharing platform built with the MERN stack (MongoDB, Express.js, React.js, Node.js). It allows users to browse, share, and manage books through an interactive web interface. The project includes containerization with Docker and automated CI/CD using Jenkins to ensure smooth development and deployment.

---

## Features

- User registration and login with JWT-based authentication
- Browse, add, update, and delete books
- Responsive React.js frontend with real-time updates
- RESTful backend API built with Express.js and Node.js
- MongoDB Atlas cloud database for scalable, secure storage
- API testing with Postman collections
- Docker containerization for frontend and backend
- Multi-container orchestration with Docker Compose
- Automated CI/CD pipeline using Jenkins for build, test, and deployment

---

## Technologies Used

- **Frontend:** React.js, CSS3, HTML5, Nginx (for serving production build)
- **Backend:** Node.js, Express.js, JWT Authentication, MVC architecture
- **Database:** MongoDB Atlas, Mongoose ODM
- **DevOps:** Docker, Docker Compose, Jenkins CI/CD
- **Testing:** Postman for API testing
- **Deployment:** Netlify (frontend), Render (backend)

---

## Project Structure



Bookstagram/
│
├── backend/              # Backend server and API
│   ├── config/           # Configuration files (DB connection, environment)
│   ├── middleware/       # Middleware functions (auth, error handling)
│   ├── models/           # Mongoose schemas for MongoDB
│   ├── routes/           # Express routes for API endpoints
│   ├── validation/       # Request validation logic
│   ├── Dockerfile        # Dockerfile for backend service
│   ├── server.js         # Entry point of backend application
│   ├── package.json
│   └── shuffle.js        # Utility/helper script
│
├── client/               # React frontend
│   ├── public/           # Static files
│   ├── src/              # React source code
│   ├── Dockerfile        # Dockerfile for frontend service
│   ├── nginx.conf        # Nginx config for serving frontend in production
│   ├── package.json
│   └── package-lock.json
│
├── docker-compose.yml    # Docker Compose file to run multi-container app
└── README.md             # Project documentation

````

---

## Getting Started

### Prerequisites

- Node.js and npm installed
- Docker and Docker Compose installed (for containerized setup)
- MongoDB Atlas account for cloud database
- Jenkins setup (optional, for automated CI/CD pipeline)

### Installation and Setup

1. Clone the repository:

   ```bash
   git clone https://github.com/kumarshivam27december/Devops_project.git
   cd Devops_project
````

2. Configure backend environment variables by creating a `.env` file inside the `backend/` directory:

   ```
   PORT=5000
   MONGO_URI=<Your MongoDB Atlas connection string>
   JWT_SECRET=<Your JWT secret>
   ```

3. Install dependencies:

   * Backend:

     ```bash
     cd backend
     npm install
     ```

   * Frontend:

     ```bash
     cd ../client
     npm install
     ```

### Running Locally

* Start the backend server:

  ```bash
  cd backend
  npm start
  ```

* Start the frontend development server:

  ```bash
  cd ../client
  npm start
  ```

By default, frontend runs on `http://localhost:3000` and backend on `http://localhost:5000`.

---

## Running with Docker

1. Use Docker Compose to build and run both frontend and backend containers:

   ```bash
   docker-compose up --build
   ```

2. The frontend and backend will be accessible on their configured ports inside the containers.

---

## CI/CD Pipeline

* Jenkins is configured to trigger builds and deployments automatically on GitHub code pushes.
* Docker images for both services are built and pushed to Docker Hub.
* The backend is deployed on Render, and the frontend on Netlify for continuous deployment.

---

## API Testing

* Postman collections are included for testing all API endpoints.
* Postman was used to validate authentication, CRUD operations, and error handling during development.

---

## Acknowledgements

* MongoDB Atlas for cloud database services
* Netlify and Render for simplified deployment
* Postman for API testing tools
* Docker and Jenkins for DevOps automation

---
