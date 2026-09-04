import { useState } from 'react';
import { useCart } from '../context/CartContext.jsx';
import Icon from './Icon.jsx';

function Stars({ value = 5, count = 24 }) {
  return (
    <div className="flex items-center gap-1 text-gold text-sm">
      {Array.from({ length: 5 }).map((_, i) => (
        <span key={i} className={i < value ? 'text-gold' : 'text-gray-300'}>
          <Icon name="star" className="w-3.5 h-3.5" />
        </span>
      ))}
      <span className="text-muted text-xs ml-1">({count})</span>
    </div>
  );
}

function formatTaka(n) {
  return '৳' + Number(n).toLocaleString('en-US');
}

export default function ProductCard({ product, onAdded }) {
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);

  const placeholder = `https://placehold.co/600x600/1F4A2E/D9A441?text=${encodeURIComponent(product.name)}`;
  const rating = 5;
  const reviews = 12 + ((product.id * 7) % 80);

  const handleAdd = () => {
    addItem(product, 1);
    setAdded(true);
    onAdded && onAdded(product);
    setTimeout(() => setAdded(false), 1200);
  };

  return (
    <div className="card group flex flex-col">
      <div className="relative aspect-square overflow-hidden bg-cream">
        {product.image_url ? (
          <img
            src={product.image_url.startsWith('http') ? product.image_url : product.image_url}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
            onError={(e) => {
              e.currentTarget.src = placeholder;
            }}
          />
        ) : (
          <img src={placeholder} alt={product.name} className="w-full h-full object-cover" />
        )}
        <span className="absolute top-3 left-3 badge bg-primary text-white">{product.category}</span>
      </div>
      <div className="p-4 flex flex-col flex-1">
        <h3 className="font-display text-lg font-semibold text-ink leading-snug line-clamp-1">{product.name}</h3>
        <p className="text-xs text-muted line-clamp-2 mt-1 min-h-[2rem]">{product.description}</p>
        <div className="mt-2">
          <Stars value={rating} count={reviews} />
        </div>
        <div className="mt-3 flex items-end justify-between gap-3">
          <div>
            <div className="text-primary font-bold text-lg">{formatTaka(product.price)}</div>
            {product.weight_grams ? (
              <div className="text-[11px] text-muted">{product.weight_grams}g pack</div>
            ) : null}
          </div>
          <button
            onClick={handleAdd}
            className={`btn-primary text-sm px-4 py-2 ${added ? 'bg-secondary' : ''}`}
            disabled={product.stock_quantity !== undefined && product.stock_quantity <= 0}
          >
            {product.stock_quantity <= 0 ? 'Out of stock' : added ? 'Added ✓' : 'Add to Cart'}
          </button>
        </div>
      </div>
    </div>
  );
}