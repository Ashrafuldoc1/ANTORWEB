import { Link } from 'react-router-dom';
import Icon from './Icon.jsx';
import { BLOG_POSTS } from '../data/site.js';

export default function BlogCard({ post }) {
  return (
    <article className="card group flex flex-col">
      <div className="relative aspect-[16/10] overflow-hidden">
        <img
          src={post.image}
          alt={post.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
      </div>
      <div className="p-5 flex flex-col flex-1">
        <div className="text-xs text-muted">{post.date}</div>
        <h3 className="mt-1 font-display text-lg font-semibold text-ink leading-snug line-clamp-2">{post.title}</h3>
        <p className="text-sm text-muted mt-2 line-clamp-2">{post.excerpt}</p>
        <Link to="/blog" className="mt-4 inline-flex items-center gap-1 text-secondary font-medium text-sm hover:text-primary">
          Read More →
        </Link>
      </div>
    </article>
  );
}

export function BlogSection() {
  return (
    <section className="py-14 sm:py-20 bg-cream bg-grain">
      <div className="container-page">
        <div className="text-center mb-10">
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-primary">From Our Blog</h2>
          <p className="text-muted mt-2 text-sm">আমাদের ব্লগ থেকে</p>
          <div className="mt-3 flex items-center justify-center gap-2 text-gold">
            <span className="h-px w-10 bg-gold/60" />
            <Icon name="leaf" className="w-4 h-4" />
            <span className="h-px w-10 bg-gold/60" />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {BLOG_POSTS.map((p) => (
            <BlogCard key={p.id} post={p} />
          ))}
        </div>
      </div>
    </section>
  );
}