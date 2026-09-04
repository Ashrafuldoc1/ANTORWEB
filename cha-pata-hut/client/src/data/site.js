/**
 * EDITABLE SITE CONTENT
 * Categories, testimonials, blog posts, and feature strip data live here.
 * Products, delivery zones, weight charges, site contact info live in the
 * database (Admin Panel can edit them without touching code).
 */

export const CATEGORIES = [
  {
    slug: 'green-tea',
    name: 'Green Tea',
    nameBn: 'গ্রিন টি',
    tagline: 'সিলেটের সবুজ পাতা',
    image:
      'https://images.unsplash.com/photo-1565799558331-3faa15fa4ce0?auto=format&fit=crop&w=800&q=70',
  },
  {
    slug: 'rosella-tea',
    name: 'Rosella Tea',
    nameBn: 'রোসেলা টি',
    tagline: 'জবা ফুলের রঙে',
    image:
      'https://images.unsplash.com/photo-1571934811356-5cc061b6821f?auto=format&fit=crop&w=800&q=70',
  },
  {
    slug: 'black-tea',
    name: 'Black Tea',
    nameBn: 'ব্ল্যাক টি',
    tagline: 'ক্লাসিক স্বাদ',
    image:
      'https://images.unsplash.com/photo-1597481499665-d3f1ae50d4f1?auto=format&fit=crop&w=800&q=70',
  },
  {
    slug: 'tea-gifts',
    name: 'Tea Gifts',
    nameBn: 'গিফট বক্স',
    tagline: 'উপহারের জন্য বিশেষ',
    image:
      'https://images.unsplash.com/photo-1517502884422-41eaead166d4?auto=format&fit=crop&w=800&q=70',
  },
];

export const HERO_FEATURES = [
  { icon: 'leaf', label: '100% Natural', sub: 'প্রাকৃতিক' },
  { icon: 'shield', label: 'No Additives', sub: 'ভেজালমুক্ত' },
  { icon: 'drop', label: 'Fresh & Clean', sub: 'তাজা ও পরিষ্কার' },
  { icon: 'award', label: 'Best Quality', sub: 'সেরা মান' },
];

export const FEATURE_STRIP = [
  { icon: 'leaf', label: '100% Natural', sub: 'কোনো কেমিক্যাল নেই' },
  { icon: 'drop', label: 'Fresh & Clean', sub: 'তাজা ও পরিষ্কার পাতা' },
  { icon: 'mountain', label: 'Direct from Garden', sub: 'বাগান থেকে সরাসরি' },
  { icon: 'truck', label: 'Fast Delivery', sub: 'দ্রুত ডেলিভারি' },
];

export const TESTIMONIALS = [
  {
    quote:
      'চা পাতা হাটের গ্রিন টি সত্যিই অসাধারণ — গন্ধই বলে দেয় এটা সিলেটের বাগানের।',
    name: 'নাফিসা হাসান',
    city: 'ঢাকা',
    avatar:
      'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=70',
    rating: 5,
  },
  {
    quote:
      'গিফট বক্সটা পেয়ে খুব খুশি হলাম। প্যাকেজিং এত সুন্দর, চায়ের স্বাদও দারুণ।',
    name: 'রাহুল দাস',
    city: 'সিলেট',
    avatar:
      'https://images.unsplash.com/photo-1502685104226-ee32379fefbe?auto=format&fit=crop&w=200&q=70',
    rating: 5,
  },
  {
    quote:
      'রোসেলা টি এর রঙ আর ফ্লেভার দুটোই চমৎকার। নিয়মিত অর্ডার করি এখান থেকে।',
    name: 'সাদিয়া আক্তার',
    city: 'চট্টগ্রাম',
    avatar:
      'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=200&q=70',
    rating: 5,
  },
];

export const BLOG_POSTS = [
  {
    id: 'tea-rituals',
    title: 'সকালের চায়ের রিচুয়াল: কীভাবে শুরু করবেন দিনটা',
    titleEn: 'Morning Tea Ritual',
    date: '2026-08-12',
    image:
      'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=800&q=70',
    excerpt: 'এক কাপ গরম চা দিয়ে দিন শুরু করার ছোট্ট অভ্যাস…',
  },
  {
    id: 'health-benefits',
    title: 'গ্রিন টির ৫টি স্বাস্থ্য উপকারিতা যা আপনার জানা দরকার',
    titleEn: 'Health Benefits of Green Tea',
    date: '2026-07-28',
    image:
      'https://images.unsplash.com/photo-1571934811356-5cc061b6821f?auto=format&fit=crop&w=800&q=70',
    excerpt: 'অ্যান্টিঅক্সিডেন্ট থেকে মেটাবলিজম পর্যন্ত…',
  },
  {
    id: 'brewing-guide',
    title: 'পারফেক্ট কাপ ব্রিউয়িং: তাপমাত্রা ও সময়ের গাইড',
    titleEn: 'Perfect Brewing Guide',
    date: '2026-07-10',
    image:
      'https://images.unsplash.com/photo-1564890369478-c89ca6d9cde9?auto=format&fit=crop&w=800&q=70',
    excerpt: 'সবুজ, কালো বা রোসেলা — প্রতিটি চায়ের নিজস্ব সময় আছে…',
  },
];

export const ORDER_STAGES = [
  { key: 'Order Placed', label: 'Order Placed', sub: 'অর্ডার গ্রহণ' },
  { key: 'Processing', label: 'Processing', sub: 'প্রস্তুত হচ্ছে' },
  { key: 'Shipped', label: 'Shipped', sub: 'পাঠানো হয়েছে' },
  { key: 'Delivered', label: 'Delivered', sub: 'পৌঁছে গেছে' },
];

export const PAYMENT_METHODS = [
  { id: 'COD', label: 'Cash on Delivery', sub: 'ক্যাশ অন ডেলিভারি' },
  { id: 'bKash', label: 'bKash', sub: 'বিকাশ' },
  { id: 'Nagad', label: 'Nagad', sub: 'নগদ' },
  { id: 'Rocket', label: 'Rocket', sub: 'রকেট' },
];