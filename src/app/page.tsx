"use client";

import React, { useState } from 'react';
import { Sparkles, Users, Loader2, ScrollText, MapPin, Ghost, AlertCircle } from 'lucide-react';

export default function Home() {
  const [theme, setTheme] = useState("");
  const [players, setPlayers] = useState(6);
  const [loading, setLoading] = useState(false);
  const [mystery, setMystery] = useState<any>(null);

  const handleGenerate = async () => {
    setLoading(true);
    try {
      // Placeholder for actual AI call
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
    <main className="min-h-screen bg-zinc-950 text-zinc-300 font-sans selection:bg-red-900 selection:text-white pb-20">
      {/* Abstract Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none opacity-20">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-red-900/20 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-zinc-800/20 blur-[120px] rounded-full" />
      </div>

      <div className="relative z-10 max-w-3xl mx-auto px-6 pt-16">
        <header className="mb-16 border-l-4 border-red-700 pl-6 py-2">
          <h1 className="text-6xl font-black tracking-tighter text-zinc-100 uppercase italic">
            Fable <span className="text-red-700">&</span> Fact
          </h1>
          <p className="text-zinc-500 font-mono text-sm mt-2 tracking-widest uppercase">
            // Automated Mystery Orchestration System v1.0
          </p>
        </header>

        <section className="bg-zinc-900/50 backdrop-blur-sm rounded-lg border border-zinc-800 p-8 mb-12 shadow-2xl">
          <div className="space-y-8">
            <div className="group">
              <label className="flex items-center gap-2 text-xs font-mono text-zinc-500 mb-3 uppercase tracking-tighter group-focus-within:text-red-500 transition-colors">
                <ScrollText size={14} />
                Scenario Motif
              </label>
              <input 
                type="text"
                placeholder="Describe the world (e.g. Victorian Séance, Mars Colony...)"
                className="w-full bg-zinc-950/50 border-b border-zinc-800 p-4 text-xl text-zinc-100 placeholder:text-zinc-700 focus:border-red-700 outline-none transition-all rounded-t-md"
                value={theme}
                onChange={(e) => setTheme(e.target.value)}
              />
            </div>

            <div className="flex flex-wrap items-center gap-8">
              <div className="flex-1 min-w-[200px]">
                <label className="flex items-center gap-2 text-xs font-mono text-zinc-500 mb-3 uppercase tracking-tighter">
                  <Users size={14} />
                  Operative Count
                </label>
                <div className="flex items-center gap-4 bg-zinc-950/50 border border-zinc-800 p-1 rounded-md">
                  <input 
                    type="range"
                    min="3"
                    max="12"
                    step="1"
                    className="flex-1 accent-red-700 ml-2"
                    value={players}
                    onChange={(e) => setPlayers(parseInt(e.target.value))}
                  />
                  <span className="bg-zinc-800 px-3 py-1 rounded font-mono text-zinc-100 min-w-[40px] text-center">
                    {players}
                  </span>
                </div>
              </div>
            </div>

            <button 
              onClick={handleGenerate}
              disabled={loading || !theme}
              className="group relative w-full bg-red-700 hover:bg-red-600 disabled:bg-zinc-800 text-white font-bold py-5 rounded transition-all overflow-hidden"
            >
              <div className="relative z-10 flex items-center justify-center gap-3 tracking-widest uppercase text-sm">
                {loading ? (
                  <Loader2 className="animate-spin" size={20} />
                ) : (
                  <>
                    <Sparkles size={18} className="group-hover:rotate-12 transition-transform" />
                    Initiate Generation
                  </>
                )}
              </div>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
            </button>
          </div>
        </section>

        {mystery && (
          <div className="space-y-12 animate-in fade-in slide-in-from-bottom-8 duration-700">
            <div className="relative p-8 border border-zinc-800 bg-zinc-900/30 rounded-lg overflow-hidden">
               <div className="absolute top-0 right-0 p-4 text-[100px] font-black text-zinc-800/10 select-none">
                 TOP SECRET
               </div>
               
               <h2 className="text-4xl font-black text-zinc-100 mb-6 uppercase border-b-2 border-red-700 pb-4 inline-block">
                 {mystery.title}
               </h2>

               <div className="grid md:grid-cols-2 gap-8 relative z-10">
                 <div className="space-y-4">
                   <div className="flex items-start gap-3">
                     <MapPin className="text-red-700 mt-1 shrink-0" size={18} />
                     <div>
                       <h3 className="text-xs font-mono text-zinc-500 uppercase tracking-widest">Environment</h3>
                       <p className="text-zinc-300 leading-relaxed">{mystery.setting}</p>
                     </div>
                   </div>
                   <div className="flex items-start gap-3">
                     <Ghost className="text-red-700 mt-1 shrink-0" size={18} />
                     <div>
                       <h3 className="text-xs font-mono text-zinc-500 uppercase tracking-widest">The Catalyst</h3>
                       <p className="text-zinc-300 leading-relaxed">{mystery.premise}</p>
                     </div>
                   </div>
                 </div>

                 <div className="space-y-6">
                   <h3 className="text-xs font-mono text-zinc-500 uppercase tracking-widest flex items-center gap-2">
                     <Users size={14} /> Personnel Dossiers
                   </h3>
                   <div className="space-y-3">
                     {mystery.characters.map((char: any, i: number) => (
                       <div key={i} className="group cursor-help">
                         <div className="flex justify-between items-center border-l-2 border-zinc-800 group-hover:border-red-700 pl-4 py-2 transition-colors">
                           <div>
                             <h4 className="font-bold text-zinc-100">{char.name}</h4>
                             <p className="text-[10px] font-mono text-zinc-500 uppercase">{char.role}</p>
                           </div>
                           <div className="text-[10px] font-mono border border-zinc-800 px-2 py-1 rounded text-zinc-500 group-hover:text-red-500 transition-colors">
                             LVL: {char.difficulty}
                           </div>
                         </div>
                       </div>
                     ))}
                   </div>
                 </div>
               </div>
            </div>

            <div className="flex items-center gap-4 p-4 border border-zinc-800/50 bg-zinc-900/20 rounded-md">
              <AlertCircle className="text-zinc-600 shrink-0" size={20} />
              <p className="text-xs text-zinc-600 font-mono italic">
                Organizers: Select a dossier to reveal secure character data.
              </p>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
