import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

/* ─── free stock food videos (Mixkit, royalty-free) ─── */
const VIDEOS = [
  'https://assets.mixkit.co/videos/47555/47555-720.mp4',   // Chef stir-fry vegetables
  'https://assets.mixkit.co/videos/9278/9278-720.mp4',     // Cooking french fries
  'https://assets.mixkit.co/videos/42909/42909-720.mp4',   // Eggs in a pan
];

function About() {
  const [currentVideo, setCurrentVideo] = useState(0);
  const [fade, setFade] = useState(true);
  const videoRef = useRef(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    setIsLoggedIn(localStorage.getItem('isLoggedIn') === 'true');
    window.scrollTo(0, 0);
  }, []);

  /* Switch clip every 8 seconds with crossfade */
  useEffect(() => {
    const timer = setTimeout(() => {
      setFade(false); // fade out
      setTimeout(() => {
        setCurrentVideo((prev) => (prev + 1) % VIDEOS.length);
        setFade(true); // fade in
      }, 600);
    }, 8000);
    return () => clearTimeout(timer);
  }, [currentVideo]);

  /* Reset & play when source changes */
  useEffect(() => {
    const v = videoRef.current;
    if (v) {
      v.currentTime = 0;
      v.load();
      v.play().catch(() => {});
    }
  }, [currentVideo]);

  return (
    <div className="flex min-h-screen flex-col bg-gray-50 font-sans text-gray-800 dark:bg-gray-900 dark:text-gray-100">
      <Navbar />

      {/* ═══════════════════ HERO — full-screen video ═══════════════════ */}
      <section className="relative flex h-screen w-full items-center justify-center overflow-hidden">
        {/* Background video — 8s per clip, then crossfade */}
        <video
          ref={videoRef}
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${fade ? 'opacity-100' : 'opacity-0'}`}
          src={VIDEOS[currentVideo]}
          autoPlay
          muted
          playsInline
        />
        {/* Dark gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/70" />

        {/* Centre content */}
        <div className="relative z-10 flex flex-col items-center gap-6 px-4 text-center text-white">
          <h1 className="font-display text-5xl font-extrabold leading-tight drop-shadow-lg md:text-7xl">
            MoodMeal AI
          </h1>
          <p className="max-w-xl text-lg font-medium tracking-wide text-gray-200 md:text-2xl">
            Your mood. Your meal.<br />We connect the two.
          </p>
          <p className="text-sm text-gray-300 md:text-base">
            Experience smart, mood‑based meal recommendations — in&nbsp;seconds.
          </p>
          <Link
            to={isLoggedIn ? "/dashboard" : "/login"}
            className="mt-4 rounded-full bg-red-500 px-8 py-3 text-lg font-semibold shadow-xl transition-transform hover:scale-105 hover:bg-red-600"
          >
            Get Started
          </Link>
        </div>

        {/* Scroll-down indicator */}
        <div className="absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 animate-bounce flex-col items-center text-white">
          <span className="text-sm tracking-widest">Scroll down</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="mt-1 h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </section>

      {/* ═══════════════ SECTION 2 — floating food images ═══════════════ */}
      <section className="relative overflow-hidden bg-white py-24 dark:bg-gray-900">
        {/* Decorative curved lines (SVG) */}
        <svg
          className="pointer-events-none absolute inset-0 h-full w-full opacity-10 dark:opacity-5"
          viewBox="0 0 1200 600"
          preserveAspectRatio="none"
        >
          <path
            d="M0,300 Q300,50 600,300 T1200,300"
            fill="none"
            stroke="#ef4444"
            strokeWidth="2"
          />
          <path
            d="M0,200 Q400,500 800,200 T1200,200"
            fill="none"
            stroke="#f97316"
            strokeWidth="1.5"
          />
        </svg>

        {/* Floating food images */}
        <img
          src="/images/burger.jpg"
          alt="Burger"
          className="absolute left-[5%] top-[20%] w-36 -rotate-6 rounded-full shadow-2xl md:w-52 lg:w-60"
        />
        <img
          src="/images/pizza.jpg"
          alt="Pizza"
          className="absolute right-[5%] bottom-[15%] w-32 rotate-6 rounded-full shadow-2xl md:w-44 lg:w-52"
        />
        <img
          src="/images/bowl.jpg"
          alt="Buddha Bowl"
          className="absolute right-[8%] top-[8%] w-28 rotate-3 rounded-full shadow-2xl md:w-40 lg:w-48"
        />

        {/* Centre text */}
        <div className="relative z-10 mx-auto max-w-2xl px-4 text-center">
          <h2 className="font-display mb-6 text-4xl font-extrabold text-red-500 md:text-5xl">
            Better food for<br />better moods
          </h2>
          <p className="text-lg leading-relaxed text-gray-600 dark:text-gray-400">
            We believe the right meal at the right moment can turn your day
            around. MoodMeal AI analyses how you're feeling and serves up
            delicious suggestions — delivered right to your doorstep.
          </p>
        </div>
      </section>

      {/* ═══════════════════ SECTION 3 — Features ═══════════════════ */}
      <section className="bg-gray-50 py-20 dark:bg-gray-950">
        <div className="mx-auto max-w-6xl px-4">
          <h2 className="mb-12 text-center text-3xl font-bold md:text-4xl">
            Why MoodMeal AI?
          </h2>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {FEATURES.map((f) => (
              <div
                key={f.title}
                className="group rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg dark:border-gray-700 dark:bg-gray-800"
              >
                <span className="mb-4 block text-4xl">{f.icon}</span>
                <h3 className="mb-2 text-xl font-semibold">{f.title}</h3>
                <p className="text-sm leading-relaxed text-gray-600 dark:text-gray-400">
                  {f.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════ SECTION 4 — Stats ═══════════════════ */}
      <section className="bg-red-500 py-16 text-white">
        <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-around gap-8 px-4 text-center">
          {STATS.map((s) => (
            <div key={s.label}>
              <p className="text-4xl font-extrabold md:text-5xl">{s.value}</p>
              <p className="mt-1 text-sm uppercase tracking-widest opacity-90">
                {s.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ═══════════════════ CTA ═══════════════════ */}
      <section className="bg-white py-20 text-center dark:bg-gray-900">
        <h2 className="mb-4 text-3xl font-bold md:text-4xl">
          Ready to eat smarter?
        </h2>
        <p className="mx-auto mb-8 max-w-md text-gray-600 dark:text-gray-400">
          Join thousands of happy users who let their mood guide their meal.
        </p>
        <Link
          to={isLoggedIn ? "/dashboard" : "/signup"}
          className="rounded-full bg-red-500 px-10 py-3 text-lg font-semibold text-white shadow-xl transition-transform hover:scale-105 hover:bg-red-600"
        >
          {isLoggedIn ? 'Go to Dashboard' : 'Sign Up Free'}
        </Link>
      </section>

      <Footer />
    </div>
  );
}

/* ─── data ─── */
const FEATURES = [
  {
    icon: '🧠',
    title: 'AI-Powered Matching',
    desc: 'Our model analyses your mood and suggests meals that fit your vibe — no more decision fatigue.',
  },
  {
    icon: '⚡',
    title: 'Instant Results',
    desc: 'Get personalized recommendations in seconds, not minutes.',
  },
  {
    icon: '🔒',
    title: 'Privacy First',
    desc: 'Your data stays on your device. We never share or sell your information.',
  },
  {
    icon: '🎨',
    title: 'Dark / Light Mode',
    desc: 'Seamlessly switch themes to match your environment and preference.',
  },
  {
    icon: '📱',
    title: 'Responsive Design',
    desc: 'Works beautifully on desktop, tablet, and mobile — anywhere you eat.',
  },
  {
    icon: '🚀',
    title: 'Open Source',
    desc: 'Contribute on GitHub and help us make meal discovery smarter for everyone.',
  },
];

const STATS = [
  { value: '50K+', label: 'Meals Matched' },
  { value: '12K+', label: 'Happy Users' },
  { value: '4.9★', label: 'Avg Rating' },
  { value: '200+', label: 'Cuisines' },
];

export default About;
