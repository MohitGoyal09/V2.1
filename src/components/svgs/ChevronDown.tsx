import React from 'react';

export default function ChevronDown({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="currentColor"
      viewBox="0 0 256 256"
      className={className}
    >
      <path d="M213.66,101.66l-80,80a8,8,0,0,1-11.32,0l-80-80A8,8,0,0,1,42.34,90.34L128,176l85.66-85.66A8,8,0,0,1,213.66,101.66Z"></path>
    </svg>
  );
}
