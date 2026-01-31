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
      await new Promise(r => setTimeout(r, 2000));
      setMystery({
        title: "The Last Ledger of Loxley",
        setting: "An opulent Art Deco ballroom, 1929. The air is thick with expensive cigars and cheap perfume.",
        premise: "The city's most influential banker has collapsed mid-toast. His ledger, containing everyone's secrets, has vanished.",
        characters: [
          { name: "Vivian Vane", role: "The Lounge Singer", difficulty: "Easy", secret: "Was blackmailing the host.", objective: "Find the ledger before the police arrive." },
          { name: "Arthur 'The Ox' Miller", role: "The Bodyguard", difficulty: "Medium", secret: "Is actually a mole for a rival mob.", objective: "Make sure no one leaves this room." },
          { name: "Detective Sharp", role: "The Guest of Honor", difficulty: "Hard", secret: "Owes the banker a debt he can't pay.", objective: "Pin the crime on a convenient scapegoat." }
        ]
      });
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ backgroundColor: '#000', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '40px' }}>
      <div style={{ maxWidth: '900px', margin: '0 auto' }}>
        
        <header style={{ borderBottom: '1px solid #333', paddingBottom: '20px', marginBottom: '40px' }}>
          <div style={{ color: '#b91c1c', fontSize: '12px', fontWeight: 'bold', letterSpacing: '2px', marginBottom: '10px' }}>CLASSIFIED ACCESS</div>
          <h1 style={{ fontSize: '64px', fontWeight: '900', margin: 0, fontStyle: 'italic' }}>
            FABLE <span style={{ color: '#b91c1c' }}>FACT</span>
          </h1>
        </header>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.5fr', gap: '40px' }}>
          
          <aside style={{ background: '#111', padding: '24px', borderRadius: '8px', border: '1px solid #222' }}>
            <h3 style={{ fontSize: '10px', color: '#666', marginBottom: '20px', letterSpacing: '1px' }}>SYSTEM PARAMETERS</h3>
            
            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', fontSize: '11px', color: '#999', marginBottom: '8px' }}>THEME MOTIF</label>
              <input 
                style={{ width: '100%', background: '#000', border: '1px solid #333', padding: '12px', color: '#fff', borderRadius: '4px' }}
                placeholder="e.g. Noir Jazz Club"
                value={theme}
                onChange={(e) => setTheme(e.target.value)}
              />
            </div>

            <div style={{ marginBottom: '30px' }}>
              <label style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: '#999', marginBottom: '8px' }}>
                <span>OPERATIVES</span>
                <span style={{ color: '#b91c1c' }}>{players}</span>
              </label>
              <input 
                type="range" min="3" max="12"
                style={{ width: '100%', accentColor: '#b91c1c' }}
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
                cursor: 'pointer', letterSpacing: '1px' 
              }}
            >
              {loading ? 'GENERATING...' : 'INITIATE GENERATION'}
            </button>
          </aside>

          <section>
            {!mystery ? (
              <div style={{ height: '300px', border: '2px dashed #222', borderRadius: '8px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: '#444' }}>
                <FileSearch size={48} style={{ marginBottom: '16px' }} />
                <div style={{ fontSize: '12px', letterSpacing: '1px' }}>AWAITING INPUT...</div>
              </div>
            ) : (
              <div style={{ background: '#fff', color: '#000', padding: '40px', boxShadow: '10px 10px 0px #b91c1c' }}>
                <h2 style={{ fontSize: '32px', fontWeight: '900', borderBottom: '3px solid #000', paddingBottom: '10px', marginBottom: '24px' }}>{mystery.title}</h2>
                
                <div style={{ marginBottom: '20px' }}>
                  <div style={{ fontSize: '10px', fontWeight: 'bold', color: '#b91c1c' }}>LOCALITY</div>
                  <p style={{ margin: '4px 0', fontStyle: 'italic' }}>{mystery.setting}</p>
                </div>

                <div style={{ marginBottom: '30px' }}>
                  <div style={{ fontSize: '10px', fontWeight: 'bold', color: '#b91c1c' }}>CATALYST</div>
                  <p style={{ margin: '4px 0', fontWeight: 'bold' }}>{mystery.premise}</p>
                </div>

                <div>
                  <div style={{ fontSize: '10px', fontWeight: 'bold', marginBottom: '10px' }}>IDENTIFIED PERSONNEL</div>
                  {mystery.characters.map((char: any, i: number) => (
                    <div key={i} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', borderBottom: '1px solid #eee', padding: '8px 0' }}>
                      <span style={{ fontWeight: 'bold' }}>{char.name}</span>
                      <span style={{ color: '#666' }}>[{char.role}]</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </section>

        </div>
      </div>
    </div>
  );
}
