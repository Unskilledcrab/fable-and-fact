"use client";

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { Sparkles, Users, Loader2, FileSearch, Fingerprint, Clock, Eye, EyeOff, Smartphone, ArrowLeft, Shield, Unlock, Lock } from 'lucide-react';

function FableAndFact() {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const [theme, setTheme] = useState("");
  const [players, setPlayers] = useState(6);
  const [loading, setLoading] = useState(false);
  const [mystery, setMystery] = useState<any>(null);
  const [revealSecret, setRevealSecret] = useState(false);
  const [glitch, setGlitch] = useState(false);

  // Parse URL state
  const view = searchParams.get('view') || 'gm';
  const activePlayerIndex = searchParams.get('p') !== null ? parseInt(searchParams.get('p')!) : null;

  // Persistence: Save/Load from LocalStorage
  useEffect(() => {
    const saved = localStorage.getItem('current_mystery');
    if (saved) {
      try {
        setMystery(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to restore session", e);
      }
    }
  }, []);

  useEffect(() => {
    if (mystery) {
      localStorage.setItem('current_mystery', JSON.stringify(mystery));
    }
  }, [mystery]);

  const setURLState = (newView: string, pIdx: number | null = null) => {
    const params = new URLSearchParams();
    params.set('view', newView);
    if (pIdx !== null) params.set('p', pIdx.toString());
    router.push(`?${params.toString()}`);
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
        setting: "An opulent Art Deco ballroom, 1929. The air is thick with expensive cigars and cheap perfume.",
        premise: "The city's most influential banker has collapsed mid-toast. His ledger, containing everyone's secrets, has vanished.",
        storyline: [
          { time: "8:00 PM", event: "Arrival & Cocktails. Guests are encouraged to find their initial allies." },
          { time: "8:45 PM", event: "The Fatal Toast. Lord Loxley collapses. The room goes dark for 10 seconds." },
          { time: "11:30 PM", event: "The Confrontation. All guests gather for the final reveal and accusations." }
        ],
        characters: [
          { id: "0", name: "Vivian Vane", role: "The Lounge Singer", faction: "THE SYNDICATE", difficulty: "Easy", secret: "Was blackmailing the host for her stolen jewels.", objective: "Find the ledger before the police arrive.", allies: ["Arthur 'The Ox' Miller"] },
          { id: "1", name: "Arthur 'The Ox' Miller", role: "The Bodyguard", faction: "THE SYNDICATE", difficulty: "Medium", secret: "Is actually a mole for the Moretti Crime Family.", objective: "Ensure the ledger never sees the light of day.", allies: ["Vivian Vane"] },
          { id: "2", name: "Detective Sharp", role: "The Guest of Honor", faction: "LAW & ORDER", difficulty: "Hard", secret: "Owes the banker a gambling debt that would ruin his career.", objective: "Pin the crime on a convenient scapegoat.", allies: [] }
        ]
      };
      setMystery(newMystery);
      localStorage.setItem('current_mystery', JSON.stringify(newMystery));
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  // --- STYLES (Inline to guarantee look) ---
  const containerStyle: React.CSSProperties = { backgroundColor: '#000', minHeight: '100vh', color: '#fff', padding: '20px', fontFamily: 'sans-serif', opacity: glitch ? 0.4 : 1, transition: 'opacity 0.15s ease' };
  const cardStyle: React.CSSProperties = { background: '#fff', color: '#000', padding: '24px', boxShadow: '10px 10px 0px #b91c1c', borderRadius: '2px' };
  const inputStyle: React.CSSProperties = { width: '100%', background: '#000', border: '1px solid #333', padding: '15px', color: '#fff', fontSize: '16px', borderRadius: '4px' };
  const buttonStyle: React.CSSProperties = { width: '100%', padding: '18px', background: '#b91c1c', color: '#fff', border: 'none', borderRadius: '4px', fontWeight: '900', letterSpacing: '1px', cursor: 'pointer' };

  // --- PLAYER VIEW ---
  if (mystery && view === 'player' && activePlayerIndex !== null) {
    const char = mystery.characters[activePlayerIndex];
    return (
      <div style={{ ...containerStyle, fontFamily: 'monospace' }}>
        <button onClick={() => { setURLState('gm'); setRevealSecret(false); }} style={{ background: 'transparent', border: 'none', color: '#b91c1c', fontSize: '11px', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '30px', cursor: 'pointer' }}>
          <ArrowLeft size={16} /> EXIT_ENCRYPTED_SESSION
        </button>
        
        <div style={{ background: '#0a0a0a', padding: '24px', border: '1px solid #222', borderLeft: '5px solid #b91c1c' }}>
          <div style={{ fontSize: '9px', fontWeight: 'bold', color: '#b91c1c', letterSpacing: '3px', marginBottom: '20px' }}>// SUBJECT_{activePlayerIndex.toString().padStart(3, '0')}</div>
          
          <h2 style={{ fontSize: '28px', fontWeight: '900', margin: 0, textTransform: 'uppercase' }}>{char.name}</h2>
          <div style={{ fontSize: '11px', color: '#666', marginTop: '4px', marginBottom: '30px' }}>{char.role} // {char.faction}</div>

          <div style={{ marginBottom: '30px', padding: '15px', background: '#111', border: '1px solid #1a1a1a' }}>
            <div style={{ fontSize: '10px', color: '#666', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '10px' }}><Shield size={12} color="#b91c1c" /> AFFILIATES</div>
            {char.allies?.map((a:any, i:any)=>(<div key={i} style={{fontSize:'13px', color:'#888', marginBottom:'5px'}}>&gt; {a}</div>))}
          </div>

          <div style={{ marginBottom: '30px' }}>
            <div style={{ fontSize: '10px', color: '#16a34a', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '8px' }}><Unlock size={12} /> OBJECTIVE</div>
            <p style={{ margin: 0, fontSize: '14px', lineHeight: '1.5', color: '#ccc' }}>{char.objective}</p>
          </div>

          <div style={{ padding: '20px', background: revealSecret ? '#1a0505' : '#0f0f0f', border: `1px solid ${revealSecret ? '#b91c1c' : '#222'}`, transition: 'all 0.3s' }}>
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
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        <header style={{ borderBottom: '1px solid #333', paddingBottom: '15px', marginBottom: '30px' }}>
          <div style={{ color: '#b91c1c', fontSize: '10px', fontWeight: 'bold', letterSpacing: '2px', marginBottom: '10px' }}>INTEL OPS // V.08</div>
          <h1 style={{ fontSize: '48px', fontWeight: '900', margin: 0, fontStyle: 'italic', lineHeight: '0.8', color: '#fff' }}>
            FABLE <span style={{ color: '#b91c1c' }}>FACT</span>
          </h1>
        </header>

        {!mystery ? (
          <div style={{ background: '#111', padding: '20px', border: '1px solid #222', borderRadius: '4px' }}>
            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', fontSize: '10px', color: '#666', marginBottom: '8px', letterSpacing: '1px' }}>SCENARIO MOTIF</label>
              <input style={inputStyle} placeholder="Enter theme..." value={theme} onChange={(e) => setTheme(e.target.value)} />
            </div>
            <div style={{ marginBottom: '30px' }}>
               <label style={{ display: 'flex', justifyContent: 'space-between', fontSize: '10px', color: '#666', marginBottom: '8px' }}>
                <span>OPERATIVES</span>
                <span style={{ color: '#b91c1c', fontWeight: 'bold' }}>{players}</span>
              </label>
              <input type="range" min="3" max="12" style={{ width: '100%', accentColor: '#b91c1c', height: '40px' }} value={players} onChange={(e) => setPlayers(parseInt(e.target.value))} />
            </div>
            <button onClick={handleGenerate} disabled={loading || !theme} style={buttonStyle}>
              {loading ? 'COMPILING...' : 'INITIALIZE GENERATION'}
            </button>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
            <div style={cardStyle}>
               <h2 style={{ fontSize: '24px', fontWeight: '900', margin: '0 0 20px 0', borderBottom: '4px solid #000', paddingBottom: '10px', textTransform: 'uppercase' }}>{mystery.title}</h2>
               <div style={{ fontSize: '10px', fontWeight: '900', color: '#b91c1c', marginBottom: '15px', letterSpacing: '1px' }}>PERSONNEL_MANIFEST</div>
               <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                 {mystery.characters.map((char: any, i: number) => (
                   <div key={i} style={{ background: '#f5f5f5', border: '1px solid #eee', padding: '15px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <span style={{ fontSize: '14px', fontWeight: '900' }}>{char.name}</span>
                        <span style={{ fontSize: '10px', color: '#999', textTransform: 'uppercase' }}>{char.role}</span>
                      </div>
                      <button onClick={() => setURLState('player', i)} style={{ background: '#000', color: '#fff', border: 'none', padding: '12px', borderRadius: '4px', cursor: 'pointer' }}>
                        <Smartphone size={18} />
                      </button>
                   </div>
                 ))}
               </div>
               <button onClick={() => { localStorage.removeItem('current_mystery'); setMystery(null); }} style={{ marginTop: '30px', width: '100%', padding: '12px', background: '#000', color: '#fff', border: 'none', fontSize: '10px', fontWeight: '900', cursor: 'pointer' }}>SCRAP DATA & RESTART</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <Suspense fallback={<div style={{ minHeight: '100vh', background: '#000', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'monospace' }}>BOOT_SEQUENCE...</div>}>
      <FableAndFact />
    </Suspense>
  );
}
