import HeroBanner from '../components/HeroBanner.jsx';
import CategoryGrid from '../components/CategoryGrid.jsx';
import BestSellers from '../components/BestSellers.jsx';
import FeatureStrip from '../components/FeatureStrip.jsx';
import { TestimonialsSection } from '../components/TestimonialCard.jsx';
import { BlogSection } from '../components/BlogCard.jsx';

export default function HomePage() {
  return (
    <>
      <HeroBanner />
      <CategoryGrid />
      <BestSellers />
      <FeatureStrip />
      <TestimonialsSection />
      <BlogSection />
    </>
  );
}