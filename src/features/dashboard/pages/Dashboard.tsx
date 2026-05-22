import RootLayout from '../../../layouts/RootLayout';
import ServicesGrid from '../components/ServicesGrid';
import PromoSlider from '../components/PromoSlider';

export default function Dashboard() {
  return (
    <RootLayout>
      <div className="space-y-12">
        <ServicesGrid />
        <PromoSlider />
      </div>
    </RootLayout>
  );
}
