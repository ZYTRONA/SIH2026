import React, { useState, useEffect, useRef } from 'react';
import {
  INITIAL_AUDIT_LOGS,
  SystemAuditLogEntry,
} from '@/data/systemStatusData';
import {
  Terminal,
  Search,
  Trash2,
  Download,
  Play,
  Pause,
  ArrowDownCircle,
} from 'lucide-react';

export const SystemLogsConsole: React.FC = () => {
  const [logs, setLogs] = useState<SystemAuditLogEntry[]>(INITIAL_AUDIT_LOGS);
  const [filterLevel, setFilterLevel] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isAutoScroll, setIsAutoScroll] = useState<boolean>(true);
  const [isLiveStreaming, setIsLiveStreaming] = useState<boolean>(true);
  const logContainerRef = useRef<HTMLDivElement>(null);

  // Auto-simulate continuous polar telemetry streaming
  useEffect(() => {
    if (!isLiveStreaming) return;

    const streamInterval = setInterval(() => {
      const now = new Date();
      const timeStr = now.toLocaleTimeString('en-GB', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
        timeZone: 'UTC',
      }) + ' UTC';

      const simulatedMessages = [
        {
          level: 'INFERENCE' as const,
          module: 'ResUNet-v3.2',
          message: `Raster tile [sector-${Math.floor(Math.random() * 12 + 1)}] evaluated: mean sea-ice concentration ${(Math.random() * 40 + 30).toFixed(1)}%.`,
        },
        {
          level: 'SYNC' as const,
          module: 'AIS-Daemon',
          message: `Vessel ECDIS transponder ping received (Lat: 69°24'S, Lon: 76°11'E, SOG: 12.8 kts).`,
        },
        {
          level: 'SUCCESS' as const,
          module: 'Starlink Mesh',
          message: `Laser inter-satellite handoff verified without packet loss (RTT: ${Math.floor(Math.random() * 10 + 40)}ms).`,
        },
        {
          level: 'INFO' as const,
          module: 'Lagrangian Drift',
          message: `Updated velocity vector for IB-023: drift speed ${ (Math.random() * 0.8 + 0.8).toFixed(2) } kts bearing 284°.`,
        },
      ];

      const sample = simulatedMessages[Math.floor(Math.random() * simulatedMessages.length)];
      const newEntry: SystemAuditLogEntry = {
        id: `log-${Date.now()}`,
        timestamp: timeStr,
        level: sample.level,
        module: sample.module,
        message: sample.message,
      };

      setLogs((prev) => [...prev.slice(-35), newEntry]);
    }, 4500);

    return () => clearInterval(streamInterval);
  }, [isLiveStreaming]);

  // Auto-scroll to bottom
  useEffect(() => {
    if (isAutoScroll && logContainerRef.current) {
      logContainerRef.current.scrollTop = logContainerRef.current.scrollHeight;
    }
  }, [logs, isAutoScroll]);

  const filteredLogs = logs.filter((l) => {
    const matchesLevel = filterLevel === 'ALL' || l.level === filterLevel;
    const matchesSearch =
      searchQuery === '' ||
      l.message.toLowerCase().includes(searchQuery.toLowerCase()) ||
      l.module.toLowerCase().includes(searchQuery.toLowerCase()) ||
      l.timestamp.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesLevel && matchesSearch;
  });

  const handleClear = () => {
    setLogs([]);
  };

  const handleExport = () => {
    const logText = logs
      .map((l) => `[${l.timestamp}] [${l.level}] [${l.module}] ${l.message}`)
      .join('\n');
    const blob = new Blob([logText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `polaris-system-audit-${Date.now()}.log`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const getLevelBadgeClass = (level: string) => {
    switch (level) {
      case 'SUCCESS':
        return 'text-emerald-400 bg-emerald-950/40 border-emerald-800';
      case 'INFERENCE':
        return 'text-indigo-300 bg-indigo-950/40 border-indigo-800';
      case 'SYNC':
        return 'text-cyan-300 bg-cyan-950/40 border-cyan-800';
      case 'WARN':
        return 'text-amber-400 bg-amber-950/40 border-amber-800';
      default:
        return 'text-neutral-300 bg-neutral-800/60 border-neutral-700';
    }
  };

  return (
    <div className="apple-card p-6 space-y-5">
      {/* Header & Live Stream Toggle */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-[#f0f0f0]">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-[12px] bg-[#1d1d1f] text-white flex items-center justify-center shrink-0 shadow-xs">
            <Terminal className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-[16px] font-semibold text-[#1d1d1f] tracking-tight">
                Live System Audit &amp; Pipeline Log Stream
              </h3>
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-100 text-emerald-800">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                Live Feed (1Hz)
              </span>
            </div>
            <p className="text-[12px] text-neutral-500 font-normal">
              Real-time asynchronous event streaming from Jetson AGX Orin daemon and satellite link
            </p>
          </div>
        </div>

        {/* Console Controls */}
        <div className="flex items-center gap-2 self-start sm:self-auto">
          <button
            onClick={() => setIsAutoScroll(!isAutoScroll)}
            className={`btn-apple-secondary !min-h-[34px] !h-[34px] !px-3 !py-1 !text-[12px] cursor-pointer flex items-center gap-1.5 ${
              isAutoScroll ? 'text-[#0066cc] bg-blue-50 border-blue-200' : 'text-neutral-500'
            }`}
            title={isAutoScroll ? 'Auto-scroll is enabled' : 'Auto-scroll is disabled'}
          >
            <ArrowDownCircle className={`w-3.5 h-3.5 ${isAutoScroll ? 'text-[#0066cc]' : 'text-neutral-400'}`} />
            <span>Auto-Scroll</span>
          </button>

          <button
            onClick={() => setIsLiveStreaming(!isLiveStreaming)}
            className="btn-apple-secondary !min-h-[34px] !h-[34px] !px-3 !py-1 !text-[12px] cursor-pointer flex items-center gap-1.5"
            title={isLiveStreaming ? 'Pause streaming' : 'Resume streaming'}
          >
            {isLiveStreaming ? (
              <>
                <Pause className="w-3.5 h-3.5 text-neutral-600" />
                <span>Pause</span>
              </>
            ) : (
              <>
                <Play className="w-3.5 h-3.5 text-emerald-600" />
                <span>Resume</span>
              </>
            )}
          </button>

          <button
            onClick={handleClear}
            className="btn-apple-secondary !min-h-[34px] !h-[34px] !px-3 !py-1 !text-[12px] cursor-pointer flex items-center gap-1.5 text-neutral-600 hover:text-rose-600"
            title="Clear terminal output"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Clear</span>
          </button>

          <button
            onClick={handleExport}
            className="btn-apple-primary !min-h-[34px] !h-[34px] !px-3.5 !py-1 !text-[12px] cursor-pointer flex items-center gap-1.5"
            title="Export raw .log file"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export Log</span>
          </button>
        </div>
      </div>

      {/* Filter Toolbar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
        {/* Level Filters */}
        <div className="flex items-center gap-1.5 bg-[#f5f5f7] p-1 rounded-full border border-[#e0e0e0] overflow-x-auto">
          {['ALL', 'SUCCESS', 'INFERENCE', 'SYNC', 'INFO'].map((lvl) => (
            <button
              key={lvl}
              onClick={() => setFilterLevel(lvl)}
              className={`px-3 py-1 rounded-full text-[11px] font-mono font-semibold transition-all cursor-pointer ${
                filterLevel === lvl
                  ? 'bg-[#1d1d1f] text-white shadow-2xs'
                  : 'text-neutral-600 hover:bg-[#e0e0e0]'
              }`}
            >
              {lvl}
            </button>
          ))}
        </div>

        {/* Search Filter Input */}
        <div className="relative w-full sm:w-64">
          <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
          <input
            type="text"
            placeholder="Filter logs by module or text..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full h-8 pl-8 pr-3 rounded-full bg-[#fafafc] border border-[#e0e0e0] text-[12px] focus:outline-none focus:ring-1 focus:ring-[#0066cc]"
          />
        </div>
      </div>

      {/* Terminal View */}
      <div
        ref={logContainerRef}
        className="h-64 sm:h-72 overflow-y-auto rounded-[14px] bg-[#161618] border border-[#2a2a2c] p-4 font-mono text-[12px] text-neutral-200 space-y-2 select-text shadow-inner"
      >
        {filteredLogs.length === 0 ? (
          <div className="h-full flex items-center justify-center text-neutral-500">
            No log entries match the active filter criteria.
          </div>
        ) : (
          filteredLogs.map((l) => (
            <div
              key={l.id}
              className="flex items-start gap-2.5 hover:bg-white/5 p-1 rounded transition-colors leading-relaxed"
            >
              <span className="text-neutral-500 shrink-0 text-[11px]">{l.timestamp}</span>
              <span
                className={`px-2 py-0.2 rounded border text-[10px] font-semibold shrink-0 ${getLevelBadgeClass(
                  l.level
                )}`}
              >
                {l.level}
              </span>
              <span className="text-indigo-300 font-semibold shrink-0">[{l.module}]</span>
              <span className="text-neutral-300 break-all">{l.message}</span>
            </div>
          ))
        )}
      </div>

      {/* Console Status Footer */}
      <div className="flex items-center justify-between text-[11px] font-mono text-neutral-400">
        <div className="flex items-center gap-2">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
          <span>Active Log Buffer: {filteredLogs.length} entries</span>
        </div>
        <span>Jetson AGX Syslog • /var/log/polaris/telemetry.log</span>
      </div>
    </div>
  );
};
