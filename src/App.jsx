import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Header from '@/components/Header';
import EmailGenerator from '@/components/EmailGenerator';
import About from '@/components/About';
import Contact from '@/components/Contact';
import { Toaster } from '@/components/ui/toaster';

function App() {
  const [currentPage, setCurrentPage] = useState('generator');

  useEffect(() => {
  }, [currentPage]);

  const renderPage = () => {
    switch (currentPage) {
      case 'generator':
        return <EmailGenerator key="generator-page" />;
      case 'about':
        return <About key="about-page" />;
      case 'contact':
        return <Contact key="contact-page" />;
      default:
        return <EmailGenerator key="default-generator-page" />;
    }
  };

  const pageVariants = {
    initial: { opacity: 0, y: 20, scale: 0.98 },
    in: { opacity: 1, y: 0, scale: 1 },
    out: { opacity: 0, y: -20, scale: 0.98 }
  };

  const pageTransition = {
    type: "tween",
    ease: "anticipate",
    duration: 0.5
  };

  return (
    <div className="min-h-screen text-foreground flex flex-col overflow-x-hidden bg-background">
      <Header currentPage={currentPage} setCurrentPage={setCurrentPage} />
      
      <div className="flex-grow">
        <AnimatePresence mode="wait">
          <motion.main
            key={currentPage} 
            initial="initial"
            animate="in"
            exit="out"
            variants={pageVariants}
            transition={pageTransition}
            className="w-full"
          >
            {renderPage()}
          </motion.main>
        </AnimatePresence>
      </div>
      
      <motion.footer 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        className="border-t border-border/70 mt-auto bg-background/90 backdrop-blur-md"
      >
        <div className="page-container py-6 text-center text-sm text-muted-foreground">
          <p className="font-semibold">&copy; {new Date().getFullYear()} CipherMail by Hackerpro. All rights reserved.</p>
          <p className="font-semibold">Empowering your digital privacy, one <span className="text-primary font-bold">dark wave</span> at a time.</p>
        </div>
      </motion.footer>
      <Toaster />
    </div>
  );
}

export default App;