
import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Download, Zap, ClipboardCopy, ClipboardCheck, ListChecks, HelpCircle, CornerDownRight } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

const EmailGenerator = () => {
  const [primaryEmail, setPrimaryEmail] = useState('');
  const [numVariations, setNumVariations] = useState(300);
  const [generatedEmails, setGeneratedEmails] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [fileNameSuffix, setFileNameSuffix] = useState(2000);
  const [copiedEmail, setCopiedEmail] = useState(null);
  const { toast } = useToast();
  const downloadLinkRef = useRef(null);

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
          case 0: // Numbered alias
            aliasSuffix = `${Math.floor(Math.random() * 10000)}${i}`;
            break;
          case 1: // Word-based alias
            const commonWords = ["service", "newsletter", "promo", "backup", "secure", "temp", "shop", "social"];
            aliasSuffix = `${commonWords[Math.floor(Math.random() * commonWords.length)]}${i}`;
            break;
          case 2: // Random char alias
            aliasSuffix = randomChars;
            break;
          case 3: // Date-based alias
            const d = new Date();
            aliasSuffix = `${d.getFullYear()}${String(d.getMonth()+1).padStart(2,'0')}${String(d.getDate()).padStart(2,'0')}_${i}`;
            break;
        }
        
        variations.add(`${localPart}+${aliasSuffix}@${domain}`);

        if (variations.size >= numVariations) break;
      }
      
      // Gmail specific: dot variations (use sparingly as they are less universally supported for aliasing than '+')
      if (domain.toLowerCase().includes('gmail.com') && localPart.length > 3 && localPart.length < 15) {
        for (let i = 1; i < Math.min(localPart.length, 5); i++) { // Limit dot variations
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

  const listItemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: (i) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: i * 0.03,
        type: 'spring',
        stiffness: 120,
        damping: 15
      }
    })
  };
  
  const howToUseSteps = [
    { icon: CornerDownRight, title: "Anchor Your Email", description: "Enter your main email address (e.g., captain@sea.com). This is your base." },
    { icon: ListChecks, title: "Set Fleet Size", description: "Use the slider to choose how many unique email aliases (50 to 1000+) you need." },
    { icon: Zap, title: "Launch Fleet", description: "Click 'Generate Aliases'. Your new email aliases will appear instantly below." },
    { icon: Download, title: "Log Your Treasure", description: "Download your list of generated aliases as a .txt file for your records." }
  ];


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
        <motion.div 
          className="lg:col-span-1 space-y-6"
          variants={cardVariants}
          initial="hidden"
          animate="visible"
          custom={1}
        >
          <Card className="subtle-glow animated-background-shine border-primary/30">
            <CardHeader>
              <CardTitle className="text-xl flex items-center text-primary font-semibold">
                <Zap className="w-5 h-5 mr-2" />
                Set Your Coordinates
              </CardTitle>
              <CardDescription className="text-foreground/90 font-medium">
                Enter your primary email and choose how many aliases to chart.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-5">
              <div>
                <label htmlFor="primaryEmail" className="block text-sm font-semibold mb-1.5 text-foreground">
                  Your Primary Email Address
                </label>
                <Input
                  id="primaryEmail"
                  type="email"
                  placeholder="e.g., captain@deepsea.com"
                  value={primaryEmail}
                  onChange={(e) => setPrimaryEmail(e.target.value)}
                  className="h-11 text-base focus:border-accent focus:ring-accent font-medium"
                  aria-label="Primary Email Address"
                />
              </div>
              <div>
                <label htmlFor="numVariations" className="block text-sm font-semibold mb-2 text-foreground">
                  Number of Aliases: <span className="text-primary font-bold">{numVariations}</span>
                </label>
                <Slider
                  id="numVariations"
                  min={50}
                  max={1000}
                  step={50}
                  value={[numVariations]}
                  onValueChange={(value) => setNumVariations(value[0])}
                  className="[&>span:first-child]:h-2 [&>span:first-child]:bg-primary/30 [&_[role=slider]]:bg-accent [&_[role=slider]]:w-5 [&_[role=slider]]:h-5 [&_[role=slider]]:border-2 [&_[role=slider]]:border-accent-foreground/50 [&_[role=slider]]:shadow-lg"
                  aria-label={`Number of email aliases to generate: ${numVariations}`}
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button 
                onClick={generateEmailVariations} 
                disabled={isLoading} 
                className="w-full h-11 text-base font-semibold bg-gradient-to-r from-primary to-accent text-primary-foreground hover:from-primary/90 hover:to-accent/90 shadow-lg transform hover:scale-105 transition-all duration-300 ease-out"
              >
                {isLoading ? (
                  <>
                    <motion.div 
                      animate={{ rotate: 360 }} 
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      className="w-4 h-4 mr-2 border-2 border-primary-foreground border-t-transparent rounded-full"
                    />
                    Charting Aliases...
                  </>
                ) : (
                  <>
                    <Zap className="w-4 h-4 mr-2" />
                    Generate Aliases
                  </>
                )}
              </Button>
            </CardFooter>
          </Card>

        <motion.div
          variants={cardVariants}
          initial="hidden"
          animate="visible"
          custom={1.5} 
        >
          <Card className="border-secondary/30 subtle-glow">
            <CardHeader>
              <CardTitle className="text-xl flex items-center text-secondary font-semibold">
                <HelpCircle className="w-5 h-5 mr-2" />
                How to Use CipherMail
              </CardTitle>
              <CardDescription className="text-foreground/90 font-medium">
                Follow these simple steps to navigate your alias generation.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {howToUseSteps.map((step, index) => {
                const Icon = step.icon;
                return (
                  <motion.div 
                    key={index} 
                    className="flex items-start space-x-3 p-3 bg-background/50 rounded-md border border-border/50"
                    variants={listItemVariants}
                    custom={index}
                    initial="hidden"
                    animate="visible"
                  >
                    <Icon className="w-6 h-6 text-accent flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-foreground">{step.title}</h4>
                      <p className="text-sm text-muted-foreground">{step.description}</p>
                    </div>
                  </motion.div>
                );
              })}
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>


        <motion.div 
          className="lg:col-span-2"
          variants={cardVariants}
          initial="hidden"
          animate="visible"
          custom={2}
        >
          <Card className="h-full flex flex-col border-accent/30 subtle-glow">
            <CardHeader>
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                <div>
                  <CardTitle className="text-xl flex items-center text-accent font-semibold">
                    <ListChecks className="w-5 h-5 mr-2" />
                    Your Generated Alias Fleet
                  </CardTitle>
                  <CardDescription className="text-foreground/90 font-medium">
                    Here are your freshly charted aliases. All messages sent to these will arrive in your primary inbox ({primaryEmail || 'your-email@example.com'}).
                  </CardDescription>
                </div>
                <Button 
                  onClick={handleDownload} 
                  disabled={generatedEmails.length === 0}
                  variant="outline"
                  className="h-10 text-sm border-accent text-accent hover:bg-accent/10 hover:text-accent font-semibold whitespace-nowrap"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Download List
                </Button>
              </div>
            </CardHeader>
            <CardContent className="flex-grow overflow-hidden">
              <AnimatePresence>
                {generatedEmails.length > 0 ? (
                  <motion.div 
                    className="h-[400px] lg:h-[520px] overflow-y-auto space-y-2 pr-2 border border-border/50 p-3 rounded-md bg-background/30"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    {generatedEmails.map((email, index) => (
                      <motion.div
                        key={email}
                        variants={listItemVariants}
                        custom={index}
                        initial="hidden"
                        animate="visible"
                        className="flex items-center justify-between p-2.5 rounded-md bg-card hover:bg-muted/50 transition-colors duration-150 shadow-sm border border-border"
                      >
                        <span className="text-sm font-mono text-primary truncate" title={email}>
                          {email}
                        </span>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleCopyToClipboard(email)}
                          className="w-8 h-8 text-muted-foreground hover:text-accent hover:bg-accent/10"
                          aria-label={`Copy ${email} to clipboard`}
                        >
                          {copiedEmail === email ? (
                            <ClipboardCheck className="w-4 h-4 text-green-500" />
                          ) : (
                            <ClipboardCopy className="w-4 h-4" />
                          )}
                        </Button>
                      </motion.div>
                    ))}
                  </motion.div>
                ) : (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="h-full flex flex-col items-center justify-center text-center p-6 border-2 border-dashed border-border/70 rounded-lg bg-background/20"
                  >
                    <Zap className="w-16 h-16 text-muted-foreground/50 mb-4" />
                    <p className="text-lg font-semibold text-foreground">
                      Your alias fleet is docked.
                    </p>
                    <p className="text-muted-foreground">
                      Generate some aliases to see them appear here.
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </CardContent>
            {generatedEmails.length > 0 && (
                 <CardFooter className="pt-4">
                    <p className="text-xs text-muted-foreground text-center w-full">
                        Displaying {generatedEmails.length} of {numVariations} requested aliases. Slight variations due to ensuring uniqueness.
                    </p>
                </CardFooter>
            )}
          </Card>
        </motion.div>
      </div>
      <a ref={downloadLinkRef} style={{ display: 'none' }} href="/" download>Hidden Download Link</a>
    </div>
  );
};

export default EmailGenerator;
