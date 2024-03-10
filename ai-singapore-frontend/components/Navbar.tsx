import Image from 'next/image';
import Link from 'next/link';

export default function Navbar() {
  const content = (
    <nav className=' bg-white'>
      <div className='container mx-auto flex flex-row items-center justify-between'>
        <div>
          <Link href='/'>
            <Image
              src='/myskillsfuture-color.png'
              alt='app-logo'
              width='147'
              height='44'
              unoptimized={true}
            />
          </Link>
        </div>
        <div className='header-action-holder mx-auto flex flex-row'>
          <div className='basis-full items-center justify-end'>
            <button className='h-8 w-20 items-center border-2 border-indigo-500 font-sans font-bold text-indigo-500 hover:bg-indigo-500 hover:text-white'>
              Login
            </button>
          </div>
        </div>
      </div>
    </nav>
  );

  return content;
}
