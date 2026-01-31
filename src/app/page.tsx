"use client";

import React, { useState, useEffect } from 'react';
import { Sparkles, Users, Loader2, FileSearch, ShieldAlert, Fingerprint, Clock, Eye, EyeOff, Smartphone, ArrowLeft, Shield, Unlock, Lock } from 'lucide-react';

export default function Home() {
  const [theme, setTheme] = useState("");
  const [players, setPlayers] = useState(6);
  const [loading, setLoading] = useState(false);
  const [mystery, setMystery] = useState<any>(null);
  const [view, setView] = useState<'gm' | 'player'>('gm');
  const [activePlayer, setActivePlayer] = useState<number | null>(null);
  const [revealSecret, setRevealSecret] = useState(false);
  const [glitch, setGlitch] = useState(false);

  // Trigger a brief "flicker" effect when switching views
  useEffect(() => {
    setGlitch(true);
    const timer = setTimeout(() => setGlitch(false), 300);
    return () => clearTimeout(timer);
  }, [view, activePlayer]);

  const handleGenerate = async () => {
    setLoading(true);
    try {
      await new Promise(r => setTimeout(r, 1500));
      setMystery({
        title: "THE LAST LEDGER OF LOXLEY",
        setting: "An opulent Art Deco ballroom, 1929. The air is thick with expensive cigars and cheap perfume.",
        premise: "The city's most influential banker has collapsed mid-toast. His ledger, containing everyone's secrets, has vanished.",
        storyline: [
          { time: "8:00 PM", event: "Arrival & Cocktails. Guests are encouraged to find their initial allies." },
          { time: "8:45 PM", event: "The Fatal Toast. Lord Loxley collapses. The room goes dark for 10 seconds." },
          { time: "11:30 PM", event: "The Confrontation. All guests gather for the final reveal and accusations." }
        ],
        characters: [
          { name: "Vivian Vane", role: "The Lounge Singer", faction: "THE SYNDICATE", difficulty: "Easy", secret: "Was blackmailing the host for her stolen jewels.", objective: "Find the ledger before the police arrive.", allies: ["Arthur 'The Ox' Miller"] },
          { name: "Arthur 'The Ox' Miller", role: "The Bodyguard", faction: "THE SYNDICATE", difficulty: "Medium", secret: "Is actually a mole for the Moretti Crime Family.", objective: "Ensure the ledger never sees the light of day.", allies: ["Vivian Vane"] },
          { name: "Detective Sharp", role: "The Guest of Honor", faction: "LAW & ORDER", difficulty: "Hard", secret: "Owes the banker a gambling debt that would ruin his career.", objective: "Pin the crime on a convenient scapegoat.", allies: [] }
        ]
      });
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const updateMystery = (path: string[], value: any) => {
    const newMystery = { ...mystery };
    let current = newMystery;
    for (let i = 0; i < path.length - 1; i++) {
      current = current[path[i]];
    }
    current[path[path.length - 1]] = value;
    setMystery(newMystery);
  };

  // --- SUB-VIEWS ---

  if (mystery && view === 'player' && activePlayer !== null) {
    const char = mystery.characters[activePlayer];
    return (
      <div style={{ 
        backgroundColor: '#000', 
        minHeight: '100vh', 
        color: '#fff', 
        padding: '20px', 
        fontFamily: 'monospace',
        opacity: glitch ? 0.3 : 1,
        transition: 'opacity 0.1s ease-in-out'
      }}>
        <button onClick={() => { setView('gm'); setRevealSecret(false); }} style={{ background: 'transparent', border: 'none', color: '#b91c1c', fontSize: '10px', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '5px', marginBottom: '30px', letterSpacing: '2px' }}>
          <ArrowLeft size={14} /> TERMINAL_EXIT
        </button>
        
        <div style={{ background: '#0a0a0a', padding: '24px', borderRadius: '4px', border: '1px solid #333', borderLeft: '4px solid #b91c1c' }}>
          <div style={{ fontSize: '10px', fontWeight: 'bold', color: '#b91c1c', letterSpacing: '3px', marginBottom: '20px' }}>// SUBJECT ID: {activePlayer.toString().padStart(3, '0')}</div>
          
          <h2 style={{ fontSize: '32px', fontWeight: '900', margin: 0, textTransform: 'uppercase', color: '#eee' }}>{char.name}</h2>
          <div style={{ fontSize: '12px', color: '#666', marginBottom: '30px', letterSpacing: '1px' }}>{char.role} // {char.faction}</div>

          {/* Faction/Allies Section */}
          <div style={{ marginBottom: '30px', padding: '15px', background: '#111', border: '1px solid #222' }}>
            <h4 style={{ fontSize: '10px', color: '#666', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '10px' }}>
              <Shield size={12} color="#b91c1c" /> KNOWN AFFILIATES
            </h4>
            {char.allies && char.allies.length > 0 ? (
              <ul style={{ margin: 0, padding: 0, listStyle: 'none' }}>
                {char.allies.map((ally: string, i: number) => (
                  <li key={i} style={{ fontSize: '13px', color: '#999', marginBottom: '4px' }}>&gt; {ally}</li>
                ))}
              </ul>
            ) : (
              <p style={{ margin: 0, fontSize: '12px', color: '#444', fontStyle: 'italic' }}>No confirmed allies in sector.</p>
            )}
          </div>

          {/* Public Objective */}
          <div style={{ marginBottom: '30px' }}>
            <h4 style={{ fontSize: '10px', color: '#16a34a', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '8px' }}>
              <Unlock size={12} /> MISSION OBJECTIVE
            </h4>
            <p style={{ margin: 0, fontSize: '14px', lineHeight: '1.5', color: '#ccc' }}>{char.objective}</p>
          </div>

          {/* Hidden Secret Interaction */}
          <div style={{ 
            padding: '20px', 
            background: revealSecret ? '#1a0505' : '#111', 
            border: `1px solid ${revealSecret ? '#b91c1c' : '#222'}`,
            borderRadius: '4px',
            transition: 'all 0.3s ease'
          }}>
            <h4 style={{ fontSize: '10px', color: '#b91c1c', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '12px' }}>
              <Lock size={12} /> CLASSIFIED DATA
            </h4>
            
            {!revealSecret ? (
              <button 
                onClick={() => setRevealSecret(true)}
                style={{ width: '100%', padding: '15px', background: '#b91c1c', color: '#fff', border: 'none', borderRadius: '2px', fontSize: '11px', fontWeight: 'black', letterSpacing: '2px', cursor: 'pointer' }}
              >
                HOLD TO UNSEAL ENVELOPE
              </button>
            ) : (
              <div onClick={() => setRevealSecret(false)} style={{ cursor: 'pointer' }}>
                <p style={{ margin: 0, fontSize: '14px', fontStyle: 'italic', lineHeight: '1.6', color: '#ffbaba' }}>
                  {char.secret}
                </p>
                <div style={{ marginTop: '15px', fontSize: '9px', color: '#633', textAlign: 'center' }}>[ TAP TO RESEAL ]</div>
              </div>
            )}
          </div>

        </div>
      </div>
    );
  }

  // --- MAIN GM VIEW ---

  return (
    <div style={{ 
      backgroundColor: '#000', 
      minHeight: '100vh', 
      color: '#fff', 
      fontFamily: 'sans-serif', 
      padding: '15px', 
      paddingBottom: '100px',
      opacity: glitch ? 0.3 : 1,
      transition: 'opacity 0.1s ease-in-out'
    }}>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        
        <header style={{ borderBottom: '1px solid #333', paddingBottom: '15px', marginBottom: '25px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
          <div>
            <div style={{ color: '#b91c1c', fontSize: '10px', fontWeight: 'bold', letterSpacing: '2px', marginBottom: '8px' }}>INTEL OPS // V.06</div>
            <h1 style={{ fontSize: 'clamp(28px, 7vw, 52px)', fontWeight: '900', margin: 0, fontStyle: 'italic', lineHeight: '0.9' }}>
              FABLE <span style={{ color: '#b91c1c' }}>FACT</span>
            </h1>
          </div>
        </header>

        {!mystery ? (
          <aside style={{ background: '#111', padding: '20px', borderRadius: '8px', border: '1px solid #222' }}>
            <div style={{ marginBottom: '16px' }}>
              <label style={{ display: 'block', fontSize: '10px', color: '#666', marginBottom: '8px', letterSpacing: '1px' }}>SCENARIO MOTIF</label>
              <input 
                style={{ width: '100%', background: '#000', border: '1px solid #333', padding: '12px', color: '#fff', borderRadius: '4px', fontSize: '16px' }}
                placeholder="Describe the vibe..."
                value={theme}
                onChange={(e) => setTheme(e.target.value)}
              />
            </div>
            <div style={{ marginBottom: '20px' }}>
               <label style={{ display: 'flex', justifyContent: 'space-between', fontSize: '10px', color: '#666', marginBottom: '8px' }}>
                <span>OPERATIVES</span>
                <span style={{ color: '#b91c1c' }}>{players}</span>
              </label>
              <input type="range" min="3" max="12" style={{ width: '100%', accentColor: '#b91c1c' }} value={players} onChange={(e) => setPlayers(parseInt(e.target.value))} />
            </div>
            <button onClick={handleGenerate} disabled={loading || !theme} style={{ width: '100%', padding: '16px', background: '#b91c1c', color: '#fff', border: 'none', borderRadius: '4px', fontWeight: 'bold' }}>
              {loading ? 'PROCESSING...' : 'INITIALIZE GENERATION'}
            </button>
          </aside>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '25px' }}>
            
            <section style={{ background: '#fff', color: '#000', padding: '20px', boxShadow: '8px 8px 0px #b91c1c' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '3px solid #000', paddingBottom: '10px', marginBottom: '20px' }}>
                <input 
                  style={{ fontSize: '24px', fontWeight: '900', textTransform: 'uppercase', border: 'none', background: 'transparent', width: '100%' }}
                  value={mystery.title}
                  onChange={(e) => updateMystery(['title'], e.target.value)}
                />
                <Fingerprint size={24} style={{ opacity: 0.2 }} />
              </div>

              {/* Personnel Section */}
              <h4 style={{ fontSize: '9px', fontWeight: 'bold', color: '#000', marginBottom: '12px', letterSpacing: '1px' }}>
                OPERATIVE DIRECTORY (TAP SMARTPHONE TO PREVIEW PLAYER VIEW)
              </h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                {mystery.characters.map((char: any, i: number) => (
                  <div key={i} style={{ border: '1px solid #ddd', borderRadius: '4px', overflow: 'hidden' }}>
                    <div style={{ background: '#f5f5f5', padding: '10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <button 
                          onClick={() => { setActivePlayer(i); setView('player'); }}
                          style={{ background: '#000', color: '#fff', border: 'none', borderRadius: '4px', padding: '4px 8px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }}
                        >
                          <Smartphone size={12} />
                        </button>
                        <input 
                          style={{ fontWeight: 'bold', background: 'transparent', border: 'none', fontSize: '14px' }}
                          value={char.name}
                          onChange={(e) => {
                            const chars = [...mystery.characters];
                            chars[i].name = e.target.value;
                            updateMystery(['characters'], chars);
                          }}
                        />
                      </div>
                      <div style={{ display: 'flex', gap: '5px' }}>
                         <span style={{ fontSize: '9px', fontWeight: 'bold', border: '1px solid #000', padding: '1px 4px', borderRadius: '2px' }}>{char.faction}</span>
                         <span style={{ fontSize: '9px', fontWeight: 'bold', background: '#000', color: '#fff', padding: '2px 6px', borderRadius: '2px' }}>{char.difficulty}</span>
                      </div>
                    </div>
                    {/* ... other fields remain editable ... */}
                  </div>
                ))}
              </div>

              <button 
                onClick={() => setMystery(null)}
                style={{ marginTop: '30px', width: '100%', padding: '12px', background: '#000', color: '#fff', border: 'none', borderRadius: '4px', fontSize: '11px', fontWeight: 'bold', letterSpacing: '1px' }}
              >
                SCRAP AND RESTART PROTOCOL
              </button>
            </section>
          </div>
        )}
      </div>
    </div>
  );
}
