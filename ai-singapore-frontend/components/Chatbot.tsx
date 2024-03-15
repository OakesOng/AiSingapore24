'use client';
import { useState, useEffect, ChangeEvent, FormEvent, useRef } from 'react';
import TypingAnimation from '@/components/TypingAnimation';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

export default function Chatbot() {
  const [inputValue, setInputValue] = useState('');
  const [chatlog, setChatlog] = useState<{ type: string; message: string }[]>(
    []
  );
  const [isLoading, setIsLoading] = useState(false);
  const messageEndRef = useRef<HTMLDivElement>(null);

  // form functions
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };
  
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setIsLoading(true);

    // Add user message to chatlog
    setChatlog((prevChatLog) => [
      ...prevChatLog,
      { type: 'user', message: inputValue },
    ]);

    const url = "http://127.0.0.1:5000"
    try {
      // Send POST request to backend
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: inputValue }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      // Parse JSON response
      const data = await response.json();
      console.log(data);

      setIsLoading(false);

      // Add backend response to chatlog
      setChatlog((prevChatLog) => [
        ...prevChatLog,
        { type: 'bot', message: data },
      ]);
    } catch (error) {
      console.error('Error fetching response from backend:', error);
    }

    setInputValue(''); // Clear input value
    setIsLoading(false); // Set loading state back to false
    

    // Scroll to the bottom of the chatlog
    if (messageEndRef.current !== null) {
      messageEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };


  useEffect(() => {
    if (messageEndRef.current === null) return;
    messageEndRef.current.scrollIntoView({ behavior: 'smooth' });
  }, [chatlog]);

  return (
    <div className='w-full'>
      <div className='flex h-[89.3vh] flex-col bg-gray-900'>
        <h1 className='bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text py-3 text-center text-4xl font-bold text-transparent'>
          Chatting with Old Bird...
        </h1>
        <div className='flex flex-grow flex-col overflow-y-auto p-6'>
          <ScrollArea>
            <div className='space-y-4'>
              {chatlog.map((message, index) => (
                <div
                  key={index}
                  className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  {message.type === 'user' && (
                    <>
                      <div className='flex items-center'>
                        <div className='max-w-sm rounded-lg bg-purple-500 px-4 pb-4 pt-2 text-white'>
                          <p className='mb-3 flex justify-start'>
                            <u>You{'\u00A0'}</u>
                          </p>
                          {message.message}
                        </div>
                        <Avatar className='ml-4 mr-2'>
                          <AvatarImage src='/user_profile.webp' />
                        </Avatar>
                      </div>
                    </>
                  )}
                </div>
              ))}
              {!isLoading && (
                <>
                  <div className='flex items-center'>
                    <Avatar className='ml-2 mr-4'>
                      <AvatarImage src='/oldbird.jpeg' />
                    </Avatar>
                    <div className='justify-start'>
                      <div className='rounded-lg bg-gray-800 p-4 text-white'>
                        <p className='mb-3 flex justify-start'>
                          <u>Old Bird{'\u00A0'}</u>
                        </p>
                        <TypingAnimation />
                      </div>
                    </div>
                  </div>
                </>
              )}
              <div ref={messageEndRef} />
            </div>
          </ScrollArea>
        </div>
        <form onSubmit={handleSubmit} className='flex-none p-6'>
          <div className='flex rounded-lg border border-gray-700 bg-gray-800'>
            <input
              type='text'
              placeholder='Ask me anything....'
              value={inputValue}
              onChange={handleInputChange}
              className='flex-grow bg-transparent px-4 py-2 text-white focus:outline-none'
            />
            <button
              type='submit'
              className='rounded-lg bg-purple-500 px-4 py-2 font-semibold text-white transition-colors duration-300 hover:bg-purple-600 focus:outline-none'
            >
              Send
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
