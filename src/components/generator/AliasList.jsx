
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Download, Zap, ClipboardCopy, ClipboardCheck, ListChecks } from 'lucide-react';

const AliasList = ({
  generatedEmails,
  handleDownload,
  primaryEmail,
  copiedEmail,
  handleCopyToClipboard,
  numVariations,
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

  return (
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
  );
};

export default AliasList;
