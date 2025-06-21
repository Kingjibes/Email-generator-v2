import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Users, Radio, Lock, ExternalLink, CheckCircle2 } from 'lucide-react';

const WhatsappGate = ({ open, onContinue }) => {
  const [clickedLinks, setClickedLinks] = useState({
    group: false,
    channel1: false,
    channel2: false
  });
  const [isContinueEnabled, setIsContinueEnabled] = useState(false);

  useEffect(() => {
    const allClicked = Object.values(clickedLinks).every(Boolean);
    setIsContinueEnabled(allClicked);
  }, [clickedLinks]);

  const handleLinkClick = (id) => {
    setClickedLinks(prev => ({ ...prev, [id]: true }));
  };

  const links = [
    {
      id: 'group',
      label: 'Join WhatsApp Group',
      href: 'https://chat.whatsapp.com/F1DOAOxPSZkCXSYBcmrptO',
      icon: Users
    },
    {
      id: 'channel1',
      label: 'Follow Channel 1',
      href: 'https://whatsapp.com/channel/0029Vb3wqli8V0tfOrWXwk2K',
      icon: Radio
    },
    {
      id: 'channel2',
      label: 'Follow Channel 2',
      href: 'https://whatsapp.com/channel/0029VbAUgm5Fi8xfcJspqi3f',
      icon: Radio
    }
  ];

  return (
    <Dialog open={open} onOpenChange={() => {}}>
      <DialogContent className="sm:max-w-md subtle-glow border-primary/30" onPointerDownOutside={(e) => e.preventDefault()}>
        <DialogHeader>
          <DialogTitle className="text-2xl flex items-center text-primary font-bold">
            <Lock className="w-6 h-6 mr-2" />
            One More Step, Captain!
          </DialogTitle>
          <DialogDescription className="text-foreground/90 font-medium">
            To unlock the alias generator, please join our community channels. This helps us grow and provide more tools! Click each link to proceed.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
          {links.map((link) => {
            const Icon = link.icon;
            const isClicked = clickedLinks[link.id];
            return (
              <a
                key={link.id}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => handleLinkClick(link.id)}
                className={`flex items-center space-x-4 p-3 rounded-md border transition-all duration-300 ${isClicked ? 'border-green-500/50 bg-green-500/10' : 'border-border/50 bg-background/50 hover:border-primary/50'}`}
              >
                <Icon className={`w-8 h-8 flex-shrink-0 ${isClicked ? 'text-green-500' : 'text-accent'}`} />
                <div className="flex-grow">
                  <span
                    className={`font-semibold transition-colors flex items-center ${isClicked ? 'text-green-400' : 'text-foreground hover:text-primary'}`}
                  >
                    {link.label}
                    {!isClicked && <ExternalLink className="w-3 h-3 ml-1.5" />}
                  </span>
                </div>
                {isClicked && <CheckCircle2 className="w-6 h-6 text-green-500" />}
              </a>
            );
          })}
        </div>
        <DialogFooter>
          <motion.div
            className="w-full"
            initial={{ opacity: 0.5 }}
            animate={{ opacity: isContinueEnabled ? 1 : 0.5 }}
          >
            <Button
              type="button"
              onClick={onContinue}
              disabled={!isContinueEnabled}
              className="w-full h-11 text-base font-semibold bg-gradient-to-r from-primary to-accent text-primary-foreground hover:from-primary/90 hover:to-accent/90 shadow-lg transform hover:scale-105 transition-all duration-300 ease-out disabled:cursor-not-allowed disabled:opacity-50"
            >
              Unlock Generator
            </Button>
          </motion.div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default WhatsappGate;