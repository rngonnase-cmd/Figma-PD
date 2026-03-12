import { useState, useEffect } from "react";

/* ─── DESIGN TOKENS ─────────────────────────────────────────── */
const C = {
  bg:"#F5F7FF", surface:"#FFFFFF", surface2:"#EEF2FF",
  blue:"#1E6BFF", blue2:"#0047CC", blueL:"#E4EDFF",
  coral:"#FF4F28", coralL:"#FFF0EB",
  green:"#00A86B", greenL:"#E2F9F0",
  gold:"#F59E0B", goldL:"#FEF3C7",
  purple:"#7C3AED", purpleL:"#F3EEFF",
  ink:"#0D1B40", ink2:"#253858", muted:"#566780", ghost:"#9BAABF",
  border:"#DDE4F0", divider:"#ECF0FA",
};
const F = {
  display:"'Playfair Display',Georgia,serif",
  ui:"'DM Sans','Segoe UI',system-ui,sans-serif",
};

/* ─── SVG ICON LIBRARY ──────────────────────────────────────── */
const Icon = ({ name, size=24, color="currentColor", style={} }) => {
  const paths = {
    dumbbell: <><rect x="2" y="10" width="4" height="4" rx="1" fill={color}/><rect x="18" y="10" width="4" height="4" rx="1" fill={color}/><rect x="6" y="8" width="3" height="8" rx="1" fill={color}/><rect x="15" y="8" width="3" height="8" rx="1" fill={color}/><rect x="9" y="11" width="6" height="2" rx="1" fill={color}/></>,
    users: <><circle cx="9" cy="7" r="3.5" stroke={color} strokeWidth="1.8" fill="none"/><path d="M2 20c0-3.9 3.1-7 7-7s7 3.1 7 7" stroke={color} strokeWidth="1.8" fill="none" strokeLinecap="round"/><circle cx="18" cy="7" r="2.5" stroke={color} strokeWidth="1.5" fill="none"/><path d="M21 20c0-2.8-1.6-5.2-4-6.3" stroke={color} strokeWidth="1.5" fill="none" strokeLinecap="round"/></>,
    heart: <><path d="M12 21C12 21 3 14.5 3 8.5a5 5 0 0 1 9-3 5 5 0 0 1 9 3c0 6-9 12.5-9 12.5z" stroke={color} strokeWidth="1.8" fill={color} fillOpacity="0.15"/></>,
    person: <><circle cx="12" cy="7" r="4" stroke={color} strokeWidth="1.8" fill="none"/><path d="M4 21v-1a8 8 0 0 1 16 0v1" stroke={color} strokeWidth="1.8" fill="none" strokeLinecap="round"/></>,
    home: <><path d="M3 12L12 4l9 8" stroke={color} strokeWidth="1.8" fill="none" strokeLinecap="round" strokeLinejoin="round"/><path d="M5 10v9a1 1 0 001 1h4v-5h4v5h4a1 1 0 001-1v-9" stroke={color} strokeWidth="1.8" fill="none" strokeLinecap="round" strokeLinejoin="round"/></>,
    star: <><polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" fill={color} fillOpacity="0.9"/></>,
    map: <><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" stroke={color} strokeWidth="1.8" fill={color} fillOpacity="0.15"/><circle cx="12" cy="9" r="2.5" fill={color}/></>,
    clock: <><circle cx="12" cy="12" r="9" stroke={color} strokeWidth="1.8" fill="none"/><path d="M12 7v5l3 3" stroke={color} strokeWidth="1.8" fill="none" strokeLinecap="round"/></>,
    check: <><path d="M5 12l5 5L20 7" stroke={color} strokeWidth="2.2" fill="none" strokeLinecap="round" strokeLinejoin="round"/></>,
    fire: <><path d="M12 2c0 0-5 4-5 9a5 5 0 0 0 10 0c0-2-1-4-2-5 0 2-1.5 3-3 3-1 0-2-1-2-2s1-2 2-3z" fill={color} fillOpacity="0.85"/><path d="M12 14c0 1.1-.9 2-2 2s-2-.9-2-2c0-1.5 2-4 2-4s2 2.5 2 4z" fill="#fff" fillOpacity="0.5"/></>,
    leaf: <><path d="M17 8C8 10 5.9 16.17 3.82 19.27c1.52.3 3.08-.07 4.18-1 2-1.7 4-4 6-4 3 0 5 2 6 5 1-4 0-8-3-11z" fill={color} fillOpacity="0.8"/><path d="M3.82 19.27C5 16 8 11 14 9" stroke={color} strokeWidth="1.5" fill="none" strokeLinecap="round"/></>,
    lightning: <><polygon points="13,2 4,14 12,14 11,22 20,10 12,10" fill={color} fillOpacity="0.9"/></>,
    trophy: <><path d="M8 21h8M12 17v4M17 3H7L5 7c0 3.3 3.1 6 7 6s7-2.7 7-6L17 3z" stroke={color} strokeWidth="1.8" fill={color} fillOpacity="0.12" strokeLinecap="round" strokeLinejoin="round"/><path d="M5 7H3a2 2 0 0 0 2 2M19 7h2a2 2 0 0 1-2 2" stroke={color} strokeWidth="1.8" fill="none" strokeLinecap="round"/></>,
    salad: <><ellipse cx="12" cy="16" rx="8" ry="4" fill={color} fillOpacity="0.15" stroke={color} strokeWidth="1.5"/><path d="M6 16c0-3 2-7 6-9 4 2 6 6 6 9" fill={color} fillOpacity="0.3"/><path d="M10 10c1-3 4-5 4-5" stroke={color} strokeWidth="1.5" fill="none" strokeLinecap="round"/></>,
    run: <><circle cx="14.5" cy="4.5" r="2" fill={color}/><path d="M9 18l2-7 3 3 2-4" stroke={color} strokeWidth="1.8" fill="none" strokeLinecap="round" strokeLinejoin="round"/><path d="M6 20l3-2M18 11l-3 1" stroke={color} strokeWidth="1.8" fill="none" strokeLinecap="round"/></>,
    brain: <><path d="M12 4c-1.6 0-3 1-3.5 2.5C7 6.8 6 7.9 6 9.2c0 1 .5 2 1.2 2.6C6.5 12.5 6 13.7 6 15c0 2.2 2 4 4 4h4c2 0 4-1.8 4-4 0-1.3-.5-2.5-1.2-3.2.7-.6 1.2-1.6 1.2-2.6 0-1.3-1-2.4-2.5-2.7C15 5 13.6 4 12 4z" fill={color} fillOpacity="0.2" stroke={color} strokeWidth="1.5"/><path d="M12 8v8M9 12h6" stroke={color} strokeWidth="1.5" strokeLinecap="round"/></>,
    droplet: <><path d="M12 2L5 13a7 7 0 1 0 14 0L12 2z" fill={color} fillOpacity="0.2" stroke={color} strokeWidth="1.8"/></>,
    moon: <><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" fill={color} fillOpacity="0.2" stroke={color} strokeWidth="1.8"/></>,
    pool: <><path d="M2 19c1.5-2 3.5-3 6-3s4.5 1 6 3 3.5 3 6 3" stroke={color} strokeWidth="2" fill="none" strokeLinecap="round"/><path d="M2 14c1.5-2 3.5-3 6-3s4.5 1 6 3 3.5 3 6 3" stroke={color} strokeWidth="2" fill="none" strokeLinecap="round" opacity="0.4"/><circle cx="14" cy="5" r="2" fill={color}/><path d="M14 7v4l-3 2" stroke={color} strokeWidth="1.8" fill="none" strokeLinecap="round"/></>,
    spa: <><path d="M12 2C6.5 8 4 12 4 16a8 8 0 0 0 16 0c0-4-2.5-8-8-14z" fill={color} fillOpacity="0.15" stroke={color} strokeWidth="1.5"/><path d="M12 8c0 4-3 7-3 9" stroke={color} strokeWidth="1.5" strokeLinecap="round" fill="none" opacity="0.5"/></>,
    parking: <><rect x="3" y="3" width="18" height="18" rx="3" fill={color} fillOpacity="0.1" stroke={color} strokeWidth="1.5"/><path d="M9 17V7h4.5a3 3 0 0 1 0 6H9" stroke={color} strokeWidth="1.8" fill="none" strokeLinecap="round" strokeLinejoin="round"/></>,
    cafe: <><path d="M17 8h2a2 2 0 0 1 2 2v1a2 2 0 0 1-2 2h-2" stroke={color} strokeWidth="1.8" fill="none" strokeLinecap="round"/><path d="M5 8h12v8a4 4 0 0 1-4 4H9a4 4 0 0 1-4-4z" fill={color} fillOpacity="0.15" stroke={color} strokeWidth="1.5"/><path d="M8 4c0 1-1 1-1 2s1 1 1 2M12 4c0 1-1 1-1 2s1 1 1 2" stroke={color} strokeWidth="1.5" fill="none" strokeLinecap="round"/></>,
    arrow: <><path d="M5 12h14M14 7l5 5-5 5" stroke={color} strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/></>,
    close: <><path d="M18 6L6 18M6 6l12 12" stroke={color} strokeWidth="2" strokeLinecap="round"/></>,
    medal: <><circle cx="12" cy="14" r="6" fill={color} fillOpacity="0.15" stroke={color} strokeWidth="1.5"/><path d="M8.5 6l-1-4h9l-1 4" stroke={color} strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/><path d="M12 11v3l2 1" stroke={color} strokeWidth="1.5" fill="none" strokeLinecap="round"/></>,
    target: <><circle cx="12" cy="12" r="9" stroke={color} strokeWidth="1.5" fill="none"/><circle cx="12" cy="12" r="5" stroke={color} strokeWidth="1.5" fill="none" opacity="0.5"/><circle cx="12" cy="12" r="1.5" fill={color}/></>,
    nutrition: <><path d="M12 2a7 7 0 0 1 7 7c0 5-7 13-7 13S5 14 5 9a7 7 0 0 1 7-7z" fill={color} fillOpacity="0.15" stroke={color} strokeWidth="1.5"/><path d="M12 6v6M9 9h6" stroke={color} strokeWidth="1.8" strokeLinecap="round"/></>,
  };
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" style={style} fill="none">
      {paths[name] || <circle cx="12" cy="12" r="10" fill={color} fillOpacity="0.2"/>}
    </svg>
  );
};

/* ─── GYM ILLUSTRATIONS ─────────────────────────────────────────
   viewBox="0 0 400 180" with preserveAspectRatio="xMidYMid slice"
   guarantees the scene fills ANY card size perfectly — no gaps,
   no distortion, crops from centre.
─────────────────────────────────────────────────────────────── */
const GymIllustration = ({ type, w=400, h=180 }) => {

  /* ═══════════════════════════════════════════════════════════
     APEX FITNESS — Victoria Island
     Scene: night-time skyline view through floor-to-ceiling glass,
     row of premium cardio machines lit by blue LEDs, orange brand stripe
  ═══════════════════════════════════════════════════════════ */
  if (type === "apex") return (
    <svg width={w} height={h} viewBox="0 0 400 180"
         preserveAspectRatio="xMidYMid slice"
         style={{ display:"block", flexShrink:0 }}>
      <defs>
        <linearGradient id="a-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#050D1E"/>
          <stop offset="60%" stopColor="#0A1830"/>
          <stop offset="100%" stopColor="#0F2248"/>
        </linearGradient>
        <linearGradient id="a-floor" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#121E38"/>
          <stop offset="100%" stopColor="#0A1428"/>
        </linearGradient>
        <linearGradient id="a-glass" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#1B4080" stopOpacity="0.35"/>
          <stop offset="100%" stopColor="#0A1830" stopOpacity="0.05"/>
        </linearGradient>
        <radialGradient id="a-glow1" cx="50%" cy="100%" r="50%">
          <stop offset="0%" stopColor="#1E6BFF" stopOpacity="0.22"/>
          <stop offset="100%" stopColor="#1E6BFF" stopOpacity="0"/>
        </radialGradient>
        <radialGradient id="a-glow2" cx="50%" cy="100%" r="40%">
          <stop offset="0%" stopColor="#FF4F28" stopOpacity="0.15"/>
          <stop offset="100%" stopColor="#FF4F28" stopOpacity="0"/>
        </radialGradient>
      </defs>

      {/* Sky */}
      <rect width="400" height="180" fill="url(#a-sky)"/>

      {/* Stars */}
      {[[22,14],[60,8],[98,20],[150,6],[200,15],[255,9],[300,18],[340,5],[370,22],[40,32],[120,28],[280,30],[360,12]].map(([x,y],i)=>(
        <circle key={i} cx={x} cy={y} r={i%3===0?1.2:0.7} fill="#fff" opacity={0.4+Math.random()*0.4}/>
      ))}

      {/* Full-width floor-to-ceiling glass wall — window frames */}
      {[0,1,2,3,4,5].map(i=>(
        <rect key={i} x={i*68} y="0" width="66" height="118" rx="0"
              fill="url(#a-glass)" stroke="#1E4080" strokeWidth="1.5" opacity="0.6"/>
      ))}
      {/* Horizontal glass rail */}
      <rect x="0" y="58" width="400" height="2" fill="#1E4080" opacity="0.4"/>

      {/* City skyline silhouette */}
      <rect x="0"   y="62" width="18" height="56" fill="#060E20"/>
      <rect x="20"  y="45" width="14" height="73" fill="#060E20"/>
      <rect x="36"  y="70" width="20" height="48" fill="#060E20"/>
      <rect x="58"  y="52" width="10" height="66" fill="#060E20"/>
      <rect x="70"  y="40" width="22" height="78" fill="#060E20"/>
      <rect x="94"  y="68" width="16" height="50" fill="#060E20"/>
      <rect x="112" y="55" width="28" height="63" fill="#060E20"/>
      <rect x="142" y="35" width="12" height="83" fill="#060E20"/>
      <rect x="156" y="60" width="24" height="58" fill="#060E20"/>
      <rect x="182" y="48" width="18" height="70" fill="#060E20"/>
      <rect x="202" y="72" width="30" height="46" fill="#060E20"/>
      <rect x="234" y="44" width="14" height="74" fill="#060E20"/>
      <rect x="250" y="62" width="22" height="56" fill="#060E20"/>
      <rect x="274" y="38" width="16" height="80" fill="#060E20"/>
      <rect x="292" y="58" width="26" height="60" fill="#060E20"/>
      <rect x="320" y="50" width="12" height="68" fill="#060E20"/>
      <rect x="334" y="66" width="20" height="52" fill="#060E20"/>
      <rect x="356" y="44" width="16" height="74" fill="#060E20"/>
      <rect x="374" y="70" width="26" height="48" fill="#060E20"/>
      {/* Building windows (lights on) */}
      {[[24,52],[24,60],[26,68],[72,48],[72,56],[114,62],[114,70],[144,42],[144,50],[160,65],[184,55],[236,50],[276,45],[276,53],[294,64],[322,58]].map(([x,y],i)=>(
        <rect key={i} x={x} y={y} width="4" height="4" rx="0.5"
              fill="#F59E0B" opacity={0.5+i%3*0.15}/>
      ))}

      {/* Ambient LED glow from machines */}
      <rect width="400" height="180" fill="url(#a-glow1)"/>

      {/* Gym floor */}
      <rect x="0" y="118" width="400" height="62" fill="url(#a-floor)"/>
      {/* Floor lane lines */}
      {[0,1,2,3,4,5,6,7,8,9].map(i=>(
        <line key={i} x1={i*44} y1="118" x2={i*44} y2="180"
              stroke="#1E3A6A" strokeWidth="0.6" opacity="0.4"/>
      ))}
      {/* Floor LED strip */}
      <rect x="0" y="118" width="400" height="2" fill="#1E6BFF" opacity="0.7"/>
      <rect x="0" y="118" width="400" height="1" fill="#6AAEFF" opacity="0.8"/>

      {/* ── Treadmill 1 ── */}
      <rect x="14"  y="96" width="58" height="30" rx="5" fill="#0E1C36"/>
      <rect x="18"  y="99" width="50" height="18" rx="3" fill="#0A1428"/>
      <rect x="20"  y="101" width="22" height="10" rx="2" fill="#122040"/>
      <rect x="21"  y="102" width="8"  height="4"  rx="1" fill="#1E6BFF" opacity="0.8"/>
      <rect x="31"  y="102" width="10" height="2"  rx="1" fill="#1E6BFF" opacity="0.4"/>
      <rect x="46"  y="100" width="16" height="6"  rx="1" fill="#FF4F28" opacity="0.7"/>
      <rect x="22"  y="120" width="46" height="5"  rx="2" fill="#080E1C"/>
      <rect x="14"  y="88"  width="4"  height="18" rx="2" fill="#122040"/>
      <rect x="68"  y="88"  width="4"  height="18" rx="2" fill="#122040"/>
      <rect x="14"  y="86"  width="58" height="4"  rx="2" fill="#0E1C36"/>

      {/* ── Treadmill 2 ── */}
      <rect x="84"  y="96" width="58" height="30" rx="5" fill="#0E1C36"/>
      <rect x="88"  y="99" width="50" height="18" rx="3" fill="#0A1428"/>
      <rect x="90"  y="101" width="22" height="10" rx="2" fill="#122040"/>
      <rect x="91"  y="102" width="8"  height="4"  rx="1" fill="#1E6BFF" opacity="0.6"/>
      <rect x="101" y="102" width="10" height="2"  rx="1" fill="#1E6BFF" opacity="0.3"/>
      <rect x="116" y="100" width="16" height="6"  rx="1" fill="#FF4F28" opacity="0.5"/>
      <rect x="92"  y="120" width="46" height="5"  rx="2" fill="#080E1C"/>
      <rect x="84"  y="88"  width="4"  height="18" rx="2" fill="#122040"/>
      <rect x="138" y="88"  width="4"  height="18" rx="2" fill="#122040"/>
      <rect x="84"  y="86"  width="58" height="4"  rx="2" fill="#0E1C36"/>

      {/* ── Cable crossover machine (centre) ── */}
      <rect x="174" y="54" width="52" height="74" rx="4" fill="#0C1830"/>
      <rect x="178" y="58" width="8"  height="66" rx="3" fill="#142240" stroke="#1E3A6A" strokeWidth="0.8"/>
      <rect x="214" y="58" width="8"  height="66" rx="3" fill="#142240" stroke="#1E3A6A" strokeWidth="0.8"/>
      {/* Pulley wheels */}
      <circle cx="182" cy="62" r="5" fill="#1A3060" stroke="#2A4A90" strokeWidth="1"/>
      <circle cx="218" cy="62" r="5" fill="#1A3060" stroke="#2A4A90" strokeWidth="1"/>
      {/* Cable lines */}
      <line x1="182" y1="67" x2="200" y2="95" stroke="#8AAAD0" strokeWidth="1.2" opacity="0.7"/>
      <line x1="218" y1="67" x2="200" y2="95" stroke="#8AAAD0" strokeWidth="1.2" opacity="0.7"/>
      {/* Weight stack */}
      {[0,1,2,3,4,5].map(i=>(
        <rect key={i} x="192" y={98+i*5} width="16" height="4" rx="1"
              fill={i<3?"#1E6BFF":"#1A3060"} opacity={i<3?0.8:0.4}/>
      ))}
      {/* APEX badge */}
      <rect x="183" y="54" width="34" height="16" rx="3" fill="#FF4F28" opacity="0.9"/>
      <text x="200" y="65" textAnchor="middle" fill="#fff"
            fontSize="8" fontWeight="bold" fontFamily="Arial,sans-serif">APEX</text>

      {/* ── Elliptical machine ── */}
      <rect x="246" y="88" width="52" height="36" rx="5" fill="#0E1C36"/>
      <ellipse cx="272" cy="100" rx="20" ry="10" fill="none" stroke="#1E3A6A" strokeWidth="2"/>
      <rect x="258" y="88" width="4"  height="26" rx="2" fill="#122040"/>
      <rect x="282" y="88" width="4"  height="26" rx="2" fill="#122040"/>
      <rect x="258" y="84" width="28" height="6"  rx="2" fill="#0E1C36"/>
      <rect x="250" y="120" width="44" height="4" rx="2" fill="#080E1C"/>

      {/* ── Dumbbell rack ── */}
      <rect x="318" y="100" width="70" height="28" rx="4" fill="#0C1830"/>
      <rect x="318" y="100" width="70" height="4"  rx="2" fill="#142240"/>
      {[0,1,2,3].map(i=>(
        <g key={i}>
          <ellipse cx={328+i*16} cy="110" rx="5" ry="8"
                   fill="#1A3060" stroke="#2A5090" strokeWidth="0.8"/>
          <ellipse cx={328+i*16} cy="120" rx="5" ry="8"
                   fill="#1A3060" stroke="#2A5090" strokeWidth="0.8"/>
          <rect    x={325+i*16}  y="110" width="6" height="10" rx="1" fill="#0E1C36"/>
        </g>
      ))}

      {/* Orange brand stripe bottom */}
      <rect x="0" y="173" width="400" height="7" fill="#FF4F28" opacity="0.85"/>
      <rect x="0" y="173" width="400" height="2" fill="#FF7043" opacity="0.6"/>
    </svg>
  );

  /* ═══════════════════════════════════════════════════════════
     IRONFORGE GYM — Lekki Phase 1
     Scene: gritty industrial warehouse, centre-stage power rack
     loaded with plates, dramatic overhead spotlight, exposed brick,
     chalk dust haze, amber/purple colour story
  ═══════════════════════════════════════════════════════════ */
  if (type === "iron") return (
    <svg width={w} height={h} viewBox="0 0 400 180"
         preserveAspectRatio="xMidYMid slice"
         style={{ display:"block", flexShrink:0 }}>
      <defs>
        <linearGradient id="i-bg" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0C0A14"/>
          <stop offset="100%" stopColor="#18142A"/>
        </linearGradient>
        <linearGradient id="i-floor" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#1A1628"/>
          <stop offset="100%" stopColor="#0E0C1A"/>
        </linearGradient>
        <radialGradient id="i-spot1" cx="50%" cy="0%" r="55%">
          <stop offset="0%" stopColor="#F59E0B" stopOpacity="0.30"/>
          <stop offset="70%" stopColor="#F59E0B" stopOpacity="0.06"/>
          <stop offset="100%" stopColor="#F59E0B" stopOpacity="0"/>
        </radialGradient>
        <radialGradient id="i-spot2" cx="18%" cy="0%" r="30%">
          <stop offset="0%" stopColor="#7C3AED" stopOpacity="0.18"/>
          <stop offset="100%" stopColor="#7C3AED" stopOpacity="0"/>
        </radialGradient>
        <radialGradient id="i-spot3" cx="82%" cy="0%" r="30%">
          <stop offset="0%" stopColor="#7C3AED" stopOpacity="0.15"/>
          <stop offset="100%" stopColor="#7C3AED" stopOpacity="0"/>
        </radialGradient>
      </defs>

      {/* Dark background */}
      <rect width="400" height="180" fill="url(#i-bg)"/>

      {/* Spotlights */}
      <rect width="400" height="180" fill="url(#i-spot1)"/>
      <rect width="400" height="180" fill="url(#i-spot2)"/>
      <rect width="400" height="180" fill="url(#i-spot3)"/>

      {/* Exposed brick back wall */}
      {[0,1,2,3,4,5,6].map(row=>(
        [0,1,2,3,4,5,6,7,8,9].map(col=>(
          <rect key={`${row}-${col}`}
                x={col*44+(row%2===0?0:22)} y={row*20}
                width="41" height="17" rx="1.5"
                fill="#1A1226" stroke="#241A38" strokeWidth="0.8" opacity="0.7"/>
        ))
      ))}

      {/* Ceiling beam structure */}
      <rect x="0"   y="0" width="400" height="8"  fill="#0A0814"/>
      <rect x="0"   y="0" width="400" height="3"  fill="#140E22"/>
      {[0,55,110,165,220,275,330,385].map(x=>(
        <rect key={x} x={x} y="0" width="10" height="36" rx="2"
              fill="#0E0C1A" stroke="#1E1830" strokeWidth="0.6"/>
      ))}
      {/* Crossbeam */}
      <rect x="0" y="34" width="400" height="5" fill="#12101E" stroke="#1E1830" strokeWidth="0.5"/>

      {/* Hanging industrial lights */}
      {[80,200,320].map(x=>(
        <g key={x}>
          <line x1={x} y1="8" x2={x} y2="26" stroke="#2A2040" strokeWidth="2"/>
          <rect x={x-14} y="24" width="28" height="10" rx="3" fill="#1A1530"/>
          <ellipse cx={x} cy="29" rx="10" ry="4" fill="#F59E0B" opacity="0.95"/>
          <ellipse cx={x} cy="29" rx="7" ry="2.5" fill="#FFF" opacity="0.4"/>
          <ellipse cx={x} cy="46" rx="36" ry="16" fill="#F59E0B" opacity="0.06"/>
        </g>
      ))}

      {/* Gym floor — black rubber */}
      <rect x="0" y="118" width="400" height="62" fill="url(#i-floor)"/>
      {/* Rubber tile grid */}
      {[0,1,2,3,4,5,6,7,8,9].map(i=>(
        <rect key={i} x={i*40} y="118" width="40" height="62"
              fill="none" stroke="#7C3AED" strokeWidth="0.5" opacity="0.18"/>
      ))}
      {/* Chalk haze on floor */}
      <rect x="120" y="130" width="160" height="20" rx="10"
            fill="#FFFFFF" opacity="0.02"/>

      {/* Floor accent stripe */}
      <rect x="0" y="118" width="400" height="3" fill="#7C3AED" opacity="0.7"/>
      <rect x="0" y="118" width="400" height="1" fill="#A060FF" opacity="0.6"/>

      {/* ═══ CENTRE: Power Rack ═══ */}
      {/* Rack body */}
      <rect x="152" y="42" width="96" height="82" rx="3" fill="#14102A"/>
      {/* Left upright */}
      <rect x="156" y="42" width="10" height="82" rx="2"
            fill="#1E1A36" stroke="#2E2850" strokeWidth="1"/>
      {/* Right upright */}
      <rect x="234" y="42" width="10" height="82" rx="2"
            fill="#1E1A36" stroke="#2E2850" strokeWidth="1"/>
      {/* Safety bars */}
      <rect x="156" y="58"  width="88" height="6" rx="2" fill="#2A2448" stroke="#3A3460" strokeWidth="0.7"/>
      <rect x="156" y="80"  width="88" height="6" rx="2" fill="#2A2448" stroke="#3A3460" strokeWidth="0.7"/>
      <rect x="156" y="102" width="88" height="6" rx="2" fill="#2A2448" stroke="#3A3460" strokeWidth="0.7"/>
      {/* J-hooks */}
      <rect x="162" y="74" width="8" height="8" rx="1" fill="#3A3060"/>
      <rect x="230" y="74" width="8" height="8" rx="1" fill="#3A3060"/>

      {/* ═══ Barbell ═══ */}
      {/* Bar */}
      <rect x="86" y="77" width="228" height="8" rx="4" fill="#B8B8C0"/>
      <rect x="86" y="78" width="228" height="4" rx="2" fill="#D0D0D8"/>
      {/* Knurling marks */}
      {[0,1,2,3,4,5,6,7].map(i=>(
        <line key={i} x1={176+i*8} y1="77" x2={176+i*8} y2="85"
              stroke="#909098" strokeWidth="0.8" opacity="0.5"/>
      ))}
      {/* Left collar */}
      <rect x="130" y="74" width="8" height="14" rx="2" fill="#C0C0C8"/>
      {/* Right collar */}
      <rect x="262" y="74" width="8" height="14" rx="2" fill="#C0C0C8"/>

      {/* Left plates — big stack */}
      <rect x="100" y="66" width="32" height="30" rx="4" fill="#7C3AED"/>
      <rect x="100" y="70" width="32" height="22" rx="3" fill="#6D28D9"/>
      <rect x="92"  y="69" width="16" height="24" rx="3" fill="#5B21B6"/>
      <rect x="86"  y="71" width="12" height="20" rx="2.5" fill="#4C1D95"/>
      {/* Plate shine */}
      <rect x="100" y="66" width="4"  height="30" rx="2" fill="#9060FF" opacity="0.35"/>

      {/* Right plates */}
      <rect x="268" y="66" width="32" height="30" rx="4" fill="#7C3AED"/>
      <rect x="268" y="70" width="32" height="22" rx="3" fill="#6D28D9"/>
      <rect x="292" y="69" width="16" height="24" rx="3" fill="#5B21B6"/>
      <rect x="302" y="71" width="12" height="20" rx="2.5" fill="#4C1D95"/>
      <rect x="296" y="66" width="4"  height="30" rx="2" fill="#9060FF" opacity="0.35"/>

      {/* ═══ LEFT: Dumbbell rack ═══ */}
      <rect x="8" y="96" width="120" height="28" rx="4" fill="#110E20"/>
      <rect x="8" y="96" width="120" height="5"  rx="2" fill="#1A1630"/>
      {[0,1,2,3,4,5].map(i=>(
        <g key={i}>
          <ellipse cx={20+i*19} cy="106" rx="6"  ry="9"  fill="#1E1A34" stroke="#7C3AED" strokeWidth="0.9"/>
          <ellipse cx={20+i*19} cy="117" rx="6"  ry="9"  fill="#1E1A34" stroke="#7C3AED" strokeWidth="0.9"/>
          <rect    x={17+i*19}  y="106" width="6" height="11" rx="1" fill="#14101E"/>
          <text    x={20+i*19}  y="113" textAnchor="middle"
                   fill="#7C3AED" fontSize="4" fontFamily="Arial" opacity="0.7">{(i+1)*5}</text>
        </g>
      ))}

      {/* ═══ RIGHT: Punching bag + motivation wall ═══ */}
      {/* Chain */}
      <line x1="362" y1="8" x2="362" y2="32" stroke="#2A2448" strokeWidth="2.5"/>
      <line x1="362" y1="32" x2="362" y2="44" stroke="#3A3460" strokeWidth="2"/>
      {/* Bag */}
      <rect x="344" y="44" width="36" height="64" rx="18" fill="#D97706"/>
      <rect x="344" y="44" width="36" height="64" rx="18" fill="none"
            stroke="#F59E0B" strokeWidth="1.5"/>
      <rect x="344" y="56" width="36" height="5"  fill="#B45309" opacity="0.6"/>
      <rect x="344" y="72" width="36" height="5"  fill="#B45309" opacity="0.6"/>
      <rect x="344" y="88" width="36" height="5"  fill="#B45309" opacity="0.5"/>
      {/* Chain links at bottom */}
      <line x1="362" y1="108" x2="358" y2="118" stroke="#3A3460" strokeWidth="2"/>
      <line x1="358" y1="118" x2="366" y2="118" stroke="#3A3460" strokeWidth="1.5"/>

      {/* Motivational wall text */}
      <text x="200" y="17" textAnchor="middle"
            fill="#F59E0B" fontSize="11" fontWeight="bold"
            fontFamily="Arial,sans-serif" opacity="0.85">IRONFORGE</text>
      <text x="200" y="28" textAnchor="middle"
            fill="#FFFFFF" fontSize="6"
            fontFamily="Arial,sans-serif" opacity="0.4">NO EXCUSES · LEKKI PHASE 1</text>
    </svg>
  );

  /* ═══════════════════════════════════════════════════════════
     ZENFLEX STUDIO — Ikeja GRA
     Scene: serene Zen studio — arched floor-to-ceiling windows
     with morning mist, warm wooden floor, yoga mats in rows,
     hanging rattan pendants, lush tropical plants, meditation figure
  ═══════════════════════════════════════════════════════════ */
  return (
    <svg width={w} height={h} viewBox="0 0 400 180"
         preserveAspectRatio="xMidYMid slice"
         style={{ display:"block", flexShrink:0 }}>
      <defs>
        <linearGradient id="z-bg" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0B2A1E"/>
          <stop offset="100%" stopColor="#0E3828"/>
        </linearGradient>
        <linearGradient id="z-floor" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#1A4A32"/>
          <stop offset="100%" stopColor="#0D2E1E"/>
        </linearGradient>
        <linearGradient id="z-win" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#A8E6C8" stopOpacity="0.45"/>
          <stop offset="60%" stopColor="#3CAB7A" stopOpacity="0.18"/>
          <stop offset="100%" stopColor="#0E3828" stopOpacity="0.0"/>
        </linearGradient>
        <radialGradient id="z-sun" cx="30%" cy="0%" r="50%">
          <stop offset="0%" stopColor="#B8F5DA" stopOpacity="0.22"/>
          <stop offset="100%" stopColor="#06D6A0" stopOpacity="0"/>
        </radialGradient>
        <linearGradient id="z-plank" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#1E5A3A"/>
          <stop offset="50%" stopColor="#245E3E"/>
          <stop offset="100%" stopColor="#1A5236"/>
        </linearGradient>
      </defs>

      {/* Background wall */}
      <rect width="400" height="180" fill="url(#z-bg)"/>
      {/* Sun haze */}
      <rect width="400" height="180" fill="url(#z-sun)"/>

      {/* Subtle wall texture — limewash panels */}
      {[0,1,2,3,4,5].map(i=>(
        <rect key={i} x={i*68} y="0" width="66" height="120"
              fill="none" stroke="#0D3322" strokeWidth="0.5" opacity="0.4"/>
      ))}

      {/* ── Left arched window ── */}
      <rect x="16" y="8" width="86" height="95" rx="43" fill="url(#z-win)"/>
      <rect x="18" y="8" width="82" height="93" rx="41"
            fill="none" stroke="#06D6A0" strokeWidth="1.2" opacity="0.55"/>
      {/* Window cross bar */}
      <line x1="59" y1="8" x2="59" y2="103" stroke="#06D6A0" strokeWidth="0.6" opacity="0.3"/>
      <line x1="16" y1="55" x2="102" y2="55" stroke="#06D6A0" strokeWidth="0.6" opacity="0.3"/>
      {/* Light rays */}
      {[-24,-12,0,12,24].map((dx,i)=>(
        <line key={i} x1={59+dx} y1="8"
              x2={59+dx*2.5} y2="110"
              stroke="#C0F0DC" strokeWidth="2" opacity={0.03+i*0.005}/>
      ))}
      {/* Landscape through window — misty hills */}
      <path d="M18 100 Q35 72 52 85 Q65 60 78 78 Q90 68 102 80 L102 103 L18 103Z"
            fill="#062018" opacity="0.55"/>
      <path d="M18 103 Q40 88 60 95 Q80 82 102 92 L102 103Z"
            fill="#04160E" opacity="0.7"/>

      {/* ── Right tall window ── */}
      <rect x="298" y="8" width="86" height="100" rx="43" fill="url(#z-win)" opacity="0.75"/>
      <rect x="300" y="8" width="82" height="98"  rx="41"
            fill="none" stroke="#06D6A0" strokeWidth="0.9" opacity="0.4"/>
      <line x1="341" y1="8"  x2="341" y2="108" stroke="#06D6A0" strokeWidth="0.5" opacity="0.25"/>
      <line x1="298" y1="55" x2="384" y2="55"  stroke="#06D6A0" strokeWidth="0.5" opacity="0.25"/>
      <path d="M300 105 Q320 78 340 90 Q356 68 384 85 L384 108 L300 108Z"
            fill="#062018" opacity="0.45"/>

      {/* ── Wooden floor ── */}
      <rect x="0" y="116" width="400" height="64" fill="url(#z-floor)"/>
      {/* Planks */}
      {[0,1,2,3,4,5,6,7,8].map(i=>(
        <rect key={i} x={0} y={116+i*8} width="400" height="7.5"
              fill={i%2===0?"#1E5038":"#1A4832"} opacity="0.9"/>
      ))}
      {/* Plank seams */}
      {[80,160,240,320].map(x=>(
        <line key={x} x1={x} y1="116" x2={x+30} y2="180"
              stroke="#0A2416" strokeWidth="0.8" opacity="0.5"/>
      ))}
      {/* Floor accent */}
      <rect x="0" y="116" width="400" height="2" fill="#06D6A0" opacity="0.5"/>

      {/* ── Yoga mats ── */}
      {[30,108,186,264,342].map((x,i)=>(
        <g key={x}>
          <rect x={x}   y="122" width="62" height="20" rx="4"
                fill={["#00A86B","#7C3AED","#1E6BFF","#F59E0B","#FF4F28"][i]}
                opacity="0.28"/>
          <rect x={x+2} y="124" width="58" height="16" rx="3"
                fill="none"
                stroke={["#06D6A0","#9B6FFF","#5A9FFF","#FCD34D","#FF7A58"][i]}
                strokeWidth="1" opacity="0.5"/>
          {/* Mat texture lines */}
          {[0,1,2,3].map(j=>(
            <line key={j} x1={x+10+j*12} y1="124" x2={x+10+j*12} y2="140"
                  stroke={["#06D6A0","#9B6FFF","#5A9FFF","#FCD34D","#FF7A58"][i]}
                  strokeWidth="0.5" opacity="0.3"/>
          ))}
        </g>
      ))}

      {/* ── Left tropical plant (Monstera) ── */}
      {/* Pot */}
      <rect x="2" y="104" width="22" height="18" rx="4" fill="#1A4830"/>
      <rect x="4" y="102" width="18" height="6"  rx="2" fill="#245E3C"/>
      {/* Stems */}
      <line x1="13" y1="100" x2="8"  y2="72" stroke="#0D3A1E" strokeWidth="2"/>
      <line x1="13" y1="95"  x2="22" y2="68" stroke="#0D3A1E" strokeWidth="2"/>
      <line x1="13" y1="90"  x2="5"  y2="62" stroke="#0D3A1E" strokeWidth="1.5"/>
      {/* Leaves */}
      <path d="M8 72 Q-8 58 2 46 Q18 54 8 72Z"  fill="#06D6A0" opacity="0.75"/>
      <path d="M22 68 Q38 52 28 40 Q14 48 22 68Z" fill="#00A86B" opacity="0.7"/>
      <path d="M5 62 Q-6 48 4 38 Q16 46 5 62Z"   fill="#06D6A0" opacity="0.6"/>
      {/* Leaf splits */}
      <path d="M1 50 Q6 56 8 65"  stroke="#0A3A20" strokeWidth="0.8" fill="none" opacity="0.5"/>
      <path d="M25 46 Q22 54 22 64" stroke="#0A3A20" strokeWidth="0.8" fill="none" opacity="0.5"/>

      {/* ── Right palm ── */}
      <rect x="376" y="104" width="22" height="18" rx="4" fill="#1A4830"/>
      <rect x="378" y="102" width="18" height="6"  rx="2" fill="#245E3C"/>
      <line x1="387" y1="100" x2="392" y2="72" stroke="#0D3A1E" strokeWidth="2"/>
      <line x1="387" y1="95"  x2="378" y2="68" stroke="#0D3A1E" strokeWidth="2"/>
      <line x1="387" y1="90"  x2="395" y2="62" stroke="#0D3A1E" strokeWidth="1.5"/>
      <path d="M392 72 Q408 58 398 46 Q382 54 392 72Z" fill="#06D6A0" opacity="0.75"/>
      <path d="M378 68 Q362 52 372 40 Q386 48 378 68Z" fill="#00A86B" opacity="0.7"/>
      <path d="M395 62 Q406 48 396 38 Q384 46 395 62Z" fill="#06D6A0" opacity="0.6"/>

      {/* ── Rattan pendant lights ── */}
      {[140,200,260].map(x=>(
        <g key={x}>
          <line x1={x} y1="0" x2={x} y2="18" stroke="#1A4830" strokeWidth="1.2"/>
          {/* Rattan shade */}
          <path d={`M${x-12} 18 Q${x} 38 ${x+12} 18Z`}
                fill="#2A6040" stroke="#06D6A0" strokeWidth="0.8" opacity="0.8"/>
          <path d={`M${x-10} 22 Q${x} 36 ${x+10} 22`}
                stroke="#06D6A0" strokeWidth="0.5" fill="none" opacity="0.3"/>
          {/* Light glow */}
          <ellipse cx={x} cy="32" rx="22" ry="10" fill="#06D6A0" opacity="0.07"/>
        </g>
      ))}

      {/* ── Meditation figure (seated lotus, centre) ── */}
      {/* Mat highlight */}
      <ellipse cx="200" cy="135" rx="34" ry="8" fill="#06D6A0" opacity="0.12"/>
      {/* Body */}
      <ellipse cx="200" cy="124" rx="16" ry="12" fill="#06D6A0" opacity="0.55"/>
      {/* Head */}
      <circle  cx="200" cy="108" r="9"   fill="#06D6A0" opacity="0.65"/>
      {/* Arms */}
      <line x1="186" y1="122" x2="174" y2="130"
            stroke="#06D6A0" strokeWidth="3" strokeLinecap="round" opacity="0.55"/>
      <line x1="214" y1="122" x2="226" y2="130"
            stroke="#06D6A0" strokeWidth="3" strokeLinecap="round" opacity="0.55"/>
      {/* Hands resting on knees */}
      <circle cx="174" cy="131" r="3.5" fill="#06D6A0" opacity="0.5"/>
      <circle cx="226" cy="131" r="3.5" fill="#06D6A0" opacity="0.5"/>

      {/* ZenFlex wordmark */}
      <rect x="144" y="12" width="112" height="32" rx="6"
            fill="#00A86B" opacity="0.18"/>
      <text x="200" y="25" textAnchor="middle"
            fill="#06D6A0" fontSize="12" fontWeight="bold"
            fontFamily="Arial,sans-serif" opacity="0.9">ZENFLEX</text>
      <text x="200" y="37" textAnchor="middle"
            fill="#FFFFFF" fontSize="6.5"
            fontFamily="Arial,sans-serif" opacity="0.55">WELLNESS STUDIO · IKEJA GRA</text>
    </svg>
  );
};

const TrainerAvatar = ({ seed=1, size=56 }) => {
  const imgs = {
    1: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAUDBAQEAwUEBAQFBQUGBwwIBwcHBw8LCwkMEQ8SEhEPERETFhwXExQaFRERGCEYGh0dHx8fExciJCIeJBweHx7/2wBDAQUFBQcGBw4ICA4eFBEUHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh7/wAARCADIAKUDASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwD7LooooAKKKKACiivHPHHxu0/4f/FC+8OeMbO7g0qWzgudNvLeAyZzuEgcA5PzDgjOMc9aAPY6K8F179qn4cWVux0y31rVZ8fKkdr5Kk+7SEY/AGvFPH/7Tvj/AMQeZbaELbw1ZtkD7N+9uCPeVhgH/dUfWnYD7M8VeK/DfhWz+2eItbsNLhxkG5mCFv8AdHVvwBrxbxb+1Z4F013i0HTtU16RTgSKgt4T/wACf5v/AB2vjLUr++1O+e+1K8ub27kOXnuJWkkb6sxJqtTsK59Ian+1z4tkkb+zPCuiWsefl+0SyzN+hQVWsv2tvHUcoN54c8OXMeeVjE0R/Pe38q+dXkROpyfQDJqJrtF6xyD6iiyA+7fhd+0z4K8WXsOla5DL4Y1KZgsQu5A9tKx6BZhgAn0cL+Ne51+UAmgnUxseG4ww619e/sS/FS/1Zbn4ceIbt7m4sIPP0q4lbLtApAaIk9dmVK99pI/hFJoLn1FRRRSGFFFFABRRRQAUUUUAFFFFABRRVDxDq9hoGhXutapOtvZWUDTzyH+FVGT9T6DuaAMz4g+NPDvgTw/JrfiS/W1tlO2NAN0kz9kjXqzH/wCucDmvh349fGS/+KN3DAdHstP0uzkLWqlBJc88EtL2z3VeOmc4BrnvjD8QtX+JHjCfW9RZ4rVSUsLPdlbaHPA/3j1Y9z7AVxlUkIKKKKYgooooAOntVWe8UEqi7vc9KS/mx+6U/wC9/hVeCLzCSeFFADZHV+dgU/7NaHh/Xda0HVo9V0LUrrTtQjRo0uLZ9sgVhggHtkcVXaCMjgEe+aZax7bsK3YE0gPQNB+KnxO0e7W7t/HuvySg7itxeNPGfqkm4H8q+qP2dv2g4vG99F4X8WQ29jrzj/RbiL5Ybwgcrg/ckwM4yQecY6V8TBlJwGBx6Gpbaea1uYrm2mkhnhcSRyRttZGByGB7EEA5p2GfqpRXz78F/wBpLwzrHh+Gy8c3yaTrlugSSd428m8x0dSoO1z3Q9+meg920TUYNX0q31K2juI4Lhd8YnhaJyueCUYAjI5wQDgioGXKKKKACiiigAooooAK8H/bTv8AU3+H+keFtIilmu/EGrxWoij6yhQXCfi+z8q94rwj9rXxlo3hbTdGuYbhJPFdrNLNpMAwxhLwvE07jsFD5X1cDsDhoD5C+I2i6b4b8SyeHrC8+3T6ciw6hdKf3cl11lWMf3EJ2A9SVJ74rm6aZvMmYF2d+WZicknPOT3NOqiQooqGe4SLj7zelAErsqKWY4AqulxuEkx4ReFHqaqSSSTOAcsScKoH8quabZyXsU7cpa2cJmnf07AfVmwBSckldlRi5OyKDEsxY8kmu4sPh34mktkdre2hyM7ZJwG59hmqPwu0Jta8TRSSx7rSyInmPYkfdX8T+gNe8152MxkqMlGG56+XZdHEQc6l7dDwrVfB3iPTYzLPpzyRr1eBhIB+XP6VzN0CGUrnJyOK+m65Pxn4KsNbje6tUjtdRAJWQDCyH0cf16/Ws6OZXdqi+Zricmsuai7+TPC4d0c68EHIrUqtfWs9prDWl1E0U0T7XRuoIqzXqp32PCaadmdR8MvHOtfD/wAVW+v6NLkxsBcW7cpcxZ+ZGH8j1B5r9ItA1O11rQ7HWLFi1rfW8dxCT1KOoYZ98GvzC0ewfUria3jbEiWs1wg/vGKMyFfxVW/HFfpD8INMn0b4W+F9Lusie20q3SQHqreWCR+BOKGCOqoooqRhRRRQAUUUUAFeaeJPgR8LvEOtzaxqvhozXlw5edlvZ0EjepAfFel0UAfnV+014TsfBXxu1HStJ06LT9KntoJ7KGJcIqGMKcf8DR/xrzlG3SSeikCvuD9sj4V3XjjwjB4j0G2M2vaGrMIkGXubY8vGPVlI3KO/zDqa+F7KTIlLdc7jVIQ68uCn7tPvdz6VteD/AAPq3iJVuRi0sSf+PiUZ3/7i/wAX14HvVXwJo6+IPFVtZTgmDJlnx3ReSPxOB+Neyan4t8OaNJ9ilu13xAJ5NvGX2Y/h44GPSuLFYicXyU1dnpYHCU6i9rWdo/dc42bwmse7SPDVpKpIK32s3qlQi90jzj8Sv0z1NZV3aLqvleDfB0RmsoZBJfXzcLNIONzH+6Ow79q6rU/FPgrWsR6lcakYjwYm81Ym+qqea6Tw3qHhuS3W00K4sVQciCHCH67TgmuN1atNXlF389vV9z0Y4ejVlywkreT1t2XbzerY/wAKaDZ+HdISwtPmOd00pGDK/cn+g7CtaiqGqa1pOl8ahqNvbtjOxn+Y/wDARzXnvmqSvu2eulCjBLZIv0Vyk3xC8MRthbm5l90t2x+uKtaV408O6lcLbw3xilc4VZ0Me4+gJ4/WreHqpXcX9xmsXQk7Ka+88v8Ai0fL+INw56eVCf8AxwVi12Pxw09YNZ0/VQQRcRmF1PqnOfybH4VzGhaVeatq1npGlwPcXl5MsFvCD952OAPb69hXv4SSlRi12PlMfBwxE0+/56nr37Hvg8+J/iqL26tVn0vSbSSS6DrlHaRTGiH1zuY49FNfeA4rhPgd8O7H4a+BrfRYWSe+lPn6hdKMedMQM4/2VHyqPQZ6k13dbM5QooopAFFFFABRRRQAUUUUABr85/2oPAj/AA/+LmoxW8BTSdW3X1gQPlCuT5kY/wBx88ehX1r9GDXxd+0mL/x/qOpszFpNNmkGnxn+FVJBQDtuAyT3OPSsateNJrm6nTh8LPEKXL0VzyT4H2vn6jq0gdo2FosQdPvLubqPf5a79vC/hWztlWXSrUqSEDSAvJIx6D1Zj6Dk1xnwEI8zWV/i2wnHtl6+mPhz4d0u88I6/qunTpd+LTZyw2kDHD20eOfKHXdIMguOeg4xz52I55YiUU7f8MezhHTp4OM5Rvrb72fP+p+FPCjzRxPpWs6c8ozGy28qhxnGQrAkjPcCtDwt4L0jSNQTVLa6nu3VWWIybdq54J4HXqPbmub8aeJ/Hni7VdG0fVo5DLoubXT4orfa0SkgYLAZY4VRk9cdMk19A/EXwnd6Jpnh3WLuMRXd/YJFqSYwTcoow5H94ocMe5QZ5rF1KjjJKbaN4U6KqRcoJSb/ACONrl/Fng7SdbvP7Surma0kWMLI6FQpUdCc9MetdRXa/Bvw2niDxeJpxG0OmwNcojgFWn6REg9Qp3N9VWscPz+0Sg7M6sZ7P2LdRXSPED4O8NaTFHPe6PrlzDI5jSeeB1jdwMlV+7k47DmtiLw14TvIHhTR7ZSoG9DG0cqZGRkHDDI5B79qwvivrnxFl8zwBraXK6dZag1xDa+TlvNOct5h+Y5LO3JxljjjGPcbLw1Z2vwK0K58Wzi08UWqM2n7j+/kgY/6ll6mM8tzwpwR6HbnnUbam9Fc5VGlTsnTWrtt+P8AX3nz38bohb6ZoVqJZJdjSKHkOWICqBk9z7167+w74BOoa/eePtQgzbacDa6fuHDTsP3jj/dU7fq59K8r+Ltpcar4j8P6TaLvmkWQgenzLyfYAE17p+zzqN34V8S6Z4etpi2nXX7iSMZwzEHD4/vbuc+hIrtw+IjSpQi93/mefi8HOvWqzjtFL8kfUVFAor0DxgooooAKKKKACiiigAooooAK+Y/jDoEugeNLt9hFpeu11bvjj5jll+oYn8CK+nKxfGPhrTfFOkNp2oxnAO6KVPvxP/eU/wBO9c2Koe2hZbnbgMV9Wq3ez3PhvQdJXRPiNqQiULa6pafaIQOgdXG9f/Hs/Q12aMySLIjMjqcqysVZT6gjkV1vjT4U6/4ekbVI4be9sbUMz3MbBWRCOpRuR+Ga5CvFrc6kudWZ9PhvZOD9m7q/5l8azq4uvtY1S7+0f89t/wC8/wC+8bs++c1Vvbu6un827up7mQ8bppWc8+5JqKo7gSmMGHbvU5AbofasnKT0bNo04Rd0iSnxSSROHikeNx0ZGKkfiKoxzXrsFNoI/Vmbgf41bpFtF6XV9WldHl1S9kdBhGeZmZfoxyR+BqnK8ksrTSyPLK5yzyMWZj7k8mm0U3KT3ZEacY7KxRW0tjrsuoMuZ47ZYQx/gUsWIHpnjP0Fep/AXw/Lqni5dXeMi000FyxHDSkEKv4AlvwHrVXwT8JNc11otRv/ACtPsbgLIkrMHkePA27VHTjn5vXpX0D4c0XT/D+kw6XpkPlW8Q7nLOT1Zj3J9a78JhZykpz2R5OYY+nCDp03dvf9TRooor2T5sKKKKACiiigAooooAKKKKACiiigDP8AEtj/AGn4f1DT8ZNzbSRD6lSB+tfIZDKdrghhwwPY96+zK+dfjP4MutD1241i0gZtKvJDJvUcQSMfmVvQE8g9OcV5uY0nKKmuh7WTV4xk6b67HnhzjgZNWobOR1DMDg9CpB/rVWnpJIgwkjp/unFeQrdT6MuiwHcyf+O/40yayWNCxkKgd2xUH2m5/wCfiT9P8Kjkd5Dl3Zj7mndC1GjOOcZ9qsadaSX9/b2MIJkuZVhUD1Ygf1qvXqvwL8F3d3q8Hia/gaKxtstahxgzSdAwH90cnPc4x0q6NJ1ZqKMcTXjQpubPc7K3jtLOG1iGI4Y1jQegAwP5VLRRX0p8S9QooooAKKKKACiiigAooooAKKKKACiiigApk8MVxC8M8SSxOCro6gqwPYg9afRQB8x/HDRtL8K+LobfTbd4bO4thOyhtyxOWYYA6heK41GV1DIwZT0Irvvj1eJd/EOeJWDC2tooW784LEf+PV50bNFYtA7wE9dp4P4V8ziJJVZJbXPtcHzOhByetixTZHSNC8jBVHc1D5V3jH2tfr5QzTPsCO++4lkmPucCseZHTY9j+A/gzQ/EOknxJqSPd+XcvDFbOP3YK4+Zh/F16Hj617oiqihVUKoGAAMACvL/ANm2eL/hDbyyjCq0F8zFR2DIpH8jXqNfRYKMVRi0tz4/MZzliJKT22Ciiiuo4QooooAKKKKACiiigAooooAKKKjuJ4beIyzypEg6sxwKAJKK5rUvFtpFlLKJrhv7x+Vf8TXNajrepX+RLcFIz/yzj+Vf/r/jRYLnbalr2m2JKvOJJB/yzj+Y/j2FeS+LfiZr863Kab5emxx7tpUB5Dj1J47dhWn0rz/Xrfy9Su4G4DO2Po3P9abV00CdmmzkbiaW4nkuJ5XllkYu7ucszHqSfWo6UqVJVhhlOD9RSV8e7p6n3yaa0CiiikBueDda1XRtSaTS76W2Mi/vAh4fbyMg8H/69e3+BfiC2pJJBrECxyRAfv4h8rZ9V7fhXgWgrvvJXH3Yk2k/7R7fkP1r0TwVCVtJ5yPvuFH4D/69fR5bFrDq58nm8k8U0uiR7ra3VvdRCS2mSVPVTmpq8ogmmt5BJBK8Tj+JGwa39N8W3kOEvI1uU/vD5W/wNd1jzLncUVm6brmm3+FinCSH/lnJ8rf/AF/wrSpDCiiigAooooAKbNJHDE0srqiKMszHAAp1cp8QLwrHBYo33v3jj2HA/XP5UAN1fxbgtFpsYPbzpB/If41y93dXF3L5lzM8rerHp9PSoaKYgooopiCud8YWDOq38S52jbKB6djXRUhAIIIBB4IPegDyHWLGZnNzapvY/wCsizgt7j39u9YxuoFYpKxhcdVkG0j869U1Xw2SxlsGUA8mJjjH0P8AQ1gXmlXK/LdWDsB/ej3CvOxOXQrS5ouzPWwmbToRUJq6RxTXdqoybiP/AL6zSQNc37+Vp8LEd5nGEX/GurTS7cNlNNj3e0H/ANatSy0XULjAW2MSf3pBtA/CsKeUpP35aHTUzy6tThr5mVo2neTHFZWwMkjHknq7HqTXpGn2yWdlFbJyEXBPqe5qro2kwacpYHzJmGGkI/QegrRr10lFJLY8KUpTk5S3YUUUUyQrV0vX9RsMKsvnRD/lnLyPwPUVlUUAeh6N4hstRKxE+ROf+Wbnr9D3rYrySvRvCt619o8UkjFpUzG5Pcjv+WKQzVooopDCvOPFVx9p125YHKo3lr/wHj+ea9DupRBbSzN0jQsfwGa8pd2d2djlmJY/U00JiUUUUxBRRRQAUUUUAFFFFABk+pooooAKKKKACiiigAooooAK6v4e3GJrq1J+8okH4cH+lcpWt4Rn8jX7fJ4kzGfxHH6gUhnotFFFIZkeMJ/I0C4wcGTEY/E8/pmvO67H4hT4gtbYH7zM5H0GB/OuOpoTCiiimIrl86ksfYQFj+LAf0qxVKI51y4H923T/wBCNXaACiiigAooooAKKKKACiiigAooooAr2rlri6Q/wSjH0Kg1YqjaH/ib36+0R/8AHTV6gAqWzlMF3DOOscit+RqKjrxQB62CCAQcg0VT0Sb7RpFpN3aJc/XGDRUlGP4m0K+1S/SaGWBY0jCgOTnOST2rK/4Q/Uv+e9r/AN9N/hRRRcA/4Q/Uv+e9r/303+FH/CH6l/z3tf8Avpv8KKKdxWK0fgfVV1SW6+0Wex4lQDc2cgn2qz/wh+pf897X/vpv8KKKLhYP+EP1L/nva/8AfTf4Uf8ACH6l/wA97X/vpv8ACiii4WD/AIQ/Uv8Anva/99N/hR/wh+pf897X/vpv8KKKLhYP+EP1L/nva/8AfTf4Uf8ACH6l/wA97X/vpv8ACiii4WD/AIQ/Uv8Anva/99N/hR/wh+pf897X/vpv8KKKLhYP+EP1L/nva/8AfTf4Uf8ACH6l/wA97X/vpv8ACiii4WK1v4H1WPULq4a4sysoQKAzZGBznirP/CH6l/z3tf8Avpv8KKKLhYP+EP1L/nva/wDfTf4Uf8IfqX/Pe1/76b/Ciii4WOp8P2dxYaXHaXDozxk4KEkYJyOtFFFIZ//Z",
    2: "data:image/jpeg;base64,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",
    3: "data:image/jpeg;base64,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",
    4: "data:image/jpeg;base64,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",
    5: "data:image/jpeg;base64,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",
  };
  return (
    <img
      src={imgs[seed] || imgs[1]}
      width={size} height={size}
      style={{ borderRadius:"50%", objectFit:"cover", objectPosition:"center top", flexShrink:0, display:"block" }}
      alt="trainer"
    />
  );
};

/* ── Chioma Adeyemi — App User Profile Picture ── */
const UserAvatar = ({ size=70 }) => (
  <img
    src={"data:image/jpeg;base64,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"}
    width={size} height={Math.round(size*1.4)}
    style={{ borderRadius:"50%", objectFit:"cover", objectPosition:"center top", flexShrink:0, display:"block" }}
    alt="Chioma Adeyemi"
  />
);
const HealthIllustration = ({ type, w=48, h=48 }) => {
  const configs = {
    hydration: { bg:"#EEF6FF", icon:"droplet", iconColor:C.blue },
    sleep:     { bg:"#F3EEFF", icon:"moon",    iconColor:C.purple },
    nutrition: { bg:"#E2F9F0", icon:"leaf",    iconColor:C.green },
    movement:  { bg:"#FFF0EB", icon:"run",     iconColor:C.coral },
    recovery:  { bg:"#EEF6FF", icon:"droplet", iconColor:C.blue },
    mindset:   { bg:"#FEF3C7", icon:"brain",   iconColor:C.gold },
  };
  const cfg = configs[type.toLowerCase()] || configs.hydration;
  return (
    <div style={{ width:w, height:h, borderRadius:14, background:cfg.bg, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
      <Icon name={cfg.icon} size={w*0.5} color={cfg.iconColor} />
    </div>
  );
};

const PlanBadge = ({ level }) => {
  const map = {
    Beginner:    { color:C.green,  light:C.greenL,  icon:"leaf" },
    Intermediate:{ color:C.gold,   light:C.goldL,   icon:"lightning" },
    Advanced:    { color:C.coral,  light:C.coralL,  icon:"fire" },
  };
  const c = map[level] || map.Beginner;
  return (
    <div style={{ display:"inline-flex", alignItems:"center", gap:4, background:c.light, borderRadius:20, padding:"4px 10px", border:`1px solid ${c.color}33` }}>
      <Icon name={c.icon} size={12} color={c.color}/>
      <span style={{ color:c.color, fontFamily:F.ui, fontSize:11, fontWeight:700 }}>{level}</span>
    </div>
  );
};

/* ─── DATA ─────────────────────────────────────────────────────── */
const gyms = [
  { id:1, key:"apex", name:"Apex Fitness", location:"Victoria Island", rating:4.8, distance:"0.4 km", price:25000, priceLabel:"₦25,000/mo", hours:"5:00 AM – 11:00 PM",
    amenities:[{name:"Pool",icon:"pool"},{name:"Sauna",icon:"spa"},{name:"Parking",icon:"parking"},{name:"Café",icon:"cafe"}],
    plans:[
      { id:"basic",   name:"Basic",   price:15000, priceLabel:"₦15,000", period:"/ month", features:["Full Gym Access","Locker Room","2 Classes/week","Shower Facilities"], popular:false },
      { id:"premium", name:"Premium", price:25000, priceLabel:"₦25,000", period:"/ month", features:["Full Gym Access","Unlimited Classes","Pool & Sauna","Locker Room","Guest Pass 1x/mo"], popular:true },
      { id:"elite",   name:"Elite",   price:40000, priceLabel:"₦40,000", period:"/ month", features:["Everything in Premium","PT Sessions 4x/mo","Nutrition Plan","Body Composition Analysis","Priority Booking"], popular:false },
    ],
    timetable:[
      { day:"Mon", slots:["6:00 AM — Yoga","8:00 AM — HIIT","12:00 PM — Strength","6:00 PM — Spin"] },
      { day:"Tue", slots:["7:00 AM — Pilates","9:00 AM — Boxing","5:00 PM — CrossFit"] },
      { day:"Wed", slots:["6:00 AM — Yoga","10:00 AM — Zumba","6:00 PM — HIIT"] },
      { day:"Thu", slots:["7:00 AM — Strength","11:00 AM — Core","5:00 PM — Boxing"] },
      { day:"Fri", slots:["6:00 AM — Spin","8:00 AM — HIIT","12:00 PM — Yoga","7:00 PM — CrossFit"] },
      { day:"Sat", slots:["8:00 AM — Bootcamp","10:00 AM — Zumba","12:00 PM — Pilates"] },
      { day:"Sun", slots:["9:00 AM — Yoga","11:00 AM — Light Cardio"] },
    ]
  },
  { id:2, key:"iron", name:"IronForge Gym", location:"Lekki Phase 1", rating:4.6, distance:"1.2 km", price:18000, priceLabel:"₦18,000/mo", hours:"6:00 AM – 10:00 PM",
    amenities:[{name:"Classes",icon:"lightning"},{name:"Parking",icon:"parking"},{name:"Café",icon:"cafe"}],
    plans:[
      { id:"starter", name:"Starter", price:10000, priceLabel:"₦10,000", period:"/ month", features:["Gym Access","2 Classes/week","Basic Locker"], popular:false },
      { id:"pro",     name:"Pro",     price:18000, priceLabel:"₦18,000", period:"/ month", features:["Gym Access","Unlimited Classes","Full Locker","Towel Service"], popular:true },
      { id:"vip",     name:"VIP",     price:32000, priceLabel:"₦32,000", period:"/ month", features:["Everything in Pro","PT 2x/month","Custom Meal Plan","Priority Booking"], popular:false },
    ],
    timetable:[
      { day:"Mon", slots:["6:00 AM — Strength","9:00 AM — Cardio","6:00 PM — Boxing"] },
      { day:"Tue", slots:["7:00 AM — HIIT","11:00 AM — Yoga","5:00 PM — Spin"] },
      { day:"Wed", slots:["6:00 AM — Core","10:00 AM — Zumba","7:00 PM — Strength"] },
      { day:"Thu", slots:["8:00 AM — Pilates","12:00 PM — HIIT","6:00 PM — Cardio"] },
      { day:"Fri", slots:["6:00 AM — Boxing","9:00 AM — Yoga","5:00 PM — CrossFit"] },
      { day:"Sat", slots:["7:00 AM — Bootcamp","10:00 AM — HIIT"] },
      { day:"Sun", slots:["10:00 AM — Recovery Yoga"] },
    ]
  },
  { id:3, key:"zen", name:"ZenFlex Studio", location:"Ikeja GRA", rating:4.9, distance:"2.1 km", price:22000, priceLabel:"₦22,000/mo", hours:"5:30 AM – 9:30 PM",
    amenities:[{name:"Pool",icon:"pool"},{name:"Spa",icon:"spa"},{name:"Café",icon:"cafe"},{name:"Parking",icon:"parking"}],
    plans:[
      { id:"mindful", name:"Mindful", price:12000, priceLabel:"₦12,000", period:"/ month", features:["Studio Access","3 Classes/week","Meditation Room"], popular:false },
      { id:"balance", name:"Balance", price:22000, priceLabel:"₦22,000", period:"/ month", features:["Full Access","Unlimited Classes","Spa 2x/month","Pool Access"], popular:true },
      { id:"zenith",  name:"Zenith",  price:38000, priceLabel:"₦38,000", period:"/ month", features:["Everything in Balance","PT 3x/month","Nutrition Coaching","Unlimited Spa"], popular:false },
    ],
    timetable:[
      { day:"Mon", slots:["5:30 AM — Sunrise Yoga","8:00 AM — Meditation","6:00 PM — Pilates"] },
      { day:"Tue", slots:["6:00 AM — Stretch","10:00 AM — Hot Yoga","5:00 PM — Yin Yoga"] },
      { day:"Wed", slots:["5:30 AM — Yoga","9:00 AM — Meditation","7:00 PM — Breathwork"] },
      { day:"Thu", slots:["7:00 AM — Pilates","11:00 AM — Yoga","6:00 PM — Stretch"] },
      { day:"Fri", slots:["5:30 AM — Sunrise Yoga","8:00 AM — HIIT","6:00 PM — Flow"] },
      { day:"Sat", slots:["8:00 AM — Yoga","10:00 AM — Meditation","12:00 PM — Pilates"] },
      { day:"Sun", slots:["9:00 AM — Deep Stretch","11:00 AM — Restorative"] },
    ]
  },
];

const instructors = [
  { id:1, name:"Coach Emeka Obi",   specialty:"HIIT & Strength",        rating:4.9, sessions:320, price:"₦15,000", gym:"Apex Fitness",    bio:"10+ years training elite athletes and beginners. Certified ACSM & NASM. Specialises in high-intensity functional training and body recomposition.", available:["Mon 8:00 AM","Wed 10:00 AM","Fri 7:00 AM","Sat 9:00 AM"] },
  { id:2, name:"Aisha Bello",       specialty:"Yoga & Mindfulness",      rating:5.0, sessions:510, price:"₦12,000", gym:"ZenFlex Studio",   bio:"500-hour certified Yoga instructor. Trained in Bali and Rishikesh, India. Specialises in therapeutic and restorative yoga for stress relief.", available:["Tue 6:00 AM","Thu 7:00 AM","Sun 10:00 AM"] },
  { id:3, name:"Tunde Adeleke",     specialty:"Bodybuilding & Nutrition", rating:4.7, sessions:280, price:"₦18,000", gym:"IronForge Gym",    bio:"Former national bodybuilding champion. Specials in body recomposition, contest prep and precision nutrition programming.", available:["Mon 6:00 AM","Wed 6:00 AM","Fri 6:00 AM","Sat 8:00 AM"] },
  { id:4, name:"Ngozi Eze",         specialty:"CrossFit & Cardio",       rating:4.8, sessions:190, price:"₦13,000", gym:"Apex Fitness",    bio:"CrossFit Level 2 trainer and marathon runner. Passionate about helping clients break personal limits through functional fitness.", available:["Tue 5:00 PM","Thu 5:00 PM","Sat 7:00 AM"] },
  { id:5, name:"Chidi Okoro",       specialty:"Boxing & Martial Arts",   rating:4.6, sessions:220, price:"₦14,000", gym:"IronForge Gym",   bio:"Pro boxer turned personal trainer with 8 years coaching experience. Offers boxing-fitness and self-defence training.", available:["Mon 6:00 PM","Wed 7:00 PM","Fri 5:00 PM"] },
];

const healthTips = [
  { id:1, category:"Hydration", type:"hydration", title:"Drink 8 Glasses Daily", tip:"Staying properly hydrated boosts metabolism by up to 30%, improves focus, and significantly enhances workout performance. Start each morning with 500ml of water before any food.", readTime:"2 min read" },
  { id:2, category:"Sleep",     type:"sleep",     title:"7–9 Hours of Quality Sleep", tip:"Muscle repair, fat burning, and hormone regulation primarily happen during deep sleep stages. Poor sleep elevates cortisol and directly sabotages weight loss — treat sleep as training.", readTime:"3 min read" },
  { id:3, category:"Nutrition", type:"nutrition", title:"Eat 5 Smaller Meals", tip:"Spreading nutrient intake across 5 meals keeps blood sugar stable, prevents energy crashes, and keeps your metabolism firing consistently throughout the day.", readTime:"3 min read" },
  { id:4, category:"Movement",  type:"movement",  title:"10,000 Steps a Day", tip:"Daily walking burns an extra 400–600 calories and dramatically reduces cardiovascular risk. You don't need a gym — consistent movement is the foundation of health.", readTime:"2 min read" },
  { id:5, category:"Recovery",  type:"recovery",  title:"Cold Therapy Benefits", tip:"Cold exposure reduces inflammation, improves circulation, and triggers norepinephrine release — boosting mood and alertness. A 90-second cold shower is enough to see benefits.", readTime:"4 min read" },
  { id:6, category:"Mindset",   type:"mindset",   title:"Consistency Over Intensity", tip:"Showing up for a 30-minute moderate workout every day produces far better long-term results than occasional intense sessions. Habits, not heroics, drive transformation.", readTime:"2 min read" },
];

const dietPlans = [
  { id:1, name:"Clean Eating Plan", goal:"General Health", duration:"Ongoing", calories:"1,800–2,000 kcal", icon:"salad",
    description:"A balanced whole-food approach designed for sustainable health improvement. Focuses on lean proteins, complex carbs, healthy fats and fibre-rich vegetables.",
    meals:[
      { time:"7:00 AM", label:"Breakfast", color:C.gold, items:["3 scrambled eggs (whole)","2 slices whole wheat toast","½ avocado, sliced","Black coffee or green tea"] },
      { time:"10:00 AM", label:"Mid-Morning Snack", color:C.green, items:["Greek yogurt 150g","Mixed berries (strawberry, blueberry)","Chia seeds 1 tbsp"] },
      { time:"1:00 PM", label:"Lunch", color:C.blue, items:["Grilled chicken breast 200g","Brown rice ¾ cup (cooked)","Steamed broccoli & carrots","Olive oil & lemon dressing"] },
      { time:"4:00 PM", label:"Afternoon Snack", color:C.coral, items:["1 apple, sliced","Almond butter 2 tbsp","Herbal tea (unsweetened)"] },
      { time:"7:00 PM", label:"Dinner", color:C.purple, items:["Baked salmon fillet 180g","Quinoa ½ cup (cooked)","Garden salad (mixed leaves)","Lemon & herb squeeze"] },
    ]
  },
  { id:2, name:"High Protein Plan", goal:"Muscle Building", duration:"12 Weeks", calories:"2,500–2,800 kcal", icon:"dumbbell",
    description:"Engineered for serious muscle growth. High protein intake at every meal combined with strategic carbohydrate timing around workouts.",
    meals:[
      { time:"6:30 AM", label:"Pre-Workout", color:C.gold, items:["Oats 100g with protein powder","1 banana (medium)","Peanut butter 1 tbsp","Whole milk 200ml"] },
      { time:"9:00 AM", label:"Post-Workout", color:C.coral, items:["4-egg omelette (whole eggs)","Sweet potato 200g (baked)","Spinach & mushroom sauté","Olive oil cooking"] },
      { time:"12:30 PM", label:"Lunch", color:C.blue, items:["Grilled beef sirloin 250g","Brown rice 1 cup (cooked)","Mixed steamed vegetables","Seasoning: thyme, garlic"] },
      { time:"3:30 PM", label:"Afternoon Fuel", color:C.green, items:["Cottage cheese 200g","Mixed walnuts & almonds 30g","Protein shake (whey) 1 scoop"] },
      { time:"7:00 PM", label:"Dinner", color:C.purple, items:["Turkey breast 220g (grilled)","Whole wheat pasta 80g (dry)","Homemade tomato sauce","Parmesan 20g"] },
    ]
  },
  { id:3, name:"Keto Fat Loss Plan", goal:"Weight Loss", duration:"8 Weeks", calories:"1,600–1,800 kcal", icon:"fire",
    description:"Low-carb, high-fat ketogenic approach that shifts your body into fat-burning mode. Strict carb limit of 20–30g net carbs per day.",
    meals:[
      { time:"8:00 AM", label:"Breakfast", color:C.gold, items:["Bulletproof coffee (butter + MCT oil)","3 fried eggs with bacon 3 strips","1 whole avocado"] },
      { time:"1:00 PM", label:"Lunch", color:C.blue, items:["Grilled salmon fillet 200g","Caesar salad (no croutons)","Olive oil, lemon, parmesan","Cucumber & celery sticks"] },
      { time:"4:00 PM", label:"Keto Snack", color:C.green, items:["Handful mixed nuts (macadamia)","String cheese 2 sticks","Cucumber & cream cheese"] },
      { time:"7:30 PM", label:"Dinner", color:C.purple, items:["Ribeye steak 220g (grass-fed)","Buttered asparagus spears","Cauliflower mash with cream","Sea salt & black pepper"] },
    ]
  },
];

const weightPrograms = [
  { id:1, name:"Beginner Burn", level:"Beginner", duration:"4 Weeks", loss:"2–3 kg", icon:"leaf",
    description:"Perfect starting point for newcomers to fitness. Gentle progressive loading that builds the habit first, results second. No equipment needed for the first 2 weeks.",
    weeks:[
      { week:1, focus:"Foundation & Form", workouts:[{day:"Mon",work:"20 min brisk walk + Plank 3×30s"},{day:"Wed",work:"Bodyweight squats 3×15 + Push-ups 3×10"},{day:"Fri",work:"Light cardio 25 min + Stretching"}] },
      { week:2, focus:"Build Endurance",   workouts:[{day:"Mon",work:"Jogging 25 min + Push-ups 3×12"},{day:"Wed",work:"Circuit training 30 min (5 exercises)"},{day:"Fri",work:"Yoga flow 35 min"}] },
      { week:3, focus:"Intensity Rising",  workouts:[{day:"Mon",work:"HIIT 20 min (30s on/30s off)"},{day:"Wed",work:"Strength circuit 35 min + Core"},{day:"Fri",work:"Run 30 min (Zone 2)"}] },
      { week:4, focus:"Peak Performance",  workouts:[{day:"Mon",work:"HIIT 25 min + Core finisher"},{day:"Wed",work:"Full body strength 40 min"},{day:"Fri",work:"5K run + Stretching 15 min"}] },
    ]
  },
  { id:2, name:"Fat Blaster 8", level:"Intermediate", duration:"8 Weeks", loss:"5–7 kg", icon:"lightning",
    description:"An 8-week metabolic conditioning programme combining heavy lifting with high-intensity cardio. Requires gym access. Designed for those with 6+ months training experience.",
    weeks:[
      { week:1, focus:"Metabolic Reset",   workouts:[{day:"Mon",work:"HIIT 30 min + Upper body"},{day:"Tue",work:"Strength: Squats, Deadlifts"},{day:"Thu",work:"HIIT 30 min + Core"},{day:"Sat",work:"Long run 40 min"}] },
      { week:2, focus:"Strength + Cardio", workouts:[{day:"Mon",work:"Deadlifts 4×6 + Rows 4×8"},{day:"Tue",work:"HIIT 35 min"},{day:"Thu",work:"Squats 4×6 + Lunges"},{day:"Sat",work:"Cycling 45 min"}] },
      { week:3, focus:"High Volume",       workouts:[{day:"Mon",work:"Push (Chest/Shoulders) 5×10"},{day:"Tue",work:"Pull (Back/Biceps) 5×10"},{day:"Thu",work:"Legs + HIIT"},{day:"Sat",work:"Full body circuit"}] },
      { week:4, focus:"Deload & Recover",  workouts:[{day:"Mon",work:"Light upper 60% weight"},{day:"Wed",work:"Active recovery walk + Mobility"},{day:"Fri",work:"Yoga or Pilates 45 min"}] },
    ]
  },
  { id:3, name:"Elite Shred", level:"Advanced", duration:"12 Weeks", loss:"10–14 kg", icon:"trophy",
    description:"A competition-grade 12-week transformation programme. 5-day training split with strategic caloric periodisation. Only for experienced athletes who are medically cleared.",
    weeks:[
      { week:1, focus:"Baseline Testing",        workouts:[{day:"Mon",work:"1RM testing: Squat, Bench, Deadlift"},{day:"Tue",work:"HIIT baseline: 20 min AMRAP"},{day:"Thu",work:"Upper body volume"},{day:"Fri",work:"Lower body volume"},{day:"Sat",work:"Cardio: 5K timed run"}] },
      { week:2, focus:"Hypertrophy Phase",       workouts:[{day:"Mon",work:"Push: Bench 5×5, OHP 4×8"},{day:"Tue",work:"Pull: Deadlift 5×5, Row 4×8"},{day:"Wed",work:"HIIT 40 min + Core"},{day:"Thu",work:"Legs: Squat 5×5, RDL 4×8"},{day:"Sat",work:"Cardio 60 min + Mobility"}] },
      { week:3, focus:"Metabolic Conditioning",  workouts:[{day:"Mon",work:"CrossFit WOD: Fran (21-15-9)"},{day:"Tue",work:"Heavy lower + Plyometrics"},{day:"Thu",work:"CrossFit WOD: DT"},{day:"Fri",work:"Upper + Weighted carries"},{day:"Sat",work:"Long run + Stretching"}] },
      { week:4, focus:"Strategic Deload",         workouts:[{day:"Mon",work:"Upper 50% volume, full ROM"},{day:"Wed",work:"Lower 50% volume, slow tempo"},{day:"Fri",work:"Yoga 60 min + Cold therapy"}] },
    ]
  },
];

/* ─── MICRO COMPONENTS ─────────────────────────────────────────── */
const S = { SPLASH:"splash",LOGIN:"login",REGISTER:"register",HOME:"home",GYMS:"gyms",GYM_DETAIL:"gym_detail",INSTRUCTORS:"instructors",INSTRUCTOR_DETAIL:"instructor_detail",BOOKING:"booking",HEALTH:"health",HEALTH_DETAIL:"health_detail",DIET:"diet",DIET_DETAIL:"diet_detail",WEIGHT:"weight",WEIGHT_DETAIL:"weight_detail",PROFILE:"profile",SUBSCRIBE:"subscribe",SUBSCRIBE_SUCCESS:"subscribe_success" };

const Chip = ({ children, color=C.blue, active, onClick }) => (
  <span onClick={onClick} style={{ display:"inline-flex",alignItems:"center",gap:4,background:active?color:color+"18",color:active?"#fff":color,border:`1.5px solid ${color}${active?"":"33"}`,borderRadius:24,padding:"4px 12px",fontSize:11,fontFamily:F.ui,fontWeight:700,cursor:onClick?"pointer":"default",whiteSpace:"nowrap",transition:"all .15s" }}>{children}</span>
);

const Btn = ({ children, onClick, variant="primary", small, style={} }) => {
  const base = { width:"100%",borderRadius:14,fontFamily:F.ui,fontWeight:700,cursor:"pointer",border:"none",letterSpacing:"0.3px",transition:"opacity .15s",padding: small?"11px 18px":"15px 20px",fontSize:small?13:15 };
  const variants = {
    primary: { background:`linear-gradient(135deg,${C.blue},${C.blue2})`,color:"#fff",boxShadow:`0 4px 16px ${C.blue}44` },
    coral:   { background:`linear-gradient(135deg,${C.coral},#D93A10)`,color:"#fff",boxShadow:`0 4px 16px ${C.coral}44` },
    outline: { background:"transparent",color:C.blue,border:`2px solid ${C.blue}` },
    ghost:   { background:C.blueL,color:C.blue,border:"none" },
    green:   { background:`linear-gradient(135deg,${C.green},#007A50)`,color:"#fff",boxShadow:`0 4px 14px ${C.green}44` },
    danger:  { background:"transparent",color:"#CF1322",border:"1.5px solid #CF132244" },
  };
  return <button onClick={onClick} style={{ ...base,...variants[variant],...style }}>{children}</button>;
};

const Card = ({ children, style={}, onClick }) => (
  <div onClick={onClick} style={{ background:C.surface,borderRadius:18,border:`1px solid ${C.border}`,boxShadow:"0 2px 8px rgba(13,27,64,0.07)",padding:16,cursor:onClick?"pointer":"default",...style }}>{children}</div>
);

const Stars = ({ rating }) => (
  <span style={{ display:"inline-flex",alignItems:"center",gap:3,color:C.gold,fontFamily:F.ui,fontWeight:700,fontSize:12 }}>
    <Icon name="star" size={12} color={C.gold}/>
    {rating}
  </span>
);

const HeroHeader = ({ gradient, children }) => (
  <div style={{ background:gradient,padding:"52px 20px 22px",borderRadius:"0 0 30px 30px",position:"relative",overflow:"hidden" }}>
    <div style={{ position:"absolute",bottom:-60,left:-30,width:120,height:120,borderRadius:"50%",background:"rgba(255,255,255,0.04)" }}/>
    <div style={{ position:"relative",zIndex:1 }}>{children}</div>
  </div>
);

const BackBtn = ({ onClick }) => (
  <button onClick={onClick} style={{ background:"rgba(255,255,255,0.2)",border:"none",color:"#fff",cursor:"pointer",fontFamily:F.ui,fontSize:13,fontWeight:600,borderRadius:10,padding:"7px 14px",marginBottom:14,backdropFilter:"blur(10px)" }}>← Back</button>
);

const SectionLabel = ({ children }) => (
  <div style={{ color:C.muted,fontFamily:F.ui,fontSize:11,fontWeight:700,letterSpacing:"1px",textTransform:"uppercase",marginBottom:10 }}>{children}</div>
);

/* ─── SUBSCRIPTION MODAL ─────────────────────────────────────── */
function SubscribeModal({ plan, gym, onClose, onSuccess }) {
  const [step, setStep] = useState(1); // 1=review, 2=payment, 3=done
  const [method, setMethod] = useState("card");
  const [processing, setProcessing] = useState(false);

  const handlePay = () => {
    setProcessing(true);
    setTimeout(() => { setProcessing(false); onSuccess(plan, gym); }, 2000);
  };

  return (
    <div style={{ position:"absolute",inset:0,background:"rgba(13,27,64,0.7)",backdropFilter:"blur(4px)",zIndex:200,display:"flex",alignItems:"flex-end" }}>
      <div style={{ background:C.surface,borderRadius:"24px 24px 0 0",width:"100%",maxHeight:"85%",overflowY:"auto",padding:"0 0 40px" }}>
        {/* Handle */}
        <div style={{ display:"flex",justifyContent:"center",padding:"12px 0 8px" }}>
          <div style={{ width:40,height:4,borderRadius:2,background:C.border }}/>
        </div>
        <div style={{ padding:"0 20px" }}>
          <div style={{ display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:20 }}>
            <div style={{ fontFamily:F.display,fontSize:22,fontWeight:900,color:C.ink }}>Subscribe to {plan.name}</div>
            <button onClick={onClose} style={{ background:C.surface2,border:"none",cursor:"pointer",borderRadius:10,padding:8 }}>
              <Icon name="close" size={18} color={C.muted}/>
            </button>
          </div>

          {/* Plan summary */}
          <div style={{ background:C.blueL,borderRadius:16,padding:16,marginBottom:20,border:`1.5px solid ${C.blue}33` }}>
            <div style={{ display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:12 }}>
              <div>
                <div style={{ fontFamily:F.ui,fontWeight:700,color:C.ink,fontSize:15 }}>{gym.name} — {plan.name}</div>
                <div style={{ color:C.muted,fontFamily:F.ui,fontSize:12,marginTop:2 }}>Monthly subscription · Cancel anytime</div>
              </div>
              <div style={{ textAlign:"right" }}>
                <div style={{ fontFamily:F.display,fontWeight:900,color:C.blue,fontSize:22 }}>{plan.priceLabel}</div>
                <div style={{ color:C.muted,fontFamily:F.ui,fontSize:11 }}>{plan.period}</div>
              </div>
            </div>
            {plan.features.map(f => (
              <div key={f} style={{ display:"flex",alignItems:"center",gap:8,padding:"4px 0" }}>
                <Icon name="check" size={14} color={C.green}/>
                <span style={{ color:C.ink2,fontFamily:F.ui,fontSize:13 }}>{f}</span>
              </div>
            ))}
          </div>

          {/* Payment Method */}
          <SectionLabel>Payment Method</SectionLabel>
          <div style={{ display:"flex",flexDirection:"column",gap:10,marginBottom:20 }}>
            {[
              { id:"card", label:"Credit / Debit Card", sub:"Visa, Mastercard, Verve" },
              { id:"transfer", label:"Bank Transfer", sub:"Instant settlement" },
              { id:"ussd", label:"USSD Code", sub:"Works without internet" },
            ].map(m => (
              <div key={m.id} onClick={() => setMethod(m.id)} style={{ background:method===m.id?C.blueL:C.surface2,border:`1.5px solid ${method===m.id?C.blue:C.border}`,borderRadius:14,padding:"13px 16px",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"space-between",transition:"all .15s" }}>
                <div>
                  <div style={{ fontFamily:F.ui,fontWeight:700,fontSize:14,color:C.ink }}>{m.label}</div>
                  <div style={{ fontFamily:F.ui,fontSize:12,color:C.muted }}>{m.sub}</div>
                </div>
                <div style={{ width:20,height:20,borderRadius:"50%",border:`2px solid ${method===m.id?C.blue:C.border}`,background:method===m.id?C.blue:"transparent",display:"flex",alignItems:"center",justifyContent:"center" }}>
                  {method===m.id && <div style={{ width:8,height:8,borderRadius:"50%",background:"#fff" }}/>}
                </div>
              </div>
            ))}
          </div>

          {/* Card fields if card selected */}
          {method==="card" && (
            <div style={{ display:"flex",flexDirection:"column",gap:10,marginBottom:20 }}>
              <input placeholder="Card Number — 0000 0000 0000 0000" style={{ background:C.surface2,border:`1.5px solid ${C.border}`,borderRadius:12,padding:"13px 16px",fontFamily:F.ui,fontSize:13,color:C.ink,outline:"none",boxSizing:"border-box",width:"100%" }}/>
              <div style={{ display:"flex",gap:10 }}>
                <input placeholder="MM / YY" style={{ flex:1,background:C.surface2,border:`1.5px solid ${C.border}`,borderRadius:12,padding:"13px 16px",fontFamily:F.ui,fontSize:13,color:C.ink,outline:"none",boxSizing:"border-box" }}/>
                <input placeholder="CVV" style={{ flex:1,background:C.surface2,border:`1.5px solid ${C.border}`,borderRadius:12,padding:"13px 16px",fontFamily:F.ui,fontSize:13,color:C.ink,outline:"none",boxSizing:"border-box" }}/>
              </div>
              <input placeholder="Cardholder Name" style={{ background:C.surface2,border:`1.5px solid ${C.border}`,borderRadius:12,padding:"13px 16px",fontFamily:F.ui,fontSize:13,color:C.ink,outline:"none",boxSizing:"border-box",width:"100%" }}/>
            </div>
          )}

          <div style={{ background:C.surface2,borderRadius:12,padding:"12px 16px",marginBottom:20,display:"flex",justifyContent:"space-between" }}>
            <span style={{ fontFamily:F.ui,fontWeight:700,color:C.ink,fontSize:15 }}>Total Today</span>
            <span style={{ fontFamily:F.display,fontWeight:900,color:C.blue,fontSize:18 }}>{plan.priceLabel}</span>
          </div>

          <Btn variant="primary" onClick={handlePay} style={{ opacity:processing?0.7:1 }}>
            {processing ? "Processing…" : `Pay ${plan.priceLabel} →`}
          </Btn>
          <div style={{ textAlign:"center",marginTop:10,color:C.ghost,fontFamily:F.ui,fontSize:11 }}>🔒 Secured by Paystack · 256-bit SSL encryption</div>
        </div>
      </div>
    </div>
  );
}

function SubscribeSuccess({ plan, gym, onContinue }) {
  return (
    <div style={{ height:"100%",background:C.bg,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",padding:"32px 24px",textAlign:"center" }}>
      {/* Success animation ring */}
      <div style={{ width:110,height:110,borderRadius:"50%",background:C.greenL,border:`3px solid ${C.green}33`,display:"flex",alignItems:"center",justifyContent:"center",marginBottom:24,boxShadow:`0 0 0 12px ${C.green}11` }}>
        <Icon name="check" size={48} color={C.green}/>
      </div>
      <div style={{ fontFamily:F.display,fontSize:28,color:C.ink,fontWeight:900,marginBottom:8 }}>You're Subscribed!</div>
      <div style={{ color:C.muted,fontFamily:F.ui,fontSize:15,lineHeight:1.6,marginBottom:32,maxWidth:280 }}>
        Welcome to <strong>{gym.name}</strong>. Your <strong>{plan.name}</strong> membership is now active.
      </div>
      <Card style={{ width:"100%",marginBottom:24 }}>
        {[["Gym",gym.name],["Plan",plan.name],["Amount",plan.priceLabel+plan.period],["Status","Active ✓"],["Renewal","Monthly · Auto-renew"]].map(([k,v]) => (
          <div key={k} style={{ display:"flex",justifyContent:"space-between",padding:"9px 0",borderBottom:`1px solid ${C.divider}` }}>
            <span style={{ color:C.muted,fontFamily:F.ui,fontSize:13 }}>{k}</span>
            <span style={{ color:k==="Status"?C.green:C.ink,fontFamily:F.ui,fontWeight:700,fontSize:13 }}>{v}</span>
          </div>
        ))}
      </Card>
      <Btn variant="green" onClick={onContinue}>Back to Home</Btn>
    </div>
  );
}

/* ─── SCREENS ─────────────────────────────────────────────────── */
function SplashScreen({ onDone }) {
  useEffect(() => { const t=setTimeout(onDone,2400); return ()=>clearTimeout(t); },[]);
  return (
    <div style={{ height:"100%",background:`linear-gradient(160deg,${C.blue} 0%,${C.blue2} 55%,#003080 100%)`,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",gap:20,overflow:"hidden" }}>
      {[140,200,270,360].map((sz,i) => <div key={i} style={{ position:"absolute",borderRadius:"50%",border:`1px solid rgba(255,255,255,${0.04+i*0.015})`,width:sz,height:sz,top:"50%",left:"50%",transform:"translate(-50%,-50%)" }}/>)}
      <div style={{ position:"absolute",top:"15%",right:"10%",width:80,height:80,borderRadius:"50%",background:C.coral+"33" }}/>
      <div style={{ position:"relative",width:100,height:100,borderRadius:28,background:"rgba(255,255,255,0.15)",backdropFilter:"blur(20px)",border:"1.5px solid rgba(255,255,255,0.3)",display:"flex",alignItems:"center",justifyContent:"center",boxShadow:`0 20px 60px rgba(0,0,0,0.3)` }}>
        <Icon name="dumbbell" size={48} color="#fff"/>
      </div>
      <div style={{ textAlign:"center",position:"relative" }}>
        <div style={{ fontFamily:F.display,fontSize:40,color:"#fff",fontWeight:900,letterSpacing:"-1px" }}>FitConnect</div>
        <div style={{ color:"rgba(255,255,255,0.6)",fontFamily:F.ui,fontSize:13,marginTop:6,letterSpacing:"3px",textTransform:"uppercase" }}>Find · Train · Transform</div>
      </div>
      <div style={{ display:"flex",gap:8,marginTop:16,position:"relative" }}>
        {[0,1,2].map(i=><div key={i} style={{ width:i===0?20:6,height:6,borderRadius:3,background:i===0?"#fff":"rgba(255,255,255,0.35)",transition:"width .3s" }}/>)}
      </div>
    </div>
  );
}

function LoginScreen({ onLogin, onRegister }) {
  const [e,setE]=useState(""); const [p,setP]=useState("");
  const inp = { width:"100%",background:C.surface2,border:`1.5px solid ${C.border}`,borderRadius:13,padding:"14px 16px",color:C.ink,fontFamily:F.ui,fontSize:14,outline:"none",boxSizing:"border-box" };
  return (
    <div style={{ height:"100%",background:C.bg,overflowY:"auto" }}>
      <HeroHeader gradient={`linear-gradient(150deg,${C.blue},${C.blue2})`}>
        <div style={{ width:48,height:48,borderRadius:14,background:"rgba(255,255,255,0.2)",display:"flex",alignItems:"center",justifyContent:"center",marginBottom:16 }}>
          <Icon name="dumbbell" size={26} color="#fff"/>
        </div>
        <div style={{ fontFamily:F.display,fontSize:30,color:"#fff",fontWeight:900 }}>Welcome back.</div>
        <div style={{ color:"rgba(255,255,255,0.65)",fontFamily:F.ui,fontSize:14,marginTop:6 }}>Sign in to continue your journey</div>
      </HeroHeader>
      <div style={{ padding:"24px 22px 40px",display:"flex",flexDirection:"column",gap:14 }}>
        <input style={inp} placeholder="Email address" value={e} onChange={v=>setE(v.target.value)}/>
        <input style={inp} placeholder="Password" type="password" value={p} onChange={v=>setP(v.target.value)}/>
        <div style={{ textAlign:"right",color:C.blue,fontFamily:F.ui,fontSize:13,fontWeight:600,cursor:"pointer" }}>Forgot password?</div>
        <Btn onClick={onLogin}>Sign In</Btn>
        <div style={{ display:"flex",alignItems:"center",gap:10 }}>
          <div style={{ flex:1,height:1,background:C.border }}/><span style={{ color:C.ghost,fontFamily:F.ui,fontSize:12 }}>OR</span><div style={{ flex:1,height:1,background:C.border }}/>
        </div>
        <Btn variant="outline" onClick={onLogin}>Continue with Google</Btn>
        <div style={{ textAlign:"center",color:C.muted,fontFamily:F.ui,fontSize:14,marginTop:4 }}>
          No account? <span onClick={onRegister} style={{ color:C.blue,cursor:"pointer",fontWeight:700 }}>Sign Up Free</span>
        </div>
      </div>
    </div>
  );
}

function RegisterScreen({ onRegister, onBack }) {
  const [form,setForm]=useState({name:"",email:"",pass:"",goal:""});
  const goals=["Lose Weight","Build Muscle","Get Fit","Flexibility","General Health"];
  const inp = { width:"100%",background:C.surface2,border:`1.5px solid ${C.border}`,borderRadius:13,padding:"14px 16px",color:C.ink,fontFamily:F.ui,fontSize:14,outline:"none",boxSizing:"border-box" };
  return (
    <div style={{ height:"100%",background:C.bg,overflowY:"auto" }}>
      <HeroHeader gradient={`linear-gradient(150deg,${C.coral},#C53A10)`}>
        <BackBtn onClick={onBack}/>
        <div style={{ fontFamily:F.display,fontSize:28,color:"#fff",fontWeight:900 }}>Create Account</div>
        <div style={{ color:"rgba(255,255,255,0.7)",fontFamily:F.ui,fontSize:14,marginTop:4 }}>Your transformation starts today</div>
      </HeroHeader>
      <div style={{ padding:"22px 22px 40px",display:"flex",flexDirection:"column",gap:14 }}>
        <input style={inp} placeholder="Full name" value={form.name} onChange={v=>setForm({...form,name:v.target.value})}/>
        <input style={inp} placeholder="Email address" value={form.email} onChange={v=>setForm({...form,email:v.target.value})}/>
        <input style={inp} placeholder="Password (min 8 characters)" type="password" value={form.pass} onChange={v=>setForm({...form,pass:v.target.value})}/>
        <SectionLabel>Your Primary Goal</SectionLabel>
        <div style={{ display:"flex",flexWrap:"wrap",gap:8 }}>
          {goals.map(g=><div key={g} onClick={()=>setForm({...form,goal:g})} style={{ padding:"10px 16px",borderRadius:24,background:form.goal===g?C.coral:C.surface,color:form.goal===g?"#fff":C.muted,fontFamily:F.ui,fontSize:13,cursor:"pointer",border:`1.5px solid ${form.goal===g?C.coral:C.border}`,fontWeight:form.goal===g?700:500,transition:"all .15s" }}>{g}</div>)}
        </div>
        <Btn variant="coral" onClick={onRegister}>Create My Account →</Btn>
        <div style={{ textAlign:"center",color:C.ghost,fontFamily:F.ui,fontSize:11 }}>By signing up you agree to our Terms & Privacy Policy</div>
      </div>
    </div>
  );
}

function HomeScreen({ onNav, user, subscriptions }) {
  const stats=[
    {label:"Workouts",val:"12",icon:"dumbbell",color:C.coral},
    {label:"Day Streak",val:"5",icon:"fire",color:C.gold},
    {label:"Kcal Burned",val:"8.4k",icon:"lightning",color:C.blue},
  ];
  return (
    <div style={{ height:"100%",background:C.bg,overflowY:"auto",paddingBottom:90 }}>
      <HeroHeader gradient={`linear-gradient(150deg,${C.blue} 0%,${C.blue2} 100%)`}>
        <div style={{ display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:18 }}>
          <div>
            {/* Greeting pill */}
            <div style={{ display:"inline-flex", alignItems:"center", gap:6,
              background:"rgba(255,255,255,0.12)", backdropFilter:"blur(8px)",
              border:"1px solid rgba(255,255,255,0.22)", borderRadius:20,
              padding:"4px 12px 4px 8px", marginBottom:8 }}>
              {/* Pulse dot */}
              <span style={{ width:7, height:7, borderRadius:"50%",
                background:"#7DFFB3", boxShadow:"0 0 6px #7DFFB3",
                display:"inline-block", flexShrink:0 }}/>
              <span style={{ fontFamily:F.ui, fontSize:11, fontWeight:600,
                letterSpacing:"0.1em", textTransform:"uppercase",
                color:"rgba(255,255,255,0.85)" }}>Welcome back</span>
            </div>
            {/* Name line */}
            <div style={{ fontFamily:F.display, fontSize:24, color:"#fff",
              fontWeight:900, lineHeight:1.15 }}>{user}</div>
            {/* Motivational sub-line */}
            <div style={{ fontFamily:F.ui, fontSize:12, fontWeight:500,
              color:"rgba(255,255,255,0.6)", marginTop:3,
              letterSpacing:"0.01em" }}>Let's crush today's goals <span style={{ color:"#FFD600", opacity:1 }}>💪</span></div>
          </div>
          <div style={{ border:"2.5px solid rgba(255,255,255,0.3)",borderRadius:"50%" }}>
            <UserAvatar size={46}/>
          </div>
        </div>
        <div style={{ display:"flex",gap:10 }}>
          {stats.map(s=>(
            <div key={s.label} style={{ flex:1,background:"rgba(255,255,255,0.13)",backdropFilter:"blur(10px)",borderRadius:14,padding:"12px 6px",textAlign:"center",border:"1px solid rgba(255,255,255,0.18)" }}>
              <Icon name={s.icon} size={20} color="#fff" style={{ margin:"0 auto 4px" }}/>
              <div style={{ color:"#fff",fontFamily:F.display,fontWeight:700,fontSize:20 }}>{s.val}</div>
              <div style={{ color:"rgba(255,255,255,0.6)",fontFamily:F.ui,fontSize:10,fontWeight:500 }}>{s.label}</div>
            </div>
          ))}
        </div>
      </HeroHeader>

      <div style={{ padding:"0 18px" }}>
        {/* Active subscriptions banner */}
        {subscriptions.length > 0 && (
          <div style={{ marginTop:16,background:`linear-gradient(135deg,${C.green},#007A50)`,borderRadius:16,padding:"14px 16px",display:"flex",alignItems:"center",gap:12,boxShadow:`0 6px 20px ${C.green}44` }}>
            <Icon name="medal" size={28} color="#fff"/>
            <div>
              <div style={{ color:"#fff",fontFamily:F.ui,fontWeight:700,fontSize:14 }}>{subscriptions.length} Active Membership{subscriptions.length>1?"s":""}</div>
              <div style={{ color:"rgba(255,255,255,0.75)",fontFamily:F.ui,fontSize:12,marginTop:1 }}>{subscriptions.map(s=>s.gym.name).join(", ")}</div>
            </div>
          </div>
        )}

        {/* Quick Access */}
        <div style={{ display:"flex",justifyContent:"space-between",alignItems:"baseline",margin:"18px 0 10px" }}>
          <span style={{ fontFamily:F.display,fontSize:18,fontWeight:700,color:C.ink }}>Quick Access</span>
        </div>
        <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,marginBottom:4 }}>
          {[
            {label:"Find Gyms",  icon:"dumbbell", color:C.blue,   light:C.blueL,   screen:S.GYMS },
            {label:"Book Trainer",icon:"users",   color:C.purple, light:C.purpleL, screen:S.INSTRUCTORS },
            {label:"Diet Plans", icon:"salad",    color:C.green,  light:C.greenL,  screen:S.DIET },
            {label:"Weight Loss",icon:"fire",     color:C.coral,  light:C.coralL,  screen:S.WEIGHT },
          ].map(a=>(
            <div key={a.label} onClick={()=>onNav(a.screen)} style={{ background:C.surface,border:`1px solid ${C.border}`,borderRadius:16,padding:"15px 14px",cursor:"pointer",display:"flex",alignItems:"center",gap:10,boxShadow:"0 1px 4px rgba(13,27,64,0.06)" }}>
              <div style={{ width:42,height:42,borderRadius:12,background:a.light,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0 }}>
                <Icon name={a.icon} size={22} color={a.color}/>
              </div>
              <span style={{ color:C.ink,fontFamily:F.ui,fontWeight:700,fontSize:13 }}>{a.label}</span>
            </div>
          ))}
        </div>

        {/* Nearby Gyms */}
        <div style={{ display:"flex",justifyContent:"space-between",alignItems:"baseline",margin:"18px 0 10px" }}>
          <span style={{ fontFamily:F.display,fontSize:18,fontWeight:700,color:C.ink }}>Nearby Gyms</span>
          <span onClick={()=>onNav(S.GYMS)} style={{ fontFamily:F.ui,fontSize:13,color:C.blue,cursor:"pointer",fontWeight:600 }}>See all →</span>
        </div>
        <div style={{ display:"flex",gap:12,overflowX:"auto",paddingBottom:8,marginBottom:4 }}>
          {gyms.map(g=>(
            <div key={g.id} onClick={()=>onNav(S.GYM_DETAIL,g)} style={{ minWidth:165,background:C.surface,borderRadius:18,overflow:"hidden",border:`1px solid ${C.border}`,cursor:"pointer",flexShrink:0,boxShadow:"0 2px 8px rgba(13,27,64,0.08)" }}>
              {/* Image area */}
              <div style={{ height:80,overflow:"hidden" }}>
                <GymIllustration type={g.key} w={165} h={80}/>
              </div>
              <div style={{ padding:"10px 12px 14px" }}>
                <div style={{ color:C.ink,fontFamily:F.ui,fontWeight:700,fontSize:13 }}>{g.name}</div>
                <div style={{ display:"flex",alignItems:"center",gap:4,color:C.muted,fontFamily:F.ui,fontSize:11,marginTop:2 }}>
                  <Icon name="map" size={11} color={C.ghost}/>{g.distance}
                </div>
                <div style={{ display:"flex",justifyContent:"space-between",alignItems:"center",marginTop:8 }}>
                  <Stars rating={g.rating}/>
                  <Chip color={C.coral}>{g.priceLabel.split("/")[0]}</Chip>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Health tip */}
        <div style={{ marginTop:16,background:`linear-gradient(135deg,${C.blue},${C.purple})`,borderRadius:20,padding:20,boxShadow:`0 8px 24px ${C.blue}33` }}>
          <div style={{ display:"flex",alignItems:"center",gap:8,marginBottom:10 }}>
            <Icon name="brain" size={18} color="rgba(255,255,255,0.8)"/>
            <div style={{ color:"rgba(255,255,255,0.7)",fontFamily:F.ui,fontSize:11,fontWeight:700,letterSpacing:"1px",textTransform:"uppercase" }}>Tip of the Day</div>
          </div>
          <div style={{ color:"#fff",fontFamily:F.display,fontSize:16,fontWeight:700,marginBottom:6 }}>Consistency Over Intensity</div>
          <div style={{ color:"rgba(255,255,255,0.7)",fontFamily:F.ui,fontSize:13,lineHeight:1.5,marginBottom:14 }}>Showing up for a 30-minute moderate workout daily produces far better long-term results than occasional intense sessions.</div>
          <div onClick={()=>onNav(S.HEALTH)} style={{ display:"inline-flex",alignItems:"center",gap:6,background:"rgba(255,255,255,0.2)",borderRadius:20,padding:"7px 16px",color:"#fff",fontFamily:F.ui,fontSize:12,fontWeight:700,cursor:"pointer" }}>
            More tips <Icon name="arrow" size={14} color="#fff"/>
          </div>
        </div>
      </div>
    </div>
  );
}

function GymsScreen({ onNav, onSelect }) {
  const [search,setSearch]=useState(""); const [filter,setFilter]=useState("All");
  const filters=["All","Nearby","Top Rated","Budget"];
  const filtered=gyms.filter(g=>g.name.toLowerCase().includes(search.toLowerCase())||g.location.toLowerCase().includes(search.toLowerCase()));
  return (
    <div style={{ height:"100%",background:C.bg,display:"flex",flexDirection:"column" }}>
      <HeroHeader gradient={`linear-gradient(150deg,${C.blue},${C.blue2})`}>
        <div style={{ display:"flex",alignItems:"center",gap:10,marginBottom:6 }}>
          <Icon name="dumbbell" size={22} color="rgba(255,255,255,0.8)"/>
          <div style={{ fontFamily:F.display,fontSize:24,color:"#fff",fontWeight:900 }}>Find a Gym</div>
        </div>
        <div style={{ color:"rgba(255,255,255,0.65)",fontFamily:F.ui,fontSize:13,marginBottom:14 }}>Lagos · Showing gyms near you</div>
        <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search gyms, locations..." style={{ width:"100%",background:"rgba(255,255,255,0.15)",backdropFilter:"blur(10px)",border:"1.5px solid rgba(255,255,255,0.25)",borderRadius:13,padding:"12px 16px",color:"#fff",fontFamily:F.ui,fontSize:13,marginBottom:12,outline:"none",boxSizing:"border-box" }}/>
        <div style={{ display:"flex",gap:8,overflowX:"auto" }}>
          {filters.map(f=><div key={f} onClick={()=>setFilter(f)} style={{ flexShrink:0,padding:"7px 16px",borderRadius:20,background:filter===f?"#fff":"rgba(255,255,255,0.15)",color:filter===f?C.blue:"rgba(255,255,255,0.85)",fontFamily:F.ui,fontSize:12,cursor:"pointer",fontWeight:700,transition:"all .15s" }}>{f}</div>)}
        </div>
      </HeroHeader>
      <div style={{ flex:1,overflowY:"auto",padding:"16px 18px 90px" }}>
        {filtered.map(g=>(
          <Card key={g.id} onClick={()=>{onSelect(g);onNav(S.GYM_DETAIL);}} style={{ marginBottom:14,padding:0,overflow:"hidden" }}>
            <GymIllustration type={g.key} w={354} h={100}/>
            <div style={{ padding:"14px 16px" }}>
              <div style={{ display:"flex",justifyContent:"space-between",alignItems:"flex-start" }}>
                <div style={{ fontFamily:F.display,fontSize:17,fontWeight:700,color:C.ink }}>{g.name}</div>
                <Stars rating={g.rating}/>
              </div>
              <div style={{ display:"flex",gap:14,marginTop:6 }}>
                <div style={{ display:"flex",alignItems:"center",gap:4,color:C.muted,fontFamily:F.ui,fontSize:12 }}>
                  <Icon name="map" size={12} color={C.ghost}/>{g.location}
                </div>
                <div style={{ display:"flex",alignItems:"center",gap:4,color:C.muted,fontFamily:F.ui,fontSize:12 }}>
                  <Icon name="clock" size={12} color={C.ghost}/>{g.distance}
                </div>
              </div>
              <div style={{ display:"flex",gap:8,marginTop:10,alignItems:"center",justifyContent:"space-between" }}>
                <div style={{ display:"flex",gap:6,flexWrap:"wrap" }}>
                  {g.amenities.slice(0,3).map(a=>(
                    <div key={a.name} style={{ display:"flex",alignItems:"center",gap:4,background:C.surface2,borderRadius:8,padding:"4px 8px",border:`1px solid ${C.border}` }}>
                      <Icon name={a.icon} size={11} color={C.muted}/>
                      <span style={{ color:C.muted,fontFamily:F.ui,fontSize:11 }}>{a.name}</span>
                    </div>
                  ))}
                </div>
                <Chip color={C.coral}>{g.priceLabel}</Chip>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

function GymDetailScreen({ gym, onNav, onBack, onSubscribe, subscriptions }) {
  const [tab,setTab]=useState("overview");
  const [subscribeTarget,setSubscribeTarget]=useState(null);
  if (!gym) return null;
  const isSubbed = subscriptions.some(s=>s.gym.id===gym.id);

  return (
    <div style={{ height:"100%",background:C.bg,display:"flex",flexDirection:"column" }}>
      {/* Subscribe modal overlay */}
      {subscribeTarget && (
        <SubscribeModal plan={subscribeTarget} gym={gym} onClose={()=>setSubscribeTarget(null)} onSuccess={(plan,g)=>{onSubscribe(plan,g);setSubscribeTarget(null);onNav(S.SUBSCRIBE_SUCCESS,{plan,gym:g});}}/>
      )}
      <HeroHeader gradient={`linear-gradient(150deg,${C.blue},${C.blue2})`}>
        <BackBtn onClick={onBack}/>
        <div style={{ display:"flex",gap:14,alignItems:"center" }}>
          <div style={{ width:62,height:62,borderRadius:14,overflow:"hidden",flexShrink:0 }}><GymIllustration type={gym.key} w={62} h={62}/></div>
          <div>
            <div style={{ fontFamily:F.display,fontSize:20,color:"#fff",fontWeight:900 }}>{gym.name}</div>
            <div style={{ display:"flex",alignItems:"center",gap:4,color:"rgba(255,255,255,0.7)",fontFamily:F.ui,fontSize:12,marginTop:3 }}>
              <Icon name="map" size={12} color="rgba(255,255,255,0.6)"/>{gym.location}
            </div>
            <div style={{ display:"flex",gap:8,marginTop:6,alignItems:"center" }}>
              <Stars rating={gym.rating}/>
              <span style={{ color:"rgba(255,255,255,0.55)",fontFamily:F.ui,fontSize:12 }}>{gym.distance}</span>
              {isSubbed && <Chip color="#fff" active>Member ✓</Chip>}
            </div>
          </div>
        </div>
        <div style={{ display:"flex",gap:6,marginTop:16 }}>
          {["overview","timetable","plans"].map(t=>(
            <div key={t} onClick={()=>setTab(t)} style={{ flex:1,textAlign:"center",padding:"9px 0",borderRadius:10,background:tab===t?"#fff":"rgba(255,255,255,0.15)",color:tab===t?C.blue:"rgba(255,255,255,0.8)",fontFamily:F.ui,fontSize:12,cursor:"pointer",fontWeight:700,textTransform:"capitalize",transition:"all .15s" }}>{t}</div>
          ))}
        </div>
      </HeroHeader>

      <div style={{ flex:1,overflowY:"auto",padding:"16px 18px 90px" }}>
        {tab==="overview" && (
          <>
            <Card style={{ marginBottom:12 }}>
              <SectionLabel>Hours of Operation</SectionLabel>
              <div style={{ display:"flex",alignItems:"center",gap:8 }}>
                <Icon name="clock" size={18} color={C.blue}/>
                <span style={{ color:C.ink,fontFamily:F.ui,fontWeight:700,fontSize:15 }}>{gym.hours}</span>
              </div>
            </Card>
            <Card style={{ marginBottom:16 }}>
              <SectionLabel>Amenities & Facilities</SectionLabel>
              <div style={{ display:"flex",flexWrap:"wrap",gap:10 }}>
                {gym.amenities.map(a=>(
                  <div key={a.name} style={{ display:"flex",alignItems:"center",gap:8,background:C.greenL,borderRadius:12,padding:"10px 14px",border:`1px solid ${C.green}22` }}>
                    <Icon name={a.icon} size={18} color={C.green}/>
                    <span style={{ color:C.green,fontFamily:F.ui,fontSize:13,fontWeight:600 }}>{a.name}</span>
                  </div>
                ))}
              </div>
            </Card>
            <Btn onClick={()=>setTab("plans")} variant="primary">View Plans & Subscribe</Btn>
          </>
        )}

        {tab==="timetable" && (
          <>
            <div style={{ marginBottom:12 }}>
              <div style={{ color:C.muted,fontFamily:F.ui,fontSize:13,lineHeight:1.5 }}>Weekly class schedule. Book your spot in-gym at the reception desk.</div>
            </div>
            {gym.timetable.map(d=>(
              <Card key={d.day} style={{ marginBottom:10 }}>
                <div style={{ color:C.blue,fontFamily:F.ui,fontWeight:800,fontSize:14,marginBottom:10 }}>{d.day}</div>
                <div style={{ display:"flex",flexDirection:"column",gap:7 }}>
                  {d.slots.map(s=>(
                    <div key={s} style={{ background:C.surface2,borderRadius:10,padding:"10px 14px",color:C.ink2,fontFamily:F.ui,fontSize:13,fontWeight:500,display:"flex",alignItems:"center",gap:8 }}>
                      <Icon name="run" size={14} color={C.muted}/>{s}
                    </div>
                  ))}
                </div>
              </Card>
            ))}
          </>
        )}

        {tab==="plans" && (
          <>
            {isSubbed && (
              <div style={{ background:C.greenL,borderRadius:14,padding:"13px 16px",marginBottom:16,display:"flex",alignItems:"center",gap:10,border:`1.5px solid ${C.green}44` }}>
                <Icon name="check" size={18} color={C.green}/>
                <span style={{ color:C.green,fontFamily:F.ui,fontSize:14,fontWeight:700 }}>You're an active member of {gym.name}</span>
              </div>
            )}
            {gym.plans.map((p,i)=>(
              <Card key={p.id} style={{ marginBottom:14,border:p.popular?`2px solid ${C.blue}`:`1px solid ${C.border}`,position:"relative",overflow:"visible" }}>
                {p.popular && (
                  <div style={{ position:"absolute",top:-12,left:16,background:C.blue,borderRadius:20,padding:"4px 12px" }}>
                    <span style={{ color:"#fff",fontFamily:F.ui,fontSize:11,fontWeight:700 }}>⭐ Most Popular</span>
                  </div>
                )}
                <div style={{ display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:12,marginTop:p.popular?8:0 }}>
                  <div>
                    <div style={{ fontFamily:F.display,fontSize:20,color:C.ink,fontWeight:700 }}>{p.name}</div>
                    <div style={{ color:C.muted,fontFamily:F.ui,fontSize:12,marginTop:2 }}>Monthly membership</div>
                  </div>
                  <div style={{ textAlign:"right" }}>
                    <div style={{ fontFamily:F.display,fontWeight:900,color:C.blue,fontSize:24 }}>{p.priceLabel}</div>
                    <div style={{ color:C.muted,fontFamily:F.ui,fontSize:11 }}>{p.period}</div>
                  </div>
                </div>
                <div style={{ display:"flex",flexDirection:"column",gap:8,marginBottom:16 }}>
                  {p.features.map(f=>(
                    <div key={f} style={{ display:"flex",alignItems:"center",gap:10 }}>
                      <div style={{ width:20,height:20,borderRadius:"50%",background:C.greenL,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0 }}>
                        <Icon name="check" size={11} color={C.green}/>
                      </div>
                      <span style={{ color:C.ink2,fontFamily:F.ui,fontSize:13 }}>{f}</span>
                    </div>
                  ))}
                </div>
                <Btn variant={p.popular?"primary":"outline"} small onClick={()=>setSubscribeTarget(p)}>
                  {isSubbed ? "Switch to This Plan" : "Subscribe Now →"}
                </Btn>
              </Card>
            ))}
            <div style={{ textAlign:"center",color:C.ghost,fontFamily:F.ui,fontSize:12,marginTop:8 }}>Cancel anytime · No hidden fees · Paystack secured</div>
          </>
        )}
      </div>
    </div>
  );
}

function InstructorsScreen({ onNav, onSelect }) {
  const [search,setSearch]=useState(""); const [filter,setFilter]=useState("All");
  const specialties=["All","HIIT","Yoga","Bodybuilding","CrossFit","Boxing"];
  const filtered=instructors.filter(i=>(i.name.toLowerCase().includes(search.toLowerCase())||i.specialty.toLowerCase().includes(search.toLowerCase()))&&(filter==="All"||i.specialty.includes(filter)));
  return (
    <div style={{ height:"100%",background:C.bg,display:"flex",flexDirection:"column" }}>
      <HeroHeader gradient={`linear-gradient(150deg,${C.purple},#5B21B6)`}>
        <div style={{ display:"flex",alignItems:"center",gap:10,marginBottom:6 }}>
          <Icon name="users" size={22} color="rgba(255,255,255,0.8)"/>
          <div style={{ fontFamily:F.display,fontSize:24,color:"#fff",fontWeight:900 }}>Find a Trainer</div>
        </div>
        <div style={{ color:"rgba(255,255,255,0.65)",fontFamily:F.ui,fontSize:13,marginBottom:14 }}>Certified instructors · Verified profiles</div>
        <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search name or specialty..." style={{ width:"100%",background:"rgba(255,255,255,0.15)",backdropFilter:"blur(10px)",border:"1.5px solid rgba(255,255,255,0.25)",borderRadius:13,padding:"12px 16px",color:"#fff",fontFamily:F.ui,fontSize:13,marginBottom:12,outline:"none",boxSizing:"border-box" }}/>
        <div style={{ display:"flex",gap:8,overflowX:"auto" }}>
          {specialties.map(f=><div key={f} onClick={()=>setFilter(f)} style={{ flexShrink:0,padding:"7px 14px",borderRadius:20,background:filter===f?"#fff":"rgba(255,255,255,0.15)",color:filter===f?C.purple:"rgba(255,255,255,0.85)",fontFamily:F.ui,fontSize:12,cursor:"pointer",fontWeight:700,transition:"all .15s" }}>{f}</div>)}
        </div>
      </HeroHeader>
      <div style={{ flex:1,overflowY:"auto",padding:"16px 18px 90px" }}>
        {filtered.map(inst=>(
          <Card key={inst.id} onClick={()=>{onSelect(inst);onNav(S.INSTRUCTOR_DETAIL);}} style={{ marginBottom:13 }}>
            <div style={{ display:"flex",gap:14,alignItems:"flex-start" }}>
              <TrainerAvatar seed={inst.id} size={58}/>
              <div style={{ flex:1 }}>
                <div style={{ display:"flex",justifyContent:"space-between",alignItems:"flex-start" }}>
                  <div style={{ fontFamily:F.ui,fontWeight:700,fontSize:15,color:C.ink }}>{inst.name}</div>
                  <Stars rating={inst.rating}/>
                </div>
                <div style={{ color:C.purple,fontFamily:F.ui,fontSize:12,fontWeight:600,marginTop:2 }}>{inst.specialty}</div>
                <div style={{ display:"flex",alignItems:"center",gap:4,color:C.muted,fontFamily:F.ui,fontSize:12,marginTop:2 }}>
                  <Icon name="map" size={11} color={C.ghost}/>{inst.gym}
                </div>
                <div style={{ display:"flex",gap:8,marginTop:10 }}>
                  <Chip color={C.coral}>{inst.price}/session</Chip>
                  <Chip color={C.purple}>{inst.sessions} sessions</Chip>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

function InstructorDetailScreen({ instructor, onNav, onBack }) {
  if (!instructor) return null;
  return (
    <div style={{ height:"100%",background:C.bg,display:"flex",flexDirection:"column" }}>
      <HeroHeader gradient={`linear-gradient(150deg,${C.purple},#5B21B6)`}>
        <BackBtn onClick={onBack}/>
        <div style={{ display:"flex",gap:16,alignItems:"center" }}>
          <TrainerAvatar seed={instructor.id} size={68}/>
          <div>
            <div style={{ fontFamily:F.display,fontSize:20,color:"#fff",fontWeight:900 }}>{instructor.name}</div>
            <div style={{ color:"rgba(255,255,255,0.75)",fontFamily:F.ui,fontSize:13,fontWeight:600,marginTop:2 }}>{instructor.specialty}</div>
            <div style={{ display:"flex",gap:10,marginTop:6,alignItems:"center" }}>
              <Stars rating={instructor.rating}/>
              <span style={{ color:"rgba(255,255,255,0.55)",fontFamily:F.ui,fontSize:12 }}>{instructor.sessions} sessions</span>
            </div>
          </div>
        </div>
      </HeroHeader>
      <div style={{ flex:1,overflowY:"auto",padding:"16px 18px 90px" }}>
        <Card style={{ marginBottom:12 }}>
          <SectionLabel>About</SectionLabel>
          <div style={{ color:C.ink2,fontFamily:F.ui,fontSize:14,lineHeight:1.65 }}>{instructor.bio}</div>
        </Card>
        <Card style={{ marginBottom:12 }}>
          <SectionLabel>Gym Affiliation</SectionLabel>
          <div style={{ display:"flex",alignItems:"center",gap:10 }}>
            <Icon name="dumbbell" size={20} color={C.blue}/>
            <span style={{ color:C.ink,fontFamily:F.ui,fontSize:14,fontWeight:600 }}>{instructor.gym}</span>
          </div>
        </Card>
        <Card style={{ marginBottom:12,background:C.blueL,border:`1.5px solid ${C.blue}22` }}>
          <SectionLabel>Session Rate</SectionLabel>
          <div style={{ fontFamily:F.display,fontWeight:900,color:C.blue,fontSize:28 }}>{instructor.price}<span style={{ fontSize:14,fontFamily:F.ui,color:C.muted,fontWeight:500 }}> / session</span></div>
        </Card>
        <Card style={{ marginBottom:16 }}>
          <SectionLabel>Available Slots</SectionLabel>
          <div style={{ display:"flex",flexDirection:"column",gap:9 }}>
            {instructor.available.map(s=>(
              <div key={s} style={{ background:C.surface2,borderRadius:11,padding:"12px 14px",color:C.ink,fontFamily:F.ui,fontSize:13,fontWeight:500,display:"flex",justifyContent:"space-between",alignItems:"center" }}>
                <div style={{ display:"flex",alignItems:"center",gap:8 }}><Icon name="clock" size={14} color={C.muted}/>{s}</div>
                <Chip color={C.green}>Available</Chip>
              </div>
            ))}
          </div>
        </Card>
        <Btn variant="coral" onClick={()=>onNav(S.BOOKING)}>Book a Session →</Btn>
      </div>
    </div>
  );
}

function BookingScreen({ instructor, onBack }) {
  const [slot,setSlot]=useState(""); const [goal,setGoal]=useState(""); const [booked,setBooked]=useState(false); const [processing,setProcessing]=useState(false);
  if (!instructor) return null;
  const goals=["Weight Loss","Muscle Gain","Endurance","Flexibility","Injury Recovery"];
  const handleBook=()=>{ if(!slot||!goal) return; setProcessing(true); setTimeout(()=>{setProcessing(false);setBooked(true);},1800); };
  if (booked) return (
    <div style={{ height:"100%",background:C.bg,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",padding:"32px 22px",textAlign:"center" }}>
      <div style={{ width:108,height:108,borderRadius:"50%",background:C.greenL,border:`3px solid ${C.green}33`,display:"flex",alignItems:"center",justifyContent:"center",marginBottom:24,boxShadow:`0 0 0 12px ${C.green}11` }}>
        <Icon name="check" size={48} color={C.green}/>
      </div>
      <div style={{ fontFamily:F.display,fontSize:26,color:C.ink,fontWeight:900,marginBottom:8 }}>Session Booked!</div>
      <div style={{ color:C.muted,fontFamily:F.ui,fontSize:14,lineHeight:1.6,marginBottom:28,maxWidth:280 }}>Your session with <strong>{instructor.name}</strong> on <strong>{slot}</strong> is confirmed. Check your email for details.</div>
      <Card style={{ width:"100%",marginBottom:24 }}>
        {[["Trainer",instructor.name],["Date & Time",slot],["Goal",goal],["Rate",instructor.price+"/session"]].map(([k,v])=>(
          <div key={k} style={{ display:"flex",justifyContent:"space-between",padding:"9px 0",borderBottom:`1px solid ${C.divider}` }}>
            <span style={{ color:C.muted,fontFamily:F.ui,fontSize:13 }}>{k}</span>
            <span style={{ color:k==="Rate"?C.blue:C.ink,fontFamily:F.ui,fontWeight:700,fontSize:13 }}>{v}</span>
          </div>
        ))}
      </Card>
      <Btn variant="outline" onClick={onBack}>← Back to Trainers</Btn>
    </div>
  );
  return (
    <div style={{ height:"100%",background:C.bg,display:"flex",flexDirection:"column" }}>
      <HeroHeader gradient={`linear-gradient(150deg,${C.coral},#C53A10)`}>
        <BackBtn onClick={onBack}/>
        <div style={{ fontFamily:F.display,fontSize:22,color:"#fff",fontWeight:900 }}>Book a Session</div>
        <div style={{ color:"rgba(255,255,255,0.7)",fontFamily:F.ui,fontSize:14,marginTop:4 }}>with {instructor.name}</div>
      </HeroHeader>
      <div style={{ flex:1,overflowY:"auto",padding:"16px 18px 90px" }}>
        <Card style={{ marginBottom:14 }}>
          <SectionLabel>Select Time Slot</SectionLabel>
          <div style={{ display:"flex",flexDirection:"column",gap:9 }}>
            {instructor.available.map(s=>(
              <div key={s} onClick={()=>setSlot(s)} style={{ background:slot===s?C.blueL:C.surface2,border:`1.5px solid ${slot===s?C.blue:C.border}`,borderRadius:12,padding:"13px 16px",color:slot===s?C.blue:C.ink,fontFamily:F.ui,fontSize:14,fontWeight:slot===s?700:500,cursor:"pointer",display:"flex",justifyContent:"space-between",alignItems:"center",transition:"all .15s" }}>
                <div style={{ display:"flex",alignItems:"center",gap:8 }}><Icon name="clock" size={15} color={slot===s?C.blue:C.muted}/>{s}</div>
                {slot===s && <Icon name="check" size={16} color={C.green}/>}
              </div>
            ))}
          </div>
        </Card>
        <Card style={{ marginBottom:14 }}>
          <SectionLabel>Your Training Goal</SectionLabel>
          <div style={{ display:"flex",flexWrap:"wrap",gap:8 }}>
            {goals.map(g=><div key={g} onClick={()=>setGoal(g)} style={{ padding:"9px 16px",borderRadius:24,background:goal===g?C.coral:C.surface2,color:goal===g?"#fff":C.muted,fontFamily:F.ui,fontSize:13,cursor:"pointer",border:`1.5px solid ${goal===g?C.coral:C.border}`,fontWeight:goal===g?700:500,transition:"all .15s" }}>{g}</div>)}
          </div>
        </Card>
        <Card style={{ marginBottom:20,background:C.coralL,border:`1.5px solid ${C.coral}22` }}>
          <SectionLabel>Session Summary</SectionLabel>
          {[["Trainer",instructor.name],["Rate",instructor.price+"/session"],["Duration","60 minutes"]].map(([k,v])=>(
            <div key={k} style={{ display:"flex",justifyContent:"space-between",padding:"7px 0",borderBottom:`1px solid rgba(0,0,0,0.05)` }}>
              <span style={{ color:C.muted,fontFamily:F.ui,fontSize:13 }}>{k}</span>
              <span style={{ color:k==="Rate"?C.coral:C.ink,fontFamily:F.ui,fontWeight:700,fontSize:13 }}>{v}</span>
            </div>
          ))}
        </Card>
        <Btn variant="coral" onClick={handleBook} style={{ opacity:(!slot||!goal||processing)?0.6:1 }}>
          {processing ? "Confirming…" : "Confirm Booking →"}
        </Btn>
      </div>
    </div>
  );
}

function HealthScreen({ onNav }) {
  return (
    <div style={{ height:"100%",background:C.bg,display:"flex",flexDirection:"column" }}>
      <HeroHeader gradient={`linear-gradient(150deg,${C.green},#007A50)`}>
        <div style={{ display:"flex",alignItems:"center",gap:10,marginBottom:4 }}>
          <Icon name="heart" size={22} color="rgba(255,255,255,0.8)"/>
          <div style={{ fontFamily:F.display,fontSize:24,color:"#fff",fontWeight:900 }}>Health Hub</div>
        </div>
        <div style={{ color:"rgba(255,255,255,0.65)",fontFamily:F.ui,fontSize:13,marginBottom:16 }}>Expert tips, nutrition & fitness programs</div>
        <div style={{ display:"flex",gap:10 }}>
          {[{label:"Diet Plans",icon:"salad",screen:S.DIET},{label:"Weight Programs",icon:"trophy",screen:S.WEIGHT}].map(b=>(
            <div key={b.label} onClick={()=>onNav(b.screen)} style={{ flex:1,background:"rgba(255,255,255,0.18)",borderRadius:14,padding:"12px 14px",cursor:"pointer",display:"flex",alignItems:"center",gap:8,border:"1px solid rgba(255,255,255,0.2)" }}>
              <Icon name={b.icon} size={20} color="#fff"/>
              <span style={{ color:"#fff",fontFamily:F.ui,fontWeight:700,fontSize:13 }}>{b.label}</span>
              <Icon name="arrow" size={14} color="rgba(255,255,255,0.6)" style={{ marginLeft:"auto" }}/>
            </div>
          ))}
        </div>
      </HeroHeader>
      <div style={{ flex:1,overflowY:"auto",padding:"16px 18px 90px" }}>
        <SectionLabel>Health Tips & Guides</SectionLabel>
        {healthTips.map(tip=>(
          <Card key={tip.id} onClick={()=>onNav(S.HEALTH_DETAIL,tip)} style={{ marginBottom:12,cursor:"pointer" }}>
            <div style={{ display:"flex",gap:12,alignItems:"flex-start" }}>
              <HealthIllustration type={tip.type} w={50} h={50}/>
              <div style={{ flex:1 }}>
                <div style={{ display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:4 }}>
                  <Chip color={C.green}>{tip.category}</Chip>
                  <span style={{ color:C.ghost,fontFamily:F.ui,fontSize:11 }}>{tip.readTime}</span>
                </div>
                <div style={{ color:C.ink,fontFamily:F.display,fontWeight:700,fontSize:15,margin:"6px 0 4px" }}>{tip.title}</div>
                <div style={{ color:C.muted,fontFamily:F.ui,fontSize:12,lineHeight:1.5 }}>{tip.tip.substring(0,90)}…</div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

function HealthDetailScreen({ tip, onBack }) {
  if (!tip) return null;
  return (
    <div style={{ height:"100%",background:C.bg,display:"flex",flexDirection:"column" }}>
      <HeroHeader gradient={`linear-gradient(150deg,${C.green},#007A50)`}>
        <BackBtn onClick={onBack}/>
        <div style={{ display:"flex",gap:12,alignItems:"center" }}>
          <HealthIllustration type={tip.type} w={54} h={54}/>
          <div>
            <Chip color="#fff">{tip.category}</Chip>
            <div style={{ fontFamily:F.display,fontSize:20,color:"#fff",fontWeight:900,marginTop:6 }}>{tip.title}</div>
            <div style={{ color:"rgba(255,255,255,0.6)",fontFamily:F.ui,fontSize:12,marginTop:3 }}>{tip.readTime}</div>
          </div>
        </div>
      </HeroHeader>
      <div style={{ flex:1,overflowY:"auto",padding:"20px 18px 90px" }}>
        <Card style={{ marginBottom:16 }}>
          <div style={{ color:C.ink2,fontFamily:F.ui,fontSize:15,lineHeight:1.75 }}>{tip.tip}</div>
        </Card>
        {/* Extended content per tip */}
        <Card style={{ marginBottom:16 }}>
          <SectionLabel>Why This Matters</SectionLabel>
          <div style={{ color:C.muted,fontFamily:F.ui,fontSize:14,lineHeight:1.7 }}>
            {tip.category==="Hydration" && "Even mild dehydration of 1–2% body weight impairs cognitive function, reduces endurance by 10%, and increases perceived effort during exercise. Your kidneys, joints, and skin all depend on consistent hydration throughout the day."}
            {tip.category==="Sleep" && "During deep sleep (NREM Stage 3), growth hormone is released — the primary driver of muscle protein synthesis. Inadequate sleep also raises ghrelin (hunger hormone) by up to 28%, directly increasing cravings for high-calorie foods."}
            {tip.category==="Nutrition" && "The thermic effect of food (TEF) — the energy your body uses to digest meals — accounts for 10% of your total daily energy expenditure. Frequent, balanced meals help sustain this metabolic benefit throughout the day."}
            {tip.category==="Movement" && "Non-exercise activity thermogenesis (NEAT) — the calories burned in everyday movement — can vary by up to 2,000 kcal/day between individuals. Increasing daily steps is one of the highest-leverage changes you can make."}
            {tip.category==="Recovery" && "Cold water immersion triggers the release of norepinephrine by up to 300%, which is associated with improved mood, alertness and reduced inflammation markers like IL-6 and CRP."}
            {tip.category==="Mindset" && "Behavioural research shows that identity-based habits — 'I am someone who exercises daily' — are 2.5x more durable than outcome-based goals. The key is voting for your identity with every small action."}
          </div>
        </Card>
        <Card>
          <SectionLabel>Quick Action</SectionLabel>
          <div style={{ background:C.greenL,borderRadius:12,padding:14,border:`1px solid ${C.green}22` }}>
            <div style={{ color:C.green,fontFamily:F.ui,fontWeight:700,fontSize:14,marginBottom:6 }}>
              {tip.category==="Hydration" && "Start your day with a 500ml glass of water — before coffee."}
              {tip.category==="Sleep" && "Set a consistent bedtime alarm for 30 minutes before your target sleep time."}
              {tip.category==="Nutrition" && "Plan and prep your 5 meals for tomorrow evening today."}
              {tip.category==="Movement" && "Enable step tracking on your phone and set a 10,000 step daily reminder."}
              {tip.category==="Recovery" && "End your next shower with 60–90 seconds of cold water on the back of your neck."}
              {tip.category==="Mindset" && "Write 'I am someone who trains consistently' on a sticky note and place it on your mirror."}
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}

function DietScreen({ onNav }) {
  return (
    <div style={{ height:"100%",background:C.bg,display:"flex",flexDirection:"column" }}>
      <HeroHeader gradient={`linear-gradient(150deg,${C.gold},#D97706)`}>
        <BackBtn onClick={()=>onNav(S.HEALTH)}/>
        <div style={{ display:"flex",alignItems:"center",gap:10,marginBottom:4 }}>
          <Icon name="salad" size={22} color="rgba(255,255,255,0.8)"/>
          <div style={{ fontFamily:F.display,fontSize:24,color:"#fff",fontWeight:900 }}>Diet Plans</div>
        </div>
        <div style={{ color:"rgba(255,255,255,0.7)",fontFamily:F.ui,fontSize:13 }}>Nutrition programmes for every goal</div>
      </HeroHeader>
      <div style={{ flex:1,overflowY:"auto",padding:"16px 18px 90px" }}>
        {dietPlans.map(plan=>(
          <Card key={plan.id} onClick={()=>onNav(S.DIET_DETAIL,plan)} style={{ marginBottom:14,cursor:"pointer",padding:0,overflow:"hidden" }}>
            <div style={{ background:`linear-gradient(135deg,${C.gold}22,${C.gold}08)`,padding:"16px 16px 12px",borderBottom:`1px solid ${C.border}` }}>
              <div style={{ display:"flex",alignItems:"center",gap:12 }}>
                <div style={{ width:52,height:52,borderRadius:14,background:C.goldL,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0 }}>
                  <Icon name={plan.icon} size={28} color={C.gold}/>
                </div>
                <div style={{ flex:1 }}>
                  <div style={{ fontFamily:F.display,fontSize:17,color:C.ink,fontWeight:700 }}>{plan.name}</div>
                  <div style={{ display:"flex",gap:8,marginTop:5,flexWrap:"wrap" }}>
                    <Chip color={C.gold}>{plan.goal}</Chip>
                    <Chip color={C.blue}>{plan.duration}</Chip>
                  </div>
                </div>
                <Icon name="arrow" size={20} color={C.ghost}/>
              </div>
            </div>
            <div style={{ padding:"12px 16px" }}>
              <div style={{ color:C.muted,fontFamily:F.ui,fontSize:13,lineHeight:1.5,marginBottom:8 }}>{plan.description}</div>
              <div style={{ display:"flex",alignItems:"center",gap:6 }}>
                <Icon name="fire" size={14} color={C.coral}/>
                <span style={{ color:C.coral,fontFamily:F.ui,fontSize:12,fontWeight:700 }}>{plan.calories}</span>
                <span style={{ color:C.ghost,fontFamily:F.ui,fontSize:12 }}>· {plan.meals.length} meals/day</span>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

function DietDetailScreen({ plan, onBack }) {
  if (!plan) return null;
  const [started,setStarted]=useState(false);
  return (
    <div style={{ height:"100%",background:C.bg,display:"flex",flexDirection:"column" }}>
      <HeroHeader gradient={`linear-gradient(150deg,${C.gold},#D97706)`}>
        <BackBtn onClick={onBack}/>
        <div style={{ display:"flex",gap:12,alignItems:"center" }}>
          <div style={{ width:56,height:56,borderRadius:16,background:"rgba(255,255,255,0.2)",display:"flex",alignItems:"center",justifyContent:"center" }}>
            <Icon name={plan.icon} size={30} color="#fff"/>
          </div>
          <div>
            <div style={{ fontFamily:F.display,fontSize:20,color:"#fff",fontWeight:900 }}>{plan.name}</div>
            <div style={{ display:"flex",gap:8,marginTop:6 }}>
              <Chip color="#fff">{plan.goal}</Chip>
              <Chip color="#fff">{plan.duration}</Chip>
            </div>
          </div>
        </div>
      </HeroHeader>
      <div style={{ flex:1,overflowY:"auto",padding:"16px 18px 90px" }}>
        {started && (
          <div style={{ background:C.greenL,borderRadius:14,padding:"12px 16px",marginBottom:14,display:"flex",alignItems:"center",gap:10,border:`1.5px solid ${C.green}44` }}>
            <Icon name="check" size={16} color={C.green}/>
            <span style={{ color:C.green,fontFamily:F.ui,fontSize:14,fontWeight:700 }}>You've started the {plan.name}!</span>
          </div>
        )}
        <Card style={{ marginBottom:14 }}>
          <SectionLabel>About This Plan</SectionLabel>
          <div style={{ color:C.ink2,fontFamily:F.ui,fontSize:14,lineHeight:1.65,marginBottom:10 }}>{plan.description}</div>
          <div style={{ display:"flex",gap:8 }}>
            <div style={{ flex:1,background:C.goldL,borderRadius:10,padding:"10px 12px",textAlign:"center" }}>
              <div style={{ color:C.gold,fontFamily:F.ui,fontWeight:700,fontSize:13 }}>{plan.calories}</div>
              <div style={{ color:C.muted,fontFamily:F.ui,fontSize:11 }}>Daily Calories</div>
            </div>
            <div style={{ flex:1,background:C.blueL,borderRadius:10,padding:"10px 12px",textAlign:"center" }}>
              <div style={{ color:C.blue,fontFamily:F.ui,fontWeight:700,fontSize:13 }}>{plan.meals.length} Meals</div>
              <div style={{ color:C.muted,fontFamily:F.ui,fontSize:11 }}>Per Day</div>
            </div>
            <div style={{ flex:1,background:C.greenL,borderRadius:10,padding:"10px 12px",textAlign:"center" }}>
              <div style={{ color:C.green,fontFamily:F.ui,fontWeight:700,fontSize:13 }}>{plan.duration}</div>
              <div style={{ color:C.muted,fontFamily:F.ui,fontSize:11 }}>Duration</div>
            </div>
          </div>
        </Card>

        <SectionLabel>Daily Meal Plan</SectionLabel>
        {plan.meals.map(m=>(
          <Card key={m.label} style={{ marginBottom:12,borderLeft:`4px solid ${m.color}` }}>
            <div style={{ display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:10 }}>
              <div style={{ color:C.ink,fontFamily:F.ui,fontWeight:700,fontSize:14 }}>{m.label}</div>
              <div style={{ background:m.color+"18",borderRadius:20,padding:"4px 10px" }}>
                <span style={{ color:m.color,fontFamily:F.ui,fontSize:11,fontWeight:700 }}>{m.time}</span>
              </div>
            </div>
            {m.items.map(item=>(
              <div key={item} style={{ display:"flex",alignItems:"center",gap:8,padding:"6px 0",borderBottom:`1px solid ${C.divider}` }}>
                <div style={{ width:6,height:6,borderRadius:"50%",background:m.color,flexShrink:0 }}/>
                <span style={{ color:C.ink2,fontFamily:F.ui,fontSize:13 }}>{item}</span>
              </div>
            ))}
          </Card>
        ))}

        <Btn variant={started?"ghost":"primary"} onClick={()=>setStarted(true)} style={{ marginTop:8 }}>
          {started ? "✓ Plan Active — View Progress" : "Start This Plan →"}
        </Btn>
      </div>
    </div>
  );
}

function WeightScreen({ onNav }) {
  return (
    <div style={{ height:"100%",background:C.bg,display:"flex",flexDirection:"column" }}>
      <HeroHeader gradient={`linear-gradient(150deg,${C.coral},#C53A10)`}>
        <BackBtn onClick={()=>onNav(S.HEALTH)}/>
        <div style={{ display:"flex",alignItems:"center",gap:10,marginBottom:4 }}>
          <Icon name="trophy" size={22} color="rgba(255,255,255,0.8)"/>
          <div style={{ fontFamily:F.display,fontSize:24,color:"#fff",fontWeight:900 }}>Weight Loss Programs</div>
        </div>
        <div style={{ color:"rgba(255,255,255,0.7)",fontFamily:F.ui,fontSize:13 }}>Structured programmes · Real results</div>
      </HeroHeader>
      <div style={{ flex:1,overflowY:"auto",padding:"16px 18px 90px" }}>
        {weightPrograms.map(p=>(
          <Card key={p.id} onClick={()=>onNav(S.WEIGHT_DETAIL,p)} style={{ marginBottom:14,cursor:"pointer",padding:0,overflow:"hidden" }}>
            <div style={{ background:`linear-gradient(135deg,${C.coral}18,${C.coral}05)`,padding:"16px 16px 12px",borderBottom:`1px solid ${C.border}` }}>
              <div style={{ display:"flex",alignItems:"center",gap:12 }}>
                <div style={{ width:56,height:56,borderRadius:16,background:C.coralL,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0 }}>
                  <Icon name={p.icon} size={30} color={C.coral}/>
                </div>
                <div style={{ flex:1 }}>
                  <div style={{ fontFamily:F.display,fontSize:17,color:C.ink,fontWeight:700 }}>{p.name}</div>
                  <div style={{ display:"flex",gap:8,marginTop:5,flexWrap:"wrap",alignItems:"center" }}>
                    <PlanBadge level={p.level}/>
                    <Chip color={C.blue}>{p.duration}</Chip>
                  </div>
                </div>
                <Icon name="arrow" size={20} color={C.ghost}/>
              </div>
            </div>
            <div style={{ padding:"12px 16px" }}>
              <div style={{ color:C.muted,fontFamily:F.ui,fontSize:13,lineHeight:1.5,marginBottom:8 }}>{p.description.substring(0,100)}…</div>
              <div style={{ display:"flex",alignItems:"center",gap:6,background:C.coralL,borderRadius:10,padding:"8px 12px" }}>
                <Icon name="target" size={14} color={C.coral}/>
                <span style={{ color:C.coral,fontFamily:F.ui,fontSize:12,fontWeight:700 }}>Expected loss: {p.loss}</span>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

function WeightDetailScreen({ program, onBack }) {
  if (!program) return null;
  const [started,setStarted]=useState(false);
  const lvl = { Beginner:{c:C.green,l:C.greenL}, Intermediate:{c:C.gold,l:C.goldL}, Advanced:{c:C.coral,l:C.coralL} };
  const lv = lvl[program.level];
  return (
    <div style={{ height:"100%",background:C.bg,display:"flex",flexDirection:"column" }}>
      <HeroHeader gradient={`linear-gradient(150deg,${lv.c},${lv.c}CC)`}>
        <BackBtn onClick={onBack}/>
        <div style={{ display:"flex",gap:12,alignItems:"center" }}>
          <div style={{ width:60,height:60,borderRadius:18,background:"rgba(255,255,255,0.2)",display:"flex",alignItems:"center",justifyContent:"center" }}>
            <Icon name={program.icon} size={32} color="#fff"/>
          </div>
          <div>
            <div style={{ fontFamily:F.display,fontSize:20,color:"#fff",fontWeight:900 }}>{program.name}</div>
            <div style={{ display:"flex",gap:8,marginTop:6,alignItems:"center" }}>
              <Chip color="#fff">{program.level}</Chip>
              <span style={{ color:"rgba(255,255,255,0.65)",fontFamily:F.ui,fontSize:12 }}>{program.duration}</span>
            </div>
          </div>
        </div>
        <div style={{ marginTop:14,background:"rgba(255,255,255,0.2)",borderRadius:12,padding:"10px 14px",display:"flex",alignItems:"center",gap:8 }}>
          <Icon name="target" size={16} color="#fff"/>
          <span style={{ color:"#fff",fontFamily:F.ui,fontSize:13,fontWeight:700 }}>Expected weight loss: {program.loss}</span>
        </div>
      </HeroHeader>
      <div style={{ flex:1,overflowY:"auto",padding:"16px 18px 90px" }}>
        {started && (
          <div style={{ background:C.greenL,borderRadius:14,padding:"12px 16px",marginBottom:14,display:"flex",alignItems:"center",gap:10,border:`1.5px solid ${C.green}44` }}>
            <Icon name="check" size={16} color={C.green}/>
            <span style={{ color:C.green,fontFamily:F.ui,fontSize:14,fontWeight:700 }}>Program active! You're on Week 1.</span>
          </div>
        )}
        <Card style={{ marginBottom:14 }}>
          <SectionLabel>Programme Overview</SectionLabel>
          <div style={{ color:C.ink2,fontFamily:F.ui,fontSize:14,lineHeight:1.65 }}>{program.description}</div>
        </Card>

        <SectionLabel>Week-by-Week Plan</SectionLabel>
        {program.weeks.map(w=>(
          <Card key={w.week} style={{ marginBottom:12 }}>
            <div style={{ display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:12 }}>
              <div style={{ fontFamily:F.ui,fontWeight:800,fontSize:15,color:lv.c }}>Week {w.week}</div>
              <div style={{ background:lv.l,borderRadius:20,padding:"5px 12px" }}>
                <span style={{ color:lv.c,fontFamily:F.ui,fontSize:11,fontWeight:700 }}>{w.focus}</span>
              </div>
            </div>
            <div style={{ display:"flex",flexDirection:"column",gap:8 }}>
              {w.workouts.map(wo=>(
                <div key={wo.day||wo.work} style={{ background:C.surface2,borderRadius:10,padding:"10px 14px" }}>
                  {wo.day && <div style={{ color:lv.c,fontFamily:F.ui,fontWeight:700,fontSize:12,marginBottom:3 }}>{wo.day}</div>}
                  <div style={{ color:C.ink2,fontFamily:F.ui,fontSize:13 }}>{wo.work}</div>
                </div>
              ))}
            </div>
          </Card>
        ))}

        <Btn variant={started?"ghost":"coral"} onClick={()=>setStarted(true)} style={{ marginTop:8 }}>
          {started ? "✓ Program Active — Track Progress" : "Start This Program →"}
        </Btn>
      </div>
    </div>
  );
}

function ProfileScreen({ user, subscriptions, onLogout }) {
  const menu=[
    {icon:"medal",  label:"My Memberships",   sub:`${subscriptions.length} active plan${subscriptions.length!==1?"s":""}`, color:C.blue },
    {icon:"clock",  label:"Booked Sessions",   sub:"1 upcoming",      color:C.purple },
    {icon:"target", label:"Fitness Goals",      sub:"Weight Loss",     color:C.coral },
    {icon:"lightning",label:"Progress Tracker", sub:"5 day streak",   color:C.gold },
    {icon:"moon",   label:"Notifications",      sub:"Enabled",        color:C.green },
    {icon:"nutrition",label:"Payment Methods",  sub:"1 card saved",   color:C.blue },
  ];
  return (
    <div style={{ height:"100%",background:C.bg,display:"flex",flexDirection:"column" }}>
      <HeroHeader gradient={`linear-gradient(150deg,${C.ink},${C.ink2})`}>
        <div style={{ display:"flex",gap:16,alignItems:"center" }}>
          <div style={{ border:"3px solid rgba(255,255,255,0.3)", borderRadius:"50%" }}>
            <UserAvatar size={70}/>
          </div>
          <div>
            <div style={{ fontFamily:F.display,fontSize:20,color:"#fff",fontWeight:900 }}>{user}</div>
            <div style={{ color:"rgba(255,255,255,0.6)",fontFamily:F.ui,fontSize:13,marginTop:2 }}>athlete@fitconnect.ng</div>
            <div style={{ marginTop:6 }}><Chip color={C.gold} active>⭐ Premium Member</Chip></div>
          </div>
        </div>
        <div style={{ display:"flex",gap:10,marginTop:18 }}>
          {[{val:"12",label:"Workouts"},{val:"5",label:"Day Streak"},{val:subscriptions.length,label:"Memberships"}].map(s=>(
            <div key={s.label} style={{ flex:1,textAlign:"center",background:"rgba(255,255,255,0.1)",borderRadius:12,padding:"12px 0",border:"1px solid rgba(255,255,255,0.12)" }}>
              <div style={{ color:C.gold,fontFamily:F.display,fontWeight:900,fontSize:20 }}>{s.val}</div>
              <div style={{ color:"rgba(255,255,255,0.55)",fontFamily:F.ui,fontSize:11 }}>{s.label}</div>
            </div>
          ))}
        </div>
      </HeroHeader>
      <div style={{ flex:1,overflowY:"auto",padding:"16px 18px 90px" }}>
        {subscriptions.length>0 && (
          <>
            <SectionLabel>Active Memberships</SectionLabel>
            {subscriptions.map((sub,i)=>(
              <Card key={i} style={{ marginBottom:10,borderLeft:`4px solid ${C.green}` }}>
                <div style={{ display:"flex",alignItems:"center",gap:12 }}>
                  <div style={{ width:44,height:44,borderRadius:10,overflow:"hidden",flexShrink:0 }}><GymIllustration type={sub.gym.key} w={44} h={44}/></div>
                  <div style={{ flex:1 }}>
                    <div style={{ color:C.ink,fontFamily:F.ui,fontWeight:700,fontSize:14 }}>{sub.gym.name}</div>
                    <div style={{ color:C.muted,fontFamily:F.ui,fontSize:12 }}>{sub.plan.name} · {sub.plan.priceLabel}/mo</div>
                  </div>
                  <Chip color={C.green}>Active</Chip>
                </div>
              </Card>
            ))}
          </>
        )}
        <div style={{ marginTop:16 }}><SectionLabel>Account</SectionLabel></div>
        {menu.map(item=>(
          <Card key={item.label} style={{ marginBottom:10,cursor:"pointer" }}>
            <div style={{ display:"flex",alignItems:"center",gap:14 }}>
              <div style={{ width:42,height:42,borderRadius:12,background:item.color+"18",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0 }}>
                <Icon name={item.icon} size={20} color={item.color}/>
              </div>
              <div style={{ flex:1 }}>
                <div style={{ color:C.ink,fontFamily:F.ui,fontSize:14,fontWeight:600 }}>{item.label}</div>
                {item.sub && <div style={{ color:C.muted,fontFamily:F.ui,fontSize:12,marginTop:2 }}>{item.sub}</div>}
              </div>
              <Icon name="arrow" size={16} color={C.border}/>
            </div>
          </Card>
        ))}
        <div style={{ marginTop:10 }}>
          <Btn variant="danger" onClick={onLogout}>Sign Out</Btn>
        </div>
      </div>
    </div>
  );
}

/* ─── BOTTOM NAV ─────────────────────────────────────────────── */
function Nav({ screen, onNav }) {
  const tabs=[{id:S.HOME,icon:"home",label:"Home"},{id:S.GYMS,icon:"dumbbell",label:"Gyms"},{id:S.INSTRUCTORS,icon:"users",label:"Trainers"},{id:S.HEALTH,icon:"heart",label:"Health"},{id:S.PROFILE,icon:"person",label:"Profile"}];
  const active=(id)=>screen===id||(id===S.GYMS&&[S.GYM_DETAIL].includes(screen))||(id===S.INSTRUCTORS&&[S.INSTRUCTOR_DETAIL,S.BOOKING].includes(screen))||(id===S.HEALTH&&[S.HEALTH_DETAIL,S.DIET,S.DIET_DETAIL,S.WEIGHT,S.WEIGHT_DETAIL].includes(screen));
  return (
    <div style={{ position:"absolute",bottom:0,left:0,right:0,background:C.surface,borderTop:`1px solid ${C.border}`,display:"flex",padding:"10px 0 24px",boxShadow:"0 -4px 24px rgba(13,27,64,0.09)" }}>
      {tabs.map(t=>{
        const a=active(t.id);
        return (
          <button key={t.id} onClick={()=>onNav(t.id)} style={{ flex:1,background:"none",border:"none",cursor:"pointer",display:"flex",flexDirection:"column",alignItems:"center",gap:3,padding:0 }}>
            <div style={{ width:38,height:38,borderRadius:12,background:a?C.blueL:"transparent",display:"flex",alignItems:"center",justifyContent:"center",transition:"background .15s" }}>
              <Icon name={t.icon} size={20} color={a?C.blue:C.ghost}/>
            </div>
            <span style={{ fontSize:10,fontFamily:F.ui,fontWeight:a?700:500,color:a?C.blue:C.ghost,letterSpacing:"0.2px" }}>{t.label}</span>
          </button>
        );
      })}
    </div>
  );
}

/* ─── APP ROOT ───────────────────────────────────────────────── */
export default function App() {
  const [screen,setScreen]=useState(S.SPLASH);
  const [user]=useState("Chioma Adeyemi");
  const [selectedGym,setSelectedGym]=useState(null);
  const [selectedInstructor,setSelectedInstructor]=useState(null);
  const [selectedData,setSelectedData]=useState(null);
  const [subscriptions,setSubscriptions]=useState([]); // {plan, gym}
  const [subSuccess,setSubSuccess]=useState(null);

  const showNav=![S.SPLASH,S.LOGIN,S.REGISTER,S.SUBSCRIBE_SUCCESS].includes(screen);

  const nav=(s,data)=>{
    setScreen(s);
    if (data){
      if (s===S.GYM_DETAIL) setSelectedGym(data);
      if (s===S.INSTRUCTOR_DETAIL) setSelectedInstructor(data);
      if ([S.HEALTH_DETAIL,S.DIET_DETAIL,S.WEIGHT_DETAIL].includes(s)) setSelectedData(data);
      if (s===S.DIET_DETAIL||s===S.DIET) setSelectedData(data);
      if (s===S.WEIGHT_DETAIL) setSelectedData(data);
      if (s===S.SUBSCRIBE_SUCCESS){ setSubSuccess(data); }
    }
  };

  const handleSubscribe=(plan,gym)=>{
    setSubscriptions(prev=>{
      const filtered=prev.filter(s=>s.gym.id!==gym.id);
      return [...filtered,{plan,gym}];
    });
  };

  return (
    <div style={{
      display:"flex", justifyContent:"center", alignItems:"center",
      minHeight:"100vh", padding:"40px 0",
      background:"radial-gradient(ellipse at 50% 30%, #1e3a6e 0%, #0a0f1e 70%)",
    }}>
      <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&family=DM+Sans:ital,wght@0,400;0,500;0,600;0,700;0,800;1,400&display=swap" rel="stylesheet"/>
      <style>{`
        *{box-sizing:border-box;margin:0;padding:0;}
        ::-webkit-scrollbar{display:none;}
        input::placeholder{color:#9BAABF;}
        button:active{opacity:0.85;}
        @keyframes glow{0%,100%{box-shadow:0 0 40px 6px rgba(30,107,255,0.25),0 40px 80px rgba(0,0,0,0.6)}50%{box-shadow:0 0 70px 14px rgba(30,107,255,0.4),0 40px 80px rgba(0,0,0,0.6)}}
      `}</style>



      {/* ══ iPhone 15 Pro Frame ══
          TWO-DIV strategy:
          1. Titanium shell  — overflow:hidden IS the only clip boundary
          2. Screen inset    — lives inside the shell, no radius conflicts
          The black bezel is simply the titanium shell's dark inner padding.
          USB-C + speaker holes are absolute divs inside the shell.
      */}
      <div style={{ position:"relative", display:"inline-flex" }}>

        {/* ── Side hardware buttons (behind the shell, zIndex:0) ── */}
        {/* Mute */}
        <div style={{
          position:"absolute", left:-4, top:156, width:4, height:32,
          borderRadius:"3px 0 0 3px",
          background:"linear-gradient(90deg,#888,#bbb,#999)",
          zIndex:0,
        }}/>
        {/* Vol+ */}
        <div style={{
          position:"absolute", left:-4, top:204, width:4, height:60,
          borderRadius:"3px 0 0 3px",
          background:"linear-gradient(90deg,#888,#bbb,#999)",
          zIndex:0,
        }}/>
        {/* Vol- */}
        <div style={{
          position:"absolute", left:-4, top:280, width:4, height:60,
          borderRadius:"3px 0 0 3px",
          background:"linear-gradient(90deg,#888,#bbb,#999)",
          zIndex:0,
        }}/>
        {/* Power */}
        <div style={{
          position:"absolute", right:-4, top:204, width:4, height:80,
          borderRadius:"0 3px 3px 0",
          background:"linear-gradient(270deg,#888,#bbb,#999)",
          zIndex:0,
        }}/>

        {/* ══ TITANIUM SHELL — single overflow:hidden boundary ══
            borderRadius:47 on the shell.
            The screen div inside uses a SMALLER borderRadius (40).
            Because this shell has overflow:hidden, the screen's
            rounded corners are perfectly clipped — no dark bleeding. */}
        <div style={{
          position:"relative",
          zIndex:1,
          width:390,
          height:848,
          borderRadius:47,
          overflow:"hidden",
          background:"linear-gradient(155deg,#d6d7db 0%,#ecedf1 20%,#c8c9cd 40%,#f2f3f7 55%,#bebfc3 72%,#dcdde1 88%,#b4b5b9 100%)",
          boxShadow:[
            /* inner top-left bevel */
            "inset 2px 2px 0 rgba(255,255,255,0.85)",
            /* inner bottom-right shadow */
            "inset -1px -2px 0 rgba(0,0,0,0.22)",
            /* outer drop shadow */
            "0 48px 96px rgba(0,0,0,0.8), 0 12px 32px rgba(0,0,0,0.5)",
          ].join(","),
        }}>

          {/* Black glass face — inset 3px on all sides.
              overflow:hidden clips the screen and all children cleanly.
              This div's borderRadius (44) is 3px less than shell (47). */}
          <div style={{
            position:"absolute",
            inset:3,
            borderRadius:44,
            overflow:"hidden",
            background:"#0d0d0f",
            boxShadow:"inset 0 0 0 0.5px rgba(255,255,255,0.08)",
          }}>

            {/* ── App screen viewport ──
                Further inset: 9px top/bottom, 7px left/right.
                borderRadius 38 (= 44 - 6). Tight clean corners. */}
            <div style={{
              position:"absolute",
              top:8, left:6, right:6, bottom:9,
              borderRadius:38,
              overflow:"hidden",
              background:C.bg,
            }}>
              {/* Notch: narrow speaker pill (centred) + camera dot to its right */}
              <div style={{
                position:"absolute", top:10, left:"50%",
                transform:"translateX(-50%)",
                width:130, height:26, borderRadius:18,
                background:"#000", zIndex:300,
                pointerEvents:"none",
                display:"flex", alignItems:"center",
                justifyContent:"center", gap:8,
              }}>
                {/* Earpiece — narrow centred pill, matches real iPhone notch */}
                <div style={{
                  width:46, height:9, borderRadius:4,
                  background:"#232326",
                  boxShadow:"inset 0 1px 2px rgba(0,0,0,0.9), 0 0 0 0.5px #111",
                }}/>
                {/* Camera lens */}
                <div style={{
                  width:10, height:10, borderRadius:"50%",
                  background:"#0d0d10", border:"1.5px solid #222230",
                  boxShadow:"inset 0 0 4px rgba(80,140,255,0.35), 0 0 0 1px #111",
                }}/>
              </div>

              {/* All screens */}
              <div style={{ position:"absolute", inset:0 }}>
                {screen===S.SPLASH    && <SplashScreen onDone={()=>setScreen(S.LOGIN)}/>}
                {screen===S.LOGIN     && <LoginScreen onLogin={()=>setScreen(S.HOME)} onRegister={()=>setScreen(S.REGISTER)}/>}
                {screen===S.REGISTER  && <RegisterScreen onRegister={()=>setScreen(S.HOME)} onBack={()=>setScreen(S.LOGIN)}/>}
                {screen===S.HOME      && <HomeScreen onNav={nav} user={user} subscriptions={subscriptions}/>}
                {screen===S.GYMS      && <GymsScreen onNav={nav} onSelect={setSelectedGym}/>}
                {screen===S.GYM_DETAIL && <GymDetailScreen gym={selectedGym} onNav={nav} onBack={()=>setScreen(S.GYMS)} onSubscribe={handleSubscribe} subscriptions={subscriptions}/>}
                {screen===S.INSTRUCTORS && <InstructorsScreen onNav={nav} onSelect={setSelectedInstructor}/>}
                {screen===S.INSTRUCTOR_DETAIL && <InstructorDetailScreen instructor={selectedInstructor} onNav={nav} onBack={()=>setScreen(S.INSTRUCTORS)}/>}
                {screen===S.BOOKING   && <BookingScreen instructor={selectedInstructor} onBack={()=>setScreen(S.INSTRUCTORS)}/>}
                {screen===S.HEALTH    && <HealthScreen onNav={nav}/>}
                {screen===S.HEALTH_DETAIL && <HealthDetailScreen tip={selectedData} onBack={()=>setScreen(S.HEALTH)}/>}
                {screen===S.DIET      && <DietScreen onNav={nav}/>}
                {screen===S.DIET_DETAIL && <DietDetailScreen plan={selectedData} onBack={()=>setScreen(S.DIET)}/>}
                {screen===S.WEIGHT    && <WeightScreen onNav={nav}/>}
                {screen===S.WEIGHT_DETAIL && <WeightDetailScreen program={selectedData} onBack={()=>setScreen(S.WEIGHT)}/>}
                {screen===S.SUBSCRIBE_SUCCESS && subSuccess && <SubscribeSuccess plan={subSuccess.plan} gym={subSuccess.gym} onContinue={()=>setScreen(S.HOME)}/>}
                {screen===S.PROFILE   && <ProfileScreen user={user} subscriptions={subscriptions} onLogout={()=>setScreen(S.LOGIN)}/>}
              </div>
              {showNav && <Nav screen={screen} onNav={nav}/>}
            </div>{/* end screen */}

            {/* Home indicator pill — sits in bezel below screen */}
            <div style={{
              position:"absolute", bottom:12, left:0, right:0,
              display:"flex", justifyContent:"center", pointerEvents:"none",
            }}>
              <div style={{
                width:120, height:5, borderRadius:3,
                background:"rgba(255,255,255,0.24)",
              }}/>
            </div>

            {/* Glass glare — top-left shimmer */}
            <div style={{
              position:"absolute", top:0, left:0,
              width:"50%", height:"38%",
              background:"linear-gradient(135deg,rgba(255,255,255,0.07),transparent)",
              borderRadius:"0 0 100% 0",
              pointerEvents:"none",
            }}/>

          </div>{/* end glass face */}

          {/* USB-C cutout */}
          <div style={{
            position:"absolute", bottom:0, left:"50%",
            transform:"translateX(-50%)",
            width:52, height:5,
            borderRadius:"3px 3px 0 0",
            background:"#060608",
          }}/>
          {/* Speaker grilles */}
          {[-34,-26,-18,-10,10,18,26,34].map(ox=>(
            <div key={ox} style={{
              position:"absolute", bottom:4,
              left:`calc(50% + ${ox}px)`,
              width:3, height:3, borderRadius:"50%",
              background:"#282828",
            }}/>
          ))}

        </div>{/* end titanium shell */}

        {/* Drop shadow below phone */}
        <div style={{
          position:"absolute", bottom:-16, left:"18%", right:"18%",
          height:20, borderRadius:"50%",
          background:"rgba(0,0,0,0.55)",
          filter:"blur(14px)",
        }}/>

      </div>{/* end phone wrapper */}
    </div>
  );
}