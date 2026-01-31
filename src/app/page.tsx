"use client";

import React, { useState } from 'react';
import { Sparkles, Users, Loader2, ScrollText, MapPin, Ghost, AlertCircle, FileSearch, ShieldAlert, Fingerprint } from 'lucide-react';

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
    <main className="min-h-screen bg-black text-zinc-400 font-sans selection:bg-red-900 selection:text-white pb-20 overflow-x-hidden">
      {/* Background Textures */}
      <div className="fixed inset-0 pointer-events-none opacity-10 mix-blend-overlay">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/pinstripe.png')] opacity-20" />
      </div>
      
      {/* Dynamic Lighting */}
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-full max-w-5xl h-screen pointer-events-none overflow-hidden">
        <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-red-900/10 blur-[150px] rounded-full" />
        <div className="absolute top-[40%] right-[-10%] w-[50%] h-[50%] bg-zinc-800/10 blur-[150px] rounded-full" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-6 pt-16">
        <header className="mb-16 border-b border-zinc-900 pb-8 flex justify-between items-end">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="h-1 w-8 bg-red-700" />
              <span className="text-[10px] font-mono tracking-[0.3em] text-red-600 uppercase">Classified Access</span>
            </div>
            <h1 className="text-7xl font-black tracking-tighter text-zinc-100 uppercase italic leading-none">
              Fable <span className="text-red-700">Fact</span>
            </h1>
          </div>
          <div className="hidden md:block text-right">
            <p className="text-[10px] font-mono text-zinc-600 uppercase tracking-widest mb-1 leading-tight">
              // Archive: Dynamic Plots<br />
              // Index: 0x921A-MMV
            </p>
            <div className="flex gap-1 justify-end opacity-20">
              {[...Array(8)].map((_, i) => <div key={i} className="h-4 w-1 bg-zinc-400" />)}
            </div>
          </div>
        </header>

        <section className="grid md:grid-cols-12 gap-12 mb-16">
          <div className="md:col-span-5 space-y-6">
            <div className="p-6 bg-zinc-900/40 border border-zinc-800/50 rounded-lg backdrop-blur-md">
               <h3 className="text-[10px] font-mono text-red-700 uppercase tracking-[0.2em] mb-4 flex items-center gap-2">
                 <ShieldAlert size={12} /> Parameters Required
               </h3>
               
               <div className="space-y-6">
                 <div>
                   <label className="block text-[10px] font-mono text-zinc-500 uppercase mb-2">Theme Motif</label>
                   <input 
                     type="text"
                     placeholder="Noir Jazz Club..."
                     className="w-full bg-black border border-zinc-800 p-3 text-sm text-zinc-100 placeholder:text-zinc-800 focus:border-red-900 outline-none transition-all rounded"
                     value={theme}
                     onChange={(e) => setTheme(e.target.value)}
                   />
                 </div>

                 <div>
                    <label className="flex justify-between text-[10px] font-mono text-zinc-500 uppercase mb-2">
                      <span>Operatives</span>
                      <span className="text-zinc-100 font-bold">{players}</span>
                    </label>
                    <input 
                      type="range"
                      min="3"
                      max="12"
                      className="w-full h-1 bg-zinc-800 appearance-none cursor-pointer accent-red-700 rounded-lg"
                      value={players}
                      onChange={(e) => setPlayers(parseInt(e.target.value))}
                    />
                 </div>

                 <button 
                   onClick={handleGenerate}
                   disabled={loading || !theme}
                   className="w-full py-4 bg-zinc-100 hover:bg-white disabled:bg-zinc-800 text-black font-black uppercase tracking-widest text-xs transition-all flex items-center justify-center gap-2 group"
                 >
                   {loading ? <Loader2 className="animate-spin" size={16} /> : (
                     <>
                      <Sparkles size={14} className="group-hover:text-red-700 transition-colors" />
                      Initiate Generation
                     </>
                   )}
                 </button>
               </div>
            </div>
          </div>

          <div className="md:col-span-7">
            {!mystery ? (
              <div className="h-full flex flex-col items-center justify-center border-2 border-dashed border-zinc-900 rounded-lg p-12 text-center group">
                <FileSearch size={48} className="text-zinc-800 mb-4 group-hover:text-zinc-700 transition-colors" />
                <p className="text-xs font-mono text-zinc-700 uppercase tracking-widest max-w-[200px]">
                  Input parameters to compile intelligence report.
                </p>
              </div>
            ) : (
              <div className="animate-in fade-in slide-in-from-right-8 duration-700">
                <div className="bg-zinc-100 text-black p-8 shadow-[20px_20px_0px_rgba(185,28,28,0.2)]">
                  <div className="flex justify-between items-start mb-8">
                    <h2 className="text-4xl font-black uppercase leading-none border-b-4 border-black pb-2">{mystery.title}</h2>
                    <Fingerprint size={40} className="opacity-10" />
                  </div>
                  
                  <div className="space-y-6">
                    <div>
                      <h4 className="text-[10px] font-mono uppercase font-bold text-red-700 mb-1 tracking-tighter">Locality Data</h4>
                      <p className="text-sm font-serif italic leading-relaxed">{mystery.setting}</p>
                    </div>

                    <div>
                      <h4 className="text-[10px] font-mono uppercase font-bold text-red-700 mb-1 tracking-tighter">Event Catalyst</h4>
                      <p className="text-sm font-semibold">{mystery.premise}</p>
                    </div>

                    <div className="pt-4 border-t border-black/10">
                      <h4 className="text-[10px] font-mono uppercase font-bold text-black mb-4 tracking-widest flex items-center gap-2">
                         Identified Personnel
                      </h4>
                      <div className="grid grid-cols-1 gap-2">
                        {mystery.characters.map((char: any, i: number) => (
                          <div key={i} className="flex items-center justify-between text-xs border-b border-black/5 py-1">
                            <span className="font-bold">{char.name}</span>
                            <span className="text-[10px] font-mono opacity-60">[{char.role}]</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>
      </div>
    </main>
  );
}
