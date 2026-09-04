import { useState } from 'react';
import { Link } from 'react-router-dom';
import Icon from './Icon.jsx';
import { useSettings } from '../context/SettingsContext.jsx';

export default function Footer() {
  const { settings } = useSettings();
  const site = settings.site || {};
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const onSubscribe = (e) => {
    e.preventDefault();
    if (!email) return;
    setSubscribed(true);
    setEmail('');
    setTimeout(() => setSubscribed(false), 3500);
  };

  return (
    <footer className="bg-primary text-white mt-auto">
      <div className="container-page py-12 sm:py-16 grid gap-10 md:grid-cols-2 lg:grid-cols-4">
        {/* Newsletter */}
        <div>
          <h3 className="font-display text-2xl font-bold">Stay Updated</h3>
          <p className="text-white/75 text-sm mt-2">
            নতুন চা ও অফার সম্পর্কে আপডেট পেতে সাবস্ক্রাইব করুন।
          </p>
          <form onSubmit={onSubscribe} className="mt-4 flex gap-2">
            <input
              type="email"
              required
              placeholder="your@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 rounded-md px-3 py-2.5 text-sm text-ink bg-white placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-gold/40"
            />
            <button type="submit" className="rounded-md bg-gold text-ink font-medium px-4 py-2.5 text-sm hover:bg-white">
              Subscribe
            </button>
          </form>
          {subscribed && <p className="mt-2 text-xs text-gold">ধন্যবাদ! আপনি সাবস্ক্রাইব করেছেন।</p>}
          <div className="mt-6 flex items-center gap-3">
            {[
              { name: 'facebook', href: site.facebook },
              { name: 'instagram', href: site.instagram },
              { name: 'youtube', href: site.youtube },
              { name: 'tiktok', href: site.tiktok },
            ].map((s) => (
              <a key={s.name} href={s.href} target="_blank" rel="noreferrer" className="w-9 h-9 rounded-full bg-white/10 hover:bg-gold hover:text-primary grid place-items-center transition" aria-label={s.name}>
                <Icon name={s.name} className="w-4 h-4" />
              </a>
            ))}
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="font-display text-lg font-semibold">Quick Links</h4>
          <ul className="mt-3 space-y-2 text-sm text-white/85">
            {[
              ['/', 'Home'],
              ['/about', 'About Us'],
              ['/shop', 'Shop'],
              ['/category/green-tea', 'Green Tea'],
              ['/category/rosella-tea', 'Rosella Tea'],
              ['/blog', 'Blog'],
              ['/contact', 'Contact'],
            ].map(([to, label]) => (
              <li key={to}>
                <Link to={to} className="hover:text-gold">{label}</Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Customer Service */}
        <div>
          <h4 className="font-display text-lg font-semibold">Customer Service</h4>
          <ul className="mt-3 space-y-2 text-sm text-white/85">
            <li><Link to="/admin" className="hover:text-gold">My Account</Link></li>
            <li><Link to="/track" className="hover:text-gold">Order Tracking</Link></li>
            <li><a href="#" className="hover:text-gold">Wishlist</a></li>
            <li><a href="#" className="hover:text-gold">Shipping Policy</a></li>
            <li><a href="#" className="hover:text-gold">Return Policy</a></li>
            <li><a href="#" className="hover:text-gold">FAQ</a></li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="font-display text-lg font-semibold">Contact Us</h4>
          <ul className="mt-3 space-y-3 text-sm text-white/85">
            <li className="flex items-start gap-2">
              <Icon name="phone" className="w-4 h-4 mt-0.5 text-gold" />
              <a href={`tel:${site.phone}`} className="hover:text-gold">{site.phone}</a>
            </li>
            <li className="flex items-start gap-2">
              <Icon name="mail" className="w-4 h-4 mt-0.5 text-gold" />
              <a href={`mailto:${site.email}`} className="hover:text-gold break-all">{site.email}</a>
            </li>
            <li className="flex items-start gap-2">
              <Icon name="pin" className="w-4 h-4 mt-0.5 text-gold" />
              <span>{site.address}</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="container-page py-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-white/75">
          <div>© {new Date().getFullYear()} Cha Pata Hut — Sreemangal. All rights reserved.</div>
          <div className="flex items-center gap-2">
            <span className="px-2 py-1 rounded bg-white/10 font-semibold text-[10px]">bKash</span>
            <span className="px-2 py-1 rounded bg-white/10 font-semibold text-[10px]">Nagad</span>
            <span className="px-2 py-1 rounded bg-white/10 font-semibold text-[10px]">Rocket</span>
            <span className="px-2 py-1 rounded bg-white/10 font-semibold text-[10px]">Visa</span>
            <span className="px-2 py-1 rounded bg-white/10 font-semibold text-[10px]">Mastercard</span>
            <span className="px-2 py-1 rounded bg-white/10 font-semibold text-[10px]">COD</span>
          </div>
        </div>
      </div>
    </footer>
  );
}