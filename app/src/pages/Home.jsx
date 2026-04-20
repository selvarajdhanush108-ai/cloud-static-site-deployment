import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ArrowRight, Code2, Smartphone, MonitorSmartphone, Globe, GraduationCap, ExternalLink, PlayCircle } from 'lucide-react';

const navLinks = [
  { name: 'Services', href: '#services' },
  { name: 'Our Works', href: '#works' },
  { name: 'Pricing', href: '#packages' },
  { name: 'Contact', href: '#contact' },
];

export default function Home() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [form, setForm] = useState({ fullName: '', email: '', phone: '', serviceType: '', budgetRange: '', projectDescription: '' });
  const [message, setMessage] = useState({ text: '', type: '' });
  
  // New state for fetching portfolio works
  const [works, setWorks] = useState([]);
  const [loadingWorks, setLoadingWorks] = useState(true);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    
    // Fetch works on component mount
    fetchWorks();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const fetchWorks = async () => {
    try {
      // Calling your shiny new Node backend
      const response = await fetch('https://coduxdotfun-admin-dashboard.onrender.com/api/works');
      if (!response.ok) throw new Error('Failed to fetch data');
      const data = await response.json();
      setWorks(data);
    } catch (error) {
      console.error("Error fetching works:", error);
    } finally {
      setLoadingWorks(false);
    }
  };

  const scrollTo = (id) => {
    setMobileMenuOpen(false);
    const el = document.getElementById(id.substring(1));
    if (el) {
      const y = el.getBoundingClientRect().top + window.scrollY - 100;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  const submitInquiry = (e) => {
    e.preventDefault();
    const subject = encodeURIComponent(`New Project Inquiry from ${form.fullName}`);
    const body = encodeURIComponent(
      `Client Details:\nName: ${form.fullName}\nEmail: ${form.email}\nPhone: ${form.phone || 'Not provided'}\n\n` +
      `Project Scope:\nService: ${form.serviceType}\nBudget: ${form.budgetRange}\n\n` +
      `Description:\n${form.projectDescription}`
    );

    window.location.href = `mailto:contact@codux.fun?subject=${subject}&body=${body}`;
    setMessage({ text: 'Opening your email client...', type: 'success' });
    
    setTimeout(() => {
      setForm({ fullName: '', email: '', phone: '', serviceType: '', budgetRange: '', projectDescription: '' });
      setMessage({ text: '', type: '' });
    }, 4000);
  };

  const fadeUp = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } } };

  return (
    <div className="w-full flex flex-col flex-1 min-h-screen relative">
      <AnimatePresence>
        {message.text && (
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} 
            className="fixed top-24 right-6 z-[100] px-6 py-4 rounded-xl shadow-2xl border bg-zinc-900 border-green-500/20 text-green-400">
            <p className="font-medium text-sm">{message.text}</p>
          </motion.div>
        )}
      </AnimatePresence>

      <header className={`fixed top-0 w-full z-50 transition-all duration-500 ${scrolled ? 'pt-4 px-4' : 'pt-6 px-6'}`}>
        <div className={`mx-auto max-w-7xl flex items-center justify-between px-6 py-4 rounded-full transition-all duration-500 ${scrolled ? 'glass-nav shadow-2xl' : 'bg-transparent'}`}>
          <button onClick={() => window.scrollTo(0,0)} className="text-xl font-bold tracking-tight text-white flex items-center gap-2">
            <span className="bg-white text-black p-1.5 rounded-lg"><Code2 size={18} /></span>
            codux.fun
          </button>
          
          <nav className="hidden md:flex items-center space-x-8 text-sm font-medium">
            {navLinks.map((link) => (
              <button key={link.name} onClick={() => scrollTo(link.href)} className="text-mutedForeground hover:text-white transition-colors">{link.name}</button>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-4">
            <button onClick={() => scrollTo('#contact')} className="btn-primary text-sm px-6 py-2">Start Project</button>
          </div>

          <button className="md:hidden text-white" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </header>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="fixed inset-0 z-40 bg-background/95 backdrop-blur-xl pt-32 px-6 md:hidden">
            <div className="flex flex-col space-y-6 text-2xl font-semibold">
              {navLinks.map((link) => (
                <button key={link.name} onClick={() => scrollTo(link.href)} className="text-left text-mutedForeground hover:text-white">{link.name}</button>
              ))}
              <div className="h-px bg-border my-4 w-full"></div>
              <button onClick={() => scrollTo('#contact')} className="text-left text-white mt-4">Start Project <ArrowRight className="inline ml-2" /></button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <main className="w-full flex flex-col flex-1 relative z-10">
        
        {/* HERO SECTION */}
        <section className="min-h-screen w-full flex items-center pt-32 pb-20 px-6 relative">
          <div className="max-w-7xl mx-auto w-full grid lg:grid-cols-2 gap-12 items-center relative z-10">
            
            <motion.div initial="hidden" animate="visible" variants={fadeUp} className="text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-muted/50 border border-border text-sm text-mutedForeground mb-8">
                <Globe size={14} /> Custom Software Development Company in India
              </div>
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter mb-6 text-gradient leading-[1.1]">
                Engineering digital <br className="hidden md:block"/> excellence.
              </h1>
              <p className="text-lg md:text-xl text-mutedForeground mb-10 max-w-xl font-light leading-relaxed">
                As a premier software development company, we deliver professional website development services, startup mobile app development, and robust business automation software development for a global clientele.
              </p>
              <div className="flex flex-col sm:flex-row items-center gap-4">
                <button onClick={() => scrollTo('#contact')} className="btn-primary w-full sm:w-auto">
                  Discuss Your Project
                </button>
                <button onClick={() => scrollTo('#services')} className="btn-secondary w-full sm:w-auto group">
                  View Our Expertise <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.2, ease: "easeOut", delay: 0.2 }}
              className="hidden lg:flex justify-center items-center relative w-full h-full min-h-[500px]"
            >
              <div className="absolute inset-0 bg-white/5 blur-[100px] rounded-full"></div>
              <motion.img 
                src="/hero-logo.png" 
                alt="Custom Software Development Company India Logo" 
                animate={{ y: [-15, 15, -15] }}
                transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
                className="w-full max-w-[600px] object-contain invert drop-shadow-[0_0_40px_rgba(255,255,255,0.15)] relative z-10"
              />
            </motion.div>
          </div>
        </section>

        {/* SERVICES */}
        <section id="services" className="py-32 px-6">
          <div className="max-w-7xl mx-auto">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={fadeUp} className="mb-16">
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">Professional Software Development Services.</h2>
              <p className="text-mutedForeground text-lg max-w-2xl">Precision-engineered SaaS applications and custom website development tailored for global scale.</p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-6">
              <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="premium-card md:col-span-2 group">
                <div className="bg-muted w-14 h-14 rounded-xl flex items-center justify-center mb-8 border border-border group-hover:bg-white group-hover:text-black transition-colors">
                  <MonitorSmartphone size={28} />
                </div>
                <h3 className="text-2xl font-semibold mb-3">Website Development Company</h3>
                <p className="text-mutedForeground font-light leading-relaxed max-w-md">
                  We offer top-tier responsive web design services and custom website development. From highly-converting landing pages to complex ecommerce website development, our modern UI/UX website design ensures flawless user experiences.
                </p>
              </motion.div>
              
              <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} transition={{ delay: 0.1 }} className="premium-card group">
                <div className="bg-muted w-14 h-14 rounded-xl flex items-center justify-center mb-8 border border-border group-hover:bg-white group-hover:text-black transition-colors">
                  <Smartphone size={28} />
                </div>
                <h3 className="text-2xl font-semibold mb-3">Mobile App Development</h3>
                <p className="text-mutedForeground font-light leading-relaxed">
                  As a leading Flutter app development company, we engineer sleek Android app development services and cross-platform mobile app development solutions that put your brand directly in users' pockets.
                </p>
              </motion.div>

              <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} transition={{ delay: 0.2 }} className="premium-card md:col-span-2 flex flex-col items-start justify-between group">
                <div className="bg-muted w-14 h-14 rounded-xl flex items-center justify-center mb-8 border border-border group-hover:bg-white group-hover:text-black transition-colors">
                  <Code2 size={28} />
                </div>
                <h3 className="text-2xl font-semibold mb-3">Enterprise Software Development</h3>
                <p className="text-mutedForeground font-light leading-relaxed max-w-xl">
                  Bespoke custom software development services including powerful SaaS application development, software development for startups, and intricate business automation software development to streamline your global operations.
                </p>
              </motion.div>

               <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} transition={{ delay: 0.3 }} className="premium-card md:col-span-1 group">
                <div className="bg-muted w-14 h-14 rounded-xl flex items-center justify-center mb-8 border border-border group-hover:bg-white group-hover:text-black transition-colors">
                  <GraduationCap size={28} />
                </div>
                <h3 className="text-2xl font-semibold mb-3">UG & Final Year Projects</h3>
                <p className="text-mutedForeground font-light leading-relaxed">
                  Expert final year project development services. We are a trusted UG project development company offering dedicated BTech final year project assistance, computer science project development, and complex IEEE project development services.
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* OUR WORKS SECTION (NEW) */}
        <section id="works" className="py-32 px-6 bg-zinc-950 border-t border-white/5">
          <div className="max-w-7xl mx-auto">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={fadeUp} className="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-6">
              <div>
                <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">Our Selected Works.</h2>
                <p className="text-mutedForeground text-lg max-w-2xl">A showcase of engineering excellence and digital transformation.</p>
              </div>
            </motion.div>

            {loadingWorks ? (
              <div className="flex justify-center py-20">
                <div className="w-10 h-10 border-4 border-zinc-800 border-t-white rounded-full animate-spin"></div>
              </div>
            ) : works.length === 0 ? (
              <div className="text-center py-20 premium-card">
                <p className="text-mutedForeground">No projects deployed yet. Waiting for transmission...</p>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {works.map((work, index) => (
                  <motion.div 
                    key={work.id} 
                    initial="hidden" 
                    whileInView="visible" 
                    viewport={{ once: true }} 
                    variants={fadeUp} 
                    transition={{ delay: index * 0.1 }}
                    className="group rounded-3xl overflow-hidden bg-card border border-border hover:border-white/20 transition-all duration-500"
                  >
                    {/* Thumbnail */}
                    <div className="w-full aspect-video bg-zinc-900 overflow-hidden relative">
                      {work.thumbnail_url ? (
                        <img 
                          src={work.thumbnail_url} 
                          alt={work.project_name} 
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-zinc-700">
                          <Code2 size={40} />
                        </div>
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </div>
                    
                    {/* Content */}
                    <div className="p-8">
                      <h3 className="text-xl font-bold mb-3 text-white truncate">{work.project_name}</h3>
                      <p className="text-mutedForeground text-sm line-clamp-3 mb-6 font-light">
                        {work.description}
                      </p>
                      
                      <div className="flex items-center gap-4">
                        {work.live_url && (
                          <a 
                            href={work.live_url} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 text-sm font-medium text-white hover:text-sky-400 transition-colors"
                          >
                            <ExternalLink size={16} /> Live Preview
                          </a>
                        )}
                        {work.video_url && (
                          <a 
                            href={work.video_url} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 text-sm font-medium text-mutedForeground hover:text-white transition-colors"
                          >
                            <PlayCircle size={16} /> Watch Demo
                          </a>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* PRICING */}
        <section id="packages" className="py-32 px-6 border-y border-white/5">
          <div className="max-w-7xl mx-auto">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={fadeUp} className="text-center mb-20">
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">Transparent Investment.</h2>
              <p className="text-mutedForeground text-lg">World-class enterprise software development quality without the Silicon Valley bloat.</p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto items-center">
              {[
                { name: 'Launchpad', price: '₹3,000', desc: 'A professional online presence with modern UI/UX website design.', highlight: false, features: ['5-Page Website', 'Responsive Design', 'Basic SEO Setup'] },
                { name: 'Orbit', price: '₹9,000', desc: 'A complete custom website development solution for growing brands.', highlight: true, features: ['Custom UI/UX Design', 'CMS Integration', 'Advanced SEO', 'Performance Optimized'] },
                { name: 'Galaxy', price: 'Custom', desc: 'Bespoke engineering and SaaS application development.', highlight: false, features: ['Android Apps', 'Custom Web Apps', 'API Integrations', 'Scalable Architecture'] },
              ].map((pkg, i) => (
                <motion.div key={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} transition={{ delay: i * 0.1 }}
                  className={`rounded-3xl p-8 ${pkg.highlight ? 'bg-white text-black scale-105 shadow-2xl shadow-white/10' : 'bg-card border border-border text-white'}`}>
                  <h3 className="text-xl font-semibold mb-2">{pkg.name}</h3>
                  <p className={`text-sm mb-6 min-h-[40px] ${pkg.highlight ? 'text-zinc-600' : 'text-mutedForeground'}`}>{pkg.desc}</p>
                  <div className="mb-8">
                    <span className="text-5xl font-bold tracking-tight">{pkg.price}</span>
                  </div>
                  <ul className="space-y-4 mb-8">
                    {pkg.features.map((feat, j) => (
                      <li key={j} className="flex items-center text-sm">
                        <svg className={`w-4 h-4 mr-3 ${pkg.highlight ? 'text-black' : 'text-white'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                        {feat}
                      </li>
                    ))}
                  </ul>
                  <button onClick={() => { setForm({...form, serviceType: pkg.name === 'Galaxy' ? 'Custom Software' : 'Website'}); scrollTo('#contact'); }} 
                    className={`w-full py-4 rounded-xl font-medium transition-all ${pkg.highlight ? 'bg-black text-white hover:bg-zinc-800' : 'bg-muted text-white hover:bg-muted/80'}`}>
                    {pkg.name === 'Galaxy' ? 'Contact Sales' : 'Get Started'}
                  </button>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CONTACT FORM */}
        <section id="contact" className="py-32 px-6">
          <div className="max-w-4xl mx-auto">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={fadeUp} className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">Initiate Contact.</h2>
              <p className="text-mutedForeground text-lg">Ready to build your next custom software development project? Leave your details below.</p>
            </motion.div>

            <motion.form initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} onSubmit={submitInquiry} className="premium-card max-w-2xl mx-auto space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-mutedForeground pl-1">Full Name</label>
                  <input value={form.fullName} onChange={(e) => setForm({...form, fullName: e.target.value})} type="text" className="input-field" required />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-mutedForeground pl-1">Email Address</label>
                  <input value={form.email} onChange={(e) => setForm({...form, email: e.target.value})} type="email" className="input-field" required />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-mutedForeground pl-1">Phone Number (Optional)</label>
                <input value={form.phone} onChange={(e) => setForm({...form, phone: e.target.value})} type="tel" className="input-field" />
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-mutedForeground pl-1">Service Required</label>
                  <select value={form.serviceType} onChange={(e) => setForm({...form, serviceType: e.target.value})} className="input-field appearance-none bg-card" required>
                    <option value="" disabled>Select Service</option>
                    <option>Website Development</option>
                    <option>Mobile App Development</option>
                    <option>Enterprise Software</option>
                    <option>UG / Final Year Project</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-mutedForeground pl-1">Expected Budget</label>
                  <select value={form.budgetRange} onChange={(e) => setForm({...form, budgetRange: e.target.value})} className="input-field appearance-none bg-card" required>
                    <option value="" disabled>Select Budget</option>
                    <option>₹3,000 - ₹5,000</option>
                    <option>₹5,000 - ₹10,000</option>
                    <option>₹10,000 - ₹25,000</option>
                    <option>₹25,000+</option>
                  </select>
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-mutedForeground pl-1">Project Details</label>
                <textarea value={form.projectDescription} onChange={(e) => setForm({...form, projectDescription: e.target.value})} rows="4" className="input-field resize-none" required></textarea>
              </div>
              <button type="submit" className="btn-primary w-full py-4 mt-4">
                Submit Inquiry
              </button>
            </motion.form>
          </div>
        </section>

      </main>

      <footer className="w-full mt-auto border-t border-border py-12 px-6 relative z-20 bg-background">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2 text-xl font-bold tracking-tight text-white">
            <span className="bg-white text-black p-1 rounded-md"><Code2 size={16} /></span>
            codux.fun
          </div>
          <p className="text-mutedForeground text-sm text-center md:text-left">
            Empowering businesses worldwide. <br className="md:hidden"/>
            &copy; {new Date().getFullYear()} All Rights Reserved.
          </p>
          <div className="flex gap-6 text-sm text-mutedForeground">
            <a href="mailto:contact@codux.fun" className="hover:text-white transition-colors">contact@codux.fun</a>
            <a href="#" className="hover:text-white transition-colors">Privacy</a>
          </div>
        </div>
      </footer>

    </div>
  );
}