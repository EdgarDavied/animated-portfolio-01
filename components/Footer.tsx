
import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="w-full py-8 text-center bg-neutral-900 border-t border-neutral-800">
      <p className="text-sm text-neutral-500">
        &copy; {new Date().getFullYear()} Animated Portfolio. Inspired by awesome designs.
      </p>
    </footer>
  );
};
