import React, { Suspense, lazy, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Github, Instagram, Linkedin, Mail, Twitter } from "lucide-react";

// Lazy load components
const ModernSetup3D = lazy(() => import('./ModernSetup3D'));
const MobileDevice3D = lazy(() => import('./MobileDevice3D'));

// Loading component for the 3D model
const ComputerLoader = () => (
  <div className="w-full h-[500px] flex items-center justify-center">
    <div className="animate-pulse text-muted-foreground">
      Loading Interactive Model...
    </div>
  </div>
);

const Hero = ({ isDark }) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const socialLinks = [
    { icon: <Github className="w-4 h-4" />, url: "https://github.com/Harsh-7243" },
    { icon: <Twitter className="w-4 h-4" />, url: "https://x.com/harsh_7243" },
    { icon: <Instagram className="w-4 h-4" />, url: "https://www.instagram.com/harsh_7243" },
    { icon: <Linkedin className="w-4 h-4" />, url: "https://linkedin.com/in/harsh-kumar-9a10152b7" },
    { icon: <Mail className="w-4 h-4" />, url: "mailto:your.email@example.com" },
  ];

  // Syntax color mapping for light & dark themes
  const syntax = {
    keyword: isDark ? "#C586C0" : "#9B4DCA",
    variable: isDark ? "#9CDCFE" : "#2B6CB0",
    string: isDark ? "#CE9178" : "#B7791F",
    boolean: isDark ? "#569CD6" : "#2F855A",
    property: isDark ? "#9CDCFE" : "#2B6CB0",
    punctuation: isDark ? "#D4D4D4" : "#4A5568",
    function: isDark ? "#DCDCAA" : "#B83280",
    default: isDark ? "#D4D4D4" : "#2D3748",
  };
  return (
    <section className="min-h-screen flex items-start sm:items-center py-4 sm:py-8 px-4 sm:px-6 lg:px-8 mt-8 sm:mt-8">
      <div className="max-w-7xl mx-auto w-full -mt-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
          {/* Left Column - Content */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-2">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium">
                <span>Available for opportunities</span>
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              </div>
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight mt-4 sm:mt-0">
              Hi, I'm <span className="text-primary">Harsh Kumar</span>
            </h1>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="mb-2"
            >
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 animate-gradient">
                Developer & Creator
              </h2>
            </motion.div>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="text-lg sm:text-xl text-muted-foreground mb-8"
            >
              Turning ideas into interactive experiences
            </motion.p>

            <div className="flex flex-wrap gap-6 justify-center sm:justify-start">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={index}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-full border border-border hover:bg-primary/10 transition-colors"
                  whileHover={{ y: -3, scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {React.cloneElement(social.icon, { 
                    className: 'w-6 h-6' 
                  })}
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Right Column - 3D Computer */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative w-full h-full md:min-h-[600px] min-h-[200px]"
          >
            <Suspense fallback={<ComputerLoader />}>
              {isMobile ? (
                <MobileDevice3D 
                  isDark={isDark} 
                  folders={[
                    { id: 1, label: 'About', section: 'about', icon: '👤' },
                    { id: 2, label: 'Projects', section: 'projects', icon: '💼' },
                    { id: 3, label: 'Skills', section: 'skills', icon: '⚡' },
                    { id: 4, label: 'Gallery', section: 'gallery', icon: '🖼️' },
                    { id: 5, label: 'Contact', section: 'contact', icon: '📧' },
                  ]} 
                />
              ) : (
                <ModernSetup3D isDark={isDark} />
              )}
            </Suspense>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
