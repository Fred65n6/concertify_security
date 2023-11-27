// global.d.ts
import React from 'react';

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'your-custom-element': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
      // Add more declarations for other custom elements as needed
    }
  }
}
