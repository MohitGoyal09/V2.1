import React from 'react';

export default function PeerlistIcon() {
  const id = React.useId();
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 32 32"
      fill="none"
      className="w-full h-full"
    >
      <mask id={id}>
        <rect width="32" height="32" fill="white" />
        <path
          d="M17.42 11.23H13.68V20.77H10.5V8.5H17.42C20.65 8.5 22.26 10.02 22.26 13.06C22.26 16.03 20.67 17.62 17.5 17.62H13.68V15.22H17.42C18.84 15.22 19.55 14.5 19.55 13.06C19.55 11.84 18.84 11.23 17.42 11.23Z"
          fill="black"
        />
      </mask>
      <path
        d="M0 10C0 4.47715 4.47715 0 10 0H22C27.5228 0 32 4.47715 32 10V22C32 27.5228 27.5228 32 22 32H10C4.47715 32 0 27.5228 0 22V10Z"
        fill="currentColor"
        mask={`url(#${id})`}
      />
    </svg>
  );
}
