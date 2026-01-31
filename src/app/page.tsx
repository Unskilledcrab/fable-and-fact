"use client";

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { Sparkles, Users, Loader2, FileSearch, Fingerprint, Clock, Eye, EyeOff, Smartphone, ArrowLeft, Shield, Unlock, Lock } from 'lucide-react';

function FableAndFact() {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  // URL-driven State
  const view = searchParams.get('view') || 'gm';
  const activePlayerIndex = searchParams.get('p') !== null ? parseInt(searchParams.get('p')!) : null;

  const [theme, setTheme] = useState("");
  const [players, setPlayers] = useState(6);
  const [loading, setLoading] = useState(false);
  const [mystery, setMystery] = useState<any>(null);
  const [revealSecret, setRevealSecret] = useState(false);
  const [glitch, setGlitch] = useState(false);

  // Sync state with URL
  const setURLState = (newView: string, pIdx: number | null = null) => {
    const params = new URLSearchParams();
    params.set('view', newView);
    if (pIdx !== null) params.set('p', pIdx.toString());
    router.push(`?${params.toString()}`);
  };

  useEffect(() => {
    setGlitch(true);
    const timer = setTimeout(() => setGlitch(false), 200);
    return () => clearTimeout(timer);
  }, [view, activePlayerIndex]);

  const handleGenerate = async () => {
    setLoading(true);
    try {
      await new Promise(r => setTimeout(r, 1200));
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
          { id: "0", name: "Vivian Vane", role: "The Lounge Singer", faction: "THE SYNDICATE", difficulty: "Easy", secret: "Was blackmailing the host for her stolen jewels.", objective: "Find the ledger before the police arrive.", allies: ["Arthur 'The Ox' Miller"] },
          { id: "1", name: "Arthur 'The Ox' Miller", role: "The Bodyguard", faction: "THE SYNDICATE", difficulty: "Medium", secret: "Is actually a mole for the Moretti Crime Family.", objective: "Ensure the ledger never sees the light of day.", allies: ["Vivian Vane"] },
          { id: "2", name: "Detective Sharp", role: "The Guest of Honor", faction: "LAW & ORDER", difficulty: "Hard", secret: "Owes the banker a gambling debt that would ruin his career.", objective: "Pin the crime on a convenient scapegoat.", allies: [] }
        ]
      });
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  // --- PLAYER VIEW ---
  if (mystery && view === 'player' && activePlayerIndex !== null) {
    const char = mystery.characters[activePlayerIndex];
    return (
      <div className={`min-h-screen bg-black text-white p-5 font-mono transition-opacity duration-150 ${glitch ? 'opacity-30' : 'opacity-100'}`}>
        <button onClick={() => { setURLState('gm'); setRevealSecret(false); }} className="bg-transparent border-none color-red-600 text-[10px] font-bold flex items-center gap-2 mb-6 tracking-widest uppercase cursor-pointer">
          <ArrowLeft size={14} /> EXIT_TERMINAL
        </button>
        
        <div className="bg-[#0a0a0a] p-6 border border-[#222] border-l-4 border-l-[#b91c1c] rounded-sm">
          <div className="text-[9px] font-bold text-[#b91c1c] tracking-[0.3em] mb-5">// DOSSIER ID: {activePlayerIndex.toString().padStart(3, '0')}</div>
          
          <h2 className="text-3xl font-black m-0 uppercase leading-tight text-[#eee]">{char.name}</h2>
          <div className="text-[11px] text-[#666] mt-1 mb-8 tracking-widest uppercase font-bold">{char.role} // {char.faction}</div>

          <div className="mb-8 p-4 bg-[#111] border border-[#1a1a1a]">
            <h4 className="text-[9px] text-[#666] font-bold flex items-center gap-2 mb-3 uppercase tracking-wider">
              <Shield size={12} className="text-[#b91c1c]" /> KNOWN AFFILIATES
            </h4>
            {char.allies?.length > 0 ? (
              <ul className="m-0 p-0 list-none">
                {char.allies.map((ally: string, i: number) => (
                  <li key={i} className="text-[13px] text-[#888] mb-1.5 flex items-center gap-2"><span className="text-[#b91c1c] opacity-50">&gt;</span> {ally}</li>
                ))}
              </ul>
            ) : <p className="m-0 text-[11px] text-[#444] italic">Isolated operative.</p>}
          </div>

          <div className="mb-8">
            <h4 className="text-[9px] text-[#16a34a] font-bold flex items-center gap-2 mb-2 uppercase tracking-wider">
              <Unlock size={12} /> MISSION OBJECTIVE
            </h4>
            <p className="m-0 text-[14px] leading-relaxed text-[#bbb]">{char.objective}</p>
          </div>

          <div className={`p-5 rounded-sm transition-all duration-300 border ${revealSecret ? 'bg-[#1a0505] border-[#b91c1c]' : 'bg-[#0f0f0f] border-[#1a1a1a]'}`}>
            <h4 className="text-[9px] text-[#b91c1c] font-bold flex items-center gap-2 mb-4 uppercase tracking-widest">
              <Lock size={12} /> CLASSIFIED DATA
            </h4>
            
            {!revealSecret ? (
              <button 
                onClick={() => setRevealSecret(true)}
                className="w-full py-4 bg-[#b91c1c] hover:bg-[#991b1b] text-white border-none text-[11px] font-black tracking-[0.2em] uppercase cursor-pointer active:scale-[0.98] transition-transform"
              >
                UNSEAL ENVELOPE
              </button>
            ) : (
              <div onClick={() => setRevealSecret(false)} className="cursor-pointer">
                <p className="m-0 text-[15px] italic leading-relaxed text-[#ffbaba]">
                  {char.secret}
                </p>
                <div className="mt-5 text-[8px] text-[#633] text-center tracking-[0.3em] font-black uppercase underline decoration-dotted">RESUBMIT TO LOCK</div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  // --- GM VIEW ---
  return (
    <div className={`min-h-screen bg-black text-[#ccc] p-4 pb-24 transition-opacity duration-150 ${glitch ? 'opacity-30' : 'opacity-100'}`} style={{ fontFamily: 'sans-serif' }}>
      <div className="max-w-[800px] mx-auto">
        <header className="border-b border-[#222] pb-4 mb-6">
          <div className="text-[#b91c1c] text-[10px] font-bold tracking-[0.2em] mb-2 uppercase">INTEL OPS // V.07</div>
          <h1 className="text-[clamp(32px,10vw,60px)] font-black m-0 italic tracking-tighter text-white">
            FABLE <span className="text-[#b91c1c]">FACT</span>
          </h1>
        </header>

        {!mystery ? (
          <aside className="bg-[#0a0a0a] p-5 border border-[#222] rounded-md shadow-2xl">
            <div className="mb-6">
              <label className="block text-[9px] text-[#666] font-bold tracking-widest uppercase mb-2">SCENARIO MOTIF</label>
              <input 
                className="w-full bg-black border border-[#333] p-4 text-white rounded-sm text-base focus:border-[#b91c1c] outline-none"
                placeholder="Enter theme..."
                value={theme}
                onChange={(e) => setTheme(e.target.value)}
              />
            </div>
            <div className="mb-8">
               <label className="flex justify-between text-[9px] text-[#666] font-bold uppercase mb-2 tracking-widest">
                <span>OPERATIVES</span>
                <span className="text-[#b91c1c] text-sm">{players}</span>
              </label>
              <input type="range" min="3" max="12" className="w-full accent-[#b91c1c] h-8" value={players} onChange={(e) => setPlayers(parseInt(e.target.value))} />
            </div>
            <button onClick={handleGenerate} disabled={loading || !theme} className="w-full py-5 bg-[#b91c1c] hover:bg-[#991b1b] text-white border-none font-black tracking-widest text-xs rounded-sm cursor-pointer disabled:bg-[#333] transition-colors">
              {loading ? 'PROCESSING...' : 'INITIALIZE GENERATION'}
            </button>
          </aside>
        ) : (
          <div className="flex flex-col gap-6">
            <section className="bg-white text-black p-6 shadow-[10px_10px_0px_#b91c1c] border border-white">
               <h2 className="text-2xl font-black uppercase mb-6 border-b-4 border-black pb-2 flex justify-between items-center">
                 {mystery.title}
                 <Fingerprint size={24} className="opacity-20" />
               </h2>
               
               <div className="mb-8">
                 <h4 className="text-[9px] font-black text-[#b91c1c] tracking-[0.2em] uppercase mb-4 underline">Personnel Manifest</h4>
                 <div className="flex flex-col gap-4">
                   {mystery.characters.map((char: any, i: number) => (
                     <div key={i} className="border border-[#eee] rounded-sm bg-[#fafafa] flex items-center justify-between p-3">
                        <div className="flex flex-col">
                          <span className="text-sm font-black">{char.name}</span>
                          <span className="text-[10px] text-[#999] uppercase font-bold">{char.role}</span>
                        </div>
                        <button 
                          onClick={() => setURLState('player', i)}
                          className="bg-black text-white border-none p-3 rounded-sm flex items-center justify-center cursor-pointer active:scale-90 transition-transform"
                          title="Preview Player Dossier"
                        >
                          <Smartphone size={16} />
                        </button>
                     </div>
                   ))}
                 </div>
               </div>
               
               <button onClick={() => setMystery(null)} className="w-full py-3 bg-black text-white text-[10px] font-black tracking-widest uppercase border-none cursor-pointer">
                 SCRAP DATA & RESTART
               </button>
            </section>
          </div>
        )}
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-black flex items-center justify-center text-white font-mono uppercase tracking-[0.5em] animate-pulse text-[10px]">Compiling_Intelligence...</div>}>
      <FableAndFact />
    </Suspense>
  );
}
