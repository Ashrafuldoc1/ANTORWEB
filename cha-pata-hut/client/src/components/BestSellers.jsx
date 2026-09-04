import { useEffect, useState } from 'react';
import { api } from '../api.js';
import ProductCard from './ProductCard.jsx';
import Icon from './Icon.jsx';
import { useCart } from '../context/CartContext.jsx';

export default function BestSellers({ title = 'Our Best Sellers', subtitle = 'আমাদের সেরা পণ্য', limit = 4, category = null }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { addItem } = useCart();

  useEffect(() => {
    setLoading(true);
    api
      .getProducts()
      .then((rows) => {
        let filtered = rows;
        if (category) filtered = rows.filter((p) => (p.category || '').toLowerCase() === category.toLowerCase());
        setProducts(filtered.slice(0, limit));
      })
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, [limit, category]);

  return (
    <section className="py-14 sm:py-20 bg-cream bg-grain">
      <div className="container-page">
        <div className="text-center mb-10">
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-primary">{title}</h2>
          <p className="text-muted mt-2 text-sm">{subtitle}</p>
          <div className="mt-3 flex items-center justify-center gap-2 text-gold">
            <span className="h-px w-10 bg-gold/60" />
            <Icon name="leaf" className="w-4 h-4" />
            <span className="h-px w-10 bg-gold/60" />
          </div>
        </div>

        {loading ? (
          <div className="text-center text-muted py-12">Loading…</div>
        ) : error ? (
          <div className="text-center text-red-600 py-12 text-sm">{error}</div>
        ) : products.length === 0 ? (
          <div className="text-center text-muted py-12 text-sm">No products yet. Add some from the Admin Panel.</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {products.map((p) => (
              <ProductCard key={p.id} product={p} onAdded={() => addItem(p)} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}