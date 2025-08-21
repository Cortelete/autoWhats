
import React from 'react';
import { SendingStatus } from '../types';
import { Play, Pause, Square } from './icons';

interface StatusModalProps {
  status: SendingStatus;
  contactsCount: number;
  currentIndex: number;
  onStop: () => void;
  onResume: () => void;
  onPause: () => void;
}

const StatusModal: React.FC<StatusModalProps> = ({ status, contactsCount, currentIndex, onStop, onResume, onPause }) => {
  const progress = contactsCount > 0 ? ((status === SendingStatus.FINISHED ? contactsCount : currentIndex) / contactsCount) * 100 : 0;
  
  let title = "Iniciando Envio...";
  let description = "Preparando para enviar mensagens. Uma nova aba será aberta para cada contato.";
  
  if (status === SendingStatus.SENDING) {
    title = `Enviando para o contato ${currentIndex + 1} de ${contactsCount}`;
    description = "Aguarde o intervalo ou pressione 'Pausar'. Não feche esta janela.";
  } else if (status === SendingStatus.PAUSED) {
    title = "Envio Pausado";
    description = `Pausado no contato ${currentIndex + 1}. Pressione 'Retomar' para continuar.`;
  } else if (status === SendingStatus.FINISHED) {
    title = "Envio Concluído!";
    description = `Todas as ${contactsCount} mensagens foram processadas.`;
  }

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex justify-center items-center z-50 p-4">
      <div className="bg-gray-800/80 border border-purple-500/50 rounded-2xl shadow-2xl w-full max-w-lg p-8 text-center">
        <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500 mb-4">{title}</h2>
        <p className="text-gray-300 mb-6">{description}</p>
        
        <div className="w-full bg-gray-700 rounded-full h-4 mb-6">
          <div className="bg-gradient-to-r from-green-400 to-blue-500 h-4 rounded-full transition-all duration-500" style={{ width: `${progress}%` }}></div>
        </div>
        <p className="text-xl font-mono mb-6">{status === SendingStatus.FINISHED ? contactsCount : currentIndex} / {contactsCount}</p>

        <div className="flex flex-col sm:flex-row justify-center gap-4">
          {status === SendingStatus.SENDING && (
            <button onClick={onPause} className="w-full sm:w-auto bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-3 px-6 rounded-lg flex items-center justify-center transition-colors">
              <Pause className="w-5 h-5 mr-2" /> Pausar
            </button>
          )}
           {status === SendingStatus.PAUSED && (
            <button onClick={onResume} className="w-full sm:w-auto bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-lg flex items-center justify-center transition-colors">
              <Play className="w-5 h-5 mr-2" /> Retomar
            </button>
          )}
          <button onClick={onStop} className="w-full sm:w-auto bg-red-500 hover:bg-red-600 text-white font-bold py-3 px-6 rounded-lg flex items-center justify-center transition-colors">
            <Square className="w-5 h-5 mr-2" /> {status === SendingStatus.FINISHED ? "Fechar" : "Parar"}
          </button>
        </div>

        <div className="mt-8 p-4 bg-yellow-900/30 border border-yellow-500/50 rounded-lg text-yellow-200 text-sm">
          <strong>Atenção:</strong> Você precisará clicar em 'Enviar' manualmente na janela do WhatsApp que será aberta para cada contato.
        </div>
      </div>
    </div>
  );
};

export default StatusModal;