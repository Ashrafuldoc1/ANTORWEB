import { Routes, Route, Link, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';
import FloatingContacts from './components/FloatingContacts.jsx';
import HomePage from './pages/HomePage.jsx';
import ShopPage from './pages/ShopPage.jsx';
import CategoryPage from './pages/CategoryPage.jsx';
import AboutPage from './pages/AboutPage.jsx';
import BlogPage from './pages/BlogPage.jsx';
import ContactPage from './pages/ContactPage.jsx';
import CheckoutPage from './pages/CheckoutPage.jsx';
import OrderTrackingPage from './pages/OrderTrackingPage.jsx';
import AdminLoginPage from './pages/AdminLoginPage.jsx';
import AdminDashboardPage from './pages/AdminDashboardPage.jsx';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo({ top: 0, behavior: 'instant' }); }, [pathname]);
  return null;
}

function NotFound() {
  return (
    <section className="bg-cream py-20">
      <div className="container-page text-center">
        <h1 className="font-display text-5xl font-bold text-primary">404</h1>
        <p className="text-muted mt-2">Page not found</p>
        <Link to="/" className="btn-primary mt-6 inline-flex">Go Home</Link>
      </div>
    </section>
  );
}

export default function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <ScrollToTop />
      <Header />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/shop" element={<ShopPage />} />
          <Route path="/category/:slug" element={<CategoryPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/track" element={<OrderTrackingPage />} />
          <Route path="/admin" element={<AdminLoginPage />} />
          <Route path="/admin/dashboard" element={<AdminDashboardPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
      <FloatingContacts />
    </div>
  );
}