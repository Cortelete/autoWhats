
import React from 'react';
import { MessageCircle } from './icons';

const Header: React.FC = () => {
  return (
    <header className="text-center">
      <div className="inline-flex items-center justify-center bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-500">
        <MessageCircle className="w-12 h-12 mr-4" />
        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight">
          WhatsApp Bulk Messenger AI
        </h1>
      </div>
      <p className="mt-2 text-lg text-gray-300 max-w-2xl mx-auto">
        Envie mensagens em massa de forma inteligente. Use o gerador de mensagens com IA para criar textos perfeitos.
      </p>
    </header>
  );
};

export default Header;
