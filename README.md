# Mini  E-Commerce Application

A modern, fully functional e-commerce web application built with **React** and **Vite**, consuming the FakeStore API with modular CSS styling.

## Features

- **Product Listing**: Browse all products with responsive grid layout
- **Search & Filter**: Search products by title and filter by category
- **Product Details**: View detailed product information with ratings
- **Shopping Cart**: Add/remove items, adjust quantities (1-10 per item)
- **User Authentication**: Login/Signup with FakeStore API integration
- **Checkout**: Complete order with form validation
- **Data Caching**: Intelligent localStorage caching with 1-hour expiration
- **State Management**: Global cart and auth state using React Context API
- **Error Handling**: Comprehensive error handling and loading states
- **Responsive Design**: Mobile-first design that works on all devices
- **Modular CSS**: Each component has its own CSS file for better organization

## Tech Stack

- **Frontend**: React 18 with Vite
- **Routing**: React Router v7
- **Styling**: Modular CSS (each component has its own CSS file)
- **State Management**: React Context API
- **Data Fetching**: Native Fetch API with custom caching
- **API**: FakeStore API (https://fakestoreapi.com)
- **Language**: JavaScript (ES6+)

## Project Structure

\`\`\`
src/
├── main.jsx                 # React entry point
├── App.jsx                  # Main app with routing
├── App.css                  # App styles
├── index.css                # Global styles
├── pages/
│   ├── HomePage.jsx         # Product listing page
│   ├── HomePage.css
│   ├── LoginPage.jsx        # Login page
│   ├── LoginPage.css
│   ├── SignupPage.jsx       # Signup page
│   ├── SignupPage.css
│   ├── ProductDetailPage.jsx # Product detail page
│   ├── ProductDetailPage.css
│   ├── CartPage.jsx         # Shopping cart page
│   ├── CartPage.css
│   ├── CheckoutPage.jsx     # Checkout page
│   └── CheckoutPage.css
├── components/
│   ├── Navigation.jsx       # Navigation bar
│   ├── Navigation.css
│   ├── ProductGrid.jsx      # Product grid component
│   ├── ProductGrid.css
│   ├── CartItem.jsx         # Cart item component
│   ├── CartItem.css
│   ├── CheckoutForm.jsx     # Checkout form
│   ├── CheckoutForm.css
│   ├── OrderConfirmation.jsx # Order confirmation
│   ├── OrderConfirmation.css
│   └── ProtectedRoute.jsx   # Protected route wrapper
├── context/
│   ├── AuthContext.jsx      # Authentication state
│   └── CartContext.jsx      # Shopping cart state

\`\`\`

## Getting Started



### Installation

1. Clone the repository:
\`\`\`bash
git clone (https://github.com/testbhartigithub/miniEcommerceWebsite)
cd miniwebsite
\`\`\`

2. Install dependencies:
\`\`\`bash
npm install
\`\`\`

3. Run the development server:
\`\`\`bash
npm run dev
\`\`\`

4. Open(http://localhost:5173/) in your browser

## Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally

## Demo Credentials

For testing the authentication:
- **Username**: `mor_2314`
- **Password**: `83r5^_`

## Key Features Explained

### Authentication
- Login and signup with FakeStore API
- User data persisted in localStorage
- Protected routes that redirect to login
- User profile dropdown in navigation

### Data Caching
- Products are cached in localStorage for 1 hour
- Reduces API calls and improves performance
- Automatic cache expiration and cleanup

### State Management
- Cart state managed globally using React Context
- Auth state managed globally using React Context
- Both persist to localStorage for session recovery
- Real-time updates across all components

### Form Validation
- Email format validation
- Required field validation
- Address minimum length validation
- Password confirmation validation
- Real-time error clearing

### Error Handling
- Network error handling with user-friendly messages
- Loading states for all async operations
- Graceful fallbacks for missing data

## API Endpoints Used

- `POST /auth/login` - User login
- `POST /users` - User signup
- `GET /users` - Get all users
- `GET /products` - Get all products
- `GET /products/:id` - Get single product
- `GET /products/categories` - Get all categories



