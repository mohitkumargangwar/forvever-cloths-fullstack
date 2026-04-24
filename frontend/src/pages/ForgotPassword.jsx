import { useEffect, useMemo, useRef, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router';
import { HiOutlineMail, HiOutlineLockClosed, HiOutlineArrowLeft } from 'react-icons/hi'; // Icons add kiye hain

const OTP_LENGTH = 6;

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [step, setStep] = useState(1);
  const [otpDigits, setOtpDigits] = useState(Array(OTP_LENGTH).fill(''));
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const otpRefs = useRef([]);

  const otpValue = useMemo(() => otpDigits.join(''), [otpDigits]);

  useEffect(() => {
    if (step === 2) {
      const firstEmptyIndex = otpDigits.findIndex((digit) => !digit);
      const targetIndex = firstEmptyIndex === -1 ? OTP_LENGTH - 1 : firstEmptyIndex;
      otpRefs.current[targetIndex]?.focus();
    }
  }, [step, otpDigits]);

  const api = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_URL,
  });

  const handleSendOtp = async (e) => {
    e.preventDefault();
    setLoading(true); setError(''); setMessage('');
    try {
      await api.post('/api/user/forgot-password', { email });
      setStep(2);
      setMessage('OTP sent! Check your inbox.');
    } catch (err) {
      setError(err.response?.data?.message || 'Error sending OTP');
    } finally { setLoading(false); }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    setLoading(true); setError(''); setMessage('');
    try {
      await api.post('/api/user/verify-otp', { email, otp: otpValue });
      setStep(3);
      setMessage('Verified! Now set your new password.');
    } catch (err) {
      setError(err.response?.data?.message || 'Invalid OTP');
    } finally { setLoading(false); }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setLoading(true); setError(''); setMessage('');
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      setLoading(false); return;
    }
    try {
      await api.post('/api/user/reset-password', { email, password });
      setMessage('Success! Redirecting to login...');
      setTimeout(() => navigate('/login'), 2000);
    } catch (err) {
      setError(err.response?.data?.message || 'Error resetting password');
    } finally { setLoading(false); }
  };

  const updateOtpDigit = (index, value) => {
    const next = [...otpDigits];
    next[index] = value;
    setOtpDigits(next);
  };

  const handleOtpChange = (index, value) => {
    const cleanValue = value.replace(/\D/g, '');
    if (!cleanValue) { updateOtpDigit(index, ''); return; }
    const next = [...otpDigits];
    const chars = cleanValue.split('');
    let cursor = index;
    chars.forEach((char) => {
      if (cursor < OTP_LENGTH) { next[cursor] = char; cursor += 1; }
    });
    setOtpDigits(next);
    const nextFocusIndex = Math.min(index + chars.length, OTP_LENGTH - 1);
    otpRefs.current[nextFocusIndex]?.focus();
  };

  const handleOtpKeyDown = (index, event) => {
    if (event.key === 'Backspace') {
      event.preventDefault();
      if (otpDigits[index]) { updateOtpDigit(index, ''); return; }
      if (index > 0) {
        otpRefs.current[index - 1]?.focus();
        updateOtpDigit(index - 1, '');
      }
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4 sm:p-6 lg:p-8 font-sans">
      {/* Background Ornaments */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-[#ea2e0e]/5 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-[#02042a]/5 rounded-full blur-3xl"></div>
      </div>

      <div className="relative w-full max-w-5xl bg-white rounded-3xl shadow-2xl shadow-slate-200 overflow-hidden flex flex-col md:flex-row min-h-[600px]">
        
        {/* Left Side: Branding/Illustration */}
        <div className="md:w-5/12 bg-[#02042a] p-8 lg:p-12 text-white flex flex-col justify-between relative overflow-hidden">
            <div className="z-10">
                <h1 className="text-3xl font-bold mb-4">Forever Cloths</h1>
                <p className="text-slate-400 text-sm leading-relaxed">
                   Secure your account with our advanced two-step verification process.
                </p>
            </div>
            
            <div className="z-10 mt-12 md:mt-0">
                <div className="space-y-6">
                    <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-[#ea2e0e]">1</div>
                        <p className="text-sm">Enter your registered email address.</p>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-[#ea2e0e]">2</div>
                        <p className="text-sm">Verify with a 6-digit secure code.</p>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-[#ea2e0e]">3</div>
                        <p className="text-sm">Create a new strong password.</p>
                    </div>
                </div>
            </div>

            {/* Abstract Shape */}
            <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-[#ea2e0e] rounded-full opacity-20 blur-2xl"></div>
        </div>

        {/* Right Side: Form */}
        <div className="md:w-7/12 p-8 lg:p-16 flex flex-col justify-center">
          <div className="max-w-md mx-auto w-full">
            
            {/* Header */}
            <div className="mb-10 text-center md:text-left">
              <h2 className="text-3xl font-bold text-[#02042a] mb-2">
                {step === 1 && "Reset Password"}
                {step === 2 && "Verification"}
                {step === 3 && "Set New Password"}
              </h2>
              <p className="text-slate-500 text-sm">
                {step === 1 && "No worries! Enter your email to get back in."}
                {step === 2 && `We've sent a code to your email ${email}`}
                {step === 3 && "Make sure your new password is strong."}
              </p>
            </div>

            {/* Notifications */}
            {message && <div className="mb-6 p-4 bg-emerald-50 text-emerald-700 rounded-xl text-sm border border-emerald-100 animate-pulse">{message}</div>}
            {error && <div className="mb-6 p-4 bg-red-50 text-red-700 rounded-xl text-sm border border-red-100">{error}</div>}

            {/* Step 1: Email */}
            {step === 1 && (
              <form onSubmit={handleSendOtp} className="space-y-6">
                <div className="relative">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 block">Email Address</label>
                  <div className="relative">
                    <HiOutlineMail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-xl" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#ea2e0e] focus:border-transparent outline-none transition-all"
                      placeholder="name@example.com"
                      required
                    />
                  </div>
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-[#02042a] text-white py-4 rounded-xl font-bold hover:bg-[#ea2e0e] transition-all transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50"
                >
                  {loading ? "Processing..." : "Send Reset Code"}
                </button>
              </form>
            )}

            {/* Step 2: OTP */}
            {step === 2 && (
              <form onSubmit={handleVerifyOtp} className="space-y-8">
                <div className="flex justify-between gap-2">
                  {otpDigits.map((digit, index) => (
                    <input
                      key={index}
                      ref={(el) => (otpRefs.current[index] = el)}
                      type="text"
                      inputMode="numeric"
                      maxLength={1}
                      value={digit}
                      onChange={(e) => handleOtpChange(index, e.target.value)}
                      onKeyDown={(e) => handleOtpKeyDown(index, e)}
                      className="w-12 h-14 sm:w-14 sm:h-16 text-center text-2xl font-bold bg-slate-50 border-2 border-slate-200 rounded-xl focus:border-[#ea2e0e] focus:bg-white outline-none transition-all"
                    />
                  ))}
                </div>
                <div className="flex flex-col gap-4">
                    <button
                        type="submit"
                        disabled={loading || otpValue.length !== OTP_LENGTH}
                        className="w-full bg-[#02042a] text-white py-4 rounded-xl font-bold hover:bg-[#ea2e0e] transition-all disabled:opacity-50"
                    >
                        {loading ? "Verifying..." : "Verify OTP"}
                    </button>
                    <button 
                        type="button" 
                        onClick={() => setStep(1)}
                        className="text-slate-400 text-sm font-medium flex items-center justify-center gap-2 hover:text-[#02042a]"
                    >
                        <HiOutlineArrowLeft /> Change Email
                    </button>
                </div>
              </form>
            )}

            {/* Step 3: New Password */}
            {step === 3 && (
              <form onSubmit={handleResetPassword} className="space-y-6">
                <div className="space-y-4">
                  <div className="relative">
                    <HiOutlineLockClosed className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-xl" />
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="New Password"
                      className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#ea2e0e] outline-none"
                      required
                    />
                  </div>
                  <div className="relative">
                    <HiOutlineLockClosed className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-xl" />
                    <input
                      type="password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="Confirm New Password"
                      className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#ea2e0e] outline-none"
                      required
                    />
                  </div>
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-[#ea2e0e] text-white py-4 rounded-xl font-bold hover:bg-[#02042a] transition-all transform hover:scale-[1.02]"
                >
                  {loading ? "Updating..." : "Reset Password"}
                </button>
              </form>
            )}

            {/* Footer */}
            <div className="mt-12 text-center text-sm text-slate-400">
               Remember your password? <button onClick={() => navigate('/login')} className="text-[#ea2e0e] font-bold hover:underline">Log In</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;