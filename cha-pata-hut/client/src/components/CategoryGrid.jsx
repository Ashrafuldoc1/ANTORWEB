import { Link } from 'react-router-dom';
import { CATEGORIES } from '../data/site.js';
import Icon from './Icon.jsx';

export default function CategoryGrid() {
  return (
    <section className="py-14 sm:py-20 bg-cream bg-tea-pattern">
      <div className="container-page">
        <div className="text-center mb-10">
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-primary">Our Popular Categories</h2>
          <p className="text-muted mt-2 text-sm">আমাদের জনপ্রিয় ক্যাটাগরি</p>
          <div className="mt-3 flex items-center justify-center gap-2 text-gold">
            <span className="h-px w-10 bg-gold/60" />
            <Icon name="leaf" className="w-4 h-4" />
            <span className="h-px w-10 bg-gold/60" />
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {CATEGORIES.map((c) => (
            <Link
              key={c.slug}
              to={`/category/${c.slug}`}
              className="card group relative aspect-square overflow-hidden"
            >
              <img
                src={c.image}
                alt={c.name}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/85 via-primary/30 to-transparent" />
              <div className="absolute inset-x-4 bottom-4 text-white">
                <h3 className="font-display text-2xl font-bold">{c.name}</h3>
                <p className="text-xs text-white/80">{c.tagline}</p>
                <span className="mt-2 inline-flex items-center gap-1 text-sm text-gold font-medium group-hover:underline">
                  Shop Now →
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}