import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Zap, DownloadCloud, MailOpen, LockKeyhole, Globe2, Users, Info, Waves, Anchor } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const About = () => {
  const features = [
    {
      icon: MailOpen,
      title: "Vast Alias Fleet",
      description: "Generate a large fleet of 50 to 1000+ unique email aliases from your single primary email address, like ships sailing from a home port."
    },
    {
      icon: ShieldCheck,
      title: "Watertight Privacy",
      description: "All alias generation happens locally in your browser. Your primary email and generated aliases never leave your device, ensuring complete privacy."
    },
    {
      icon: DownloadCloud,
      title: "Treasure Chest Export",
      description: "Conveniently download your list of generated aliases as a TXT file. Filenames auto-increment (e.g., Cipherv2001) like logs in a captain's journal."
    },
    {
      icon: LockKeyhole,
      title: "Stealth Mode Operation",
      description: "No registration or login needed. Use CipherMail anonymously, like a ship sailing under the radar, with full privacy."
    },
    {
      icon: Zap,
      title: "Swift Currents",
      description: "Experience near-instantaneous creation of hundreds of email aliases, thanks to an optimized and efficient generation engine."
    },
    {
      icon: Globe2,
      title: "Global Waters Compatibility",
      description: "Works seamlessly with all major email providers and custom domains, navigating all modern web browsers with ease."
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    visible: { opacity: 1, y: 0, scale: 1, transition: { type: 'spring', stiffness: 80, damping: 12 } }
  };

  return (
    <div className="page-container section-padding">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-5xl mx-auto"
      >
        <motion.div variants={itemVariants} className="text-center mb-12 md:mb-16">
          <motion.h1 
            className="text-4xl md:text-5xl font-extrabold mb-4 gradient-text flex items-center justify-center"
            initial={{ opacity:0, y: -20 }} animate={{ opacity:1, y:0 }} transition={{delay:0.1, duration: 0.5}}
          >
           <Anchor className="w-10 h-10 mr-3 text-primary" /> About CipherMail
          </motion.h1>
          <motion.p 
            className="text-lg text-foreground max-w-3xl mx-auto font-medium"
            initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{delay:0.2, duration: 0.5}}
          >
            CipherMail is your first mate for navigating the digital seas, a powerful, privacy-first tool designed to effortlessly generate a multitude of unique email aliases. It's perfect for keeping your online identity safe, managing multiple service sign-ups, or organizing your digital communications like a seasoned captain.
          </motion.p>
        </motion.div>

        <motion.div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-12 md:mb-16">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ y: -5, boxShadow: "0px 10px 20px hsla(var(--primary), 0.2)" }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Card className="h-full border-primary/20 hover:border-primary/50 transition-all duration-300 animated-background-shine">
                  <CardHeader className="items-center text-center">
                    <motion.div 
                      className="p-3.5 bg-gradient-to-br from-primary to-accent rounded-full mb-4 shadow-lg"
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ type: "spring", stiffness: 200 }}
                    >
                      <Icon className="w-7 h-7 text-primary-foreground" />
                    </motion.div>
                    <CardTitle className="text-xl text-primary font-semibold">
                      {feature.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-center text-foreground/90 font-medium">
                      {feature.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </motion.div>
        
        <motion.div variants={itemVariants}>
          <Card className="subtle-glow border-secondary/30">
            <CardHeader className="text-center">
              <CardTitle className="text-3xl font-extrabold gradient-text">
                How It Works: Smooth Sailing
              </CardTitle>
              <CardDescription className="text-md text-foreground/90 font-medium">
                A simple, secure, three-step voyage to your email aliases.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-6 md:gap-8 pt-4">
                {[
                  { num: 1, title: "Set Anchor", desc: "Input your main email address (e.g., captain@sea.com). This is your home port." },
                  { num: 2, title: "Choose Your Fleet", desc: "Use the slider to decide how many unique email aliases you need for your voyages." },
                  { num: 3, title: "Launch & Log", desc: "Click 'Generate', and instantly download your list of new email addresses in your captain's log (.txt file)." }
                ].map((step, index) => (
                  <motion.div 
                    key={index} 
                    className="text-center p-5 bg-background/70 rounded-lg border border-border/50 hover:shadow-xl hover:border-accent transition-all duration-300"
                    variants={itemVariants}
                    whileHover={{ y: -5 }}
                  >
                    <motion.div 
                      className="w-12 h-12 bg-gradient-to-br from-primary to-accent text-primary-foreground rounded-full flex items-center justify-center mx-auto mb-4 font-bold text-xl shadow-md"
                      animate={{ scale: [1, 1.1, 1]}}
                      transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut", delay: index * 0.2}}
                    >
                      {step.num}
                    </motion.div>
                    <h3 className="text-lg font-semibold text-primary mb-1.5">
                      {step.title}
                    </h3>
                    <p className="text-sm text-foreground font-medium">
                      {step.desc}
                    </p>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div 
          variants={itemVariants} 
          className="mt-12 md:mt-16"
        >
          <Card className="bg-muted/30 border-dashed border-primary/40">
            <CardContent className="p-6 md:p-8">
              <div className="flex flex-col md:flex-row items-center text-center md:text-left">
                <motion.div 
                  className="relative mb-4 md:mb-0 md:mr-6"
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                 <img 
                    class="w-16 h-16 md:w-20 md:h-20 rounded-full border-2 border-accent object-cover shadow-lg"
                    alt="Hackerpro, creator of CipherMail" src="https://images.unsplash.com/photo-1666014214619-b0a572963b88" />
                </motion.div>
                <div>
                  <h3 className="text-xl font-semibold text-primary mb-1">
                    Crafted by Hackerpro
                  </h3>
                  <p className="text-foreground/90 leading-relaxed font-medium">
                    CipherMail was developed with a deep commitment to user privacy, simplicity, and robust functionality, like a well-built ship. My goal is to provide tools that empower users while respecting their data. Feel free to send a message in a bottle (or use the contact form!) with feedback or suggestions!
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

      </motion.div>
    </div>
  );
};

export default About;
