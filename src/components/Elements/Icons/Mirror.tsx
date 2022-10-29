import React from 'react';

export function Mirror({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="24"
      height="26"
      viewBox="0 0 27 36"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      style={{ marginLeft: '4px', marginTop: '4px' }}>
      <mask
        id="mask0_144_4"
        maskUnits="userSpaceOnUse"
        x="0"
        y="0"
        width="144"
        height="185">
        <rect width="144" height="185" fill="url(#pattern0)" />
      </mask>
      <g mask="url(#mask0_144_4)">
        <rect x="-30" y="-23" width="216" height="239" fill="black" />
      </g>
      <defs>
        <pattern
          id="pattern0"
          patternContentUnits="objectBoundingBox"
          width="1"
          height="1">
          <use
            xlinkHref="#image0_144_4"
            transform="scale(0.00694444 0.00540541)"
          />
        </pattern>
        <image
          id="image0_144_4"
          width="27"
          height="30"
          xlinkHref="data:image/png;base64,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"
        />
      </defs>
    </svg>
  );
}
