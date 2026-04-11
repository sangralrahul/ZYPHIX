import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Mail, Lock, User, Phone, Eye, EyeOff, Check, AlertCircle, Zap, ShoppingCart, CalendarCheck, ArrowRight, ChevronLeft } from 'lucide-react';
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
      <rect x="2.5" y="3.5" width="19" height="4.2" rx="2.1" fill="white"/>
      <polygon points="20.2,7.7 17.6,7.7 3.8,16.3 6.4,16.3" fill="white"/>
      <rect x="2.5" y="16.3" width="19" height="4.2" rx="2.1" fill="white"/>
      <circle cx="20.2" cy="5.6" r="1.6" fill="#6EE7B7"/>
      <circle cx="3.8" cy="18.4" r="1.6" fill="#6EE7B7"/>
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
        <input type={type} value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder}
          style={{ width: '100%', paddingLeft: 42, paddingRight: toggle ? 42 : 14, paddingTop: 11, paddingBottom: 11, borderRadius: 10, border: `1.5px solid ${error ? ERR + '80' : BD}`, background: error ? '#FFF5F5' : W, fontSize: 14, color: T1, fontFamily: 'inherit', outline: 'none', transition: 'all .18s', boxSizing: 'border-box' }}
          onFocus={e => { e.target.style.borderColor = error ? ERR : G; e.target.style.boxShadow = `0 0 0 3px ${error ? ERR : G}18`; }}
          onBlur={e => { e.target.style.borderColor = error ? ERR + '80' : BD; e.target.style.boxShadow = 'none'; }}
        />
        {toggle && (
          <button type="button" onClick={toggle.onToggle} style={{ position: 'absolute', right: 13, top: '50%', transform: 'translateY(-50%)', color: T3, background: 'none', border: 'none', cursor: 'pointer' }}>
            {toggle.show ? <EyeOff size={15} /> : <Eye size={15} />}
          </button>
        )}
      </div>
      {error && <p style={{ fontSize: 11.5, color: ERR, marginTop: 4, display: 'flex', alignItems: 'center', gap: 4 }}><AlertCircle size={11} />{error}</p>}
    </div>
  );
}

function OtpInput({ value, onChange, error }: { value: string[]; onChange: (v: string[]) => void; error?: string }) {
  const refs = useRef<(HTMLInputElement | null)[]>([]);
  const handleKey = (i: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !value[i] && i > 0) refs.current[i - 1]?.focus();
  };
  const handleChange = (i: number, raw: string) => {
    const char = raw.replace(/\D/g, '').slice(-1);
    const next = [...value];
    next[i] = char;
    onChange(next);
    if (char && i < 5) refs.current[i + 1]?.focus();
  };
  const handlePaste = (e: React.ClipboardEvent) => {
    const paste = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6);
    if (paste.length) {
      const next = paste.split('').concat(Array(6).fill('')).slice(0, 6);
      onChange(next);
      refs.current[Math.min(paste.length, 5)]?.focus();
      e.preventDefault();
    }
  };
  return (
    <div>
      <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: T2, marginBottom: 8, letterSpacing: '.02em', textTransform: 'uppercase' }}>Enter 6-digit OTP</label>
      <div style={{ display: 'flex', gap: 8 }}>
        {value.map((v, i) => (
          <input key={i} ref={el => { refs.current[i] = el; }} type="text" inputMode="numeric" maxLength={1} value={v}
            onChange={e => handleChange(i, e.target.value)} onKeyDown={e => handleKey(i, e)} onPaste={handlePaste}
            style={{ width: 44, height: 50, textAlign: 'center', fontSize: 20, fontWeight: 800, fontFamily: "'Outfit',sans-serif", borderRadius: 10, border: `1.5px solid ${error ? ERR + '80' : v ? G : BD}`, background: v ? `${G}08` : W, color: T1, outline: 'none', transition: 'all .15s' }}
            onFocus={e => { e.target.style.borderColor = G; e.target.style.boxShadow = `0 0 0 3px ${G}20`; }}
            onBlur={e => { e.target.style.borderColor = error ? ERR + '80' : v ? G : BD; e.target.style.boxShadow = 'none'; }}
          />
        ))}
      </div>
      {error && <p style={{ fontSize: 11.5, color: ERR, marginTop: 6, display: 'flex', alignItems: 'center', gap: 4 }}><AlertCircle size={11} />{error}</p>}
    </div>
  );
}

function Countdown({ seconds, onDone }: { seconds: number; onDone: () => void }) {
  const [left, setLeft] = useState(seconds);
  useEffect(() => {
    if (left <= 0) { onDone(); return; }
    const t = setTimeout(() => setLeft(l => l - 1), 1000);
    return () => clearTimeout(t);
  }, [left]);
  const m = String(Math.floor(left / 60)).padStart(2, '0');
  const s = String(left % 60).padStart(2, '0');
  return <span style={{ color: T3, fontWeight: 600 }}>{m}:{s}</span>;
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

type AuthMethod = 'phone' | 'google' | 'email';
type EmailMode = 'signin' | 'signup' | 'forgot';
type PhoneStep = 'enter' | 'otp';

export function AuthModal() {
  const { showModal, closeModal, login } = useAuth();
  const [method, setMethod] = useState<AuthMethod>('phone');
  const [emailMode, setEmailMode] = useState<EmailMode>('signin');
  const [phoneStep, setPhoneStep] = useState<PhoneStep>('enter');
  const [phoneNum, setPhoneNum] = useState('');
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [canResend, setCanResend] = useState(false);
  const [countdownKey, setCountdownKey] = useState(0);
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [forgotSent, setForgotSent] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', phone: '', password: '', confirmPw: '' });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [testimonialIdx] = useState(() => Math.floor(Math.random() * TESTIMONIALS.length));

  const set = (k: string) => (v: string) => setForm(f => ({ ...f, [k]: v }));

  const resetAll = () => {
    setPhoneStep('enter'); setPhoneNum(''); setOtp(['', '', '', '', '', '']);
    setErrors({}); setSuccess(false); setForgotSent(false); setCanResend(false);
    setForm({ name: '', email: '', phone: '', password: '', confirmPw: '' });
    setLoading(false); setGoogleLoading(false);
  };

  const switchMethod = (m: AuthMethod) => { resetAll(); setMethod(m); };
  const switchEmail = (m: EmailMode) => { resetAll(); setEmailMode(m); setMethod('email'); };

  const sendOtp = async (e?: React.FormEvent) => {
    e?.preventDefault();
    const cleaned = phoneNum.replace(/\D/g, '');
    if (cleaned.length < 10) { setErrors({ phone: 'Enter a valid 10-digit mobile number' }); return; }
    setErrors({});
    setLoading(true);
    await new Promise(r => setTimeout(r, 1400));
    setLoading(false);
    setPhoneStep('otp');
    setCanResend(false);
    setCountdownKey(k => k + 1);
  };

  const verifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    const code = otp.join('');
    if (code.length < 6) { setErrors({ otp: 'Enter the complete 6-digit OTP' }); return; }
    setErrors({});
    setLoading(true);
    await new Promise(r => setTimeout(r, 1200));
    setLoading(false);
    setSuccess(true);
    await new Promise(r => setTimeout(r, 900));
    const num = phoneNum.replace(/\D/g, '');
    login({ name: 'Zyphix User', email: '', phone: `+91 ${num.slice(-10)}` });
  };

  const handleResend = async () => {
    if (!canResend) return;
    setOtp(['', '', '', '', '', '']);
    setCanResend(false);
    setCountdownKey(k => k + 1);
  };

  const handleGoogle = async () => {
    setGoogleLoading(true);
    await new Promise(r => setTimeout(r, 1800));
    setGoogleLoading(false);
    login({ name: 'Google User', email: 'user@gmail.com', avatar: 'G' });
  };

  const validateEmail = () => {
    const e: Record<string, string> = {};
    if (emailMode === 'signup' && !form.name.trim()) e.name = 'Name is required';
    if (!form.email.trim()) e.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Enter a valid email';
    if (!form.password) e.password = 'Password is required';
    else if (form.password.length < 6) e.password = 'At least 6 characters';
    if (emailMode === 'signup' && form.password !== form.confirmPw) e.confirmPw = 'Passwords do not match';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateEmail()) return;
    setLoading(true);
    await new Promise(r => setTimeout(r, 1400));
    setLoading(false);
    setSuccess(true);
    await new Promise(r => setTimeout(r, 900));
    const name = form.name || form.email.split('@')[0];
    login({ name: name.charAt(0).toUpperCase() + name.slice(1), email: form.email, phone: form.phone });
  };

  const handleForgot = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.email.trim()) { setErrors({ email: 'Enter your email' }); return; }
    setLoading(true);
    await new Promise(r => setTimeout(r, 1200));
    setLoading(false);
    setForgotSent(true);
  };

  const t = TESTIMONIALS[testimonialIdx];
  const maskedPhone = phoneNum.replace(/\D/g, '').slice(-10).replace(/(\d{5})(\d{5})/, '$1 $2');

  const headings: Record<string, string> = {
    phone: phoneStep === 'enter' ? 'Enter mobile number' : 'Verify OTP',
    google: 'Continue with Google',
    email: emailMode === 'forgot' ? 'Reset password' : emailMode === 'signin' ? 'Welcome back' : 'Join Zyphix',
  };
  const subheadings: Record<string, string> = {
    phone: phoneStep === 'enter' ? "We'll send a one-time password to your number" : `OTP sent to +91 ${maskedPhone}`,
    google: 'Sign in instantly using your Google account',
    email: emailMode === 'forgot' ? "We'll send a reset link to your inbox." : emailMode === 'signin' ? 'Sign in to track orders & unlock deals.' : 'Get 50% off your first order!',
  };

  return (
    <AnimatePresence>
      {showModal && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          style={{ position: 'fixed', inset: 0, zIndex: 200, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20, background: 'rgba(10,20,30,.72)', backdropFilter: 'blur(8px)' }}
          onClick={e => e.target === e.currentTarget && closeModal()}>

          <motion.div initial={{ opacity: 0, scale: .93, y: 28 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: .93, y: 28 }} transition={{ type: 'spring', damping: 26, stiffness: 360 }}
            style={{ display: 'flex', width: '100%', maxWidth: 840, borderRadius: 28, overflow: 'hidden', boxShadow: '0 32px 100px rgba(0,0,0,.4), 0 0 0 1px rgba(255,255,255,.06)', position: 'relative' }}>

            {/* ── LEFT PANEL ── */}
            <div style={{ width: 300, flexShrink: 0, background: 'linear-gradient(160deg, #052E1C 0%, #064E3B 40%, #065F46 100%)', padding: '36px 28px', display: 'flex', flexDirection: 'column', position: 'relative', overflow: 'hidden' }}>
              <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(circle at 80% 10%, rgba(13,163,102,.25) 0%, transparent 60%), radial-gradient(circle at 10% 90%, rgba(6,95,70,.4) 0%, transparent 55%)', pointerEvents: 'none' }} />

              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 40, position: 'relative' }}>
                <div style={{ width: 40, height: 40, borderRadius: 12, background: 'rgba(255,255,255,.12)', border: '1px solid rgba(255,255,255,.18)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <ZLogo size={20} />
                </div>
                <span style={{ fontFamily: "'Outfit',sans-serif", fontWeight: 900, fontSize: '1.35rem', letterSpacing: '-.05em', color: '#fff' }}>
                  Zyp<span style={{ color: '#6EE7B7' }}>hix</span>
                </span>
              </div>

              <div style={{ position: 'relative', flex: 1 }}>
                <p style={{ fontFamily: "'Outfit',sans-serif", fontWeight: 900, fontSize: '1.55rem', color: '#fff', lineHeight: 1.25, letterSpacing: '-.04em', marginBottom: 8 }}>India's SuperLocal App</p>
                <p style={{ fontSize: 13, color: 'rgba(255,255,255,.5)', marginBottom: 30, lineHeight: 1.6 }}>Groceries, food & services — all in one place.</p>

                <div style={{ display: 'flex', flexDirection: 'column', gap: 13, marginBottom: 32 }}>
                  {PERKS.map((p, i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      <div style={{ width: 28, height: 28, borderRadius: 8, background: 'rgba(110,231,183,.1)', border: '1px solid rgba(110,231,183,.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>{p.icon}</div>
                      <span style={{ fontSize: 13, color: 'rgba(255,255,255,.75)', fontWeight: 500 }}>{p.text}</span>
                    </div>
                  ))}
                </div>

                <div style={{ height: 1, background: 'rgba(255,255,255,.08)', marginBottom: 20 }} />

                <div style={{ background: 'rgba(255,255,255,.05)', border: '1px solid rgba(255,255,255,.1)', borderRadius: 14, padding: '14px 16px' }}>
                  <p style={{ fontSize: 12.5, color: 'rgba(255,255,255,.7)', lineHeight: 1.55, fontStyle: 'italic', marginBottom: 10 }}>{t.text}</p>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <div style={{ width: 26, height: 26, borderRadius: '50%', background: 'linear-gradient(135deg,#0DA366,#065F46)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 800, color: '#fff' }}>{t.name[0]}</div>
                    <div>
                      <p style={{ fontSize: 11.5, fontWeight: 700, color: '#fff' }}>{t.name}</p>
                      <p style={{ fontSize: 10.5, color: 'rgba(255,255,255,.4)' }}>{t.city}</p>
                    </div>
                    <div style={{ marginLeft: 'auto', display: 'flex', gap: 1 }}>{[...Array(5)].map((_, i) => <span key={i} style={{ color: '#FBBF24', fontSize: 10 }}>★</span>)}</div>
                  </div>
                </div>
              </div>

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
              <button onClick={closeModal} style={{ position: 'absolute', top: 16, right: 16, zIndex: 10, width: 34, height: 34, borderRadius: '50%', background: BG, border: `1px solid ${BD}`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: T2, cursor: 'pointer' }}>
                <X size={15} />
              </button>

              <div style={{ padding: '36px 36px 32px', display: 'flex', flexDirection: 'column', flex: 1, overflowY: 'auto', maxHeight: '88vh' }}>

                {/* Title */}
                <div style={{ marginBottom: 22 }}>
                  <h2 style={{ fontFamily: "'Outfit',sans-serif", fontWeight: 900, color: T1, fontSize: '1.55rem', letterSpacing: '-.04em', marginBottom: 4 }}>
                    {headings[method]}
                  </h2>
                  <p style={{ fontSize: 13.5, color: T2 }}>{subheadings[method]}</p>
                </div>

                {/* ── AUTH METHOD SELECTOR ── */}
                {!success && (
                  <div style={{ display: 'flex', gap: 8, marginBottom: 22 }}>
                    {([
                      { id: 'phone' as AuthMethod, label: 'Phone', icon: <Phone size={14} /> },
                      { id: 'google' as AuthMethod, label: 'Google', icon: <svg width="14" height="14" viewBox="0 0 18 18"><path d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.717v2.258h2.908c1.702-1.567 2.684-3.875 2.684-6.615z" fill="#4285F4"/><path d="M9 18c2.43 0 4.467-.806 5.956-2.184l-2.908-2.258c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 0 0 9 18z" fill="#34A853"/><path d="M3.964 10.707A5.41 5.41 0 0 1 3.682 9c0-.593.102-1.17.282-1.707V4.961H.957A8.996 8.996 0 0 0 0 9c0 1.452.348 2.827.957 4.039l3.007-2.332z" fill="#FBBC05"/><path d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 0 0 .957 4.961L3.964 7.293C4.672 5.166 6.656 3.58 9 3.58z" fill="#EA4335"/></svg> },
                      { id: 'email' as AuthMethod, label: 'Email', icon: <Mail size={14} /> },
                    ]).map(({ id, label, icon }) => (
                      <button key={id} onClick={() => switchMethod(id)}
                        style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, padding: '10px 8px', borderRadius: 10, fontSize: 13, fontWeight: 700, transition: 'all .18s', cursor: 'pointer', border: `1.5px solid ${method === id ? G : BD}`, background: method === id ? `${G}0F` : W, color: method === id ? G : T2 }}>
                        {icon}{label}
                      </button>
                    ))}
                  </div>
                )}

                <AnimatePresence mode="wait">
                  {success ? (
                    <motion.div key="success" initial={{ opacity: 0, scale: .92 }} animate={{ opacity: 1, scale: 1 }} style={{ textAlign: 'center', padding: '28px 0' }}>
                      <div style={{ width: 72, height: 72, borderRadius: '50%', background: 'rgba(13,163,102,.08)', border: '2px solid rgba(13,163,102,.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 18px' }}>
                        <Check size={32} color={G} />
                      </div>
                      <p style={{ fontFamily: "'Outfit',sans-serif", fontWeight: 900, color: T1, fontSize: 20, marginBottom: 6 }}>You're in! 🎉</p>
                      <p style={{ fontSize: 14, color: T2 }}>Welcome to Zyphix</p>
                    </motion.div>

                  ) : method === 'phone' ? (
                    <motion.div key={`phone-${phoneStep}`} initial={{ opacity: 0, x: 12 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -12 }} transition={{ duration: .18 }}>
                      {phoneStep === 'enter' ? (
                        <form onSubmit={sendOtp} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                          <div>
                            <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: T2, marginBottom: 5, letterSpacing: '.02em', textTransform: 'uppercase' }}>Mobile Number</label>
                            <div style={{ display: 'flex', gap: 0, border: `1.5px solid ${errors.phone ? ERR + '80' : BD}`, borderRadius: 10, overflow: 'hidden', background: W, transition: 'all .18s' }}
                              onFocusCapture={e => { (e.currentTarget as HTMLElement).style.borderColor = G; (e.currentTarget as HTMLElement).style.boxShadow = `0 0 0 3px ${G}18`; }}
                              onBlurCapture={e => { (e.currentTarget as HTMLElement).style.borderColor = errors.phone ? ERR + '80' : BD; (e.currentTarget as HTMLElement).style.boxShadow = 'none'; }}>
                              <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '11px 14px', borderRight: `1.5px solid ${BD}`, background: BG, flexShrink: 0 }}>
                                <span style={{ fontSize: 16 }}>🇮🇳</span>
                                <span style={{ fontSize: 14, fontWeight: 700, color: T1 }}>+91</span>
                              </div>
                              <input type="tel" value={phoneNum} onChange={e => setPhoneNum(e.target.value.replace(/[^\d\s\-]/g, ''))}
                                placeholder="98765 43210" maxLength={13}
                                style={{ flex: 1, padding: '11px 14px', border: 'none', outline: 'none', fontSize: 15, fontWeight: 600, color: T1, fontFamily: 'inherit', background: 'transparent', letterSpacing: '.04em' }} />
                            </div>
                            {errors.phone && <p style={{ fontSize: 11.5, color: ERR, marginTop: 5, display: 'flex', alignItems: 'center', gap: 4 }}><AlertCircle size={11} />{errors.phone}</p>}
                          </div>
                          <motion.button type="submit" disabled={loading} whileTap={{ scale: .98 }}
                            style={{ width: '100%', padding: '13px', borderRadius: 12, background: loading ? G + 'BB' : `linear-gradient(135deg, ${G}, ${G2})`, color: '#fff', fontSize: 15, fontWeight: 800, cursor: loading ? 'wait' : 'pointer', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, boxShadow: loading ? 'none' : `0 4px 18px ${G}40` }}>
                            {loading ? <><span style={{ width: 16, height: 16, border: '2px solid rgba(255,255,255,.3)', borderTopColor: '#fff', borderRadius: '50%', display: 'inline-block', animation: 'spin .7s linear infinite' }} />Sending OTP…</> : <>Send OTP <ArrowRight size={15} /></>}
                          </motion.button>
                          <p style={{ fontSize: 12, color: T3, textAlign: 'center', lineHeight: 1.6 }}>
                            By continuing you agree to our <a href="/terms" onClick={closeModal} style={{ color: T2, fontWeight: 600 }}>Terms</a> & <a href="/privacy" onClick={closeModal} style={{ color: T2, fontWeight: 600 }}>Privacy Policy</a>
                          </p>
                        </form>
                      ) : (
                        <form onSubmit={verifyOtp} style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
                          <OtpInput value={otp} onChange={setOtp} error={errors.otp} />
                          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                            <button type="button" onClick={() => { setPhoneStep('enter'); setOtp(['','','','','','']); setErrors({}); }}
                              style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 13, fontWeight: 600, color: T2, border: 'none', background: 'transparent', cursor: 'pointer' }}>
                              <ChevronLeft size={14} /> Change number
                            </button>
                            <span style={{ fontSize: 13, color: T2 }}>
                              {canResend
                                ? <button type="button" onClick={handleResend} style={{ color: G, fontWeight: 700, border: 'none', background: 'transparent', cursor: 'pointer' }}>Resend OTP</button>
                                : <span>Resend in <Countdown key={countdownKey} seconds={30} onDone={() => setCanResend(true)} /></span>
                              }
                            </span>
                          </div>
                          <motion.button type="submit" disabled={loading} whileTap={{ scale: .98 }}
                            style={{ width: '100%', padding: '13px', borderRadius: 12, background: loading ? G + 'BB' : `linear-gradient(135deg, ${G}, ${G2})`, color: '#fff', fontSize: 15, fontWeight: 800, cursor: loading ? 'wait' : 'pointer', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, boxShadow: loading ? 'none' : `0 4px 18px ${G}40` }}>
                            {loading ? <><span style={{ width: 16, height: 16, border: '2px solid rgba(255,255,255,.3)', borderTopColor: '#fff', borderRadius: '50%', display: 'inline-block', animation: 'spin .7s linear infinite' }} />Verifying…</> : <>Verify & Continue <ArrowRight size={15} /></>}
                          </motion.button>
                        </form>
                      )}
                    </motion.div>

                  ) : method === 'google' ? (
                    <motion.div key="google" initial={{ opacity: 0, x: 12 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -12 }} transition={{ duration: .18 }}>
                      <button onClick={handleGoogle} disabled={googleLoading}
                        style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12, padding: '15px', borderRadius: 14, border: `1.5px solid ${BD}`, background: W, fontSize: 15, fontWeight: 700, color: T1, transition: 'all .18s', cursor: googleLoading ? 'wait' : 'pointer', opacity: googleLoading ? .7 : 1, boxShadow: '0 2px 8px rgba(0,0,0,.07)' }}
                        onMouseEnter={e => { if (!googleLoading) { (e.currentTarget as HTMLElement).style.background = BG; (e.currentTarget as HTMLElement).style.borderColor = '#D1D5DB'; } }}
                        onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = W; (e.currentTarget as HTMLElement).style.borderColor = BD; }}>
                        {googleLoading ? <span style={{ width: 20, height: 20, border: '2.5px solid #CBD5E1', borderTopColor: G, borderRadius: '50%', display: 'inline-block', animation: 'spin .7s linear infinite' }} />
                          : <svg width="20" height="20" viewBox="0 0 18 18"><path d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.717v2.258h2.908c1.702-1.567 2.684-3.875 2.684-6.615z" fill="#4285F4"/><path d="M9 18c2.43 0 4.467-.806 5.956-2.184l-2.908-2.258c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 0 0 9 18z" fill="#34A853"/><path d="M3.964 10.707A5.41 5.41 0 0 1 3.682 9c0-.593.102-1.17.282-1.707V4.961H.957A8.996 8.996 0 0 0 0 9c0 1.452.348 2.827.957 4.039l3.007-2.332z" fill="#FBBC05"/><path d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 0 0 .957 4.961L3.964 7.293C4.672 5.166 6.656 3.58 9 3.58z" fill="#EA4335"/></svg>}
                        {googleLoading ? 'Signing you in…' : 'Continue with Google'}
                      </button>
                      <p style={{ fontSize: 12, color: T3, textAlign: 'center', marginTop: 18, lineHeight: 1.6 }}>
                        We'll use your Google profile to create or sign in to your Zyphix account.
                      </p>
                    </motion.div>

                  ) : (
                    <motion.div key={`email-${emailMode}`} initial={{ opacity: 0, x: 12 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -12 }} transition={{ duration: .18 }}>
                      {/* Email sub-tabs */}
                      {emailMode !== 'forgot' && (
                        <div style={{ display: 'flex', background: BG, borderRadius: 12, padding: 4, marginBottom: 20, border: `1px solid ${BD}` }}>
                          {(['signin', 'signup'] as const).map(m => (
                            <button key={m} onClick={() => switchEmail(m)} style={{ flex: 1, padding: '9px', borderRadius: 9, fontSize: 13.5, fontWeight: 700, transition: 'all .18s', background: emailMode === m ? W : 'transparent', color: emailMode === m ? T1 : T3, boxShadow: emailMode === m ? '0 1px 4px rgba(0,0,0,.1)' : 'none', cursor: 'pointer', border: 'none' }}>
                              {m === 'signin' ? 'Sign In' : 'Create Account'}
                            </button>
                          ))}
                        </div>
                      )}

                      {forgotSent ? (
                        <div style={{ textAlign: 'center', padding: '20px 0' }}>
                          <div style={{ width: 56, height: 56, borderRadius: '50%', background: 'rgba(13,163,102,.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 14px' }}>
                            <Mail size={24} color={G} />
                          </div>
                          <p style={{ fontWeight: 800, color: T1, fontSize: 16, marginBottom: 6 }}>Check your inbox</p>
                          <p style={{ fontSize: 13.5, color: T2, marginBottom: 20, lineHeight: 1.6 }}>Reset link sent to <strong>{form.email}</strong></p>
                          <button onClick={() => switchEmail('signin')} style={{ fontSize: 13.5, fontWeight: 700, color: G, cursor: 'pointer', border: 'none', background: 'transparent' }}>← Back to Sign In</button>
                        </div>
                      ) : (
                        <form onSubmit={emailMode === 'forgot' ? handleForgot : handleEmailSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 13 }}>
                          {emailMode === 'signup' && <Field label="Full Name" type="text" value={form.name} onChange={set('name')} icon={<User size={15} />} error={errors.name} placeholder="Rahul Sharma" />}
                          <Field label="Email Address" type="email" value={form.email} onChange={set('email')} icon={<Mail size={15} />} error={errors.email} placeholder="you@example.com" />
                          {emailMode === 'signup' && <Field label="Phone (optional)" type="tel" value={form.phone} onChange={set('phone')} icon={<Phone size={15} />} placeholder="+91 98765 43210" />}
                          {emailMode !== 'forgot' && (
                            <Field label="Password" type={showPw ? 'text' : 'password'} value={form.password} onChange={set('password')} icon={<Lock size={15} />} error={errors.password} placeholder={emailMode === 'signup' ? 'Min 6 characters' : 'Your password'} toggle={{ show: showPw, onToggle: () => setShowPw(p => !p) }} />
                          )}
                          {emailMode === 'signup' && <Field label="Confirm Password" type="password" value={form.confirmPw} onChange={set('confirmPw')} icon={<Lock size={15} />} error={errors.confirmPw} placeholder="Repeat password" />}
                          {emailMode === 'signin' && (
                            <div style={{ textAlign: 'right', marginTop: -6 }}>
                              <button type="button" onClick={() => switchEmail('forgot')} style={{ fontSize: 12.5, fontWeight: 600, color: G, cursor: 'pointer', border: 'none', background: 'transparent' }}>Forgot password?</button>
                            </div>
                          )}
                          <motion.button type="submit" disabled={loading} whileTap={{ scale: .98 }}
                            style={{ width: '100%', padding: '13px', borderRadius: 12, background: loading ? G + 'BB' : `linear-gradient(135deg, ${G}, ${G2})`, color: '#fff', fontSize: 15, fontWeight: 800, marginTop: 4, cursor: loading ? 'wait' : 'pointer', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, boxShadow: loading ? 'none' : `0 4px 18px ${G}40` }}>
                            {loading ? <><span style={{ width: 16, height: 16, border: '2px solid rgba(255,255,255,.3)', borderTopColor: '#fff', borderRadius: '50%', display: 'inline-block', animation: 'spin .7s linear infinite' }} />{emailMode === 'forgot' ? 'Sending…' : emailMode === 'signin' ? 'Signing in…' : 'Creating account…'}</> : <>{emailMode === 'forgot' ? 'Send Reset Link' : emailMode === 'signin' ? 'Sign In' : 'Create Account'} <ArrowRight size={15} /></>}
                          </motion.button>
                          {emailMode === 'forgot' && <button type="button" onClick={() => switchEmail('signin')} style={{ textAlign: 'center', fontSize: 13, color: T2, marginTop: 4, width: '100%', cursor: 'pointer', border: 'none', background: 'transparent' }}>← Back to Sign In</button>}
                          {emailMode === 'signup' && (
                            <p style={{ fontSize: 11, color: T3, textAlign: 'center', lineHeight: 1.6, marginTop: 2 }}>
                              By creating an account you agree to our{' '}
                              <a href="/terms" onClick={closeModal} style={{ color: T2, fontWeight: 600 }}>Terms</a>{' '}and{' '}
                              <a href="/privacy" onClick={closeModal} style={{ color: T2, fontWeight: 600 }}>Privacy Policy</a>.
                            </p>
                          )}
                        </form>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
