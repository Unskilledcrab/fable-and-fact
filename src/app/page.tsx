"use client";

import React, { useState, useEffect, Suspense, useMemo } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { Sparkles, Users, Loader2, Fingerprint, Clock, Shield, Unlock, Lock, ArrowLeft, Smartphone } from 'lucide-react';

function FableAndFact() {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  // URL state is the single source of truth for view
  const view = searchParams.get('view') || 'gm';
  const activePlayerIndex = searchParams.get('p') !== null ? parseInt(searchParams.get('p')!) : null;

  const [mystery, setMystery] = useState<any>(null);
  const [isHydrated, setIsHydrated] = useState(false);
  const [loading, setLoading] = useState(false);
  const [theme, setTheme] = useState("");
  const [players, setPlayers] = useState(6);
  const [revealSecret, setRevealSecret] = useState(false);

  // Initialize from LocalStorage once on mount
  useEffect(() => {
    const saved = localStorage.getItem('current_mystery');
    if (saved) {
      try {
        setMystery(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to restore session", e);
      }
    }
    setIsHydrated(true);
  }, []);

  // Persist mystery changes
  useEffect(() => {
    if (mystery) {
      localStorage.setItem('current_mystery', JSON.stringify(mystery));
    }
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
      const newMystery = {
        title: "THE LAST LEDGER OF LOXLEY",
        setting: "An opulent Art Deco ballroom, 1929.",
        premise: "The city's most influential banker has collapsed mid-toast.",
        characters: [
          { name: "Vivian Vane", role: "The Lounge Singer", faction: "THE SYNDICATE", difficulty: "Easy", secret: "Was blackmailing the host.", objective: "Find the ledger.", allies: ["Arthur 'The Ox' Miller"] },
          { name: "Arthur 'The Ox' Miller", role: "The Bodyguard", faction: "THE SYNDICATE", difficulty: "Medium", secret: "Is a mole.", objective: "Destroy the ledger.", allies: ["Vivian Vane"] },
          { name: "Detective Sharp", role: "The Guest", faction: "LAW", difficulty: "Hard", secret: "Owes a debt.", objective: "Pin the crime.", allies: [] }
        ]
      };
      setMystery(newMystery);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  // Prevent "Flash of Original View" by waiting for hydration
  if (!isHydrated) return null;

  // --- STYLES ---
  const containerStyle: React.CSSProperties = { backgroundColor: '#000', minHeight: '100vh', color: '#fff', padding: '20px', fontFamily: 'sans-serif' };
  const cardStyle: React.CSSProperties = { background: '#fff', color: '#000', padding: '24px', boxShadow: '10px 10px 0px #b91c1c', borderRadius: '2px' };
  const inputStyle: React.CSSProperties = { width: '100%', background: '#000', border: '1px solid #333', padding: '15px', color: '#fff', fontSize: '16px', borderRadius: '4px' };
  const buttonStyle: React.CSSProperties = { width: '100%', padding: '18px', background: '#b91c1c', color: '#fff', border: 'none', borderRadius: '4px', fontWeight: '900', letterSpacing: '1px', cursor: 'pointer' };

  // --- PLAYER VIEW ---
  if (mystery && view === 'player' && activePlayerIndex !== null) {
    const char = mystery.characters[activePlayerIndex];
    if (!char) return <div>SUBJECT_NOT_FOUND</div>;
    return (
      <div style={{ ...containerStyle, fontFamily: 'monospace' }}>
        <button onClick={() => { setURLState('gm'); setRevealSecret(false); }} style={{ background: 'transparent', border: 'none', color: '#b91c1c', fontSize: '11px', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '30px', cursor: 'pointer' }}>
          <ArrowLeft size={16} /> EXIT_ENCRYPTED_SESSION
        </button>
        <div style={{ background: '#0a0a0a', padding: '24px', border: '1px solid #222', borderLeft: '5px solid #b91c1c' }}>
          <div style={{ fontSize: '9px', fontWeight: 'bold', color: '#b91c1c', letterSpacing: '3px', marginBottom: '20px' }}>// SUBJECT_{activePlayerIndex}</div>
          <h2 style={{ fontSize: '28px', fontWeight: '900', margin: 0, textTransform: 'uppercase' }}>{char.name}</h2>
          <div style={{ fontSize: '11px', color: '#666', marginTop: '4px', marginBottom: '30px' }}>{char.role} // {char.faction}</div>
          <div style={{ padding: '20px', background: revealSecret ? '#1a0505' : '#0f0f0f', border: `1px solid ${revealSecret ? '#b91c1c' : '#222'}` }}>
            <div style={{ fontSize: '10px', color: '#b91c1c', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '15px' }}><Lock size={12} /> SECRET</div>
            {!revealSecret ? (
              <button onClick={() => setRevealSecret(true)} style={{ ...buttonStyle, padding: '12px' }}>UNSEAL DATA</button>
            ) : (
              <div onClick={() => setRevealSecret(false)} style={{ cursor: 'pointer' }}>
                <p style={{ margin: 0, fontSize: '15px', fontStyle: 'italic', color: '#ffbaba' }}>{char.secret}</p>
                <div style={{ marginTop: '20px', fontSize: '9px', color: '#633', textAlign: 'center' }}>[ TAP TO LOCK ]</div>
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
      <header style={{ borderBottom: '1px solid #333', paddingBottom: '15px', marginBottom: '30px' }}>
        <div style={{ color: '#b91c1c', fontSize: '10px', fontWeight: 'bold', letterSpacing: '2px', marginBottom: '8px' }}>INTEL OPS // V.09</div>
        <h1 style={{ fontSize: '48px', fontWeight: '900', margin: 0, fontStyle: 'italic', lineHeight: '0.8', color: '#fff' }}>FABLE <span style={{ color: '#b91c1c' }}>FACT</span></h1>
      </header>

      {!mystery ? (
        <div style={{ background: '#111', padding: '20px', border: '1px solid #222' }}>
          <input style={inputStyle} placeholder="Theme..." value={theme} onChange={(e) => setTheme(e.target.value)} />
          <button onClick={handleGenerate} disabled={loading || !theme} style={{ ...buttonStyle, marginTop: '20px' }}>{loading ? 'COMPILING...' : 'INITIALIZE'}</button>
        </div>
      ) : (
        <div style={cardStyle}>
          <h2 style={{ fontSize: '24px', fontWeight: '900', margin: '0 0 20px 0', borderBottom: '4px solid #000', paddingBottom: '10px' }}>{mystery.title}</h2>
          {mystery.characters.map((char: any, i: number) => (
            <div key={i} style={{ background: '#f5f5f5', border: '1px solid #eee', padding: '15px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
              <div><b>{char.name}</b><br/><small>{char.role}</small></div>
              <button onClick={() => setURLState('player', i)} style={{ background: '#000', color: '#fff', border: 'none', padding: '12px', borderRadius: '4px', cursor: 'pointer' }}>
                <Smartphone size={18} />
              </button>
            </div>
          ))}
          <button onClick={() => { localStorage.removeItem('current_mystery'); setMystery(null); }} style={{ marginTop: '20px', width: '100%', background: '#000', color: '#fff', padding: '10px', fontSize: '10px' }}>SCRAP DATA</button>
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
