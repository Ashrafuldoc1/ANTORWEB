const ICONS = {
  leaf: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M11 20A7 7 0 0 1 4 13c0-3 1-6 4-9s8-3 12-3c0 4 0 9-3 12s-6 4-9 4" />
      <path d="M2 22c1-5 5-10 10-14" />
    </svg>
  ),
  shield: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  ),
  drop: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2s7 8 7 13a7 7 0 1 1-14 0c0-5 7-13 7-13z" />
    </svg>
  ),
  award: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="9" r="6" />
      <path d="M8 14l-2 7 6-3 6 3-2-7" />
    </svg>
  ),
  mountain: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="m3 19 6-9 4 6 3-4 5 7H3z" />
    </svg>
  ),
  truck: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 7h11v9H3z" />
      <path d="M14 10h4l3 3v3h-7z" />
      <circle cx="7" cy="18" r="2" />
      <circle cx="17" cy="18" r="2" />
    </svg>
  ),
  phone: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  ),
  mail: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="m22 6-10 7L2 6" />
    </svg>
  ),
  pin: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0 1 18 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  ),
  search: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="7" />
      <path d="m20 20-3.5-3.5" />
    </svg>
  ),
  user: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="8" r="4" />
      <path d="M4 21c0-4 4-7 8-7s8 3 8 7" />
    </svg>
  ),
  cart: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="9" cy="21" r="1" />
      <circle cx="18" cy="21" r="1" />
      <path d="M3 3h2l3 13h12l2-9H6" />
    </svg>
  ),
  quote: (
    <svg viewBox="0 0 24 24" fill="currentColor">
      <path d="M9 7H5a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h2v2a4 4 0 0 1-4 4v-2a2 2 0 0 0 2-2v-2a2 2 0 0 1-2-2V9a4 4 0 0 1 4-4h2v2zm10 0h-4a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h2v2a4 4 0 0 1-4 4v-2a2 2 0 0 0 2-2v-2a2 2 0 0 1-2-2V9a4 4 0 0 1 4-4h2v2z" />
    </svg>
  ),
  star: (
    <svg viewBox="0 0 24 24" fill="currentColor">
      <path d="m12 2 3 7h7l-5.5 4.5L18 22l-6-4-6 4 1.5-8.5L2 9h7l3-7z" />
    </svg>
  ),
  check: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
      <path d="m5 12 5 5L20 7" />
    </svg>
  ),
  facebook: (
    <svg viewBox="0 0 24 24" fill="currentColor">
      <path d="M22 12a10 10 0 1 0-11.6 9.87V14.9H7.9V12h2.5V9.8c0-2.47 1.47-3.83 3.71-3.83 1.08 0 2.2.19 2.2.19v2.42h-1.24c-1.22 0-1.6.76-1.6 1.54V12h2.73l-.44 2.9h-2.3v6.97A10 10 0 0 0 22 12z" />
    </svg>
  ),
  instagram: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" />
    </svg>
  ),
  youtube: (
    <svg viewBox="0 0 24 24" fill="currentColor">
      <path d="M23 12s0-3.6-.5-5.3a2.8 2.8 0 0 0-2-2C18.7 4.3 12 4.3 12 4.3s-6.7 0-8.5.4a2.8 2.8 0 0 0-2 2C1 8.4 1 12 1 12s0 3.6.5 5.3a2.8 2.8 0 0 0 2 2c1.8.4 8.5.4 8.5.4s6.7 0 8.5-.4a2.8 2.8 0 0 0 2-2C23 15.6 23 12 23 12zM9.7 15.4V8.6l5.5 3.4-5.5 3.4z" />
    </svg>
  ),
  tiktok: (
    <svg viewBox="0 0 24 24" fill="currentColor">
      <path d="M21 8.5a7 7 0 0 1-5-2v8a6 6 0 1 1-6-6v3a3 3 0 1 0 3 3V2h3a4 4 0 0 0 5 4v2.5z" />
    </svg>
  ),
  whatsapp: (
    <svg viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.5 3.5A10 10 0 0 0 3 17l-1 5 5.1-1.3a10 10 0 0 0 4.9 1.3h.01a10 10 0 0 0 8.49-14.5zM12 20a8 8 0 0 1-4.1-1.13l-.29-.17-3 .8.8-2.94-.2-.31A8 8 0 1 1 12 20zm4.6-5.8c-.25-.13-1.5-.74-1.74-.82s-.4-.13-.57.13-.65.82-.8.99-.3.2-.55.07a6.5 6.5 0 0 1-1.93-1.19 7.3 7.3 0 0 1-1.34-1.66c-.14-.24 0-.37.11-.49c.11-.11.25-.3.37-.45a1.7 1.7 0 0 0 .25-.41.46.46 0 0 0 0-.43c-.07-.13-.57-1.37-.78-1.88s-.42-.43-.57-.43h-.49a1 1 0 0 0-.71.33 2.92 2.92 0 0 0-.91 2.17 5 5 0 0 0 1 2.66 11.4 11.4 0 0 0 4.43 3.92c.62.27 1.1.43 1.48.55a3.6 3.6 0 0 0 1.64.1 2.7 2.7 0 0 0 1.77-1.25 2.2 2.2 0 0 0 .15-1.25c-.06-.11-.23-.18-.48-.31z" />
    </svg>
  ),
  messenger: (
    <svg viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2C6.5 2 2 6.2 2 11.4a9 9 0 0 0 3.6 7.1V22l3.3-1.8a11 11 0 0 0 3.1.4c5.5 0 10-4.2 10-9.4S17.5 2 12 2zm1 12.7-2.6-2.7-5 2.7 5.5-5.7 2.6 2.7 5-2.7-5.5 5.7z" />
    </svg>
  ),
  logout: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
      <path d="m16 17 5-5-5-5" />
      <path d="M21 12H9" />
    </svg>
  ),
  package: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 8 12 3 3 8v8l9 5 9-5V8z" />
      <path d="m3 8 9 5 9-5" />
      <path d="M12 13v8" />
    </svg>
  ),
  plus: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <path d="M12 5v14M5 12h14" />
    </svg>
  ),
  minus: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <path d="M5 12h14" />
    </svg>
  ),
  trash: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 6h18" />
      <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
      <path d="m6 6 1 14a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2l1-14" />
    </svg>
  ),
  edit: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 20h9" />
      <path d="M16.5 3.5a2.121 2.121 0 1 1 3 3L7 19l-4 1 1-4 12.5-12.5z" />
    </svg>
  ),
  menu: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
      <path d="M4 6h16M4 12h16M4 18h16" />
    </svg>
  ),
  close: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
      <path d="M6 6l12 12M6 18 18 6" />
    </svg>
  ),
  upload: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <path d="m17 8-5-5-5 5" />
      <path d="M12 3v12" />
    </svg>
  ),
};

export default function Icon({ name, className = 'w-5 h-5' }) {
  const node = ICONS[name];
  if (!node) return null;
  return <span className={className}>{node}</span>;
}