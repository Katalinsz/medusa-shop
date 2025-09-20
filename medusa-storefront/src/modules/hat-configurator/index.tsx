"use client"
import { useState } from 'react'
import './App.css'
import HatConfigurator from './HatConfigurator';
import translations from "./translations";

function App() {
  const [lang, setLang] = useState<"sv" | "en">("sv");

  const t = (key: string) => translations[key]?.[lang] || key;

  return (
    <>
    <div className="flex justify-end space-x-2 p-2">
        <button onClick={() => setLang("sv")}>🇸🇪</button>
        <button onClick={() => setLang("en")} className="ml-2">🇬🇧</button>
    </div>
    <HatConfigurator lang={lang} t={t}/>
      
    </>
  )
}

export default App
