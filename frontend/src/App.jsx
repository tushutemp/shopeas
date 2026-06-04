import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import { CartProvider } from './context/CartContext'
import { ToastProvider } from './context/ToastContext'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Toast from './components/Toast'
import Home from './pages/Home'
import Shop from './pages/Shop'
import Cart from './pages/Cart'
import Checkout from './pages/Checkout'
import Payment from './pages/Payment'
import PaymentSuccess from './pages/PaymentSuccess'
import TrackOrder from './pages/TrackOrder'
import Login from './pages/Login'
import Register from './pages/Register'
import ProductDetail from './pages/ProductDetail'
import AboutUs from './pages/AboutUs'
import ContactUs from './pages/ContactUs'
import FAQs from './pages/FAQs'
import ShippingInfo from './pages/ShippingInfo'
import PricingInfo from './pages/PricingInfo'
import DeliveryInfo from './pages/DeliveryInfo'
import SupportInfo from './pages/SupportInfo'
import PrivateRoute from './components/PrivateRoute'
import AdminRoute from './components/AdminRoute'
import AdminDashboard from './pages/admin/AdminDashboard'
import AdminProducts from './pages/admin/AdminProducts'
import AdminOrders from './pages/admin/AdminOrders'
import AdminContacts from './pages/admin/AdminContacts'
import './App.css'

function App() {
  return (
    <AuthProvider>
      <ToastProvider>
        <CartProvider>
          <div className="app">
            <Toast />
            <Navbar />
            <main className="main-content">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/shop" element={<Shop />} />
                <Route path="/product/:id" element={<ProductDetail />} />
                <Route path="/about" element={<AboutUs />} />
                <Route path="/faqs" element={<FAQs />} />
                <Route path="/contact" element={<ContactUs />} />
                <Route path="/shipping" element={<ShippingInfo />} />
                <Route path="/pricing" element={<PricingInfo />} />
                <Route path="/delivery" element={<DeliveryInfo />} />
                <Route path="/support" element={<SupportInfo />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />

                {/* Checkout → Payment → Success flow */}
                <Route
                  path="/checkout"
                  element={
                    <PrivateRoute>
                      <Checkout />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/payment"
                  element={
                    <PrivateRoute>
                      <Payment />
                    </PrivateRoute>
                  }
                />
                <Route path="/payment-success" element={<PaymentSuccess />} />

                {/* Order tracking for logged in users */}
                <Route
                  path="/track-order"
                  element={
                    <PrivateRoute>
                      <TrackOrder />
                    </PrivateRoute>
                  }
                />

                {/* Admin routes */}
                <Route
                  path="/admin"
                  element={
                    <AdminRoute>
                      <AdminDashboard />
                    </AdminRoute>
                  }
                />
                <Route
                  path="/admin/products"
                  element={
                    <AdminRoute>
                      <AdminProducts />
                    </AdminRoute>
                  }
                />
                <Route
                  path="/admin/orders"
                  element={
                    <AdminRoute>
                      <AdminOrders />
                    </AdminRoute>
                  }
                />
                <Route
                  path="/admin/contacts"
                  element={
                    <AdminRoute>
                      <AdminContacts />
                    </AdminRoute>
                  }
                />

                <Route path="*" element={<Navigate to="/" />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </CartProvider>
      </ToastProvider>
    </AuthProvider>
  )
}

export default App
