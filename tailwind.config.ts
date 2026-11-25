import type { Config } from 'tailwindcss';
const config: Config = { content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'], theme: { extend: { colors: { forest: '#174C3C', leaf: '#438665', sage: '#E8F1E9', sand: '#F8F6F0', ink: '#292F2D', muted: '#5D6662' }, fontFamily: { sans: ['var(--font-nunito)', 'sans-serif'] } } }, plugins: [] };
export default config;
