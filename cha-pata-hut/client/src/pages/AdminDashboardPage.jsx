import { useEffect, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { api, getAdminToken, setAdminToken } from '../api.js';
import Icon from '../components/Icon.jsx';
import { ORDER_STAGES } from '../data/site.js';

function formatTaka(n) {
  return '৳' + Number(n || 0).toLocaleString('en-US');
}

function ProductForm({ initial, onCancel, onSaved }) {
  const [form, setForm] = useState({
    name: initial?.name || '',
    category: initial?.category || 'Green Tea',
    description: initial?.description || '',
    price: initial?.price ?? 0,
    stock_quantity: initial?.stock_quantity ?? 0,
    weight_grams: initial?.weight_grams ?? 0,
    image_url: initial?.image_url || '',
  });
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(initial?.image_url || '');
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!file) return;
    const url = URL.createObjectURL(file);
    setPreview(url);
    return () => URL.revokeObjectURL(url);
  }, [file]);

  const onChange = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));
  const onFile = (e) => {
    const f = e.target.files?.[0];
    if (f) setFile(f);
  };

  const onDrop = (e) => {
    e.preventDefault();
    const f = e.dataTransfer.files?.[0];
    if (f && f.type.startsWith('image/')) setFile(f);
  };

  const save = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError('');
    try {
      const fd = new FormData();
      fd.append('name', form.name);
      fd.append('category', form.category);
      fd.append('description', form.description);
      fd.append('price', form.price);
      fd.append('stock_quantity', form.stock_quantity);
      fd.append('weight_grams', form.weight_grams);
      if (file) fd.append('image', file);
      else fd.append('image_url', form.image_url);
      if (initial) await api.adminUpdateProduct(initial.id, fd);
      else await api.adminCreateProduct(fd);
      onSaved();
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <form onSubmit={save} className="card p-5 mt-4">
      <div className="grid lg:grid-cols-2 gap-5">
        <div>
          <label
            onDragOver={(e) => e.preventDefault()}
            onDrop={onDrop}
            className="rounded-lg border-2 border-dashed border-gray-300 hover:border-secondary p-4 grid place-items-center text-center cursor-pointer bg-cream/40"
          >
            <input type="file" accept="image/*" onChange={onFile} className="hidden" />
            {preview ? (
              <img src={preview} alt="preview" className="max-h-56 rounded-md object-contain" />
            ) : (
              <div className="py-6 text-muted text-sm">
                <Icon name="upload" className="w-8 h-8 mx-auto text-secondary" />
                <div className="mt-2 font-medium text-ink">Drag & drop image</div>
                <div>or tap to upload</div>
              </div>
            )}
          </label>
          {preview && (
            <button type="button" onClick={() => { setFile(null); setPreview(''); setForm((f) => ({ ...f, image_url: '' })); }} className="text-xs text-red-600 mt-2">
              Remove image
            </button>
          )}
        </div>
        <div className="space-y-3">
          <div>
            <label className="label">Title / নাম</label>
            <input className="input" value={form.name} onChange={onChange('name')} required />
          </div>
          <div>
            <label className="label">Category / ক্যাটাগরি</label>
            <select className="input" value={form.category} onChange={onChange('category')}>
              <option>Green Tea</option>
              <option>Rosella Tea</option>
              <option>Black Tea</option>
              <option>Tea Gifts</option>
            </select>
          </div>
          <div>
            <label className="label">Description / বিবরণ</label>
            <textarea rows={3} className="input" value={form.description} onChange={onChange('description')} />
          </div>
          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="label">Price (৳)</label>
              <input type="number" min="0" className="input" value={form.price} onChange={onChange('price')} required />
            </div>
            <div>
              <label className="label">Stock</label>
              <input type="number" min="0" className="input" value={form.stock_quantity} onChange={onChange('stock_quantity')} />
            </div>
            <div>
              <label className="label">Weight (g)</label>
              <input type="number" min="0" className="input" value={form.weight_grams} onChange={onChange('weight_grams')} />
            </div>
          </div>
        </div>
      </div>
      {error && <p className="text-sm text-red-600 mt-3">{error}</p>}
      <div className="flex items-center justify-end gap-2 mt-5">
        <button type="button" onClick={onCancel} className="btn-ghost">Cancel</button>
        <button type="submit" className="btn-primary" disabled={saving}>
          {saving ? 'Saving…' : initial ? 'Save Changes' : 'Add Product'}
        </button>
      </div>
    </form>
  );
}

function SettingsPanel({ settings, onSaved }) {
  const [zones, setZones] = useState(settings.delivery_zones || []);
  const [threshold, setThreshold] = useState(settings.weight_threshold_grams || 1000);
  const [perKg, setPerKg] = useState(settings.weight_extra_per_kg || 40);
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState('');

  const save = async () => {
    setSaving(true);
    setMsg('');
    try {
      await api.adminSaveSettings({ delivery_zones: zones, weight_threshold_grams: Number(threshold), weight_extra_per_kg: Number(perKg) });
      setMsg('Settings saved.');
      onSaved();
    } catch (e) {
      setMsg(e.message);
    } finally {
      setSaving(false);
    }
  };

  const updateZone = (i, k, v) => {
    setZones((arr) => arr.map((z, idx) => (idx === i ? { ...z, [k]: k === 'rate' ? Number(v) : v } : z)));
  };

  return (
    <div className="card p-5 mt-4">
      <h3 className="font-display text-lg font-semibold text-ink">Delivery Settings</h3>
      <p className="text-xs text-muted mt-1">ডেলিভারি জোন ও ওজন ভিত্তিক চার্জ</p>
      <div className="mt-4 space-y-3">
        {zones.map((z, i) => (
          <div key={z.id} className="grid sm:grid-cols-3 gap-2 items-end">
            <div>
              <label className="label">Zone ID</label>
              <input className="input" value={z.id} disabled />
            </div>
            <div>
              <label className="label">Label</label>
              <input className="input" value={z.label} onChange={(e) => updateZone(i, 'label', e.target.value)} />
            </div>
            <div>
              <label className="label">Rate (৳)</label>
              <input className="input" type="number" min="0" value={z.rate} onChange={(e) => updateZone(i, 'rate', e.target.value)} />
            </div>
          </div>
        ))}
      </div>
      <div className="mt-4 grid sm:grid-cols-2 gap-3">
        <div>
          <label className="label">Weight threshold (grams)</label>
          <input className="input" type="number" min="0" value={threshold} onChange={(e) => setThreshold(e.target.value)} />
        </div>
        <div>
          <label className="label">Extra per kg (৳)</label>
          <input className="input" type="number" min="0" value={perKg} onChange={(e) => setPerKg(e.target.value)} />
        </div>
      </div>
      {msg && <p className="text-xs text-muted mt-2">{msg}</p>}
      <div className="text-right mt-4">
        <button onClick={save} className="btn-primary" disabled={saving}>
          {saving ? 'Saving…' : 'Save Settings'}
        </button>
      </div>
    </div>
  );
}

export default function AdminDashboardPage() {
  const token = getAdminToken();
  const navigate = useNavigate();
  const [tab, setTab] = useState('orders');
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [settings, setSettings] = useState(null);
  const [editing, setEditing] = useState(null);
  const [adding, setAdding] = useState(false);
  const [loading, setLoading] = useState(true);

  if (!token) return <Navigate to="/admin" replace />;

  const load = async () => {
    setLoading(true);
    try {
      const [p, o, s] = await Promise.all([api.getProducts(), api.adminGetOrders(), api.getSettings()]);
      setProducts(p);
      setOrders(o);
      setSettings(s);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  const logout = () => { setAdminToken(null); navigate('/admin'); };

  const updateStatus = async (id, status) => {
    try {
      await api.adminUpdateOrderStatus(id, status);
      load();
    } catch (e) {
      alert(e.message);
    }
  };

  const removeProduct = async (id) => {
    if (!confirm('Delete this product?')) return;
    await api.adminDeleteProduct(id);
    load();
  };

  return (
    <section className="bg-cream min-h-[70vh] py-8">
      <div className="container-page">
        <div className="flex items-center justify-between flex-wrap gap-3">
          <div>
            <h1 className="font-display text-3xl font-bold text-primary">Admin Dashboard</h1>
            <p className="text-muted text-sm">অ্যাডমিন প্যানেল — Cha Pata Hut</p>
          </div>
          <button onClick={logout} className="btn-ghost">
            <Icon name="logout" className="w-4 h-4" /> Logout
          </button>
        </div>

        <div className="mt-6 flex gap-2 border-b border-gray-200 overflow-x-auto no-scrollbar">
          {[
            ['orders', 'Manage Orders'],
            ['products', 'Manage Products'],
            ['settings', 'Delivery Settings'],
          ].map(([k, label]) => (
            <button
              key={k}
              onClick={() => { setTab(k); setAdding(false); setEditing(null); }}
              className={`px-4 py-2 text-sm font-medium border-b-2 -mb-px ${tab === k ? 'border-primary text-primary' : 'border-transparent text-muted hover:text-primary'}`}
            >
              {label}
            </button>
          ))}
        </div>

        {loading && <div className="mt-8 text-muted">Loading…</div>}

        {tab === 'orders' && !loading && (
          <div className="mt-6 card overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-cream text-muted text-xs uppercase">
                <tr>
                  <th className="text-left p-3">Order ID</th>
                  <th className="text-left p-3">Customer</th>
                  <th className="text-left p-3">Phone</th>
                  <th className="text-left p-3">Total</th>
                  <th className="text-left p-3">Date</th>
                  <th className="text-left p-3">Status</th>
                </tr>
              </thead>
              <tbody>
                {orders.length === 0 && (
                  <tr><td colSpan="6" className="p-6 text-center text-muted">No orders yet.</td></tr>
                )}
                {orders.map((o) => (
                  <tr key={o.id} className="border-t border-gray-100">
                    <td className="p-3 font-mono font-bold text-primary">{o.id}</td>
                    <td className="p-3">{o.customer_name}<div className="text-xs text-muted">{o.delivery_zone}</div></td>
                    <td className="p-3">{o.phone}</td>
                    <td className="p-3 font-semibold">{formatTaka(o.total)}</td>
                    <td className="p-3 text-xs text-muted">{new Date(o.created_at.replace(' ', 'T') + 'Z').toLocaleString('en-GB')}</td>
                    <td className="p-3">
                      <select
                        value={o.status}
                        onChange={(e) => updateStatus(o.id, e.target.value)}
                        className="rounded-md border border-gray-200 px-2 py-1.5 text-xs bg-white"
                      >
                        {ORDER_STAGES.map((s) => (
                          <option key={s.key} value={s.key}>{s.label}</option>
                        ))}
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {tab === 'products' && !loading && (
          <div className="mt-6">
            <div className="flex items-center justify-between">
              <h2 className="font-display text-xl font-semibold text-ink">Products ({products.length})</h2>
              {!adding && !editing && (
                <button onClick={() => setAdding(true)} className="btn-primary">
                  <Icon name="plus" className="w-4 h-4" /> Add Product
                </button>
              )}
            </div>

            {adding && (
              <ProductForm onCancel={() => setAdding(false)} onSaved={() => { setAdding(false); load(); }} />
            )}
            {editing && (
              <ProductForm initial={editing} onCancel={() => setEditing(null)} onSaved={() => { setEditing(null); load(); }} />
            )}

            {!adding && !editing && (
              <div className="mt-4 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {products.length === 0 && (
                  <div className="card p-6 text-muted text-center col-span-full">No products yet. Click "Add Product" to create your first.</div>
                )}
                {products.map((p) => (
                  <div key={p.id} className="card p-4 flex gap-3">
                    <img
                      src={p.image_url || `https://placehold.co/120x120/1F4A2E/D9A441?text=${encodeURIComponent(p.name)}`}
                      alt={p.name}
                      className="w-20 h-20 rounded-md object-cover bg-cream"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="font-semibold text-sm line-clamp-1">{p.name}</div>
                      <div className="text-xs text-muted">{p.category} · {p.weight_grams}g · stock {p.stock_quantity}</div>
                      <div className="text-primary font-bold mt-0.5">{formatTaka(p.price)}</div>
                      <div className="mt-2 flex gap-2">
                        <button onClick={() => setEditing(p)} className="text-xs px-3 py-1 rounded bg-cream hover:bg-secondary hover:text-white">
                          <Icon name="edit" className="w-3 h-3 inline -mt-0.5" /> Edit
                        </button>
                        <button onClick={() => removeProduct(p.id)} className="text-xs px-3 py-1 rounded bg-cream text-red-600 hover:bg-red-50">
                          <Icon name="trash" className="w-3 h-3 inline -mt-0.5" /> Delete
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {tab === 'settings' && !loading && settings && (
          <SettingsPanel settings={settings} onSaved={load} />
        )}
      </div>
    </section>
  );
}