import type { SVGProps } from 'react';

export function SirahAndAdnLogo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 100 100"
      width="24"
      height="24"
      fill="currentColor"
      {...props}
    >
      <text
        x="50%"
        y="52%"
        dominantBaseline="middle"
        textAnchor="middle"
        fontSize="60"
        fontWeight="bold"
        fontFamily="sans-serif"
        xmlSpace="preserve"
      >
        {'  S&A  '}
      </text>
    </svg>
  );
}
