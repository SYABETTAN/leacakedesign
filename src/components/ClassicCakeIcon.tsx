import React from 'react';

interface ClassicCakeIconProps {
  className?: string;
}

export const ClassicCakeIcon: React.FC<ClassicCakeIconProps> = ({ className = "" }) => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 500 500"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M100 200C100 150 400 150 400 200L400 400C400 450 100 450 100 400L100 200Z"
        stroke="currentColor"
        strokeWidth="30"
      />
      <path
        d="M150 200L150 400"
        stroke="currentColor"
        strokeWidth="20"
      />
      <path
        d="M250 200L250 400"
        stroke="currentColor"
        strokeWidth="20"
      />
      <path
        d="M350 200L350 400"
        stroke="currentColor"
        strokeWidth="20"
      />
      <path
        d="M200 50C200 25 300 25 300 50L300 100C300 125 200 125 200 100L200 50Z"
        stroke="currentColor"
        strokeWidth="20"
      />
      <path
        d="M250 100L250 150"
        stroke="currentColor"
        strokeWidth="20"
      />
    </svg>
  );
};