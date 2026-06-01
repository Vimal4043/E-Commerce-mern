# 🛒 E-Commerce MERN

A full-stack e-commerce web application built with the **MERN** stack (MongoDB, Express.js, React, Node.js). It supports user authentication, product browsing, cart management, address management, order placement, and an admin panel for managing products.

---

## 📋 Table of Contents

- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Getting Started](#-getting-started)
  - [Prerequisites](#prerequisites)
  - [Environment Variables](#environment-variables)
  - [Installation](#installation)
  - [Running the App](#running-the-app)
- [API Reference](#-api-reference)
- [Pages & Routes](#-pages--routes)
- [Data Models](#-data-models)
- [Deployment](#-deployment)

---

## ✨ Features

### User Features
- 📝 Register and log in with JWT-based authentication
- 🔍 Browse products across 10 categories
- 📦 View detailed product information
- 🛒 Add, update, and remove items from cart
- 📍 Save and manage multiple delivery addresses
- ✅ Place orders (Cash on Delivery)
- 📋 View order history and order details
- 👤 View and edit personal profile

### Admin Features
- ➕ Add new products
- ✏️ Edit existing products
- 🗑️ Delete products
- 📃 View all products in the admin panel

---

## 🧰 Tech Stack

| Layer       | Technology                                                                 |
|-------------|----------------------------------------------------------------------------|
| Frontend    | React 19, React Router 7, Tailwind CSS 4, Axios, React Icons, date-fns    |
| Backend     | Node.js, Express.js 5                                                      |
| Database    | MongoDB with Mongoose 9                                                    |
| Auth        | JSON Web Tokens (JWT), bcryptjs                                            |
| Build Tool  | Vite                                                                       |
| Deployment  | Vercel (frontend)                                                          |

---

## 📁 Project Structure
```
E-Commerce/
├── README.md
├── backend/
│   ├── package.json
│   ├── server.js                # Express app entry point
│   ├── config/
│   │   └── db.js                # MongoDB connection
│   ├── controllers/
│   │   ├── addressController.js # address routes logic
│   │   ├── authController.js    # auth (signup/login)
│   │   ├── cartController.js    # cart operations
│   │   ├── contactController.js # contact form handling
│   │   ├── orderController.js   # order placement & history
│   │   ├── productController.js # product CRUD
│   │   └── userController.js    # user profile management
│   ├── init/
│   │   ├── data.js               # seed/sample data
│   │   └── init.js               # seed runner
│   ├── middleware/
│   │   └── authMiddleware.js     # JWT protect / isAdmin guards
│   ├── models/
│   │   ├── Address.js            # address schema
│   │   ├── Cart.js               # cart schema
│   │   ├── Contact.js            # contact messages
│   │   ├── Order.js              # order schema
│   │   ├── Product.js            # product schema
│   │   └── User.js               # user schema
│   └── routes/
│       ├── address.js            # /api/address
│       ├── authRoutes.js         # /api/auth
│       ├── cart.js               # /api/cart
│       ├── contact.js            # /api/contact
│       ├── order.js              # /api/orders
│       ├── products.js           # /api/products
│       └── user.js               # /api/user

└── frontend/
  ├── package.json
  ├── index.html                 # single-page app entry
  ├── vite.config.js
  ├── eslint.config.js
  ├── vercel.json                # Vercel rewrite config
  ├── public/                    # static assets served at /
  └── src/
    ├── App.css
    ├── App.jsx                # top-level router & routes
    ├── index.css
    ├── main.jsx               # React entry point
    ├── admin/                 # admin pages & components
    │   ├── AddProduct.jsx
    │   ├── AdminContacts.jsx
    │   ├── AdminDashboard.jsx
    │   ├── AdminLayout.jsx
    │   ├── AdminNavbar.jsx
    │   ├── AdminUsers.jsx
    │   ├── EditProduct.jsx
    │   ├── Orders.jsx
    │   ├── ProductList.jsx
    │   └── Sidebar.jsx
    ├── api/
    │   └── axios.js           # axios instance & interceptors
    ├── assets/                 # images, icons, fonts
    ├── components/             # reusable UI components
    │   ├── Address/
    │   │   ├── AddressCard.jsx
    │   │   └── AddressList.jsx
    │   ├── Auth/
    │   ├── Cart/
    │   │   └── ItemCard.jsx
    │   ├── Checkout/
    │   │   └── AddressCard.jsx
    │   ├── Contact/
    │   ├── Footer/
    │   │   └── Footer.jsx
    │   ├── Home/
    │   │   └── ProductCard.jsx
    │   ├── Navbar/
    │   │   ├── Header.jsx
    │   │   ├── Nav.jsx
    │   │   └── NavLinks.jsx
    │   ├── Orders/
    │   │   └── OrderCard.jsx
    │   ├── Profile/
    │   └── Utils/
    │       ├── RouteGuards.jsx
    │       └── ScrollToTop.jsx
    ├── layout/
    │   └── Layout.jsx          # app shell / header / footer
    ├── loadingSkeleton/        # skeleton loaders while fetching
    │   ├── CartSkeleton.jsx
    │   ├── CheckoutSkeleton.jsx
    │   ├── OrderDetailsSkeleton.jsx
    │   ├── OrderSkeleton.jsx
    │   ├── ProductListSkeleton.jsx
    │   ├── ProductSkeleton.jsx
    │   └── ProfileSkeleton.jsx
    ├── pages/
    │   ├── Address/
    │   │   └── AddAddress.jsx
    │   ├── Auth/
    │   │   ├── Login.jsx
    │   │   └── Signup.jsx
    │   ├── Cart/
    │   │   ├── Cart.jsx
    │   │   ├── EmptyCart.jsx
    │   │   └── NoCart.jsx
    │   ├── Checkout/
    │   │   ├── AddressSections.jsx
    │   │   ├── Checkout.jsx
    │   │   └── OrderSummary.jsx
    │   ├── Contact/
    │   │   └── Contact.jsx
    │   ├── Dashboard/
    │   ├── Home/
    │   │   ├── CTA.jsx
    │   │   ├── Home.jsx
    │   │   ├── ProductDetails.jsx
    │   │   └── Products.jsx
    │   ├── Orders/
    │   │   ├── NoOrder.jsx
    │   │   ├── OrderDetails.jsx
    │   │   ├── Orders.jsx
    │   │   └── OrderSuccess.jsx
    │   ├── Profile/
    │   │   ├── EditProfile.jsx
    │   │   ├── Profile.jsx
    │   │   └── UserProfile.jsx
    │   ├── Projects/
    │   ├── Settings/
    │   ├── Tasks/
    │   ├── Team/
    │   └── Utils/
    │       └── NotFound.jsx
    └── theme/
```

---

## 🚀 Getting Started

### Prerequisites

Make sure you have the following installed:

- [Node.js](https://nodejs.org/) (v18 or higher recommended)
- [npm](https://www.npmjs.com/)
- [MongoDB](https://www.mongodb.com/) (local instance or a [MongoDB Atlas](https://www.mongodb.com/atlas) cluster)

---

### Environment Variables

Create a `.env` file in the `backend/` directory with the following variables:

```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
PORT=5001
```

| Variable    | Description                                        |
|-------------|----------------------------------------------------|
| `MONGO_URI` | MongoDB connection string (local or Atlas)         |
| `JWT_SECRET`| Secret key used to sign and verify JWT tokens      |
| `PORT`      | Port the backend server listens on (default: 5001) |

---

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/Vimal4043/E-Commerce-mern.git
   cd E-Commerce-mern
   ```

2. **Install backend dependencies**

   ```bash
   cd backend
   npm install
   ```

3. **Install frontend dependencies**

   ```bash
   cd ../frontend
   npm install
   ```

---

### Running the App

**Start the backend server:**

```bash
cd backend
npm start
```

The API will be available at `http://localhost:5001`.

**Start the frontend development server:**

```bash
cd frontend
npm run dev
```

The React app will be available at `http://localhost:5173`.

> Make sure the backend is running before using the frontend.

---

## 📡 API Reference

### Authentication — `/api/auth`

| Method | Endpoint         | Description           | Auth Required |
|--------|------------------|-----------------------|---------------|
| POST   | `/api/auth/signup` | Register a new user  | ❌            |
| POST   | `/api/auth/login`  | Login and get JWT    | ❌            |

---

### Products — `/api/products`

| Method | Endpoint                    | Description              | Auth Required |
|--------|-----------------------------|--------------------------|---------------|
| GET    | `/api/products`             | Get all products         | ❌            |
| GET    | `/api/products/:id`         | Get a single product     | ❌            |
| POST   | `/api/products/add`         | Create a new product     | ✅ Admin only |
| PUT    | `/api/products/update/:id`  | Update a product         | ✅ Admin only |
| DELETE | `/api/products/delete/:id`  | Delete a product         | ✅ Admin only |

---

### Cart — `/api/cart`

| Method | Endpoint            | Description                  | Auth Required |
|--------|---------------------|------------------------------|---------------|
| GET    | `/api/cart`         | Get the user's cart          | ✅            |
| POST   | `/api/cart/add`     | Add an item to the cart      | ✅            |
| POST   | `/api/cart/remove`  | Remove an item from the cart | ✅            |
| POST   | `/api/cart/update`  | Update item quantity         | ✅            |

---

### Addresses — `/api/address`

| Method | Endpoint              | Description              | Auth Required |
|--------|-----------------------|--------------------------|---------------|
| GET    | `/api/address`        | Get all user addresses   | ✅            |
| POST   | `/api/address/add`    | Add a new address        | ✅            |
| PUT    | `/api/address/:id`    | Update an address        | ✅            |
| DELETE | `/api/address/:id`    | Delete an address        | ✅            |

---

### Orders — `/api/orders`

| Method | Endpoint                       | Description              | Auth Required |
|--------|--------------------------------|--------------------------|---------------|
| POST   | `/api/orders/place`            | Place a new order        | ✅            |
| GET    | `/api/orders/user/:userId`     | Get all orders for user  | ✅            |
| GET    | `/api/orders/:orderId`         | Get order details        | ✅            |

---

### Users — `/api/user`

| Method | Endpoint            | Description            | Auth Required |
|--------|---------------------|------------------------|---------------|
| GET    | `/api/user`         | Get all users          | ✅            |
| GET    | `/api/user/:id`     | Get a user by ID       | ✅            |
| PUT    | `/api/user/:id`     | Update user profile    | ✅            |

> **Auth Required** means a valid `Authorization: Bearer <token>` header must be included.

---

## 🗺️ Pages & Routes

| Path                             | Page / Component      | Access        |
|----------------------------------|-----------------------|---------------|
| `/`                              | Home                  | Public        |
| `/login`                         | Login                 | Public        |
| `/signup`                        | Signup                | Public        |
| `/product/:id`                   | Product Details       | Public        |
| `/cart`                          | Cart                  | Public        |
| `/checkout-address`              | Select Address        | User          |
| `/checkout`                      | Checkout Summary      | User          |
| `/order-success/:id`             | Order Success         | User          |
| `/orders`                        | Order History         | User          |
| `/orders/:orderId`               | Order Details         | User          |
| `/profile`                       | User Profile          | User          |
| `/edit-profile`                  | Edit Profile          | User          |
| `/add-address`                   | Add Address           | User          |
| `/admin/products`                | Admin Product List    | Admin only    |
| `/admin/products/add`            | Add Product           | Admin only    |
| `/admin/products/update/:id`     | Edit Product          | Admin only    |
| `*`                              | 404 Not Found         | Public        |

---

## 🗃️ Data Models

### User
| Field      | Type    | Description                       |
|------------|---------|-----------------------------------|
| `name`     | String  | Full name (required)              |
| `email`    | String  | Unique email address (required)   |
| `password` | String  | Hashed password (required)        |
| `isAdmin`  | Boolean | Admin flag, defaults to `false`   |

### Product
| Field         | Type   | Description                                                                                   |
|---------------|--------|-----------------------------------------------------------------------------------------------|
| `title`       | String | Product name (required)                                                                       |
| `description` | String | Product description                                                                           |
| `price`       | Number | Price (required)                                                                              |
| `category`    | String | One of: `electronics`, `clothing`, `footwear`, `accessories`, `home`, `beauty`, `books`, `sports`, `toys`, `groceries` |
| `image`       | String | Image URL                                                                                     |
| `stock`       | Number | Available stock, defaults to `0`                                                              |

### Cart
| Field    | Type     | Description                          |
|----------|----------|--------------------------------------|
| `userId` | ObjectId | Reference to User                    |
| `items`  | Array    | List of `{ productId, quantity }` objects |

### Address
| Field         | Type     | Description                        |
|---------------|----------|------------------------------------|
| `userId`      | ObjectId | Reference to User (required)       |
| `fullName`    | String   | Recipient full name                |
| `phone`       | String   | 10-digit phone number              |
| `addressLine` | String   | Street address                     |
| `city`        | String   | City                               |
| `state`       | String   | State                              |
| `pincode`     | String   | Postal code                        |

### Order
| Field           | Type     | Description                                               |
|-----------------|----------|-----------------------------------------------------------|
| `userId`        | ObjectId | Reference to User (required)                              |
| `items`         | Array    | List of `{ productId, quantity, price }` objects          |
| `address`       | Object   | Snapshot of delivery address at time of order             |
| `totalAmount`   | Number   | Total order value                                         |
| `paymentMethod` | String   | Payment method, defaults to `"COD"`                       |
| `status`        | String   | Order status, defaults to `"Placed"`                      |

---

## 🌐 Deployment

### Frontend (Vercel)

The frontend includes a `vercel.json` that rewrites all routes to `index.html`, enabling client-side routing to work correctly on Vercel.

```json
{
  "rewrites": [
    { "source": "/(.*)", "destination": "/index.html" }
  ]
}
```

To deploy:
1. Push the repository to GitHub.
2. Import the project in [Vercel](https://vercel.com/).
3. Set the **Root Directory** to `frontend`.
4. Vercel will auto-detect Vite and deploy.

### Backend

Deploy the `backend/` folder to any Node.js-compatible host (e.g., [Render](https://render.com/), [Railway](https://railway.app/), or a VPS).  
Make sure to set the required environment variables (`MONGO_URI`, `JWT_SECRET`, `PORT`) on your hosting platform.

---

## 👨‍💻 Author

**Vimal Kumar**  
GitHub: [@Vimal4043](https://github.com/Vimal4043)

---

## 📄 License

This project is licensed under the **ISC License**.
