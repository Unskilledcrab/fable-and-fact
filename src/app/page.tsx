"use client";

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { Sparkles, Users, Loader2, Fingerprint, BookOpen, UserCheck, Unlock, Lock, ArrowLeft, Smartphone, ChevronRight } from 'lucide-react';
import { useAppState } from '../lib/state';
import { nanoid } from 'nanoid';

const COLORS = {
  bg: '#09090b',
  card: '#18181b',
  accent: '#e11d48',
  text: '#fafafa',
  muted: '#71717a',
  border: '#27272a'
};

function FableAndFact() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { state, setMystery, setTheme, setPlayerCount } = useAppState();
  
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
      await new Promise(r => setTimeout(r, 1200));
      const newMystery = {
        id: nanoid(),
        title: "THE LAST LEDGER OF LOXLEY",
        setting: "An opulent Art Deco ballroom, 1929.",
        publicLore: "The city's elite celebrate Loxley Bank's 50th anniversary.",
        premise: "The lights cut out. Lord Loxley is dead.",
        storyline: [{ time: "8:00 PM", event: "Arrival" }],
        characters: [
          { id: nanoid(), name: "Vivian Vane", role: "Lounge Singer", faction: "THE SYNDICATE", difficulty: "Easy", personalLore: "You saw a key.", secret: "You are seeking revenge.", objective: "Find the key.", allies: ["Arthur Miller"] },
          { id: nanoid(), name: "Detective Sharp", role: "The Guest", faction: "LAW", difficulty: "Hard", personalLore: "Sabotage suspected.", secret: "Paid to hide the ledger.", objective: "Intercept the thief.", allies: [] }
        ]
      };
      // @ts-ignore
      setMystery(newMystery);
    } catch (error) { console.error(error); } finally { setLoading(false); }
  };

  if (state.currentMystery && view === 'player' && activePlayerIndex !== null) {
    const char = state.currentMystery.characters[activePlayerIndex];
    return (
      <div style={{ backgroundColor: COLORS.bg, minHeight: '100vh', color: COLORS.text, padding: '24px', opacity: glitch ? 0.4 : 1 }}>
        <button onClick={() => { setURLState('gm'); setRevealSecret(false); }} style={{ background: 'none', border: 'none', color: COLORS.muted, fontSize: '12px', display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '32px', cursor: 'pointer' }}>
          <ArrowLeft size={16} /> BACK TO DASHBOARD
        </button>
        <div style={{ marginBottom: '32px' }}>
          <div style={{ color: COLORS.accent, fontSize: '12px', fontWeight: '700' }}>{char.faction}</div>
          <h2 style={{ fontSize: '36px', fontWeight: '900', margin: 0 }}>{char.name}</h2>
          <p style={{ color: COLORS.muted }}>{char.role}</p>
        </div>
        <div style={{ background: COLORS.card, padding: '20px', borderRadius: '12px', border: `1px solid ${COLORS.border}`, marginBottom: '20px' }}>
          <p style={{ margin: 0, fontSize: '14px', color: COLORS.muted }}>{state.currentMystery.publicLore}</p>
        </div>
        <div style={{ background: COLORS.card, padding: '20px', borderRadius: '12px', border: `1px solid ${COLORS.border}`, marginBottom: '20px' }}>
          <p style={{ margin: 0, fontSize: '15px' }}>{char.personalLore}</p>
        </div>
        {!revealSecret ? (
          <button onClick={() => setRevealSecret(true)} style={{ width: '100%', padding: '20px', borderRadius: '12px', background: COLORS.text, color: COLORS.bg, border: 'none', fontWeight: '800' }}>REVEAL SECRET</button>
        ) : (
          <div onClick={() => setRevealSecret(false)} style={{ background: '#450a0a', padding: '24px', borderRadius: '12px', border: `2px solid ${COLORS.accent}` }}>
            <p style={{ margin: 0, fontStyle: 'italic' }}>{char.secret}</p>
          </div>
        )}
      </div>
    );
  }

  return (
    <div style={{ backgroundColor: COLORS.bg, minHeight: '100vh', color: COLORS.text, padding: '24px', opacity: glitch ? 0.4 : 1 }}>
      <div style={{ maxWidth: '600px', margin: '0 auto' }}>
        <h1 style={{ fontSize: '24px', fontWeight: '800' }}>FABLE<span style={{ color: COLORS.accent }}>FACT</span></h1>
        {!state.currentMystery ? (
          <div style={{ background: COLORS.card, padding: '32px', borderRadius: '16px', border: `1px solid ${COLORS.border}`, marginTop: '40px' }}>
            <input style={{ width: '100%', background: COLORS.bg, border: `1px solid ${COLORS.border}`, padding: '16px', color: '#fff', borderRadius: '12px', marginBottom: '20px' }} placeholder="Theme..." value={state.theme} onChange={(e) => setTheme(e.target.value)} />
            <button onClick={handleGenerate} disabled={loading || !state.theme} style={{ width: '100%', padding: '20px', background: COLORS.accent, color: '#fff', border: 'none', borderRadius: '12px', fontWeight: '800' }}>
              {loading ? 'GENERATING...' : 'GENERATE MYSTERY'}
            </button>
          </div>
        ) : (
          <div style={{ background: COLORS.card, padding: '24px', borderRadius: '16px', border: `1px solid ${COLORS.border}`, marginTop: '40px' }}>
            <h2 style={{ fontSize: '20px', fontWeight: '800' }}>{state.currentMystery.title}</h2>
            {state.currentMystery.characters.map((char, i) => (
              <div key={i} onClick={() => setURLState('player', i)} style={{ background: COLORS.bg, border: `1px solid ${COLORS.border}`, padding: '16px', borderRadius: '12px', display: 'flex', justifyContent: 'space-between', marginBottom: '10px', cursor: 'pointer' }}>
                <div><b>{char.name}</b><br/><small>{char.role}</small></div>
                <ChevronRight size={18} color={COLORS.muted} />
              </div>
            ))}
            <button onClick={() => setMystery(null)} style={{ width: '100%', background: 'none', border: `1px solid ${COLORS.border}`, color: COLORS.muted, padding: '10px', marginTop: '20px', borderRadius: '8px' }}>START OVER</button>
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
