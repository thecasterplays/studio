import type { SVGProps } from 'react';

export function StitchFlowLogo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M4 8c1.5-1.5 4-1.5 5.5 0" />
      <path d="M9.5 16c1.5 1.5 4 1.5 5.5 0" />
      <path d="M4 16c1.5 1.5 4 1.5 5.5 0" />
      <path d="M9.5 8c1.5-1.5 4-1.5 5.5 0" />
      <path d="M14.5 3l-5 5" />
      <path d="M14.5 13l-5 5" />
    </svg>
  );
}
