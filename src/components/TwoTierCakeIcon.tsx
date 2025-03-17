import React from 'react';

interface TwoTierCakeIconProps {
  className?: string;
}

export const TwoTierCakeIcon: React.FC<TwoTierCakeIconProps> = ({ className = "" }) => {
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
        d="M50 300C50 250 450 250 450 300L450 400C450 450 50 450 50 400L50 300Z"
        stroke="currentColor"
        strokeWidth="30"
      />
      <path
        d="M150 150C150 100 350 100 350 150L350 250C350 300 150 300 150 250L150 150Z"
        stroke="currentColor"
        strokeWidth="30"
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