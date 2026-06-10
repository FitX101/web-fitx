import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { ArrowUpRight } from "lucide-react";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

export default function BlogIndex() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    axios
      .get(`${API}/blogs`)
      .then((res) => mounted && setPosts(res.data))
      .catch(() => mounted && setPosts([]))
      .finally(() => mounted && setLoading(false));
    return () => {
      mounted = false;
    };
  }, []);

  return (
    <main data-testid="blog-index-page" className="pt-32 pb-24 bg-[#0A0A0A] min-h-screen">
      <div className="max-w-7xl mx-auto px-5 md:px-8">
        <div className="max-w-3xl">
          <div className="text-xs md:text-sm font-bold tracking-[0.25em] uppercase text-[#D4AF37]">
            // The FitX Journal
          </div>
          <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-black uppercase tracking-tight mt-5 leading-[0.95]">
            Train. Eat. <span className="text-[#D4AF37]">Read.</span>
          </h1>
          <p className="mt-5 text-zinc-400 text-base md:text-lg max-w-2xl">
            Workouts, nutrition science, and behind-the-scenes stories from the FitX team and community.
          </p>
        </div>

        {loading ? (
          <div className="mt-16 text-zinc-500" data-testid="blog-loading">Loading articles...</div>
        ) : (
          <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((p, i) => (
              <Link
                to={`/blog/${p.slug}`}
                key={p.id}
                data-testid={`blog-card-${i}`}
                className="group bg-[#141414] border border-white/5 hover:border-white/25 rounded-md overflow-hidden transition-all hover:-translate-y-1"
              >
                <div className="aspect-[16/10] overflow-hidden">
                  <img
                    src={p.cover_image}
                    alt={p.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-center justify-between text-[10px] uppercase tracking-[0.25em]">
                    <span className="text-[#D4AF37]">{p.category}</span>
                    <span className="text-zinc-500">{p.read_time}</span>
                  </div>
                  <h2 className="font-display text-xl md:text-2xl font-bold uppercase tracking-tight mt-4 text-white leading-tight">
                    {p.title}
                  </h2>
                  <p className="mt-3 text-sm text-zinc-400 line-clamp-3">{p.excerpt}</p>
                  <div className="mt-5 flex items-center justify-between pt-4 border-t border-white/5">
                    <span className="text-xs text-zinc-500">{p.author}</span>
                    <ArrowUpRight size={18} className="text-zinc-400 group-hover:text-[#D4AF37] transition-colors" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
