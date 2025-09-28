// src/components/common/AnimatedSection.jsx
import React from "react";
import { motion } from "framer-motion";

const AnimatedSection: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="py-12">
      {children}
    </motion.section>
  );
};

export default AnimatedSection;
