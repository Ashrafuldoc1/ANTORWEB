import Icon from './Icon.jsx';
import { TESTIMONIALS } from '../data/site.js';

export default function TestimonialCard({ t }) {
  return (
    <div className="card p-6 sm:p-7 flex flex-col h-full">
      <Icon name="quote" className="w-8 h-8 text-gold" />
      <p className="mt-3 text-ink/85 leading-relaxed flex-1 text-[15px]">{t.quote}</p>
      <div className="mt-5 flex items-center gap-3">
        <img src={t.avatar} alt={t.name} className="w-11 h-11 rounded-full object-cover ring-2 ring-cream" loading="lazy" />
        <div className="flex-1">
          <div className="font-semibold text-sm">{t.name}</div>
          <div className="text-xs text-muted">{t.city}</div>
        </div>
        <div className="flex text-gold">
          {Array.from({ length: t.rating || 5 }).map((_, i) => (
            <Icon key={i} name="star" className="w-3.5 h-3.5" />
          ))}
        </div>
      </div>
    </div>
  );
}

export function TestimonialsSection() {
  return (
    <section className="py-14 sm:py-20 bg-white">
      <div className="container-page">
        <div className="text-center mb-10">
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-primary">What Our Customers Say</h2>
          <p className="text-muted mt-2 text-sm">আমাদের ক্রেতাদের মতামত</p>
          <div className="mt-3 flex items-center justify-center gap-2 text-gold">
            <span className="h-px w-10 bg-gold/60" />
            <Icon name="leaf" className="w-4 h-4" />
            <span className="h-px w-10 bg-gold/60" />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {TESTIMONIALS.map((t, i) => (
            <TestimonialCard key={i} t={t} />
          ))}
        </div>
      </div>
    </section>
  );
}