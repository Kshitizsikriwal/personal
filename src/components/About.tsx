import { Code, Database, Brain, TrendingUp, Award, MapPin, GraduationCap, Building, Users, ExternalLink, Target, BookOpen, BrainCircuit } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';

// --- DATA DEFINITIONS ---
// By moving static data outside the component, we prevent it from being redeclared on every render.

const skills = [
  { category: 'Programming & Machine Learning', icon: Code, color: 'from-blue-500 to-indigo-600', items: ['Python', 'PyTorch', 'TensorFlow', 'Transformers', 'Scikit-learn', 'Pandas', 'NumPy'] },
  { category: 'Data Analytics & Visualization', icon: TrendingUp, color: 'from-purple-500 to-pink-600', items: ['SQL', 'Tableau', 'Power BI', 'Excel', 'Matplotlib', 'Seaborn', 'Plotly'] },
  { category: 'AI & Research Technologies', icon: Brain, color: 'from-cyan-500 to-blue-600', items: ['NLP', 'Deep Learning', 'LLMs', 'Research Methodology', 'Statistical Analysis', 'A/B Testing'] },
  { category: 'Development & Cloud Tools', icon: Database, color: 'from-orange-500 to-red-600', items: ['FastAPI', 'LangChain', 'Hugging Face', 'Streamlit', 'Git', 'Docker', 'AWS', 'Jupyter', 'React'] }
];

const achievements = [
  { logo: "/logo/iwmi.png", title: 'IWMI Innovation Challenge', description: 'Developed an application under the circular bio-economy theme for efficient collection of agricultural waste.', year: '2024', category: 'Innovation', certificateLink: 'https://drive.google.com/file/d/1BJDh2YjsdSuqVRWmW9BDJ5bRorwRnkqM/view?usp=sharing' },
  { logo: "/logo/iit.png", title: 'Asteroid Venture – NSSC', description: 'Studied asteroid compositions, built mineral-based visualizations, and proposed a framework for potential asteroid mining.', year: '2023', category: 'Competition', certificateLink: 'https://drive.google.com/file/d/1tZr1d0MhcPVj4R-0xUUXhprD6W8q5aO5/view?usp=sharing' },
  { logo: "/logo/google.png", title: 'Google AI Study Program', description: 'Completed advanced study program focusing on machine learning trends, applications, and emerging AI technologies in various industries.', year: '2023', category: 'Professional', certificateLink: 'https://drive.google.com/file/d/1Qfz5JiuJFhjnLGpyGXCXBRkJTHw3X-cf/view?usp=sharing' },
  { logo: "/logo/iit.png", title: 'Student Ambassador - IIT Kharagpur', description: 'Served as Student Ambassador for NSSC 2023, promoting institutional initiatives and facilitating student engagement in national-level programs.', year: '2023-2025', category: 'Leadership', certificateLink: '#' }
];

const backgroundInfo = [
  { icon: GraduationCap, label: 'Education', value: 'B.Tech Computer Science & Technology', subtitle: 'Central University of Haryana', details: 'Nov 2022 - Dec 2025 | Top 10% of Class', link: '#' },
  { icon: MapPin, label: 'Location', value: 'Gurugram, Haryana, India', subtitle: 'Available for Remote & On-site Work', details: 'Open to relocation opportunities', link: null },
  { icon: Building, label: 'Last Position', value: 'Data Science Research Intern', subtitle: 'National Institute of Technology, Kurukshetra', details: 'June 2025 - Augut 2025 | Healthcare Analytics Focus', link: 'https://drive.google.com/file/d/1WLq3QDrbmm7aPCpzxSA0W4MV9t32CZOt/view?usp=share_link' },
  { icon: Users, label: 'Research Work', value: 'Healthcare Analytics & AI Systems', subtitle: 'NLP, Recommendation Systems, LLMs', details: 'Cross-domain healthcare applications', link: null }
];

const researchAreas = [
  { title: 'Healthcare Recommendation Systems', description: 'Developing cross-domain recommendation systems linking nutrition and physical activity using disease-specific embeddings and multiple LLM architectures.', technologies: ['Mistral-7B', 'Nous-Hermes-2', 'BERT', 'Cosine Similarity', 'Latent Space Analysis'] },
  { title: 'Interested in Conversational AI', description: 'Building RAG-based chatbots for sustainability research using FAISS vector databases and Sentence-Transformer embeddings for context-aware responses.', technologies: ['FastAPI', 'LangChain', 'FAISS', 'Ollama', 'RAG Architecture'] },
];

// --- SUB-COMPONENTS ---
// Breaking the UI into smaller pieces makes the code easier to understand and manage.

/**
 * Renders the animated, decorative background elements for the section.
 */
const DecorativeBackground = () => (
  <>
    <div className="absolute inset-0 opacity-30">
      <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500/20 rounded-full filter blur-3xl animate-pulse"></div>
      <div className="absolute bottom-32 right-10 w-96 h-96 bg-purple-500/20 rounded-full filter blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-cyan-500/15 rounded-full filter blur-3xl animate-pulse" style={{ animationDelay: '4s' }}></div>
    </div>
    <div className="absolute inset-0 opacity-5">
      <div className="w-full h-full" style={{ backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`, backgroundSize: '50px 50px' }}></div>
    </div>
  </>
);

/**
 * Renders the main header for the "About Me" section.
 */
const AboutHeader = () => (
  <div className="text-center mb-12 sm:mb-20">
    <h2 className="text-4xl sm:text-5xl lg:text-6xl font-light mb-6 text-white">
      About <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">Me</span>
    </h2>
    <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-cyan-500 mx-auto mb-8"></div>
    <p className="text-lg sm:text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
      A Data Scientist and Analyst with a focus on developing impactful AI solutions. 
      My research experience at NIT Kurukshetra includes building cross-domain healthcare recommender systems 
      using LLMs like Mistral-7B and BERT embeddings. At Urja Mobility, I led A/B testing of UI components that 
      successfully increased user conversion rates. Proficient in Python, SQL, and Tableau, I am now seeking 
      full-time Data Science and Research roles.
    </p>
  </div>
);


// --- MAIN COMPONENT ---
// The main component is now much cleaner, focusing only on the layout and structure.

const About = () => {
  return (
    <section id="about" className="py-20 bg-gray-950 text-white relative overflow-hidden">
      <DecorativeBackground />

      <div className="container mx-auto px-6 sm:px-8 lg:px-16 xl:px-24 max-w-7xl relative z-10">
        <AboutHeader />

        <div className="grid lg:grid-cols-12 gap-8 lg:gap-16 items-start">
          {/* Left Column */}
          <div className="lg:col-span-5 space-y-8 sm:space-y-12">
            <h3 className="text-2xl sm:text-3xl font-light text-white flex items-center">
              <Target className="mr-3 text-blue-400" size={28} />
              Professional Background
            </h3>
            {backgroundInfo.map((info, index) => (
              <Card key={index} className="bg-gray-900/40 backdrop-blur-sm border border-gray-800 hover:border-gray-700 transition-all duration-300 group">
                <CardContent className="p-4 sm:p-6 flex items-start gap-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-500 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                    <info.icon size={20} className="text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs uppercase tracking-wider text-gray-500 mb-1">{info.label}</p>
                    <p className="text-base sm:text-lg font-semibold text-white mb-1 break-words">{info.value}</p>
                    <p className="text-sm text-gray-400 mb-2">{info.subtitle}</p>
                    <p className="text-xs text-gray-500">{info.details}</p>
                    {info.link && (
                      <a href={info.link} target="_blank" rel="noopener noreferrer" className="inline-flex items-center text-xs text-blue-400 hover:text-blue-300 mt-2 transition-colors">
                        View Details <ExternalLink size={12} className="ml-1" />
                      </a>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Right Column */}
          <div className="lg:col-span-7 space-y-8 sm:space-y-12">
            <div>
              <h3 className="text-2xl sm:text-3xl font-light mb-6 sm:mb-8 text-white flex items-center">
                <Code className="mr-3 text-cyan-400" size={28} />
                Technical Skills
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                {skills.map((skill, index) => (
                  <Card key={index} className="bg-gray-900/40 backdrop-blur-sm border border-gray-800 hover:border-gray-700 transition-all duration-300 group">
                    <CardContent className="p-4 sm:p-6">
                      <div className="flex items-center mb-4">
                        <div className={`w-10 h-10 rounded-xl bg-gradient-to-r ${skill.color} flex items-center justify-center flex-shrink-0 mr-4 group-hover:scale-110 transition-transform`}>
                          <skill.icon size={20} className="text-white" />
                        </div>
                        <h4 className="text-base sm:text-lg font-semibold text-white flex-1">{skill.category}</h4>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {skill.items.map((item, i) => <Badge key={i} variant="secondary" className="bg-gray-800/60 border border-gray-700 text-gray-300 text-xs sm:text-sm font-normal">{item}</Badge>)}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
            <div>
              <h3 className="text-2xl sm:text-3xl font-light mb-6 sm:mb-8 text-white flex items-center">
                <BookOpen className="mr-3 text-purple-400" size={28} />
                Core Research Areas
              </h3>
              <div className="space-y-4 sm:space-y-6">
                {researchAreas.map((area, index) => (
                  <Card key={index} className="bg-gray-900/40 backdrop-blur-sm border border-gray-800 hover:border-gray-700 transition-all duration-300">
                    <CardContent className="p-4 sm:p-6">
                      <h4 className="text-base sm:text-lg font-semibold text-white mb-2">{area.title}</h4>
                      <p className="text-sm text-gray-400 mb-4">{area.description}</p>
                      <div className="flex flex-wrap gap-2">
                        {area.technologies.map((tech, i) => <Badge key={i} variant="outline" className="border-purple-500/50 text-purple-300 text-xs">{tech}</Badge>)}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-16 sm:mt-24">
          <h3 className="text-2xl sm:text-3xl font-light mb-6 sm:mb-8 text-white text-center flex items-center justify-center">
            <Award className="mr-3 text-yellow-400" size={28} />
            Key Achievements
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {achievements.map((ach, index) => (
              <Card key={index} className="flex flex-col bg-gray-900/40 backdrop-blur-sm border border-gray-800 hover:border-yellow-600/50 transition-all duration-300 group text-center">
                <CardContent className="p-6 flex flex-col items-center h-full">
                  <div className="w-16 h-16 mb-4 rounded-full bg-white/90 border border-gray-700 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                    <img src={ach.logo} alt={`${ach.title} logo`} className="h-8 object-contain" />
                  </div>
                  <h4 className="text-base font-semibold text-white mb-2">{ach.title}</h4>
                  <p className="text-sm text-gray-400 mb-4">{ach.description}</p>
                  <div className="flex items-center justify-between w-full mt-4">
                    <Badge variant="secondary" className="bg-gray-800/60 border-gray-700 text-gray-400 text-xs">{ach.category}</Badge>
                    <span className="text-xs text-gray-500">{ach.year}</span>
                  </div>
                  {ach.certificateLink && ach.certificateLink !== '#' && (
                    <a href={ach.certificateLink} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center w-full text-xs font-semibold text-yellow-400 mt-auto pt-4">
                      View Certificate <ExternalLink size={12} className="ml-1.5" />
                    </a>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
        
      </div>

      {/* The style block remains here as requested, affecting all components in this file */}
      <style>{`
        .mission-card::before { content: ''; position: absolute; left: 0; top: 0; width: 100%; height: 100%; background: radial-gradient(400px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(192, 132, 252, 0.15), transparent 80%); border-radius: inherit; opacity: 0; transition: opacity 0.4s ease-in-out; }
        .mission-card:hover::before { opacity: 1; }
        @keyframes fade-in-word { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
        .mission-word { display: inline-block; opacity: 0; animation: fade-in-word 0.5s ease forwards; }
        html { scroll-behavior: smooth; }
        button:focus-visible, a:focus-visible { outline: 2px solid #3b82f6; outline-offset: 2px; }
      `}</style>
    </section>
  );
};

export default About;