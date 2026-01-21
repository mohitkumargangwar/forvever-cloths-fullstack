# 🛒 Clothing E-Commerce Web Application
A full-stack clothing e-commerce platform with admin dashboard, secure online payments, and order tracking system.

## 📖 Overview

This project is a **production-level full-stack e-commerce web application** designed to simulate a real-world online shopping platform.

It supports **user-side shopping**, **secure payment processing**, and a **powerful admin dashboard** for managing products and orders.

## ❓ Problem Statement

Most basic e-commerce applications lack proper **admin control**, **payment integration**, and **order tracking**.

This project solves those problems by providing:
- Secure authentication
- Online payment gateway
- Order tracking system
- Admin-controlled product and order management

## 📊 Dataset

The application uses **MongoDB** as the database.

It stores:
- User data
- Product details (name, category, price, stock, images)
- Order details (payment & delivery status)

## 🛠 Tools and Technologies

### 🔹 Frontend
- React.js
- Tailwind CSS
- JavaScript (ES6)

### 🔹 Backend
- Node.js
- Express.js

### 🔹 Database
- MongoDB

### 🔹 Payment Gateway
- Secure online payment integration

## ⚙️ Methods

- RESTful API architecture
- Role-based access (Admin & User)
- JWT-based authentication
- Payment verification workflow
- Order lifecycle management
- Responsive UI using Tailwind CSS

## 🔍 Key Insights

- Admin dashboard improves inventory & order handling
- Online payments increase checkout reliability
- Order tracking improves user trust
- Modular architecture helps in future scalability

## 📊 Dashboard / Output

### 👤 User Panel
- Product browsing & filtering
- Cart & checkout system
- Online payment
- Order tracking

### 🧑‍💼 Admin Dashboard
- Add / Update / Delete products
- Manage orders
- Update order status

## 🔐 Environment Variables Setup

This project uses **two separate `.env` files**.

#### 📁 Backend `.env` (`backend/.env`)
```env
PORT=9000
MONGO_URI=your_mongodb_connection_string
JWT_KEY=your_jwt_secret_key
REDIS_PASSWORD=your_redis_password
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
```

#### 📁 Frontend `.env` (`frontend/.env`)
```env
VITE_BACKEND_URL=http://localhost:9000
VITE_PAYPAL_CLIENT_ID=your_payment_gateway_public_key
```

## ▶️ How to Run the Project
1️⃣ Clone Repository
```bash
git clone https://github.com/mohitkumargangwar/forvever-cloths-fullstack.git
```

2️⃣ Start Backend
```bash
cd backend
npm install
npm start
```

3️⃣ Start Frontend
```bash
cd frontend
npm install
npm run dev
```

## ✅ Results & Conclusion
The project successfully demonstrates a real-world MERN stack e-commerce system with admin dashboard, secure payments, and order tracking.
It follows clean architecture and scalable design principles.

## 🔮 Future Enhancements
- Sales analytics dashboard
- Email & SMS notifications
- Coupon & discount system
- Multi-vendor support

## 👤 Author & Contact

Mohit Kumar
Full Stack Developer

🌐 Live Demo: 👉 [https://forvever-cloths.vercel.app](https://forvever-cloths.vercel.app/)

🔗 GitHub: 👉 [https://github.com/mohitkumargangwar](https://github.com/mohitkumargangwar/forvever-cloths-fullstack)
