# Food Order App 🍽️

A modern, feature-rich food ordering web application inspired by Swiggy. Built with React, Redux Toolkit, and Tailwind CSS, this app provides a seamless experience for browsing restaurants, exploring menus, and managing orders.

## ✨ Features

### 🏪 Restaurant Listing
- Browse restaurants
- Filter and discover top-rated restaurants
- Smart search functionality to find restaurants by name
- Clear veg labeling for dietary preferences

### 📋 Restaurant Menu
- Explore detailed restaurant-specific menus
- Accordion-style categories for intuitive navigation
- Add items to cart with easy quantity controls
- Real-time cart updates

### 🛒 Shopping Cart
- Add, remove, and manage cart items effortlessly
- Clear entire cart with one click
- Dynamic cart counter in the header
- Persistent cart state across the app

### 👤 User Management
- User context maintained across all components
- Personalized experience with logged-in username display

### 🎨 Modern UI/UX
- Fully responsive design built with Tailwind CSS
- Smooth hover effects, shadows, and transitions
- Clean and intuitive interface

### 🚀 Performance Optimizations
- Optimized bundle size for faster load times
- Efficient state management with Redux Toolkit

### 🔌 Offline Support
- Automatic offline detection
- User-friendly offline message display

### ✅ Testing
- Comprehensive test coverage with Jest
- Component testing with React Testing Library
- Ensures reliability and maintainability

## 🛠️ Tech Stack

| Technology | Purpose |
|------------|---------|
| **React** | UI library with functional & class components |
| **Redux Toolkit** | State management |
| **React Router v6** | Client-side routing |
| **Tailwind CSS** | Utility-first styling |
| **Jest** | Testing framework |
| **React Testing Library** | Component testing |
| **Vercel** | Deployment platform |

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/ashishxdev/food-ordering-app
   cd food-ordering-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm start
   ```
   The app will open at `http://localhost:3000`

4. **Run tests**
   ```bash
   npm test
   ```

5. **Build for production**
   ```bash
   npm run build
   ```

6. CORS Note
If you’re testing locally, make sure to install the Allow CORS: Access-Control-Allow-Origin Chrome extension and toggle it ON.
This helps bypass CORS restrictions during local development.

## 📁 Project Structure

```
src/
├── components/
│   ├── About.jsx              # About page component
│   ├── Body.jsx               # Main body with restaurant listings
│   ├── Cart.jsx               # Shopping cart component
│   ├── Contact.jsx            # Contact page component
│   ├── Grocery.jsx            # Grocery section (lazy-loaded)
│   ├── Header.jsx             # Navigation header
│   ├── ItemList.jsx           # Menu item list component
│   ├── RestaurantCard.jsx     # Individual restaurant card
│   ├── RestaurantCategory.jsx # Menu category accordion
│   ├── RestaurantMenu.jsx     # Restaurant menu page
│   ├── Shimmer.jsx            # Loading skeleton UI
│   └── User.jsx / UserClass.jsx # User components
├── mocks/                     # Mock data for testing
├── utils/
│   ├── UserContext.js         # User context provider
│   ├── cartSlice.js           # Redux cart slice
│   ├── constant.js            # App constants
│   └── useRestaurantMenu.js   # Custom hook for menu data
├── App.jsx                    # Root component
└── index.js                   # Entry point
```

## 🌐 Live Demo

Check out the live application: [**Food Order App on Vercel**](https://food-ordering-app-git-main-aashishrana2004s-projects.vercel.app/)
