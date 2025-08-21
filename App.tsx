
import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Contact, SendingStatus } from './types';
import Header from './components/Header';
import ContactInput from './components/ContactInput';
import MessageEditor from './components/MessageEditor';
import Settings from './components/Settings';
import ControlPanel from './components/ControlPanel';
import StatusModal from './components/StatusModal';
import AIGeneratorModal from './components/AIGeneratorModal';
import { BotMessageSquare, Users, Settings as SettingsIcon } from './components/icons';

const App: React.FC = () => {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [message, setMessage] = useState<string>('Olá {{nome}}, tudo bem? Esta é uma mensagem de teste.');
  const [interval, setInterval] = useState<number>(10);
  const [senderPhone, setSenderPhone] = useState<string>('');
  
  const [sendingStatus, setSendingStatus] = useState<SendingStatus>(SendingStatus.IDLE);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isStatusModalOpen, setIsStatusModalOpen] = useState<boolean>(false);
  const [isAiModalOpen, setIsAiModalOpen] = useState<boolean>(false);
  
  const timerRef = useRef<number | null>(null);

  const handleSend = useCallback(() => {
    if (currentIndex >= contacts.length) {
      setSendingStatus(SendingStatus.FINISHED);
      setIsStatusModalOpen(true);
      if (timerRef.current) clearTimeout(timerRef.current);
      return;
    }

    const contact = contacts[currentIndex];
    const personalizedMessage = message.replace(/{{nome}}/g, contact.name);
    const encodedMessage = encodeURIComponent(personalizedMessage);
    const phone = contact.phone.replace(/\D/g, '');
    const url = `https://wa.me/${phone}?text=${encodedMessage}`;

    window.open(url, '_blank');

    timerRef.current = window.setTimeout(() => {
      setCurrentIndex(prev => prev + 1);
    }, interval * 1000);

  }, [contacts, currentIndex, message, interval]);

  useEffect(() => {
    if (sendingStatus === SendingStatus.SENDING) {
      handleSend();
    }
    
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sendingStatus, currentIndex]);

  const startSending = () => {
    if (contacts.length === 0) {
      alert('Por favor, adicione contatos antes de iniciar.');
      return;
    }
    setCurrentIndex(0);
    setSendingStatus(SendingStatus.SENDING);
    setIsStatusModalOpen(true);
  };

  const pauseSending = () => {
    setSendingStatus(SendingStatus.PAUSED);
    if (timerRef.current) clearTimeout(timerRef.current);
  };

  const resumeSending = () => {
    setSendingStatus(SendingStatus.SENDING);
  };

  const stopSending = () => {
    setSendingStatus(SendingStatus.IDLE);
    setCurrentIndex(0);
    if (timerRef.current) clearTimeout(timerRef.current);
    setIsStatusModalOpen(false);
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-gray-900 via-purple-900 to-slate-900 animate-gradient-xy text-white p-4 sm:p-8 font-sans">
      <div className="max-w-7xl mx-auto">
        <Header />
        <main className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-4 sm:p-6 border border-white/20 shadow-lg">
              <h2 className="text-2xl font-bold mb-4 flex items-center text-purple-300">
                <BotMessageSquare className="w-7 h-7 mr-3" />
                Editor de Mensagem
              </h2>
              <MessageEditor 
                message={message} 
                setMessage={setMessage}
                openAiModal={() => setIsAiModalOpen(true)}
              />
            </div>
            
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-4 sm:p-6 border border-white/20 shadow-lg">
               <h2 className="text-2xl font-bold mb-4 flex items-center text-green-300">
                <Users className="w-7 h-7 mr-3" />
                Contatos
              </h2>
              <ContactInput setContacts={setContacts} />
            </div>
          </div>

          <div className="lg:col-span-1 space-y-8">
             <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-4 sm:p-6 border border-white/20 shadow-lg">
              <h2 className="text-2xl font-bold mb-4 flex items-center text-sky-300">
                <SettingsIcon className="w-7 h-7 mr-3" />
                Configurações
              </h2>
              <Settings 
                interval={interval}
                setInterval={setInterval}
                senderPhone={senderPhone}
                setSenderPhone={setSenderPhone}
              />
            </div>
            <ControlPanel 
              status={sendingStatus}
              onStart={startSending}
              onPause={pauseSending}
              onResume={resumeSending}
              onStop={stopSending}
              contactsCount={contacts.length}
              currentIndex={currentIndex}
            />
          </div>
        </main>
      </div>
      {isStatusModalOpen && (
        <StatusModal 
          status={sendingStatus}
          contactsCount={contacts.length}
          currentIndex={currentIndex}
          onStop={stopSending}
          onResume={resumeSending}
          onPause={pauseSending}
        />
      )}
      {isAiModalOpen && (
        <AIGeneratorModal 
          onClose={() => setIsAiModalOpen(false)}
          onGenerate={setMessage}
        />
      )}
    </div>
  );
};

export default App;