export default function TypingAnimation() {
  const content = (
    <div className='item-center flex space-x-2'>
      <div className='h-4 w-4 animate-pulse rounded-full bg-gradient-to-r from-gray-400 to-gray-600 '></div>
      <div className='h-4 w-4 animate-pulse rounded-full bg-gradient-to-r from-gray-400 to-gray-600 delay-75'></div>
      <div className='h-4 w-4 animate-pulse rounded-full bg-gradient-to-r from-gray-400 to-gray-600 delay-150'></div>
    </div>
  );
  return content;
}
