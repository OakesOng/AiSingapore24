export default function TypingAnimation() {
  const text = '.....';
  const lettersAndSpaces = text.split(''); // Split the text into individual letters and spaces

  // Fixed duration for the bounce animation
  const bounceDuration = '1.1s';

  const content = (
    <div className='item-center flex'>
      <div>
        <p>Lemme think{'\u00A0'}</p>
      </div>
      <div className='flex'>
        {lettersAndSpaces.map((char, index) => (
          <span
            key={index}
            className={char === ' ' ? '' : 'animate-bounce'}
            style={{
              animationDuration: bounceDuration,
              animationDelay: `${Math.floor(index / 2) * 0.9 + (index % 2) * 0.2}s`, // Adjust the delay based on the index
            }}
          >
            {char === ' ' ? '\u00A0' : char}
          </span>
        ))}
      </div>
    </div>
  );
  return content;
}
