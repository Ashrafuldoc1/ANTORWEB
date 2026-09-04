import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext.jsx';
import { useSettings } from '../context/SettingsContext.jsx';
import { api } from '../api.js';
import { PAYMENT_METHODS } from '../data/site.js';
import Icon from '../components/Icon.jsx';

function formatTaka(n) {
  return '৳' + Number(n || 0).toLocaleString('en-US');
}

export default function CheckoutPage() {
  const { items, subtotal, weightGrams, updateQty, removeItem, clear } = useCart();
  const { settings } = useSettings();
  const navigate = useNavigate();

  const [zone, setZone] = useState(settings.delivery_zones?.[0]?.id || 'sreemangal');
  const [payment, setPayment] = useState('COD');
  const [quote, setQuote] = useState({ subtotal: 0, delivery_charge: 0, delivery_base: 0, delivery_extra_weight: 0, total: 0, weight_grams: 0 });
  const [placing, setPlacing] = useState(false);
  const [placed, setPlaced] = useState(null); // order object
  const [error, setError] = useState('');

  const [form, setForm] = useState({
    customer_name: '',
    phone: '',
    division: 'Sylhet',
    district: 'Moulvibazar',
    upazila: 'Sreemangal',
    address: '',
  });

  useEffect(() => {
    if (!items.length) return;
    api
      .quoteOrder({ items: items.map((it) => ({ product_id: it.product_id, quantity: it.quantity })), delivery_zone: zone })
      .then(setQuote)
      .catch(() => setQuote({ subtotal, delivery_charge: 0, delivery_base: 0, delivery_extra_weight: 0, total: subtotal, weight_grams: weightGrams }));
  }, [items, zone, subtotal, weightGrams]);

  const onChange = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const submit = async (e) => {
    e.preventDefault();
    setError('');
    if (!form.customer_name || !form.phone || !form.address) {
      setError('Please fill in your name, phone and address.');
      return;
    }
    setPlacing(true);
    try {
      const order = await api.placeOrder({
        ...form,
        delivery_zone: zone,
        items: items.map((it) => ({ product_id: it.product_id, quantity: it.quantity })),
        payment_method: payment,
      });
      clear();
      setPlaced(order);
    } catch (err) {
      setError(err.message || 'Could not place order');
    } finally {
      setPlacing(false);
    }
  };

  if (placed) {
    return <OrderConfirmation order={placed} navigate={navigate} />;
  }

  return (
    <section className="bg-cream min-h-[60vh] py-10 sm:py-14">
      <div className="container-page">
        <h1 className="font-display text-3xl sm:text-4xl font-bold text-primary">Checkout</h1>
        <p className="text-sm text-muted mt-1">চেকআউট — অর্ডার করুন সহজেই</p>

        {items.length === 0 ? (
          <div className="mt-10 card p-10 text-center">
            <Icon name="cart" className="w-10 h-10 text-muted mx-auto" />
            <p className="mt-3 text-muted">Your cart is empty.</p>
            <Link to="/shop" className="btn-primary mt-4 inline-flex">Continue Shopping</Link>
          </div>
        ) : (
          <form onSubmit={submit} className="mt-8 grid lg:grid-cols-3 gap-6">
            {/* Cart items */}
            <div className="lg:col-span-2 space-y-6">
              <div className="card p-5 sm:p-6">
                <h2 className="font-display text-xl font-semibold text-ink">Your Cart</h2>
                <div className="mt-4 divide-y divide-gray-100">
                  {items.map((it) => (
                    <div key={it.product_id} className="flex items-center gap-3 py-3">
                      <img
                        src={it.image_url || `https://placehold.co/120x120/1F4A2E/D9A441?text=${encodeURIComponent(it.name)}`}
                        alt={it.name}
                        className="w-16 h-16 rounded-md object-cover bg-cream"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="font-medium text-sm line-clamp-1">{it.name}</div>
                        <div className="text-xs text-muted">{it.weight_grams ? `${it.weight_grams}g × ${it.quantity}` : ''}</div>
                        <div className="text-primary font-semibold text-sm mt-0.5">{formatTaka(it.price * it.quantity)}</div>
                      </div>
                      <div className="flex items-center gap-1">
                        <button type="button" onClick={() => updateQty(it.product_id, it.quantity - 1)} className="w-7 h-7 rounded-full bg-cream grid place-items-center text-ink hover:bg-secondary hover:text-white">
                          <Icon name="minus" className="w-3 h-3" />
                        </button>
                        <span className="w-8 text-center text-sm font-medium">{it.quantity}</span>
                        <button type="button" onClick={() => updateQty(it.product_id, it.quantity + 1)} className="w-7 h-7 rounded-full bg-cream grid place-items-center text-ink hover:bg-secondary hover:text-white">
                          <Icon name="plus" className="w-3 h-3" />
                        </button>
                      </div>
                      <button type="button" onClick={() => removeItem(it.product_id)} className="w-8 h-8 rounded-full hover:bg-red-50 text-red-600 grid place-items-center" aria-label="Remove">
                        <Icon name="trash" className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Address */}
              <div className="card p-5 sm:p-6">
                <h2 className="font-display text-xl font-semibold text-ink">Delivery Address</h2>
                <p className="text-xs text-muted mt-1">ডেলিভারি ঠিকানা — বাংলাদেশ ফরম্যাট</p>
                <div className="mt-4 grid sm:grid-cols-2 gap-3">
                  <div>
                    <label className="label">Full Name / পুরো নাম</label>
                    <input className="input" value={form.customer_name} onChange={onChange('customer_name')} required />
                  </div>
                  <div>
                    <label className="label">Phone / ফোন</label>
                    <input className="input" value={form.phone} onChange={onChange('phone')} required placeholder="01XXXXXXXXX" />
                  </div>
                  <div>
                    <label className="label">Division / বিভাগ</label>
                    <input className="input" value={form.division} onChange={onChange('division')} />
                  </div>
                  <div>
                    <label className="label">District / জেলা</label>
                    <input className="input" value={form.district} onChange={onChange('district')} />
                  </div>
                  <div>
                    <label className="label">Upazila / Thana / উপজেলা</label>
                    <input className="input" value={form.upazila} onChange={onChange('upazila')} />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="label">Street / Village Address / ঠিকানা</label>
                    <textarea rows={2} className="input" value={form.address} onChange={onChange('address')} required />
                  </div>
                </div>
              </div>

              {/* Delivery zone */}
              <div className="card p-5 sm:p-6">
                <h2 className="font-display text-xl font-semibold text-ink">Delivery Zone</h2>
                <p className="text-xs text-muted mt-1">ডেলিভারি এলাকা</p>
                <div className="mt-4 grid sm:grid-cols-3 gap-3">
                  {(settings.delivery_zones || []).map((z) => (
                    <label key={z.id} className={`cursor-pointer rounded-lg border-2 p-3 ${zone === z.id ? 'border-secondary bg-secondary/5' : 'border-gray-200 hover:border-secondary/40'}`}>
                      <input type="radio" name="zone" value={z.id} checked={zone === z.id} onChange={() => setZone(z.id)} className="hidden" />
                      <div className="font-medium text-sm text-ink">{z.label}</div>
                      <div className="text-xs text-muted">{z.labelBn}</div>
                      <div className="text-primary text-xs font-semibold mt-1">+{formatTaka(z.rate)} base</div>
                    </label>
                  ))}
                </div>
                <p className="text-xs text-muted mt-3">
                  Total weight: <strong className="text-ink">{weightGrams}g</strong> — extra {formatTaka(settings.weight_extra_per_kg)} per kg over {settings.weight_threshold_grams}g.
                </p>
              </div>

              {/* Payment */}
              <div className="card p-5 sm:p-6">
                <h2 className="font-display text-xl font-semibold text-ink">Payment Method</h2>
                <p className="text-xs text-muted mt-1">পেমেন্ট পদ্ধতি</p>
                <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {PAYMENT_METHODS.map((p) => (
                    <button
                      key={p.id}
                      type="button"
                      onClick={() => setPayment(p.id)}
                      className={`rounded-lg border-2 p-3 text-left ${payment === p.id ? 'border-primary bg-primary/5' : 'border-gray-200 hover:border-primary/40'}`}
                    >
                      <div className="font-semibold text-sm text-ink">{p.label}</div>
                      <div className="text-xs text-muted">{p.sub}</div>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Summary */}
            <aside className="lg:sticky lg:top-32 h-fit">
              <div className="card p-5 sm:p-6">
                <h3 className="font-display text-lg font-semibold text-ink">Order Summary</h3>
                <div className="mt-4 space-y-2 text-sm">
                  <div className="flex justify-between"><span className="text-muted">Subtotal</span><span>{formatTaka(quote.subtotal)}</span></div>
                  <div className="flex justify-between"><span className="text-muted">Delivery (zone base)</span><span>{formatTaka(quote.delivery_base)}</span></div>
                  <div className="flex justify-between"><span className="text-muted">Weight extra</span><span>{formatTaka(quote.delivery_extra_weight)}</span></div>
                  <div className="flex justify-between text-xs text-muted"><span>Total weight</span><span>{quote.weight_grams}g</span></div>
                  <div className="border-t border-gray-200 my-2" />
                  <div className="flex justify-between font-bold text-base"><span>Total</span><span className="text-primary">{formatTaka(quote.total)}</span></div>
                </div>

                {error && <p className="mt-3 text-sm text-red-600">{error}</p>}

                <button type="submit" disabled={placing} className="btn-primary w-full mt-5">
                  {placing ? 'Placing order…' : 'Place Order'}
                </button>
                <p className="text-xs text-muted mt-3 text-center">
                  By placing this order you agree to our terms.
                </p>
              </div>
            </aside>
          </form>
        )}
      </div>
    </section>
  );
}

function OrderConfirmation({ order, navigate }) {
  return (
    <section className="bg-cream min-h-[60vh] py-14">
      <div className="container-page max-w-2xl text-center">
        <div className="w-16 h-16 rounded-full bg-secondary/10 grid place-items-center mx-auto text-secondary">
          <Icon name="check" className="w-8 h-8" />
        </div>
        <h1 className="font-display text-3xl font-bold text-primary mt-4">Order Confirmed!</h1>
        <p className="text-muted mt-2">আপনার অর্ডার সফলভাবে গ্রহণ করা হয়েছে। ধন্যবাদ!</p>
        <div className="card p-6 mt-6 text-left">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-xs text-muted">Order ID</div>
              <div className="font-display text-2xl font-bold text-primary">{order.id}</div>
            </div>
            <span className="badge bg-gold text-white">{order.status}</span>
          </div>
          <div className="mt-3 text-sm">
            <div className="flex justify-between"><span className="text-muted">Name</span><span>{order.customer_name}</span></div>
            <div className="flex justify-between"><span className="text-muted">Phone</span><span>{order.phone}</span></div>
            <div className="flex justify-between"><span className="text-muted">Address</span><span className="text-right">{order.address}, {order.upazila}, {order.district}</span></div>
            <div className="flex justify-between font-semibold mt-2"><span>Total</span><span className="text-primary">{formatTaka(order.total)}</span></div>
          </div>
        </div>
        <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
          <Link to={`/track?id=${order.id}&phone=${order.phone}`} className="btn-primary">
            <Icon name="package" className="w-4 h-4" /> Track Order
          </Link>
          <Link to="/shop" className="btn-ghost">Continue Shopping</Link>
        </div>
      </div>
    </section>
  );
}