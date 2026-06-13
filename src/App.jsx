import Account from './components/Account';
import BgmPlayer from './components/BgmPlayer';
import Calendar from './components/Calendar';
import Gallery from './components/Gallery';
import Greeting from './components/Greeting';
import Hero from './components/Hero';
import Navigation from './components/Navigation';

export default function App() {
  return (
    <main className="min-h-screen bg-[#FAF9F6] antialiased">
      <div className="mx-auto max-w-md overflow-hidden bg-[#FAF9F6] text-stone-800 shadow-[0_0_60px_rgba(120,113,108,0.10)]">
        <Hero />
        <Greeting />
        <Calendar />
        <Gallery />
        <Navigation />
        <Account />
      </div>
      <BgmPlayer />
    </main>
  );
}
