import React, { useState } from 'react';
import { Contact } from '../types';

interface ContactInputProps {
  setContacts: React.Dispatch<React.SetStateAction<Contact[]>>;
}

const ContactInput: React.FC<ContactInputProps> = ({ setContacts }) => {
  const [text, setText] = useState<string>('');
  const [parsedContacts, setParsedContacts] = useState<Contact[]>([]);
  const [feedback, setFeedback] = useState<{ message: string; type: 'success' | 'error' | 'info' } | null>(null);

  const handleParse = () => {
    if (text.trim() === '') {
      setFeedback({ message: 'A área de texto está vazia. Cole os contatos para processar.', type: 'info' });
      setParsedContacts([]);
      setContacts([]);
      return;
    }

    const lines = text.split('\n').filter(line => line.trim() !== '');
    const contacts = lines.map(line => {
      const parts = line.split(/\t|;/); // Split by tab or semicolon
      if (parts.length >= 2) {
        const name = parts[0].trim();
        const phone = parts[1].trim().replace(/\D/g, ''); // Sanitize phone number
        if (name && phone) {
            return { name, phone };
        }
      }
      return null;
    }).filter((contact): contact is Contact => contact !== null);
    
    if (contacts.length > 0) {
      setFeedback({ message: `${contacts.length} contatos carregados com sucesso!`, type: 'success' });
    } else {
      setFeedback({ message: 'Nenhum contato válido encontrado. Verifique o formato: NOME (tab ou ;) TELEFONE por linha.', type: 'error' });
    }

    setParsedContacts(contacts);
    setContacts(contacts);
  };

  const getFeedbackColor = () => {
    if (!feedback) return '';
    switch (feedback.type) {
      case 'success': return 'text-green-400';
      case 'error': return 'text-red-400';
      case 'info': return 'text-sky-400';
      default: return 'text-gray-400';
    }
  };

  return (
    <div>
      <p className="text-sm text-gray-400 mb-2">
        Cole os dados da sua planilha aqui. Cada linha deve conter NOME e TELEFONE, separados por tabulação (ao copiar do Excel/Sheets) ou ponto e vírgula.
      </p>
      <textarea
        className="w-full h-40 p-3 bg-gray-900/50 border border-white/20 rounded-lg focus:ring-2 focus:ring-purple-500 focus:outline-none transition-all"
        placeholder={'Exemplo:\nJoão Silva\t5511912345678\nMaria Santos;5521987654321'}
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button
        onClick={handleParse}
        className="mt-4 w-full bg-gradient-to-r from-green-500 to-teal-500 hover:from-green-600 hover:to-teal-600 text-white font-bold py-2 px-4 rounded-lg transition-transform transform hover:scale-105"
      >
        Processar Lista
      </button>

      {feedback && (
        <p className={`text-center mt-3 text-sm font-medium ${getFeedbackColor()}`}>
          {feedback.message}
        </p>
      )}

      {parsedContacts.length > 0 && (
        <div className="mt-4">
          <h3 className="font-semibold text-lg">{parsedContacts.length} contatos carregados:</h3>
          <ul className="mt-2 max-h-48 overflow-y-auto space-y-1 pr-2">
            {parsedContacts.map((contact, index) => (
              <li key={index} className="text-sm bg-black/20 p-2 rounded-md flex justify-between">
                <span>{contact.name}</span>
                <span className="text-gray-400">{contact.phone}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default ContactInput;
