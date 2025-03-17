import React from 'react';

interface BentoIconProps {
  className?: string;
}

export const BentoIcon: React.FC<BentoIconProps> = ({ className = "" }) => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 400 400"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M50 100C50 77.9086 67.9086 60 90 60H310C332.091 60 350 77.9086 350 100V300C350 322.091 332.091 340 310 340H90C67.9086 340 50 322.091 50 300V100Z"
        stroke="currentColor"
        strokeWidth="30"
      />
      <path
        d="M50 160H350"
        stroke="currentColor"
        strokeWidth="30"
      />
    </svg>
  );
};