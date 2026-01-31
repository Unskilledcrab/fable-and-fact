"use client";

import React, { useState } from 'react';
import { Sparkles, Users, Loader2, FileSearch, ShieldAlert, Fingerprint } from 'lucide-react';

export default function Home() {
  const [theme, setTheme] = useState("");
  const [players, setPlayers] = useState(6);
  const [loading, setLoading] = useState(false);
  const [mystery, setMystery] = useState<any>(null);

  const handleGenerate = async () => {
    setLoading(true);
    try {
      await new Promise(r => setTimeout(r, 1500));
      setMystery({
        title: "The Last Ledger of Loxley",
        setting: "An opulent Art Deco ballroom, 1929. The air is thick with expensive cigars and cheap perfume.",
        premise: "The city's most influential banker has collapsed mid-toast. His ledger, containing everyone's secrets, has vanished.",
        characters: [
          { name: "Vivian Vane", role: "The Lounge Singer", difficulty: "Easy", secret: "Was blackmailing the host.", objective: "Find the ledger before the police arrive." },
          { name: "Arthur 'The Ox' Miller", role: "The Bodyguard", difficulty: "Medium", secret: "Is actually a mole for a rival mob.", objective: "Make sure no one leaves this room." },
          { name: "Detective Sharp", role: "The Guest of Honor", difficulty: "Hard", secret: "Owes the banker a debt he can't pay.", objective: "Pin the crime on a convenient scapegoat." },
          { name: "Julian Thorne", role: "The Estranged Son", difficulty: "Medium", secret: "Forged his father's will this morning.", objective: "Ensure the ledger is destroyed." },
          { name: "Clara Sterling", role: "The Socialite", difficulty: "Easy", secret: "Was having an affair with the victim.", objective: "Recover her love letters from the ledger." },
          { name: "Dr. Aris", role: "The Family Physician", difficulty: "Hard", secret: "Supplied the poison used in the collapse.", objective: "Avoid suspicion while disposing of the evidence." }
        ]
      });
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ backgroundColor: '#000', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '20px' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        
        <header style={{ borderBottom: '1px solid #333', paddingBottom: '15px', marginBottom: '30px' }}>
          <div style={{ color: '#b91c1c', fontSize: '10px', fontWeight: 'bold', letterSpacing: '2px', marginBottom: '8px' }}>CLASSIFIED ACCESS</div>
          <h1 style={{ fontSize: 'clamp(32px, 8vw, 56px)', fontWeight: '900', margin: 0, fontStyle: 'italic', lineHeight: '0.9' }}>
            FABLE <span style={{ color: '#b91c1c' }}>FACT</span>
          </h1>
        </header>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
          
          <aside style={{ background: '#111', padding: '20px', borderRadius: '8px', border: '1px solid #222' }}>
            <h3 style={{ fontSize: '10px', color: '#666', marginBottom: '16px', letterSpacing: '1px' }}>SYSTEM PARAMETERS</h3>
            
            <div style={{ marginBottom: '16px' }}>
              <label style={{ display: 'block', fontSize: '11px', color: '#999', marginBottom: '6px' }}>THEME MOTIF</label>
              <input 
                style={{ width: '100%', background: '#000', border: '1px solid #333', padding: '12px', color: '#fff', borderRadius: '4px', fontSize: '16px' }} // 16px prevents iOS zoom
                placeholder="e.g. Noir Jazz Club"
                value={theme}
                onChange={(e) => setTheme(e.target.value)}
              />
            </div>

            <div style={{ marginBottom: '24px' }}>
              <label style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: '#999', marginBottom: '6px' }}>
                <span>OPERATIVES</span>
                <span style={{ color: '#b91c1c', fontWeight: 'bold' }}>{players}</span>
              </label>
              <input 
                type="range" min="3" max="12"
                style={{ width: '100%', accentColor: '#b91c1c', height: '30px' }}
                value={players}
                onChange={(e) => setPlayers(parseInt(e.target.value))}
              />
            </div>

            <button 
              onClick={handleGenerate}
              disabled={loading || !theme}
              style={{ 
                width: '100%', padding: '16px', background: loading ? '#333' : '#b91c1c', 
                color: '#fff', border: 'none', borderRadius: '4px', fontWeight: 'bold', 
                cursor: 'pointer', letterSpacing: '1px', fontSize: '14px'
              }}
            >
              {loading ? 'ANALYZING...' : 'INITIATE GENERATION'}
            </button>
          </aside>

          <section>
            {!mystery ? (
              <div style={{ height: '200px', border: '2px dashed #222', borderRadius: '8px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: '#444' }}>
                <FileSearch size={40} style={{ marginBottom: '12px' }} />
                <div style={{ fontSize: '11px', letterSpacing: '1px' }}>AWAITING PROTOCOL...</div>
              </div>
            ) : (
              <div style={{ background: '#fff', color: '#000', padding: '24px', boxShadow: '8px 8px 0px #b91c1c', marginBottom: '40px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px' }}>
                  <h2 style={{ fontSize: '24px', fontWeight: '900', borderBottom: '3px solid #000', paddingBottom: '6px', margin: 0, textTransform: 'uppercase' }}>{mystery.title}</h2>
                  <Fingerprint size={32} style={{ opacity: 0.1 }} />
                </div>
                
                <div style={{ marginBottom: '16px' }}>
                  <div style={{ fontSize: '9px', fontWeight: 'bold', color: '#b91c1c', letterSpacing: '1px' }}>LOCALITY</div>
                  <p style={{ margin: '4px 0', fontStyle: 'italic', fontSize: '14px', lineHeight: '1.4' }}>{mystery.setting}</p>
                </div>

                <div style={{ marginBottom: '24px' }}>
                  <div style={{ fontSize: '9px', fontWeight: 'bold', color: '#b91c1c', letterSpacing: '1px' }}>CATALYST</div>
                  <p style={{ margin: '4px 0', fontWeight: 'bold', fontSize: '14px', lineHeight: '1.4' }}>{mystery.premise}</p>
                </div>

                <div>
                  <div style={{ fontSize: '9px', fontWeight: 'bold', marginBottom: '12px', letterSpacing: '1px', borderTop: '1px solid #ddd', paddingTop: '12px' }}>PERSONNEL DOSSIERS</div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    {mystery.characters.map((char: any, i: number) => (
                      <div key={i} style={{ border: '1px solid #eee', padding: '12px', borderRadius: '4px', background: '#f9f9f9' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                          <span style={{ fontWeight: 'bold', fontSize: '14px' }}>{char.name}</span>
                          <span style={{ fontSize: '10px', color: '#b91c1c', fontWeight: 'bold' }}>{char.difficulty.toUpperCase()}</span>
                        </div>
                        <div style={{ fontSize: '11px', color: '#666', textTransform: 'uppercase', marginBottom: '8px' }}>{char.role}</div>
                        <div style={{ fontSize: '13px', borderTop: '1px dashed #ddd', paddingTop: '8px' }}>
                          <span style={{ fontWeight: 'bold', color: '#444' }}>Objective:</span> {char.objective}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </section>

        </div>
      </div>
    </div>
  );
}
