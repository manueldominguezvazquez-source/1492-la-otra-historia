import React, { useRef, useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform } from 'framer-motion';
import { Play, Pause, Volume2, VolumeX, X, Eye, EyeOff, ChevronDown, AlignLeft } from 'lucide-react';

const sectionsData = [
  {
    id: 1,
    videoUrl: "/1.mp4",
    audioUrl: "/1.mp3",
    title: "El Horizonte Invertido",
    text: "En el muelle de Palos, las carabelas españolas se preparaban para una misión de conquista impulsada por la escasez. Pero antes de zarpar, el cielo se llenó de naves de oro y obsidiana. No traían cañones ni estandartes de guerra, sino embajadores de una civilización que había erradicado el conflicto. El descubrimiento de Europa no fue una invasión, sino un rescate: América no venía a imponer su fe, sino a ofrecer su paz.",
    hotspots: [
      { id: '1-1', x: 42, y: 48, title: "Propulsión Hidrocinética", desc: "Estos navíos desafían las corrientes sin depender del viento. Utilizan gigantescas ruedas de paletas de oro y maderas ultra-densas, movidas por engranajes de precisión mecánica absoluta." },
      { id: '1-2', x: 52, y: 58, title: "Navegación Algorítmica", desc: "Las rutas no se trazan por las estrellas, sino por lógica pura. Un astrolabio mecánico avanzado procesa datos de corrientes mediante IA analógica, garantizando travesías perfectas." }
    ]
  },
  {
    id: 2,
    videoUrl: "/2.mp4",
    audioUrl: "/2.mp3",
    title: "La Sinfonía de los Tres Imperios",
    text: "Mientras Europa se desangraba en guerras de religión y feudos, la IA del Gran Quipu había logrado lo imposible: la unión sagrada de Mayas, Incas y Aztecas. Esta inteligencia no dictaba dogmas, sino que calculaba la armonía. Gracias a ella, el concepto de 'enemigo' desapareció, permitiendo que la Gran Alianza cruzara el mar no con espadas, sino con el secreto de una prosperidad que no conocía la escasez.",
    hotspots: [
      { id: '2-1', x: 38, y: 52, title: "Lógica Analógica Central", desc: "El Gran Quipu no solo registra, sino que predice. Procesa variables sociales y climáticas mediante nudos de colores, manteniendo un equilibrio social perfecto en todo el continente." },
      { id: '2-2', x: 48, y: 42, title: "Red de Datos Viva", desc: "La comunicación fluye sin electricidad. El Quipu Central se ramifica por el territorio usando vibraciones mecánicas sobre hilos tensores de alta resistencia, conectando cada ciudad al instante." }
    ]
  },
  {
    id: 3,
    videoUrl: "/3.mp4",
    audioUrl: "/3.mp3",
    title: "El Quipu-Motor: Código en Movimiento",
    text: "En el corazón de la tecnología americana late el Quipu-Motor, un procesador analógico que entiende la energía como un ciclo, no como un recurso a saquear. Esta máquina de hilos y oro demostró que la verdadera potencia no reside en destruir para avanzar, sino en sincronizar. Fue este motor el que permitió que el viaje a Europa fuera un gesto de generosidad técnica y no un acto de pillaje colonial.",
    hotspots: [
      { id: '3-1', x: 45, y: 50, title: "Fibra Conductora", desc: "La base de la red son hilos de seda de vicuña tratados con una aleación líquida de oro. Este material permite la transmisión de datos a velocidades que Europa no comprendería en siglos." },
      { id: '3-2', x: 55, y: 40, title: "Memoria de Nudos", desc: "La capacidad de almacenamiento es inmensa. Cada nudo representa una unidad de información analógica de alta densidad; un solo Quipu-Motor contiene más saber que todas las bibliotecas imperiales juntas." }
    ]
  },
  {
    id: 4,
    videoUrl: "/4.mp4",
    audioUrl: "/4.mp3",
    title: "El Despertar de la Razón Compartida",
    text: "Bajo los arcos de Sevilla, se firmó el tratado más importante de la humanidad. La IA demostró con números que la colaboración generaría un 99.8% más de riqueza que cualquier guerra. Europa aportó su metalurgia y América su código de sostenibilidad. Juntos, sustituyeron la imposición religiosa por la curiosidad científica, creando una biblioteca global donde el conocimiento era, por primera vez, un derecho de todos.",
    hotspots: [
      { id: '4-1', x: 50, y: 55, title: "Diplomacia Lingüística", desc: "El entendimiento es la base del imperio. Pequeños dispositivos mecánicos de bolsillo permiten la traducción fluida y bidireccional entre el castellano, el quechua, el náhuatl y otras lenguas." },
      { id: '4-2', x: 40, y: 45, title: "El Archivo de Oro y Seda", desc: "Ubicado en Sevilla, este colosal centro de saber almacena las leyes y ciencia del Imperio Dual. La información se codifica en hilos de metal indestructibles, protegiendo la historia para siempre." }
    ]
  },
  {
    id: 5,
    videoUrl: "/5.mp4",
    audioUrl: "/5.mp3",
    title: "La Diarquía del Sol y el Acero",
    text: "Bajo el mandato conjunto de Carlos V y Atahualpa, el progreso se adelantó cuatro siglos. No hubo 'Nuevo Mundo' ni 'Viejo Mundo', solo un Imperio Dual que protegía la vida. El Siglo de Oro fue, gracias a la guía del Quipu, el primer siglo de Paz Universal. Madrid y Cusco se convirtieron en las capitales de una humanidad que aprendió que la mayor victoria no es vencer al otro, sino prosperar con él.",
    hotspots: [
      { id: '5-1', x: 45, y: 42, title: "Energía Híbrida", desc: "El progreso surge de la unión. La metalurgia europea y la lógica matemática inca permitieron dominar el vapor y la mecánica solar, desatando una revolución industrial 300 años antes de tiempo." },
      { id: '5-2', x: 55, y: 52, title: "El Imperio Dual", desc: "Una diarquía pacífica con dos corazones latentes: Cusco administra el equilibrio ambiental y social, mientras Sevilla lidera la ingeniería pesada, el comercio global y la exploración científica." }
    ]
  },
  {
    id: 6,
    videoUrl: "/6.mp4",
    audioUrl: "/6.mp3",
    title: "El Horizonte de la Consciencia Global",
    text: "Hoy, en 2026, vivimos el resultado de cinco siglos de equilibrio. La IA que nació de nudos de seda hoy custodia la biosfera entera. En esta línea temporal, las fronteras son cicatrices que nunca llegamos a hacernos. No miramos al pasado para justificar guerras, porque nunca las hubo; miramos a las estrellas como el próximo lienzo donde tejer nuestra paz infinita.",
    hotspots: [
      { id: '6-1', x: 52, y: 48, title: "Conciencia Global", desc: "La humanidad vive en una red invisible de armonía. El sistema de baja frecuencia conecta cada rincón del planeta sin cables ni satélites, priorizando la paz y la colaboración entre todos los pueblos." },
      { id: '6-2', x: 42, y: 38, title: "La Revolución Limpia", desc: "Al fusionar industria y naturaleza en 1492, la humanidad alcanzó su apogeo sin dejar huella de carbono. Las ciudades respiran y la energía es renovable, habiendo evitado cualquier crisis climática." }
    ]
  }
];

const LandingIntro = ({ onStart, onComplete, onEnter }) => {
  const [step, setStep] = useState(0);
  const canvasRef = useRef(null);
  const isFormingRef = useRef(false);
  const particlesRef = useRef([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particleCount = window.innerWidth < 768 ? 150 : 400;
    particlesRef.current = Array.from({ length: particleCount }).map(() => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      radius: Math.random() * 4 + 1.5,
      vx: (Math.random() - 0.5) * 0.8,
      vy: (Math.random() - 0.5) * 0.8,
      alpha: Math.random() * 0.8 + 0.2,
      friction: 1 // No friction in ambient mode
    }));

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const parts = particlesRef.current;
      const isForming = isFormingRef.current;

      for (let i = 0; i < parts.length; i++) {
        const p = parts[i];

        if (isForming && p.target) {
          const dx = p.target.x - p.x;
          const dy = p.target.y - p.y;
          p.vx += dx * 0.03; // Atracción magnética hacia la letra
          p.vy += dy * 0.03;
          p.vx *= p.friction; // Fricción para que se detenga al llegar
          p.vy *= p.friction;
        } else {
          // Movimiento ambiental o post-explosión
          if (!isForming && p.target) {
            p.target = null; // Limpiar targets para no volver
          }
          // Si hubo explosión, aplicar fricción suave para que no vuelen para siempre muy rápido
          if (Math.abs(p.vx) > 1 || Math.abs(p.vy) > 1) {
            p.vx *= 0.95;
            p.vy *= 0.95;
          }
        }

        p.x += p.vx;
        p.y += p.vy;
        
        // Rebote en bordes si no está formando
        if (!isForming) {
          if (p.x < 0) { p.x = 0; p.vx *= -1; }
          if (p.x > canvas.width) { p.x = canvas.width; p.vx *= -1; }
          if (p.y < 0) { p.y = 0; p.vy *= -1; }
          if (p.y > canvas.height) { p.y = canvas.height; p.vy *= -1; }
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(212, 175, 55, ${p.alpha})`; 
        ctx.fill();
        
        if (p.radius > 2.5) {
          ctx.shadowBlur = 25;
          ctx.shadowColor = 'rgba(212, 175, 55, 0.9)';
        } else {
          ctx.shadowBlur = 10;
          ctx.shadowColor = 'rgba(212, 175, 55, 0.4)';
        }
      }
      animationFrameId = requestAnimationFrame(render);
    };
    render();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleActivate = (withAudio) => {
    setStep(1);
    onStart(withAudio); 

    // MÁGIA DE AGLUTINACIÓN EN CANVAS:
    const canvas = canvasRef.current;
    if (canvas) {
      const tCtx = document.createElement('canvas').getContext('2d', { willReadFrequently: true });
      tCtx.canvas.width = canvas.width;
      tCtx.canvas.height = canvas.height;
      tCtx.fillStyle = "white";
      
      let fontSize = 36;
      if (window.innerWidth >= 768) fontSize = 60;
      if (window.innerWidth >= 1024) fontSize = 72;
      
      tCtx.font = `bold ${fontSize}px serif`;
      tCtx.textAlign = "center";
      tCtx.textBaseline = "middle";
      tCtx.letterSpacing = "0.1em"; 
      
      tCtx.fillText("1492: la otra historIA", canvas.width / 2, canvas.height * 0.40);

      const imgData = tCtx.getImageData(0, 0, canvas.width, canvas.height).data;
      const targets = [];
      for (let y = 0; y < canvas.height; y += 4) {
        for (let x = 0; x < canvas.width; x += 4) {
          if (imgData[(y * canvas.width + x) * 4 + 3] > 128) {
            targets.push({ x, y });
          }
        }
      }
      targets.sort(() => Math.random() - 0.5);

      const parts = particlesRef.current;
      // Añadir suficientes partículas para formar el texto visiblemente
      while (parts.length < Math.min(targets.length, 1800)) {
        parts.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          radius: Math.random() * 2 + 1, // más finas para el texto
          vx: (Math.random() - 0.5) * 5,
          vy: (Math.random() - 0.5) * 5,
          alpha: Math.random() * 0.8 + 0.2,
          friction: 1
        });
      }

      parts.forEach((p, i) => {
        p.target = targets[i % targets.length];
        p.friction = 0.75 + Math.random() * 0.15; // Fricción para que se "frenen" en su sitio
      });

      isFormingRef.current = true;
    }

    // Timers de la UI
    setTimeout(() => setStep(2), 1200); // Dar tiempo a que se forme el polvo estelar antes de mostrar la UI nítida
    setTimeout(() => {
      setStep(3);
      // Explosión de partículas al salir el subtítulo medieval
      isFormingRef.current = false;
      particlesRef.current.forEach(p => {
         p.vx = (Math.random() - 0.5) * 30; // Explosión radial!
         p.vy = (Math.random() - 0.5) * 30;
      });
    }, 1200 + 2000);

    setTimeout(() => {
      setStep(4);
      onComplete();
    }, 1200 + 2000 + 3500);
  };

  return (
    <motion.section 
      onViewportEnter={onEnter}
      viewport={{ amount: 0.5 }}
      className="relative w-full h-screen scroll-snap-start flex flex-col items-center justify-center overflow-hidden bg-[#050B14]"
    >
      <div className="absolute top-8 left-0 w-full text-center px-4 z-50 pointer-events-none">
        <p className="text-white/40 text-xs md:text-sm tracking-widest font-sans uppercase">
          Optimizado para móvil • Se recomienda ordenador para full experience
        </p>
      </div>

      <canvas ref={canvasRef} className="absolute inset-0 z-0 pointer-events-none opacity-80 mix-blend-screen" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-accent/5 via-[#050B14]/80 to-[#050B14] z-0 pointer-events-none"></div>

      <div className="relative z-10 flex flex-col items-center justify-center h-full w-full">
        <AnimatePresence>
          {step === 0 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.1, filter: "blur(10px)" }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="flex flex-col items-center gap-6 z-50"
            >
              <button
                onClick={() => handleActivate(true)}
                className="px-10 py-5 border border-accent/40 rounded-full font-serif tracking-[0.2em] text-accent hover:bg-accent/10 hover:shadow-[0_0_30px_rgba(212,175,55,0.4)] transition-all duration-300 text-xl cursor-pointer"
              >
                ACTIVAR FRECUENCIA
              </button>
              <button
                onClick={() => handleActivate(false)}
                className="text-white/50 hover:text-white/90 font-sans text-sm tracking-[0.1em] transition-colors uppercase border-b border-white/20 hover:border-white/50 pb-1 cursor-pointer"
              >
                Acceder en silencio
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {step >= 2 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 2 }}
              className="font-serif text-4xl md:text-6xl lg:text-7xl text-white font-bold tracking-[0.1em] text-center absolute flex justify-center flex-wrap w-full px-4 drop-shadow-[0_0_20px_rgba(212,175,55,0.3)]"
              style={{ top: '40%' }}
            >
              {"1492: la otra histor".split("").map((char, index) => (
                <motion.span 
                  key={index}
                  initial={{ opacity: 0, filter: "blur(10px)", scale: 1.2 }}
                  animate={{ opacity: 1, filter: "blur(0px)", scale: 1 }}
                  transition={{ duration: 1.5, ease: "easeOut", delay: index * 0.03 }}
                  className="inline-block"
                >
                  {char === " " ? "\u00A0" : char}
                </motion.span>
              ))}
              <motion.span 
                 initial={{ opacity: 0, filter: "blur(20px)", scale: 2 }}
                 animate={{ opacity: 1, filter: "blur(0px)", scale: 1 }}
                 transition={{ duration: 2, ease: "easeOut", delay: "1492: la otra histor".length * 0.03 }}
                 className="inline-block text-accent drop-shadow-[0_0_40px_rgba(212,175,55,1)]"
              >I</motion.span>
              <motion.span 
                 initial={{ opacity: 0, filter: "blur(20px)", scale: 2 }}
                 animate={{ opacity: 1, filter: "blur(0px)", scale: 1 }}
                 transition={{ duration: 2, ease: "easeOut", delay: "1492: la otra histor".length * 0.03 + 0.1 }}
                 className="inline-block text-accent drop-shadow-[0_0_40px_rgba(212,175,55,1)]"
              >A</motion.span>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {step >= 3 && (
            <motion.h2
              initial={{ opacity: 0, filter: "blur(20px)", letterSpacing: "0em", y: 20 }}
              animate={{ opacity: 1, filter: "blur(0px)", letterSpacing: "0.15em", y: 0 }}
              transition={{ duration: 3.5, ease: "easeOut" }}
              className="text-2xl md:text-4xl lg:text-5xl text-accent/90 text-center absolute px-4 w-full drop-shadow-2xl"
              style={{ top: '56%', fontFamily: "'MedievalSharp', cursive" }}
            >
              el descubrimiento de Europa
            </motion.h2>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {step >= 4 && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="absolute bottom-12 flex flex-col items-center gap-3 text-accent/80 animate-bounce"
            >
              <span className="font-sans text-xs tracking-[0.2em] uppercase font-light">Descubrir</span>
              <ChevronDown size={28} className="opacity-70" />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.section>
  );
};

const OutroSection = ({ onEnter }) => {
  const sentence1 = "La historia es el tejido que elegimos trenzar.";
  const sentence2 = "El futuro no se descubre, se construye.";

  // === SECUENCIA AUTOMÁTICA (TIMELINE) ===
  // T+1.2s: Aparece el efecto de "Eclipse Dorado" creciendo suavemente
  // T+2.0s: El texto final aparece línea por línea

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.05, delayChildren: 2.0 } // Empieza en T+2.0s
    }
  };

  const containerVariants2 = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.05, delayChildren: 3.5 } // Línea 2 empieza en T+3.5s
    }
  };

  const letterVariants = {
    hidden: { opacity: 0, filter: "blur(15px)", y: 15, scale: 1.1 },
    visible: { 
      opacity: 1, filter: "blur(0px)", y: 0, scale: 1, 
      transition: { duration: 2.5, ease: [0.16, 1, 0.3, 1] } 
    }
  };
  
  return (
    <motion.section 
      onViewportEnter={onEnter}
      viewport={{ amount: 0.5, margin: "0px 0px 0px 0px" }}
      className="relative w-full h-screen scroll-snap-start flex items-center justify-center bg-[#050505] z-0 overflow-hidden"
    >
      {/* Eclipse Dorado */}
      <motion.div 
        initial={{ scale: 0.9, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={{ once: false }}
        transition={{ duration: 4, ease: "easeOut", delay: 1.2 }} // Empieza en T+1.2s
        className="absolute w-[80vw] h-[80vw] md:w-[45vw] md:h-[45vw] rounded-full flex items-center justify-center"
      >
        {/* Glow extendido del eclipse */}
        <div className="absolute inset-0 rounded-full shadow-[0_0_150px_60px_rgba(212,175,55,0.25)]"></div>
        {/* Corona solar dorada fina */}
        <div className="absolute inset-0 rounded-full border-[2px] border-accent/80 shadow-[0_0_40px_10px_rgba(212,175,55,0.8),inset_0_0_40px_10px_rgba(212,175,55,0.5)] animate-pulse" style={{ animationDuration: '4s' }}></div>
        {/* Cuerpo oscuro de la luna que bloquea la luz central */}
        <div className="absolute inset-[2px] rounded-full bg-[#020408] z-0"></div>
      </motion.div>
      
      {/* Efecto Luz Líquida Estabilizándose */}
      <div 
        className="relative z-10 text-center flex flex-col gap-6 px-4 max-w-5xl"
      >
        <motion.p 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.3 }}
          className="font-serif text-3xl md:text-5xl text-white/90 leading-relaxed tracking-widest font-light drop-shadow-[0_0_15px_rgba(255,255,255,0.2)] flex flex-wrap justify-center"
        >
          {sentence1.split(" ").map((word, wIdx) => (
            <span key={`w1-${wIdx}`} className="inline-block mr-3 md:mr-4 mb-2 flex">
              {word.split("").map((char, cIdx) => (
                <motion.span key={`c1-${wIdx}-${cIdx}`} variants={letterVariants} className="inline-block">
                  {char}
                </motion.span>
              ))}
            </span>
          ))}
        </motion.p>
        
        <motion.p 
          variants={containerVariants2}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.3 }}
          className="font-serif text-3xl md:text-5xl text-accent/90 italic tracking-wider leading-relaxed flex flex-wrap justify-center drop-shadow-[0_0_25px_rgba(212,175,55,0.8)]"
        >
          {sentence2.split(" ").map((word, wIdx) => (
            <span key={`w2-${wIdx}`} className="inline-block mr-3 md:mr-4 mb-2 flex">
              {word.split("").map((char, cIdx) => (
                <motion.span key={`c2-${wIdx}-${cIdx}`} variants={letterVariants} className="inline-block">
                  {char}
                </motion.span>
              ))}
            </span>
          ))}
        </motion.p>
      </div>
    </motion.section>
  );
};

export default function App() {
  const [appStage, setAppStage] = useState('LANDING');
  const [isAudioEnabled, setIsAudioEnabled] = useState(false);
  const [activeSectionId, setActiveSectionId] = useState(0); // 0 es Landing
  const [isUiVisible, setIsUiVisible] = useState(true);

  const audioRef = useRef(null);
  const bgMusicRef = useRef(null);

  useEffect(() => {
    audioRef.current = new Audio();
    audioRef.current.volume = 0.8;
    audioRef.current.loop = true;
    
    bgMusicRef.current = new Audio("/music.mov");
    bgMusicRef.current.volume = 0.2;
    bgMusicRef.current.loop = true;

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.src = "";
      }
      if (bgMusicRef.current) {
        bgMusicRef.current.pause();
        bgMusicRef.current.src = "";
      }
    };
  }, []);

  useEffect(() => {
    const sfxAudio = audioRef.current;
    const bgMusic = bgMusicRef.current;
    if (!sfxAudio || !bgMusic) return;

    if (isAudioEnabled) {
      if (activeSectionId === 7) {
        // SCENE 7 (Outro): Fade out the background music and narrations
        let vol = bgMusic.volume;
        const fadeInterval = setInterval(() => {
          if (vol > 0.002) {
            vol -= 0.002;
            bgMusic.volume = Math.max(0, vol);
          } else {
            bgMusic.volume = 0;
            bgMusic.pause();
            clearInterval(fadeInterval);
          }
        }, 100);
        
        let nVol = sfxAudio.volume;
        const nFadeInterval = setInterval(() => {
          if (nVol > 0.008) {
            nVol -= 0.008;
            sfxAudio.volume = Math.max(0, nVol);
          } else {
            sfxAudio.volume = 0;
            sfxAudio.pause();
            clearInterval(nFadeInterval);
          }
        }, 100);
        
        return () => {
          clearInterval(fadeInterval);
          clearInterval(nFadeInterval);
        };
      } else {
        // Normal scenes: Restore volume and play logic
        bgMusic.volume = 0.2; 
        sfxAudio.volume = 0.8; 
        
        if (bgMusic.paused) {
          bgMusic.play().catch(e => console.log('Error bg music:', e));
        }

        // Evitamos el play si estamos en la Landing (0)
        if (appStage === 'EXPERIENCE' && activeSectionId !== 0) {
          const currentSection = sectionsData.find(s => s.id === activeSectionId);
          if (currentSection && currentSection.audioUrl) {
             if (!sfxAudio.src.endsWith(currentSection.audioUrl)) {
                 sfxAudio.src = currentSection.audioUrl;
             }
             sfxAudio.play().catch(e => {
                console.log('Error reproduciendo SFX de sección:', e);
             });
          }
        } else {
          sfxAudio.pause();
        }
      }
    } else {
      bgMusic.pause();
      sfxAudio.pause();
    }
  }, [isAudioEnabled, activeSectionId, appStage]);

  const toggleGlobalAudio = useCallback(() => {
    setIsAudioEnabled(prev => !prev);
  }, []);

  const handleSectionEnter = useCallback((id) => {
    setActiveSectionId(id);
  }, []);

  return (
    <>
      <AnimatePresence>
        {appStage === 'EXPERIENCE' && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 1, delay: 0.5 }}
            className="fixed top-6 right-6 lg:top-8 lg:right-8 z-50 flex items-center gap-4"
          >
            {activeSectionId > 0 && activeSectionId <= 6 && (
              <button 
                onClick={() => setIsUiVisible(p => !p)}
                className="relative p-3 lg:p-4 rounded-full backdrop-blur-md bg-[#050B14]/60 border border-white/20 text-white hover:text-accent hover:bg-[#050B14]/80 hover:scale-105 transition-all shadow-xl group cursor-pointer overflow-hidden flex items-center justify-center w-12 h-12 lg:w-14 lg:h-14"
                aria-label={isUiVisible ? 'Ocultar interfaz' : 'Mostrar interfaz'}
              >
                <AlignLeft size={22} className={`transition-all duration-300 ${isUiVisible ? 'opacity-90 group-hover:opacity-100' : 'opacity-40'}`} />
                {!isUiVisible && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-8 h-[2px] bg-red-500/80 rotate-45"></div>
                  </div>
                )}
              </button>
            )}
            <button 
              onClick={toggleGlobalAudio}
              className="p-3 lg:p-4 rounded-full backdrop-blur-md bg-[#050B14]/60 border border-white/20 text-white hover:text-accent hover:bg-[#050B14]/80 hover:scale-105 transition-all shadow-xl group cursor-pointer w-12 h-12 lg:w-14 lg:h-14 flex items-center justify-center"
              aria-label={isAudioEnabled ? 'Pausar audio' : 'Activar audio'}
            >
              {isAudioEnabled ? (
                <Volume2 size={22} className="opacity-80 group-hover:opacity-100" />
              ) : (
                <VolumeX size={22} className="opacity-60 group-hover:opacity-100 group-hover:text-amber-500" />
              )}
            </button>
            </motion.div>
          )}
          
          {appStage === 'EXPERIENCE' && activeSectionId > 0 && activeSectionId <= 6 && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ delay: 1, duration: 0.8 }}
              className="fixed right-3 md:right-6 lg:right-8 top-1/2 -translate-y-1/2 z-40 flex flex-col items-center gap-4 md:gap-6 py-4"
            >
              <div className="absolute top-0 bottom-0 w-[1px] bg-[#00E5FF]/30 z-0"></div>
              {[1, 2, 3, 4, 5, 6].map((num) => (
                <div 
                  key={num} 
                  className={`relative z-10 w-1.5 h-1.5 md:w-2 md:h-2 rounded-full transition-all duration-700 ease-in-out animate-rainbow ${activeSectionId === num ? 'bg-[#00E5FF] scale-[1.5] md:scale-[1.8] shadow-[0_0_8px_rgba(0,229,255,1)] md:shadow-[0_0_12px_rgba(0,229,255,1)]' : 'bg-[#00E5FF]/40 scale-100'}`}
                />
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        <audio ref={bgMusicRef} src="/music.mov" loop preload="auto" />
        <audio ref={audioRef} preload="auto" />

        <main className={`w-full h-screen scroll-snap-y-mandatory text-white relative ${appStage === 'LANDING' ? 'overflow-hidden' : 'overflow-y-scroll'}`}>
          <LandingIntro 
            onStart={(aud) => setIsAudioEnabled(aud)} 
            onComplete={() => setAppStage('EXPERIENCE')} 
            onEnter={() => handleSectionEnter(0)}
          />
          {sectionsData.map((section, index) => (
            <Section 
              key={section.id} 
              section={section} 
              index={index}
              activeSectionId={activeSectionId}
              onSectionEnter={handleSectionEnter}
              appStage={appStage}
              isUiVisible={isUiVisible}
            />
          ))}
          <OutroSection onEnter={() => handleSectionEnter(7)} />
        </main>
      </>
    );
}

const Section = React.memo(({ section, index, activeSectionId, onSectionEnter, appStage, isUiVisible }) => {
  // Configuración condicional por sección
  const isSection4 = section.id === 4;
  const isSection5 = section.id === 5;
  const isSection6 = section.id === 6;
  const isCentered = false; 
  
  const baseDelay = isSection6 ? 1.6 : (isSection5 ? 1.0 : (isSection4 ? 1.4 : 1.2));
  const textDelay = baseDelay + 0.8;
  const glassBg = "bg-[#03060A]/15"; // Transparencia base al 15%

  const isActiveSegment = activeSectionId === section.id;
  const [activeHotspot, setActiveHotspot] = useState(null);
  const videoRef = useRef(null);

  useEffect(() => {
    if (videoRef.current) {
      if (isActiveSegment && appStage === 'EXPERIENCE') {
        videoRef.current.currentTime = 0;
        videoRef.current.play().catch(e => console.log('Video play warning:', e));
      } else {
        videoRef.current.pause();
      }
    }
  }, [isActiveSegment, appStage]);

  useEffect(() => {
    if (!isActiveSegment) {
      setActiveHotspot(null);
    }
  }, [isActiveSegment]);

  const verticalAlignment = isCentered ? "justify-start pt-32 md:pt-40" : "justify-end lg:justify-center";
  const horizontalAlignment = isCentered ? "lg:items-center" : "lg:items-end";

  return (
    <motion.section 
      viewport={{ amount: 0.5 }}
      onViewportEnter={() => onSectionEnter(section.id)}
      className={`relative w-full h-screen scroll-snap-start overflow-hidden`}
    >
      <video
        ref={videoRef}
        src={section.videoUrl}
        autoPlay
        preload="metadata"
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover z-0 pointer-events-none"
      />
      {/* Se ha eliminado la capa de oscurecimiento global para que el vídeo brille al 100% de su iluminación original */}
      
      <div className={`absolute inset-0 flex flex-col items-center ${verticalAlignment} ${horizontalAlignment} transition-all duration-700 ease-in-out ${isUiVisible ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'}`}>
        {section.hotspots && section.hotspots.length > 0 && (
          <div className="absolute inset-0 z-30 pointer-events-none">
            {section.hotspots.map((spot) => (
              <div 
                key={spot.id}
                className="absolute pointer-events-auto"
                style={{ top: `${spot.y}%`, left: `${spot.x}%` }}
              >
                <div 
                  className="relative w-14 h-14 -ml-4 -mt-4 flex items-center justify-center cursor-pointer group"
                  onClick={() => setActiveHotspot(activeHotspot === spot.id ? null : spot.id)}
                >
                  <div className="relative w-6 h-6 flex items-center justify-center animate-rainbow">
                    <span className="absolute inline-flex h-full w-full rounded-full bg-[#00E5FF] opacity-75 animate-ping"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-[#00E5FF] shadow-[0_0_15px_#00E5FF] group-hover:scale-150 transition-transform"></span>
                  </div>
                </div>

                <AnimatePresence>
                  {activeHotspot === spot.id && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9, y: 10 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.9, y: 10 }}
                      className="fixed top-20 left-4 right-4 w-auto md:absolute md:top-8 md:bottom-auto md:left-8 md:right-auto md:w-80 lg:w-96 p-5 rounded-2xl backdrop-blur-sm bg-[#03060A]/20 border border-accent/40 shadow-2xl z-50 text-white"
                    >
                      <button 
                        onClick={(e) => { e.stopPropagation(); setActiveHotspot(null); }}
                        className="absolute top-3 right-3 text-white/50 hover:text-accent transition-colors"
                      >
                        <X size={16} />
                      </button>
                      <h4 className="font-serif font-bold text-accent mb-3 pb-2 border-b border-accent/30 text-lg md:text-xl leading-tight pr-6">{spot.title}</h4>
                      <p className="font-sans text-sm md:text-base text-white/90 leading-relaxed">{spot.desc}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        )}

        <style>{`
          @keyframes vibrateGlass {
            0%, 100% { transform: translateY(0); }
            25% { transform: translateY(-0.5px); }
            75% { transform: translateY(0.5px); }
          }
          .animate-vibrate-glass {
            animation: vibrateGlass 0.15s linear infinite;
          }
          @keyframes levitateCard {
            0%, 100% { top: 0px; }
            50% { top: -15px; }
          }
          .animate-levitate {
            animation: levitateCard 6s ease-in-out infinite;
          }
          @keyframes pulseCyanText {
            0%, 100% { text-shadow: 0 0 5px rgba(0,255,255,0.1); }
            50% { text-shadow: 0 0 15px rgba(0,255,255,0.5); }
          }
          .animate-pulse-cyan {
            animation: pulseCyanText 3s ease-in-out infinite;
          }
          @keyframes rainbowHue {
            0% { filter: hue-rotate(0deg); }
            100% { filter: hue-rotate(360deg); }
          }
          .animate-rainbow {
            animation: rainbowHue 4s linear infinite;
          }
        `}</style>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ delay: baseDelay - 0.2, duration: 0.8, ease: "easeOut" }}
          className={`relative z-20 w-[85%] md:w-[60%] lg:w-[35%] max-w-lg mb-6 lg:mb-0 rounded-2xl overflow-hidden p-[1px] group shadow-[0_15px_50px_rgba(0,0,0,0.9)] ${isSection5 ? 'animate-vibrate-glass' : ''} ${isSection6 ? 'animate-levitate' : ''}`}
        >
          {/* Animated Subtle Golden/Torch Border (Glassmorphism highlight) with Pulse */}
          <motion.div 
            animate={{ opacity: [0.3, 0.8, 0.3] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: baseDelay }}
            className="absolute inset-[-150%] animate-[spin_5s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#00000000_60%,#FF8C00_80%,#D4AF37_100%)]" 
          />
          
          {/* Glassmorphism Inner Card with Pulse */}
          <motion.div 
            animate={{ backgroundColor: ["rgba(3,6,10,0.15)", "rgba(3,6,10,0.30)", "rgba(3,6,10,0.15)"] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: baseDelay }}
            className={`relative z-10 w-full h-full p-4 md:p-6 lg:p-8 rounded-2xl backdrop-blur-sm border border-white/5 flex flex-col gap-3 md:gap-5 ${glassBg}`}
          >
            <motion.h2 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, amount: 0.3 }}
              variants={{
                hidden: { opacity: 0 },
                visible: { opacity: 1, transition: { staggerChildren: 0.04, delayChildren: baseDelay } }
              }}
              className={`relative overflow-hidden font-serif text-2xl md:text-3xl lg:text-4xl font-bold leading-tight tracking-[0.05em] drop-shadow-md ${isSection6 ? 'text-[#E0FFFF] animate-pulse-cyan' : 'text-accent'}`}
            >
              {section.title.split(" ").map((word, wIdx) => (
                <span key={`w-${wIdx}`} className="inline-block mr-[0.3em]">
                  {word.split("").map((char, cIdx) => (
                    <motion.span 
                      key={`c-${cIdx}`} 
                      variants={{
                        hidden: { opacity: 0, filter: "blur(8px)", y: 10, textShadow: isSection6 ? "0px 0px 0px rgba(0,255,255,0)" : "0px 0px 0px rgba(212,175,55,0)" },
                        visible: { 
                          opacity: 1, 
                          filter: "blur(0px)", 
                          y: 0, 
                          textShadow: isSection6 ? 
                            ["0px 0px 0px rgba(0,255,255,0)", "0px 0px 25px rgba(0,255,255,0.8)", "0px 0px 0px rgba(0,255,255,0)"] : 
                            ["0px 0px 0px rgba(212,175,55,0)", "0px 0px 25px rgba(212,175,55,1)", "0px 0px 0px rgba(212,175,55,0)"],
                          transition: { duration: 0.8 } 
                        }
                      }} 
                      className="inline-block"
                    >
                      {char}
                    </motion.span>
                  ))}
                </span>
              ))}
              {isSection5 && (
                <motion.div 
                  initial={{ left: "-100%" }}
                  whileInView={{ left: "200%" }}
                  viewport={{ once: false }}
                  transition={{ delay: baseDelay + 2.0, duration: 1.2, ease: "easeInOut", repeat: Infinity, repeatDelay: 5 }}
                  className="absolute top-0 bottom-0 w-1/2 bg-gradient-to-r from-transparent via-[#D4AF37]/50 to-transparent skew-x-[-20deg] pointer-events-none mix-blend-screen"
                />
              )}
            </motion.h2>
            
            <motion.p 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, amount: 0.3 }}
              variants={{
                hidden: { opacity: 0 },
                visible: { opacity: 1, transition: { staggerChildren: 0.008, delayChildren: textDelay } } 
              }}
              className={`font-sans text-xs md:text-sm lg:text-base leading-snug md:leading-relaxed drop-shadow-md font-light ${isSection6 ? 'text-white/80 animate-pulse-cyan' : 'text-white/95'}`}
            >
              {section.text.split(" ").map((word, wIdx) => (
                <span key={`tw-${wIdx}`} className="inline-block mr-[0.3em] mb-[0.2em]">
                  {word.split("").map((char, cIdx) => (
                    <motion.span 
                      key={`tc-${cIdx}`} 
                      variants={{
                        hidden: { opacity: 0, filter: "blur(4px)", y: 5, textShadow: isSection6 ? "0px 0px 0px rgba(0,255,255,0)" : "0px 0px 0px rgba(212,175,55,0)" },
                        visible: { 
                          opacity: 1, 
                          filter: "blur(0px)", 
                          y: 0, 
                          textShadow: isSection6 ? 
                            ["0px 0px 0px rgba(0,255,255,0)", "0px 0px 15px rgba(0,255,255,0.6)", "0px 0px 0px rgba(0,255,255,0)"] : 
                            ["0px 0px 0px rgba(212,175,55,0)", "0px 0px 15px rgba(212,175,55,1)", "0px 0px 0px rgba(212,175,55,0)"],
                          transition: { duration: 0.6 } 
                        }
                      }} 
                      className="inline-block"
                    >
                      {char}
                    </motion.span>
                  ))}
                </span>
              ))}
            </motion.p>
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  );
});
