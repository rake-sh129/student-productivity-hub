import React, { useMemo, useState } from 'react'
import { CURATED_QUOTES, THEMES} from './QUOTESDATA';
import {Copy, Sparkles, Paintbrush, Check} from "lucide-react";

const Quotes = () => {
    const currentDailyIndex = useMemo(()=> {
        const now = new Date();
        const dateStr = `${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()}`;
        let hash = 0;
        for (let i = 0; i < dateStr.length; i++){
            hash = dateStr.charCodeAt(i) + ((hash << 5) - hash);
        }
        return Math.abs(hash) % CURATED_QUOTES.length;
    }, [])

    const [activeQuoteIndex, setActiveQuoteIndex] = useState(currentDailyIndex);
    const [isPreviewMode, setIsPreviewMode] = useState(false);
    const [activeTheme, setActiveTheme]= useState([0]);
    const [isCopied, setIsCopied] = useState(false);

    const formattedCurrentDate = useMemo(()=>{
        const options = {weekday: "long", month: "long", day: "numeric" };
        return new Date().toLocaleDateString("en-US", options);
    }, [])

    const activeQuote = CURATED_QUOTES[activeQuoteIndex];

    const handleCopy = async ()=>{
        try{
            const formattedText = `"${activeQuote.text}" — ${activeQuote.author} (${activeQuote.category})`;
            await navigator.clipboard.writeText(formattedText);
            setIsCopied(true);
            setTimeout(()=> setIsCopied(false), 2000);
        } catch{
            console.error("Failed to copy text:", err);
        }
    }

    const resetToDaily = ()=>{
        setActiveQuoteIndex(currentDailyIndex);
        setIsPreviewMode(false);
    }

  return (
    <div>
       <div>
          <header>
             <div>
                <h1>StudyHub<span></span></h1>
                <p></p>
             </div>

             <div>
                <div>
                    <div>
                        <span>Daily Inspiration</span>
                    </div>
                </div>
             </div>
          </header>

          <main>
            <QuoteCard 
            quote = {activeQuote}
            theme={activeTheme}
            isCopied={isCopied}
            onCopy={handleCopy}
            isPreviewMode={isPreviewMode}
            onResetToDaily={resetToDaily}
            ></QuoteCard>

            <div>
                <div>
                    <div>
                        <h3>Card Color Style</h3>
                    </div>

                    <div>
                    {
                        THEMES.map((t) => {
                            const isSelected = activeTheme.id === t.id;
                            return(
                                <button key={t.id} onClick={()=> setActiveTheme(t)} title={t.name}
                                >
                                    {
                                        isSelected && (
                                            <span>Check</span>
                                        )}
                                </button>
                            )
                        })
                    }
                    </div>
                </div>

                <div>
                    <div>
                        <div>
                            <h3>Inspiration Category</h3>
                        </div>

                        <div>
                            {
                                ["Focus & Study", "Growth Mindset", "Resilience", "Self-Care & Balance"].map((cat) =>{
                                    const isSelected = activeQuote.category === cat;
                                    return (
                                        <button key={cat} onClick={()=>{
                                            const idx = CURATED_QUOTES.findIndex((q) => q.category === cat);
                                            if(idx !== -1){
                                                setActiveQuoteIndex(idx);
                                                setIsPreviewMode(true);
                                            }
                                        }}
                                        > {cat}</button>
                                    )
                                })
                            }
                        </div>
                    </div>
                </div>
            </div>
          </main>

          <footer>
            <p>🌱 Cultivated daily inside StudyHub. High effort, infinite growth!</p>
          </footer>
       </div>
    </div>
  )
}

function QuoteCard({quote, theme, isCopied, onCopy, isPreviewMode, onResetToDaily}){
    return (
        <div>Motion Div
            <div></div>

            <div id="main-quote-card">
                
            </div>

            <div>
                <div></div>
            </div>

            <div>
                <div>
                    <span></span>
                </div>

                <div>
                    {
                        isPreviewMode && (
                            <span>Previewing</span>
                        )
                    }
                </div>
            </div>

            <div>
                <h2>"{quote.text}"</h2>
                <p>- {quote.author}</p>
            </div>

            <div>
                <div>
                    <button>
                        {isCopied? "Copied": "Copy Quote"}
                    </button>
                </div>

                <div>
                    {
                        isPreviewMode && (
                            <button>Today's Quote</button>
                        )
                    }
                </div>
            </div>
        </div>
    )
}

export default Quotes
