import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  MessageSquare, 
  X, 
  Send, 
  ShieldCheck, 
  TrendingUp, 
  CheckCircle2,
  Leaf,
  Info
} from 'lucide-react';

// --- DATA (Área de Edição do Dono) ---
const highlights = [
  {
    id: 'h1',
    title: 'Produto 01',
    description: 'Descrição Breve do item com foco em qualidade.',
    price: 'R$ 00,00',
    status: '🟢 Status: Disponível para retirada imediata',
    analysis: 'Alto valor logístico devido à sua durabilidade e design atemporal. Excelente retenção de valor.'
  },
  {
    id: 'h2',
    title: 'Produto 02',
    description: 'Descrição Breve destacando o custo-benefício.',
    price: 'R$ 00,00',
    status: '⚠️ Última unidade do lote',
    analysis: 'Oportunidade de mercado. Item com alta demanda e escassez, garantindo um ROI imediato.'
  }
];

const categories = [
  {
    name: 'NOME DA CATEGORIA',
    items: [
      {
        id: 'c1',
        name: 'Exemplo',
        condition: '10/10',
        price: 'R$ 100',
        advantage: 'ROI Excelente',
        status: '🟢 Status: Disponível para retirada imediata',
        analysis: 'Material premium com acabamento impecável. Funcionalidade que justifica cada centavo investido.'
      }
    ]
  }
];

// --- COMPONENTS ---

export default function App() {
  const [selectedItem, setSelectedItem] = useState<any | null>(null);
  const [chatOpen, setChatOpen] = useState(false);
  const [inputValue, setInputValue] = useState('');
  
  const [chatMessages, setChatMessages] = useState([
    { 
      role: 'assistant', 
      text: '🟢 **O BAZAR DA HEVY** | *Curadoria Inteligente & Oportunidades*\n*Onde a lógica do bom negócio encontra produtos de qualidade.*\n\nOlá. Sou o Curador Digital. Como posso auxiliar na sua análise de portfólio hoje?' 
    }
  ]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    const newMessages = [...chatMessages, { role: 'user', text: inputValue }];
    setChatMessages(newMessages);
    setInputValue('');

    // Simulate AI response based on ADM rules
    setTimeout(() => {
      let response = "Analisando sua solicitação sob a ótica de custo-benefício, recomendo verificar nossos Destaques da Semana. Deseja que eu prepare a nota de reserva para algum item específico?";
      
      const lowerInput = inputValue.toLowerCase();
      if (lowerInput.includes('desconto') || lowerInput.includes('menor valor') || lowerInput.includes('barato')) {
        response = "Compreendo a busca por otimização de custos. No entanto, nossa precificação já reflete uma análise rigorosa de mercado, depreciação e estado de conservação (ROI). O valor atual garante a qualidade da curadoria. Deseja que eu prepare a nota de reserva para este item?";
      } else if (lowerInput.includes('produto 01') || lowerInput.includes('exemplo')) {
        response = "Excelente escolha. Este item possui um valor funcional altíssimo e 🟢 Status: Disponível para retirada imediata. Deseja que eu prepare a nota de reserva para este item?";
      }

      setChatMessages(prev => [...prev, { role: 'assistant', text: response }]);
    }, 1000);
  };

  // Helper to render simple markdown in chat
  const renderMarkdown = (text: string) => {
    return text.split('\n').map((line, i) => {
      let formattedLine = line;
      // Bold
      const boldParts = formattedLine.split('**');
      const lineContent = boldParts.map((part, j) => j % 2 === 1 ? <strong key={j} className="font-bold text-emerald-950">{part}</strong> : part);
      
      // Italics
      return (
        <span key={i} className="block mb-2 last:mb-0">
          {lineContent.map((element, k) => {
            if (typeof element === 'string') {
              const italicParts = element.split('*');
              return italicParts.map((part, l) => l % 2 === 1 ? <em key={l} className="italic text-emerald-800">{part}</em> : part);
            }
            return element;
          })}
        </span>
      );
    });
  };

  return (
    <div className="min-h-screen bg-[#f4f9f4] text-emerald-950 font-sans selection:bg-emerald-200 selection:text-emerald-900 pb-24">
      
      {/* HEADER / PORTFOLIO COVER */}
      <header className="pt-16 pb-12 px-6 sm:px-12 max-w-4xl mx-auto text-center">
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-block mb-6"
        >
          <div className="flex items-center justify-center gap-3 text-emerald-800 mb-4">
            <span className="text-2xl">🟢</span>
            <h1 className="text-3xl md:text-4xl font-serif font-bold tracking-tight uppercase">
              O Bazar da Hevy
            </h1>
          </div>
          <h2 className="text-lg md:text-xl font-medium text-emerald-700 tracking-wide uppercase letter-spacing-2">
            Curadoria Inteligente & Oportunidades
          </h2>
        </motion.div>
        
        <motion.blockquote 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="max-w-2xl mx-auto border-l-4 border-emerald-500 bg-emerald-50/50 p-6 rounded-r-xl shadow-sm italic text-emerald-800 text-lg"
        >
          "Onde a lógica do bom negócio encontra produtos de qualidade."
        </motion.blockquote>
      </header>

      <main className="max-w-4xl mx-auto px-6 sm:px-12">
        
        {/* EDIT NOTICE */}
        <div className="mb-12 p-4 bg-emerald-100/50 border border-emerald-200 rounded-lg text-sm text-emerald-800 font-mono flex items-start gap-3">
          <Info size={18} className="flex-shrink-0 mt-0.5" />
          <p>{`> [DONO: Altere os itens abaixo para atualizar seu portfólio em tempo real]`}</p>
        </div>

        {/* HIGHLIGHTS */}
        <section className="mb-16">
          <h3 className="text-xl font-bold text-emerald-900 mb-6 flex items-center gap-2 border-b border-emerald-200 pb-2">
            ✅ DESTAQUES DA SEMANA
          </h3>
          <ul className="space-y-4">
            {highlights.map((item) => (
              <motion.li 
                key={item.id}
                whileHover={{ x: 4 }}
                onClick={() => setSelectedItem(item)}
                className="group cursor-pointer p-5 bg-white border border-emerald-100 rounded-xl shadow-sm hover:shadow-md hover:border-emerald-300 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4"
              >
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-emerald-500">•</span>
                    <strong className="text-lg font-serif text-emerald-950 group-hover:text-emerald-700 transition-colors">{item.title}</strong>
                  </div>
                  <p className="text-emerald-700/80 text-sm pl-4">{item.description}</p>
                  <p className="text-xs font-medium text-emerald-600 mt-2 pl-4">{item.status}</p>
                </div>
                <div className="pl-4 sm:pl-0 flex items-center gap-4">
                  <span className="text-lg font-bold text-emerald-900 bg-emerald-50 px-3 py-1 rounded-lg">{item.price}</span>
                  <CheckCircle2 size={20} className="text-emerald-300 group-hover:text-emerald-600 transition-colors" />
                </div>
              </motion.li>
            ))}
          </ul>
        </section>

        {/* CATEGORIES */}
        {categories.map((category, idx) => (
          <section key={idx} className="mb-16">
            <h3 className="text-xl font-bold text-emerald-900 mb-6 flex items-center gap-2 border-b border-emerald-200 pb-2">
              🟢 CATEGORIA: {category.name}
            </h3>
            <div className="overflow-x-auto bg-white rounded-xl shadow-sm border border-emerald-100">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-emerald-50/80 border-b border-emerald-200">
                    <th className="p-4 font-semibold text-emerald-900 text-sm uppercase tracking-wider">Item</th>
                    <th className="p-4 font-semibold text-emerald-900 text-sm uppercase tracking-wider">Condição</th>
                    <th className="p-4 font-semibold text-emerald-900 text-sm uppercase tracking-wider">Valor</th>
                    <th className="p-4 font-semibold text-emerald-900 text-sm uppercase tracking-wider">Vantagem</th>
                    <th className="p-4 font-semibold text-emerald-900 text-sm uppercase tracking-wider text-center">Ação</th>
                  </tr>
                </thead>
                <tbody>
                  {category.items.map((item) => (
                    <tr key={item.id} className="border-b border-emerald-50 hover:bg-emerald-50/30 transition-colors">
                      <td className="p-4 font-medium text-emerald-950">{item.name}</td>
                      <td className="p-4 text-emerald-700 text-sm">{item.condition}</td>
                      <td className="p-4 font-bold text-emerald-900">{item.price}</td>
                      <td className="p-4 text-emerald-700 text-sm flex items-center gap-1">
                        <span className="text-emerald-500 text-lg">💹</span>
                        {item.advantage}
                      </td>
                      <td className="p-4 text-center">
                        <button 
                          onClick={() => setSelectedItem(item)}
                          className="text-xs font-bold uppercase tracking-wider bg-emerald-100 text-emerald-800 px-3 py-1.5 rounded-md hover:bg-emerald-200 transition-colors"
                        >
                          Analisar
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        ))}

      </main>

      {/* FLOATING CHAT BUTTON */}
      <button 
        onClick={() => setChatOpen(true)}
        className="fixed bottom-6 right-6 w-14 h-14 rounded-full bg-emerald-700 text-white shadow-lg shadow-emerald-700/30 flex items-center justify-center hover:bg-emerald-800 hover:scale-105 transition-all z-40"
      >
        <MessageSquare size={24} />
      </button>

      {/* CHAT INTERFACE */}
      <AnimatePresence>
        {chatOpen && (
          <motion.div 
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-24 right-6 w-80 sm:w-96 bg-white rounded-2xl shadow-2xl border border-emerald-200 overflow-hidden z-50 flex flex-col"
            style={{ maxHeight: 'calc(100vh - 120px)' }}
          >
            <div className="p-4 bg-emerald-900 text-white flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ShieldCheck size={18} className="text-emerald-400" />
                <span className="font-medium text-sm tracking-wide">Curador Digital ADM</span>
              </div>
              <button onClick={() => setChatOpen(false)} className="text-emerald-400 hover:text-white transition-colors">
                <X size={18} />
              </button>
            </div>
            
            <div className="flex-1 p-4 overflow-y-auto min-h-[300px] max-h-[400px] bg-[#f8fbf8] space-y-4">
              {chatMessages.map((msg, idx) => (
                <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[90%] p-3.5 rounded-2xl text-sm leading-relaxed ${
                    msg.role === 'user' 
                      ? 'bg-emerald-100 text-emerald-950 rounded-tr-sm' 
                      : 'bg-white border border-emerald-100 text-emerald-800 rounded-tl-sm shadow-sm'
                  }`}>
                    {renderMarkdown(msg.text)}
                  </div>
                </div>
              ))}
            </div>

            <form onSubmit={handleSendMessage} className="p-3 bg-white border-t border-emerald-100 flex gap-2">
              <input 
                type="text" 
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Negocie ou tire dúvidas..."
                className="flex-1 bg-emerald-50 rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-300 transition-all text-emerald-950 placeholder-emerald-400/70"
              />
              <button 
                type="submit"
                disabled={!inputValue.trim()}
                className="w-10 h-10 rounded-xl bg-emerald-800 text-white flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed hover:bg-emerald-900 transition-colors"
              >
                <Send size={16} />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ITEM MODAL (ANÁLISE ADM) */}
      <AnimatePresence>
        {selectedItem && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedItem(null)}
              className="absolute inset-0 bg-emerald-950/60 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl overflow-hidden border border-emerald-100"
            >
              <div className="p-6 sm:p-8">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h3 className="text-2xl font-serif font-bold text-emerald-950 mb-1">{selectedItem.title || selectedItem.name}</h3>
                    <p className="text-sm font-medium text-emerald-600">{selectedItem.status}</p>
                  </div>
                  <button 
                    onClick={() => setSelectedItem(null)}
                    className="w-8 h-8 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-800 hover:bg-emerald-100 transition-colors"
                  >
                    <X size={18} />
                  </button>
                </div>
                
                <div className="space-y-6">
                  {/* Bloco de Análise de Valor */}
                  <div className="bg-[#f8fbf8] border border-emerald-100 rounded-xl p-5">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-800 mb-3 flex items-center gap-2">
                      <TrendingUp size={16} />
                      Análise de Valor (ADM)
                    </h4>
                    <p className="text-sm text-emerald-900 leading-relaxed">
                      {selectedItem.analysis}
                    </p>
                  </div>
                  
                  <div className="flex items-center justify-between p-4 bg-emerald-50 rounded-xl border border-emerald-100">
                    <span className="text-sm font-semibold text-emerald-800 uppercase tracking-wider">Investimento</span>
                    <span className="text-2xl font-bold text-emerald-950">{selectedItem.price}</span>
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-emerald-100">
                  <p className="text-center text-sm text-emerald-800 mb-4 font-medium italic">
                    "Deseja que eu prepare a nota de reserva para este item?"
                  </p>
                  <div className="flex gap-3">
                    <button 
                      onClick={() => {
                        const itemName = selectedItem.title || selectedItem.name;
                        setSelectedItem(null);
                        setChatOpen(true);
                        setInputValue(`Tenho uma dúvida técnica sobre o ${itemName}.`);
                      }}
                      className="flex-1 py-3 px-4 rounded-xl bg-white border border-emerald-200 text-emerald-800 font-bold text-sm hover:bg-emerald-50 transition-colors"
                    >
                      Dúvida Técnica
                    </button>
                    <button 
                      onClick={() => {
                        alert("Gerando nota de reserva e redirecionando para o fechamento...");
                      }}
                      className="flex-1 py-3 px-4 rounded-xl bg-emerald-700 text-white font-bold text-sm hover:bg-emerald-800 transition-colors shadow-lg shadow-emerald-700/20 flex items-center justify-center gap-2"
                    >
                      <CheckCircle2 size={18} />
                      Preparar Reserva
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
