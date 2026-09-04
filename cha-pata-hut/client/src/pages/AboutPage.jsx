import Icon from '../components/Icon.jsx';

export default function AboutPage() {
  return (
    <section className="bg-cream py-14">
      <div className="container-page grid lg:grid-cols-2 gap-10 items-center">
        <div>
          <span className="badge bg-primary text-white">Our Story</span>
          <h1 className="mt-3 font-display text-3xl sm:text-4xl font-bold text-primary">
            From the hills of Sreemangal — to your cup.
          </h1>
          <p className="mt-4 text-ink/85 leading-relaxed">
            চা পাতা হাট একটি ছোট্ট পারিবারিক ব্যবসা যা সিলেটের শ্রীমঙ্গলে অবস্থিত। আমরা সরাসরি বাগান থেকে
            সেরা মানের চা পাতা সংগ্রহ করে সারাদেশে পৌঁছে দিই।
          </p>
          <p className="mt-3 text-muted leading-relaxed text-sm">
            Cha Pata Hut is a family-run tea business based in the misty hills of Sreemangal, Sylhet. We hand-pick the freshest tea leaves from local gardens and deliver them straight to your door — naturally.
          </p>
          <div className="mt-5 grid grid-cols-2 gap-3">
            {[
              ['100%', 'Natural leaves'],
              ['15+', 'Years experience'],
              ['5000+', 'Happy customers'],
              ['3 day', 'Delivery in BD'],
            ].map(([num, label], i) => (
              <div key={i} className="card p-4">
                <div className="text-2xl font-display font-bold text-primary">{num}</div>
                <div className="text-xs text-muted">{label}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="relative">
          <img
            src="https://images.unsplash.com/photo-1564890369478-c89ca6d9cde9?auto=format&fit=crop&w=900&q=70"
            alt="Tea garden"
            className="rounded-3xl shadow-soft w-full h-[420px] object-cover"
          />
        </div>
      </div>
    </section>
  );
}