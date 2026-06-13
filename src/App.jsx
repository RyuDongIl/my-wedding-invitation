import Account from './components/Account';
import BgmPlayer from './components/BgmPlayer';
import Calendar from './components/Calendar';
import Gallery from './components/Gallery';
import Greeting from './components/Greeting';
import Hero from './components/Hero';
import Navigation from './components/Navigation';
import ScrollReveal from './components/ScrollReveal';

export default function App() {
  return (
    <main className="min-h-screen bg-[#FAF9F6] antialiased">
      <div className="mx-auto max-w-md overflow-hidden bg-[#FAF9F6] text-stone-800 shadow-[0_0_60px_rgba(120,113,108,0.10)]">
        <Hero />
        <ScrollReveal>
          <Greeting />
        </ScrollReveal>
        <ScrollReveal delay={80}>
          <Calendar />
        </ScrollReveal>
        <ScrollReveal delay={120}>
          <Gallery />
        </ScrollReveal>
        <ScrollReveal delay={80}>
          <Navigation />
        </ScrollReveal>
        <ScrollReveal delay={80}>
          <Account />
        </ScrollReveal>
      </div>
      <BgmPlayer />
    </main>
  );
}
