import React, { useState } from 'react'
import { CURATED_QUOTES, THEMES} from './QUOTESDATA';

const Quotes = () => {

    // const [activeQuoteIndex, setActiveQuoteIndex] = useState(currentDailyIndex);
    const [isPreviewMode, setIsPreviewMode] = useState(false);
    const [activeTheme, setActiveTheme]= useState([0]);
    const [isCopied, setIsCopied] = useState(false);


    function QuoteCard({quote, theme, isCopied, onCopy, isPreviewMode, onResetToDaily}){
        
        
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
            Quotecard

            <div>
                <div>
                    <div>
                        <h3>Card Color Style</h3>
                    </div>

                    <div>
                    {
                        THEMES.map((t) => {
                            return(
                                <button></button>
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
                                    return (
                                        <button></button>
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

export default Quotes
