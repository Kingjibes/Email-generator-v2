import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useToast } from '@/components/ui/use-toast';
import WhatsappGate from '@/components/generator/WhatsappGate';
import GeneratorControls from '@/components/generator/GeneratorControls';
import AliasList from '@/components/generator/AliasList';

const EmailGenerator = () => {
  const [primaryEmail, setPrimaryEmail] = useState('');
  const [numVariations, setNumVariations] = useState(300);
  const [generatedEmails, setGeneratedEmails] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [fileNameSuffix, setFileNameSuffix] = useState(2000);
  const [copiedEmail, setCopiedEmail] = useState(null);
  const { toast } = useToast();
  const downloadLinkRef = useRef(null);

  const [hasCompletedGate, setHasCompletedGate] = useState(false);
  const [isCheckingGate, setIsCheckingGate] = useState(true);

  useEffect(() => {
    const gateCompleted = localStorage.getItem('ciphermail_gate_completed');
    if (gateCompleted === 'true') {
      setHasCompletedGate(true);
    }
    setIsCheckingGate(false);
  }, []);

  const handleGateContinue = () => {
    localStorage.setItem('ciphermail_gate_completed', 'true');
    setHasCompletedGate(true);
    toast({
      title: "✅ Welcome Aboard!",
      description: "The alias generator is now unlocked. Enjoy!",
    });
  };

  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const generateEmailVariations = () => {
    if (!primaryEmail || !isValidEmail(primaryEmail)) {
      toast({
        title: "⚓ Invalid Email Anchor!",
        description: "Please enter a valid primary email address to chart your course.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    setGeneratedEmails([]);

    setTimeout(() => {
      const [localPart, domain] = primaryEmail.split('@');
      const variations = new Set();

      for (let i = 0; i < numVariations; i++) {
        let aliasSuffix = `alias${i + 1}`;
        const randomChars = Math.random().toString(36).substring(2, 7);
        
        const type = Math.floor(Math.random() * 4);

        switch(type) {
          case 0:
            aliasSuffix = `${Math.floor(Math.random() * 10000)}${i}`;
            break;
          case 1:
            const commonWords = ["service", "newsletter", "promo", "backup", "secure", "temp", "shop", "social"];
            aliasSuffix = `${commonWords[Math.floor(Math.random() * commonWords.length)]}${i}`;
            break;
          case 2:
            aliasSuffix = randomChars;
            break;
          case 3:
            const d = new Date();
            aliasSuffix = `${d.getFullYear()}${String(d.getMonth()+1).padStart(2,'0')}${String(d.getDate()).padStart(2,'0')}_${i}`;
            break;
        }
        
        variations.add(`${localPart}+${aliasSuffix}@${domain}`);
        if (variations.size >= numVariations) break;
      }
      
      if (domain.toLowerCase().includes('gmail.com') && localPart.length > 3 && localPart.length < 15) {
        for (let i = 1; i < Math.min(localPart.length, 5); i++) {
            if (variations.size >= numVariations) break;
            const newLocalPart = localPart.slice(0, i) + '.' + localPart.slice(i);
            if (!newLocalPart.includes("..") && !newLocalPart.startsWith(".") && !newLocalPart.endsWith(".")) {
                 variations.add(`${newLocalPart}@${domain}`);
            }
        }
      }

      setGeneratedEmails(Array.from(variations));
      setIsLoading(false);
      toast({
        title: "🚢 Fleet Assembled!",
        description: `${variations.size} email aliases are ready for deployment.`,
      });
    }, 700);
  };

  const handleDownload = () => {
    if (generatedEmails.length === 0) {
      toast({
        title: "🌊 Empty Cargo Hold!",
        description: "Generate some emails first before downloading your treasure map.",
        variant: "destructive",
      });
      return;
    }
    const textContent = generatedEmails.join('\n');
    const blob = new Blob([textContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = downloadLinkRef.current;
    link.href = url;
    link.download = `Cipherv${fileNameSuffix + 1}.txt`;
    link.click();
    URL.revokeObjectURL(url);
    setFileNameSuffix(prev => prev + 1);
    toast({
      title: "🗺️ Treasure Map Downloaded!",
      description: `Aliases saved to Cipherv${fileNameSuffix + 1}.txt`,
    });
  };

  const handleCopyToClipboard = (email) => {
    navigator.clipboard.writeText(email).then(() => {
      setCopiedEmail(email);
      setTimeout(() => setCopiedEmail(null), 2000);
      toast({
        title: "✨ Copied to Clipboard!",
        description: `${email} is ready to paste.`,
      });
    }).catch(err => {
      console.error('Failed to copy: ', err);
      toast({
        title: "⚠️ Copy Failed",
        description: "Could not copy to clipboard. Please try again or copy manually.",
        variant: "destructive",
      });
    });
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.95 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        delay: i * 0.1,
        type: 'spring',
        stiffness: 100,
        damping: 12,
      },
    }),
  };

  if (isCheckingGate) {
    return null;
  }

  if (!hasCompletedGate) {
    return <WhatsappGate open={true} onContinue={handleGateContinue} />;
  }

  return (
    <div className="page-container section-padding">
      <motion.div 
        className="text-center mb-10 md:mb-12"
        variants={cardVariants}
        initial="hidden"
        animate="visible"
        custom={0}
      >
        <h1 className="text-4xl md:text-5xl font-extrabold mb-3 gradient-text">
          CipherMail Alias Generator
        </h1>
        <p className="text-lg md:text-xl text-foreground max-w-3xl mx-auto font-medium">
          Instantly create hundreds of unique email aliases from your primary email. Enhance your online privacy and organization with ease. All messages to these aliases land in your main inbox!
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
        <GeneratorControls
          primaryEmail={primaryEmail}
          setPrimaryEmail={setPrimaryEmail}
          numVariations={numVariations}
          setNumVariations={setNumVariations}
          handleGenerate={generateEmailVariations}
          isLoading={isLoading}
          isDisabled={!hasCompletedGate}
        />
        <AliasList
          generatedEmails={generatedEmails}
          handleDownload={handleDownload}
          primaryEmail={primaryEmail}
          copiedEmail={copiedEmail}
          handleCopyToClipboard={handleCopyToClipboard}
          numVariations={numVariations}
        />
      </div>
      <a ref={downloadLinkRef} style={{ display: 'none' }} href="/" download>Hidden Download Link</a>
    </div>
  );
};

export default EmailGenerator;