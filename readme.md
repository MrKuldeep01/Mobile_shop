# Mobile Shop - Mr Kumar ☕👨‍💻

**Mobile Shop - Mr Kumar** is a full-stack web application built using the **MERN stack** (MongoDB, Express.js, React.js, Node.js). It allows users to browse and purchase various mobile-related products and services. The platform also provides owners with the ability to manage their product inventory and customer profiles.

The project includes secure user and owner authentication, profile management, product handling, and more. A payment gateway and additional features will be introduced in future updates to enhance the user experience.

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [Routes](#routes)
- [Backend Packages](#backend-packages)
- [Future Enhancements](#future-enhancements)
- [License](#license)

---

## Features

1. **User and Owner Authentication**:

   - Users can sign up, log in, and manage their profiles.
   - Owners have additional features such as adding and editing products.

2. **Product Management**:

   - Owners can add, edit, and remove products.
   - Users can browse through a variety of products including:
     - Mobile phones
     - Chargers, data cables, and Bluetooth speakers
     - Mobile accessories like skins, covers, and glass guards
     - Mobile parts such as batteries, screens, speakers, and more
     - Service details like mobile repairs, SIM port services, and recharges

3. **Profile Management**:

   - Owners and users can edit their profiles and view their product history.

4. **Smooth User Experience**:
   - A clean, intuitive interface designed for easy navigation.
   - Secure operations with JWT-based authentication.
5. **Future Plans**:
   - Payment gateway integration for seamless purchases.
   - Additional improvements for performance and user experience.

---

## Tech Stack

- **Frontend**: React.js, Redux for state management
- **Backend**: Node.js, Express.js
- **Database**: MongoDB (using Mongoose for ORM)
- **Image Management**: Cloudinary for image uploads
- **Authentication**: JWT, bcrypt for password hashing
- **Styling**: TailwindCSS

---

## Installation

To set up the project locally, follow these steps:

1. **Clone the repository**:

   ```bash
   git clone https://github.com/username/mobile-shop-mr-kumar.git
   cd mobile-shop-mr-kumar
   ```

2. **Install dependencies**:

   - Backend:

     ```bash
     cd backend
     npm install
     ```

   - Frontend:
     ```bash
     cd ../frontend
     npm install
     ```

3. **Environment Variables**:

   - Create a `.env` file in the `backend` directory with the following keys:
     ```bash
     MONGO_URI=your_mongodb_connection_string
     JWT_SECRET=your_jwt_secret
     CLOUDINARY_NAME=your_cloudinary_name
     CLOUDINARY_API_KEY=your_cloudinary_api_key
     CLOUDINARY_API_SECRET=your_cloudinary_api_secret
     ```

4. **Run the Application**:

   - Start the backend:
     ```bash
     cd backend
     npm start
     ```
   - Start the frontend:
     ```bash
     cd ../frontend
     npm start
     ```

5. **Visit** `http://localhost:3000` to view the application.

---

## Routes

### **Authentication Routes**:

- **Register**: `/api/v1/register`  
   Allow users and owners to sign up.
- **Login**: `/api/v1/login`  
   Allow users and owners to log in.

### **Product Routes**:

- **All Products**: `/api/v1/products`  
   Get all available products.
- **Product by ID**: `/api/v1/products/:productId`  
   Fetch a specific product by its ID.

### **Protected Routes (Owner Only)**:

- **Add/Edit Product**: `/api/v1/products/add/:id`  
   Add or edit products. If an `id` is provided, the product will be edited.

### **Profile Routes**:

- **Owner Profile**: `/api/v1/profile/owner`  
   View the owner’s profile along with their sold product history.
- **Edit Owner Profile**: `/api/v1/profile/owner/edit/:ownerId`  
   Edit the owner’s profile.
- **User Profile**: `/api/v1/profile/user/:userId`  
   View the user’s profile along with their purchase history.
- **Edit User Profile**: `/api/v1/profile/user/edit/:userId`  
   Edit the user’s profile.

### **Cart Routes**

- **addToCart**: `/api/v1/cart/add/:productId`
   Add product via ProductId into cart
- **removeFromCart**: `/api/v1/cart/remove/:productId`
   Remove product from cart via productId

---

## Backend Packages

Here are some key packages used in the backend of this application:

- **Express**: Web framework for Node.js to build APIs.
- **Mongoose**: ODM for MongoDB to handle data models.
- **dotenv**: For environment variable management.
- **JWT**: For token-based authentication.
- **bcrypt**: For hashing user passwords securely.
- **Multer**: For handling file uploads.
- **Cloudinary**: For storing images in the cloud.
- **CORS**: For handling cross-origin requests.

---

## Future Enhancements

1. **Payment Gateway Integration**:  
   Add a payment processing system to enable secure online transactions.
2. **Improved User Experience**:  
   Further optimizations for faster performance and smoother navigation.

3. **Mobile App Development**:  
   Explore creating a mobile version of the application for Android and iOS.

---

## License

This project is licensed under the MIT License.

---

👨‍💻🚀 Enjoy shopping and managing your mobile products with **Mobile Shop - Mr Kumar**! Stay tuned for exciting new features in the future.
