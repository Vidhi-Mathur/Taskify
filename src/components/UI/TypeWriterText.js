import React, { useState, useEffect } from 'react';

//To display/ remove one character at a time, simulating typewriter effect
export const TypewriterText = ({ texts }) => {
  const [index, setIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [subIndex, setSubIndex] = useState(0);
  const [reverse, setReverse] = useState(false);

  useEffect(() => {
    //Typed entired text and not in reverse mode, wait for 1000ms (/1s), and delete characters by reversing
    if (subIndex === texts[index].length + 1 && !reverse) {
      setTimeout(() => setReverse(true), 1000);
      return;
    }

    //All characters deleted and currently in reverse mode, switch to move forward and type
    if (subIndex === 0 && reverse) {
      setReverse(false);
      setIndex((prev) => (prev + 1) % texts.length);
      return;
    }

    //Timeout for adding/ removal
    const timeout = setTimeout(() => {
      setSubIndex((prev) => prev + (reverse ? -1 : 1));
    }, 150);

    return () => clearTimeout(timeout);
  }, [subIndex, reverse, index, texts]);

  //Display text
  useEffect(() => {
    //Update with current substring
    setDisplayText(texts[index].substring(0, subIndex));
  }, [subIndex, index, texts]);

  return (
    <span className="font-medium text-blue-600">
      {displayText}
      <span className="animate-pulse">|</span>
    </span>
  );
};