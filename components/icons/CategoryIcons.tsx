
import React from 'react';

const iconProps = {
  className: "w-12 h-12",
  strokeWidth: "1.5",
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
};

export const PortfolioIcon: React.FC = () => (
  <svg {...iconProps}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
    <rect x="3" y="4" width="18" height="16" rx="2" ry="2" />
  </svg>
);

export const BusinessIcon: React.FC = () => (
  <svg {...iconProps}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
  </svg>
);

export const BlogIcon: React.FC = () => (
  <svg {...iconProps}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 12h3M9 12h12M3 6h6M9 18h6" />
    <path d="M19 20.33A2.5 2.5 0 0116.5 22H6.5A2.5 2.5 0 014 19.5V4.5A2.5 2.5 0 016.5 2h7A2.5 2.5 0 0116 4.5V8" />
  </svg>
);

export const LandingPageIcon: React.FC = () => (
  <svg {...iconProps}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M12 5l7 7-7 7" />
    <path d="M19 3H5a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2V5a2 2 0 00-2-2z" />
  </svg>
);

export const EcommerceIcon: React.FC = () => (
  <svg {...iconProps}>
    <circle cx="9" cy="21" r="1" />
    <circle cx="20" cy="21" r="1" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M1 1h4l2.68 13.39a2 2 0 002 1.61h9.72a2 2 0 002-1.61L23 6H6" />
  </svg>
);

export const PersonalIcon: React.FC = () => (
  <svg {...iconProps}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
  </svg>
);
