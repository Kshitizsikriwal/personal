import Navigation from '@/components/Navigation';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Projects from '@/components/Projects';
import Experience from '@/components/Experience';
import Testimonials from '@/components/Testimonials';
import Blog from '@/components/Blog';
import Contact from '@/components/Contact';
import ChatBot from '@/components/ChatBot';

const Portfolio = () => {
  return (
    <div className="min-h-screen bg-background smooth-scroll">
      {/* Navigation */}
      <Navigation />
      
      {/* Main Content */}
      <main className="smooth-scroll">
        <Hero />
        <About />
        <Projects />
        <Experience />
        <Testimonials />
        <Blog />
        <Contact />
      </main>
      
      {/* Footer */}
      <footer className="bg-card/30 border-t border-border/50 py-8">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div>
              <p className="text-muted-foreground text-sm">
                © 2024 Kshitiz Sikriwal. All rights reserved.
              </p>
            </div>
            <div className="flex items-center gap-6 text-sm text-muted-foreground">
              <a href="mailto:kshitizsikriwal16@gmail.com" className="hover:text-foreground transition-colors">
                Email
              </a>
              <a href="https://linkedin.com/in/kshitizsikriwal" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors">
                LinkedIn
              </a>
              <a href="https://github.com/kshitizsikriwal" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors">
                GitHub
              </a>
            </div>
          </div>
        </div>
      </footer>
      
      {/* AI Chatbot */}
      <ChatBot />
    </div>
  );
};

export default Portfolio;