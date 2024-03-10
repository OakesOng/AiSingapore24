import Image from 'next/image';
import Chat from '@/components/chat';
import Navbar from '@/components/Navbar';

export default function Home() {
  const content = (
    <>
      <Navbar />
      <Chat />
    </>
  );
  return content;
}
