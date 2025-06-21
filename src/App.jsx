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
        return <EmailGenerator key="generator" />;
      case 'about':
        return <About key="about" />;
      case 'contact':
        return <Contact key="contact" />;
      default:
        return <EmailGenerator key="default-generator" />;
    }
  };

  return (
    <div className="min-h-screen text-foreground flex flex-col overflow-x-hidden bg-background">
      <Header currentPage={currentPage} setCurrentPage={setCurrentPage} />
      
      <main className="flex-grow w-full">
         {renderPage()}
      </main>
      
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
