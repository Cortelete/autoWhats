
import React from 'react';

interface SettingsProps {
  interval: number;
  setInterval: (interval: number) => void;
  senderPhone: string;
  setSenderPhone: (phone: string) => void;
}

const Settings: React.FC<SettingsProps> = ({ interval, setInterval, senderPhone, setSenderPhone }) => {
  return (
    <div className="space-y-6">
      <div>
        <label htmlFor="interval" className="block text-sm font-medium text-gray-300">
          Intervalo entre mensagens (segundos)
        </label>
        <p className="text-xs text-gray-500 mb-2">Intervalos maiores ajudam a evitar bloqueios.</p>
        <div className="flex items-center space-x-4">
          <input
            id="interval"
            type="range"
            min="5"
            max="60"
            value={interval}
            onChange={(e) => setInterval(Number(e.target.value))}
            className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
          />
          <span className="font-bold text-sky-300 text-lg w-12 text-center">{interval}s</span>
        </div>
      </div>
      <div>
        <label htmlFor="senderPhone" className="block text-sm font-medium text-gray-300">
          Seu Número do WhatsApp (Opcional)
        </label>
         <p className="text-xs text-gray-500 mb-2">Apenas para referência. O envio será do WhatsApp Web ativo no seu navegador.</p>
        <input
          id="senderPhone"
          type="text"
          placeholder="Ex: 5511912345678"
          value={senderPhone}
          onChange={(e) => setSenderPhone(e.target.value)}
          className="w-full p-2 bg-gray-900/50 border border-white/20 rounded-lg focus:ring-2 focus:ring-sky-500 focus:outline-none transition-all"
        />
      </div>
    </div>
  );
};

export default Settings;
