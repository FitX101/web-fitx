import "@/App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "sonner";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import Home from "@/pages/Home";
import BlogIndex from "@/pages/BlogIndex";
import BlogPost from "@/pages/BlogPost";

function App() {
  return (
    <div className="App bg-[#0D0D0D] text-white min-h-screen">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/blog" element={<BlogIndex />} />
          <Route path="/blog/:slug" element={<BlogPost />} />
          <Route path="*" element={<Home />} />
        </Routes>
        <Footer />
        <Toaster theme="dark" position="top-right" richColors />
      </BrowserRouter>
    </div>
  );
}

export default App;
