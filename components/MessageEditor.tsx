
import React from 'react';
import AIGeneratorModal from './AIGeneratorModal';

interface MessageEditorProps {
  message: string;
  setMessage: (message: string) => void;
  openAiModal: () => void;
}

const MessageEditor: React.FC<MessageEditorProps> = ({ message, setMessage, openAiModal }) => {
  return (
    <>
      <p className="text-sm text-gray-400 mb-2">
        Escreva sua mensagem. Use <code className="bg-purple-900/50 px-1 rounded-sm text-purple-300">{'{{nome}}'}</code> para personalizar com o nome do contato.
      </p>
      <textarea
        className="w-full h-48 p-3 bg-gray-900/50 border border-white/20 rounded-lg focus:ring-2 focus:ring-purple-500 focus:outline-none transition-all"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button
        onClick={openAiModal}
        className="mt-4 w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-bold py-2 px-4 rounded-lg transition-transform transform hover:scale-105"
      >
        Gerar com IA
      </button>
    </>
  );
};

export default MessageEditor;
