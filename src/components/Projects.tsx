import { useState, useEffect, useRef } from 'react';
import { ExternalLink, Github, ChevronLeft, ChevronRight, Code, Rocket, Database } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const Projects = () => {
  const [currentProject, setCurrentProject] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [direction, setDirection] = useState('right');
  const autoPlayRef = useRef(null);
  const touchStartRef = useRef(0);
  const touchEndRef = useRef(0);

  const projects = [
    {
      id: 1,
      title: 'Cross-Domain Healthcare Recommender',
      shortTitle: 'Healthcare AI',
      description: 'Built a cross-recommendation system linking nutrition and yoga using disease-specific embeddings. Generated synthetic meal and activity data with multiple LLMs (DistilGPT, LLaMA, Nous Hermes, Mistral Instruct).',
      icon: <Database className="w-8 h-8" />,
      color: 'from-blue-500/20 to-purple-500/20',
      tags: ['Python', 'LLMs', 'Healthcare', 'NLP', 'Recommendation Systems'],
      github: 'https://github.com/kshitizsikriwal/healthcare-recommender',
      demo: '#',
      highlights: [
        'Disease-specific embeddings for nutrition-yoga linking',
        'Multi-LLM synthetic data generation',
        'Performance evaluation through similarity metrics'
      ],
      metrics: {
        accuracy: '90%',
        data: 'Synthetic',
        models: '2 LLMs'
      }
    },
    {
      id: 2,
      title: 'SustainaBot - Sustainability Chatbot',
      shortTitle: 'SustainaBot',
      description: 'Developed a RAG chatbot with FastAPI, LangChain, and FAISS for sustainability research papers and reports using Sentence-Transformer embeddings. Integrated Ollama LLM Mistral 7B for context-aware answers.',
      icon: <Rocket className="w-8 h-8" />,
      color: 'from-green-500/20 to-emerald-500/20',
      tags: ['FastAPI', 'LangChain', 'FAISS', 'RAG', 'Sustainability'],
      github: 'https://github.com/kshitizsikriwal/sustainabot',
      demo: '#',
      highlights: [
        'RAG implementation with FAISS vector database',
        'Sentence-Transformer embeddings',
        'Context-aware sustainability insights'
      ],
      metrics: {
        responseTime: '<2s',
        documents: '50+',
        accuracy: '92%'
      }
    },
    {
      id: 3,
      title: 'Hospital Readmission Analysis',
      shortTitle: 'Healthcare Analytics',
      description: 'Designed SQL queries to analyze structured datasets (retail, healthcare). Built Tableau dashboards to visualize KPIs like sales trends and customer segmentation for data-driven insights.',
      icon: <Code className="w-8 h-8" />,
      color: 'from-orange-500/20 to-red-500/20',
      tags: ['SQL', 'Tableau', 'Healthcare Analytics', 'Data Visualization'],
      github: 'https://github.com/kshitizsikriwal/hospital-analysis',
      demo: '#',
      highlights: [
        'Complex SQL query optimization',
        'Interactive Tableau dashboards',
        'Healthcare KPI visualization'
      ],
      metrics: {
        queries: '50+',
        dashboards: '12',
        insights: '10+'
      }
    },
    {
      id: 4,
      title: 'CLI based CryptoTrading-bot',
      shortTitle: 'Trading-bot',
      description: 'Developed a crypto trading bot with both CLI and Streamlit interfaces. The bot connects to Binance Testnet for safe strategy simulation, featuring real-time dashboards, configurable parameters, and performance monitoring.',
      icon: <Code className="w-8 h-8" />,
      color: 'from-pink-500/20 to-purple-500/20',
     tags: ["Python", "Streamlit", "Binance API", "Trading Strategies", "CLI"],
      github: 'https://github.com/Kshitizsikriwal/trading-bot',
      demo: 'https://trading-bot-xjmzvnkhd2hfpnhe5waerg.streamlit.app/',
      highlights: [
        'CLI and Streamlit interfaces',
        'Binance Testnet integration',
        'Trading strategy simulation and monitoring'
      ],
      metrics: {
        queries: '5+',
        dashboards: '2',
        insights: '6+'
      }
    }
  ];

  // Auto-play setup (runs only once on mount)
  useEffect(() => {
    autoPlayRef.current = setInterval(() => handleNext(), 5000);
    return () => autoPlayRef.current && clearInterval(autoPlayRef.current);
  }, []);

  const handleMouseEnter = () => autoPlayRef.current && clearInterval(autoPlayRef.current);
  const handleMouseLeave = () => autoPlayRef.current = setInterval(() => handleNext(), 5000);

  const handleNext = () => {
    if (!isAnimating) {
      setIsAnimating(true);
      setDirection('right');
      setTimeout(() => {
        setCurrentProject((prev) => (prev + 1) % projects.length);
        setIsAnimating(false);
      }, 300);
    }
  };

  const handlePrev = () => {
    if (!isAnimating) {
      setIsAnimating(true);
      setDirection('left');
      setTimeout(() => {
        setCurrentProject((prev) => (prev - 1 + projects.length) % projects.length);
        setIsAnimating(false);
      }, 300);
    }
  };

  const goToProject = (index) => {
    if (index !== currentProject && !isAnimating) {
      setIsAnimating(true);
      setDirection(index > currentProject ? 'right' : 'left');
      setTimeout(() => {
        setCurrentProject(index);
        setIsAnimating(false);
      }, 300);
    }
  };

  const handleTouchStart = (e) => {
    touchStartRef.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e) => {
    touchEndRef.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!touchStartRef.current || !touchEndRef.current) return;
    
    const distance = touchStartRef.current - touchEndRef.current;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) handleNext();
    if (isRightSwipe) handlePrev();
  };

  const currentData = projects[currentProject];

  return (
    <section id="projects" className="py-10 bg-background overflow-hidden border-none">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 gradient-primary-text">
              Featured Projects
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Showcasing innovative data science and AI projects that solve real-world problems 
              through cutting-edge technology and research.
            </p>
          </div>

          <div 
            className="relative"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            <Card className="bg-card/50 glow-border overflow-hidden">
              <div className="grid lg:grid-cols-2 gap-0 relative min-h-[500px]">
                <div className={`relative bg-gradient-to-br ${currentData.color} flex items-center justify-center overflow-hidden`}>
                  <div className="absolute inset-0 opacity-10">
                    <div className="absolute inset-0 bg-gradient-primary/5 grid-pattern animate-pulse"></div>
                  </div>
                  <div className={`relative z-10 text-center transition-all duration-500 transform ${
                    isAnimating 
                      ? direction === 'right' ? '-translate-x-full opacity-0' : 'translate-x-full opacity-0'
                      : 'translate-x-0 opacity-100'
                  }`}>
                    <div className="mb-6 text-primary/80">{currentData.icon}</div>
                    <div className="text-6xl lg:text-8xl font-bold gradient-text">
                      {String(currentProject + 1).padStart(2, '0')}
                    </div>
                    <div className="mt-4 text-lg font-medium text-foreground/60">
                      {currentData.shortTitle}
                    </div>
                  </div>
                  <div className="absolute top-10 left-10 w-20 h-20 bg-primary/10 rounded-full animate-float"></div>
                  <div className="absolute bottom-10 right-10 w-32 h-32 bg-primary/5 rounded-full animate-float-delayed"></div>
                </div>

                <div className="p-8 lg:p-12 relative">
                  <div className={`transition-all duration-500 transform ${
                    isAnimating 
                      ? direction === 'right' ? 'translate-x-full opacity-0' : '-translate-x-full opacity-0'
                      : 'translate-x-0 opacity-100'
                  }`}>
                    <div className="flex items-center justify-between mb-6">
                      <Badge variant="outline" className="text-primary border-primary/30">
                        Project {currentProject + 1} of {projects.length}
                      </Badge>
                      <div className="flex gap-2">
                        <Button variant="ghost" size="icon" onClick={handlePrev} disabled={isAnimating}>
                          <ChevronLeft size={20} />
                        </Button>
                        <Button variant="ghost" size="icon" onClick={handleNext} disabled={isAnimating}>
                          <ChevronRight size={20} />
                        </Button>
                      </div>
                    </div>

                    <h3 className="text-2xl lg:text-3xl font-bold mb-4 gradient-text">{currentData.title}</h3>

                    <p className="text-muted-foreground mb-6 leading-relaxed">{currentData.description}</p>

                    <div className="grid grid-cols-3 gap-3 mb-6">
                      {Object.entries(currentData.metrics).map(([key, value], index) => (
                        <div key={key} className="text-center p-3 bg-muted/30 rounded-lg">
                          <div className="text-lg font-bold text-primary">{value}</div>
                          <div className="text-xs text-muted-foreground capitalize">{key}</div>
                        </div>
                      ))}
                    </div>

                    <div className="mb-6">
                      <h4 className="font-semibold mb-3 text-foreground">Key Features:</h4>
                      <ul className="space-y-2">
                        {currentData.highlights.map((highlight, index) => (
                          <li key={index} className="text-sm text-muted-foreground flex items-start gap-2 animate-slide-in">
                            <span className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"></span>
                            {highlight}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="flex flex-wrap gap-2 mb-6">
                      {currentData.tags.map((tag, index) => (
                        <Badge key={index} variant="secondary" className="text-xs animate-fade-in">
                          {tag}
                        </Badge>
                      ))}
                    </div>

                    <div className="flex gap-4">
                      <Button variant="outline" size="sm" asChild>
                        <a href={currentData.github} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                          <Github size={16} /> View Code
                        </a>
                      </Button>
                      <Button size="sm" className="bg-gradient-primary" asChild>
                        <a href={currentData.demo} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                          <ExternalLink size={16} /> Live Demo
                        </a>
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </Card>

            <div className="flex justify-center mt-8 gap-3">
              {projects.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToProject(index)}
                  className="group relative"
                  disabled={isAnimating}
                  aria-label={`Go to project ${index + 1}`}
                >
                  <div className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentProject 
                      ? 'bg-primary scale-125 shadow-lg shadow-primary/50' 
                      : 'bg-muted-foreground/30 hover:bg-muted-foreground/50 hover:scale-110'
                  }`} />
                  <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                    <div className="bg-popover text-popover-foreground text-xs px-2 py-1 rounded whitespace-nowrap">
                      {projects[index].shortTitle}
                    </div>
                  </div>
                </button>
              ))}
            </div>

            <div className="mt-4 h-1 bg-muted rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-primary transition-all duration-300"
                style={{ width: `${((currentProject + 1) / projects.length) * 100}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }

        @keyframes float-delayed {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-15px); }
        }

        @keyframes slide-in {
          from { opacity: 0; transform: translateX(-10px); }
          to { opacity: 1; transform: translateX(0); }
        }

        @keyframes fade-in {
          from { opacity: 0; transform: translateY(5px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .animate-float {
          animation: float 6s ease-in-out infinite;
        }

        .animate-float-delayed {
          animation: float-delayed 8s ease-in-out infinite;
          animation-delay: 1s;
        }

        .animate-slide-in {
          animation: slide-in 0.5s ease-out forwards;
        }

        .animate-fade-in {
          animation: fade-in 0.5s ease-out forwards;
        }

        .grid-pattern {
          background-image: 
            linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px);
          background-size: 50px 50px;
        }
      `}</style>
    </section>
  );
};

export default Projects;
