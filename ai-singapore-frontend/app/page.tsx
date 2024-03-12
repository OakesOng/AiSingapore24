import Image from 'next/image';
import Chat from '@/components/chat';
import Navbar from '@/components/Navbar';
import Link from 'next/link';

export default function Home() {
  const content = (
    <>
      <Navbar />
      <div className='flex overflow-hidden'>
        <div className='flex w-1/2 translate-y-32 flex-col items-center'>
          {/*Form part*/}
          <h1 className='w-full max-w-full text-center font-sans text-4xl font-bold'>
            Start your upskilling journey today
          </h1>
          <div className='max-w-11/12 mt-8 flex w-11/12 flex-col items-center'>
            <div className='flex w-full'>
              <input
                className='block w-full flex-grow rounded-none border-2 border-r-0 border-gray-300 bg-slate-50 py-5 pl-6 font-sans text-lg text-slate-500 placeholder-slate-400 outline-none'
                placeholder='Search for courses, initiatives, or articles'
              />
              <button className='mr-4 flex w-1/4 items-center border-2 border-indigo-500 bg-indigo-500 py-5 font-sans font-bold text-white hover:bg-indigo-600 hover:text-white'>
                <Image
                  src='/search.png'
                  alt='search-icon'
                  width='25'
                  height='25'
                  className='ml-5 mr-2'
                />
                Search
              </button>
            </div>
          </div>
          <div className='max-w-3/4 mt-8 flex w-3/4 justify-around'>
            {/*Image*/}
            <div className='text-center transition-all duration-500 hover:-translate-y-1'>
              <Link href='/' className='text-pretty text-center'>
                <div className='flex flex-col items-center hover:text-indigo-500'>
                  <Image
                    src='/icon-view-course.svg'
                    alt='view-course'
                    width='70'
                    height='70'
                  />
                  <div>View</div>
                  <div>Courses</div>
                </div>
              </Link>
            </div>
            <div className='text-center transition-all duration-500 hover:-translate-y-1'>
              <Link href='/' className='text-pretty'>
                <div className='flex flex-col items-center hover:text-indigo-500'>
                  <Image
                    src='/icon-submit-skillsfuture-credits-claims.svg'
                    alt='submit-skillsfuture-credits-claims'
                    width='70'
                    height='70'
                  />
                  <div>Submit</div>
                  <div>SkillsFuture</div>
                  <div>Credits Claims</div>
                </div>
              </Link>
            </div>
            <div className='text-center transition-all duration-500 hover:-translate-y-1'>
              <Link href='/' className='text-pretty'>
                <div className='flex flex-col items-center hover:text-indigo-500'>
                  <Image
                    src='/icon-view-initiatives.svg'
                    alt='view-initiatives'
                    width='70'
                    height='70'
                  />
                  <div>View</div>
                  <div>Initiatives</div>
                </div>
              </Link>
            </div>
            <div className='text-center transition-all duration-500 hover:-translate-y-1'>
              <Link href='/' className='text-pretty'>
                <div className='flex flex-col items-center hover:text-indigo-500'>
                  <Image
                    src='/icon-access-e-services.svg'
                    alt='access-e-services'
                    width='70'
                    height='70'
                    className='text-center'
                  />
                  <div>Access</div>
                  <div>E-Services</div>
                </div>
              </Link>
            </div>
            <div className='text-center transition-all duration-500 hover:-translate-y-1'>
              <Link href='/chat' className='text-pretty'>
                <div className='flex flex-col items-center hover:text-indigo-500'>
                  <Image
                    src='/oldbird-bw.jpg'
                    alt='chat-with-oldbird'
                    width='70'
                    height='70'
                  />
                  <div>Chat With</div>
                  <div>Old Bird</div>
                </div>
              </Link>
            </div>
          </div>
        </div>
        <div className='flex flex-col items-center'>
          <div className='flex w-1/2 translate-y-1 items-center justify-center'>
            {/*side image*/}
            <Image
              src='/side-image.png'
              alt='side-image'
              width={650}
              height={650}
            />
          </div>
          <div className='max-w-11/12 mt-16 overflow-hidden rounded shadow-xl'>
            <div className='px-8 py-4'>
              <div className='w-12 rounded-r-sm rounded-bl-sm bg-red-500 text-center text-sm text-white'>
                NEW
              </div>
              <br />
              <div className='text-xl font-bold'>
                SkillsFuture Level-Up Programme
              </div>
              <br />
              <div className='font-sans text-lg'>
                Expanded training support for Singaporean aged 40
              </div>
              <div className='text-lg '>and above</div>
              <br />
              <div className='text-lg text-blue-500 underline hover:no-underline'>
                <Link href='/'>Find out more</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
  return content;
}
