import type { SVGProps } from 'react';

export function SirahAndAdnLogo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M16 19h4" />
      <path d="M12 19h2" />
      <path d="M12 5a4 4 0 0 1 4 4v5h-4Z" />
      <path d="M16 14h2a2 2 0 0 1 2 2v1h-4v-3Z" />
      <path d="M4.156 8.44A2 2 0 0 0 6 8h3" />
      <path d="M7 8V5a2 2 0 0 1 2-2h1" />
      <circle cx="14" cy="9" r="2" />
      <circle cx="7" cy="15" r="2" />
    </svg>
  );
}
