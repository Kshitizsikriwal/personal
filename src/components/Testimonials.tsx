import { useState } from 'react';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Testimonials = () => {
  const testimonials = [
    {
      id: 1,
      name: "Dr. Vikram",
      role: "Professor at NIT Kurukshetra",
      content: "Kshitiz's expertise in healthcare analytics transformed Meal and Exercies outcome predictions better. His innovative approach to data science delivered insights that directly improved Research.",
      avatar: "VK"
    },
    {
      id: 2,
      name: "Dr. Lov",
      role: "Professor at NIT Kurukshetra",
      content: "Working with Kshitiz on our recommendation systems was a good experience. His understanding of ML algorithms and practical implementation skills are also good.",
      avatar: "LV"
    },
    {
      id: 3,
      name: "Mr. Anagh",
      role: "Co-Founder at Urja Mobility",
      content: "Kshitiz consistently demonstrated outstanding analytical thinking and Development skills. His contributions have been remarkable and impactful.",
      avatar: "AN"
    },
    {
      id: 4,
      name: "Dr. Visal",
      role: "Assistant Professor at CUH",
      content: "Kshitiz is a avid learner and teaching him was a pleasure. His dedication to mastering data science concepts and applying them effectively is commendable.",
      avatar: "VP"
    },
    {
      id: 5,
      name: "Nikita Mittal",
      role: "Project Partner",
      content: "He is good friend and a great partner to work with. His dedication and problem-solving skills made our project successful.",
      avatar: "NM"
    }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const goToTestimonial = (index: number) => {
    setCurrentIndex(index);
  };

  return (
    <section id="testimonials" className="py-20 bg-background">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16 fade-slide-up">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            What People Say
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Trusted by industry leaders and colleagues who've experienced the impact of data-driven solutions.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          {/* Main Testimonial */}
          <div className="relative bg-card clean-border rounded-lg p-8 md:p-12 mb-8 fade-slide-up">
            <Quote className="absolute top-6 left-6 text-muted-foreground/30" size={32} />
            
            <div className="relative z-10">
              <p className="text-lg md:text-xl text-foreground mb-8 leading-relaxed">
                "{testimonials[currentIndex].content}"
              </p>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center">
                    <span className="text-sm font-bold text-foreground">
                      {testimonials[currentIndex].avatar}
                    </span>
                  </div>
                  <div>
                    <div className="font-semibold text-foreground">
                      {testimonials[currentIndex].name}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {testimonials[currentIndex].role}
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={prevTestimonial}
                    className="w-10 h-10 p-0 clean-border"
                  >
                    <ChevronLeft size={16} />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={nextTestimonial}
                    className="w-10 h-10 p-0 clean-border"
                  >
                    <ChevronRight size={16} />
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation Dots */}
          <div className="flex justify-center gap-2 fade-slide-up">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => goToTestimonial(index)}
                className={`w-2 h-2 rounded-full transition-all ${
                  index === currentIndex 
                    ? 'bg-foreground w-8' 
                    : 'bg-muted-foreground/30 hover:bg-muted-foreground/50'
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>

          {/* Sliding testimonials preview */}
          <div className="mt-12 overflow-hidden">
            <div className="flex gap-4 testimonial-slider">
              {[...testimonials, ...testimonials].map((testimonial, index) => (
                <div
                  key={`${testimonial.id}-${index}`}
                  className="flex-none w-80 bg-muted/30 rounded-lg p-6 clean-border"
                >
                  <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
                    "{testimonial.content}"
                  </p>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-card flex items-center justify-center">
                      <span className="text-xs font-bold">{testimonial.avatar}</span>
                    </div>
                    <div>
                      <div className="text-sm font-medium text-foreground">
                        {testimonial.name}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {testimonial.role}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;