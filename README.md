
<p align="center"><h1 align="center">STORE-THING</h1></p>
<p align="center">
	<em><code>https://github.com/Abhii5496/store-thing </code></em>
</p>
<p align="center">
	<img src="https://img.shields.io/github/last-commit/Abhii5496/store-thing?style=default&logo=git&logoColor=white&color=0080ff" alt="last-commit">
	<img src="https://img.shields.io/github/languages/top/Abhii5496/store-thing?style=default&color=0080ff" alt="repo-top-language">
	<img src="https://img.shields.io/github/languages/count/Abhii5496/store-thing?style=default&color=0080ff" alt="repo-language-count">
</p>
<p align="center"><!-- default option, no dependency badges. -->
</p>
<p align="center">
	<!-- default option, no dependency badges. -->
</p>
<br>


## 📍 Overview

 A flexible and dynamic e-commerce API built with Node.js and Next.js, providing various endpoints for managing products, categories, and more

## 🌐 **Live Demo**

Explore: [Store Thing](https://store-thing.vercel.app)



## 🚀 **Features**
- RESTful API endpoints for product and category management.
- Dynamic routing using Next.js API routes.
- Scalable architecture for future enhancements.
- Authentication using Nextauth
- Cart and wishlist functionality for logged in user in MongoDb database.
- Cart and wishlist functionality for not logged in user using zustand and local-storage.
- User cart and wishlist products listing by auth.
- Products by Category.
- Products filter by category, price , sortBy and rating.
- Checkout page




## 📁 Project Structure

```sh
└── store-thing/
    ├── README.md
    ├── components.json
    ├── jsconfig.json
    ├── middleware.js
    ├── next.config.js
    ├── next.config.mjs
    ├── package-lock.json
    ├── package.json
    ├── postcss.config.mjs
    ├── public
    │   ├── apple-logo.svg
    │   ├── apple.svg
    │   ├── file.svg
    │   ├── globe.svg
    │   ├── next.svg
    │   ├── playstore-logo.svg
    │   ├── vercel.svg
    │   └── window.svg
    ├── src
    │   ├── actions
    │   │   └── register.js
    │   ├── app
    │   │   ├── api
    │   │   ├── cart
    │   │   ├── categories
    │   │   ├── favicon.ico
    │   │   ├── globals.css
    │   │   ├── layout.js
    │   │   ├── loading.js
    │   │   ├── login
    │   │   ├── not-found.js
    │   │   ├── page.js
    │   │   ├── products
    │   │   ├── robots.js
    │   │   ├── sign-up
    │   │   ├── sitemap.js
    │   │   ├── theme-provider.js
    │   │   └── wishlist
    │   ├── components
    │   │   ├── ErrorFallback.jsx
    │   │   ├── Filter.jsx
    │   │   ├── Provider.js
    │   │   ├── cart
    │   │   ├── homepage
    │   │   ├── login-form.jsx
    │   │   ├── share-link.jsx
    │   │   ├── signup-form.jsx
    │   │   └── ui
    │   ├── db
    │   │   ├── categories.js
    │   │   └── database.js
    │   ├── hooks
    │   │   ├── cart-hook.js
    │   │   └── wishlist-hook.js
    │   ├── lib
    │   │   ├── auth.js
    │   │   ├── local-store.js
    │   │   ├── mongodb.js
    │   │   └── utils.js
    │   └── models
    │       ├── Cart.js
    │       ├── User.js
    │       └── Wishlist.js
    └── tailwind.config.mjs
```


## 🚀 Getting Started

### ☑️ Prerequisites

Before getting started with store-thing, ensure your runtime environment meets the following requirements:

- **Programming Language:** JavaScript
- **Frontend Development:** Nextjs, Tailwind, Shadcn 
- **Backend Development:** MongoDb , Next.js API Routes
- **Package Manager:** Npm


### ⚙️ Installation

Install store-thing using one of the following methods:

**Build from source:**

1. Clone the store-thing repository:
```sh
❯ git clone https://github.com/Abhii5496/store-thing/
```

2. Navigate to the project directory:
```sh
❯ cd store-thing
```

3. Install the project dependencies:


**Using `npm`** &nbsp; [<img align="center" src="https://img.shields.io/badge/npm-CB3837.svg?style={badge_style}&logo=npm&logoColor=white" />](https://www.npmjs.com/)

```sh
❯ npm install
```
```sh
❯ npx auth secret 
```




### 🤖 Usage
Run store-thing using the following command:
**Using `npm`** &nbsp; [<img align="center" src="https://img.shields.io/badge/npm-CB3837.svg?style={badge_style}&logo=npm&logoColor=white" />](https://www.npmjs.com/)

```sh
❯ npm start
```

**Configure `.env` file ** 

```sh
NEXT_PUBLIC_STORE_URL = https://fakestoreapi.com/
URL=http://localhost:3000/
MONGODB_URI="Your_mongo_uri"
AUTH_SECRET="auth_secret_generated_by_nextauth" 
NEXTAUTH_URL=http://localhost:3000
```


## 🛠️ ** Note - In case Fakestore api is down or Slow . I have created an alternative **

### Replace `NEXT_PUBLIC_STORE_URL` with this in `.env`
```sh
 NEXT_PUBLIC_STORE_URL = http://localhost:3000/api/store/
```
### **API Endpoints**
- **`GET /api/store/products`**  
  Fetch all products.

- **`GET /api/store/products/categories`**  
  Fetch all product categories.

- **`GET /api/store/products/category/:name`**  
  Fetch products from a specific category by its name.

- **`GET /api/store/products/:id`**  
  Fetch a product by its unique ID.

----

## 📌 Project Roadmap

- [X] **`Task 1`**: Authentication using Nextauth
- [X] **`Task 2`**: Cart and wishlist functionality for logged in user in MongoDb database.
- [X] **`Task 3`**: Cart and wishlist functionality for not logged in user using zustand and local-storage.
- [X] **`Task 4`**: User cart and wishlist products listing by auth.
- [X] **`Task 5`**: Products by Category.
- [X] **`Task 6`**: Products filter by category, price , sortBy and rating.
- [X] **`Task 7`**: Checkout page
- [X] **`Task 8`**: Deployment


