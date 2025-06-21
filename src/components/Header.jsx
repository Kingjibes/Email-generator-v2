import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Info, Zap, Anchor, Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Header = ({ currentPage, setCurrentPage }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { id: 'generator', label: 'Generator', icon: Zap, type: 'main' },
    { id: 'about', label: 'About CipherMail', icon: Info, type: 'menu' },
    { id: 'contact', label: 'Contact Hackerpro', icon: User, type: 'menu' }
  ];
  
  const mainNavItems = navItems.filter(item => item.type === 'main');
  const menuNavItems = navItems.filter(item => item.type === 'menu');

  return (
    <motion.header 
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.6, 0.01, -0.05, 0.95], delay: 0.2 }}
      className="sticky top-0 z-50 border-b border-border/70 bg-background/80 backdrop-blur-xl shadow-lg"
    >
      <div className="page-container py-3">
        <div className="flex items-center justify-between">
          {/* Logo and brand section - unchanged */}
          <motion.div 
            className="flex items-center space-x-3.5 cursor-pointer"
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300, damping: 15 }}
            onClick={() => setCurrentPage('generator')}
            aria-label="Go to CipherMail Generator"
          >
            <motion.div 
              className="relative p-1.5 bg-gradient-to-br from-primary to-accent rounded-full shadow-lg"
              animate={{ rotate: [0, 7, -7, 0], scale: [1, 1.05, 1] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
            >
              <Anchor className="w-7 h-7 text-primary-foreground" />
            </motion.div>
            <div>
              <span className="text-xl font-bold gradient-text">CipherMail</span>
              <div className="flex items-center space-x-1.5">
                <p className="text-xs text-muted-foreground tracking-wide">By Hackerpro</p>
                <img  
                  className="w-6 h-6 rounded-full object-cover border-2 border-accent/70 shadow-sm" 
                  alt="Hackerpro profile picture"
                 src="https://images.unsplash.com/photo-1666014214619-b0a572963b88" />
              </div>
            </div>
          </motion.div>

          <nav className="flex items-center space-x-1 md:space-x-2" aria-label="Main navigation">
            {mainNavItems.map((item) => {
              const Icon = item.icon;
              return (
                <motion.button
                  key={item.id}
                  onClick={() => setCurrentPage(item.id)}
                  className={`hidden sm:flex relative px-3 py-1.5 md:px-3.5 md:py-2 rounded-md font-medium text-xs sm:text-sm transition-colors duration-200 items-center space-x-1.5 md:space-x-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background ${
                    currentPage === item.id
                      ? 'bg-primary text-primary-foreground shadow-md animated-background-shine'
                      : 'text-foreground hover:bg-primary/10 hover:text-primary'
                  }`}
                  whileHover={{ y: -2, scale: 1.05, transition: { duration: 0.2 } }}
                  whileTap={{ scale: 0.95 }}
                  aria-current={currentPage === item.id ? "page" : undefined}
                  aria-label={`Go to ${item.label} page`}
                >
                  <Icon className="w-3.5 h-3.5 md:w-4 md:h-4" />
                  <span>{item.label}</span>
                  {currentPage === item.id && (
                    <motion.div
                      layoutId="activeTabIndicator"
                      className="absolute -bottom-0.5 md:-bottom-1 left-0 right-0 h-0.5 md:h-1 bg-accent rounded-full"
                      transition={{ type: "spring", stiffness: 400, damping: 25 }}
                    />
                  )}
                </motion.button>
              );
            })}

            {/* Fixed Dropdown Menu Section */}
            <div className="sm:hidden"> {/* Only show on small screens */}
              <DropdownMenu open={isMenuOpen} onOpenChange={setIsMenuOpen}>
                <DropdownMenuTrigger asChild>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="text-foreground hover:bg-primary/10 hover:text-primary focus-visible:ring-primary"
                  >
                    <Menu className="h-5 w-5" />
                    <span className="sr-only">Toggle menu</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent 
                  align="end" 
                  className="w-56 bg-popover border-border shadow-xl mt-2"
                  sideOffset={10}
                >
                  <DropdownMenuLabel className="font-semibold text-muted-foreground">Navigation</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  {/* Main nav items for mobile */}
                  {mainNavItems.map((item) => {
                    const Icon = item.icon;
                    return (
                      <DropdownMenuItem
                        key={`menu-${item.id}`}
                        onClick={() => {
                          setCurrentPage(item.id);
                          setIsMenuOpen(false);
                        }}
                        className={`flex items-center space-x-2 py-2 px-3 text-sm font-medium transition-colors ${
                          currentPage === item.id 
                            ? 'bg-primary/10 text-primary' 
                            : 'text-foreground hover:bg-accent hover:text-accent-foreground'
                        }`}
                        aria-current={currentPage === item.id ? "page" : undefined}
                      >
                        <Icon className={`w-4 h-4 ${
                          currentPage === item.id 
                            ? 'text-primary' 
                            : 'text-muted-foreground group-hover:text-accent-foreground'
                        }`} />
                        <span>{item.label}</span>
                      </DropdownMenuItem>
                    );
                  })}
                  
                  {mainNavItems.length > 0 && menuNavItems.length > 0 && <DropdownMenuSeparator />}

                  {/* Menu nav items */}
                  {menuNavItems.map((item) => {
                    const Icon = item.icon;
                    return (
                      <DropdownMenuItem 
                        key={item.id} 
                        onClick={() => {
                          setCurrentPage(item.id);
                          setIsMenuOpen(false);
                        }}
                        className={`flex items-center space-x-2 py-2 px-3 text-sm font-medium transition-colors ${
                          currentPage === item.id 
                            ? 'bg-primary/10 text-primary' 
                            : 'text-foreground hover:bg-accent hover:text-accent-foreground'
                        }`}
                        aria-current={currentPage === item.id ? "page" : undefined}
                      >
                        <Icon className={`w-4 h-4 ${
                          currentPage === item.id 
                            ? 'text-primary' 
                            : 'text-muted-foreground group-hover:text-accent-foreground'
                        }`} />
                        <span>{item.label}</span>
                      </DropdownMenuItem>
                    );
                  })}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </nav>
        </div>
      </div>
    </motion.header>
  );
};

export default Header;
