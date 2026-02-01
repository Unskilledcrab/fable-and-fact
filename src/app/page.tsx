"use client";

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { Sparkles, Users, Loader2, Fingerprint, Clock, Shield, Unlock, Lock, ArrowLeft, Smartphone, BookOpen, UserCheck, AlertCircle } from 'lucide-react';

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
  const [glitch, setGlitch] = useState(false);

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
        title: "THE LAST LEDGER OF LOXLEY",
        setting: "An opulent Art Deco ballroom, 1929.",
        publicLore: "The city's elite have gathered to celebrate the 50th anniversary of Loxley Bank. Rumors of a merger have been swirling in the press all week. Everyone knows the vault contains the 'Founders' Ledger,' a book said to hold the true history of every fortune in the city.",
        premise: "Mid-toast, the lights cut out. A scream, a crash, and when the backup generators kick in, Lord Loxley is on the floor and the vault is wide open.",
        storyline: [
          { time: "8:00 PM", event: "Arrival & Cocktails. Guests are encouraged to find their initial allies." },
          { time: "11:30 PM", event: "The Confrontation. All guests gather for the final reveal." }
        ],
        characters: [
          { 
            name: "Vivian Vane", role: "The Lounge Singer", faction: "THE SYNDICATE", difficulty: "Easy",
            personalLore: "While performing, you noticed Lord Loxley slip a small brass key into his vest pocket—a key that doesn't belong to the vault.",
            secret: "You are actually the daughter of the man Loxley swindled to build this bank.", 
            objective: "Retrieve the brass key and find what it opens.", 
            allies: ["Arthur Miller"] 
          },
          { 
            name: "Detective Sharp", role: "The Guest", faction: "LAW", difficulty: "Hard",
            personalLore: "Your informant told you that the 'Lights Out' wasn't a glitch—it was triggered from the servant's quarters.",
            secret: "You are being paid by a rival bank to ensure the Ledger disappears tonight.", 
            objective: "Intercept whoever has the Ledger before they reach the exit.", 
            allies: [] 
          }
        ]
      };
      setMystery(newMystery);
    } catch (error) { console.error(error); } finally { setLoading(false); }
  };

  if (!isHydrated) return null;

  const containerStyle: React.CSSProperties = { backgroundColor: '#000', minHeight: '100vh', color: '#fff', padding: '15px', fontFamily: 'sans-serif', opacity: glitch ? 0.4 : 1, transition: 'opacity 0.15s ease' };
  const cardStyle: React.CSSProperties = { background: '#fff', color: '#000', padding: '24px', boxShadow: '10px 10px 0px #b91c1c', borderRadius: '2px', marginBottom: '25px' };
  const buttonStyle: React.CSSProperties = { width: '100%', padding: '18px', background: '#b91c1c', color: '#fff', border: 'none', borderRadius: '4px', fontWeight: '900', letterSpacing: '1px', cursor: 'pointer' };

  // --- PLAYER VIEW ---
  if (mystery && view === 'player' && activePlayerIndex !== null) {
    const char = mystery.characters[activePlayerIndex];
    return (
      <div style={{ ...containerStyle, fontFamily: 'monospace' }}>
        <button onClick={() => { setURLState('gm'); setRevealSecret(false); }} style={{ background: 'transparent', border: 'none', color: '#b91c1c', fontSize: '11px', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '30px', cursor: 'pointer' }}>
          <ArrowLeft size={16} /> EXIT_SESSION
        </button>
        
        <div style={{ background: '#0a0a0a', padding: '20px', border: '1px solid #222', borderLeft: '5px solid #b91c1c' }}>
          <div style={{ fontSize: '9px', fontWeight: 'bold', color: '#b91c1c', letterSpacing: '3px', marginBottom: '15px' }}>// {char.name.toUpperCase()}</div>
          <h2 style={{ fontSize: '24px', fontWeight: '900', margin: 0 }}>{char.role}</h2>
          <div style={{ fontSize: '11px', color: '#666', marginBottom: '25px' }}>{char.faction}</div>

          {/* Public Lore (Shared) */}
          <div style={{ marginBottom: '25px', padding: '12px', background: '#111', borderRadius: '4px' }}>
            <div style={{ fontSize: '10px', color: '#888', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '8px' }}><BookOpen size={12} /> PUBLIC INTEL</div>
            <p style={{ margin: 0, fontSize: '13px', color: '#aaa', fontStyle: 'italic', lineHeight: '1.4' }}>{mystery.publicLore}</p>
          </div>

          {/* Personal Lore (Specific to Player) */}
          <div style={{ marginBottom: '25px', padding: '12px', background: '#0f0f1a', border: '1px solid #224', borderRadius: '4px' }}>
            <div style={{ fontSize: '10px', color: '#55c', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '8px' }}><UserCheck size={12} /> PRIVATE OBSERVATIONS</div>
            <p style={{ margin: 0, fontSize: '14px', color: '#ccd', lineHeight: '1.5', fontWeight: '500' }}>{char.personalLore}</p>
          </div>

          <div style={{ marginBottom: '25px', borderTop: '1px solid #222', paddingTop: '20px' }}>
            <div style={{ fontSize: '10px', color: '#16a34a', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '8px' }}><Unlock size={12} /> MISSION OBJECTIVE</div>
            <p style={{ margin: 0, fontSize: '15px', fontWeight: 'bold', color: '#eee' }}>{char.objective}</p>
          </div>

          <div style={{ padding: '20px', background: revealSecret ? '#1a0505' : '#111', border: `1px solid ${revealSecret ? '#b91c1c' : '#222'}` }}>
            <div style={{ fontSize: '10px', color: '#b91c1c', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '15px' }}><Lock size={12} /> CLASSIFIED SECRET</div>
            {!revealSecret ? (
              <button onClick={() => setRevealSecret(true)} style={{ ...buttonStyle, padding: '12px' }}>UNSEAL DATA</button>
            ) : (
              <div onClick={() => setRevealSecret(false)}>
                <p style={{ margin: 0, fontSize: '15px', fontStyle: 'italic', color: '#ffbaba', lineHeight: '1.5' }}>{char.secret}</p>
                <div style={{ marginTop: '20px', fontSize: '8px', color: '#633', textAlign: 'center' }}>[ TAP TO LOCK ]</div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  // --- GM VIEW ---
  return (
    <div style={containerStyle}>
      <header style={{ borderBottom: '1px solid #333', paddingBottom: '15px', marginBottom: '25px' }}>
        <div style={{ color: '#b91c1c', fontSize: '10px', fontWeight: 'bold', letterSpacing: '2px', marginBottom: '8px' }}>INTEL OPS // V.10</div>
        <h1 style={{ fontSize: '42px', fontWeight: '900', margin: 0, fontStyle: 'italic', lineHeight: '0.8' }}>FABLE <span style={{ color: '#b91c1c' }}>FACT</span></h1>
      </header>

      {!mystery ? (
        <div style={{ background: '#111', padding: '20px', border: '1px solid #222' }}>
          <input style={{ ...buttonStyle, background: '#000', border: '1px solid #333', textAlign: 'left' }} placeholder="Enter theme..." value={theme} onChange={(e) => setTheme(e.target.value)} />
          <button onClick={handleGenerate} disabled={loading || !theme} style={{ ...buttonStyle, marginTop: '20px' }}>{loading ? 'COMPILING...' : 'INITIALIZE'}</button>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div style={cardStyle}>
            <h2 style={{ fontSize: '22px', fontWeight: '900', borderBottom: '3px solid #000', paddingBottom: '10px', marginBottom: '15px' }}>{mystery.title}</h2>
            <div style={{ marginBottom: '20px' }}>
               <h4 style={{ fontSize: '9px', fontWeight: 'bold', color: '#b91c1c', marginBottom: '5px' }}>PUBLIC LORE (EVERYONE KNOWS)</h4>
               <p style={{ fontSize: '13px', margin: 0, fontStyle: 'italic' }}>{mystery.publicLore}</p>
            </div>
            <div style={{ fontSize: '10px', fontWeight: '900', marginBottom: '10px' }}>SUBJECT DIRECTORY</div>
            {mystery.characters.map((char: any, i: number) => (
              <div key={i} style={{ background: '#f5f5f5', padding: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                <div style={{ fontSize: '14px' }}><b>{char.name}</b><br/><small style={{ color: '#666' }}>{char.role}</small></div>
                <button onClick={() => setURLState('player', i)} style={{ background: '#000', color: '#fff', border: 'none', padding: '10px', borderRadius: '4px' }}><Smartphone size={16} /></button>
              </div>
            ))}
            <button onClick={() => { localStorage.removeItem('current_mystery'); setMystery(null); }} style={{ marginTop: '20px', width: '100%', background: '#000', color: '#fff', padding: '10px', fontSize: '10px' }}>SCRAP DATA</button>
          </div>
        </div>
      )}
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
