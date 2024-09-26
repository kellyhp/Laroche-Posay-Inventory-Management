# La Roche-Posay Inventory Management Dashboard

## Overview

This project is a full-stack inventory management dashboard designed for managing La Roche-Posay products. 
It leverages a robust tech stack, including Next.js, Tailwind, Redux Toolkit, and several AWS services, 
to provide a comprehensive solution for product management, data analytics, and user experience. For the sake of my credit card,
I'm using Vercel and Render to mimic what I did for the AWS services.

## Tech Stack

### Frontend
- **Next.js**: A React framework that enables server-side rendering and static site generation.
- **Tailwind CSS**: A utility-first CSS framework for styling and responsive design.
- **Redux Toolkit**: A library for managing application state in a predictable way.
- **Redux Toolkit Query**: An efficient tool for data fetching and caching, integrated with Redux.
- **Material UI Data Grid**: A powerful component for displaying and manipulating tabular data.

### Backend
- **Node.js**: A JavaScript runtime for building server-side applications.
- **Prisma**: An ORM (Object-Relational Mapping) tool that simplifies database interactions with PostgreSQL.

### Cloud Infrastructure
- **AWS EC2**: Virtual servers for running applications and services.
- **AWS RDS**: Managed relational database service for storing and managing data, using PostgreSQL.
- **AWS API Gateway**: A service for creating and managing APIs, allowing communication between the frontend and backend.
- **AWS Amplify**: A platform for building and deploying full-stack applications.
- **AWS S3**: Object storage service for storing images and other assets.

## Features

- **CRUD Operations**: Create, Read, Update, and Delete operations for managing product data.
- **Dynamic Pages**: Generate dynamic pages based on product ID for detailed views.
- **Complex Data Handling**: Efficiently handle data fetching and state management using Redux Toolkit Query.
- **Search Functionality**: Implement search queries to filter products based on user input.
- **Light/Dark Mode**: Toggle between light and dark themes using Tailwind CSS.
- **Data Analytics Visualizations**: Visualize product data for insights and decision-making.

## Project Architecture

The project is structured into two main components: frontend and backend.

### Frontend
The frontend is built using Next.js and is deployed on AWS Amplify(Vercel for showcase). It interacts with the backend through API Gateway and consumes the REST APIs for product management and search functionality.

### Backend
The backend is built with Node.js and Prisma. It uses AWS RDS(Render for showcase) for the PostgreSQL database, and the API Gateway routes requests to the appropriate endpoints for product CRUD operations and search queries.

## Database Usage

### PostgreSQL
The application utilizes PostgreSQL as its database management system, accessed through AWS RDS. It manages product data, including fields such as:
- `productId`: Unique identifier for each product.
- `name`: Name of the product.
- `price`: Price of the product.
- `stockQuantity`: Current stock level of the product.
- `rating`: Average user rating for the product.

## Environment Setup

### Backend
1. **Install Dependencies**:
   ```
   npm install
   ```
2. **Set Up Environment Variables:** \
   Create a .env file in the backend root and add the following configuration parameters:
   ```
   DATABASE_URL="postgresql:/your_database_url"
   PORT=8000
   ```
3. **Run the backend**:
   ```
   npm run dev
   ```

### Frontend
1. Install Dependencies:
   ```
   npm install
   ```
2. **Set Up Environment Variables:** \
   Create a .env file in the backend root and add the following configuration parameters:
   ```
   NEXT_PUBLIC_API_BASE_URL= url
   ```
3. **Run the frontend**:
   ```
   npm run dev
   ```

## Deployment Process

### AWS Amplify (Frontend)
1. Configure AWS Amplify:
- Connect your frontend repository to AWS Amplify.
- Set up build and deploy settings.
- Configure environment variables (NEXT_PUBLIC_API_BASE_URL) in the Amplify Console.
2. Deploy: Push changes to the connected branch, and AWS Amplify will automatically build and deploy the frontend.

### AWS EC2 and RDS (Backend)
1. EC2 Setup:
- Launch an EC2 instance and SSH into it.
- Install Node.js and PostgreSQL client tools.
2. RDS Setup:
- Set up an RDS PostgreSQL instance.
- Configure your Prisma DATABASE_URL to point to the RDS instance.
3. API Gateway:
- Set up API Gateway to route requests to the backend endpoints running on EC2.
4. Deploy:
- Deploy your backend to EC2 and make sure the API Gateway routes are correctly configured.
