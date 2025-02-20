# Task Scheduler

A modern task scheduling application with a web-based interface, built using React and Node.js.

## Features

- Create and manage tasks with deadlines
- Real-time task updates
- User-friendly interface built with React
- Secure authentication system
- Responsive design for desktop and mobile

## Tech Stack

### Frontend
- React with TypeScript
- Vite for build tooling
- TailwindCSS for styling
- React Router for navigation
- React Icons for UI elements

### Backend
- Node.js server
- RESTful API architecture
- Secure authentication

## Getting Started

### Prerequisites
- Node.js (v22 or higher)
- npm or yarn package manager

### Installation

1. Clone the repository:
```bash
git clone https://github.com/jyotiprakashmfsi/task-scheduler.git
cd task-scheduler
```

2. Install Frontend Dependencies:
```bash
cd client
npm install
```

3. Install Backend Dependencies:
```bash
cd ../server
npm install
```

4. Set up environment variables:
- Update the environment variables as needed

### Running the Application

1. Start the backend server:
```bash
cd server
npm run dev
```

The swagger docs of APIS will be available at `http://localhost:3000/docs`

2. Start the frontend development server:
```bash
cd client
npm run dev
```

The application will be available at `http://localhost:5173`

## Development

- Frontend development server runs on port 5173
- Backend API server runs on port 3000
- Use `npm run build` to create production builds

