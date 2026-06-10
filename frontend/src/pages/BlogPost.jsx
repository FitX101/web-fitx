import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { ArrowLeft } from "lucide-react";
import { StoreButtons } from "@/components/StoreButtons";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

export default function BlogPost() {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    setNotFound(false);
    axios
      .get(`${API}/blogs/${slug}`)
      .then((res) => mounted && setPost(res.data))
      .catch(() => mounted && setNotFound(true))
      .finally(() => mounted && setLoading(false));
    return () => {
      mounted = false;
    };
  }, [slug]);

  if (loading) {
    return (
      <main className="pt-32 pb-24 min-h-screen bg-[#0A0A0A]">
        <div className="max-w-3xl mx-auto px-5 text-zinc-500" data-testid="blog-post-loading">Loading...</div>
      </main>
    );
  }

  if (notFound || !post) {
    return (
      <main className="pt-32 pb-24 min-h-screen bg-[#0A0A0A]">
        <div className="max-w-3xl mx-auto px-5">
          <h1 className="font-display text-4xl font-black uppercase">Post not found</h1>
          <Link to="/blog" className="mt-6 inline-block text-[#FF3B30]" data-testid="back-to-blog">
            ← Back to blog
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main data-testid="blog-post-page" className="pt-28 pb-24 bg-[#0A0A0A] min-h-screen">
      <article className="max-w-3xl mx-auto px-5 md:px-8">
        <Link
          to="/blog"
          data-testid="blog-back-link"
          className="inline-flex items-center gap-2 text-sm uppercase tracking-widest text-zinc-400 hover:text-[#FF3B30]"
        >
          <ArrowLeft size={16} /> All articles
        </Link>

        <div className="mt-8 flex items-center gap-4 text-[10px] uppercase tracking-[0.25em]">
          <span className="text-[#FF3B30]">{post.category}</span>
          <span className="text-zinc-500">{post.read_time}</span>
          <span className="text-zinc-500">{new Date(post.published_at).toDateString()}</span>
        </div>

        <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-black uppercase tracking-tight mt-5 leading-[0.95]">
          {post.title}
        </h1>

        <div className="mt-6 text-sm text-zinc-400">
          By <span className="text-white font-semibold">{post.author}</span>
        </div>

        <div className="mt-10 aspect-[16/9] rounded-md overflow-hidden border border-white/5">
          <img src={post.cover_image} alt={post.title} className="w-full h-full object-cover" />
        </div>

        <div className="mt-12 prose prose-invert max-w-none">
          {post.content.split("\n\n").map((para, i) => (
            <p key={i} className="text-zinc-300 text-base md:text-lg leading-relaxed mb-5">
              {para}
            </p>
          ))}
        </div>

        <div className="mt-16 p-7 md:p-10 bg-[#141414] border border-white/5 rounded-md">
          <div className="text-xs uppercase tracking-[0.25em] text-[#FF3B30]">// Ready to start?</div>
          <h3 className="font-display text-2xl md:text-3xl font-bold uppercase tracking-tight mt-3">
            Download FitX free
          </h3>
          <p className="mt-3 text-zinc-400 text-sm">
            Your AI fitness & diet coach, ready in less than a minute.
          </p>
          <div className="mt-6">
            <StoreButtons source="blog-post" />
          </div>
        </div>
      </article>
    </main>
  );
}
