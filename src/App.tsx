import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import { Layout } from "@/components/Layout";
import { ConsultModal } from "@/components/ConsultModal";
import { HomePage } from "@/pages/HomePage";
import { ServicesPage } from "@/pages/ServicesPage";
import { AboutPage } from "@/pages/AboutPage";
import { ReviewsPage } from "@/pages/ReviewsPage";
import { ContactPage } from "@/pages/ContactPage";
import { BlogPage } from "@/pages/BlogPage";
import { BlogPostPage } from "@/pages/BlogPostPage";

export default function App() {
  const [consultOpen, setConsultOpen] = useState(false);

  return (
    <>
      <Layout onOpenConsult={() => setConsultOpen(true)}>
        <Routes>
          <Route path="/" element={<HomePage onOpenConsult={() => setConsultOpen(true)} />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/reviews" element={<ReviewsPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/blog/:slug" element={<BlogPostPage />} />
        </Routes>
      </Layout>
      <ConsultModal open={consultOpen} onClose={() => setConsultOpen(false)} />
    </>
  );
}
