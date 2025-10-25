import { motion, AnimatePresence, useAnimation } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { X, ChevronLeft, ChevronRight, Maximize2 } from "lucide-react";
import { Button } from "@/components/ui/button";

const galleryItems = [
  {
    id: 1,
    title: "Modern Dashboard",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&h=800&fit=crop",
    category: "Web Design",
  },
  {
    id: 2,
    title: "Mobile App UI",
    image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=1200&h=800&fit=crop",
    category: "Mobile",
  },
  {
    id: 3,
    title: "E-commerce Platform",
    image: "https://images.unsplash.com/photo-1557821552-17105176677c?w=1200&h=800&fit=crop",
    category: "Web Design",
  },
  {
    id: 4,
    title: "Creative Portfolio",
    image: "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=1200&h=800&fit=crop",
    category: "Design",
  },
  {
    id: 5,
    title: "Data Visualization",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&h=800&fit=crop",
    category: "Web Design",
  },
  {
    id: 6,
    title: "Tech Conference",
    image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1200&h=800&fit=crop",
    category: "Event",
  },
  {
    id: 7,
    title: "UI Components",
    image: "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=1200&h=800&fit=crop",
    category: "UI Kit",
  },
  {
    id: 8,
    title: "Brand Identity",
    image: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=1200&h=800&fit=crop",
    category: "Branding",
  },
  {
    id: 9,
    title: "Mobile App Design",
    image: "https://images.unsplash.com/photo-1551434678-e076c223a692?w=1200&h=800&fit=crop",
    category: "Mobile",
  },
];

const Gallery = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [selectedImage, setSelectedImage] = useState(null);
  const [showAll, setShowAll] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const controls = useAnimation();
  const [swipeX, setSwipeX] = useState(0);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const visibleItems = showAll ? galleryItems : galleryItems.slice(0, 6);

  const handleSwipeStart = () => {
    setSwipeX(0);
  };

  const handleSwipe = (event, info) => {
    setSwipeX(info.offset.x);
  };

  const handleSwipeEnd = (event, info) => {
    if (selectedImage === null) return;
    
    // If swipe distance is significant, navigate to next/previous image
    if (Math.abs(info.offset.x) > 50) {
      const currentIndex = galleryItems.findIndex(item => item.id === selectedImage);
      if (info.offset.x > 0) {
        // Swipe right - go to previous image
        const prevIndex = (currentIndex - 1 + galleryItems.length) % galleryItems.length;
        setSelectedImage(galleryItems[prevIndex].id);
      } else {
        // Swipe left - go to next image
        const nextIndex = (currentIndex + 1) % galleryItems.length;
        setSelectedImage(galleryItems[nextIndex].id);
      }
    }
    setSwipeX(0);
  };

  return (
    <section id="gallery" className="py-20 px-4" ref={ref}>
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Gallery
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-primary to-secondary mx-auto mb-6" />
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            A visual journey through my creative work and hackathon moments
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {visibleItems.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.3, delay: Math.min(index * 0.05, 0.5) }}
              whileHover={{ y: -5, boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)' }}
              className="relative group cursor-pointer overflow-hidden rounded-xl sm:rounded-2xl bg-card border border-border/50 hover:border-primary/30 transition-all duration-300"
              onClick={() => setSelectedImage(item.id)}
            >
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  loading={index > 3 ? 'lazy' : 'eager'}
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4 sm:p-6">
                <div>
                  <span className="inline-block px-2.5 py-1 text-xs font-medium rounded-full bg-primary/10 text-primary mb-2">
                    {item.category}
                  </span>
                  <h3 className="text-base sm:text-lg font-semibold text-foreground">{item.title}</h3>
                </div>
              </div>
              <div className="absolute top-3 right-3 p-1.5 rounded-full bg-background/80 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <Maximize2 className="w-4 h-4 text-foreground/70" />
              </div>
            </motion.div>
          ))}
        </div>

        {!showAll && galleryItems.length > 6 && (
          <motion.div 
            className="mt-10 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ delay: 0.3 }}
          >
            <Button 
              variant="outline"
              size="lg"
              className="px-8 py-6 text-base font-medium group"
              onClick={() => setShowAll(true)}
            >
              View All Images
              <span className="ml-2 opacity-70 group-hover:translate-x-1 transition-transform">
                ↓
              </span>
            </Button>
          </motion.div>
        )}

        {/* Lightbox */}
        <AnimatePresence>
          {selectedImage !== null && (
            <motion.div
              key="lightbox"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-background/95 backdrop-blur-sm flex items-center justify-center p-4"
              onClick={(e) => {
                if (e.target === e.currentTarget) setSelectedImage(null);
              }}
            >
              <div
                className="relative max-w-6xl w-full max-h-[90vh] overflow-hidden rounded-xl bg-background shadow-2xl border border-border/50"
                onClick={(e) => e.stopPropagation()}
                role="dialog"
                aria-modal="true"
              >
                <div className="absolute top-0 left-0 right-0 p-4 bg-gradient-to-b from-background/80 to-transparent z-10 flex justify-between items-center">
                  <div>
                    <h3 className="text-lg font-semibold text-foreground">
                      {galleryItems.find((item) => item.id === selectedImage)?.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {galleryItems.find((item) => item.id === selectedImage)?.category}
                    </p>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedImage(null);
                    }}
                    className="p-2 rounded-full hover:bg-muted transition-colors text-foreground/70 hover:text-foreground"
                    aria-label="Close lightbox"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
                

                <div className="h-full w-full flex items-center justify-center p-4 pt-16 pb-16 sm:pt-20 sm:pb-20 overflow-hidden">
                  <motion.div
                    className="w-full h-full flex items-center justify-center"
                    drag={isMobile ? "x" : false}
                    dragConstraints={{ left: 0, right: 0 }}
                    onDragStart={handleSwipeStart}
                    onDrag={handleSwipe}
                    onDragEnd={handleSwipeEnd}
                    style={{
                      x: swipeX,
                      cursor: isMobile ? (swipeX !== 0 ? 'grabbing' : 'grab') : 'default'
                    }}
                    animate={controls}
                  >
                    <motion.img
                      key={selectedImage}
                      src={galleryItems.find((item) => item.id === selectedImage)?.image}
                      alt={galleryItems.find((item) => item.id === selectedImage)?.title || ''}
                      className="max-w-full max-h-full object-contain touch-none"
                      initial={{ opacity: 0, scale: 0.98 }}
                      animate={{ 
                        opacity: 1, 
                        scale: 1,
                        x: 0
                      }}
                      exit={{ opacity: 0, scale: 0.98 }}
                      transition={{ duration: 0.2 }}
                      onClick={(e) => e.stopPropagation()}
                    />
                  </motion.div>
                </div>

                {/* Navigation controls */}
                {!isMobile && (
                  <div className="absolute inset-0 flex items-center justify-between p-4 z-10 pointer-events-none">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        const currentIndex = galleryItems.findIndex(item => item.id === selectedImage);
                        const prevIndex = (currentIndex - 1 + galleryItems.length) % galleryItems.length;
                        setSelectedImage(galleryItems[prevIndex].id);
                      }}
                      className="p-2 rounded-full bg-background/80 backdrop-blur-sm hover:bg-muted transition-colors text-foreground/70 hover:text-foreground pointer-events-auto"
                      aria-label="Previous image"
                    >
                      <ChevronLeft className="w-6 h-6" />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        const currentIndex = galleryItems.findIndex(item => item.id === selectedImage);
                        const nextIndex = (currentIndex + 1) % galleryItems.length;
                        setSelectedImage(galleryItems[nextIndex].id);
                      }}
                      className="p-2 rounded-full bg-background/80 backdrop-blur-sm hover:bg-muted transition-colors text-foreground/70 hover:text-foreground pointer-events-auto"
                      aria-label="Next image"
                    >
                      <ChevronRight className="w-6 h-6" />
                    </button>
                  </div>
                )}
                
                {/* Swipe hint for mobile */}
                {isMobile && (
                  <div className="absolute bottom-4 left-0 right-0 text-center">
                    <p className="inline-block px-3 py-1 text-xs text-muted-foreground bg-background/80 backdrop-blur-sm rounded-full border border-border">
                      Swipe to navigate • Tap to close
                    </p>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Escape key listener */}
        {selectedImage !== null && (
          <div className="sr-only">
            <button 
              onClick={() => setSelectedImage(null)}
              onKeyDown={(e) => {
                if (e.key === 'Escape') setSelectedImage(null);
              }}
              aria-hidden="true"
              tabIndex={-1}
            />
          </div>
        )}
      </div>
    </section>
  );
};

export default Gallery;
