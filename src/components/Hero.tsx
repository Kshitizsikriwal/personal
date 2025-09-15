import { useState, useEffect } from 'react';
import { ArrowDown, Github, Linkedin, Mail, Twitter } from 'lucide-react';

const Hero = () => {
  const [displayText, setDisplayText] = useState('');
  const roles = ['Data Scientist', 'Data Analyst', 'ML Researcher',];
  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(true);

  // Typing effect
  useEffect(() => {
    const currentRole = roles[currentRoleIndex];
    let timeout: ReturnType<typeof setTimeout>;

    if (isTyping) {
      if (displayText.length < currentRole.length) {
        timeout = setTimeout(() => {
          setDisplayText(currentRole.slice(0, displayText.length + 1));
        }, 100);
      } else {
        timeout = setTimeout(() => setIsTyping(false), 2000);
      }
    } else {
      if (displayText.length > 0) {
        timeout = setTimeout(() => {
          setDisplayText(displayText.slice(0, -1));
        }, 50);
      } else {
        setCurrentRoleIndex((prev) => (prev + 1) % roles.length);
        setIsTyping(true);
      }
    }

    return () => clearTimeout(timeout);
  }, [displayText, isTyping, currentRoleIndex, roles]);

  // Social links
  const socialLinks = [
    { icon: Github, href: 'https://github.com/kshitizsikriwal', label: 'GitHub' },
    { icon: Linkedin, href: 'https://linkedin.com/in/kshitizsikriwal', label: 'LinkedIn' },
    { icon: Twitter, href: 'https://twitter.com/kshitizsikriwal', label: 'Twitter' },
    { icon: Mail, href: 'mailto:kshitizsikriwal16@gmail.com', label: 'Email' }
  ];

  // Scroll helper
  const scrollToAbout = () => {
    const aboutSection = document.querySelector('#about');
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Play video once
  const handlePlayVideo = () => {
    const video = document.getElementById('profile-video') as HTMLVideoElement | null;
    const overlay = document.getElementById('play-overlay') as HTMLDivElement | null;
    const initials = document.getElementById('fallback-initials') as HTMLDivElement | null;

    if (video) {
      try {
        video.currentTime = 0;
        video.loop = false;
        video.play();
        if (overlay) overlay.style.display = 'none';
        if (initials) initials.style.display = 'none';
      } catch {
        // noop
      }
    }
  };

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      <section id="home" className="relative z-10 min-h-screen flex items-center">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            
            {/* Left Content */}
            <div className="space-y-6 lg:space-y-8 order-2 lg:order-1 ml-6 sm:ml-10 lg:ml-18 mt-18 sm:mt-26 lg:mt-32">
              
              {/* Name + Title */}
              <div className="space-y-2 lg:space-y-4">
                <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight">
                  <span className="text-white">Kshitiz Sikriwal</span>
                </h1>
                <h2 className="text-xl sm:text-2xl lg:text-3xl text-gray-400 font-light">
                  Data Scientist and Analysts
                </h2>
              </div>

              {/* Animated Role */}
              <div className="text-lg sm:text-xl lg:text-2xl h-8 flex items-center">
                <span className="text-gray-400">I'm a </span>
                <span className="text-white ml-2 font-medium">
                  {displayText}
                  <span className="animate-pulse text-blue-400">|</span>
                </span>
              </div>

              {/* Description */}
              <div className="space-y-4 max-w-xl">
                <p className="text-base sm:text-lg text-gray-300 leading-relaxed">
                  Hello there! My name is Kshitiz and I'm a Fresher Data Scientist specializing in 
                  healthcare analytics, living in India. I grew up with technology and love 
                  transforming complex data into actionable insights.
                </p>

                <p className="text-base sm:text-lg text-gray-300 leading-relaxed">
                  In my experience I have designed ML models and experiences, planned, supported, and 
                  implemented features and roadmaps, and led cross-functional teams at companies like{' '}
                  <span className="text-white font-medium">NIT Kurukshetra</span>,{' '}
                  <span className="text-white font-medium">Urja Mobility</span>, and{' '}
                  <span className="text-white font-medium">various startups</span>.
                </p>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <button
                  className="bg-white text-black hover:bg-gray-200 font-medium px-8 py-3 rounded-lg transition-all duration-300 hover:scale-105 shadow-lg"
                  onClick={() => document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  View My Work
                </button>
                <button
                  className="border border-gray-600 hover:border-gray-400 text-white hover:bg-gray-800 font-medium px-8 py-3 rounded-lg transition-all duration-300"
                  onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  Get In Touch
                </button>
              </div>

              {/* Social Links */}
              <div className="flex space-x-4 pt-6">
                {socialLinks.map(({ icon: Icon, href, label }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full bg-gray-800 border border-gray-700 flex items-center justify-center text-gray-400 hover:text-white hover:bg-gray-700 hover:border-gray-600 transition-all duration-300 group"
                    aria-label={label}
                  >
                    <Icon size={18} />
                  </a>
                ))}
              </div>
            </div>

            {/* Right Content - Profile Image with Playable Video */}
            <div className="flex justify-center lg:justify-evenly order-10 lg:order-2 mb-12 lg:mb-0">
              <div className="relative">
                {/* Animated ring effect */}
                <div className="relative w-64 h-64 sm:w-80 sm:h-80 lg:w-96 lg:h-96">
                  <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 animate-spin-slow opacity-75 blur-sm"></div>
                  <div className="absolute inset-2 rounded-full bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 animate-spin-reverse opacity-60"></div>

                  {/* Profile container */}
                  <div className="absolute inset-4 rounded-full bg-gradient-to-br from-gray-800 to-gray-900 p-1 shadow-2xl">
                    <div className="w-full h-full rounded-full bg-gradient-to-br from-gray-700 to-gray-800 flex items-center justify-center relative overflow-hidden">
                      
                      {/* Video inside circular mask */}
                      <video
                        id="profile-video"
                        className="absolute inset-0 w-full h-full object-cover rounded-full"
                        src="/assets/Avatar IV Video.mp4"
                        playsInline
                        preload="metadata"
                      />

                      {/* Fallback initials */}
                      <div
                        id="fallback-initials"
                        className="absolute inset-0 flex items-center justify-center pointer-events-none"
                      >
                        {/* <span className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white">KS</span> */}
                      </div>

                      <div className="relative w-full h-full">
  {/* <img 
    src="/your-image.png" 
    alt="Intro" 
    className="w-full h-auto rounded-lg"
  /> */}

  <button
    aria-label="Play intro video"
    className="
      absolute bottom-6 left-1/2 -translate-x-1/2
      w-16 h-16 sm:w-20 sm:h-20
      rounded-full flex items-center justify-center
      bg-white/20 hover:bg-white/30
      backdrop-blur-md shadow-lg
      transition-all duration-300 cursor-pointer
    "
    onClick={handlePlayVideo}
  >
    {/* Play Icon */}
    <div className="ml-1 w-0 h-0 border-l-[12px] border-t-[8px] border-b-[8px] 
                    border-l-white border-t-transparent border-b-transparent"></div>
  </button>
</div>

                    </div>
                  </div>
                </div>

                {/* Decorative text */}
                <div className="absolute -bottom-2 -right-4 sm:-bottom-4 sm:-right-8 text-xs sm:text-sm text-gray-500 italic transform rotate-12 font-handwriting">
                  Let me introduce<br />myself
                </div>
                <div className="absolute -bottom-6 left-2 sm:-bottom-8 sm:left-4 text-xs text-gray-500 italic">
                  (Data Scientist and Data Analyst)
                </div>
              </div>
            </div>
          </div>

          {/* Scroll Indicator */}
          <div className="flex justify-center mt-12 lg:mt-16">
            <button
              onClick={scrollToAbout}
              className="animate-bounce text-gray-400 hover:text-white transition-colors duration-300"
              aria-label="Scroll to about section"
            >
              <ArrowDown size={24} />
            </button>
          </div>
        </div>
      </section>

      <style>{`
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes spin-reverse {
          from { transform: rotate(360deg); }
          to { transform: rotate(0deg); }
        }
        .animate-spin-slow {
          animation: spin-slow 20s linear infinite;
        }
        .animate-spin-reverse {
          animation: spin-reverse 15s linear infinite;
        }
        .font-handwriting {
          font-family: 'Brush Script MT', cursive;
        }
        ::-webkit-scrollbar { width: 8px; }
        ::-webkit-scrollbar-track { background: #1a1a1a; }
        ::-webkit-scrollbar-thumb { background: #4a4a4a; border-radius: 4px; }
        ::-webkit-scrollbar-thumb:hover { background: #6a6a6a; }
      `}</style>
    </div>
  );
};

export default Hero;
