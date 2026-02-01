"use client";

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { Sparkles, Users, Loader2, Fingerprint, Clock, Shield, Unlock, Lock, ArrowLeft, Smartphone, BookOpen, UserCheck, AlertCircle, Menu, X, ChevronRight } from 'lucide-react';

// --- STYLES CONSTANTS ---
const COLORS = {
  bg: '#09090b',
  card: '#18181b',
  accent: '#e11d48', // Rose 600
  text: '#fafafa',
  muted: '#71717a',
  border: '#27272a',
  success: '#10b981'
};

function FableAndFact() {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const view = searchParams.get('view') || 'gm';
  const activePlayerIndex = searchParams.get('p') !== null ? parseInt(searchParams.get('p')!) : null;

  const [mystery, setMystery] = useState<any>(null);
  const [isHydrated, setIsHydrated] = useState(false);
  const [loading, setLoading] = useState(false);
  const [theme, setTheme] = useState("");
  const [players, setPlayers] = useState(6);
  const [revealSecret, setRevealSecret] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('current_mystery');
    if (saved) {
      try { setMystery(JSON.parse(saved)); } catch (e) { console.error(e); }
    }
    setIsHydrated(true);
  }, []);

  useEffect(() => {
    if (mystery) localStorage.setItem('current_mystery', JSON.stringify(mystery));
  }, [mystery]);

  const setURLState = (newView: string, pIdx: number | null = null) => {
    const params = new URLSearchParams();
    params.set('view', newView);
    if (pIdx !== null) params.set('p', pIdx.toString());
    router.replace(`?${params.toString()}`);
  };

  const handleGenerate = async () => {
    setLoading(true);
    try {
      await new Promise(r => setTimeout(r, 1200));
      setMystery({
        title: "THE LAST LEDGER OF LOXLEY",
        setting: "An opulent Art Deco ballroom, 1929. Gold leaf accents catch the flickering candlelight as a storm rages outside.",
        publicLore: "The city's elite celebrate Loxley Bank's 50th anniversary. Everyone whispers about the 'Founders' Ledger,' a book containing every fortune's dirty secret.",
        premise: "The lights cut out during the toast. A crash sounds. When they return, Lord Loxley is dead and the vault stands empty.",
        characters: [
          { name: "Vivian Vane", role: "Lounge Singer", faction: "THE SYNDICATE", difficulty: "Easy", personalLore: "You saw Loxley hide a small brass key in his vest pocket before the lights went out.", secret: "You are the daughter of the man Loxley betrayed to build this empire.", objective: "Find that brass key and what it unlocks.", allies: ["Arthur Miller"] },
          { name: "Detective Sharp", role: "The Guest", faction: "LAW", difficulty: "Hard", personalLore: "Your contact told you the power cut was manual, triggered from the servant's hall.", secret: "A rival bank paid you to make sure the Ledger never leaves this house tonight.", objective: "Intercept the thief before they reach the gate.", allies: [] }
        ]
      });
    } catch (error) { console.error(error); } finally { setLoading(false); }
  };

  if (!isHydrated) return null;

  // --- REUSABLE COMPONENTS ---
  const Header = () => (
    <header style={{ marginBottom: '40px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <div>
        <h1 style={{ fontSize: '24px', fontWeight: '800', letterSpacing: '-0.025em', margin: 0, color: COLORS.text }}>
          FABLE<span style={{ color: COLORS.accent }}>FACT</span>
        </h1>
        <div style={{ fontSize: '10px', color: COLORS.muted, fontWeight: '500', textTransform: 'uppercase', letterSpacing: '0.1em', marginTop: '4px' }}>
          Mystery Orchestrator // v1.1
        </div>
      </div>
      <div style={{ padding: '8px', borderRadius: '50%', background: COLORS.card, border: `1px solid ${COLORS.border}` }}>
        <Fingerprint size={20} color={COLORS.accent} />
      </div>
    </header>
  );

  // --- PLAYER VIEW (MOBILE OPTIMIZED) ---
  if (mystery && view === 'player' && activePlayerIndex !== null) {
    const char = mystery.characters[activePlayerIndex];
    return (
      <div style={{ backgroundColor: COLORS.bg, minHeight: '100vh', color: COLORS.text, padding: '24px', fontFamily: 'system-ui, -apple-system, sans-serif' }}>
        <button onClick={() => { setURLState('gm'); setRevealSecret(false); }} style={{ background: 'none', border: 'none', color: COLORS.muted, fontSize: '12px', display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '32px', cursor: 'pointer', padding: 0 }}>
          <ArrowLeft size={16} /> BACK TO DASHBOARD
        </button>

        <div style={{ marginBottom: '32px' }}>
          <div style={{ color: COLORS.accent, fontSize: '12px', fontWeight: '700', marginBottom: '8px' }}>{char.faction}</div>
          <h2 style={{ fontSize: '36px', fontWeight: '900', margin: 0, lineHeight: 1 }}>{char.name}</h2>
          <p style={{ color: COLORS.muted, margin: '8px 0 0 0', fontSize: '16px' }}>{char.role}</p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div style={{ background: COLORS.card, padding: '20px', borderRadius: '12px', border: `1px solid ${COLORS.border}` }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: COLORS.muted, fontSize: '11px', fontWeight: '700', marginBottom: '12px', textTransform: 'uppercase' }}>
              <BookOpen size={14} /> World Intel
            </div>
            <p style={{ margin: 0, fontSize: '14px', lineHeight: '1.6', color: '#a1a1aa' }}>{mystery.publicLore}</p>
          </div>

          <div style={{ background: COLORS.card, padding: '20px', borderRadius: '12px', border: `1px solid ${COLORS.border}` }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#818cf8', fontSize: '11px', fontWeight: '700', marginBottom: '12px', textTransform: 'uppercase' }}>
              <UserCheck size={14} /> Personal Note
            </div>
            <p style={{ margin: 0, fontSize: '15px', lineHeight: '1.6', color: '#e4e4e7', fontWeight: '500' }}>{char.personalLore}</p>
          </div>

          <div style={{ background: COLORS.accent + '15', padding: '20px', borderRadius: '12px', border: `1px solid ${COLORS.accent}40` }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: COLORS.accent, fontSize: '11px', fontWeight: '700', marginBottom: '12px', textTransform: 'uppercase' }}>
              <Unlock size={14} /> Mission Objective
            </div>
            <p style={{ margin: 0, fontSize: '16px', lineHeight: '1.5', fontWeight: '700', color: '#fff' }}>{char.objective}</p>
          </div>

          <div style={{ marginTop: '12px' }}>
            {!revealSecret ? (
              <button 
                onClick={() => setRevealSecret(true)}
                style={{ width: '100%', padding: '20px', borderRadius: '12px', background: COLORS.text, color: COLORS.bg, border: 'none', fontWeight: '800', fontSize: '14px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}
              >
                <Lock size={18} /> TAP TO REVEAL SECRET
              </button>
            ) : (
              <div 
                onClick={() => setRevealSecret(false)}
                style={{ background: '#450a0a', padding: '24px', borderRadius: '12px', border: `2px solid ${COLORS.accent}`, cursor: 'pointer' }}
              >
                <div style={{ fontSize: '11px', color: COLORS.accent, fontWeight: '800', marginBottom: '12px', textTransform: 'uppercase' }}>Classified Secret</div>
                <p style={{ margin: 0, fontSize: '16px', lineHeight: '1.6', color: '#fecdd3', fontStyle: 'italic' }}>{char.secret}</p>
                <div style={{ marginTop: '20px', fontSize: '10px', color: '#94a3b8', textAlign: 'center', opacity: 0.5 }}>[ TAP TO HIDE ]</div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  // --- GM DASHBOARD (MODERN SLEEK) ---
  return (
    <div style={{ backgroundColor: COLORS.bg, minHeight: '100vh', color: COLORS.text, padding: '24px', fontFamily: 'system-ui, -apple-system, sans-serif' }}>
      <div style={{ maxWidth: '600px', margin: '0 auto' }}>
        <Header />

        {!mystery ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <div style={{ background: COLORS.card, padding: '32px', borderRadius: '16px', border: `1px solid ${COLORS.border}` }}>
              <div style={{ marginBottom: '24px' }}>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: '700', color: COLORS.muted, marginBottom: '12px', textTransform: 'uppercase' }}>Scenario Motif</label>
                <input 
                  style={{ width: '100%', background: COLORS.bg, border: `1px solid ${COLORS.border}`, padding: '16px', color: '#fff', fontSize: '16px', borderRadius: '12px', outline: 'none' }}
                  placeholder="e.g. Victorian Manor, Cyberpunk heist..."
                  value={theme}
                  onChange={(e) => setTheme(e.target.value)}
                />
              </div>
              
              <div style={{ marginBottom: '32px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
                  <label style={{ fontSize: '12px', fontWeight: '700', color: COLORS.muted, textTransform: 'uppercase' }}>Operatives</label>
                  <span style={{ color: COLORS.accent, fontWeight: '800' }}>{players}</span>
                </div>
                <input 
                  type="range" min="3" max="12" 
                  style={{ width: '100%', accentColor: COLORS.accent }}
                  value={players}
                  onChange={(e) => setPlayers(parseInt(e.target.value))}
                />
              </div>

              <button 
                onClick={handleGenerate}
                disabled={loading || !theme}
                style={{ width: '100%', padding: '20px', background: COLORS.accent, color: '#fff', border: 'none', borderRadius: '12px', fontWeight: '800', fontSize: '14px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}
              >
                {loading ? <Loader2 className="animate-spin" /> : <Sparkles size={18} />}
                {loading ? 'COMPILING INTELLIGENCE...' : 'GENERATE MYSTERY'}
              </button>
            </div>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ background: COLORS.card, padding: '24px', borderRadius: '16px', border: `1px solid ${COLORS.border}` }}>
              <h2 style={{ fontSize: '20px', fontWeight: '800', margin: '0 0 20px 0', color: COLORS.text, borderLeft: `4px solid ${COLORS.accent}`, paddingLeft: '12px' }}>{mystery.title}</h2>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {mystery.characters.map((char: any, i: number) => (
                  <div 
                    key={i} 
                    onClick={() => setURLState('player', i)}
                    style={{ background: COLORS.bg, border: `1px solid ${COLORS.border}`, padding: '16px', borderRadius: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer' }}
                  >
                    <div>
                      <div style={{ fontSize: '14px', fontWeight: '700' }}>{char.name}</div>
                      <div style={{ fontSize: '11px', color: COLORS.muted, marginTop: '2px' }}>{char.role}</div>
                    </div>
                    <ChevronRight size={18} color={COLORS.muted} />
                  </div>
                ))}
              </div>

              <button 
                onClick={() => { localStorage.removeItem('current_mystery'); setMystery(null); }}
                style={{ marginTop: '24px', width: '100%', padding: '12px', background: 'transparent', color: COLORS.muted, border: `1px solid ${COLORS.border}`, borderRadius: '8px', fontSize: '10px', fontWeight: '700', textTransform: 'uppercase', cursor: 'pointer' }}
              >
                Scrap & Start Over
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
