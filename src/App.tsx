import { motion, useScroll, useSpring, AnimatePresence, useTransform, useInView } from "motion/react";
import { 
  Cpu, Globe, Zap, ArrowRight, Layers, Github, Linkedin, Mail, 
  Database, Code, BarChart, Brain, Award, GraduationCap, 
  Briefcase, Palette, Trophy, ChevronDown, Phone,
  ChevronLeft, ChevronRight
} from "lucide-react";
import { useRef, useState, useEffect } from "react";

const LoadingScreen = () => {
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const update = () => setDimensions({ width: window.innerWidth, height: window.innerHeight });
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  const hypot = Math.hypot(dimensions.width, dimensions.height);
  const angle = Math.atan2(dimensions.height, dimensions.width) * (180 / Math.PI);

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-transparent overflow-hidden"
      exit={{ 
        opacity: 0, 
        transition: { duration: 0.5, delay: 1.2 } 
      }}
    >
      {/* Top-Right Triangle Panel */}
      <motion.div
        initial={{ clipPath: "polygon(0 0, 100% 0, 100% 100%)" }}
        exit={{ 
          x: "100%", 
          y: "-100%",
          transition: { duration: 1.5, ease: [0.77, 0, 0.175, 1] }
        }}
        className="absolute inset-0 bg-black"
      />
      {/* Bottom-Left Triangle Panel */}
      <motion.div
        initial={{ clipPath: "polygon(0 0, 0 100%, 100% 100%)" }}
        exit={{ 
          x: "-100%", 
          y: "100%",
          transition: { duration: 1.5, ease: [0.77, 0, 0.175, 1] }
        }}
        className="absolute inset-0 bg-black"
      />
      
      {/* Diagonal Progress Line (0,0 to 100,100) */}
      <motion.div 
        exit={{ opacity: 0, transition: { duration: 0.2 } }}
        className="absolute top-0 left-0 z-[102] pointer-events-none origin-top-left"
        style={{ 
          width: hypot, 
          height: '1px', 
          transform: `rotate(${angle}deg)`,
          background: 'rgba(255, 255, 255, 0.1)'
        }}
      >
        <motion.div 
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 2, ease: "easeInOut" }}
          className="w-full h-full bg-orange-500 origin-left shadow-[0_0_15px_rgba(249,115,22,0.5)]"
        />
      </motion.div>

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20, transition: { duration: 0.5 } }}
        className="absolute bottom-8 left-8 md:bottom-12 md:left-12 z-[103] text-left"
      >
        <h1 className="text-xl md:text-2xl font-display font-bold tracking-tight text-white mb-1">
          Yash Pise
        </h1>
        <div className="flex items-center gap-3">
          <span className="text-[9px] font-mono text-orange-500 tracking-[0.4em] uppercase opacity-80">
            Portfolio 2026
          </span>
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
            className="w-1.5 h-1.5 border border-orange-500/50 border-t-orange-500 rounded-full"
          />
        </div>
      </motion.div>
    </motion.div>
  );
};

const Marquee = ({ items, speed = 20, reverse = false }: { items: string[], speed?: number, reverse?: boolean }) => {
  return (
    <div className="flex overflow-hidden whitespace-nowrap">
      <motion.div
        animate={{ x: reverse ? ["-50%", "0%"] : ["0%", "-50%"] }}
        transition={{ repeat: Infinity, duration: speed, ease: "linear" }}
        className="flex items-center"
        style={{ willChange: "transform" }}
      >
        {[...items, ...items, ...items, ...items].map((item, i) => (
          <div key={i} className="flex items-center px-2 md:px-8">
            <span className="text-xl md:text-4xl font-display font-black uppercase tracking-tighter">{item}</span>
            <span className="ml-4 md:ml-16 text-lg md:text-3xl opacity-50">*</span>
          </div>
        ))}
      </motion.div>
    </div>
  );
};

const SkillCard = ({ category, items, icon: Icon, autoFlipDelay = 0 }: { category: string, items: string[], icon: any, autoFlipDelay?: number }) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const cardRef = useRef(null);
  const isInView = useInView(cardRef, { once: true, amount: 0.5 });

  useEffect(() => {
    if (isInView) {
      const timer = setTimeout(() => {
        setIsFlipped(true);
      }, autoFlipDelay);
      return () => clearTimeout(timer);
    }
  }, [isInView, autoFlipDelay]);

  return (
    <div ref={cardRef} className="shrink-0 w-[280px] flex flex-col items-center gap-6 group snap-center">
      <div 
        className="perspective-1000 w-full h-[380px] cursor-pointer"
        onClick={() => setIsFlipped(!isFlipped)}
      >
        <motion.div
          initial={false}
          animate={{ rotateY: isFlipped ? 180 : 0 }}
          transition={{ duration: 0.6, type: "spring", stiffness: 260, damping: 40 }}
          className="relative w-full h-full preserve-3d"
        >
          {/* Front Side */}
          <div className="absolute inset-0 backface-hidden">
            <div 
              className="w-full h-full border border-white/10 rounded-3xl overflow-hidden group-hover:border-orange-500/50 transition-colors shadow-2xl bg-cover bg-center bg-no-repeat"
              style={{ backgroundImage: "url('src/assets/card-bg.jpg')" }}
            >
              {/* Subtle Sheen Effect */}
              <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/5 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>
          </div>

          {/* Back Side */}
          <div className="absolute inset-0 backface-hidden rotate-y-180">
            <div className="w-full h-full bg-white/[0.03] backdrop-blur-3xl border border-white/10 rounded-3xl p-8 flex flex-col justify-center shadow-2xl relative overflow-hidden">
              {/* Subtle Inner Glow */}
              <div className="absolute inset-0 bg-gradient-to-b from-white/[0.05] to-transparent pointer-events-none" />
              
              <div className="relative z-10">
                <div className="w-10 h-10 rounded-xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center mb-8">
                  <Icon className="text-orange-500" size={20} />
                </div>
                
                <h3 className="text-[10px] font-mono text-orange-500 tracking-[0.3em] uppercase mb-6 opacity-80">
                  {category}
                </h3>
                
                <div className="space-y-4">
                  {items.map((item, i) => (
                    <motion.div 
                      key={i}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: isFlipped ? 1 : 0, y: isFlipped ? 0 : 10 }}
                      transition={{ delay: isFlipped ? i * 0.05 : 0 }}
                      className="text-sm md:text-base font-sans font-medium text-white/90 tracking-wide"
                    >
                      {item}
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Decorative Corner Accent */}
              <div className="absolute top-0 right-0 w-24 h-24 bg-orange-500/5 blur-3xl rounded-full" />
            </div>
          </div>
        </motion.div>
      </div>
      <h3 className="text-2xl font-display font-black tracking-tighter uppercase text-center group-hover:text-orange-500 transition-colors">
        {category}
      </h3>
    </div>
  );
};

export default function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2500);
    return () => clearTimeout(timer);
  }, []);

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const getGreeting = () => {
    const hour = new Date().getHours();
    let timeGreeting = "";
    if (hour < 12) timeGreeting = "Good Morning";
    else if (hour < 17) timeGreeting = "Good Afternoon";
    else if (hour < 21) timeGreeting = "Good Evening";
    else timeGreeting = "Good Night";
    
    return `Hi there, ${timeGreeting}`;
  };

  const projects = [
    {
      title: "Virtual Drawing Board",
      tech: "Python, OpenCV, NumPy",
      desc: "Interactive digital art tool capturing hand gestures through camera to translate physical movements into digital artwork.",
      link: "https://github.com/YashPise/Virtual-Drawing-Board-",
      video: "src/assets/project1.mp4" 
    },
    {
      title: "Object Detection System",
      tech: "Python, OpenCV, YOLO",
      desc: "Real-time object detection system utilizing YOLO model for enhanced safety in automotive applications.",
      link: "https://github.com/YashPise/Object-Detection-System",
      video: "src/assets/project2.mp4"
    },
    {
      title: "Movie Recommendation System",
      tech: "NLP, Streamlit, EDA, Python",
      desc: "ML-based engine suggesting movies using collaborative and content-based filtering methods.",
      link: "https://github.com/YashPise/Movie-Recommendation-System",
      video: "src/assets/project3.mp4"
    },
    {
      title: "PowerBI E-Commerce Dashboard",
      tech: "PowerBI, SQL, Excel",
      desc: "Interactive visualization of sales data, customer behavior, and product performance metrics.",
      link: "https://github.com/YashPise/PowerBI-Project-on-E-commerce-Sales",
      video: "src/assets/project4.mp4"
    }
  ];

  const skills = [
    { category: "Languages", items: ["Python", "C++", "SQL"], icon: Code },
    { category: "ML / AI", items: ["NLP", "Deep Learning", "Data Science", "Model Building", "OpenCV","Beautiful Soup"], icon: Brain },
    { category: "Data Engineering", items: ["PySpark", "Databricks", "ETL Pipelines", "Data Modeling","Big Data Processing"], icon: Layers },
    { category: "Databases", items: ["SQL", "PostgreSQL"], icon: Database },
    { category: "Tools  & Platforms", items: ["Databricks","Git", "GitHub", "Power BI", "AWS", "Informatica"], icon: Globe },
    { category: "Development", items: ["OOP", "Web Scraping", "API Development"], icon: Zap }
  ];

  const targetRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: projectScrollProgress } = useScroll({
    target: targetRef,
  });

  const xTransform = useTransform(projectScrollProgress, [0, 1], ["0%", "-65%"]);
  const x = useSpring(xTransform, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <div className="bg-black text-white selection:bg-white selection:text-black font-sans scroll-smooth">
      <AnimatePresence mode="wait">
        {isLoading && <LoadingScreen key="loader" />}
      </AnimatePresence>
      {/* Scroll Progress Bar */}
      <motion.div className="fixed top-0 left-0 right-0 h-1 bg-orange-500 z-50 origin-left" style={{ scaleX }} />

      {/* Background Video */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover opacity-82"
        >
          <source src="src/assets/background-video.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-transparent to-black" />
      </div>

      {/* Navigation */}
      <nav className="fixed top-0 w-full z-40 px-6 py-6 flex justify-between items-center backdrop-blur-sm bg-black/10">
        <div className="flex flex-col">
          <div className="font-display font-bold text-xl tracking-tighter">YASH.P</div>
          <div className="text-[8px] font-mono text-orange-500 uppercase tracking-widest">{getGreeting()}</div>
        </div>
        <div className="hidden md:flex gap-8 text-[10px] font-mono tracking-widest uppercase text-white/60">
          <a href="#about" className="hover:text-white transition-colors">About</a>
          <a href="#skills" className="hover:text-white transition-colors">Skills</a>
          <a href="#projects" className="hover:text-white transition-colors">Projects</a>
          <a href="#experience" className="hover:text-white transition-colors">Experience</a>
          <a href="#contact" className="hover:text-white transition-colors">Contact</a>
        </div>
        <div className="flex gap-4">
          <a href="https://github.com/YashPise" target="_blank" className="hover:text-orange-500 transition-colors"><Github size={18} /></a>
          <a href="https://www.linkedin.com/in/yash-pise-1b63b2277?original_referer=" target="_blank" className="hover:text-orange-500 transition-colors"><Linkedin size={18} /></a>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="about" className="relative min-h-screen flex flex-col justify-center px-6 md:px-12 z-10 pt-32 pb-32">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-left max-w-4xl"
          >
            <h1 className="text-6xl md:text-8xl lg:text-9xl font-black font-display tracking-tighter leading-[0.85] mb-8 uppercase">
              YASH <br />
              <span className="text-transparent [-webkit-text-stroke:1px_rgba(255,255,255,0.5)]">PISE</span>
            </h1>
            <p className="text-sm md:text-lg font-mono text-orange-500 tracking-[0.3em] uppercase mb-8">
              AI & Machine Learning Engineer
            </p>
            <div className="max-w-xl text-white/60 font-light leading-relaxed mb-12 text-sm md:text-base">
              I build data systems that actually matter.Currently working as a Data Engineer at ZS, I work on large-scale data pipelines, MDM systems, and data quality frameworks using PySpark and Databricks.
              Alongside data engineering, I enjoy working with AI/ML — building models, experimenting with NLP, and creating intelligent applications where data meets decision-making.
            </div>
            <div className="flex flex-wrap justify-start gap-6">
              <a href="#projects" className="px-8 py-4 bg-white text-black font-display font-bold text-xs tracking-widest uppercase hover:bg-orange-500 hover:text-white transition-all whitespace-nowrap">
                View Work
              </a>
              <a href="#contact" className="px-8 py-4 border border-white/20 font-display font-bold text-xs tracking-widest uppercase hover:border-white transition-all whitespace-nowrap">
                Contact Me
              </a>
            </div>
          </motion.div>
        </div>
        <motion.div 
          animate={{ y: [0, 10, 0] }} 
          transition={{ repeat: Infinity, duration: 2 }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2 text-white/30"
        >
          <ChevronDown size={32} />
        </motion.div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="relative py-32 px-6 z-10 bg-black/40 backdrop-blur-3xl overflow-hidden">
        <div className="container mx-auto">
          <div className="flex flex-col gap-16 items-start mb-16">
            <div className="w-full">
              <div className="relative inline-block mb-6">
                <h2 className="text-6xl md:text-8xl font-display font-black tracking-tighter uppercase leading-none opacity-10 absolute -top-6 -left-2 select-none pointer-events-none whitespace-nowrap" style={{ WebkitTextStroke: '1px rgba(255,255,255,0.4)', color: 'transparent' }}>
                  ARSENAL
                </h2>
                <h2 className="text-4xl md:text-6xl font-display font-black tracking-tighter uppercase relative z-10">
                  TECHNICAL<br />ARSENAL
                </h2>
              </div>
              <p className="text-white/50 font-light leading-relaxed max-w-2xl">
                A comprehensive suite of tools and languages mastered through rigorous coursework and hands-on project implementation.
              </p>
              
              <div className="mt-12 flex items-center gap-4 text-[10px] font-mono text-orange-500 tracking-widest uppercase">
                <div className="w-12 h-[1px] bg-orange-500/30" />
                Scroll to explore
              </div>
            </div>

            <div className="w-full">
              <div className="flex gap-12 overflow-x-auto no-scrollbar pb-12 px-4 -mx-4 snap-x snap-mandatory overflow-y-hidden">
                {skills.map((skill, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <SkillCard 
                      category={skill.category} 
                      items={skill.items} 
                      icon={skill.icon} 
                      autoFlipDelay={i * 600}
                    />
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Diagonal Marquee Section */}
      {/* CONTROL SPACING: Change 'py-24 md:py-48' to adjust space above/below */}
      <section className="relative h-[300px] md:h-[500px] flex items-center justify-center overflow-hidden z-20 pointer-events-none py-24 md:py-48">
        {/* Black Blurred Strip */}
        {/* CONTROL BLUR: Change 'blur-[5px]' to adjust blur intensity */}
        {/* CONTROL STRIP WIDTH: Change 'py-3 md:py-6' to adjust strip thickness */}
        <div className="absolute w-[150%] rotate-[-5.831deg] bg-black py-2 md:py-4 border-y border-white/10 blur-[4px] opacity-70">
           <Marquee 
             items={["SOFTWARE DEVELOPMENT", "DATA ENGINEERING","API DEVELOPMENT", "WEB SCRAPING", "DATA ANALYSIS"]} 
             speed={40} 
             reverse={true}
           />
        </div>
        {/* Orange Sharp Strip */}
        {/* CONTROL STRIP WIDTH: Change 'py-3 md:py-6' to adjust strip thickness */}
        <div className="absolute w-[150%] rotate-[9.139deg] bg-orange-500 py-3 md:py-6 shadow-[0_0_2rem_rgba(249,115,22,0.4)]">
           <Marquee 
             items={["AI & MACHINE LEARNING", "DATA SCIENCE", "MODEL BUILDING", "NLP", "COMPUTER VISION"]} 
             speed={30} 
           />
        </div>
      </section>

      {/* Projects Section */}
      <section ref={targetRef} id="projects" className="relative h-[400vh] z-10">
        <div className="sticky top-0 h-screen flex flex-col justify-center overflow-hidden">
          <div className="container mx-auto px-6 mb-12">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8">
              <div className="relative">
                <h2 className="text-7xl md:text-9xl font-display font-black tracking-tighter uppercase leading-none opacity-10 absolute -top-8 -left-2 select-none pointer-events-none whitespace-nowrap" style={{ WebkitTextStroke: '1px rgba(255,255,255,0.4)', color: 'transparent' }}>
                  SELECTED PROJECTS
                </h2>
                <h2 className="text-4xl md:text-6xl font-display font-black tracking-tighter uppercase relative z-10">
                  SELECTED<br />PROJECTS
                </h2>
              </div>
              
              <div className="hidden md:block text-right text-[10px] font-mono text-white/40 tracking-widest">
                SCROLL TO EXPLORE // 01-04
              </div>
            </div>
          </div>

          <motion.div 
            style={{ x, willChange: "transform" }}
            className="flex gap-8 px-[10vw]"
          >
            {projects.map((project, i) => (
              <motion.div 
                key={i}
                className="shrink-0 w-[85vw] md:w-[500px] group relative bg-gradient-to-br from-[#2a2a2a] via-[#1a1a1a] to-[#0a0a0a] border border-white/10 rounded-[2.5rem] overflow-hidden backdrop-blur-2xl transition-all hover:border-orange-500/40 shadow-2xl"
              >
                {/* Brushed Metal Texture Overlay */}
                <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/brushed-alum.png')]" />
                
                {/* Video Container */}
                <div className="relative aspect-video m-5 rounded-3xl overflow-hidden bg-black shadow-inner">
                  <video 
                    autoPlay 
                    loop 
                    muted 
                    playsInline 
                    className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity"
                  >
                    <source src={project.video} type="video/mp4" />
                  </video>
                  
                  {/* Video Label Overlay - Styled like screenshot */}
                  <div className="absolute bottom-5 left-5 bg-black/70 backdrop-blur-xl px-4 py-2 rounded-xl border border-white/10 shadow-lg">
                    <span className="text-[10px] font-mono tracking-[0.2em] font-bold uppercase text-white">
                      {project.title === "Object Detection System" ? "YOLO MODEL IN ACTION" : 
                       project.title === "Virtual Drawing Board" ? "LIVE GESTURE TRACKING" :
                       "PROJECT DEMONSTRATION"}
                    </span>
                  </div>
                </div>

                <div className="p-10 pt-2">
                  <div className="text-[10px] font-mono text-orange-500 tracking-[0.3em] mb-3 uppercase font-bold">{project.tech}</div>
                  <h3 className="text-3xl font-display font-black mb-5 tracking-tight">{project.title}</h3>
                  <p className="text-sm text-white/50 font-light leading-relaxed mb-10 line-clamp-3">
                    {project.desc}
                  </p>
                  
                  <div className="flex">
                    <a 
                      href={project.link} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="px-8 py-4 rounded-2xl bg-white/5 border border-white/10 flex items-center gap-3 text-[11px] font-mono tracking-[0.2em] font-bold uppercase hover:bg-orange-500 hover:border-orange-500 hover:text-white transition-all shadow-lg group/btn"
                    >
                      VIEW CASE STUDY <ArrowRight size={16} className="group-hover/btn:translate-x-1 transition-transform" />
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Experience & Education */}
      <section id="experience" className="relative py-32 px-6 z-10 bg-black/40 backdrop-blur-3xl">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24">
            {/* Experience */}
            <div>
              <div className="flex items-center gap-4 mb-12">
                <Briefcase className="text-orange-500" />
                <h2 className="text-3xl font-display font-black tracking-tighter uppercase">Experience</h2>
              </div>
              <div className="space-y-12">
                <div className="relative pl-8 border-l border-white/10">
                  <div className="absolute top-0 left-[-5px] w-[9px] h-[9px] rounded-full bg-orange-500" />
                  <div className="text-[10px] font-mono text-white/40 mb-2">NOV 2025 — PRESENT</div>
                  <h3 className="text-xl font-bold mb-1">Data Engineer (Associate)</h3>
                  <div className="text-sm text-orange-500 mb-4">ZS Associates, Pune</div>
                  <ul className="text-sm text-white/60 font-light space-y-2">
                    <li>• Built and optimized complex ETL pipelines using PySpark and Databricks for large-scale data processing.</li>
                    <li>• Developed a Master Data Management (MDM) Streamlit application for data stewardship, enabling efficient data validation and business rule enforcement.</li>
                    <li>• Designed and implemented data quality (DQ) frameworks to ensure data integrity and consistency across pipelines.</li>
                  </ul>
                </div>
                <div className="relative pl-8 border-l border-white/10">
                  <div className="absolute top-0 left-[-5px] w-[9px] h-[9px] rounded-full bg-white/20" />
                  <div className="text-[10px] font-mono text-white/40 mb-2">JAN 2024 — MAR 2024</div>
                  <h3 className="text-xl font-bold mb-1">Data Science Intern</h3>
                  <div className="text-sm text-orange-500 mb-4">AI Adventures, Pune</div>
                  <ul className="text-sm text-white/60 font-light space-y-2">
                    <li>• Conducted EDA on large datasets to uncover insights.</li>
                    <li>• Utilized Beautiful Soup for web scraping IMDb data.</li>
                    <li>• Analyzed weather forecasting data using Python.</li>
                  </ul>
                </div>
                <div className="relative pl-8 border-l border-white/10">
                  <div className="absolute top-0 left-[-5px] w-[9px] h-[9px] rounded-full bg-white/20" />
                  <h3 className="text-xl font-bold mb-1">Machine Learning Intern</h3>
                  <div className="text-sm text-orange-500 mb-4">AICTE</div>
                  <ul className="text-sm text-white/60 font-light space-y-2">
                    <li>• Completed AWS Cloud & ML Foundations training.</li>
                    <li>• Applied AWS services for deploying ML models.</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Education */}
            <div>
              <div className="flex items-center gap-4 mb-12">
                <GraduationCap className="text-orange-500" />
                <h2 className="text-3xl font-display font-black tracking-tighter uppercase">Education</h2>
              </div>
              <div className="space-y-12">
                <div className="relative pl-8 border-l border-white/10">
                  <div className="absolute top-0 left-[-5px] w-[9px] h-[9px] rounded-full bg-orange-500" />
                  <div className="text-[10px] font-mono text-white/40 mb-2">2020 — 2024</div>
                  <h3 className="text-xl font-bold mb-1">BE in AI & Machine Learning</h3>
                  <div className="text-sm text-orange-500 mb-2">PES Modern College of Engineering, Pune</div>
                  <div className="text-xs font-mono text-white/40">CGPA: 8.75</div>
                </div>
                <div className="relative pl-8 border-l border-white/10">
                  <div className="absolute top-0 left-[-5px] w-[9px] h-[9px] rounded-full bg-white/20" />
                  <div className="text-[10px] font-mono text-white/40 mb-2">2020</div>
                  <h3 className="text-xl font-bold mb-1">HSC (60%)</h3>
                  <div className="text-sm text-orange-500">D.P Mehta Jr. College, Lonavala</div>
                </div>
                <div className="relative pl-8 border-l border-white/10">
                  <div className="absolute top-0 left-[-5px] w-[9px] h-[9px] rounded-full bg-white/20" />
                  <div className="text-[10px] font-mono text-white/40 mb-2">2018</div>
                  <h3 className="text-xl font-bold mb-1">SSC (80.60%)</h3>
                  <div className="text-sm text-orange-500 mb-2">Don Bosco High School, Lonavala</div>
                  <ul className="text-sm text-white/60 font-light space-y-2">
                    <li>• Achieved distinction with a focus on Mathematics and Science.</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Interests & Achievements */}
      <section className="relative py-32 px-6 z-10">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 border border-white/10 bg-white/5 rounded-3xl">
              <Trophy className="text-orange-500 mb-6" size={32} />
              <h3 className="text-xl font-display font-bold mb-4 uppercase">Esports</h3>
              <p className="text-sm text-white/60 font-light">Battlegrounds Mobile India (AIR-270). High-level strategic thinking and performance under pressure.</p>
            </div>
            <div className="p-8 border border-white/10 bg-white/5 rounded-3xl">
              <Palette className="text-orange-500 mb-6" size={32} />
              <h3 className="text-xl font-display font-bold mb-4 uppercase">Drawing</h3>
              <p className="text-sm text-white/60 font-light">Interschool 1st Ranker. Keen eye for detail, composition, and visual storytelling.</p>
            </div>
            <div className="p-8 border border-white/10 bg-white/5 rounded-3xl">
              <Award className="text-orange-500 mb-6" size={32} />
              <h3 className="text-xl font-display font-bold mb-4 uppercase">Cricket</h3>
              <p className="text-sm text-white/60 font-light">Playing at City Level. Team collaboration, discipline, and competitive drive.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="relative py-32 px-6 z-10 border-t border-white/10">
        <div className="container mx-auto text-center">
          <h2 className="text-5xl md:text-8xl font-display font-black tracking-tighter uppercase mb-12">Get In<br />Touch</h2>
          <div className="flex flex-col md:flex-row justify-center gap-8 mb-16">
            <a href="mailto:yashpise2002@gmail.com" className="flex items-center gap-3 px-8 py-4 bg-white/5 border border-white/10 rounded-full hover:border-orange-500 transition-all">
              <Mail size={18} className="text-orange-500" />
              <span className="text-sm font-mono">yashpise2002@gmail.com</span>
            </a>
            <div className="flex items-center gap-3 px-8 py-4 bg-white/5 border border-white/10 rounded-full">
              <Globe size={18} className="text-orange-500" />
              <span className="text-sm font-mono">Pune, India</span>
            </div>
            <div className="flex items-center gap-3 px-8 py-4 bg-white/5 border border-white/10 rounded-full">
              <Phone size={18} className="text-orange-500" />
              <span className="text-sm font-mono">+91 9028353013</span>
            </div>
          </div>
          <div className="text-[12px] blur-[0.10px] font-mono text-white/40 tracking-[0.5em] uppercase">
            © 2026 YASH MAHENDRA PISE // ALL RIGHTS RESERVED
          </div>
        </div>
      </section>

      {/* Decorative background elements */}
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] md:w-[800px] h-[300px] md:h-[800px] bg-orange-500/5 rounded-full blur-[80px] md:blur-[120px] pointer-events-none" />
    </div>
  );
}
