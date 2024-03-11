import Image from 'next/image';
import Chat from '@/components/chat';
import Navbar from '@/components/Navbar';

export default function Home() {
  const content = (
    <>
      <Navbar />
      <div className='flex flex-col items-center'>
        <h1 className='max-w-1/2 w-1/2 text-center font-sans text-4xl font-bold'>
          Start your upskilling journey today
        </h1>
        <div className='max-w-1/2 mt-8 flex w-1/2 flex-col items-center'>
          <div className='flex w-full'>
            <input
              className='block w-full flex-grow rounded-none border-2 border-r-0 border-gray-300 bg-slate-50 py-5 pl-6 font-sans text-lg text-slate-500 placeholder-slate-400 outline-none'
              placeholder='Search for courses, initiatives, or articles'
            />
            <button className='mr-4 flex w-1/6 items-center border-2 border-indigo-500 bg-indigo-500 py-5 font-sans font-bold text-white hover:bg-indigo-600 hover:text-white'>
              <Image
                src='/search.png'
                alt='search-icon'
                width='25'
                height='25'
                className='ml-3 mr-1'
              />
              Search
            </button>
          </div>
        </div>
        <div className='max-w-1/2 mt-8 flex w-1/2 justify-around'>
          {/*Image*/}
          <Image
            src='/icon-view-course.svg'
            alt='view-course'
            width='70'
            height='70'
          />
          <Image
            src='/icon-submit-skillsfuture-credits-claims.svg'
            alt='submit-skillsfuture-credits-claims'
            width='70'
            height='70'
          />
          <Image
            src='/icon-view-initiatives.svg'
            alt='view-initiatives'
            width='70'
            height='70'
          />
          <Image
            src='/icon-access-e-services.svg'
            alt='access-e-services'
            width='70'
            height='70'
          />
        </div>
      </div>
    </>
  );
  return content;
}
