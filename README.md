# Issue Tracker

A simple web application for tracking and managing issues.

## What is it?

This application allows users to create, update, and delete issues. It also provides a summary view of all issues and a detailed view of each issue.

## Features

- Issue Management: Create, edit, assign, and track issues with relevant metadata such as status and assignees.

- Filtering & Sorting: Easily filter and sort issues based on status and labels users for better organization.

- User Authentication: Secure login and authentication system using NextAuth.js to manage user permissions.

- Markdown Support: Issues and comments support Markdown formatting for better readability and structuring.

- Responsive Design: Fully responsive layout, optimized for both desktop and mobile devices.

## What technologies were used?

This application was built using the following technologies:

- Next.js for the frontend
- Prisma for the database
- Tailwind CSS for styling
- React Hook Form for form handling
- React Query for data fetching and caching
- React SimpleMDE for the markdown editor
- Lucide Icons for icons
- Zod for validation

## How to use this app?

1. Clone the repository and run `npm install` to install all dependencies.
2. Run `npm run dev` to start the development server.
3. Open the application in your browser at `http://localhost:3000`.
4. Create an account and log in to start creating and managing issues.
5. Use the navigation bar to switch between the summary and detailed views of issues.
6. Use the form to create, update, and delete issues.

## Set up your .env file

Before running the app, create a .env.local file in the root directory and configure the following environment variables:

```
DATABASE_URL=your_db_url

# Auth
AUTH_SECRET=your_auth_secret
AUTH_GOOGLE_ID=your_google_id
AUTH_GOOGLE_SECRET=your_google_secret
NEXTAUTH_URL=http://localhost:3000

```
