import { useState } from 'react';
import { useSettings } from '../context/SettingsContext.jsx';
import Icon from '../components/Icon.jsx';

export default function ContactPage() {
  const { settings } = useSettings();
  const site = settings.site || {};
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [sent, setSent] = useState(false);

  const submit = (e) => {
    e.preventDefault();
    setSent(true);
    setForm({ name: '', email: '', message: '' });
    setTimeout(() => setSent(false), 3500);
  };

  return (
    <section className="bg-cream py-14">
      <div className="container-page grid lg:grid-cols-2 gap-10">
        <div>
          <h1 className="font-display text-3xl sm:text-4xl font-bold text-primary">Contact Us</h1>
          <p className="text-muted mt-2">যোগাযোগ করুন — আমরা সাহায্য করতে প্রস্তুত</p>
          <ul className="mt-6 space-y-4 text-sm">
            <li className="flex items-start gap-3">
              <span className="w-10 h-10 rounded-full bg-primary text-white grid place-items-center"><Icon name="phone" /></span>
              <div>
                <div className="text-xs text-muted">Phone</div>
                <a href={`tel:${site.phone}`} className="text-ink font-medium hover:text-secondary">{site.phone}</a>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <span className="w-10 h-10 rounded-full bg-primary text-white grid place-items-center"><Icon name="mail" /></span>
              <div>
                <div className="text-xs text-muted">Email</div>
                <a href={`mailto:${site.email}`} className="text-ink font-medium hover:text-secondary">{site.email}</a>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <span className="w-10 h-10 rounded-full bg-primary text-white grid place-items-center"><Icon name="pin" /></span>
              <div>
                <div className="text-xs text-muted">Address</div>
                <div className="text-ink font-medium">{site.address}</div>
              </div>
            </li>
          </ul>
        </div>

        <form onSubmit={submit} className="card p-6">
          <div className="grid gap-3">
            <div>
              <label className="label">Your Name</label>
              <input className="input" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
            </div>
            <div>
              <label className="label">Email</label>
              <input type="email" className="input" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required />
            </div>
            <div>
              <label className="label">Message / বার্তা</label>
              <textarea rows={4} className="input" value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} required />
            </div>
            <button className="btn-primary">Send Message</button>
            {sent && <p className="text-sm text-secondary">ধন্যবাদ — আমরা শীঘ্রই যোগাযোগ করব!</p>}
          </div>
        </form>
      </div>
    </section>
  );
}