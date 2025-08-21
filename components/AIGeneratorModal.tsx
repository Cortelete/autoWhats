
import React, { useState } from 'react';
import { generateMessage } from '../services/geminiService';
import { X, Wand2 } from './icons';

interface AIGeneratorModalProps {
  onClose: () => void;
  onGenerate: (message: string) => void;
}

const AIGeneratorModal: React.FC<AIGeneratorModalProps> = ({ onClose, onGenerate }) => {
  const [clientType, setClientType] = useState('');
  const [service, setService] = useState('');
  const [tone, setTone] = useState('Amigável');
  const [generatedMessage, setGeneratedMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleGenerate = async () => {
    if (!clientType || !service) {
      setError('Por favor, preencha o tipo de cliente e o serviço/produto.');
      return;
    }
    setError('');
    setIsLoading(true);
    setGeneratedMessage('');
    try {
      const result = await generateMessage(clientType, service, tone);
      setGeneratedMessage(result);
    } catch (e) {
      setError('Falha ao gerar mensagem. Verifique sua chave de API e tente novamente.');
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  const handleUseMessage = () => {
    onGenerate(generatedMessage);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex justify-center items-center z-50 p-4">
      <div className="bg-gray-800/80 border border-purple-500/50 rounded-2xl shadow-2xl w-full max-w-2xl p-6 relative">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-white">
          <X className="w-6 h-6" />
        </button>
        <h2 className="text-2xl font-bold text-center mb-6 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">Gerador de Mensagem IA</h2>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Tipo de Cliente</label>
            <input type="text" value={clientType} onChange={e => setClientType(e.target.value)} placeholder="Ex: Novo lead, cliente antigo" className="w-full p-2 bg-gray-900/50 border border-white/20 rounded-lg focus:ring-2 focus:ring-purple-500 focus:outline-none" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Serviço/Produto a Oferecer</label>
            <input type="text" value={service} onChange={e => setService(e.target.value)} placeholder="Ex: Consultoria de marketing, produto X" className="w-full p-2 bg-gray-900/50 border border-white/20 rounded-lg focus:ring-2 focus:ring-purple-500 focus:outline-none" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Tom da Mensagem</label>
            <select value={tone} onChange={e => setTone(e.target.value)} className="w-full p-2 bg-gray-900/50 border border-white/20 rounded-lg focus:ring-2 focus:ring-purple-500 focus:outline-none">
              <option>Amigável</option>
              <option>Profissional</option>
              <option>Urgente</option>
              <option>Divertido</option>
            </select>
          </div>
        </div>
        
        <button onClick={handleGenerate} disabled={isLoading} className="mt-6 w-full flex items-center justify-center bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-bold py-2 px-4 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed">
          {isLoading ? (
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
          ) : (
            <>
              <Wand2 className="w-5 h-5 mr-2" />
              Gerar Mensagem
            </>
          )}
        </button>

        {error && <p className="text-red-400 text-center mt-4">{error}</p>}

        {generatedMessage && (
          <div className="mt-6">
            <h3 className="font-semibold text-lg">Sugestão de Mensagem:</h3>
            <div className="mt-2 p-3 bg-gray-900/70 rounded-lg max-h-40 overflow-y-auto">
              <p className="text-gray-200 whitespace-pre-wrap">{generatedMessage}</p>
            </div>
            <button onClick={handleUseMessage} className="mt-4 w-full bg-gradient-to-r from-green-500 to-teal-500 hover:from-green-600 hover:to-teal-600 text-white font-bold py-2 px-4 rounded-lg">
              Usar esta Mensagem
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AIGeneratorModal;
