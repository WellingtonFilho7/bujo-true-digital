// 1. No topo, adicione:
const [showLegend, setShowLegend] = useState(false);

// 2. No JSX, dentro do <header>, ao lado do logo:
<header className="...">
  <div>
    <h1 className="...">BuJo<span className="text-[#d65a38]">.</span></h1>
    {/* ... data de hoje ... */}
  </div>
  
  {/* BOTÃO DE LEGENDA */}
  <button 
    onClick={() => setShowLegend(!showLegend)}
    className="p-2 text-gray-400 hover:text-[#d65a38] transition-colors"
  >
    <Info className="w-6 h-6" />
  </button>
</header>

// 3. Logo abaixo do </nav>, adicione a Legenda condicional:
{showLegend && (
  <div className="bg-gray-50 border-b border-gray-100 p-6 animate-in slide-in-from-top-full duration-300">
    <div className="max-w-md mx-auto space-y-4">
      <h3 className="text-sm font-black uppercase tracking-widest text-[#d65a38]">Método Rapid Logging</h3>
      
      <div className="grid gap-4">
        <section>
          <div className="flex items-center gap-2 font-bold text-sm underline decoration-[#d65a38]">
            <span>• Tasks</span>
          </div>
          <p className="text-xs text-gray-500 mt-1">Ações. Têm estados: • (aberta), ✓ (feita), {'>'} (adiada), X (cancelada).</p>
        </section>

        <section>
          <div className="flex items-center gap-2 font-bold text-sm">
            <span>O</span> <strong>Eventos</strong>
          </div>
          <p className="text-xs text-gray-500 mt-1">Datas e ocorrências. São registros objetivos e breves.</p>
        </section>

        <section>
          <div className="flex items-center gap-2 font-medium italic text-sm">
            <span>–</span> Notas
          </div>
          <p className="text-xs text-gray-500 mt-1">Fatos, ideias e observações. Informações para não esquecer.</p>
        </section>
      </div>
      
      <button 
        onClick={() => setShowLegend(false)}
        className="w-full py-2 text-xs font-bold bg-[#1a1a1a] text-white rounded-sm"
      >
        Entendi
      </button>
    </div>
  </div>
)}
