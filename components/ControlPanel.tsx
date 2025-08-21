
import React from 'react';
import { SendingStatus } from '../types';
import { Play, Pause, Square, RotateCw } from './icons';

interface ControlPanelProps {
  status: SendingStatus;
  onStart: () => void;
  onPause: () => void;
  onResume: () => void;
  onStop: () => void;
  contactsCount: number;
  currentIndex: number;
}

const ControlPanel: React.FC<ControlPanelProps> = ({ status, onStart, onPause, onResume, onStop, contactsCount, currentIndex }) => {
  const progress = contactsCount > 0 ? (currentIndex / contactsCount) * 100 : 0;
  const isIdle = status === SendingStatus.IDLE || status === SendingStatus.FINISHED;
  
  let statusText = "Aguardando início";
  if (status === SendingStatus.SENDING) statusText = `Enviando... ${currentIndex + 1} de ${contactsCount}`;
  if (status === SendingStatus.PAUSED) statusText = `Pausado em ${currentIndex + 1} de ${contactsCount}`;
  if (status === SendingStatus.FINISHED) statusText = `Envio concluído!`;

  return (
    <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 shadow-lg text-center">
      <h2 className="text-2xl font-bold mb-4">Painel de Controle</h2>
      
      <div className="my-6">
        <div className="w-full bg-gray-700 rounded-full h-4">
          <div 
            className="bg-gradient-to-r from-green-400 to-blue-500 h-4 rounded-full transition-all duration-500" 
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        <p className="mt-2 text-sm text-gray-300">{statusText}</p>
      </div>
      
      <div className="flex justify-center items-center space-x-4">
        {isIdle && (
          <button onClick={onStart} className="p-4 bg-green-500/80 hover:bg-green-500/100 rounded-full transition-transform transform hover:scale-110">
            <Play className="w-8 h-8 text-white" />
          </button>
        )}
        {status === SendingStatus.SENDING && (
          <button onClick={onPause} className="p-4 bg-yellow-500/80 hover:bg-yellow-500/100 rounded-full transition-transform transform hover:scale-110">
            <Pause className="w-8 h-8 text-white" />
          </button>
        )}
        {status === SendingStatus.PAUSED && (
          <button onClick={onResume} className="p-4 bg-blue-500/80 hover:bg-blue-500/100 rounded-full transition-transform transform hover:scale-110">
            <RotateCw className="w-8 h-8 text-white" />
          </button>
        )}
        {(status === SendingStatus.SENDING || status === SendingStatus.PAUSED || status === SendingStatus.FINISHED) && (
          <button onClick={onStop} className="p-4 bg-red-500/80 hover:bg-red-500/100 rounded-full transition-transform transform hover:scale-110">
            <Square className="w-8 h-8 text-white" />
          </button>
        )}
      </div>
    </div>
  );
};

export default ControlPanel;
