import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { ArrowUpRight } from "lucide-react";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

export const JournalPreview = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    let mounted = true;
    axios
      .get(`${API}/blogs`)
      .then((res) => mounted && setPosts(res.data.slice(0, 3)))
      .catch(() => mounted && setPosts([]));
    return () => {
      mounted = false;
    };
  }, []);

  return (
    <section
      id="journal"
      data-testid="journal-section"
      className="relative bg-[#0D0D0D] py-24 md:py-32 border-t border-white/5"
    >
      <div className="max-w-7xl mx-auto px-5 md:px-8">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div className="max-w-3xl">
            <div className="text-xs md:text-sm font-bold tracking-[0.25em] uppercase text-[#D4AF37]">
              // FitX Journal
            </div>
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-black uppercase tracking-tight mt-4 leading-[0.95]">
              Insights that <span className="text-[#E5C158]">move the needle</span>.
            </h2>
            <p className="mt-4 text-zinc-400 max-w-xl">
              Science-backed essays on training, nutrition and behavior — written for
              lifters who want more than motivation.
            </p>
          </div>
          <Link
            to="/blog"
            data-testid="journal-view-all"
            className="inline-flex items-center gap-2 px-5 py-3 rounded-md border border-[#D4AF37]/40 text-[#E5C158] font-display font-bold uppercase tracking-widest text-xs hover:bg-[#D4AF37] hover:text-black hover:border-[#D4AF37] transition-colors self-start"
          >
            View all articles <ArrowUpRight size={16} />
          </Link>
        </div>

        <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-6">
          {posts.map((p, i) => (
            <Link
              to={`/blog/${p.slug}`}
              key={p.id}
              data-testid={`journal-card-${i}`}
              className="group bg-[#121212] border border-white/5 hover:border-[#D4AF37]/40 rounded-md overflow-hidden transition-all hover:-translate-y-1"
            >
              <div className="aspect-[16/10] overflow-hidden bg-black">
                <img
                  src={p.cover_image}
                  alt={p.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
              </div>
              <div className="p-6 md:p-7">
                <div className="flex items-center justify-between text-[10px] uppercase tracking-[0.25em]">
                  <span className="text-[#D4AF37] font-bold">{p.category}</span>
                  <span className="text-zinc-500">{p.read_time}</span>
                </div>
                <h3 className="font-display text-xl md:text-2xl font-bold uppercase tracking-tight mt-4 text-white leading-tight">
                  {p.title}
                </h3>
                <p className="mt-3 text-sm text-zinc-400 line-clamp-2">{p.excerpt}</p>
                <div className="mt-5 flex items-center justify-between pt-4 border-t border-white/5">
                  <span className="text-xs text-zinc-500">{p.author}</span>
                  <ArrowUpRight
                    size={18}
                    className="text-zinc-400 group-hover:text-[#E5C158] transition-colors"
                  />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};
