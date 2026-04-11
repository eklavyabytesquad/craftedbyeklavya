'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'motion/react';
import {
  MapPin,
  Phone,
  Truck,
  Building2,
  ChevronDown,
  Menu,
  X,
  Clock,
  Shield,
  Star,
  ArrowRight,
  User,
  MessageCircle,
  PhoneCall,
} from 'lucide-react';

/* ─── data ─── */
const offices = [
  {
    type: 'Head Office',
    address: 'Dube Parao, Aligarh - 202001',
    icon: Building2,
    highlight: true,
  },
  {
    type: 'Branch Office',
    address: 'Sasni Gate, Aligarh - 202001',
    icon: MapPin,
  },
  {
    type: 'Branch Office',
    address: 'Near Shiva Petrol Pump, GT Road, Aligarh - 202001',
    icon: MapPin,
  },
  {
    type: 'Branch Office',
    address: 'Gular Road, Aligarh - 202001',
    icon: MapPin,
  },
  {
    type: 'Branch Office',
    address: 'Transport Nagar, Kanpur',
    icon: MapPin,
  },
];

const features = [
  {
    icon: Truck,
    title: 'Fleet Network',
    desc: 'Wide fleet of trucks covering major routes across Uttar Pradesh and beyond.',
  },
  {
    icon: Shield,
    title: 'Safe & Secure',
    desc: 'Your goods are fully insured and handled with utmost care throughout transit.',
  },
  {
    icon: Clock,
    title: 'On-Time Delivery',
    desc: 'Reliable scheduling and timely deliveries to keep your business running smooth.',
  },
  {
    icon: Star,
    title: 'Trusted Since Years',
    desc: 'Decades of experience in the transport industry with thousands of happy clients.',
  },
];

const navLinks = [
  { label: 'Home', href: '#home' },
  { label: 'Branches', href: '#branches' },
  { label: 'Station', href: '#services' },
  { label: 'Contact', href: '#contact' },
];

/* ─── component ─── */
export default function SSTransportPage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div className="min-h-screen bg-white text-gray-900 overflow-x-hidden font-[var(--font-geist-sans)]">
      {/* ─── NAVBAR ─── */}
      <nav
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-white/95 backdrop-blur-md border-b border-amber-200/60 shadow-sm'
            : 'bg-white/80 backdrop-blur-sm'
        }`}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between px-4 sm:px-6 lg:px-8 h-16 sm:h-20">
          <a href="#home" className="flex items-center gap-2 sm:gap-3 shrink-0">
            <Image
              src="/assets/ss-transport/logo.png"
              alt="SS Transport Logo"
              width={44}
              height={44}
              className="w-9 h-9 sm:w-11 sm:h-11 object-contain"
            />
            <span className="text-base sm:text-lg font-bold text-amber-700 tracking-wide">
              SS Transport
            </span>
          </a>

          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="px-4 py-2 text-sm text-gray-600 hover:text-amber-700 transition-colors rounded-lg hover:bg-amber-50"
              >
                {l.label}
              </a>
            ))}
          </div>

          <button
            className="md:hidden p-2 text-amber-700"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="md:hidden overflow-hidden bg-white border-b border-amber-100"
            >
              <div className="flex flex-col px-4 py-3 gap-1">
                {navLinks.map((l) => (
                  <a
                    key={l.href}
                    href={l.href}
                    onClick={() => setMenuOpen(false)}
                    className="px-4 py-3 rounded-lg text-gray-700 hover:text-amber-700 hover:bg-amber-50 text-sm transition-colors"
                  >
                    {l.label}
                  </a>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* ─── HERO ─── */}
      <section
        id="home"
        className="relative min-h-[100dvh] flex flex-col items-center justify-center px-4 pt-20 overflow-hidden bg-gradient-to-b from-amber-50/50 to-white"
      >
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 flex flex-col items-center text-center max-w-3xl"
        >
          <div className="relative mb-6 sm:mb-8">
            <Image
              src="/assets/ss-transport/logo.png"
              alt="SS Transport Corporation"
              width={220}
              height={220}
              priority
              className="relative w-40 h-40 sm:w-52 sm:h-52 md:w-56 md:h-56 object-contain"
            />
          </div>

          <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold leading-tight tracking-tight">
            <span className="text-amber-700">S S Transport</span>
            <br />
            <span className="text-gray-900">Corporation</span>
          </h1>

          <p className="mt-4 sm:mt-6 text-sm sm:text-base md:text-lg text-gray-500 max-w-xl leading-relaxed">
            Your trusted partner for safe, reliable, and timely goods
            transportation across Uttar Pradesh and beyond.
          </p>

          <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row gap-3 sm:gap-4 w-full sm:w-auto">
            <a
              href="#branches"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-amber-600 text-white font-semibold rounded-xl hover:bg-amber-700 transition-all shadow-md text-sm sm:text-base"
            >
              Our Branches
              <ArrowRight size={16} />
            </a>
            <a
              href="#contact"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 border border-amber-300 text-amber-700 rounded-xl hover:bg-amber-50 transition-all text-sm sm:text-base"
            >
              Contact Us
            </a>
          </div>
        </motion.div>

        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-8 text-amber-400"
        >
          <ChevronDown size={28} />
        </motion.div>
      </section>

      {/* ─── ABOUT ─── */}
      <section id="about" className="relative py-20 sm:py-28 px-4">
        <div className="max-w-5xl mx-auto">
          <SectionTag text="About Us" />
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-2xl sm:text-4xl font-bold text-center mt-4 text-gray-900"
          >
            Decades of{' '}
            <span className="text-amber-700">Trust &amp; Excellence</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="mt-6 text-gray-500 text-center text-sm sm:text-base max-w-2xl mx-auto leading-relaxed"
          >
            S S Transport Corporation is a leading transport company
            headquartered in Aligarh, Uttar Pradesh. With multiple branches
            across key locations, we specialize in full-load and part-load
            freight services, ensuring your cargo reaches its destination safely
            and on schedule.
          </motion.p>

          <div className="mt-12 sm:mt-16 grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            {features.map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="group relative p-5 sm:p-6 rounded-2xl border border-gray-200 bg-white hover:border-amber-200 hover:shadow-sm transition-all"
              >
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-amber-50 flex items-center justify-center mb-4 group-hover:bg-amber-100 transition-colors">
                  <f.icon size={22} className="text-amber-600" />
                </div>
                <h3 className="text-base sm:text-lg font-semibold text-gray-900">
                  {f.title}
                </h3>
                <p className="mt-2 text-sm text-gray-500 leading-relaxed">
                  {f.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── BRANCHES ─── */}
      <section id="branches" className="relative py-20 sm:py-28 px-4 bg-gray-50">
        <div className="max-w-5xl mx-auto">
          <SectionTag text="Our Branches" />
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-2xl sm:text-4xl font-bold text-center mt-4 text-gray-900"
          >
            Strategically <span className="text-amber-700">Located</span>
          </motion.h2>

          <div className="mt-10 sm:mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
            {offices.map((o, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className={`relative p-5 sm:p-6 rounded-2xl border bg-white transition-all ${
                  o.highlight
                    ? 'border-amber-300 shadow-md sm:col-span-2 lg:col-span-1'
                    : 'border-gray-200 hover:border-amber-200 hover:shadow-sm'
                }`}
              >
                {o.highlight && (
                  <span className="absolute top-3 right-3 text-[10px] sm:text-xs font-semibold tracking-wider uppercase px-2.5 py-1 rounded-full bg-amber-100 text-amber-700 border border-amber-200">
                    Main
                  </span>
                )}
                <div
                  className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3 ${
                    o.highlight ? 'bg-amber-100' : 'bg-amber-50'
                  }`}
                >
                  <o.icon
                    size={20}
                    className={o.highlight ? 'text-amber-700' : 'text-amber-600'}
                  />
                </div>
                <p className="text-xs sm:text-sm font-medium text-amber-600 uppercase tracking-wider">
                  {o.type}
                </p>
                <p className="mt-1.5 text-sm sm:text-base text-gray-700 leading-relaxed">
                  {o.address}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── SERVICES / STATION ─── */}
      <section id="services" className="relative py-20 sm:py-28 px-4">
        <div className="max-w-5xl mx-auto">
          <SectionTag text="Station" />
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-2xl sm:text-4xl font-bold text-center mt-4 text-gray-900"
          >
            What We <span className="text-amber-700">Offer</span>
          </motion.h2>

          <div className="mt-10 sm:mt-14 grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5">
            {[
              {
                title: 'Full Truck Load',
                desc: 'Dedicated trucks for bulk cargo transportation across cities.',
              },
              {
                title: 'Part Load Freight',
                desc: 'Cost-effective shared transport for smaller consignments.',
              },
              {
                title: 'Warehouse & Storage',
                desc: 'Secure warehousing facilities at key transit points.',
              },
            ].map((s, i) => (
              <motion.div
                key={s.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="p-5 sm:p-6 rounded-2xl border border-gray-200 bg-white hover:border-amber-200 hover:shadow-sm transition-all"
              >
                <div className="w-10 h-10 rounded-xl bg-amber-50 flex items-center justify-center mb-4">
                  <Truck size={20} className="text-amber-600" />
                </div>
                <h3 className="text-base sm:text-lg font-semibold text-gray-900">
                  {s.title}
                </h3>
                <p className="mt-2 text-sm text-gray-500 leading-relaxed">
                  {s.desc}
                </p>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-10 sm:mt-14 p-6 sm:p-8 rounded-2xl border border-gray-200 bg-white text-center"
          >
            <Truck size={32} className="text-amber-400 mx-auto mb-4" />
            <h3 className="text-lg sm:text-xl font-semibold text-gray-900">
              Cities &amp; Routes
            </h3>
            <p className="mt-2 text-sm text-gray-500 max-w-md mx-auto">
              We operate across a wide network of cities. The full list of our
              served destinations and transport routes will be updated here
              shortly.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ─── CONTACT ─── */}
      <section id="contact" className="relative py-20 sm:py-28 px-4 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <SectionTag text="Contact" />
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-2xl sm:text-4xl font-bold text-center mt-4 text-gray-900"
          >
            Get In <span className="text-amber-700">Touch</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="mt-4 text-sm sm:text-base text-gray-500 max-w-lg mx-auto text-center"
          >
            Reach out to our head office or any branch for booking, enquiries,
            or freight rates.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="mt-10 sm:mt-12 grid grid-cols-1 sm:grid-cols-2 gap-5"
          >
            {/* Customer Service */}
            <div className="p-6 rounded-2xl border border-gray-200 bg-white">
              <div className="w-12 h-12 rounded-xl bg-amber-50 flex items-center justify-center mb-4">
                <Phone size={22} className="text-amber-600" />
              </div>
              <h3 className="text-base font-semibold text-gray-900 mb-3">
                Customer Service
              </h3>
              <div className="space-y-2">
                <a
                  href="tel:9690293140"
                  className="flex items-center gap-2 text-sm text-gray-600 hover:text-amber-700 transition-colors"
                >
                  <PhoneCall size={14} className="text-amber-500 shrink-0" />
                  9690293140
                </a>
                <a
                  href="tel:7902122230"
                  className="flex items-center gap-2 text-sm text-gray-600 hover:text-amber-700 transition-colors"
                >
                  <PhoneCall size={14} className="text-amber-500 shrink-0" />
                  7902122230
                </a>
              </div>
            </div>

            {/* Director */}
            <div className="p-6 rounded-2xl border border-gray-200 bg-white">
              <div className="w-12 h-12 rounded-xl bg-amber-50 flex items-center justify-center mb-4">
                <User size={22} className="text-amber-600" />
              </div>
              <h3 className="text-base font-semibold text-gray-900 mb-1">
                Director
              </h3>
              <p className="text-sm font-medium text-amber-700 mb-3">
                Rajeev Singh
              </p>
              <div className="space-y-2">
                <a
                  href="https://wa.me/919690293140"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm text-gray-600 hover:text-amber-700 transition-colors"
                >
                  <MessageCircle size={14} className="text-green-500 shrink-0" />
                  9690293140
                  <span className="text-xs text-gray-400">(WhatsApp)</span>
                </a>
                <a
                  href="tel:8077834769"
                  className="flex items-center gap-2 text-sm text-gray-600 hover:text-amber-700 transition-colors"
                >
                  <PhoneCall size={14} className="text-amber-500 shrink-0" />
                  8077834769
                  <span className="text-xs text-gray-400">(Only Call)</span>
                </a>
              </div>
            </div>

            {/* Head Office address - spans full width on mobile */}
            <div className="p-6 rounded-2xl border border-gray-200 bg-white sm:col-span-2">
              <div className="w-12 h-12 rounded-xl bg-amber-50 flex items-center justify-center mb-4">
                <MapPin size={22} className="text-amber-600" />
              </div>
              <h3 className="text-base font-semibold text-gray-900 mb-2">
                Head Office
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                Dube Parao, Aligarh - 202001, Uttar Pradesh
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ─── FOOTER ─── */}
      <footer className="border-t border-gray-200 py-8 px-4 bg-white">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Image
              src="/assets/ss-transport/logo.png"
              alt="SS Transport"
              width={28}
              height={28}
              className="w-7 h-7 object-contain"
            />
            <span className="text-sm font-semibold text-amber-700">
              S S Transport Corporation
            </span>
          </div>
          <p className="text-xs text-gray-400">
            &copy; {new Date().getFullYear()} S S Transport Corporation. All
            rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}

/* ─── small reusable tag ─── */
function SectionTag({ text }) {
  return (
    <div className="flex justify-center">
      <span className="inline-block text-xs sm:text-sm font-medium tracking-widest uppercase text-amber-600 border border-amber-200 px-4 py-1.5 rounded-full bg-amber-50">
        {text}
      </span>
    </div>
  );
}
