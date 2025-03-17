import React from 'react';

interface SmallCakeIconProps {
  className?: string;
}

export const SmallCakeIcon: React.FC<SmallCakeIconProps> = ({ className = "" }) => {
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
        d="M100 250C100 200 400 200 400 250L400 400C400 450 100 450 100 400L100 250Z"
        stroke="currentColor"
        strokeWidth="30"
      />
      <path
        d="M200 100C200 75 300 75 300 100L300 150C300 175 200 175 200 150L200 100Z"
        stroke="currentColor"
        strokeWidth="20"
      />
      <path
        d="M250 150L250 200"
        stroke="currentColor"
        strokeWidth="20"
      />
      <path
        d="M150 250L150 400"
        stroke="currentColor"
        strokeWidth="20"
      />
      <path
        d="M250 250L250 400"
        stroke="currentColor"
        strokeWidth="20"
      />
      <path
        d="M350 250L350 400"
        stroke="currentColor"
        strokeWidth="20"
      />
      <path
        d="M100 300L400 300"
        stroke="currentColor"
        strokeWidth="20"
      />
      <path
        d="M100 350L400 350"
        stroke="currentColor"
        strokeWidth="20"
      />
    </svg>
  );
};