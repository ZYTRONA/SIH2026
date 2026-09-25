import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ShieldCheck,
  Compass,
  Ship,
  UserCheck,
  Radio,
  Lock,
  ArrowRight,
  Sparkles,
  Database,
  Satellite,
} from 'lucide-react';

type UserRole = 'ncpor_researcher' | 'vessel_captain' | 'polar_analyst' | 'demo_operator';

interface RoleProfile {
  id: UserRole;
  title: string;
  subtitle: string;
  badge: string;
  defaultEmail: string;
  icon: React.ComponentType<{ className?: string }>;
  accentColor: string;
}

const ROLES: RoleProfile[] = [
  {
    id: 'ncpor_researcher',
    title: 'NCPOR Polar Scientist',
    subtitle: 'National Centre for Polar & Ocean Research, MoES India',
    badge: 'MoES Official',
    defaultEmail: 'scientist.ncpor@moes.gov.in',
    icon: Compass,
    accentColor: '#0066cc',
  },
  {
    id: 'vessel_captain',
    title: 'Shipboard Master / Captain',
    subtitle: 'R/V Polar Sentinel & SA Agulhas II Deck Command',
    badge: 'IMO Master',
    defaultEmail: 'captain.agulhas@polar-command.org',
    icon: Ship,
    accentColor: '#0284c7',
  },
  {
    id: 'polar_analyst',
    title: 'Cryosphere & SAR Analyst',
    subtitle: 'Copernicus Sentinel-1 & ECMWF ERA5 Analysis Unit',
    badge: 'Level 3 SAR Clearance',
    defaultEmail: 'analyst.sar@polaris-cryo.int',
    icon: Satellite,
    accentColor: '#10b981',
  },
  {
    id: 'demo_operator',
    title: 'Evaluation & Demo Mode',
    subtitle: 'Fast One-Click Evaluation Deck for SIH & NCPOR Jury',
    badge: 'Instant Access',
    defaultEmail: 'evaluator.jury@sih2026.gov.in',
    icon: Sparkles,
    accentColor: '#d97706',
  },
];

export const LoginPage: React.FC = () => {
  const navigate = useNavigate();

  const [selectedRole, setSelectedRole] = useState<UserRole>('ncpor_researcher');
  const [email, setEmail] = useState('scientist.ncpor@moes.gov.in');
  const [password, setPassword] = useState('••••••••••••');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSelectRole = (role: RoleProfile) => {
    setSelectedRole(role.id);
    setEmail(role.defaultEmail);
    setPassword('••••••••••••');
    setError(null);
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    setTimeout(() => {
      setIsLoading(false);
      sessionStorage.setItem(
        'polaris_jwt_token',
        `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.${btoa(
          JSON.stringify({
            role: selectedRole,
            user: email,
            iss: 'POLARIS-AI-NCPOR',
            exp: Date.now() + 86400000,
          })
        )}.verified_signature`
      );
      sessionStorage.setItem('polaris_user_role', selectedRole);
      navigate('/dashboard');
    }, 450);
  };

  return (
    <div className="relative min-h-screen w-full bg-[#0a1120] text-white flex items-center justify-center p-4 sm:p-6 overflow-hidden select-none font-sans">
      {/* Background Animated Polar Grid & Rotating Antarctic Earth Projection Canvas */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <radialGradient id="polarGlow" cx="50%" cy="50%" r="60%">
              <stop offset="0%" stopColor="#0066cc" stopOpacity="0.4" />
              <stop offset="50%" stopColor="#0284c7" stopOpacity="0.1" />
              <stop offset="100%" stopColor="#0a1120" stopOpacity="0" />
            </radialGradient>
          </defs>
          <rect width="100%" height="100%" fill="url(#polarGlow)" />
        </svg>
      </div>

      {/* Subtle Rotating Antarctic Latitude Coordinates Rings */}
      <div className="absolute w-[600px] sm:w-[900px] h-[600px] sm:h-[900px] rounded-full border border-sky-500/10 animate-[spin_120s_linear_infinite] pointer-events-none" />
      <div className="absolute w-[450px] sm:w-[700px] h-[450px] sm:h-[700px] rounded-full border border-dashed border-sky-400/15 animate-[spin_90s_linear_infinite_reverse] pointer-events-none" />
      <div className="absolute w-[300px] sm:w-[500px] h-[300px] sm:h-[500px] rounded-full border border-sky-300/10 pointer-events-none" />

      {/* Main Login Card Container */}
      <div className="relative z-10 w-full max-w-5xl grid grid-cols-1 lg:grid-cols-12 gap-6 bg-[#0f172a]/95 border border-white/10 rounded-2xl p-6 sm:p-8 shadow-2xl backdrop-blur-md">
        {/* Left Column: Mission Overview & Role Selector (7 Cols) */}
        <div className="lg:col-span-7 flex flex-col justify-between space-y-6">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-400/20 text-blue-400 text-xs font-mono">
              <Radio className="w-3.5 h-3.5 animate-pulse text-blue-400" />
              <span>IMO POLARIS STANDARD DECISION PLATFORM</span>
            </div>

            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-white flex items-center gap-3">
              <span className="bg-gradient-to-r from-blue-400 via-sky-200 to-indigo-300 bg-clip-text text-transparent">
                POLARIS Platform
              </span>
            </h1>

            <p className="text-sm text-slate-300 leading-relaxed">
              Polar Adaptive Route Intelligence System — Multi-Sensor SAR Iceberg Tracking, ResUNet Sea-Ice Forecasting, and NSGA-II Hybrid Path Optimization for High-Latitude Antarctic Expeditions.
            </p>
          </div>

          {/* Quick Role Selection Grid */}
          <div className="space-y-3">
            <div className="flex items-center justify-between text-xs text-slate-400 font-mono">
              <span>SELECT OPERATIONAL CREDENTIALS</span>
              <span>4 PROFILES CONFIGURED</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {ROLES.map((role) => {
                const Icon = role.icon;
                const isSelected = selectedRole === role.id;
                return (
                  <button
                    key={role.id}
                    type="button"
                    onClick={() => handleSelectRole(role)}
                    className={`p-3.5 rounded-xl border text-left transition-all duration-200 cursor-pointer flex flex-col justify-between gap-2 ${
                      isSelected
                        ? 'bg-blue-600/20 border-blue-500 ring-1 ring-blue-500'
                        : 'bg-slate-800/60 border-slate-700/80 hover:bg-slate-800 hover:border-slate-600'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="p-2 rounded-lg bg-slate-900/80 border border-white/5 text-blue-400">
                        <Icon className="w-4 h-4" />
                      </div>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-slate-900 border border-slate-700 text-slate-300">
                        {role.badge}
                      </span>
                    </div>
                    <div>
                      <div className="text-xs font-semibold text-white">{role.title}</div>
                      <div className="text-[11px] text-slate-400 line-clamp-1">{role.subtitle}</div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Scientific Compliance Indicators */}
          <div className="pt-2 border-t border-slate-800/80 flex flex-wrap items-center gap-4 text-xs text-slate-400">
            <div className="flex items-center gap-1.5 text-emerald-400">
              <ShieldCheck className="w-4 h-4" />
              <span>NCPOR Bharati & Maitri Station Direct Feed</span>
            </div>
            <div className="flex items-center gap-1.5 text-sky-400">
              <Database className="w-4 h-4" />
              <span>Offline Edge CryoDB Ready</span>
            </div>
          </div>
        </div>

        {/* Right Column: Authentication Form (5 Cols) */}
        <div className="lg:col-span-5 bg-slate-900/80 border border-slate-800 rounded-xl p-6 flex flex-col justify-between">
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-1">
              <div className="text-xs font-mono text-blue-400 uppercase tracking-wider">
                Operator Sign In
              </div>
              <h2 className="text-lg font-semibold text-white">Access Vessel Control</h2>
              <p className="text-xs text-slate-400">
                JWT cryptographic token generated on authentication.
              </p>
            </div>

            <div className="space-y-3">
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  Officer / Operator ID
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-xs text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all font-mono"
                  />
                  <UserCheck className="w-4 h-4 text-slate-500 absolute right-3 top-2.5" />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  Cryptographic Access Key
                </label>
                <div className="relative">
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-xs text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all font-mono"
                  />
                  <Lock className="w-4 h-4 text-slate-500 absolute right-3 top-2.5" />
                </div>
              </div>
            </div>

            {error && (
              <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 text-xs">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-2.5 px-4 rounded-lg bg-blue-600 hover:bg-blue-500 active:scale-[0.98] text-white font-medium text-xs flex items-center justify-center gap-2 transition-all shadow-lg shadow-blue-600/30 cursor-pointer disabled:opacity-50"
            >
              {isLoading ? (
                <>
                  <div className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Authenticating Officer...</span>
                </>
              ) : (
                <>
                  <span>Launch Polar Operations Deck</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Quick Demo Bypass */}
          <div className="pt-4 mt-4 border-t border-slate-800 text-center">
            <button
              type="button"
              onClick={() => {
                sessionStorage.setItem('polaris_jwt_token', 'demo_token_sih2026');
                sessionStorage.setItem('polaris_user_role', 'demo_operator');
                navigate('/dashboard');
              }}
              className="text-xs text-blue-400 hover:text-blue-300 underline font-mono cursor-pointer"
            >
              🚀 Instant Evaluation Bypass (Skip to Mission Control)
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
