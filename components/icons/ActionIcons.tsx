import React from 'react';

const iconProps: React.SVGProps<SVGSVGElement> = {
    className: "w-6 h-6",
    strokeWidth: "2",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeLinecap: "round",
    strokeLinejoin: "round",
};

interface IconProps {
    size?: number;
}

export const Clipboard: React.FC = () => (
  <svg {...iconProps} className="w-5 h-5">
    <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
    <rect x="8" y="2" width="8" height="4" rx="1" ry="1" />
  </svg>
);

export const Check: React.FC = () => (
    <svg {...iconProps} className="w-5 h-5 text-green-400">
      <polyline points="20 6 9 17 4 12" />
    </svg>
);

export const ArrowLeft: React.FC<IconProps> = ({ size = 24 }) => (
    <svg {...iconProps} className={`w-${size/4} h-${size/4}`}>
      <line x1="19" y1="12" x2="5" y2="12" />
      <polyline points="12 19 5 12 12 5" />
    </svg>
);


export const Wand: React.FC = () => (
  <svg {...iconProps} className="w-5 h-5">
    <path d="M15 4l6 6m-9 3l-6-6l9-9l6 6l-9 9z" />
    <path d="M21 15l-3-3" />
    <path d="M9 15l-3-3" />
    <path d="M3 21l3-3" />
  </svg>
);

export const Sparkles: React.FC = () => (
    <svg {...iconProps} className="w-5 h-5">
        <path d="M12 3L9.5 8.5L4 11l5.5 2.5L12 19l2.5-5.5L20 11l-5.5-2.5z" />
        <path d="M5 3l1.5 2.5L9 7l-2.5 1.5L5 11l-1.5-2.5L1 7l2.5-1.5z" />
        <path d="M19 13l-1.5 2.5L15 17l2.5 1.5L19 21l1.5-2.5L23 17l-2.5-1.5z" />
    </svg>
);

export const KeyIcon: React.FC = () => (
    <svg {...iconProps} className="w-8 h-8 text-cyan-400">
        <path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4" />
    </svg>
);