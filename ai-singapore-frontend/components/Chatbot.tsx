'use client';
// Import React hooks and components
import { useState, useEffect, ChangeEvent, FormEvent, useRef } from 'react';
import TypingAnimation from '@/components/TypingAnimation';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

// Define and export the Chatbot component
export default function Chatbot() {
  // State variables for input value, chatlog, and loading status
  const [inputValue, setInputValue] = useState('');
  const [chatlog, setChatlog] = useState<{ type: string; message: string }[]>(
    []
  );
  const [isLoading, setIsLoading] = useState(false);

  // Reference for scrolling to the end of chatlog
  const messageEndRef = useRef<HTMLDivElement>(null);

  // Function to process courses text
  function processCoursesText(text: string) {
    // Define a regular expression to match URLs
    const urlRegex = /\[(.*?)\]\((https?:\/\/[^\s]+?)\)/g;

    // Replace URLs in the text with clickable links and apply styling
    text = text.replace(
      urlRegex,
      '<a href="$2" target="_blank" style="text-decoration: underline; color: teal;" onmouseover="this.style.color=\'red\'" onmouseout="this.style.color=\'teal\'">$1</a>'
    );

    // Split the text into individual courses
    const courses = text.split(/\*\*/).filter((course) => course.trim() !== '');

    // Format each course with line breaks
    const formattedCourses = courses.map((course) => {
      return `<p>${course.trim().replace(/\n/g, '<br>')}</p>`;
    });

    // Join the formatted courses into a single string
    return formattedCourses.join('');
  }

  // Event handler for input change
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  // Event handler for form submission
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Set loading state
    setIsLoading(true);

    // Add user message to chatlog
    setChatlog((prevChatLog) => [
      ...prevChatLog,
      { type: 'user', message: inputValue },
    ]);

    // Clear input value
    setInputValue('');

    // Backend API URL
    const url = 'http://127.0.0.1:5000';
    try {
      // Send POST request to backend
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: inputValue }),
      });

      // Throw error if response is not OK
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      // Parse response data
      var data = await response.json();

      // Process response data
      data = processCoursesText(data);

      // Add backend response to chatlog
      setChatlog((prevChatLog) => [
        ...prevChatLog,
        { type: 'bot', message: data },
      ]);
    } catch (error) {
      console.error('Error fetching response from backend:', error);
    } finally {
      // Set loading state back to false
      setIsLoading(false);
    }
  };

  // Effect to scroll to the end of chatlog whenever it changes
  useEffect(() => {
    if (messageEndRef.current !== null) {
      messageEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [chatlog]);

  // JSX rendering
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
                  {message.type === 'user' ? (
                    <>
                      <div className='flex items-center'>
                        <div className='rounded-lg bg-purple-500 px-4 pb-4 pt-2 text-white'>
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
                  ) : (
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
                            <div
                              dangerouslySetInnerHTML={{
                                __html: message.message,
                              }}
                            />
                          </div>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              ))}
              {isLoading && (
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
