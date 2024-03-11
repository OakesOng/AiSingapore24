import Image from 'next/image';
import Chat from '@/components/chat';
import Navbar from '@/components/Navbar';

export default function Home() {
  const content = (
    <>
      <Navbar />
      <div>
        <div>
          <h1 className='text-center font-sans text-4xl font-bold'>
            Start your upskilling journey today
          </h1>
          <div>
            <form className='mt-8 flex flex-col items-center'>
              <div className='flex w-2/4'>
                <input
                  className='block flex-grow rounded-none border-2 border-r-0 border-gray-300 bg-slate-50 py-5 pl-6 font-sans text-lg text-slate-500 placeholder-slate-400 outline-none'
                  placeholder='Search for courses, initiatives, or articles'
                />
                <button className=' mr-4 flex w-28 items-center border-2 border-indigo-500 bg-indigo-500 py-5 font-sans font-bold text-white hover:bg-indigo-600 hover:text-white'>
                  <Image
                    src='/search.png'
                    alt='search-icon'
                    width='25'
                    height='25'
                    className='ml-3 mr-1'
                  />{' '}
                  Search
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
  return content;
}
