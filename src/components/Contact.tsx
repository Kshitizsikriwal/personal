import { useState } from 'react';
import { Mail, MapPin, Send, MessageCircle } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import emailjs from '@emailjs/browser'; // ✅ Step 1: Import EmailJS

const Contact = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Note: We don't need the 'formData' state if we use e.currentTarget with emailjs.sendForm
  // However, keeping it for controlled components is fine and doesn't hurt.
  // The 'name' attributes on the inputs are the most important part for emailjs.

  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => { // ✅ Step 2: Ensure form event type
    e.preventDefault();
    setIsSubmitting(true);

    // ✅ Step 3: Replace mock submission with the actual EmailJS call
    emailjs.sendForm(
  process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
  process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
  e.currentTarget,
  process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!
)

      .then(
        () => {
          // ✅ Step 4: Use your toast for success
          toast({
            title: "Message sent successfully!",
            description: "Thank you for reaching out. I'll get back to you soon.",
          });
          e.currentTarget.reset(); // Resets the form fields
        },
        (error) => {
          // ✅ Step 5: Use your toast for errors
          toast({
            title: "Failed to send message",
            description: "Please try again or contact me directly via email.",
            variant: "destructive",
          });
          console.error("EmailJS Error:", error); // Log the error for debugging
        }
      )
      .finally(() => {
        setIsSubmitting(false); // ✅ This will run on both success and failure
      });
  };

  const contactInfo = [
    {
      icon: Mail,
      label: 'Email',
      value: 'kshitizsikriwal16@gmail.com',
      href: 'mailto:kshitizsikriwal16@gmail.com'
    },
    {
      icon: MapPin,
      label: 'Location',
      value: 'Gurugram, Haryana, India',
      href: '#'
    },
    {
      icon: MessageCircle,
      label: 'LinkedIn',
      value: 'Connect on LinkedIn',
      href: 'https://linkedin.com/in/kshitizsikriwal'
    }
  ];

  return (
    <section id="contact" className="py-20 bg-background">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 gradient-primary-text">
              Get In Touch
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Ready to collaborate on your next data science project? Let's discuss how we can 
              transform your data into actionable insights.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Information */}
            <div className="space-y-8">
              <Card className="p-8 bg-card/50 glow-border">
                <h3 className="text-2xl font-bold gradient-text mb-6">
                  Let's Connect
                </h3>
                <p className="text-muted-foreground mb-8 leading-relaxed">
                  I'm always interested in discussing new opportunities, collaborations, 
                  or innovative data science projects. Whether you have a specific project 
                  in mind or just want to explore possibilities, feel free to reach out.
                </p>

                <div className="space-y-6">
                  {contactInfo.map((info, index) => (
                    <div key={index} className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                        <info.icon className="text-primary" size={20} />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">{info.label}</p>
                        {info.href === '#' ? (
                          <p className="font-medium text-foreground">{info.value}</p>
                        ) : (
                          <a
                            href={info.href}
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="font-medium text-primary hover:text-accent transition-colors"
                          >
                            {info.value}
                          </a>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </Card>

              {/* Call to Action */}
              <Card className="p-8 bg-gradient-primary/5 border-primary/20">
                <h4 className="text-xl font-semibold gradient-text mb-4">
                  Open to Opportunities
                </h4>
                <p className="text-muted-foreground mb-6">
                  Currently seeking exciting roles in data science, AI research, 
                  and machine learning engineering. Let's explore how I can contribute 
                  to your team's success.
                </p>
                <div className="flex flex-wrap gap-3">
                  <Button
                    variant="outline"
                    size="sm"
                    className="glow-border"
                    asChild
                  >
                    <a href="https://drive.google.com/file/d/1StMH5J_yCL8uhFWQwzbsso692dp0Twe_/view?usp=share_link" target="_blank" rel="noopener noreferrer">
                      Download Resume
                    </a>
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="glow-border"
                    asChild
                  >
                    <a href="https://linkedin.com/in/kshitizsikriwal" target="_blank" rel="noopener noreferrer">
                      View LinkedIn
                    </a>
                  </Button>
                </div>
              </Card>
            </div>

            {/* Contact Form */}
            <Card className="p-8 bg-card/50 glow-border">
              <h3 className="text-2xl font-bold gradient-text mb-6">
                Send a Message
              </h3>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
                      Name
                    </label>
                    <Input
                      id="name"
                      name="name" // 'name' attribute is crucial for EmailJS
                      placeholder="Your name"
                      required
                      className="bg-input/50 border-border/50 focus:border-primary"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                      Email
                    </label>
                    <Input
                      id="email"
                      name="email" // 'name' attribute is crucial for EmailJS
                      type="email"
                      placeholder="your.email@example.com"
                      required
                      className="bg-input/50 border-border/50 focus:border-primary"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-foreground mb-2">
                    Subject
                  </label>
                  <Input
                    id="subject"
                    name="subject" // 'name' attribute is crucial for EmailJS
                    placeholder="What's this about?"
                    required
                    className="bg-input/50 border-border/50 focus:border-primary"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2">
                    Message
                  </label>
                  <Textarea
                    id="message"
                    name="message" // 'name' attribute is crucial for EmailJS
                    placeholder="Tell me about your project or opportunity..."
                    rows={5}
                    required
                    className="bg-input/50 border-border/50 focus:border-primary resize-none"
                  />
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-primary hover:opacity-90 font-semibold py-3 glow-primary"
                >
                  {isSubmitting ? "Sending..." : (
                    <span className="flex items-center gap-2">
                      <Send size={16} />
                      Send Message
                    </span>
                  )}
                </Button>
              </form>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;