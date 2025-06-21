
import React from 'react';
import { motion } from 'framer-motion';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Download, Zap, ListChecks, HelpCircle, CornerDownRight } from 'lucide-react';

const GeneratorControls = ({
  primaryEmail,
  setPrimaryEmail,
  numVariations,
  setNumVariations,
  handleGenerate,
  isLoading,
  isDisabled,
}) => {
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
              disabled={isDisabled || isLoading}
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
              disabled={isDisabled || isLoading}
            />
          </div>
        </CardContent>
        <CardFooter>
          <Button
            onClick={handleGenerate}
            disabled={isDisabled || isLoading}
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
  );
};

export default GeneratorControls;
