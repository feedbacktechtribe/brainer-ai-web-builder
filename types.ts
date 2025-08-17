
export enum Step {
  TYPE,
  STYLE,
  BRANDING,
  DESCRIPTION_GENERATION,
  DESCRIPTION_CONFIRM,
  CODE_GENERATION,
  DONE
}

export interface WebsiteOptions {
  type: string;
  style: string;
  colors: string[];
  font: string;
  theme: 'light' | 'dark';
}
