# ShelfShare

Welcome to ShelfShare - the book swap application. This web application allows users to browse, swap, and manage books with others in their local area. It features a user-friendly interface, real-time notifications, and a comprehensive user profile management system.

### Deployed Version
Check out the live version of the application [here](https://p01--shelfshare-fe--4cxwyhlvb2mb.code.run/).

## Project Overview

This application was built with the goal of facilitating the exchange of books between users. The platform allows users to:

- Browse a curated list of available books.
- Request swaps with other users.
- Manage their book listings and swap requests from a dedicated profile page.
- Receive notifications about swap statuses and messages from other users.


## Features

### Book Browsing and Filtering:

- A list of available books is displayed with individual book cards showing book details.
- Users can filter results by location and genre, and sort by author.
- Pagination is implemented for easy navigation through large lists of books.

### Book Details and Swap Request:

- Each book has a unique ID that links it to a detailed book page featuring more information and user details.
- Users can initiate swap requests directly from the book details page, which triggers notifications for the recipient.

### User Profile:

- Logged-in users have access to a unique profile page where they can manage their profile information, view their posted books, and handle incoming and outgoing swap requests.


### Homepage:

- It includes a map displaying book locations, helping users find books in their local area.
- The page also contains an introduction to the app and book suggestions.

### Book Posting:

- Users can add a books they wish to swap through a dedicated form on the "Add Book" page, including details like title, author, and Image URL.

## Tech Stack
The following technologies were used in the development of this application:

- Frontend: Next.js, React, Material-UI (MUI)
- Backend: Express, Node.js, Mongoose
- Database: MongoDB
- HTTP Client: Axios
- Testing: Jest, Supertest
- Containerization: Docker
- Deployment: Northflank

## Getting Started

### Prerequisites
Before you start, ensure you have the following installed on your machine:
- Node.js (v14 or higher)
- Docker

### Installation
1. Clone the repository:
```
git clone https://github.com/Yana23-sys/ShelfShare.git
cd shelfshare
```
2. Install dependencies for both frontend and backend:
```
cd frontend
npm install
cd ../backend
npm install
```

### Running the Application
1. Start the backend server:
```
cd backend
npm start
```
2. Start the frontend development server:
```
cd frontend
npm run dev
```
3. Open your browser and navigate to http://localhost:3000

## Testing 
This project includes unit and integration tests to ensure functionality.

Running tests:
```
cd backend
npm test
```
Supertest and Jest are used for API endpoint testing. You can find the test files in the `__tests__` directory inside the backend folder.

## Continuous Integration

This project uses GitHub Actions for automated deployment with manual triggering. The process ensures that each push to the repository can result in a deployable Docker image, ready for use on Northflank.


## Deployment Workflow
1. Push changes to the GitHub repository.
2. GitHub Actions provides a manual workflow for building and publishing the Docker image.
3. To initiate the deployment:
    - Navigate to the GitHub Actions tab in your repository.
    - Locate the workflow named "Publish to Docker Hub Registry".
    - Click on "Run workflow" to manually trigger the process.

4. The workflow will:

    - Build a new Docker image based on the latest code.
    - Push the image to the specified Docker Hub registry.

5. Once the Docker image is published, it can be pulled and deployed on Northflank.

## Notes
- The workflow is designed to be triggered manually to provide flexibility in managing when the Docker image is built and published.
- The Docker image remains available in Docker Hub for deployment to your chosen environments.

--- 
This project was developed as part of the Digital Skills Bootcamp in Software Engineering provided by [Northcoders](https://northcoders.com/).