import React, { useState } from 'react';
import { ArcticMap } from '@/components/map/ArcticMap';
import {
  RefreshCw,
  Snowflake,
  Wind,
  ChevronDown,
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  Clock,
  Info,
  Layers,
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, Tooltip } from 'recharts';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

// --- Data ---
const forecastSteps = [
  { label: '0h', sublabel: 'Nowcast', time: '14:00 UTC, May 24', active: true },
  { label: '24h', sublabel: '+24h Drift', time: 'May 25, 14:00 UTC', active: false },
  { label: '48h', sublabel: '+48h Model', time: 'May 26, 14:00 UTC', active: false },
  { label: '72h', sublabel: '+72h Long', time: 'May 27, 14:00 UTC', active: false },
];

const trendData = [
  { time: '0h', value: 82.4 },
  { time: '24h', value: 81.8 },
  { time: '48h', value: 81.2 },
  { time: '72h', value: 80.6 },
];

const concentrationLegend = [
  { label: 'Low', color: '#c8dcf0', pct: '0%' },
  { color: '#8cc8e6', pct: '20%' },
  { color: '#64c8dc', pct: '40%' },
  { color: '#80d2b4', pct: '60%' },
  { color: '#e6be50', pct: '80%' },
  { label: 'High', color: '#dc4628', pct: '' },
];

// --- Left Panel: Forecast Timeline ---
function ForecastTimeline() {
  const [selected, setSelected] = useState(0);
  return (
    <div className="apple-card p-5 space-y-4">
      <div className="flex items-center justify-between pb-2 border-b border-[#f0f0f0]">
        <div className="flex items-center gap-2">
          <Clock className="w-4 h-4 text-[#1d1d1f]" />
          <span className="text-[14px] font-semibold text-[#1d1d1f]">
            Forecast Timeline
          </span>
        </div>
        <button className="h-7 w-7 rounded-full flex items-center justify-center hover:bg-[#f5f5f7] transition-colors border border-[#e0e0e0] active:scale-95">
          <RefreshCw className="w-3.5 h-3.5 text-neutral-500" />
        </button>
      </div>
      <div className="relative">
        <div className="absolute left-[11px] top-2 bottom-2 w-0.5 bg-[#e0e0e0]" />
        <div className="space-y-1.5">
          {forecastSteps.map((step, i) => (
            <button
              key={i}
              onClick={() => setSelected(i)}
              className={`relative flex items-start gap-3 w-full p-2.5 rounded-[12px] transition-all text-left active:scale-95 ${
                selected === i ? 'bg-[#0066cc]/5 border border-[#0066cc]' : 'hover:bg-[#f5f5f7]'
              }`}
            >
              <div className={`relative z-10 flex items-center justify-center w-5 h-5 rounded-full shrink-0 mt-0.5 ${
                selected === i
                  ? 'bg-[#0066cc] text-white'
                  : 'bg-white border border-[#e0e0e0] text-neutral-400'
              }`}>
                {selected === i && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className={`text-[13px] font-semibold font-mono ${selected === i ? 'text-[#0066cc]' : 'text-[#1d1d1f]'}`}>
                    {step.label}
                  </span>
                  {step.sublabel && (
                    <span className="text-[11px] text-neutral-400 font-normal">{step.sublabel}</span>
                  )}
                </div>
                <p className="text-[11px] text-neutral-500 font-mono mt-0.5">{step.time}</p>
              </div>
            </button>
          ))}
        </div>
      </div>
      <div className="pt-2 border-t border-[#f0f0f0] flex items-center gap-1.5 text-[11px] text-neutral-400">
        <Info className="w-3 h-3 text-neutral-400" />
        <span>Initialized: 14:00 UTC</span>
      </div>
    </div>
  );
}

// --- Left Panel: Model Layers ---
function ModelLayers() {
  const [iceThickness, setIceThickness] = useState(2.5);
  const [iceDrift, setIceDrift] = useState(20);

  return (
    <div className="apple-card p-5 space-y-4">
      <div className="flex items-center gap-2 pb-2 border-b border-[#f0f0f0]">
        <Layers className="w-4 h-4 text-[#1d1d1f]" />
        <span className="text-[14px] font-semibold text-[#1d1d1f]">
          Model Layers
        </span>
      </div>
      <div className="space-y-4">
        {/* Ice Thickness */}
        <div className="p-3.5 rounded-[14px] bg-[#f5f5f7] border border-[#e0e0e0]">
          <div className="flex items-center gap-2 mb-2">
            <Snowflake className="w-4 h-4 text-[#0066cc]" />
            <div>
              <p className="text-[13px] font-semibold text-[#1d1d1f]">Ice Thickness</p>
              <p className="text-[10px] text-neutral-500 font-mono">GIOMAS + AI Correction</p>
            </div>
          </div>
          <input
            type="range"
            min={0}
            max={5}
            step={0.1}
            value={iceThickness}
            onChange={(e) => setIceThickness(Number(e.target.value))}
            className="w-full h-1.5 bg-[#e0e0e0] rounded-full appearance-none cursor-pointer accent-[#0066cc]"
          />
          <div className="flex justify-between mt-1 text-[11px] font-mono text-[#1d1d1f]">
            <span>0 m</span>
            <span className="text-[#0066cc] font-semibold">{iceThickness} m</span>
            <span>5 m</span>
          </div>
        </div>

        {/* Ice Drift */}
        <div className="p-3.5 rounded-[14px] bg-[#f5f5f7] border border-[#e0e0e0]">
          <div className="flex items-center gap-2 mb-2">
            <Wind className="w-4 h-4 text-emerald-600" />
            <div>
              <p className="text-[13px] font-semibold text-[#1d1d1f]">Ice Drift</p>
              <p className="text-[10px] text-neutral-500 font-mono">NSIDC Hydrodynamics</p>
            </div>
          </div>
          <input
            type="range"
            min={0}
            max={40}
            step={1}
            value={iceDrift}
            onChange={(e) => setIceDrift(Number(e.target.value))}
            className="w-full h-1.5 bg-[#e0e0e0] rounded-full appearance-none cursor-pointer accent-[#0066cc]"
          />
          <div className="flex justify-between mt-1 text-[11px] font-mono text-[#1d1d1f]">
            <span>0 cm/s</span>
            <span className="text-[#0066cc] font-semibold">{iceDrift} cm/s</span>
            <span>40 cm/s</span>
          </div>
        </div>
      </div>
    </div>
  );
}

// --- Map with Legend Overlay ---
function MapSection() {
  const [layerType, setLayerType] = useState('Concentration');
  return (
    <div className="apple-card p-0 overflow-hidden flex flex-col h-full">
      {/* Map Header */}
      <div className="flex items-center justify-between px-5 py-3.5 border-b border-[#e0e0e0] bg-white">
        <div className="flex items-center gap-2.5">
          <div className="h-8 w-8 rounded-full bg-[#f5f5f7] flex items-center justify-center text-[#0066cc] border border-[#e0e0e0]">
            <Snowflake className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-[15px] font-semibold text-[#1d1d1f] leading-tight">
              Sea-Ice Concentration Forecast
            </h2>
            <p className="text-[11px] text-neutral-500">AI Forecast &bull; Sentinel-1 SAR + Hydrodynamics</p>
          </div>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="flex items-center gap-1.5 h-8 px-3.5 rounded-full bg-[#f5f5f7] border border-[#e0e0e0] text-[13px] text-[#1d1d1f] hover:bg-white transition-colors active:scale-95">
              <span>{layerType}</span>
              <ChevronDown className="w-3 h-3 text-neutral-400" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-40 bg-white border border-[#e0e0e0] shadow-xl rounded-[14px] p-1.5">
            {['Concentration', 'Thickness', 'Drift'].map((t) => (
              <DropdownMenuItem key={t} onClick={() => setLayerType(t)} className="text-[13px] rounded-[8px] px-3 py-1.5 cursor-pointer">
                {t}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      {/* Map */}
      <div className="relative flex-1" style={{ minHeight: '520px' }}>
        <ArcticMap className="absolute inset-0" />
        {/* Legend Overlay */}
        <div className="absolute bottom-4 right-4 bg-white/95 backdrop-blur-md rounded-[16px] border border-[#e0e0e0] p-3.5 z-[1000]">
          <p className="text-[11px] font-semibold text-[#1d1d1f] mb-0.5">Sea-Ice Concentration</p>
          <p className="text-[10px] text-neutral-500 mb-2 font-mono">(Valid at T+0h)</p>
          <div className="flex items-end gap-1">
            {concentrationLegend.map((item, i) => (
              <div key={i} className="flex flex-col items-center">
                {item.label && <span className="text-[8px] text-neutral-600 font-semibold mb-0.5">{item.label}</span>}
                <div className="w-5 h-3 rounded-[3px]" style={{ backgroundColor: item.color }} />
                {item.pct && <span className="text-[8px] font-mono text-neutral-400 mt-0.5">{item.pct}</span>}
              </div>
            ))}
          </div>
          <div className="mt-2.5 pt-2 border-t border-[#f0f0f0] flex items-center justify-between gap-2">
            <span className="text-[10px] text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200 font-normal">
              SAR Confirmed
            </span>
            <span className="text-[10px] font-mono text-[#1d1d1f] font-semibold">96.4% ACC</span>
          </div>
        </div>
      </div>
    </div>
  );
}

// --- Right Panel: Key Metrics ---
function KeyMetrics() {
  return (
    <div className="apple-card p-5 space-y-2 bg-white">
      <div className="flex items-center gap-2 mb-1">
        <TrendingUp className="w-4 h-4 text-[#0066cc]" />
        <span className="text-[12px] uppercase tracking-wider text-[#0066cc] font-semibold">
          Ice Extent Metric
        </span>
      </div>
      <p className="text-[12px] text-neutral-500">Total Polar Coverage</p>
      <p className="text-[32px] font-semibold text-[#1d1d1f] tracking-tight leading-none">82.4%</p>
      <p className="text-[12px] text-neutral-500 font-normal">&gt; 15% regional concentration threshold</p>
      <div className="mt-3 flex items-center gap-2">
        <span className="px-2.5 py-0.5 rounded-full bg-[#f5f5f7] text-[11px] font-normal border border-[#e0e0e0] text-[#1d1d1f]">
          +3.7% vs 24h
        </span>
      </div>
    </div>
  );
}

// --- Right Panel: Concentration Trend ---
function ConcentrationTrend() {
  return (
    <div className="apple-card p-5 space-y-3">
      <div className="flex items-center gap-2">
        <TrendingUp className="w-4 h-4 text-[#1d1d1f]" />
        <span className="text-[14px] font-semibold text-[#1d1d1f]">
          Concentration Curve
        </span>
      </div>
      <div className="h-28">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={trendData}>
            <XAxis dataKey="time" tick={{ fontSize: 10, fill: '#888888' }} axisLine={false} tickLine={false} />
            <YAxis
              domain={[78, 84]}
              tick={{ fontSize: 10, fill: '#888888' }}
              axisLine={false}
              tickLine={false}
              tickFormatter={(v) => `${v}%`}
              width={35}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: 'white',
                border: '1px solid #e0e0e0',
                borderRadius: '12px',
                fontSize: '11px',
              }}
              formatter={(value: number) => [`${value}%`, 'Coverage']}
            />
            <Line
              type="monotone"
              dataKey="value"
              stroke="#0066cc"
              strokeWidth={2}
              dot={{ fill: '#0066cc', r: 3 }}
              activeDot={{ r: 5, stroke: '#0066cc', strokeWidth: 2, fill: 'white' }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
      <div className="flex items-center gap-1.5 pt-2 border-t border-[#f0f0f0] text-[11px] text-neutral-500">
        <TrendingDown className="w-3.5 h-3.5 text-neutral-600" />
        <span>Rate: <strong className="text-[#1d1d1f] font-semibold">-0.6%/24h</strong></span>
      </div>
    </div>
  );
}

// --- Right Panel: Critical Window ---
function CriticalWindow() {
  return (
    <div className="p-5 rounded-[18px] bg-rose-50/70 border border-rose-200 text-[#1d1d1f] space-y-2">
      <div className="flex items-center gap-2">
        <AlertTriangle className="w-4 h-4 text-rose-600" />
        <span className="text-[12px] uppercase tracking-wider font-semibold text-rose-800">
          Critical Window Alert
        </span>
      </div>
      <p className="text-[16px] font-semibold text-rose-950 font-mono">T+24h to T+36h</p>
      <p className="text-[12px] text-neutral-600 font-normal">Rapid sea-ice convergence expected in sector Bravo</p>
      <ul className="space-y-1.5 pt-1">
        {[
          'Extreme ice compression risk',
          'Reduce speed to 6 kts in pack margin',
          'Hourly satellite updates active',
        ].map((item, i) => (
          <li key={i} className="flex items-center gap-2 text-[12px] text-neutral-700">
            <span className="h-1.5 w-1.5 rounded-full bg-rose-600 shrink-0" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

// --- Footer ---
function DataFooter() {
  return (
    <footer className="flex flex-col sm:flex-row items-center justify-between px-6 py-3.5 bg-white border-t border-[#e0e0e0] text-[12px] text-neutral-500 shrink-0 gap-2">
      <div className="flex items-center gap-4 flex-wrap">
        <span className="font-semibold text-[#1d1d1f]">Data Sources:</span>
        <span>Copernicus Marine Service</span>
        <span>ECMWF ERA5 + HRES</span>
        <span>SAR: Sentinel-1 / RCM</span>
      </div>
      <div className="flex items-center gap-3">
        <span>Initialized: 14:00 UTC</span>
        <span className="flex items-center gap-1 font-semibold text-emerald-800 bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-full text-[11px]">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
          OPERATIONAL
        </span>
      </div>
    </footer>
  );
}

// --- Main Page ---
export const SeaIceForecast: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-[#f5f5f7] overflow-hidden">
      <div className="flex-1 flex overflow-hidden p-4 sm:p-6 gap-5">
        {/* Left Panel */}
        <aside className="w-80 shrink-0 overflow-y-auto space-y-4 hidden lg:block">
          <ForecastTimeline />
          <ModelLayers />
        </aside>

        {/* Center: Map */}
        <main className="flex-1 min-w-0 overflow-hidden">
          <MapSection />
        </main>

        {/* Right Panel */}
        <aside className="w-80 shrink-0 overflow-y-auto space-y-4 hidden xl:block">
          <KeyMetrics />
          <ConcentrationTrend />
          <CriticalWindow />
        </aside>
      </div>
      <DataFooter />
    </div>
  );
};

export default SeaIceForecast;
