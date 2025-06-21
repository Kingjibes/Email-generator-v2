import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, MessageSquare as MessageSquareText, Send, User, Info, Briefcase, Twitter, Linkedin, Github, Zap, Compass } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/components/ui/use-toast';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const { toast } = useToast();

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const mailtoLink = `mailto:richvybs92@gmail.com?subject=${encodeURIComponent(formData.subject)}&body=${encodeURIComponent(`Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`)}`;
    
    try {
        window.location.href = mailtoLink;
        toast({
            title: "📨 Opening Email Client...",
            description: "Your message is ready to be sent. Please complete sending it through your email app.",
            duration: 7000,
        });
         setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (error) {
        toast({
            title: "⚠️ Oops, That Didn't Work!",
            description: "Could not automatically open your email client. Please copy the details or try again.",
            variant: "destructive",
            duration: 7000,
        });
        console.error("Failed to open mailto link:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const socialLinks = [
    { icon: Github, label: "GitHub", href: "https://github.com/Hackerpro", color: "text-gray-700 hover:text-primary" },
    { icon: Linkedin, label: "LinkedIn", href: "#linkedin-url", color: "text-blue-600 hover:text-primary" },
    { icon: Twitter, label: "Twitter", href: "#twitter-url", color: "text-sky-500 hover:text-primary" },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 25, scale: 0.98 },
    visible: { opacity: 1, y: 0, scale: 1, transition: { type: 'spring', stiffness: 90, damping: 14 } }
  };

  return (
    <div className="page-container section-padding">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-4xl mx-auto"
      >
        <motion.div variants={itemVariants} className="text-center mb-10 md:mb-12">
          <motion.h1 
            className="text-4xl md:text-5xl font-extrabold mb-4 gradient-text flex items-center justify-center"
            initial={{ opacity:0, y: -20 }} animate={{ opacity:1, y:0 }} transition={{delay:0.1, duration: 0.5}}
          >
            <Compass className="w-10 h-10 mr-3 text-accent" />
            Navigate to Hackerpro
          </motion.h1>
          <motion.p 
            className="text-lg text-foreground max-w-2xl mx-auto font-medium"
            initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{delay:0.2, duration: 0.5}}
          >
            Have questions, feedback, or a collaboration idea? Hackerpro is ready to chart a course with you. 
            Fill out the form or connect via social media.
          </motion.p>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-8 md:gap-10">
          <motion.div 
            variants={itemVariants}
            className="lg:col-span-3"
          >
            <Card className="subtle-glow border-primary/30 animated-background-shine">
              <CardHeader>
                <CardTitle className="text-xl flex items-center text-primary font-semibold">
                  <MessageSquareText className="w-5 h-5 mr-2" />
                  Send a Message in a Bottle
                </CardTitle>
                <CardDescription className="text-foreground/90 font-medium">
                  Your feedback and inquiries are treasures. Fill this form and hit "Launch Message" to open your email client.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid sm:grid-cols-2 gap-5">
                    <motion.div variants={itemVariants} className="space-y-1.5">
                      <label htmlFor="name" className="text-sm font-semibold text-foreground">Your Name</label>
                      <Input id="name" name="name" type="text" placeholder="e.g., Captain Jack Sparrow" value={formData.name} onChange={handleChange} required className="focus:border-accent focus:ring-accent font-medium"/>
                    </motion.div>
                    <motion.div variants={itemVariants} className="space-y-1.5">
                      <label htmlFor="email" className="text-sm font-semibold text-foreground">Email Address</label>
                      <Input id="email" name="email" type="email" placeholder="e.g., jack@blackpearl.com" value={formData.email} onChange={handleChange} required className="focus:border-accent focus:ring-accent font-medium"/>
                    </motion.div>
                  </div>
                  <motion.div variants={itemVariants} className="space-y-1.5">
                    <label htmlFor="subject" className="text-sm font-semibold text-foreground">Subject / Voyage Plan</label>
                    <Input id="subject" name="subject" type="text" placeholder="e.g., Treasure Map to CipherMail Ideas" value={formData.subject} onChange={handleChange} required className="focus:border-accent focus:ring-accent font-medium"/>
                  </motion.div>
                  <motion.div variants={itemVariants} className="space-y-1.5">
                    <label htmlFor="message" className="text-sm font-semibold text-foreground">Your Message / Log Entry</label>
                    <textarea
                      id="message"
                      name="message"
                      placeholder="Your detailed message, captain's log, or treasure coordinates..."
                      value={formData.message}
                      onChange={handleChange}
                      rows={5}
                      className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:border-accent disabled:cursor-not-allowed disabled:opacity-50 resize-none transition-all-fast font-medium"
                      required
                    />
                  </motion.div>
                  <motion.div variants={itemVariants}>
                  <Button type="submit" className="w-full sm:w-auto h-11 text-base font-semibold bg-gradient-to-r from-primary to-accent text-primary-foreground hover:from-primary/90 hover:to-accent/90 shadow-lg transform hover:scale-105 transition-all duration-300 ease-out">
                    <Send className="w-4 h-4 mr-2" />
                    Launch Message
                  </Button>
                  </motion.div>
                </form>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div 
            variants={itemVariants}
            className="lg:col-span-2 space-y-6 md:space-y-8"
          >
            <Card className="border-dashed border-accent/50 bg-muted/20">
              <CardContent className="p-6 text-center">
                <motion.div 
                  className="relative mb-4"
                  whileHover={{ scale: 1.1 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <img  
                    class="w-20 h-20 rounded-full border-2 border-accent object-cover mx-auto shadow-lg"
                    alt="Hackerpro profile"
                   src="https://images.unsplash.com/photo-1666014214619-b0a572963b88" />
                </motion.div>
                <h3 className="text-xl font-semibold text-primary mb-1">
                  Hackerpro
                </h3>
                <p className="text-sm text-foreground mb-4 font-medium">
                  Captain of CipherMail & Full-Stack Navigator
                </p>
                <div className="flex justify-center space-x-3">
                  {socialLinks.map((social) => {
                    const Icon = social.icon;
                    return (
                      <motion.a
                        key={social.label}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`p-2.5 rounded-md bg-background border border-border/70 hover:bg-accent/10 transition-colors ${social.color} hover:!text-accent`}
                        whileHover={{ scale: 1.15, y: -3, boxShadow: "0px 5px 10px hsla(var(--accent),0.3)" }}
                        whileTap={{ scale: 0.9 }}
                        onClick={(e) => {
                          if (social.href === "#linkedin-url" || social.href === "#twitter-url") {
                            e.preventDefault();
                            toast({
                              title: "🚧 Charting New Waters...",
                              description: `The ${social.label} link is a placeholder. Real coordinates coming soon! 🚀`,
                            });
                          }
                        }}
                        aria-label={social.label}
                      >
                        <Icon className="w-5 h-5" />
                      </motion.a>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            <Card className="border-secondary/50">
              <CardHeader>
                <CardTitle className="text-lg flex items-center text-primary font-semibold">
                  <Info className="w-5 h-5 mr-2" />
                  Captain's Log
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3.5 text-sm">
                <motion.div variants={itemVariants} className="flex items-start">
                  <Mail className="w-4 h-4 mr-2.5 mt-0.5 text-accent flex-shrink-0" />
                  <span className="text-foreground font-medium">
                    Signal: <a href="mailto:richvybs92@gmail.com" className="font-semibold hover:underline text-primary">richvybs92@gmail.com</a>
                  </span>
                </motion.div>
                <motion.div variants={itemVariants} className="flex items-start">
                  <Briefcase className="w-4 h-4 mr-2.5 mt-0.5 text-accent flex-shrink-0" />
                  <span className="text-foreground font-medium">
                    Voyages: Open for freelance expeditions & collaborations.
                  </span>
                </motion.div>
                 <motion.div variants={itemVariants} className="flex items-start">
                  <Zap className="w-4 h-4 mr-2.5 mt-0.5 text-accent flex-shrink-0" />
                  <span className="text-foreground font-medium">
                    Carrier Pigeon Speed: Typically within 1-2 tides.
                  </span>
                </motion.div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default Contact;
