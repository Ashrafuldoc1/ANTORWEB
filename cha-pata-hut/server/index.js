import express from 'express';
import cors from 'cors';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import Database from 'better-sqlite3';
import { customAlphabet } from 'nanoid';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DATA_DIR = path.join(__dirname, 'data');
const UPLOADS_DIR = path.join(__dirname, 'uploads');
if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });
if (!fs.existsSync(UPLOADS_DIR)) fs.mkdirSync(UPLOADS_DIR, { recursive: true });

const db = new Database(path.join(DATA_DIR, 'cha-pata-hut.db'));
db.pragma('journal_mode = WAL');

db.exec(`
  CREATE TABLE IF NOT EXISTS products (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    category TEXT NOT NULL,
    description TEXT DEFAULT '',
    price REAL NOT NULL,
    image_url TEXT DEFAULT '',
    stock_quantity INTEGER DEFAULT 0,
    weight_grams INTEGER DEFAULT 0,
    created_at TEXT DEFAULT (datetime('now'))
  );

  CREATE TABLE IF NOT EXISTS orders (
    id TEXT PRIMARY KEY,
    customer_name TEXT NOT NULL,
    phone TEXT NOT NULL,
    address TEXT NOT NULL,
    division TEXT DEFAULT '',
    district TEXT DEFAULT '',
    upazila TEXT DEFAULT '',
    delivery_zone TEXT NOT NULL,
    items TEXT NOT NULL,
    subtotal REAL NOT NULL,
    delivery_charge REAL NOT NULL,
    weight_grams INTEGER NOT NULL,
    total REAL NOT NULL,
    payment_method TEXT DEFAULT 'COD',
    status TEXT DEFAULT 'Order Placed',
    created_at TEXT DEFAULT (datetime('now'))
  );

  CREATE TABLE IF NOT EXISTS settings (
    key TEXT PRIMARY KEY,
    value TEXT NOT NULL
  );

  CREATE TABLE IF NOT EXISTS admin (
    username TEXT PRIMARY KEY,
    password TEXT NOT NULL
  );
`);

const seedProducts = db.prepare('SELECT COUNT(*) AS c FROM products').get();
if (seedProducts.c === 0) {
  const insertProduct = db.prepare(`INSERT INTO products (name, category, description, price, image_url, stock_quantity, weight_grams) VALUES (?, ?, ?, ?, ?, ?, ?)`);
  const seed = [
    ['Premium Green Tea', 'Green Tea', 'খাঁটি সিলেটের সবুজ চা পাতা — fresh hand-plucked leaves from Sreemangal gardens.', 450, '', 50, 200],
    ['Special Green Tea', 'Green Tea', 'স্পেশাল গ্রেড গ্রিন টি — premium whole leaves for a richer brew.', 650, '', 30, 200],
    ['Rosella Tea (Rosella Tea', 'Rosella Tea', 'জবা ফুলের শুকনো পাতা — natural hibiscus tea, slightly tart & refreshing.', 380, '', 40, 150],
    ['Premium Tea Gift Box', 'Tea Gifts', 'চা পাতা হাট গিফট বক্স — assorted premium teas in a handcrafted box.', 1500, '', 15, 400],
    ['Classic Black Tea', 'Black Tea', 'ক্লাসিক ব্ল্যাক টি — strong, malty CTC tea from Sylhet estates.', 320, '', 60, 250],
    ['Organic Green Tea', 'Green Tea', 'অর্গানিক গ্রিন টি — pesticide-free leaves, hand-rolled.', 550, '', 25, 200],
  ];
  for (const p of seed) insertProduct.run(...p);
}

const adminCount = db.prepare('SELECT COUNT(*) AS c FROM admin').get();
if (adminCount.c === 0) {
  db.prepare('INSERT INTO admin (username, password) VALUES (?, ?)').run('admin', 'admin123');
}

const settingsCount = db.prepare('SELECT COUNT(*) AS c FROM settings').get();
if (settingsCount.c === 0) {
  const insertSetting = db.prepare('INSERT INTO settings (key, value) VALUES (?, ?)');
  insertSetting.run('delivery_zones', JSON.stringify([
    { id: 'sreemangal', label: 'Sreemangal Town', labelBn: 'শ্রীমঙ্গল শহর', rate: 50 },
    { id: 'sylhet', label: 'Rest of Sylhet Division', labelBn: 'সিলেট বিভাগ (অন্যান্য)', rate: 80 },
    { id: 'outside', label: 'Outside Sylhet (rest of Bangladesh)', labelBn: 'সিলেটের বাইরে (সারাদেশ)', rate: 120 },
  ]));
  insertSetting.run('weight_threshold_grams', '1000');
  insertSetting.run('weight_extra_per_kg', '40');
  insertSetting.run('site_settings', JSON.stringify({
    siteName: 'Cha Pata Hut',
    siteSubtitle: 'Sreemangal',
    phone: '+880 1711-000000',
    email: 'hello@chapateahut.bd',
    address: 'Sreemangal, Sylhet, Bangladesh',
    whatsapp: '+8801711000000',
    facebook: 'https://facebook.com/',
    instagram: 'https://instagram.com/',
    youtube: 'https://youtube.com/',
    tiktok: 'https://tiktok.com/',
  }));
}

function getSetting(key, fallback = null) {
  const row = db.prepare('SELECT value FROM settings WHERE key = ?').get(key);
  if (!row) return fallback;
  try { return JSON.parse(row.value); } catch { return row.value; }
}

function setSetting(key, value) {
  const v = typeof value === 'string' ? value : JSON.stringify(value);
  const exists = db.prepare('SELECT 1 FROM settings WHERE key = ?').get(key);
  if (exists) db.prepare('UPDATE settings SET value = ? WHERE key = ?').run(v, key);
  else db.prepare('INSERT INTO settings (key, value) VALUES (?, ?)').run(key, v);
}

const orderIdGen = customAlphabet('0123456789', 5);
function generateOrderId() {
  let id;
  do {
    id = 'CPH-' + orderIdGen();
  } while (db.prepare('SELECT 1 FROM orders WHERE id = ?').get(id));
  return id;
}

const ADMIN_TOKEN = 'cph_admin_static_token_change_me';

const app = express();
app.use(cors());
app.use(express.json({ limit: '2mb' }));
app.use('/uploads', express.static(UPLOADS_DIR));

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, UPLOADS_DIR),
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname || '').toLowerCase().replace(/[^a-z0-9.]/g, '') || '.jpg';
    const safe = Date.now() + '-' + Math.round(Math.random() * 1e9) + ext;
    cb(null, safe);
  }
});
const upload = multer({ storage, limits: { fileSize: 5 * 1024 * 1024 } });

function adminAuth(req, res, next) {
  const token = req.headers['x-admin-token'];
  if (token !== ADMIN_TOKEN) return res.status(401).json({ error: 'Unauthorized' });
  next();
}

app.get('/api/health', (req, res) => res.json({ ok: true }));

app.get('/api/settings', (req, res) => {
  res.json({
    delivery_zones: getSetting('delivery_zones'),
    weight_threshold_grams: Number(getSetting('weight_threshold_grams', 1000)),
    weight_extra_per_kg: Number(getSetting('weight_extra_per_kg', 40)),
    site: getSetting('site_settings'),
  });
});

app.get('/api/products', (req, res) => {
  const rows = db.prepare('SELECT * FROM products ORDER BY created_at DESC').all();
  res.json(rows);
});

app.get('/api/products/:id', (req, res) => {
  const row = db.prepare('SELECT * FROM products WHERE id = ?').get(req.params.id);
  if (!row) return res.status(404).json({ error: 'Not found' });
  res.json(row);
});

app.post('/api/admin/login', (req, res) => {
  const { username, password } = req.body || {};
  const row = db.prepare('SELECT * FROM admin WHERE username = ? AND password = ?').get(username, password);
  if (!row) return res.status(401).json({ error: 'Invalid credentials' });
  res.json({ token: ADMIN_TOKEN, username: row.username });
});

app.post('/api/admin/products', adminAuth, upload.single('image'), (req, res) => {
  const { name, category, description, price, stock_quantity, weight_grams } = req.body;
  if (!name || !category || !price) return res.status(400).json({ error: 'name, category and price are required' });
  const image_url = req.file ? '/uploads/' + req.file.filename : (req.body.image_url || '');
  const info = db.prepare(`INSERT INTO products (name, category, description, price, image_url, stock_quantity, weight_grams) VALUES (?, ?, ?, ?, ?, ?, ?)`)
    .run(name, category, description || '', Number(price), image_url, Number(stock_quantity || 0), Number(weight_grams || 0));
  res.json(db.prepare('SELECT * FROM products WHERE id = ?').get(info.lastInsertRowid));
});

app.put('/api/admin/products/:id', adminAuth, upload.single('image'), (req, res) => {
  const existing = db.prepare('SELECT * FROM products WHERE id = ?').get(req.params.id);
  if (!existing) return res.status(404).json({ error: 'Not found' });
  const { name, category, description, price, stock_quantity, weight_grams } = req.body;
  const image_url = req.file ? '/uploads/' + req.file.filename : (req.body.image_url !== undefined ? req.body.image_url : existing.image_url);
  db.prepare(`UPDATE products SET name=?, category=?, description=?, price=?, image_url=?, stock_quantity=?, weight_grams=? WHERE id=?`)
    .run(name, category, description || '', Number(price), image_url, Number(stock_quantity || 0), Number(weight_grams || 0), req.params.id);
  res.json(db.prepare('SELECT * FROM products WHERE id = ?').get(req.params.id));
});

app.delete('/api/admin/products/:id', adminAuth, (req, res) => {
  db.prepare('DELETE FROM products WHERE id = ?').run(req.params.id);
  res.json({ ok: true });
});

app.post('/api/admin/settings', adminAuth, (req, res) => {
  const { delivery_zones, weight_threshold_grams, weight_extra_per_kg, site } = req.body || {};
  if (delivery_zones) setSetting('delivery_zones', delivery_zones);
  if (weight_threshold_grams !== undefined) setSetting('weight_threshold_grams', String(weight_threshold_grams));
  if (weight_extra_per_kg !== undefined) setSetting('weight_extra_per_kg', String(weight_extra_per_kg));
  if (site) setSetting('site_settings', site);
  res.json({ ok: true });
});

function calcDelivery(zoneId, weightGrams) {
  const zones = getSetting('delivery_zones');
  const zone = zones.find(z => z.id === zoneId);
  const base = zone ? Number(zone.rate) : 0;
  const threshold = Number(getSetting('weight_threshold_grams', 1000));
  const perKg = Number(getSetting('weight_extra_per_kg', 40));
  let extra = 0;
  if (weightGrams > threshold) {
    extra = Math.ceil((weightGrams - threshold) / 1000) * perKg;
  }
  return { base, extra, total: base + extra };
}

app.post('/api/orders/quote', (req, res) => {
  const { items = [], delivery_zone } = req.body || {};
  let subtotal = 0;
  let weight = 0;
  for (const it of items) {
    const product = db.prepare('SELECT * FROM products WHERE id = ?').get(it.product_id);
    if (!product) continue;
    subtotal += Number(product.price) * Number(it.quantity);
    weight += Number(product.weight_grams || 0) * Number(it.quantity);
  }
  const delivery = calcDelivery(delivery_zone, weight);
  res.json({
    subtotal,
    weight_grams: weight,
    delivery_base: delivery.base,
    delivery_extra_weight: delivery.extra,
    delivery_charge: delivery.total,
    total: subtotal + delivery.total,
  });
});

app.post('/api/orders', (req, res) => {
  const { customer_name, phone, address, division, district, upazila, delivery_zone, items = [], payment_method = 'COD' } = req.body || {};
  if (!customer_name || !phone || !address || !delivery_zone) {
    return res.status(400).json({ error: 'Missing required fields' });
  }
  let subtotal = 0;
  let weight = 0;
  const resolvedItems = [];
  for (const it of items) {
    const product = db.prepare('SELECT * FROM products WHERE id = ?').get(it.product_id);
    if (!product) continue;
    const qty = Number(it.quantity) || 0;
    if (qty <= 0) continue;
    subtotal += Number(product.price) * qty;
    weight += Number(product.weight_grams || 0) * qty;
    resolvedItems.push({ product_id: product.id, name: product.name, price: Number(product.price), quantity: qty, weight_grams: Number(product.weight_grams || 0) });
  }
  if (resolvedItems.length === 0) return res.status(400).json({ error: 'Cart is empty' });
  const delivery = calcDelivery(delivery_zone, weight);
  const id = generateOrderId();
  db.prepare(`INSERT INTO orders (id, customer_name, phone, address, division, district, upazila, delivery_zone, items, subtotal, delivery_charge, weight_grams, total, payment_method, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`)
    .run(id, customer_name, phone, address, division || '', district || '', upazila || '', delivery_zone, JSON.stringify(resolvedItems), subtotal, delivery.total, weight, subtotal + delivery.total, payment_method, 'Order Placed');
  res.json(db.prepare('SELECT * FROM orders WHERE id = ?').get(id));
});

app.get('/api/orders/track', (req, res) => {
  const { id, phone } = req.query;
  if (!id || !phone) return res.status(400).json({ error: 'id and phone are required' });
  const row = db.prepare('SELECT * FROM orders WHERE id = ? AND phone = ?').get(id, phone);
  if (!row) return res.status(404).json({ error: 'Order not found' });
  res.json(row);
});

app.get('/api/admin/orders', adminAuth, (req, res) => {
  const rows = db.prepare('SELECT * FROM orders ORDER BY created_at DESC').all();
  res.json(rows);
});

app.patch('/api/admin/orders/:id/status', adminAuth, (req, res) => {
  const { status } = req.body || {};
  const allowed = ['Order Placed', 'Processing', 'Shipped', 'Delivered'];
  if (!allowed.includes(status)) return res.status(400).json({ error: 'Invalid status' });
  const row = db.prepare('SELECT * FROM orders WHERE id = ?').get(req.params.id);
  if (!row) return res.status(404).json({ error: 'Not found' });
  db.prepare('UPDATE orders SET status = ? WHERE id = ?').run(status, req.params.id);
  res.json(db.prepare('SELECT * FROM orders WHERE id = ?').get(req.params.id));
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Cha Pata Hut API listening on http://localhost:${PORT}`);
});