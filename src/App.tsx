import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Home from "@/pages/Home";
import BookDetail from "@/pages/BookDetail";
import Publish from "@/pages/Publish";

export default function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/book/:id" element={<BookDetail />} />
            <Route path="/publish" element={<Publish />} />
          </Routes>
        </main>
        <footer className="border-t border-white/5 py-6 mt-8">
          <div className="container px-4 text-center text-slate-500 text-sm">
            <p>© 2024 校园书市 · Campus Book Market</p>
            <p className="mt-1 text-xs text-slate-600">让每一本好书都找到新的主人</p>
          </div>
        </footer>
      </div>
    </Router>
  );
}
