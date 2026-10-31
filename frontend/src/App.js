import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import "@/App.css";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Toaster } from "sonner";

import HomePage from "@/pages/HomePage";
import AboutPage from "@/pages/AboutPage";
import ServicesPage from "@/pages/ServicesPage";
import TradesPage from "@/pages/TradesPage";
import ApplyPage from "@/pages/ApplyPage";
import HirePage from "@/pages/HirePage";
import ContactPage from "@/pages/ContactPage";
import AdminLoginPage from "@/pages/AdminLoginPage";
import AdminDashboardPage from "@/pages/AdminDashboardPage";

function Layout({ children, hideChrome }) {
  const location = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [location.pathname]);
  if (hideChrome) return <>{children}</>;
  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  );
}

function AppRoutes() {
  const location = useLocation();
  const isAdmin = location.pathname.startsWith("/admin");
  return (
    <Layout hideChrome={isAdmin}>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/trades" element={<TradesPage />} />
        <Route path="/apply" element={<ApplyPage />} />
        <Route path="/hire" element={<HirePage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/admin/login" element={<AdminLoginPage />} />
        <Route path="/admin" element={<AdminDashboardPage />} />
        <Route path="*" element={<HomePage />} />
      </Routes>
    </Layout>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
      <Toaster position="top-right" richColors closeButton />
    </BrowserRouter>
  );
}

export default App;
