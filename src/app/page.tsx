"use client";

import React, { useState } from 'react';
import { Sparkles, Users, Loader2, FileSearch, ShieldAlert, Fingerprint, Edit3, Eye, EyeOff, Save, Clock, BookOpen } from 'lucide-react';

export default function Home() {
  const [theme, setTheme] = useState("");
  const [players, setPlayers] = useState(6);
  const [loading, setLoading] = useState(false);
  const [mystery, setMystery] = useState<any>(null);
  const [editMode, setEditMode] = useState<string | null>(null);

  const handleGenerate = async () => {
    setLoading(true);
    try {
      await new Promise(r => setTimeout(r, 1500));
      setMystery({
        title: "THE LAST LEDGER OF LOXLEY",
        setting: "An opulent Art Deco ballroom, 1929. The air is thick with expensive cigars and cheap perfume. Rain lashes against the high arched windows.",
        premise: "The city's most influential banker has collapsed mid-toast. His ledger, containing everyone's secrets, has vanished.",
        storyline: [
          { time: "8:00 PM", event: "Arrival & Cocktails. Guests are encouraged to find their initial allies." },
          { time: "8:45 PM", event: "The Fatal Toast. Lord Loxley collapses. The room goes dark for 10 seconds." },
          { time: "9:30 PM", event: "The First Discovery. A blood-stained silk handkerchief is found in the conservatory." },
          { time: "10:15 PM", event: "The Ransom Note. A message is slipped under the ballroom door demanding 10,000 pounds for the ledger." },
          { time: "11:30 PM", event: "The Confrontation. All guests gather for the final reveal and accusations." }
        ],
        characters: [
          { name: "Vivian Vane", role: "The Lounge Singer", difficulty: "Easy", secret: "Was blackmailing the host for her stolen jewels.", objective: "Find the ledger before the police arrive." },
          { name: "Arthur 'The Ox' Miller", role: "The Bodyguard", difficulty: "Medium", secret: "Is actually a mole for the Moretti Crime Family.", objective: "Ensure the ledger never sees the light of day." },
          { name: "Detective Sharp", role: "The Guest of Honor", difficulty: "Hard", secret: "Owes the banker a gambling debt that would ruin his career.", objective: "Pin the crime on a convenient scapegoat." }
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

  return (
    <div style={{ backgroundColor: '#000', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '15px', paddingBottom: '100px' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        
        <header style={{ borderBottom: '1px solid #333', paddingBottom: '15px', marginBottom: '25px' }}>
          <div style={{ color: '#b91c1c', fontSize: '10px', fontWeight: 'bold', letterSpacing: '2px', marginBottom: '8px' }}>INTEL OPS // V.04</div>
          <h1 style={{ fontSize: 'clamp(28px, 7vw, 52px)', fontWeight: '900', margin: 0, fontStyle: 'italic', lineHeight: '0.9' }}>
            FABLE <span style={{ color: '#b91c1c' }}>FACT</span>
          </h1>
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
            
            {/* Main Dossier */}
            <section style={{ background: '#fff', color: '#000', padding: '20px', boxShadow: '8px 8px 0px #b91c1c' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '3px solid #000', paddingBottom: '10px', marginBottom: '20px' }}>
                <input 
                  style={{ fontSize: '24px', fontWeight: '900', textTransform: 'uppercase', border: 'none', background: 'transparent', width: '100%' }}
                  value={mystery.title}
                  onChange={(e) => updateMystery(['title'], e.target.value)}
                />
                <Fingerprint size={24} style={{ opacity: 0.2 }} />
              </div>

              <div style={{ marginBottom: '20px' }}>
                <h4 style={{ fontSize: '9px', fontWeight: 'bold', color: '#b91c1c', marginBottom: '4px' }}>LOCATION DATA</h4>
                <textarea 
                  style={{ width: '100%', border: 'none', background: '#f0f0f0', padding: '8px', fontSize: '14px', fontStyle: 'italic', resize: 'none' }}
                  rows={2}
                  value={mystery.setting}
                  onChange={(e) => updateMystery(['setting'], e.target.value)}
                />
              </div>

              <div style={{ marginBottom: '20px' }}>
                <h4 style={{ fontSize: '9px', fontWeight: 'bold', color: '#b91c1c', marginBottom: '4px' }}>CORE CATALYST</h4>
                <textarea 
                  style={{ width: '100%', border: 'none', background: '#f0f0f0', padding: '8px', fontSize: '14px', fontWeight: 'bold', resize: 'none' }}
                  rows={2}
                  value={mystery.premise}
                  onChange={(e) => updateMystery(['premise'], e.target.value)}
                />
              </div>

              {/* 4-Hour Timeline */}
              <div style={{ marginBottom: '30px', borderTop: '2px solid #eee', paddingTop: '15px' }}>
                <h4 style={{ fontSize: '9px', fontWeight: 'bold', color: '#000', marginBottom: '12px', letterSpacing: '1px', display: 'flex', alignItems: 'center', gap: '5px' }}>
                  <Clock size={10} /> OPERATION TIMELINE (4 HOURS)
                </h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {mystery.storyline.map((step: any, i: number) => (
                    <div key={i} style={{ display: 'flex', gap: '10px', fontSize: '12px' }}>
                      <span style={{ fontWeight: 'bold', color: '#b91c1c', minWidth: '60px' }}>{step.time}</span>
                      <input 
                        style={{ border: 'none', background: 'transparent', width: '100%', borderBottom: '1px solid #f0f0f0' }}
                        value={step.event}
                        onChange={(e) => {
                          const newList = [...mystery.storyline];
                          newList[i].event = e.target.value;
                          updateMystery(['storyline'], newList);
                        }}
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Personnel */}
              <h4 style={{ fontSize: '9px', fontWeight: 'bold', color: '#000', marginBottom: '12px', letterSpacing: '1px', borderTop: '2px solid #eee', paddingTop: '15px' }}>
                PERSONNEL DOSSIERS
              </h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                {mystery.characters.map((char: any, i: number) => (
                  <div key={i} style={{ border: '1px solid #ddd', borderRadius: '4px', overflow: 'hidden' }}>
                    <div style={{ background: '#f5f5f5', padding: '10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <input 
                        style={{ fontWeight: 'bold', background: 'transparent', border: 'none', fontSize: '14px' }}
                        value={char.name}
                        onChange={(e) => {
                          const chars = [...mystery.characters];
                          chars[i].name = e.target.value;
                          updateMystery(['characters'], chars);
                        }}
                      />
                      <span style={{ fontSize: '9px', fontWeight: 'bold', background: '#000', color: '#fff', padding: '2px 6px', borderRadius: '2px' }}>{char.difficulty}</span>
                    </div>
                    <div style={{ padding: '12px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                      <div style={{ marginBottom: '10px' }}>
                        <div style={{ fontSize: '10px', color: '#999', marginBottom: '2px' }}>ROLE</div>
                        <input style={{ width: '100%', border: 'none', background: '#fafafa', fontSize: '12px' }} value={char.role} onChange={(e) => {
                          const chars = [...mystery.characters];
                          chars[i].role = e.target.value;
                          updateMystery(['characters'], chars);
                        }} />
                      </div>
                      
                      <div style={{ marginBottom: '10px', borderLeft: '2px solid #b91c1c', paddingLeft: '8px' }}>
                        <div style={{ fontSize: '10px', color: '#b91c1c', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '4px' }}>
                          <EyeOff size={10} /> CLASSIFIED SECRET (KEEP HIDDEN)
                        </div>
                        <textarea style={{ width: '100%', border: 'none', background: '#fff5f5', fontSize: '12px', fontStyle: 'italic', resize: 'none' }} value={char.secret} onChange={(e) => {
                          const chars = [...mystery.characters];
                          chars[i].secret = e.target.value;
                          updateMystery(['characters'], chars);
                        }} />
                      </div>

                      <div style={{ borderLeft: '2px solid #22c55e', paddingLeft: '8px' }}>
                        <div style={{ fontSize: '10px', color: '#16a34a', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '4px' }}>
                          <Eye size={10} /> PUBLIC OBJECTIVE (PLAYERS KNOW)
                        </div>
                        <textarea style={{ width: '100%', border: 'none', background: '#f0fdf4', fontSize: '12px', resize: 'none' }} value={char.objective} onChange={(e) => {
                          const chars = [...mystery.characters];
                          chars[i].objective = e.target.value;
                          updateMystery(['characters'], chars);
                        }} />
                      </div>
                    </div>
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
