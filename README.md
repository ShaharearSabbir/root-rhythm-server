# Root Rhythm Backend 🌿 (API)

This repository contains the backend API for **Root Rhythm**, a full-stack web application designed to help plant enthusiasts manage their botanical collections with ease. This API serves as the central hub for all plant data, user authentication, and care management logic, providing a robust and scalable foundation for the Root Rhythm frontend application.

The API is built with Node.js and Express.js, leveraging MongoDB as its database. It's designed to be efficient, secure, and ready for deployment as a serverless function on platforms like Vercel.

---

## ✨ Features

- **RESTful API Endpoints:** Provides a comprehensive set of API endpoints for managing plant records (Create, Read, Update, Delete operations).
- **User Management:** Handles user authentication and authorization, ensuring secure access to personalized plant data.
- **Plant Data Storage:** Stores detailed plant information, including names, categories, descriptions, care levels, and health status.
- **Care Scheduling Logic:** Manages watering frequencies and calculates next watering dates based on user input.
- **Image Handling Integration:** Designed to work with external image hosting services (e.g., imgBB) for plant photo uploads, storing image URLs.
- **CORS Enabled:** Configured to allow secure cross-origin requests from the Root Rhythm frontend application.

---

## 🛠️ Technologies Used

- **Node.js:** JavaScript runtime environment.
- **Express.js:** Fast, unopinionated, minimalist web framework for Node.js.
- **MongoDB:** NoSQL database for flexible and scalable data storage.
- **MongoDB Node.js Driver:** Official driver for connecting to and interacting with MongoDB.
- **`cors`:** Node.js package for providing a Connect/Express middleware to enable Cross-Origin Resource Sharing.
- **`dotenv`:** Loads environment variables from a `.env` file into `process.env`.

---

## 🚀 Getting Started

Follow these steps to get the Root Rhythm backend API up and running on your local machine.

### Prerequisites

- Node.js (v18 or higher recommended)
- npm or Yarn
- MongoDB (a local instance or a cloud service like MongoDB Atlas)

### 1. Clone the Repository

```bash
git clone <your-backend-repository-url>
cd root-rhythm-backend # Or whatever your backend folder is named
```
