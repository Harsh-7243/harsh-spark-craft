import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const MobileDevice3D = ({ isDark, folders }) => {
  const [time, setTime] = useState(new Date());
  const [hoveredFolder, setHoveredFolder] = useState(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e) => {
      const rect = e.currentTarget?.getBoundingClientRect();
      if (rect) {
        const x = (e.clientX - rect.left - rect.width / 2) / rect.width;
        const y = (e.clientY - rect.top - rect.height / 2) / rect.height;
        setMousePosition({ x: x * 25, y: y * 15 });
      }
    };

    const container = document.getElementById('mobile-device-container');
    if (container) {
      container.addEventListener('mousemove', handleMouseMove);
      return () => container.removeEventListener('mousemove', handleMouseMove);
    }
  }, []);

  const handleFolderClick = (section) => {
    const element = document.getElementById(section);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <motion.div
      id="mobile-device-container"
      className="relative w-full h-[380px] flex items-center justify-center overflow-visible"
      style={{ perspective: '2000px' }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <motion.div
        className="relative w-full"
        style={{
          transformStyle: 'preserve-3d',
          transform: 'translateZ(0)',
        }}
        animate={{
          rotateY: isHovered ? -5 + mousePosition.x : [-5, -7, -5],
          rotateX: isHovered ? 2 + mousePosition.y : [2, 1, 2],
          y: [0, -3, 0],
        }}
        transition={{
          rotateY: isHovered 
            ? { type: "spring", stiffness: 150, damping: 15 }
            : { duration: 8, repeat: Infinity, ease: "linear" },
          rotateX: isHovered 
            ? { type: "spring", stiffness: 150, damping: 15 }
            : { duration: 7, repeat: Infinity, ease: "linear" },
          y: { duration: 6, repeat: Infinity, ease: "linear" },
        }}
      >
        {/* Phone Body */}
        <motion.div
          className="relative"
          style={{
            width: '300px',
            height: '600px',
            background: isDark ? '#1f2937' : '#e5e7eb',
            borderRadius: '45px',
            border: isDark ? '2px solid #374151' : '2px solid #9ca3af',
            transform: 'translate(-50%, -45%) translateZ(20px) scale(0.65)',
            position: 'absolute',
            left: '50%',
            top: '50%',
          }}
        >
          {/* Screen */}
          <motion.div
            className="absolute"
            style={{
              top: '8px',
              left: '8px',
              right: '8px',
              bottom: '8px',
              background: isDark ? '#000000' : '#ffffff',
              borderRadius: '38px',
              overflow: 'hidden',
              border: isDark ? '2px solid #374151' : '2px solid #d1d5db',
            }}
          >
            {/* Status Bar */}
            <motion.div
              className="h-8 flex items-center justify-between px-6"
              style={{
                background: 'transparent',
                transform: 'translateZ(5px)',
              }}
            >
              <div className="text-base font-medium" style={{ color: isDark ? '#e5e7eb' : '#1f2937' }}>
                {time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </div>
              <div className="flex space-x-2">
                <div className="w-2.5 h-2.5 bg-current rounded-full" style={{ color: isDark ? '#e5e7eb' : '#1f2937' }} />
                <div className="w-2.5 h-2.5 bg-current rounded-full" style={{ color: isDark ? '#e5e7eb' : '#1f2937' }} />
                <div className="w-2.5 h-2.5 bg-current rounded-full" style={{ color: isDark ? '#e5e7eb' : '#1f2937' }} />
              </div>
            </motion.div>

            {/* App Grid */}
            <div className="p-8 pt-20">
              <motion.div 
                className="grid grid-cols-2 gap-x-12 gap-y-10"
                style={{ transform: 'translateZ(10px)' }}
              >
                {folders.map((folder, index) => (
                  <motion.div
                    key={folder.id}
                    className="cursor-pointer"
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ 
                      delay: 0.1 * index,
                      type: "spring",
                      stiffness: 200,
                      damping: 15
                    }}
                    whileHover={{ 
                      scale: 1.1,
                      rotateY: 15,
                      z: 30,
                      transition: { type: "spring", stiffness: 300, damping: 20 }
                    }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleFolderClick(folder.section)}
                    onMouseEnter={() => setHoveredFolder(folder.id)}
                    onMouseLeave={() => setHoveredFolder(null)}
                    style={{ transformStyle: 'preserve-3d' }}
                  >
                    <motion.div
                      className="flex flex-col items-center"
                      style={{
                        padding: '12px',
                        background: hoveredFolder === folder.id
                          ? (isDark ? 'rgba(59, 130, 246, 0.15)' : 'rgba(96, 165, 250, 0.15)')
                          : 'transparent',
                        borderRadius: '20px',
                        backdropFilter: 'blur(8px)',
                      }}
                    >
                      <motion.span 
                        className="text-4xl mb-3"
                        style={{ transform: 'translateZ(20px)' }}
                      >
                        {folder.icon}
                      </motion.span>
                      <motion.span
                        className="text-sm font-medium"
                        style={{
                          transform: 'translateZ(15px)',
                          color: hoveredFolder === folder.id
                            ? (isDark ? '#60a5fa' : '#3b82f6')
                            : (isDark ? '#e5e7eb' : '#1f2937'),
                        }}
                      >
                        {folder.label}
                      </motion.span>
                    </motion.div>
                  </motion.div>
                ))}
              </motion.div>
            </div>

            {/* Home Bar */}
            <motion.div
              className="absolute bottom-2 left-1/2 transform -translate-x-1/2 w-20 h-1.5 rounded-full"
              style={{
                background: isDark ? 'rgba(229, 231, 235, 0.3)' : 'rgba(31, 41, 55, 0.3)',
                transform: 'translateZ(5px)',
              }}
            />
          </motion.div>

          {/* Dynamic Island */}
          <motion.div
            className="absolute top-0 left-1/2 w-20 h-6 bg-black rounded-b-2xl"
            style={{
              transform: 'translate(-50%, 0) translateZ(25px)',
              marginLeft: '0',
            }}
          >
            <div className="absolute top-1.5 left-1/2 w-2 h-2 rounded-full bg-gray-800"
              style={{
                transform: 'translate(-50%, 0)',
              }}
            />
          </motion.div>

          {/* Side Buttons */}
          <motion.div
            className="absolute right-[-3px] top-[100px] w-[3px] h-[40px] rounded-r-lg"
            style={{
              background: isDark ? '#374151' : '#9ca3af',
              transform: 'translateZ(22px)',
            }}
          />
          <motion.div
            className="absolute right-[-3px] top-[160px] w-[3px] h-[40px] rounded-r-lg"
            style={{
              background: isDark ? '#374151' : '#9ca3af',
              transform: 'translateZ(22px)',
            }}
          />
          <motion.div
            className="absolute left-[-3px] top-[120px] w-[3px] h-[60px] rounded-l-lg"
            style={{
              background: isDark ? '#374151' : '#9ca3af',
              transform: 'translateZ(22px)',
            }}
          />
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default MobileDevice3D;