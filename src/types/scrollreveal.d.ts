declare module 'scrollreveal' {
  type ScrollRevealOptions = {
    distance?: string;
    duration?: number;
    delay?: number;
    opacity?: number;
    origin?: 'top' | 'right' | 'bottom' | 'left';
    easing?: string;
    mobile?: boolean;
    reset?: boolean;
    cleanup?: boolean;
  };

  type RevealOptions = {
    interval?: number;
  };

  type ScrollRevealInstance = {
    reveal(target: string, options?: RevealOptions): ScrollRevealInstance;
    destroy(): void;
  };

  export default function ScrollReveal(options?: ScrollRevealOptions): ScrollRevealInstance;
}
