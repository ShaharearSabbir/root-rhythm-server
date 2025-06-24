# Root Rhythm Backend 🌿 (API)

This repository contains the backend API for **Root Rhythm**, a full-stack web application designed to help plant enthusiasts manage their botanical collections with ease. This API serves as the central hub for all plant data, user authentication, and care management logic, providing a robust and scalable foundation for the Root Rhythm frontend application.

The API is built with Node.js and Express.js, leveraging MongoDB as its database. It's designed to be efficient, secure, and ready for deployment as a serverless function on platforms like Vercel.

---

## ✨ Top Features

-   **User & Plant Data Management:** Securely handles user profiles and comprehensive CRUD (Create, Read, Update, Delete) operations for plant records.
-   **Organized Data Retrieval:** Provides endpoints for fetching plants by user, category, latest additions, and care level (e.g., easy).
-   **RESTful API Endpoints:** A well-defined set of API endpoints for seamless interaction with the frontend application.
-   **CORS Configuration:** Securely configured for cross-origin requests from the Root Rhythm frontend application.

### 📍 API Endpoints

Below are the main API endpoints provided by the Root Rhythm backend:

| Endpoint                 | Method | Description                                                                 | Request Body (Example)                                                      |
| :----------------------- | :----- | :-------------------------------------------------------------------------- | :-------------------------------------------------------------------------- |
| `/users`                 | `POST` | Creates a new user profile.                                                 | `{ uid: "firebaseUid", email: "user@example.com", ... }`                  |
| `/user/:uid`             | `GET`  | Retrieves a single user's profile by their unique ID.                       | _None_                                                                      |
| `/home`                  | `GET`  | Fetches categories, latest plants, and easy care plants for the homepage.   | _None_                                                                      |
| `/category`              | `POST` | Adds a new plant category.                                                  | `{ category: "Tropical" }`                                                  |
| `/categories`            | `GET`  | Retrieves all available plant categories.                                   | _None_                                                                      |
| `/category/:category`    | `GET`  | Retrieves plants belonging to a specific category.                          | _None_                                                                      |
| `/plant`                 | `POST` | Creates a new plant record.                                                 | `{ name: "Fiddle Leaf Fig", category: "Tropical", ... }`                    |
| `/plants`                | `GET`  | Retrieves all plant records. Supports sorting by query parameters (`sortBy`, `order`). | _None_ (`/plants?sortBy=createdAt&order=descending`)                          |
| `/latest`                | `GET`  | Retrieves the 6 most recently added plants.                                 | _None_                                                                      |
| `/plant/:id`             | `GET`  | Retrieves a single plant record by its MongoDB `_id`.                       | _None_                                                                      |
| `/plants/:uid`           | `GET`  | Retrieves all plants associated with a specific user ID.                    | _None_                                                                      |
| `/plant/:id`             | `PUT`  | Updates an existing plant record by its MongoDB `_id`.                      | `{ name: "Updated Name", careLevel: "medium", ... }`                        |
| `/plant/:id`             | `DELETE` | Deletes a plant record by its MongoDB `_id`.                                | _None_                                                                      |
| `/`                      | `GET`  | Basic route to confirm the server is running.                               | _None_                                                                      |

---

## 🛠️ Technologies Used

-   **Node.js:** JavaScript runtime environment.
-   **Express.js:** Fast, unopinionated, minimalist web framework for Node.js.
-   **MongoDB:** NoSQL database for flexible and scalable data storage.
-   **MongoDB Node.js Driver:** Official driver for connecting to and interacting with MongoDB.
-   **`cors`:** Node.js package for providing a Connect/Express middleware to enable Cross-Origin Resource Sharing.
-   **`dotenv`:** Loads environment variables from a `.env` file into `process.env`.

---

## 🚀 Getting Started

To get the Root Rhythm backend API up and running on your local machine, follow these steps:

### Prerequisites

Ensure you have:
-   Node.js (v18 or higher recommended)
-   npm or Yarn
-   A MongoDB Atlas cluster (recommended for ease of use) or a local MongoDB instance.

### Setup & Run Instructions

1.  **Clone the Repository:**
    Start by cloning the backend repository to your local machine and navigating into its directory:
    ```bash
    git clone [https://github.com/ShaharearSabbir/root-rhythm-server](https://github.com/ShaharearSabbir/root-rhythm-server)
    cd root-rhythm-server
    ```

2.  **Install Dependencies:**
    Install all the necessary Node.js packages:
    ```bash
    npm install
    # or
    yarn install
    ```

3.  **Configure Environment Variables:**
    Create a file named `.env` in the **root directory** of the project (the same directory as `index.js` or `server.js`). Add the following lines to this `.env` file, replacing the placeholder values with your actual credentials:
    ```env
    DB_USER=your_mongodb_username
    DB_PASS=your_mongodb_password
    PORT=5000
    ```
    -   **`DB_USER`**: Your MongoDB Atlas database username.
    -   **`DB_PASS`**: Your MongoDB Atlas database password.
    -   **`PORT`**: The port number on which the server will run (e.g., `5000`).

    **Important:** Never commit your `.env` file to version control (Git)! It should be listed in your `.gitignore` file to prevent exposing sensitive credentials.

4.  **Run the Server:**
    Finally, start the backend server:
    ```bash
    npm start
    # or
    node index.js
    ```
    The server should start on the specified port (defaulting to 5000) and you'll see a confirmation message in your console, such as: `plant is growing on http://localhost:5000`.

---
