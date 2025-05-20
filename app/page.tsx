import HeroSection from '@/components/HeroSection';
import NotificationBar from '@/components/BarPub';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col">
      <NotificationBar />
      <Header />
      <HeroSection />
      <Footer />
    </main>
  );
}