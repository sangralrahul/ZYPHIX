import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Mail, Lock, User, Phone, Eye, EyeOff, Check, AlertCircle, Zap } from 'lucide-react';
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

function Field({ label, type, value, onChange, icon, error, placeholder, toggle }: {
  label: string; type: string; value: string; onChange: (v: string) => void;
  icon: React.ReactNode; error?: string; placeholder: string;
  toggle?: { show: boolean; onToggle: () => void };
}) {
  return (
    <div>
      <label style={{ display: 'block', fontSize: 12.5, fontWeight: 600, color: T2, marginBottom: 6, letterSpacing: '.01em' }}>{label}</label>
      <div style={{ position: 'relative' }}>
        <div style={{ position: 'absolute', left: 13, top: '50%', transform: 'translateY(-50%)', color: error ? ERR : T3 }}>{icon}</div>
        <input
          type={type}
          value={value}
          onChange={e => onChange(e.target.value)}
          placeholder={placeholder}
          style={{
            width: '100%', paddingLeft: 42, paddingRight: toggle ? 42 : 14,
            paddingTop: 12, paddingBottom: 12, borderRadius: 11,
            border: `1.5px solid ${error ? ERR + '80' : BD}`,
            background: error ? '#FFF5F5' : BG, fontSize: 14, color: T1,
            fontFamily: 'inherit', outline: 'none', transition: 'all .18s',
            boxShadow: error ? `0 0 0 3px ${ERR}10` : 'none',
          }}
          onFocus={e => { e.target.style.borderColor = error ? ERR : G + '80'; e.target.style.boxShadow = `0 0 0 3px ${error ? ERR : G}12`; }}
          onBlur={e => { e.target.style.borderColor = error ? ERR + '80' : BD; e.target.style.boxShadow = error ? `0 0 0 3px ${ERR}10` : 'none'; }}
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

  const set = (k: string) => (v: string) => setForm(f => ({ ...f, [k]: v }));

  const validate = () => {
    const e: Record<string, string> = {};
    if (mode === 'signup' && !form.name.trim()) e.name = 'Name is required';
    if (!form.email.trim()) e.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Enter a valid email address';
    if (!form.password) e.password = 'Password is required';
    else if (form.password.length < 6) e.password = 'Must be at least 6 characters';
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

  return (
    <AnimatePresence>
      {showModal && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          style={{ position: 'fixed', inset: 0, zIndex: 200, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 16, background: 'rgba(17,24,39,.55)', backdropFilter: 'blur(6px)' }}
          onClick={e => e.target === e.currentTarget && closeModal()}>
          <motion.div initial={{ opacity: 0, scale: .94, y: 24 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: .94, y: 24 }} transition={{ type: 'spring', damping: 28, stiffness: 380 }}
            style={{ background: W, borderRadius: 24, width: '100%', maxWidth: 440, overflow: 'hidden', boxShadow: '0 24px 80px rgba(0,0,0,.22)', position: 'relative' }}>

            {/* Header gradient */}
            <div style={{ background: `linear-gradient(135deg, #064E3B, #065F46, #0A8C58)`, padding: '32px 32px 28px', position: 'relative' }}>
              <button onClick={closeModal} style={{ position: 'absolute', top: 16, right: 16, width: 32, height: 32, borderRadius: '50%', background: 'rgba(255,255,255,.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff' }}>
                <X size={15} />
              </button>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
                <div style={{ width: 34, height: 34, borderRadius: 9, background: 'rgba(255,255,255,.18)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Zap size={17} color="#fff" fill="#fff" />
                </div>
                <span style={{ fontFamily: "'Outfit',sans-serif", fontWeight: 900, fontSize: '1.2rem', letterSpacing: '-.04em', color: '#fff' }}>
                  Zyp<span style={{ color: '#6EE7B7' }}>hix</span>
                </span>
              </div>
              <h2 style={{ fontFamily: "'Outfit',sans-serif", fontWeight: 900, color: '#fff', fontSize: '1.55rem', letterSpacing: '-.03em', marginBottom: 4 }}>
                {mode === 'forgot' ? 'Reset password' : mode === 'signin' ? 'Welcome back!' : 'Create your account'}
              </h2>
              <p style={{ fontSize: 13.5, color: 'rgba(255,255,255,.6)' }}>
                {mode === 'forgot' ? "We'll send a reset link to your email" : mode === 'signin' ? 'Sign in to track orders and get exclusive deals' : 'Join 5 lakh+ happy customers across India'}
              </p>
            </div>

            <div style={{ padding: '26px 32px 32px' }}>
              {/* Mode tabs */}
              {mode !== 'forgot' && (
                <div style={{ display: 'flex', background: BG, borderRadius: 12, padding: 4, marginBottom: 22, border: `1px solid ${BD}` }}>
                  {(['signin', 'signup'] as const).map(m => (
                    <button key={m} onClick={() => reset(m)} style={{ flex: 1, padding: '9px', borderRadius: 9, fontSize: 13.5, fontWeight: 700, transition: 'all .18s', background: mode === m ? W : 'transparent', color: mode === m ? T1 : T3, boxShadow: mode === m ? '0 1px 4px rgba(0,0,0,.1)' : 'none' }}>
                      {m === 'signin' ? 'Sign In' : 'Create Account'}
                    </button>
                  ))}
                </div>
              )}

              {success ? (
                <motion.div initial={{ opacity: 0, scale: .9 }} animate={{ opacity: 1, scale: 1 }} style={{ textAlign: 'center', padding: '20px 0' }}>
                  <div style={{ width: 64, height: 64, borderRadius: '50%', background: 'rgba(13,163,102,.1)', border: '2px solid rgba(13,163,102,.25)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
                    <Check size={28} color={G} />
                  </div>
                  <p style={{ fontWeight: 800, color: T1, fontSize: 17, marginBottom: 5 }}>You're signed in!</p>
                  <p style={{ fontSize: 13.5, color: T2 }}>Welcome to Zyphix 🎉</p>
                </motion.div>
              ) : forgotSent ? (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ textAlign: 'center', padding: '16px 0' }}>
                  <div style={{ width: 56, height: 56, borderRadius: '50%', background: 'rgba(13,163,102,.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 14px' }}>
                    <Mail size={24} color={G} />
                  </div>
                  <p style={{ fontWeight: 800, color: T1, fontSize: 16, marginBottom: 6 }}>Check your inbox</p>
                  <p style={{ fontSize: 13, color: T2, marginBottom: 20 }}>We've sent a reset link to <strong>{form.email}</strong></p>
                  <button onClick={() => reset('signin')} style={{ fontSize: 13.5, fontWeight: 700, color: G }}>← Back to Sign In</button>
                </motion.div>
              ) : (
                <>
                  {/* Google button */}
                  {mode !== 'forgot' && (
                    <button onClick={handleGoogle} disabled={googleLoading}
                      style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10, padding: '12px', borderRadius: 12, border: `1.5px solid ${BD}`, background: W, fontSize: 14, fontWeight: 600, color: T1, marginBottom: 18, transition: 'all .18s', cursor: googleLoading ? 'wait' : 'pointer', opacity: googleLoading ? .7 : 1 }}
                      onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = BG}
                      onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = W}>
                      {googleLoading ? (
                        <span style={{ width: 18, height: 18, border: '2px solid #CBD5E1', borderTopColor: G, borderRadius: '50%', display: 'inline-block', animation: 'spin .7s linear infinite' }} />
                      ) : (
                        <svg width="18" height="18" viewBox="0 0 18 18"><path d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.717v2.258h2.908c1.702-1.567 2.684-3.875 2.684-6.615z" fill="#4285F4"/><path d="M9 18c2.43 0 4.467-.806 5.956-2.184l-2.908-2.258c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 0 0 9 18z" fill="#34A853"/><path d="M3.964 10.707A5.41 5.41 0 0 1 3.682 9c0-.593.102-1.17.282-1.707V4.961H.957A8.996 8.996 0 0 0 0 9c0 1.452.348 2.827.957 4.039l3.007-2.332z" fill="#FBBC05"/><path d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 0 0 .957 4.961L3.964 7.293C4.672 5.166 6.656 3.58 9 3.58z" fill="#EA4335"/></svg>
                      )}
                      {googleLoading ? 'Signing you in…' : 'Continue with Google'}
                    </button>
                  )}

                  {mode !== 'forgot' && (
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 18 }}>
                      <div style={{ flex: 1, height: 1, background: BD }} />
                      <span style={{ fontSize: 12, color: T3, fontWeight: 500 }}>or with email</span>
                      <div style={{ flex: 1, height: 1, background: BD }} />
                    </div>
                  )}

                  <form onSubmit={mode === 'forgot' ? handleForgot : handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                    {mode === 'signup' && (
                      <Field label="Full Name" type="text" value={form.name} onChange={set('name')} icon={<User size={15} />} error={errors.name} placeholder="Rahul Sharma" />
                    )}
                    <Field label="Email Address" type="email" value={form.email} onChange={set('email')} icon={<Mail size={15} />} error={errors.email} placeholder="you@example.com" />
                    {mode === 'signup' && (
                      <Field label="Phone (optional)" type="tel" value={form.phone} onChange={set('phone')} icon={<Phone size={15} />} placeholder="+91 98765 43210" />
                    )}
                    {mode !== 'forgot' && (
                      <Field label="Password" type={showPw ? 'text' : 'password'} value={form.password} onChange={set('password')} icon={<Lock size={15} />} error={errors.password} placeholder={mode === 'signup' ? 'At least 6 characters' : 'Your password'}
                        toggle={{ show: showPw, onToggle: () => setShowPw(p => !p) }} />
                    )}
                    {mode === 'signup' && (
                      <Field label="Confirm Password" type="password" value={form.confirmPw} onChange={set('confirmPw')} icon={<Lock size={15} />} error={errors.confirmPw} placeholder="Repeat password" />
                    )}

                    {mode === 'signin' && (
                      <div style={{ textAlign: 'right', marginTop: -8 }}>
                        <button type="button" onClick={() => reset('forgot')} style={{ fontSize: 12.5, fontWeight: 600, color: G }}>Forgot password?</button>
                      </div>
                    )}

                    <button type="submit" disabled={loading}
                      style={{ width: '100%', padding: '13px', borderRadius: 12, background: loading ? G + 'AA' : G, color: '#fff', fontSize: 15, fontWeight: 800, marginTop: 4, cursor: loading ? 'wait' : 'pointer', transition: 'background .15s', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}
                      onMouseEnter={e => { if (!loading) (e.currentTarget as HTMLElement).style.background = G2; }}
                      onMouseLeave={e => { if (!loading) (e.currentTarget as HTMLElement).style.background = G; }}>
                      {loading ? (
                        <><span style={{ width: 16, height: 16, border: '2px solid rgba(255,255,255,.3)', borderTopColor: '#fff', borderRadius: '50%', display: 'inline-block', animation: 'spin .7s linear infinite' }} />
                          {mode === 'forgot' ? 'Sending…' : mode === 'signin' ? 'Signing in…' : 'Creating account…'}
                        </>
                      ) : mode === 'forgot' ? 'Send Reset Link' : mode === 'signin' ? 'Sign In →' : 'Create Account →'}
                    </button>

                    {mode === 'forgot' && (
                      <button type="button" onClick={() => reset('signin')} style={{ textAlign: 'center', fontSize: 13, color: T2, marginTop: 4, width: '100%' }}>← Back to Sign In</button>
                    )}

                    {mode === 'signup' && (
                      <p style={{ fontSize: 11, color: T3, textAlign: 'center', lineHeight: 1.6 }}>
                        By creating an account you agree to our{' '}
                        <a href="/terms" onClick={closeModal} style={{ color: T2, fontWeight: 600 }}>Terms of Service</a>{' '}and{' '}
                        <a href="/privacy" onClick={closeModal} style={{ color: T2, fontWeight: 600 }}>Privacy Policy</a>.
                      </p>
                    )}
                  </form>
                </>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
