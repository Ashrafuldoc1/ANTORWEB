import { Link } from 'react-router-dom';
import Icon from './Icon.jsx';
import { HERO_FEATURES } from '../data/site.js';

export default function HeroBanner() {
  return (
    <section className="relative overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            "linear-gradient(90deg, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.25) 60%, rgba(0,0,0,0.1) 100%), url('https://images.unsplash.com/photo-1565799558331-3faa15fa4ce0?auto=format&fit=crop&w=2000&q=70')",
        }}
      />
      <div className="relative container-page py-14 sm:py-20 lg:py-28 grid lg:grid-cols-2 gap-10 items-center min-h-[560px]">
        {/* Left text */}
        <div className="text-white max-w-xl">
          <span className="badge bg-gold/90 text-white uppercase tracking-wider">Pure & Natural</span>
          <h1 className="mt-4 font-display font-bold leading-[1.05] text-4xl sm:text-5xl lg:text-6xl">
            Sreemangal
            <br />
            Tea Leaves
          </h1>
          <p className="mt-4 text-base sm:text-lg text-white/85 max-w-md font-light">
            সিলেটের সেরা চা পাতার স্বাদ — বাগান থেকে আপনার চায়ের কাপ পর্যন্ত।
          </p>
          <p className="mt-2 text-sm text-white/70 max-w-md">
            The finest hand-plucked leaves from the rolling hills of Sreemangal — Sylhet's most iconic tea.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link to="/shop" className="btn-primary">Shop Now</Link>
            <Link to="/about" className="btn-outline">About Us</Link>
          </div>
        </div>

        {/* Right image */}
        <div className="hidden lg:block relative">
          <div className="relative rounded-3xl overflow-hidden shadow-2xl">
            <img
              src="https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=900&q=70"
              alt="Tea being poured"
              className="w-full h-[420px] object-cover"
            />
          </div>
          <div className="absolute -bottom-6 -left-6 w-32 h-32 rounded-full bg-gold text-primary grid place-items-center text-center font-display font-bold shadow-2xl ring-8 ring-cream">
            <div>
              <div className="text-2xl leading-none">100%</div>
              <div className="text-[11px] tracking-widest mt-1">NATURAL</div>
            </div>
          </div>
        </div>
      </div>

      {/* Feature row */}
      <div className="relative bg-white/95 backdrop-blur border-t border-gray-100">
        <div className="container-page py-5 grid grid-cols-2 sm:grid-cols-4 gap-4">
          {HERO_FEATURES.map((f) => (
            <div key={f.label} className="flex items-center gap-3">
              <span className="w-10 h-10 rounded-full bg-cream text-primary grid place-items-center shrink-0">
                <Icon name={f.icon} className="w-5 h-5" />
              </span>
              <div className="leading-tight">
                <div className="text-sm font-semibold text-ink">{f.label}</div>
                <div className="text-xs text-muted">{f.sub}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}