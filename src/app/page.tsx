"use client";

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { Sparkles, Users, Loader2, Fingerprint, BookOpen, UserCheck, Unlock, Lock, ArrowLeft, Smartphone, ChevronRight, Clock, MapPin } from 'lucide-react';
import { useAppState } from '../lib/state';
import { nanoid } from 'nanoid';

const COLORS = {
  bg: '#09090b',
  card: '#18181b',
  accent: '#e11d48',
  text: '#fafafa',
  muted: '#71717a',
  border: '#27272a',
  glow: 'rgba(225, 29, 72, 0.15)'
};

function FableAndFact() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { state, setMystery, setTheme } = useAppState();
  
  const view = searchParams.get('view') || 'gm';
  const activePlayerIndex = searchParams.get('p') !== null ? parseInt(searchParams.get('p')!) : null;

  const [loading, setLoading] = useState(false);
  const [revealSecret, setRevealSecret] = useState(false);
  const [glitch, setGlitch] = useState(false);

  const setURLState = (newView: string, pIdx: number | null = null) => {
    const params = new URLSearchParams();
    params.set('view', newView);
    if (pIdx !== null) params.set('p', pIdx.toString());
    router.replace(`?${params.toString()}`);
  };

  useEffect(() => {
    setGlitch(true);
    const timer = setTimeout(() => setGlitch(false), 150);
    return () => clearTimeout(timer);
  }, [view, activePlayerIndex]);

  const handleGenerate = async () => {
    setLoading(true);
    try {
      await new Promise(r => setTimeout(r, 1800));
      const fullSimulation: any = {
        id: nanoid(),
        title: "NEON BLOOD & IRON LIES",
        setting: "The 'Apex Lounge' - a high-altitude penthouse in Neo-Tokyo, 2084. Rain slashes against bulletproof glass while neon billboards bleed crimson light into the smoke-filled room. Outside, the sprawling slums of the Undercity are barely visible through the smog.",
        publicLore: "The 'Unity Summit' is tonight. The two largest megacorps, Ishida Heavy Industries and Borealis Tech, are signing a peace treaty that will end the decades-long street wars. Everyone here is part of the corporate elite, but the atmosphere is tense—security is at Max Level because of recent 'Ghost Virus' threats from the resistance.",
        premise: "At precisely 9:00 PM, during the toast to 'A Borderless Future,' the Ishida CEO's cybernetic heart is hacked and remotely overloaded. He dies instantly. The penthouse is automatically sealed by the AI Security System—nobody leaves until the killer is identified. But the Ishida server holding the treaty data has also been wiped.",
        storyline: [
          { time: "8:00 PM", event: "Arrival & Networking. Guests receive their corporate credentials and are encouraged to form alliances." },
          { time: "8:45 PM", event: "The Last Toast. High tension as the CEOs prepare to sign. Borealis Tech security is spotted whispering in the corner." },
          { time: "9:00 PM", event: "THE BLACKOUT. The Ishida CEO collapses. Penthouse enters lockdown mode. Red sirens pulse." },
          { time: "9:45 PM", event: "Evidence Spike. A discarded 'Ghost Virus' drive is found in the vents. It contains the fingerprint of one guest." },
          { time: "10:30 PM", event: "The Leak. Corporate secrets start being broadcasted over the lounge's private comms system. Factions begin to scramble." },
          { time: "11:30 PM", event: "The Final Proxy Vote. Security override occurs. Guests must accuse the killer or the AI will vent the room." }
        ],
        characters: [
          { 
            id: nanoid(), 
            name: "Sato Ishida", 
            role: "Ishida Heir", 
            faction: "ISHIDA HEAVY IND.", 
            difficulty: "Medium", 
            personalLore: "You noticed your father (the CEO) looking terrified at his own head-up display (HUD) seconds before the collapse. You also saw the Borealis Head of Security slip a wireless transmitter into his jacket.", 
            secret: "You are actually the one who leaked the Ishida server credentials to the resistance last month to spite your father.", 
            objective: "Recover the physical treaty drive to prove your father's legacy isn't dead, and frame Borealis for the hack.", 
            allies: ["Unit 7"] 
          },
          { 
            id: nanoid(), 
            name: "Dr. Elena Vance", 
            role: "Lead Neuro-Engineer", 
            faction: "BOREALIS TECH", 
            difficulty: "Hard", 
            personalLore: "You designed the Ishida CEO's heart regulator. You know for a fact that it can't be hacked without an internal Borealis override code—codes only you and the Borealis CEO possess.", 
            secret: "You are a double agent for the 'Undercity Ghost' resistance. You sabotaged the regulator, but didn't expect it to kill him.", 
            objective: "Locate the 'Ghost Virus' drive and destroy it before corporate security finds it. Avoid being the scapegoat.", 
            allies: [] 
          },
          { 
            id: nanoid(), 
            name: "Unit 7", 
            role: "Security Chief", 
            faction: "ISHIDA HEAVY IND.", 
            difficulty: "Easy", 
            personalLore: "Your scanners detected a massive surge of encrypted data leaving the penthouse 2 minutes *after* the lockdown started. The source was a guest's mobile terminal.", 
            secret: "You were ordered to assassinate the Borealis CEO tonight if the signing went through. You are still armed.", 
            objective: "Identify the hacker and use the chaos to carry out your original hit on the Borealis CEO.", 
            allies: ["Sato Ishida"] 
          }
        ]
      };
      setMystery(fullSimulation);
    } catch (error) { console.error(error); } finally { setLoading(false); }
  };

  // --- PLAYER VIEW ---
  if (state.currentMystery && view === 'player' && activePlayerIndex !== null) {
    const char = state.currentMystery.characters[activePlayerIndex];
    if (!char) return <div style={{ color: '#fff', padding: '20px' }}>SUBJECT_RECORDS_NOT_FOUND</div>;
    return (
      <div style={{ backgroundColor: COLORS.bg, minHeight: '100vh', color: COLORS.text, padding: '20px', fontFamily: 'monospace', opacity: glitch ? 0.4 : 1, transition: 'opacity 0.15s ease' }}>
        <button onClick={() => { setURLState('gm'); setRevealSecret(false); }} style={{ background: 'none', border: 'none', color: COLORS.muted, fontSize: '11px', display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '32px', cursor: 'pointer', padding: 0 }}>
          <ArrowLeft size={16} /> DISCONNECT_TERMINAL
        </button>

        <div style={{ marginBottom: '32px', borderLeft: `4px solid ${COLORS.accent}`, paddingLeft: '16px' }}>
          <div style={{ color: COLORS.accent, fontSize: '10px', fontWeight: '800', marginBottom: '8px', letterSpacing: '0.2em' }}>{char.faction}</div>
          <h2 style={{ fontSize: '32px', fontWeight: '900', margin: 0, lineHeight: 1 }}>{char.name}</h2>
          <p style={{ color: COLORS.muted, margin: '8px 0 0 0', fontSize: '14px', textTransform: 'uppercase' }}>{char.role} // CLASS {char.difficulty}</p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div style={{ background: COLORS.card, padding: '20px', borderRadius: '8px', border: `1px solid ${COLORS.border}` }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: COLORS.accent, fontSize: '10px', fontWeight: '800', marginBottom: '12px', textTransform: 'uppercase' }}>
              <BookOpen size={14} /> Shared Intelligence
            </div>
            <p style={{ margin: 0, fontSize: '14px', lineHeight: '1.6', color: '#a1a1aa' }}>{state.currentMystery.publicLore}</p>
          </div>

          <div style={{ background: '#0f0f1a', padding: '20px', borderRadius: '8px', border: `1px solid #224` }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#818cf8', fontSize: '10px', fontWeight: '800', marginBottom: '12px', textTransform: 'uppercase' }}>
              <UserCheck size={14} /> Private Observations
            </div>
            <p style={{ margin: 0, fontSize: '15px', lineHeight: '1.6', color: '#e4e4e7', fontWeight: '500' }}>{char.personalLore}</p>
          </div>

          <div style={{ background: 'rgba(16, 185, 129, 0.1)', padding: '20px', borderRadius: '8px', border: '1px solid rgba(16, 185, 129, 0.3)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#10b981', fontSize: '10px', fontWeight: '800', marginBottom: '12px', textTransform: 'uppercase' }}>
              <Unlock size={14} /> Mission Objective
            </div>
            <p style={{ margin: 0, fontSize: '16px', lineHeight: '1.5', fontWeight: '700', color: '#fff' }}>{char.objective}</p>
          </div>

          <div style={{ marginTop: '12px' }}>
            {!revealSecret ? (
              <button 
                onClick={() => setRevealSecret(true)}
                style={{ width: '100%', padding: '24px', borderRadius: '8px', background: COLORS.text, color: COLORS.bg, border: 'none', fontWeight:900, fontSize: '13px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', letterSpacing: '0.1em' }}
              >
                <Lock size={18} /> UNSEAL SECURE DATA
              </button>
            ) : (
              <div 
                onClick={() => setRevealSecret(false)}
                style={{ background: '#310a0a', padding: '24px', borderRadius: '8px', border: `1px solid ${COLORS.accent}`, cursor: 'pointer' }}
              >
                <div style={{ fontSize: '10px', color: COLORS.accent, fontWeight: '800', marginBottom: '12px', textTransform: 'uppercase', letterSpacing: '0.1em' }}>CLASSIFIED_ENVELOPE</div>
                <p style={{ margin: 0, fontSize: '16px', lineHeight: '1.6', color: '#fecdd3', fontStyle: 'italic' }}>{char.secret}</p>
                <div style={{ marginTop: '20px', fontSize: '8px', color: '#633', textAlign: 'center', fontWeight: '800' }}>[ TAP TO RE-ENCRYPT ]</div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  // --- GM DASHBOARD ---
  return (
    <div style={{ backgroundColor: COLORS.bg, minHeight: '100vh', color: COLORS.text, padding: '20px', fontFamily: 'system-ui, sans-serif', opacity: glitch ? 0.4 : 1 }}>
      <div style={{ maxWidth: '600px', margin: '0 auto' }}>
        <header style={{ marginBottom: '40px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h1 style={{ fontSize: '24px', fontWeight: '800', letterSpacing: '-0.025em', margin: 0, color: COLORS.text }}>
              FABLE<span style={{ color: COLORS.accent }}>FACT</span>
            </h1>
            <div style={{ fontSize: '10px', color: COLORS.muted, fontWeight: '500', textTransform: 'uppercase', letterSpacing: '0.1em', marginTop: '4px' }}>
              Intelligence Orchestrator // v1.2
            </div>
          </div>
          <Fingerprint size={20} color={COLORS.accent} />
        </header>

        {!state.currentMystery ? (
          <div style={{ background: COLORS.card, padding: '32px', borderRadius: '16px', border: `1px solid ${COLORS.border}`, boxShadow: `0 20px 40px rgba(0,0,0,0.4)` }}>
            <div style={{ marginBottom: '24px' }}>
              <label style={{ display: 'block', fontSize: '11px', fontWeight: '800', color: COLORS.muted, marginBottom: '12px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Scenario Motif</label>
              <input 
                style={{ width: '100%', background: COLORS.bg, border: `1px solid ${COLORS.border}`, padding: '16px', color: '#fff', fontSize: '16px', borderRadius: '12px', outline: 'none', boxSizing: 'border-box' }}
                placeholder="e.g. Cyberpunk Heist, Victorian Seance..."
                value={state.theme}
                onChange={(e) => setTheme(e.target.value)}
              />
            </div>
            
            <button 
              onClick={handleGenerate}
              disabled={loading || !state.theme}
              style={{ width: '100%', padding: '20px', background: COLORS.accent, color: '#fff', border: 'none', borderRadius: '12px', fontWeight: '800', fontSize: '14px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', transition: 'all 0.2s' }}
            >
              {loading ? <Loader2 className="animate-spin" size={20} /> : <Sparkles size={20} />}
              {loading ? 'CALCULATING TIMELINES...' : 'INITIATE FULL SIMULATION'}
            </button>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div style={{ background: COLORS.card, padding: '24px', borderRadius: '16px', border: `1px solid ${COLORS.border}` }}>
              <h2 style={{ fontSize: '24px', fontWeight: '900', margin: '0 0 16px 0', borderLeft: `4px solid ${COLORS.accent}`, paddingLeft: '16px' }}>{state.currentMystery.title}</h2>
              <div style={{ display: 'flex', alignItems: 'start', gap: '10px', marginBottom: '20px', color: COLORS.muted }}>
                <MapPin size={16} style={{ marginTop: '3px' }} />
                <p style={{ margin: 0, fontSize: '13px', lineHeight: '1.5' }}>{state.currentMystery.setting}</p>
              </div>

              <div style={{ background: COLORS.bg, padding: '16px', borderRadius: '12px', border: `1px solid ${COLORS.border}`, marginBottom: '32px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: COLORS.accent, fontSize: '10px', fontWeight: '800', marginBottom: '10px', textTransform: 'uppercase' }}>
                  <Clock size={14} /> 4-Hour Operation Timeline
                </div>
                {state.currentMystery.storyline.map((s:any, i:number) => (
                   <div key={i} style={{ display: 'flex', gap: '12px', fontSize: '12px', marginBottom: '10px', borderBottom: i === state.currentMystery.storyline.length - 1 ? 'none' : `1px solid ${COLORS.border}`, paddingBottom: '10px' }}>
                      <span style={{ fontWeight: '800', color: COLORS.text }}>{s.time}</span>
                      <span style={{ color: COLORS.muted }}>{s.event}</span>
                   </div>
                ))}
              </div>

              <div style={{ fontSize: '10px', fontWeight: '800', color: COLORS.muted, marginBottom: '16px', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Target Personnel</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {state.currentMystery.characters.map((char: any, i: number) => (
                  <div 
                    key={i} 
                    onClick={() => setURLState('player', i)}
                    style={{ background: COLORS.bg, border: `1px solid ${COLORS.border}`, padding: '16px', borderRadius: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer' }}
                  >
                    <div>
                      <div style={{ fontSize: '15px', fontWeight: '800' }}>{char.name}</div>
                      <div style={{ fontSize: '11px', color: COLORS.accent, fontWeight: '700', marginTop: '2px' }}>{char.faction}</div>
                    </div>
                    <Smartphone size={18} color={COLORS.muted} />
                  </div>
                ))}
              </div>

              <button 
                onClick={() => { localStorage.removeItem('fable_and_fact_state'); setMystery(null); }}
                style={{ marginTop: '32px', width: '100%', padding: '16px', background: 'transparent', color: '#633', border: `1px solid #311`, borderRadius: '12px', fontSize: '11px', fontWeight: '800', textTransform: 'uppercase', cursor: 'pointer' }}
              >
                Purge Database & Restart
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <Suspense fallback={null}>
      <FableAndFact />
    </Suspense>
  );
}
