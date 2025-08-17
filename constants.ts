import { FC } from 'react';
import { PortfolioIcon, BusinessIcon, BlogIcon, LandingPageIcon, EcommerceIcon, PersonalIcon } from './components/icons/CategoryIcons';

export const WEBSITE_TYPES: { name: string; icon: FC }[] = [
  { name: 'Portfolio', icon: PortfolioIcon },
  { name: 'Business', icon: BusinessIcon },
  { name: 'Blog', icon: BlogIcon },
  { name: 'Landing Page', icon: LandingPageIcon },
  { name: 'E-commerce', icon: EcommerceIcon },
  { name: 'Personal', icon: PersonalIcon },
];

export const WEBSITE_STYLES: string[] = [
  'Modern', 'Minimalist', 'Colorful', 'Gradient', 'Futuristic', 'Corporate', 'Playful'
];

export const COLOR_PALETTES: { name: string; colors: string[] }[] = [
  { name: 'Oceanic Blue', colors: ['#0077b6', '#00b4d8', '#ade8f4'] },
  { name: 'Sunset Gradient', colors: ['#ff6b6b', '#feca57', '#ff9f43'] },
  { name: 'Forest Green', colors: ['#2d6a4f', '#40916c', '#95d5b2'] },
  { name: 'Royal Purple', colors: ['#5a189a', '#7b2cbf', '#c77dff'] },
  { name: 'Monochrome', colors: ['#212529', '#6c757d', '#dee2e6'] },
  { name: 'Vibrant Coral', colors: ['#ff7f50', '#ff6347', '#ff4500'] },
  { name: 'Deep Black', colors: ['#000000', '#212529', '#495057'] },
  { name: 'Vibrant Rainbow', colors: ['#ef4444', '#f97316', '#eab308', '#22c55e', '#3b82f6', '#8b5cf6'] },
];

export const FONT_OPTIONS: string[] = [
  'Roboto', 'Open Sans', 'Lato', 'Montserrat', 'Poppins', 'Nunito'
];