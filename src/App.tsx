import { useState, useEffect } from 'react';
import { ArrowDown, Calendar, Camera, Heart, MapPin, MessageSquare, Music, Gift } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";
import './index.css';

export function App() {
  const [showPage, setShowPage] = useState(false);
  const [activePhotoIndex, setActivePhotoIndex] = useState(0);
  const [loadingComplete, setLoadingComplete] = useState(false);
  const [giftOpened, setGiftOpened] = useState(false);
  const [giftAnimationStage, setGiftAnimationStage] = useState(0);
  const [isMessageOpen, setIsMessageOpen] = useState(false);
  // 0: Initial state
  // 1: Text disappearing & gift moving down
  // 2: Gift shaking
  // 3: Gift lid opening
  // 4: Petals bursting from inside
  // 5: Heart rising from gift
  // 6: Zooming into heart
  // 7: Content showing

  useEffect(() => {
    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css2?family=Dancing+Script:wght@400;700&family=Poppins:wght@300;400;500;600&display=swap';
    link.rel = 'stylesheet';
    document.head.appendChild(link);

    const timer = setTimeout(() => {
      setLoadingComplete(true);
    }, 1000);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  useEffect(() => {
    if (giftAnimationStage === 1) {
      // After text disappearing & gift moving down, start shaking
      const timer = setTimeout(() => {
        setGiftAnimationStage(2);
      }, 800);
      return () => clearTimeout(timer);
    }
    
    if (giftAnimationStage === 2) {
      // After shaking, start opening the lid
      const timer = setTimeout(() => {
        setGiftAnimationStage(3);
      }, 1000);
      return () => clearTimeout(timer);
    }
    
    if (giftAnimationStage === 3) {
      // After lid opens, burst petals
      const timer = setTimeout(() => {
        setGiftAnimationStage(4);
      }, 1000);
      return () => clearTimeout(timer);
    }
    
    if (giftAnimationStage === 4) {
      // After petals burst, show heart rising
      const timer = setTimeout(() => {
        setGiftAnimationStage(5);
      }, 1500);
      return () => clearTimeout(timer);
    }
    
    if (giftAnimationStage === 5) {
      // After heart rises, zoom into it
      const timer = setTimeout(() => {
        setGiftAnimationStage(6);
      }, 1200);
      return () => clearTimeout(timer);
    }
    
    if (giftAnimationStage === 6) {
      // After zooming into heart, show content
      const timer = setTimeout(() => {
        setGiftAnimationStage(7);
        setGiftOpened(true);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [giftAnimationStage]);

  const handleOpenGift = () => {
    // Start the animation sequence - text disappears & gift moves down more visibly
    setGiftAnimationStage(1);
  };

  const photos = [
    {
      url: "/images/foto1.PNG",
      caption: "Rain"
    },
    {
      url: "/images/foto2.JPG",
      caption: "Campos"
    },
    {
      url: "/images/foto3.JPEG",
      caption: "Pedido"
    },
    {
      url: "/images/foto4.JPEG",
      caption: "Prainha"
    },
    {
      url: "/images/foto5.JPEG",
      caption: "Prainha 2"
    },
    {
      url: "/images/foto6.JPEG",
      caption: "Pulseiras"
    },
    {
      url: "/images/foto7.JPEG",
      caption: "Carnaval"
    },
    {
      url: "/images/foto8.JPEG",
      caption: "Cachoeira dos Amores"
    },
    {
      url: "/images/foto9.JPEG",
      caption: "Pedra do Bau"
    },
    {
      url: "/images/fotof.PNG",
      caption: "E tantas outras que vão vir por aí..."
    },
  ];

  useEffect(() => {
  const interval = setInterval(() => {
    setActivePhotoIndex(prevIndex => (prevIndex + 1) % photos.length);
  }, 5000); // 5 segundos

  return () => clearInterval(interval); // limpa quando desmonta
}, [photos.length]);

  if (!loadingComplete) {
    return (
      <div className="fixed inset-0" style={{ fontFamily: 'Poppins, sans-serif' }}>
        <div className="relative size-full">
          <div className="absolute inset-0 bg-gradient-to-br from-pink-100 to-purple-200 flex size-full flex-col items-center justify-center gap-4 p-8 text-center">
            <div className="relative flex items-center justify-center w-14 h-14 bg-white border rounded-full">
              <div className="absolute h-14 w-14 rounded-full animate-spin bg-gradient-to-b from-pink-500 to-transparent"></div>
              <div className="absolute flex items-center justify-center bg-white rounded-full h-[52px] w-[52px]">
                <Heart className="text-pink-500" fill="currentColor" />
              </div>
            </div>
            <div className="text-pink-800 font-medium">Preparando algo especial...</div>
            <div className="text-pink-600 text-sm">Para a pessoa mais especial do mundo</div>
          </div>
        </div>
      </div>
    );
  }

  // Gift screen with animation stages
  if (!giftOpened) {
    return (
      <div className="fixed inset-0" style={{ fontFamily: 'Poppins, sans-serif' }}>
        <div className="relative size-full">
          <div className="absolute inset-0 bg-gradient-to-br from-pink-100 to-purple-200 flex size-full flex-col items-center justify-center gap-6 p-8 text-center">
            <AnimatePresence>
              {giftAnimationStage < 7 && (
                <motion.div
                  className="relative w-40 h-40 md:w-48 md:h-48"
                  initial={{ scale: 1 }}
                  animate={
                    giftAnimationStage === 1
                      ? { 
                          y: 100,
                          scale: 1.05
                        }
                      : giftAnimationStage === 2
                      ? { 
                          y: 100,
                          rotate: [-3, 3, -3, 3, -2, 2, -1, 1, 0],
                          scale: [1.05, 1.08, 1.05, 1.08, 1.05]
                        }
                      : giftAnimationStage === 6
                      ? { scale: 1.2, opacity: 0, y: -50 }
                      : giftAnimationStage > 2
                      ? { y: 100, scale: 1.05 }
                      : { scale: 1 }
                  }
                  exit={{ 
                    scale: 1.5, 
                    opacity: 0,
                    transition: { duration: 0.5 }
                  }}
                  transition={{ 
                    duration: giftAnimationStage === 2 ? 1 : 0.9
                  }}
                >
                  {/* Gift Base */}
                  <motion.div 
                    className="absolute inset-0 bg-pink-600 rounded-lg"
                    style={{ 
                      clipPath: "polygon(0% 25%, 100% 25%, 100% 100%, 0% 100%)"
                    }}
                  >
                    <div className="absolute w-full h-1/6 top-1/2 transform -translate-y-1/2 bg-pink-500"></div>
                    <div className="absolute h-full w-1/6 left-1/2 transform -translate-x-1/2 bg-pink-500"></div>
                  </motion.div>
                  
                  {/* Gift Lid */}
                  <motion.div 
                    className="absolute top-0 left-0 right-0 h-1/4 bg-pink-700 rounded-t-lg"
                    animate={
                      giftAnimationStage >= 3
                        ? { 
                            rotateX: 110,
                            y: -40,
                            opacity: giftAnimationStage >= 4 ? 0 : 1,
                            transformOrigin: "top",
                            transition: { duration: 1 }
                          }
                        : {}
                    }
                  >
                    <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-1/4 h-[40px] bg-pink-400 rounded-lg"></div>
                  </motion.div>

                  {/* Petals bursting out */}
                  {giftAnimationStage >= 4 && giftAnimationStage < 6 && (
                    <div className="absolute top-0 left-1/2 transform -translate-x-1/2">
                      {Array.from({ length: 40 }).map((_, i) => {
                        const colors = [
                          "#f472b6", "#ec4899", "#fda4af", "#fbcfe8", 
                          "#f9a8d4", "#db2777", "#ffffff", "#f0abfc"
                        ];
                        const randomColor = colors[Math.floor(Math.random() * colors.length)];
                        const isRound = Math.random() > 0.5;
                        const size = 10 + Math.random() * 15;
                        
                        return (
                          <motion.div
                            key={i}
                            className="absolute"
                            initial={{ y: 0, x: 0, scale: 0, rotate: 0 }}
                            animate={{ 
                              y: window.innerHeight * 0.7, // Accumulate at bottom
                              x: (Math.random() - 0.5) * 400,
                              scale: Math.random() * 0.7 + 0.3,
                              rotate: Math.random() * 360,
                              opacity: giftAnimationStage >= 5 ? 0 : 1
                            }}
                            transition={{ 
                              duration: 2 + Math.random() * 2,
                              ease: "easeOut",
                              opacity: { delay: giftAnimationStage >= 5 ? 0 : 1.5, duration: 0.5 }
                            }}
                            style={{
                              width: isRound ? size : size + 5,
                              height: isRound ? size : size - 5,
                              borderRadius: isRound ? '50%' : '40% 60% 40% 60%',
                              backgroundColor: randomColor,
                            }}
                          />
                        );
                      })}
                    </div>
                  )}
                  {/* Heart will rise without a string */}
                  
                  {/* Rising heart that grows */}
                  {giftAnimationStage >= 5 && (
                    <motion.div 
                        className="absolute top-0 left-1/2 transform -translate-x-1/2 z-10"
                      initial={{ scale: 0, y: 40 }}
                      animate={{ 
                        scale: giftAnimationStage === 6 ? 15 : 1.2,
                        y: giftAnimationStage === 5 ? -220 : -280,
                        opacity: giftAnimationStage === 6 ? 0.9 : 1
                      }}
                      transition={{ 
                        duration: giftAnimationStage === 6 ? 1.5 : 1.2,
                        ease: "easeOut"
                      }}
                    >
                      <div className="flex items-center justify-center">
                        <Heart 
                          size={120} 
                          className="text-pink-600" 
                          fill="currentColor" 
                        />
                      </div>
                    </motion.div>
                  )}
                  
                  {/* Gift Icon */}
                  <motion.div
                    animate={giftAnimationStage >= 3 ? { opacity: 0 } : { opacity: 1 }}
                    transition={{ duration: 0.5 }}
                  >
                    <Gift 
                      size={80} 
                      className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white" 
                      strokeWidth={1.5} 
                    />
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
            
            <motion.div 
              className="mt-4"
              animate={
                giftAnimationStage >= 1
                  ? { opacity: 0, y: 20 }
                  : { opacity: 1, y: 0 }
              }
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-pink-800 mb-3" style={{ fontFamily: "'Dancing Script', cursive" }}>
                Amor
              </h2>
              <p className="text-pink-700 mb-8">
                Surpresinha para você...
              </p>
              {giftAnimationStage === 0 && (
                <motion.button
                  onClick={handleOpenGift}
                  className="bg-pink-600 hover:bg-pink-700 text-white font-medium py-3 px-8 rounded-full shadow-lg transition-all"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Abrir
                </motion.button>
              )}
            </motion.div>
            
            {giftAnimationStage >= 3 && (
              <motion.div
                className="absolute inset-0 pointer-events-none"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.3 }}
              >
                {Array.from({ length: 40 }).map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute"
                    style={{
                      top: "-20px",
                      left: `${Math.random() * 100}%`,
                      width: `${Math.random() * 8 + 3}px`,
                      height: `${Math.random() * 8 + 3}px`,
                      backgroundColor: [
                        "#f472b6", "#ec4899", "#db2777", "#be185d",
                        "#ffffff", "#fdf2f8", "#fbcfe8"
                      ][Math.floor(Math.random() * 7)]
                    }}
                    initial={{ y: -20 }}
                    animate={{
                      y: window.innerHeight + 50,
                      rotate: Math.random() * 360,
                      x: (Math.random() - 0.5) * 100
                    }}
                    transition={{
                      duration: Math.random() * 3 + 2,
                      delay: Math.random() * 0.5,
                      ease: "linear",
                      repeat: Infinity,
                      repeatDelay: Math.random() * 2
                    }}
                  />
                ))}
              </motion.div>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 to-purple-200" style={{ fontFamily: 'Poppins, sans-serif' }}>
      {/* Hero Section */}
      <motion.section 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="relative min-h-screen flex flex-col items-center justify-center text-center px-4 overflow-hidden"
      >
        <div className="absolute inset-0 bg-transparent overflow-hidden">
          <div className="bg-pink-200"></div>
          {Array.from({ length: 20 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute text-pink-400"
              style={{ 
                fontSize: `${Math.random() * 30 + 15}px`,
                left: `${Math.random() * 100}%`,
                top: `-50px`
              }}
              animate={{
                y: [0, window.innerHeight],
                opacity: [0, 0.7, 0]
              }}
              transition={{
                duration: 6 + Math.random() * 8,
                repeat: Infinity,
                delay: Math.random() * 10,
                ease: "easeInOut"
              }}
            >
              <Heart fill="currentColor" />
            </motion.div>
          ))}
        </div>
        
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="z-10 rounded-xl p-8 max-w-2xl mx-4 mt-16 mb-16"
        >
          <motion.h1 
            className="text-4xl md:text-6xl font-bold text-pink-800 mb-4 "
            style={{ fontFamily: "'Dancing Script', cursive" }}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.8 }}
          >
            Para Maria
          </motion.h1>
          <h3 className="text-2xl text-pink-800 font-semibold mb-4 " style={{ fontFamily: "'Dancing Script', cursive" }}>Meu amor,</h3>
          <div className="text-[#f06292] mb-4 text-left space-y-4 bg-transparent text-center">
            <p>Amar você é descobrir o extraordinário nas pequenas coisas.</p>
            <p>É sentir meu coração acelerar cada vez que você sorri, é me perder no brilho dos seus olhos e encontrar ali o lugar mais seguro que já conheci.</p>
            <p>Ao seu lado, aprendi que o amor é feito de detalhes: é o abraço no fim do dia, o carinho no silêncio e as palavras ditas sem precisar de voz.</p>
            <p>Você é o pedaço do meu mundo que sempre esperei, o capítulo da minha história que faz todo o resto fazer sentido.</p>
            <p>Contigo, sinto que encontrei o meu lar, mesmo estando longe de qualquer lugar.</p>
            <p>Você é minha paz e, ao mesmo tempo, minha maior aventura.</p>
            <p>Quero viver cada instante ao seu lado, fazendo memórias, descobrindo o que é amar com o coração inteiro e compartilhando uma vida de sonhos e certezas.</p>
            <p>Que nosso amor continue crescendo, intenso e livre, como as estrelas no céu, sempre iluminando e guiando nossos caminhos.</p>
            <p>Te amo além das palavras, te amo no infinito que só os nossos corações conhecem.</p>
          </div>
        </motion.div>

        <motion.div 
          className="absolute bottom-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, y: [0, 10, 0] }}
          transition={{ delay: 1.5, duration: 2, repeat: Infinity }}
        >
          <ArrowDown className="text-pink-600" />
        </motion.div>
      </motion.section>

      <hr className="my-12 border-t-4 border-pink-800 w-3/4 mx-auto rounded-full" />

      {/* Gallery Section */}
     <section className="py-16 px-4 max-w-5xl mx-auto bg-transparent">
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.8 }}
    viewport={{ once: true, margin: "-100px" }}
  >
    <h2
      className="text-3xl md:text-4xl text-center font-bold text-pink-800 mb-12"
      style={{ fontFamily: "'Dancing Script', cursive" }}
    >
      Alguns de nossos momentos especiais
    </h2>

    <div className="relative aspect-[3/4] rounded-xl overflow-hidden shadow-xl mb-4 border-4 border-white">
      {photos.map((photo, index) => (
        <motion.div
          key={index}
          className="absolute inset-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: index === activePhotoIndex ? 1 : 0 }} 
          transition={{ duration: 0.5 }}
        >
          <img
            src={photo.url}
            alt={photo.caption}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
          <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6 text-white">
            <p className="text-lg md:text-xl font-medium">{photo.caption}</p>
          </div>
        </motion.div>
      ))}

      {/* Setas de navegação */}
      <button
        onClick={() =>
          setActivePhotoIndex(
            (prevIndex) => (prevIndex - 1 + photos.length) % photos.length
          )
        }
        className="absolute left-2 top-1/2 -translate-y-1/2 z-20 bg-pink-700/70 hover:bg-pink-700 text-white p-2 rounded-full shadow-md"
      >
        {/* SVG Seta esquerda */}
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      <button
        onClick={() =>
          setActivePhotoIndex((prevIndex) => (prevIndex + 1) % photos.length)
        }
        className="absolute right-2 top-1/2 -translate-y-1/2 z-20 bg-pink-700/70 hover:bg-pink-700 text-white p-2 rounded-full shadow-md"
      >
        {/* SVG Seta direita */}
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </div>

    {/* Indicadores de posição */}
    <div className="flex justify-center gap-2 mt-4">
      {photos.map((_, index) => (
        <button
          key={index}
          onClick={() => setActivePhotoIndex(index)}
          className={`w-3 h-3 rounded-full transition-all ${
            index === activePhotoIndex ? "bg-pink-600 scale-125" : "bg-pink-300"
          }`}
        />
      ))}
    </div>
  </motion.div>
</section>

      {/* Footer */}
      <footer className="bg-pink-800 text-white py-8 text-center">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl mb-4 font-bold" style={{ fontFamily: "'Dancing Script', cursive" }}>
            Feliz dia dos namorados, meu amor!
          </h2>
          <p className="text-pink-300 mb-6">
            Desenvolvido por Felipe
          </p>
          <div className="animate-pulse">
            <Heart className="inline-block text-pink-300" fill="currentColor" />
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;