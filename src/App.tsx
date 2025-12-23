import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { PackagePage } from './pages/PackagePage';
import { TestimonialPage } from './pages/TestimonialPage';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/package" element={<PackagePage />} />
        <Route path="/testimonial" element={<TestimonialPage />} />
      </Routes>
    </BrowserRouter>
  );
}