import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { api } from '../api.js';
import ProductCard from '../components/ProductCard.jsx';
import Icon from '../components/Icon.jsx';
import { CATEGORIES } from '../data/site.js';

export default function CategoryPage() {
  const { slug } = useParams();
  const cat = CATEGORIES.find((c) => c.slug === slug);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    api.getProducts()
      .then((rows) => {
        const matchName = cat ? cat.name : '';
        setProducts(rows.filter((p) => (p.category || '').toLowerCase() === (matchName || '').toLowerCase()));
      })
      .finally(() => setLoading(false));
  }, [slug, cat]);

  const title = cat ? cat.name : 'Shop';
  const sub = cat ? cat.tagline : 'All our teas';

  return (
    <section className="bg-cream py-12 sm:py-16">
      <div className="container-page">
        <div className="text-center mb-8">
          <h1 className="font-display text-3xl sm:text-4xl font-bold text-primary">{title}</h1>
          <p className="text-muted mt-1">{sub}</p>
          <div className="mt-3 flex items-center justify-center gap-2 text-gold">
            <span className="h-px w-10 bg-gold/60" />
            <Icon name="leaf" className="w-4 h-4" />
            <span className="h-px w-10 bg-gold/60" />
          </div>
        </div>
        {loading ? (
          <div className="text-center text-muted py-10">Loading…</div>
        ) : products.length === 0 ? (
          <div className="text-center text-muted py-10 text-sm">No products in this category yet.</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {products.map((p) => <ProductCard key={p.id} product={p} />)}
          </div>
        )}
      </div>
    </section>
  );
}