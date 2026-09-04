// API client — talks to the Express + SQLite backend.
// Admin token stored in localStorage on successful login.

const ADMIN_TOKEN_KEY = 'cph_admin_token';

export function getAdminToken() {
  return localStorage.getItem(ADMIN_TOKEN_KEY);
}
export function setAdminToken(t) {
  if (t) localStorage.setItem(ADMIN_TOKEN_KEY, t);
  else localStorage.removeItem(ADMIN_TOKEN_KEY);
}

async function fetchJson(url, options = {}) {
  const res = await fetch(url, options);
  if (!res.ok) {
    let msg = `Request failed (${res.status})`;
    try {
      const data = await res.json();
      if (data && data.error) msg = data.error;
    } catch {}
    const err = new Error(msg);
    err.status = res.status;
    throw err;
  }
  return res.json();
}

export const api = {
  getSettings: () => fetchJson('/api/settings'),

  getProducts: () => fetchJson('/api/products'),
  getProduct: (id) => fetchJson('/api/products/' + id),

  quoteOrder: (payload) =>
    fetchJson('/api/orders/quote', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    }),
  placeOrder: (payload) =>
    fetchJson('/api/orders', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    }),
  trackOrder: (id, phone) =>
    fetchJson('/api/orders/track?id=' + encodeURIComponent(id) + '&phone=' + encodeURIComponent(phone)),

  adminLogin: (username, password) =>
    fetchJson('/api/admin/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    }).then((r) => {
      setAdminToken(r.token);
      return r;
    }),
  adminLogout: () => setAdminToken(null),

  adminGetOrders: () =>
    fetchJson('/api/admin/orders', { headers: { 'x-admin-token': getAdminToken() } }),
  adminUpdateOrderStatus: (id, status) =>
    fetchJson(`/api/admin/orders/${id}/status`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json', 'x-admin-token': getAdminToken() },
      body: JSON.stringify({ status }),
    }),

  adminCreateProduct: (formData) =>
    fetchJson('/api/admin/products', {
      method: 'POST',
      headers: { 'x-admin-token': getAdminToken() },
      body: formData,
    }),
  adminUpdateProduct: (id, formData) =>
    fetchJson('/api/admin/products/' + id, {
      method: 'PUT',
      headers: { 'x-admin-token': getAdminToken() },
      body: formData,
    }),
  adminDeleteProduct: (id) =>
    fetchJson('/api/admin/products/' + id, {
      method: 'DELETE',
      headers: { 'x-admin-token': getAdminToken() },
    }),
  adminSaveSettings: (payload) =>
    fetchJson('/api/admin/settings', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'x-admin-token': getAdminToken() },
      body: JSON.stringify(payload),
    }),
};