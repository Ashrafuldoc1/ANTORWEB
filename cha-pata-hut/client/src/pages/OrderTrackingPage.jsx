import { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { api } from '../api.js';
import { ORDER_STAGES } from '../data/site.js';
import Icon from '../components/Icon.jsx';
import { useSettings } from '../context/SettingsContext.jsx';

function formatTaka(n) {
  return '৳' + Number(n || 0).toLocaleString('en-US');
}

function estimateDelivery(createdAt, status) {
  if (!createdAt) return '—';
  const created = new Date(createdAt.replace(' ', 'T') + 'Z');
  const eta = new Date(created.getTime() + 3 * 24 * 60 * 60 * 1000);
  const text = eta.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
  if (status === 'Delivered') return 'Delivered';
  return text;
}

export default function OrderTrackingPage() {
  const { settings } = useSettings();
  const [params, setParams] = useSearchParams();
  const initialId = params.get('id') || '';
  const initialPhone = params.get('phone') || '';
  const [form, setForm] = useState({ id: initialId, phone: initialPhone });
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [searched, setSearched] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    if (!form.id || !form.phone) {
      setError('Please enter both Order ID and Phone Number.');
      return;
    }
    setLoading(true);
    setError('');
    setOrder(null);
    setSearched(true);
    try {
      const o = await api.trackOrder(form.id.trim(), form.phone.trim());
      setOrder(o);
      setParams({ id: form.id.trim(), phone: form.phone.trim() });
    } catch (err) {
      if (err.status === 404) setError('NOT_FOUND');
      else setError(err.message || 'Lookup failed');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (initialId && initialPhone) {
      (async () => {
        setLoading(true);
        try {
          const o = await api.trackOrder(initialId, initialPhone);
          setOrder(o);
          setSearched(true);
        } catch {
          setSearched(true);
        } finally {
          setLoading(false);
        }
      })();
    }
  }, []); // eslint-disable-line

  let items = [];
  try {
    items = order ? JSON.parse(order.items) : [];
  } catch {
    items = [];
  }

  const currentIdx = order ? ORDER_STAGES.findIndex((s) => s.key === order.status) : -1;

  return (
    <section className="bg-cream min-h-[60vh] py-10 sm:py-14">
      <div className="container-page">
        <div className="text-center mb-8">
          <h1 className="font-display text-3xl sm:text-4xl font-bold text-primary">Track Your Order</h1>
          <p className="text-muted mt-2">আপনার অর্ডার ট্র্যাক করুন</p>
        </div>

        <form onSubmit={submit} className="card p-5 sm:p-6 max-w-2xl mx-auto">
          <div className="grid sm:grid-cols-2 gap-3">
            <div>
              <label className="label">Order ID</label>
              <input className="input" placeholder="e.g. CPH-12345" value={form.id} onChange={(e) => setForm((f) => ({ ...f, id: e.target.value }))} required />
            </div>
            <div>
              <label className="label">Phone Number</label>
              <input className="input" placeholder="01XXXXXXXXX" value={form.phone} onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))} required />
            </div>
          </div>
          <button type="submit" className="btn-primary w-full mt-4" disabled={loading}>
            {loading ? 'Looking up…' : 'Track Order'}
          </button>
        </form>

        {searched && !order && error === 'NOT_FOUND' && (
          <div className="card p-6 mt-6 max-w-2xl mx-auto text-center">
            <div className="text-5xl">😕</div>
            <h3 className="font-display text-xl font-bold text-primary mt-2">অর্ডার খুঁজে পাওয়া যায়নি</h3>
            <p className="text-muted mt-1">Order not found — please check your Order ID and phone number.</p>
            <button onClick={() => { setSearched(false); setError(''); setOrder(null); setForm({ id: '', phone: '' }); setParams({}); }} className="btn-ghost mt-4">
              Try Again
            </button>
          </div>
        )}

        {searched && !order && error && error !== 'NOT_FOUND' && (
          <div className="card p-6 mt-6 max-w-2xl mx-auto text-center text-red-600">{error}</div>
        )}

        {order && (
          <div className="mt-8 grid lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              {/* Progress tracker */}
              <div className="card p-5 sm:p-6">
                <div className="flex items-center justify-between flex-wrap gap-3">
                  <div>
                    <div className="text-xs text-muted">Order ID</div>
                    <div className="font-display text-2xl font-bold text-primary">{order.id}</div>
                  </div>
                  <span className="badge bg-gold text-white">{order.status}</span>
                </div>
                <div className="mt-6">
                  <div className="hidden sm:flex items-center justify-between">
                    {ORDER_STAGES.map((s, i) => {
                      const done = i < currentIdx;
                      const active = i === currentIdx;
                      return (
                        <div key={s.key} className="flex-1 flex items-center">
                          <div className="flex flex-col items-center min-w-0">
                            <div
                              className={`w-9 h-9 rounded-full grid place-items-center text-white ${
                                done ? 'bg-secondary' : active ? 'bg-primary ring-4 ring-primary/20' : 'bg-gray-200 text-gray-500'
                              }`}
                            >
                              {done ? <Icon name="check" className="w-4 h-4" /> : <span className="text-xs font-bold">{i + 1}</span>}
                            </div>
                            <div className={`mt-2 text-center text-xs font-medium ${active ? 'text-primary' : done ? 'text-ink' : 'text-muted'}`}>
                              {s.label}
                              <div className="text-[10px] text-muted">{s.sub}</div>
                            </div>
                          </div>
                          {i < ORDER_STAGES.length - 1 && (
                            <div className={`flex-1 h-0.5 mx-2 ${i < currentIdx ? 'bg-secondary' : 'bg-gray-200'}`} />
                          )}
                        </div>
                      );
                    })}
                  </div>
                  {/* Mobile vertical tracker */}
                  <div className="sm:hidden space-y-3 mt-3">
                    {ORDER_STAGES.map((s, i) => {
                      const done = i < currentIdx;
                      const active = i === currentIdx;
                      return (
                        <div key={s.key} className="flex items-center gap-3">
                          <div className={`w-8 h-8 rounded-full grid place-items-center text-white ${done ? 'bg-secondary' : active ? 'bg-primary' : 'bg-gray-200 text-gray-500'}`}>
                            {done ? <Icon name="check" className="w-3.5 h-3.5" /> : <span className="text-xs font-bold">{i + 1}</span>}
                          </div>
                          <div>
                            <div className={`text-sm font-medium ${active ? 'text-primary' : 'text-ink'}`}>{s.label}</div>
                            <div className="text-xs text-muted">{s.sub}</div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
                <div className="mt-5 grid sm:grid-cols-3 gap-3 text-sm">
                  <div className="rounded-lg bg-cream p-3">
                    <div className="text-xs text-muted">Order Date</div>
                    <div className="font-medium">{new Date(order.created_at.replace(' ', 'T') + 'Z').toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}</div>
                  </div>
                  <div className="rounded-lg bg-cream p-3">
                    <div className="text-xs text-muted">Estimated Delivery</div>
                    <div className="font-medium">{estimateDelivery(order.created_at, order.status)}</div>
                  </div>
                  <div className="rounded-lg bg-cream p-3">
                    <div className="text-xs text-muted">Payment</div>
                    <div className="font-medium">{order.payment_method}</div>
                  </div>
                </div>
              </div>

              {/* Items */}
              <div className="card p-5 sm:p-6">
                <h3 className="font-display text-lg font-semibold text-ink">Items</h3>
                <div className="mt-3 divide-y divide-gray-100">
                  {items.map((it, idx) => (
                    <div key={idx} className="flex items-center justify-between py-2 text-sm">
                      <div>
                        <div className="font-medium">{it.name}</div>
                        <div className="text-xs text-muted">{it.quantity} × {formatTaka(it.price)}</div>
                      </div>
                      <div className="font-semibold">{formatTaka(it.price * it.quantity)}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <aside>
              <div className="card p-5 sm:p-6">
                <h3 className="font-display text-lg font-semibold text-ink">Summary</h3>
                <div className="mt-3 space-y-2 text-sm">
                  <div className="flex justify-between"><span className="text-muted">Subtotal</span><span>{formatTaka(order.subtotal)}</span></div>
                  <div className="flex justify-between"><span className="text-muted">Delivery</span><span>{formatTaka(order.delivery_charge)}</span></div>
                  <div className="border-t border-gray-200 my-2" />
                  <div className="flex justify-between font-bold"><span>Total</span><span className="text-primary">{formatTaka(order.total)}</span></div>
                </div>
                <div className="mt-4">
                  <h4 className="text-xs uppercase tracking-wider text-muted">Shipping to</h4>
                  <div className="text-sm mt-1">{order.customer_name}<br/>{order.address}<br/>{order.upazila}, {order.district}, {order.division}</div>
                </div>
                <a
                  href={`tel:${settings.site?.phone || ''}`}
                  className="btn-primary w-full mt-4"
                >
                  Contact Support
                </a>
              </div>
            </aside>
          </div>
        )}
      </div>
    </section>
  );
}