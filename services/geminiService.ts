import { GoogleGenAI } from "@google/genai";
import type { WebsiteOptions } from '../types';

const getAiClient = (): GoogleGenAI => {
  const apiKey = localStorage.getItem('gemini-api-key');
  if (!apiKey) {
    throw new Error("API Key not found. Please set your Google Gemini API key to use the app.");
  }
  return new GoogleGenAI({ apiKey });
}

export const generateVisualDescription = async (options: WebsiteOptions): Promise<string> => {
  const prompt = `
    You are a UX designer creating a wireframe description for an AI website builder.
    Based on the following user choices, generate a concise, visual-style description of a website layout in about 3-4 sentences.
    Describe the key sections (Hero, About, Services, etc.) and their general look and feel.
    Do not generate code. Be descriptive and inspiring.

    - Website Type: ${options.type}
    - Style: ${options.style}
    - Colors: ${options.colors.join(', ')}
    - Font Preference: ${options.font}
    - Theme: ${options.theme}

    Example Output:
    "The website will feature a modern, minimalist design with a clean layout. The hero section will have a full-width background image with the main headline and a call-to-action button. Below that, an 'About' section with a two-column layout for text and an image. The 'Services' section will use three cards with icons. A testimonial slider will build trust, followed by a simple contact form and a footer with social media links. The color scheme will be [colors] creating a [adjective] feel."
  `;

  try {
    const ai = getAiClient();
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });
    return response.text;
  } catch (error) {
    console.error("Error generating visual description:", error);
    if (error instanceof Error && (error.message.includes('API key not valid') || error.message.includes('invalid'))) {
        throw new Error("Your API Key is not valid. Please check it and try again.");
    }
    throw new Error("Failed to generate visual description. Please check your API key and network connection.");
  }
};

export const generateWebsiteCode = async (options: WebsiteOptions, description: string): Promise<string> => {
  const prompt = `
    You are Brainer AI Website Builder, an expert web developer AI. Your task is to generate a single, complete, copy-paste ready HTML file for a stunning, modern, and responsive website based on the user's specifications.

    **CRITICAL RULES:**
    1.  **Single File Output:** Generate ONLY a single HTML file. All CSS must be inside a \`<style>\` tag in the \`<head>\`. Do not output any other text or explanation.
    2.  **No External Libraries (except fonts):** Do not use any external CSS or JS libraries like Bootstrap or jQuery. You can use Google Fonts by providing a \`<link>\` in the \`<head>\`.
    3.  **Plain CSS:** You MUST write plain CSS. Do NOT use Tailwind CSS syntax. Use modern CSS features like Flexbox and Grid for layout.
    4.  **Responsiveness:** The website must be fully responsive and look great on mobile, tablet, and desktop screens. Use media queries.
    5.  **Placeholders:** Use meaningful placeholder text relevant to the website type and high-quality placeholder images from \`https://picsum.photos/width/height\`. Do NOT use "Lorem Ipsum".
    6.  **Clean, Semantic HTML5:** Use tags like \`<header>\`, \`<main>\`, \`<section>\`, \`<nav>\`, \`<footer>\`, etc.
    7.  **Accessibility & SEO:** Include \`alt\` text for all images, a proper \`<title>\` and \`<meta name="description">\` tag.
    8.  **Animations & Hovers:** Add subtle, smooth CSS transitions for hover effects on buttons and links to enhance user experience.
    9.  **Editing Instructions:** At the top of the generated HTML file, include HTML comments explaining where the user should edit text, links, and image URLs.
    10. **Font Integration:** If a font is specified, ensure you include the Google Fonts link in the HTML \`<head>\` and apply the font in the CSS body selector.

    **USER SPECIFICATIONS:**
    - Website Type: ${options.type}
    - Style: ${options.style}
    - Colors: ${options.colors.join(', ')} (Primary: ${options.colors[0]}, Secondary: ${options.colors[1]}, Accent: ${options.colors[2] || options.colors[1]})
    - Font: ${options.font}
    - Theme: ${options.theme}
    - Confirmed Layout Description: ${description}

    Now, generate the complete HTML file starting with \`<!DOCTYPE html>\`.
  `;
  try {
    const ai = getAiClient();
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        maxOutputTokens: 8000
      }
    });
    // Sometimes the model wraps the code in ```html ... ```, so we clean it.
    let code = response.text;
    if (code.startsWith('```html')) {
        code = code.substring(7);
    }
    if (code.endsWith('```')) {
        code = code.substring(0, code.length - 3);
    }
    return code.trim();
  } catch (error) {
    console.error("Error generating website code:", error);
    if (error instanceof Error && (error.message.includes('API key not valid') || error.message.includes('invalid'))) {
        throw new Error("Your API Key is not valid. Please check it and try again.");
    }
    throw new Error("Failed to generate website code. The model may have returned a blocked response or there was a network issue.");
  }
};