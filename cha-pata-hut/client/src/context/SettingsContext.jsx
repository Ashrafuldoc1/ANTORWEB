import { createContext, useContext, useEffect, useState } from 'react';
import { api } from '../api.js';

const SettingsContext = createContext(null);

const FALLBACK = {
  delivery_zones: [
    { id: 'sreemangal', label: 'Sreemangal Town', labelBn: 'শ্রীমঙ্গল শহর', rate: 50 },
    { id: 'sylhet', label: 'Rest of Sylhet Division', labelBn: 'সিলেট বিভাগ (অন্যান্য)', rate: 80 },
    { id: 'outside', label: 'Outside Sylhet (rest of Bangladesh)', labelBn: 'সিলেটের বাইরে (সারাদেশ)', rate: 120 },
  ],
  weight_threshold_grams: 1000,
  weight_extra_per_kg: 40,
  site: {
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
  },
};

export function SettingsProvider({ children }) {
  const [settings, setSettings] = useState(FALLBACK);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    api
      .getSettings()
      .then((s) => setSettings({ ...FALLBACK, ...s, site: { ...FALLBACK.site, ...(s.site || {}) } }))
      .catch(() => setSettings(FALLBACK))
      .finally(() => setLoaded(true));
  }, []);

  return (
    <SettingsContext.Provider value={{ settings, loaded }}>
      {children}
    </SettingsContext.Provider>
  );
}

export function useSettings() {
  const ctx = useContext(SettingsContext);
  if (!ctx) throw new Error('useSettings must be inside SettingsProvider');
  return ctx;
}