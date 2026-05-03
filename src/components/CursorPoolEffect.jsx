import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function CursorPoolEffect() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: e.clientX,
        y: e.clientY
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <motion.div
      className="pointer-events-none fixed inset-0 z-0 transition-opacity duration-300"
      animate={{
        background: `radial-gradient(800px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(187, 134, 252, 0.08), transparent 40%)`
      }}
    />
  );
}
