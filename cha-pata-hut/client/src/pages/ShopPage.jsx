import { useEffect, useState } from 'react';
import { api } from '../api.js';
import ProductCard from '../components/ProductCard.jsx';
import Icon from '../components/Icon.jsx';
import { CATEGORIES } from '../data/site.js';

export default function ShopPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('All');
  const [search, setSearch] = useState('');

  useEffect(() => {
    api.getProducts().then((rows) => setProducts(rows)).finally(() => setLoading(false));
  }, []);

  const list = products.filter((p) => {
    const matchCat = filter === 'All' || (p.category || '').toLowerCase() === filter.toLowerCase();
    const matchSearch = !search || p.name.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  const allCategories = ['All', ...CATEGORIES.map((c) => c.name)];

  return (
    <section className="bg-cream py-12 sm:py-16">
      <div className="container-page">
        <div className="text-center mb-8">
          <h1 className="font-display text-3xl sm:text-4xl font-bold text-primary">Shop All Tea</h1>
          <p className="text-muted mt-1">আমাদের সম্পূর্ণ চা সংগ্রহ</p>
          <div className="mt-3 flex items-center justify-center gap-2 text-gold">
            <span className="h-px w-10 bg-gold/60" />
            <Icon name="leaf" className="w-4 h-4" />
            <span className="h-px w-10 bg-gold/60" />
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 mb-6 items-center justify-between">
          <div className="flex flex-wrap gap-2 justify-center">
            {allCategories.map((c) => (
              <button
                key={c}
                onClick={() => setFilter(c)}
                className={`px-3.5 py-1.5 rounded-full text-sm font-medium border ${filter === c ? 'bg-primary text-white border-primary' : 'bg-white border-gray-200 text-ink hover:border-primary'}`}
              >
                {c}
              </button>
            ))}
          </div>
          <div className="relative w-full sm:w-64">
            <Icon name="search" className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted" />
            <input
              className="input pl-9"
              placeholder="Search teas…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>

        {loading ? (
          <div className="text-center text-muted py-10">Loading…</div>
        ) : list.length === 0 ? (
          <div className="text-center text-muted py-10 text-sm">No products match your search.</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {list.map((p) => <ProductCard key={p.id} product={p} />)}
          </div>
        )}
      </div>
    </section>
  );
}