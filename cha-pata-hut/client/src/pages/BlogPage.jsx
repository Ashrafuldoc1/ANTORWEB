import { BLOG_POSTS } from '../data/site.js';
import BlogCard from '../components/BlogCard.jsx';
import Icon from '../components/Icon.jsx';

export default function BlogPage() {
  return (
    <section className="bg-cream py-12 sm:py-16">
      <div className="container-page">
        <div className="text-center mb-8">
          <h1 className="font-display text-3xl sm:text-4xl font-bold text-primary">From Our Blog</h1>
          <p className="text-muted mt-1">চা ও স্বাস্থ্য সম্পর্কে লেখা</p>
          <div className="mt-3 flex items-center justify-center gap-2 text-gold">
            <span className="h-px w-10 bg-gold/60" />
            <Icon name="leaf" className="w-4 h-4" />
            <span className="h-px w-10 bg-gold/60" />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {BLOG_POSTS.map((p) => <BlogCard key={p.id} post={p} />)}
        </div>
      </div>
    </section>
  );
}