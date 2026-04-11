import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Mail, Lock, User, Phone, Eye, EyeOff, Check, AlertCircle, Zap, ShoppingCart, CalendarCheck, ArrowRight } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

const G = '#0DA366';
const G2 = '#0A8C58';
const T1 = '#111827';
const T2 = '#6B7280';
const T3 = '#9CA3AF';
const BD = '#E5E7EB';
const BG = '#F8F9FA';
const W = '#FFFFFF';
const ERR = '#EF4444';

function ZLogo({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path d="M5 5.5h14L6.5 18.5H19" stroke="#fff" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round"/>
      <circle cx="19.5" cy="5.5" r="1.6" fill="#6EE7B7"/>
      <circle cx="4.5" cy="18.5" r="1.6" fill="#6EE7B7"/>
    </svg>
  );
}

function Field({ label, type, value, onChange, icon, error, placeholder, toggle }: {
  label: string; type: string; value: string; onChange: (v: string) => void;
  icon: React.ReactNode; error?: string; placeholder: string;
  toggle?: { show: boolean; onToggle: () => void };
}) {
  return (
    <div>
      <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: T2, marginBottom: 5, letterSpacing: '.02em', textTransform: 'uppercase' }}>{label}</label>
      <div style={{ position: 'relative' }}>
        <div style={{ position: 'absolute', left: 13, top: '50%', transform: 'translateY(-50%)', color: error ? ERR : T3 }}>{icon}</div>
        <input
          type={type}
          value={value}
          onChange={e => onChange(e.target.value)}
          placeholder={placeholder}
          style={{
            width: '100%', paddingLeft: 42, paddingRight: toggle ? 42 : 14,
            paddingTop: 11, paddingBottom: 11, borderRadius: 10,
            border: `1.5px solid ${error ? ERR + '80' : BD}`,
            background: error ? '#FFF5F5' : W, fontSize: 14, color: T1,
            fontFamily: 'inherit', outline: 'none', transition: 'all .18s',
            boxShadow: 'none',
          }}
          onFocus={e => { e.target.style.borderColor = error ? ERR : G; e.target.style.boxShadow = `0 0 0 3px ${error ? ERR : G}18`; }}
          onBlur={e => { e.target.style.borderColor = error ? ERR + '80' : BD; e.target.style.boxShadow = 'none'; }}
        />
        {toggle && (
          <button type="button" onClick={toggle.onToggle} style={{ position: 'absolute', right: 13, top: '50%', transform: 'translateY(-50%)', color: T3 }}>
            {toggle.show ? <EyeOff size={15} /> : <Eye size={15} />}
          </button>
        )}
      </div>
      {error && <p style={{ fontSize: 11.5, color: ERR, marginTop: 4, display: 'flex', alignItems: 'center', gap: 4 }}><AlertCircle size={11} />{error}</p>}
    </div>
  );
}

const PERKS = [
  { icon: <Zap size={14} fill="#6EE7B7" color="#6EE7B7" />, text: 'Grocery delivered in 10 minutes' },
  { icon: <ShoppingCart size={14} color="#6EE7B7" />, text: '2,000+ restaurants near you' },
  { icon: <CalendarCheck size={14} color="#6EE7B7" />, text: 'Verified home service pros' },
];

const TESTIMONIALS = [
  { name: 'Priya M.', city: 'Bengaluru', text: '"Blinkit kaun? Zyphix is faster and cheaper!"' },
  { name: 'Arjun S.', city: 'Delhi', text: '"10-min delivery is real. I timed it 🙌"' },
  { name: 'Neha R.', city: 'Mumbai', text: '"Everything on one app. Absolutely love it."' },
];

export function AuthModal() {
  const { showModal, closeModal, login } = useAuth();
  const [mode, setMode] = useState<'signin' | 'signup' | 'forgot'>('signin');
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [forgotSent, setForgotSent] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', phone: '', password: '', confirmPw: '' });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [testimonialIdx] = useState(() => Math.floor(Math.random() * TESTIMONIALS.length));

  const set = (k: string) => (v: string) => setForm(f => ({ ...f, [k]: v }));

  const validate = () => {
    const e: Record<string, string> = {};
    if (mode === 'signup' && !form.name.trim()) e.name = 'Name is required';
    if (!form.email.trim()) e.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Enter a valid email';
    if (!form.password) e.password = 'Password is required';
    else if (form.password.length < 6) e.password = 'At least 6 characters';
    if (mode === 'signup' && form.password !== form.confirmPw) e.confirmPw = 'Passwords do not match';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    await new Promise(r => setTimeout(r, 1400));
    setLoading(false);
    setSuccess(true);
    await new Promise(r => setTimeout(r, 900));
    const name = form.name || form.email.split('@')[0];
    login({ name: name.charAt(0).toUpperCase() + name.slice(1), email: form.email, phone: form.phone });
  };

  const handleGoogle = async () => {
    setGoogleLoading(true);
    await new Promise(r => setTimeout(r, 1800));
    setGoogleLoading(false);
    login({ name: 'Google User', email: 'user@gmail.com', avatar: 'G' });
  };

  const handleForgot = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.email.trim()) { setErrors({ email: 'Enter your email' }); return; }
    setLoading(true);
    await new Promise(r => setTimeout(r, 1200));
    setLoading(false);
    setForgotSent(true);
  };

  const reset = (m: typeof mode) => {
    setMode(m); setErrors({}); setSuccess(false); setForgotSent(false);
    setForm({ name: '', email: '', phone: '', password: '', confirmPw: '' });
  };

  const t = TESTIMONIALS[testimonialIdx];

  return (
    <AnimatePresence>
      {showModal && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          style={{ position: 'fixed', inset: 0, zIndex: 200, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20, background: 'rgba(10,20,30,.7)', backdropFilter: 'blur(8px)' }}
          onClick={e => e.target === e.currentTarget && closeModal()}>

          <motion.div initial={{ opacity: 0, scale: .93, y: 28 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: .93, y: 28 }} transition={{ type: 'spring', damping: 26, stiffness: 360 }}
            style={{ display: 'flex', width: '100%', maxWidth: 820, borderRadius: 28, overflow: 'hidden', boxShadow: '0 32px 100px rgba(0,0,0,.38), 0 0 0 1px rgba(255,255,255,.06)', position: 'relative' }}>

            {/* ── LEFT PANEL ── */}
            <div style={{ width: 300, flexShrink: 0, background: 'linear-gradient(160deg, #052E1C 0%, #064E3B 40%, #065F46 100%)', padding: '36px 28px', display: 'flex', flexDirection: 'column', position: 'relative', overflow: 'hidden' }}>
              {/* subtle pattern overlay */}
              <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(circle at 80% 10%, rgba(13,163,102,.25) 0%, transparent 60%), radial-gradient(circle at 10% 90%, rgba(6,95,70,.4) 0%, transparent 55%)', pointerEvents: 'none' }} />

              {/* Logo */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 40, position: 'relative' }}>
                <div style={{ width: 40, height: 40, borderRadius: 12, background: 'rgba(255,255,255,.12)', border: '1px solid rgba(255,255,255,.18)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <ZLogo size={20} />
                </div>
                <span style={{ fontFamily: "'Outfit',sans-serif", fontWeight: 900, fontSize: '1.35rem', letterSpacing: '-.05em', color: '#fff' }}>
                  Zyp<span style={{ color: '#6EE7B7' }}>hix</span>
                </span>
              </div>

              {/* Headline */}
              <div style={{ position: 'relative', flex: 1 }}>
                <p style={{ fontFamily: "'Outfit',sans-serif", fontWeight: 900, fontSize: '1.55rem', color: '#fff', lineHeight: 1.25, letterSpacing: '-.04em', marginBottom: 8 }}>
                  India's SuperLocal App
                </p>
                <p style={{ fontSize: 13, color: 'rgba(255,255,255,.5)', marginBottom: 30, lineHeight: 1.6 }}>
                  Groceries, food & services — all in one place.
                </p>

                {/* Perks */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 13, marginBottom: 32 }}>
                  {PERKS.map((p, i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      <div style={{ width: 28, height: 28, borderRadius: 8, background: 'rgba(110,231,183,.1)', border: '1px solid rgba(110,231,183,.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                        {p.icon}
                      </div>
                      <span style={{ fontSize: 13, color: 'rgba(255,255,255,.75)', fontWeight: 500 }}>{p.text}</span>
                    </div>
                  ))}
                </div>

                {/* Divider */}
                <div style={{ height: 1, background: 'rgba(255,255,255,.08)', marginBottom: 20 }} />

                {/* Testimonial */}
                <div style={{ background: 'rgba(255,255,255,.05)', border: '1px solid rgba(255,255,255,.1)', borderRadius: 14, padding: '14px 16px' }}>
                  <p style={{ fontSize: 12.5, color: 'rgba(255,255,255,.7)', lineHeight: 1.55, fontStyle: 'italic', marginBottom: 10 }}>{t.text}</p>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <div style={{ width: 26, height: 26, borderRadius: '50%', background: 'linear-gradient(135deg,#0DA366,#065F46)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 800, color: '#fff' }}>
                      {t.name[0]}
                    </div>
                    <div>
                      <p style={{ fontSize: 11.5, fontWeight: 700, color: '#fff' }}>{t.name}</p>
                      <p style={{ fontSize: 10.5, color: 'rgba(255,255,255,.4)' }}>{t.city}</p>
                    </div>
                    <div style={{ marginLeft: 'auto', display: 'flex', gap: 1 }}>
                      {[...Array(5)].map((_, i) => <span key={i} style={{ color: '#FBBF24', fontSize: 10 }}>★</span>)}
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom counter */}
              <div style={{ marginTop: 24, position: 'relative' }}>
                <div style={{ display: 'flex', gap: 16 }}>
                  {[{ v: '5L+', l: 'Customers' }, { v: '100+', l: 'Cities' }, { v: '4.8★', l: 'Rating' }].map(({ v, l }, i) => (
                    <div key={i}>
                      <p style={{ fontFamily: "'Outfit',sans-serif", fontWeight: 900, fontSize: '1rem', color: '#fff', letterSpacing: '-.03em' }}>{v}</p>
                      <p style={{ fontSize: 10.5, color: 'rgba(255,255,255,.4)' }}>{l}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* ── RIGHT PANEL ── */}
            <div style={{ flex: 1, background: W, display: 'flex', flexDirection: 'column', position: 'relative' }}>
              {/* Close */}
              <button onClick={closeModal} style={{ position: 'absolute', top: 16, right: 16, zIndex: 10, width: 34, height: 34, borderRadius: '50%', background: BG, border: `1px solid ${BD}`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: T2, cursor: 'pointer' }}>
                <X size={15} />
              </button>

              <div style={{ padding: '36px 36px 32px', display: 'flex', flexDirection: 'column', flex: 1, overflowY: 'auto', maxHeight: '85vh' }}>

                {/* Title */}
                <div style={{ marginBottom: 24 }}>
                  <h2 style={{ fontFamily: "'Outfit',sans-serif", fontWeight: 900, color: T1, fontSize: '1.6rem', letterSpacing: '-.04em', marginBottom: 4 }}>
                    {mode === 'forgot' ? 'Reset password' : mode === 'signin' ? 'Welcome back' : 'Join Zyphix'}
                  </h2>
                  <p style={{ fontSize: 13.5, color: T2 }}>
                    {mode === 'forgot' ? "We'll email you a reset link instantly." : mode === 'signin' ? 'Sign in to track orders and unlock exclusive deals.' : 'Create your account and get 50% off your first order.'}
                  </p>
                </div>

                {/* Mode tabs */}
                {mode !== 'forgot' && (
                  <div style={{ display: 'flex', background: BG, borderRadius: 12, padding: 4, marginBottom: 22, border: `1px solid ${BD}` }}>
                    {(['signin', 'signup'] as const).map(m => (
                      <button key={m} onClick={() => reset(m)} style={{ flex: 1, padding: '9px', borderRadius: 9, fontSize: 13.5, fontWeight: 700, transition: 'all .18s', background: mode === m ? W : 'transparent', color: mode === m ? T1 : T3, boxShadow: mode === m ? '0 1px 4px rgba(0,0,0,.1)' : 'none', cursor: 'pointer', border: 'none' }}>
                        {m === 'signin' ? 'Sign In' : 'Create Account'}
                      </button>
                    ))}
                  </div>
                )}

                {success ? (
                  <motion.div initial={{ opacity: 0, scale: .92 }} animate={{ opacity: 1, scale: 1 }} style={{ textAlign: 'center', padding: '32px 0' }}>
                    <div style={{ width: 72, height: 72, borderRadius: '50%', background: 'rgba(13,163,102,.08)', border: '2px solid rgba(13,163,102,.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 18px' }}>
                      <Check size={32} color={G} />
                    </div>
                    <p style={{ fontFamily: "'Outfit',sans-serif", fontWeight: 900, color: T1, fontSize: 20, marginBottom: 6 }}>You're in! 🎉</p>
                    <p style={{ fontSize: 14, color: T2 }}>Welcome to Zyphix</p>
                  </motion.div>

                ) : forgotSent ? (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ textAlign: 'center', padding: '28px 0' }}>
                    <div style={{ width: 60, height: 60, borderRadius: '50%', background: 'rgba(13,163,102,.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
                      <Mail size={26} color={G} />
                    </div>
                    <p style={{ fontWeight: 800, color: T1, fontSize: 17, marginBottom: 6 }}>Check your inbox</p>
                    <p style={{ fontSize: 13.5, color: T2, marginBottom: 22, lineHeight: 1.6 }}>We've sent a reset link to<br /><strong style={{ color: T1 }}>{form.email}</strong></p>
                    <button onClick={() => reset('signin')} style={{ fontSize: 13.5, fontWeight: 700, color: G, cursor: 'pointer', border: 'none', background: 'transparent' }}>← Back to Sign In</button>
                  </motion.div>

                ) : (
                  <>
                    {/* Google */}
                    {mode !== 'forgot' && (
                      <>
                        <button onClick={handleGoogle} disabled={googleLoading}
                          style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10, padding: '12px', borderRadius: 12, border: `1.5px solid ${BD}`, background: W, fontSize: 14, fontWeight: 600, color: T1, marginBottom: 14, transition: 'all .18s', cursor: googleLoading ? 'wait' : 'pointer', opacity: googleLoading ? .7 : 1, boxShadow: '0 1px 3px rgba(0,0,0,.06)' }}
                          onMouseEnter={e => { if (!googleLoading) { (e.currentTarget as HTMLElement).style.background = BG; (e.currentTarget as HTMLElement).style.borderColor = '#D1D5DB'; } }}
                          onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = W; (e.currentTarget as HTMLElement).style.borderColor = BD; }}>
                          {googleLoading ? (
                            <span style={{ width: 18, height: 18, border: '2px solid #CBD5E1', borderTopColor: G, borderRadius: '50%', display: 'inline-block', animation: 'spin .7s linear infinite' }} />
                          ) : (
                            <svg width="18" height="18" viewBox="0 0 18 18"><path d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.717v2.258h2.908c1.702-1.567 2.684-3.875 2.684-6.615z" fill="#4285F4"/><path d="M9 18c2.43 0 4.467-.806 5.956-2.184l-2.908-2.258c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 0 0 9 18z" fill="#34A853"/><path d="M3.964 10.707A5.41 5.41 0 0 1 3.682 9c0-.593.102-1.17.282-1.707V4.961H.957A8.996 8.996 0 0 0 0 9c0 1.452.348 2.827.957 4.039l3.007-2.332z" fill="#FBBC05"/><path d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 0 0 .957 4.961L3.964 7.293C4.672 5.166 6.656 3.58 9 3.58z" fill="#EA4335"/></svg>
                          )}
                          {googleLoading ? 'Signing you in…' : 'Continue with Google'}
                        </button>

                        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 18 }}>
                          <div style={{ flex: 1, height: 1, background: BD }} />
                          <span style={{ fontSize: 11.5, color: T3, fontWeight: 600, letterSpacing: '.04em' }}>OR</span>
                          <div style={{ flex: 1, height: 1, background: BD }} />
                        </div>
                      </>
                    )}

                    <form onSubmit={mode === 'forgot' ? handleForgot : handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 13 }}>
                      {mode === 'signup' && (
                        <Field label="Full Name" type="text" value={form.name} onChange={set('name')} icon={<User size={15} />} error={errors.name} placeholder="Rahul Sharma" />
                      )}
                      <Field label="Email Address" type="email" value={form.email} onChange={set('email')} icon={<Mail size={15} />} error={errors.email} placeholder="you@example.com" />
                      {mode === 'signup' && (
                        <Field label="Phone (optional)" type="tel" value={form.phone} onChange={set('phone')} icon={<Phone size={15} />} placeholder="+91 98765 43210" />
                      )}
                      {mode !== 'forgot' && (
                        <Field label="Password" type={showPw ? 'text' : 'password'} value={form.password} onChange={set('password')} icon={<Lock size={15} />} error={errors.password} placeholder={mode === 'signup' ? 'Min 6 characters' : 'Your password'}
                          toggle={{ show: showPw, onToggle: () => setShowPw(p => !p) }} />
                      )}
                      {mode === 'signup' && (
                        <Field label="Confirm Password" type="password" value={form.confirmPw} onChange={set('confirmPw')} icon={<Lock size={15} />} error={errors.confirmPw} placeholder="Repeat password" />
                      )}

                      {mode === 'signin' && (
                        <div style={{ textAlign: 'right', marginTop: -6 }}>
                          <button type="button" onClick={() => reset('forgot')} style={{ fontSize: 12.5, fontWeight: 600, color: G, cursor: 'pointer', border: 'none', background: 'transparent' }}>Forgot password?</button>
                        </div>
                      )}

                      <motion.button type="submit" disabled={loading} whileTap={{ scale: .98 }}
                        style={{ width: '100%', padding: '13px', borderRadius: 12, background: loading ? G + 'BB' : `linear-gradient(135deg, ${G}, ${G2})`, color: '#fff', fontSize: 15, fontWeight: 800, marginTop: 4, cursor: loading ? 'wait' : 'pointer', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, boxShadow: loading ? 'none' : `0 4px 18px ${G}40` }}>
                        {loading ? (
                          <><span style={{ width: 16, height: 16, border: '2px solid rgba(255,255,255,.3)', borderTopColor: '#fff', borderRadius: '50%', display: 'inline-block', animation: 'spin .7s linear infinite' }} />
                            {mode === 'forgot' ? 'Sending…' : mode === 'signin' ? 'Signing in…' : 'Creating account…'}
                          </>
                        ) : (
                          <>{mode === 'forgot' ? 'Send Reset Link' : mode === 'signin' ? 'Sign In' : 'Create Account'} <ArrowRight size={15} /></>
                        )}
                      </motion.button>

                      {mode === 'forgot' && (
                        <button type="button" onClick={() => reset('signin')} style={{ textAlign: 'center', fontSize: 13, color: T2, marginTop: 4, width: '100%', cursor: 'pointer', border: 'none', background: 'transparent' }}>← Back to Sign In</button>
                      )}

                      {mode === 'signup' && (
                        <p style={{ fontSize: 11, color: T3, textAlign: 'center', lineHeight: 1.6, marginTop: 2 }}>
                          By creating an account you agree to our{' '}
                          <a href="/terms" onClick={closeModal} style={{ color: T2, fontWeight: 600 }}>Terms</a>{' '}and{' '}
                          <a href="/privacy" onClick={closeModal} style={{ color: T2, fontWeight: 600 }}>Privacy Policy</a>.
                        </p>
                      )}
                    </form>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
