import Icon from './Icon.jsx';
import { FEATURE_STRIP } from '../data/site.js';

export default function FeatureStrip() {
  return (
    <section className="bg-primary text-white">
      <div className="container-page py-10 sm:py-14 grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-4 text-center">
        {FEATURE_STRIP.map((f) => (
          <div key={f.label} className="flex flex-col items-center gap-3">
            <span className="w-14 h-14 rounded-full bg-white/10 backdrop-blur grid place-items-center ring-2 ring-white/20">
              <Icon name={f.icon} className="w-6 h-6 text-gold" />
            </span>
            <div>
              <div className="font-display text-lg font-semibold">{f.label}</div>
              <div className="text-xs text-white/75 mt-0.5">{f.sub}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}