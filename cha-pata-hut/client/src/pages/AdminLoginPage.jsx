import { useState } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { api, getAdminToken } from '../api.js';
import Icon from '../components/Icon.jsx';

export default function AdminLoginPage() {
  const [username, setUsername] = useState('admin');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  if (getAdminToken()) return <Navigate to="/admin/dashboard" replace />;

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await api.adminLogin(username, password);
      navigate('/admin/dashboard');
    } catch (err) {
      setError('Invalid username or password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="bg-cream min-h-[70vh] flex items-center py-14">
      <div className="container-page max-w-md">
        <div className="card p-8">
          <div className="text-center">
            <div className="w-14 h-14 rounded-full bg-primary text-white grid place-items-center mx-auto">
              <Icon name="leaf" className="w-7 h-7" />
            </div>
            <h1 className="font-display text-2xl font-bold text-primary mt-3">Admin Login</h1>
            <p className="text-muted text-sm mt-1">অ্যাডমিন প্যানেলে প্রবেশ করুন</p>
          </div>
          <form onSubmit={submit} className="mt-6 space-y-3">
            <div>
              <label className="label">Username</label>
              <input className="input" value={username} onChange={(e) => setUsername(e.target.value)} required />
            </div>
            <div>
              <label className="label">Password</label>
              <input className="input" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
            </div>
            {error && <p className="text-sm text-red-600">{error}</p>}
            <button type="submit" className="btn-primary w-full" disabled={loading}>
              {loading ? 'Signing in…' : 'Sign In'}
            </button>
            <p className="text-xs text-muted text-center">Default: admin / admin123</p>
          </form>
        </div>
      </div>
    </section>
  );
}