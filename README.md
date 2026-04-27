# PlaceWise

PlaceWise is a comprehensive placement preparation portal designed to help students and professionals prepare for technical interviews, aptitude tests, and company-specific recruitment processes.

## Tech Stack
- **Frontend**: React, Vite, Tailwind-like custom CSS (Glassmorphism & Dark Mode)
- **Backend**: Node.js, Express.js
- **Database**: MongoDB (Mongoose)

## Prerequisites
Before you begin, ensure you have the following installed:
- [Node.js](https://nodejs.org/) (v16 or higher)
- [npm](https://www.npmjs.com/) (Node Package Manager)
- A running MongoDB instance (or connection string)

## How to Run the Project Locally

To run the full application, you need to start both the Backend API Server and the Frontend Development Server concurrently.

### 1. Start the Backend Server

The backend manages user authentication, company data, and all the placement preparation questions.

1. Open a new terminal.
2. Navigate into the `server` directory:
   ```bash
   cd server
   ```
3. Install the backend dependencies:
   ```bash
   npm install
   ```
4. Set up the environment variables:
   Ensure there is a `.env` file in the `server` directory containing your `MONGO_URI` and `JWT_SECRET`. 
   *(Note: The repository already contains a configured `.env` file for development.)*
5. Run the backend server:
   ```bash
   node index.js
   ```
   *You should see a message indicating the server is running on port 5001 and connected to MongoDB.*

### 2. Start the Frontend App

The frontend is the React application that users and administrators interact with.

1. Open a **second**, separate terminal.
2. Ensure you are in the root directory of the project (`placewise`):
   ```bash
   cd placewise
   ```
3. Install the frontend dependencies:
   ```bash
   npm install
   ```
4. Start the Vite development server:
   ```bash
   npm run dev
   ```
5. Open your browser and navigate to the URL provided by Vite (usually `http://localhost:5173`).

---

## Admin Panel Access

The application features a secure, company-centric Admin Dashboard to manage placement resources.
- **Access Route**: Navigate to `/admin` or click "Admin Login" from the main login screen.
- **Default Credentials**: 
  - Username: `admin`
  - Password: `123`

*(Inside the Admin Dashboard, you can add new companies, edit their statuses, and drill down into individual companies to manage their specific Coding, Aptitude, Verbal, and Logical reasoning questions.)*

## Database Seeding (Optional)
If you need to reset or populate the database with initial dummy companies and questions, you can run the seed script:
```bash
cd server
node seed3.js
```
