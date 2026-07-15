"use client";

import { useState } from "react";
import { Globe, MapPin } from "lucide-react";

interface CountryData {
  name: string;
  count: number;
  x: number;
  y: number;
}

interface WorldMapProps {
  countries: CountryData[];
}

const CONTINENTS = [
  { name: "Africa", color: "bg-emerald-500" },
  { name: "Europe", color: "bg-blue-500" },
  { name: "Asia", color: "bg-amber-500" },
  { name: "North America", color: "bg-indigo-500" },
  { name: "South America", color: "bg-rose-500" },
  { name: "Oceania", color: "bg-cyan-500" },
];

export default function WorldMap({ countries }: WorldMapProps) {
  const [activeCountry, setActiveCountry] = useState<string | null>(null);

  const hasData = countries.length > 0;
  const pinned = countries.filter((c) => c.count > 0);

  return (
    <div className="dashboard-card rounded-xl overflow-hidden">
      <div className="flex items-center justify-between px-5 py-4 border-b border-secondary/5">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center">
            <Globe size={18} className="text-primary" />
          </div>
          <div>
            <h3 className="text-sm font-heading font-bold text-text">Global Coverage</h3>
            <p className="text-[11px] text-text/40">{pinned.length} active countries</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {CONTINENTS.slice(0, 3).map((c) => (
            <div key={c.name} className="flex items-center gap-1">
              <span className={`w-2 h-2 rounded-full ${c.color}`} />
              <span className="text-[9px] text-text/40 hidden sm:inline">{c.name}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="p-5">
        {!hasData ? (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <div className="w-16 h-16 rounded-full bg-surface flex items-center justify-center mb-4">
              <Globe size={28} className="text-text/20" />
            </div>
            <p className="text-sm font-medium text-text/40">No coverage data yet</p>
            <p className="text-xs text-text/30 mt-1">Country data will appear as representatives register</p>
          </div>
        ) : (
          <div className="relative">
            <svg viewBox="0 0 800 400" className="w-full h-auto" xmlns="http://www.w3.org/2000/svg">
              <rect width="800" height="400" fill="rgba(245, 247, 250, 0.5)" rx="8" />

              <path d="M100,280 Q150,260 200,270 Q250,280 300,260 Q350,240 400,250 Q450,260 500,240 Q550,220 600,230 Q650,240 700,220" fill="none" stroke="rgba(0,93,36,0.06)" strokeWidth="1" />

              {countries.map((c) => (
                <g key={c.name}>
                  <circle
                    cx={c.x}
                    cy={c.y}
                    r={Math.max(4, Math.min(12, 4 + c.count * 2))}
                    fill={c.count > 0 ? "rgba(245, 134, 53, 0.2)" : "rgba(0,0,0,0.04)"}
                    stroke={c.count > 0 ? "#F58635" : "rgba(0,0,0,0.08)"}
                    strokeWidth={c.count > 0 ? 1.5 : 0.5}
                    className="transition-all duration-300"
                    onMouseEnter={() => setActiveCountry(c.name)}
                    onMouseLeave={() => setActiveCountry(null)}
                    style={{ cursor: "pointer" }}
                  />
                  {c.count > 0 && (
                    <circle
                      cx={c.x}
                      cy={c.y}
                      r={3}
                      fill="#F58635"
                      className="map-pin"
                    />
                  )}
                  {activeCountry === c.name && (
                    <>
                      <rect
                        x={c.x - 40}
                        y={c.y - 32}
                        width={80}
                        height={24}
                        rx={4}
                        fill="#1A1A2E"
                      />
                      <text
                        x={c.x}
                        y={c.y - 16}
                        textAnchor="middle"
                        fill="white"
                        fontSize="10"
                        fontWeight="600"
                      >
                        {c.name} ({c.count})
                      </text>
                    </>
                  )}
                </g>
              ))}
            </svg>

            <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 gap-2">
              {pinned.slice(0, 6).map((c) => (
                <div
                  key={c.name}
                  className="flex items-center gap-2 px-3 py-2 rounded-lg bg-surface/50 hover:bg-surface transition-colors cursor-default"
                >
                  <MapPin size={12} className="text-primary shrink-0" />
                  <span className="text-xs text-text/70 flex-1 truncate">{c.name}</span>
                  <span className="text-xs font-semibold text-text">{c.count}</span>
                </div>
              ))}
              {pinned.length > 6 && (
                <div className="flex items-center justify-center px-3 py-2 rounded-lg bg-surface/50">
                  <span className="text-[11px] text-text/40">+{pinned.length - 6} more</span>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
