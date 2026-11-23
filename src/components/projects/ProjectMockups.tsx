import React from 'react';
import {
  Users,
  Calendar,
  Activity,
  CheckCircle2,
  Clock,
  Search,
  Plus,
  Stethoscope,
  TrendingUp,
  FileText,
} from 'lucide-react';

// Mockup 1: MedConsults Core Clinic Management System
export const MedConsultsCoreMockup: React.FC = () => {
  return (
    <div className="w-full h-full min-h-[260px] bg-[#0c0c0e] rounded-2xl border border-stroke/80 p-4 sm:p-5 flex flex-col justify-between font-sans select-none overflow-hidden">
      {/* Top Clinic Header */}
      <div className="flex items-center justify-between pb-3 border-b border-stroke/60">
        <div className="flex items-center gap-2.5">
          <div className="h-7 w-7 rounded-lg bg-surface border border-stroke flex items-center justify-center text-[#89AACC]">
            <Stethoscope className="w-4 h-4" />
          </div>
          <div>
            <div className="text-xs font-semibold text-text flex items-center gap-2">
              MedConsults Clinic Engine
              <span className="text-[10px] px-1.5 py-0.2 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                Live Roster
              </span>
            </div>
            <div className="text-[10px] text-muted">Central Medical Operations</div>
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs">
          <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-[11px] text-muted hidden sm:inline">14 Active Consultations</span>
        </div>
      </div>

      {/* Main Content Area: Doctor Roster & Active Queue */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 py-3">
        {/* Doctor Roster Card */}
        <div className="bg-surface/80 rounded-xl p-3 border border-stroke/70 space-y-2">
          <div className="flex items-center justify-between text-[11px] text-muted">
            <span className="font-medium text-text">Physician Roster</span>
            <span className="text-[#89AACC]">4 On Duty</span>
          </div>
          <div className="space-y-1.5">
            <div className="flex items-center justify-between p-1.5 rounded-lg bg-bg/60 border border-stroke/40 text-[11px]">
              <div className="flex items-center gap-2">
                <div className="h-5 w-5 rounded-full bg-[#89AACC]/20 text-[#89AACC] flex items-center justify-center text-[10px] font-bold">
                  SJ
                </div>
                <span className="text-text font-medium">Dr. Sarah Jenkins</span>
              </div>
              <span className="text-[10px] text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded">
                In Consult
              </span>
            </div>
            <div className="flex items-center justify-between p-1.5 rounded-lg bg-bg/60 border border-stroke/40 text-[11px]">
              <div className="flex items-center gap-2">
                <div className="h-5 w-5 rounded-full bg-[#4E85BF]/20 text-[#4E85BF] flex items-center justify-center text-[10px] font-bold">
                  MC
                </div>
                <span className="text-text font-medium">Dr. Michael Chang</span>
              </div>
              <span className="text-[10px] text-[#89AACC] bg-[#89AACC]/10 px-1.5 py-0.5 rounded">
                Available
              </span>
            </div>
          </div>
        </div>

        {/* Live Patient Flow Card */}
        <div className="bg-surface/80 rounded-xl p-3 border border-stroke/70 space-y-2">
          <div className="flex items-center justify-between text-[11px] text-muted">
            <span className="font-medium text-text">Intake & Waiting Queue</span>
            <span className="text-muted">Avg wait: 8m</span>
          </div>
          <div className="space-y-1.5">
            <div className="flex items-center justify-between p-1.5 rounded-lg bg-bg/60 border border-stroke/40 text-[11px]">
              <span className="text-text font-medium">#PT-4109 · Room 3A</span>
              <span className="text-[10px] text-amber-400 bg-amber-500/10 px-1.5 py-0.5 rounded flex items-center gap-1">
                <Clock className="w-2.5 h-2.5" /> Vital Check
              </span>
            </div>
            <div className="flex items-center justify-between p-1.5 rounded-lg bg-bg/60 border border-stroke/40 text-[11px]">
              <span className="text-text font-medium">#PT-4112 · Waiting</span>
              <span className="text-[10px] text-[#89AACC] bg-[#89AACC]/10 px-1.5 py-0.5 rounded">
                Next in Line
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom KPI Highlights */}
      <div className="pt-2 border-t border-stroke/60 flex items-center justify-between text-[11px] text-muted">
        <span className="flex items-center gap-1.5">
          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
          HIPAA & Clinical Workflow Verified
        </span>
        <span className="font-mono text-text text-[10px]">v2.4 Core</span>
      </div>
    </div>
  );
};

// Mockup 2: MedConsults Dashboard & Analytics
export const MedConsultsDashboardMockup: React.FC = () => {
  return (
    <div className="w-full h-full min-h-[260px] bg-[#0c0c0e] rounded-2xl border border-stroke/80 p-4 sm:p-5 flex flex-col justify-between font-sans select-none overflow-hidden">
      {/* Metric Stat Cards */}
      <div className="grid grid-cols-2 gap-2.5">
        <div className="bg-surface/90 rounded-xl p-2.5 border border-stroke/70">
          <div className="text-[10px] text-muted flex items-center justify-between">
            <span>Consultations</span>
            <Activity className="w-3 h-3 text-[#89AACC]" />
          </div>
          <div className="text-lg font-bold text-text mt-1">1,428</div>
          <div className="text-[9px] text-emerald-400 flex items-center gap-0.5 mt-0.5">
            <TrendingUp className="w-2.5 h-2.5" /> +18.4% this week
          </div>
        </div>

        <div className="bg-surface/90 rounded-xl p-2.5 border border-stroke/70">
          <div className="text-[10px] text-muted flex items-center justify-between">
            <span>Bed & Room Occ.</span>
            <Users className="w-3 h-3 text-[#4E85BF]" />
          </div>
          <div className="text-lg font-bold text-text mt-1">87.5%</div>
          <div className="text-[9px] text-muted mt-0.5">Optimal capacity</div>
        </div>
      </div>

      {/* Real-time Simulated SVG Curve Chart */}
      <div className="bg-surface/60 rounded-xl p-3 border border-stroke/60 my-2">
        <div className="flex items-center justify-between text-[10px] text-muted mb-2">
          <span>Weekly Visit Throughput</span>
          <span className="text-[#89AACC] font-mono">Mon–Sun</span>
        </div>
        <div className="w-full h-16 relative">
          <svg
            className="w-full h-full overflow-visible"
            viewBox="0 0 240 60"
            preserveAspectRatio="none"
          >
            <defs>
              <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#89AACC" stopOpacity="0.45" />
                <stop offset="100%" stopColor="#4E85BF" stopOpacity="0.0" />
              </linearGradient>
            </defs>
            <path
              d="M0,45 Q30,50 60,30 T120,25 T180,10 T240,15 L240,60 L0,60 Z"
              fill="url(#chartGradient)"
            />
            <path
              d="M0,45 Q30,50 60,30 T120,25 T180,10 T240,15"
              fill="none"
              stroke="#89AACC"
              strokeWidth="2"
            />
            {/* Data Points */}
            <circle cx="60" cy="30" r="3" fill="#89AACC" />
            <circle cx="120" cy="25" r="3" fill="#89AACC" />
            <circle cx="180" cy="10" r="3" fill="#89AACC" />
            <circle cx="240" cy="15" r="3" fill="#4E85BF" />
          </svg>
        </div>
      </div>

      {/* Live Telemetry Ticker */}
      <div className="text-[10px] text-muted flex items-center justify-between pt-1 border-t border-stroke/60">
        <span>Daily Goal: 50 visits</span>
        <span className="text-emerald-400 font-medium">94% achieved</span>
      </div>
    </div>
  );
};

// Mockup 3: MedConsults Patient Management
export const MedConsultsPatientMockup: React.FC = () => {
  return (
    <div className="w-full h-full min-h-[260px] bg-[#0c0c0e] rounded-2xl border border-stroke/80 p-4 sm:p-5 flex flex-col justify-between font-sans select-none overflow-hidden">
      {/* Patient Directory Search Bar */}
      <div className="flex items-center gap-2 p-2 rounded-xl bg-surface/90 border border-stroke/70 text-xs">
        <Search className="w-3.5 h-3.5 text-muted shrink-0" />
        <span className="text-muted/80 text-[11px] truncate">
          Filter records by MRN, Name, Diagnosis...
        </span>
      </div>

      {/* Patient Records List */}
      <div className="space-y-2 py-2">
        <div className="p-2.5 rounded-xl bg-surface/70 border border-stroke/60 flex items-center justify-between text-xs hover:border-[#89AACC]/40 transition-colors">
          <div className="flex items-center gap-2.5">
            <div className="h-7 w-7 rounded-lg bg-[#89AACC]/15 text-[#89AACC] flex items-center justify-center font-bold text-[10px]">
              EP
            </div>
            <div>
              <div className="font-medium text-text text-[11px]">Eleanor Parker</div>
              <div className="text-[10px] text-muted">MRN-90214 · O+ Positive</div>
            </div>
          </div>
          <div className="text-right">
            <span className="text-[9px] px-1.5 py-0.5 rounded bg-blue-500/10 text-[#89AACC] border border-blue-500/20 block mb-0.5">
              Follow-up
            </span>
            <span className="text-[9px] text-muted">Dr. Jenkins</span>
          </div>
        </div>

        <div className="p-2.5 rounded-xl bg-surface/70 border border-stroke/60 flex items-center justify-between text-xs hover:border-[#89AACC]/40 transition-colors">
          <div className="flex items-center gap-2.5">
            <div className="h-7 w-7 rounded-lg bg-[#4E85BF]/15 text-[#4E85BF] flex items-center justify-center font-bold text-[10px]">
              DA
            </div>
            <div>
              <div className="font-medium text-text text-[11px]">David Adams</div>
              <div className="text-[10px] text-muted">MRN-88391 · Allergies: Penicillin</div>
            </div>
          </div>
          <div className="text-right">
            <span className="text-[9px] px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 block mb-0.5">
              Routine Check
            </span>
            <span className="text-[9px] text-muted">Dr. Chang</span>
          </div>
        </div>
      </div>

      {/* Record Footer */}
      <div className="pt-2 border-t border-stroke/60 flex items-center justify-between text-[10px] text-muted">
        <span className="flex items-center gap-1">
          <FileText className="w-3 h-3 text-[#89AACC]" />
          Encrypted EMR Records
        </span>
        <span className="text-[#89AACC] hover:underline cursor-pointer">
          View All Patients →
        </span>
      </div>
    </div>
  );
};

// Mockup 4: MedConsults Appointment Management
export const MedConsultsAppointmentsMockup: React.FC = () => {
  return (
    <div className="w-full h-full min-h-[260px] bg-[#0c0c0e] rounded-2xl border border-stroke/80 p-4 sm:p-5 flex flex-col justify-between font-sans select-none overflow-hidden">
      {/* Calendar Bar & Date Controls */}
      <div className="flex items-center justify-between pb-3 border-b border-stroke/60">
        <div className="flex items-center gap-2">
          <Calendar className="w-4 h-4 text-[#89AACC]" />
          <span className="text-xs font-semibold text-text">
            Today's Schedule · Nov 24
          </span>
        </div>
        <div className="flex items-center gap-1.5">
          <button className="px-2 py-1 rounded bg-[#89AACC]/15 text-[#89AACC] text-[10px] font-medium flex items-center gap-1 border border-[#89AACC]/20">
            <Plus className="w-2.5 h-2.5" /> Book Slot
          </button>
        </div>
      </div>

      {/* Schedule Time Slots */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 py-2.5">
        <div className="p-2.5 rounded-xl bg-surface/90 border border-stroke/70 space-y-1">
          <div className="flex items-center justify-between text-[10px]">
            <span className="text-muted font-mono">09:30 AM</span>
            <span className="text-emerald-400 bg-emerald-500/10 px-1 py-0.5 rounded text-[9px]">
              Completed
            </span>
          </div>
          <div className="text-[11px] font-semibold text-text truncate">
            Marcus Vance
          </div>
          <div className="text-[10px] text-muted truncate">Cardiology Checkup</div>
        </div>

        <div className="p-2.5 rounded-xl bg-surface/90 border border-[#89AACC]/40 shadow-[0_0_12px_rgba(137,170,204,0.15)] space-y-1">
          <div className="flex items-center justify-between text-[10px]">
            <span className="text-[#89AACC] font-mono font-bold">11:00 AM</span>
            <span className="text-[#89AACC] bg-[#89AACC]/15 px-1 py-0.5 rounded text-[9px] animate-pulse">
              In Progress
            </span>
          </div>
          <div className="text-[11px] font-semibold text-text truncate">
            Sophia Reynolds
          </div>
          <div className="text-[10px] text-muted truncate">Neurology Consult</div>
        </div>

        <div className="p-2.5 rounded-xl bg-surface/90 border border-stroke/70 space-y-1">
          <div className="flex items-center justify-between text-[10px]">
            <span className="text-muted font-mono">02:15 PM</span>
            <span className="text-muted bg-surface px-1 py-0.5 rounded text-[9px] border border-stroke">
              Confirmed
            </span>
          </div>
          <div className="text-[11px] font-semibold text-text truncate">
            Liam Bennett
          </div>
          <div className="text-[10px] text-muted truncate">Pediatric Review</div>
        </div>
      </div>

      {/* Bottom Queue Status */}
      <div className="pt-2 border-t border-stroke/60 flex items-center justify-between text-[10px] text-muted">
        <span>Conflict-Free Slot Allocation Engine</span>
        <span className="text-emerald-400 font-mono">0 Overlaps</span>
      </div>
    </div>
  );
};
