import { useSettings } from '../context/SettingsContext.jsx';

export default function FloatingContacts() {
  const { settings } = useSettings();
  const site = settings.site || {};
  const wa = (site.whatsapp || '').replace(/\D/g, '');
  const fb = site.facebook || '#';
  const waLink = wa ? `https://wa.me/${wa}` : '#';

  return (
    <div className="fixed right-4 bottom-4 z-40 flex flex-col gap-3">
      <a
        href={waLink}
        target="_blank"
        rel="noreferrer"
        aria-label="WhatsApp"
        className="w-12 h-12 rounded-full grid place-items-center text-white shadow-lg bg-[#25D366] hover:scale-105 transition"
      >
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
          <path d="M20.5 3.5A10 10 0 0 0 3 17l-1 5 5.1-1.3a10 10 0 0 0 4.9 1.3h.01a10 10 0 0 0 8.49-14.5zM12 20a8 8 0 0 1-4.1-1.13l-.29-.17-3 .8.8-2.94-.2-.31A8 8 0 1 1 12 20zm4.6-5.8c-.25-.13-1.5-.74-1.74-.82s-.4-.13-.57.13-.65.82-.8.99-.3.2-.55.07a6.5 6.5 0 0 1-1.93-1.19 7.3 7.3 0 0 1-1.34-1.66c-.14-.24 0-.37.11-.49.11-.11.25-.3.37-.45a1.7 1.7 0 0 0 .25-.41.46.46 0 0 0 0-.43c-.07-.13-.57-1.37-.78-1.88s-.42-.43-.57-.43h-.49a1 1 0 0 0-.71.33 2.92 2.92 0 0 0-.91 2.17 5 5 0 0 0 1 2.66 11.4 11.4 0 0 0 4.43 3.92c.62.27 1.1.43 1.48.55a3.6 3.6 0 0 0 1.64.1 2.7 2.7 0 0 0 1.77-1.25 2.2 2.2 0 0 0 .15-1.25c-.06-.11-.23-.18-.48-.31z" />
        </svg>
      </a>
      <a
        href={fb}
        target="_blank"
        rel="noreferrer"
        aria-label="Facebook Messenger"
        className="w-12 h-12 rounded-full grid place-items-center text-white shadow-lg bg-[#0084FF] hover:scale-105 transition"
      >
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
          <path d="M12 2C6.5 2 2 6.2 2 11.4a9 9 0 0 0 3.6 7.1V22l3.3-1.8a11 11 0 0 0 3.1.4c5.5 0 10-4.2 10-9.4S17.5 2 12 2zm1 12.7-2.6-2.7-5 2.7 5.5-5.7 2.6 2.7 5-2.7-5.5 5.7z" />
        </svg>
      </a>
    </div>
  );
}