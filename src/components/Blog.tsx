import { useState, useEffect } from 'react';
import { ExternalLink, Calendar, Clock, ArrowRight } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface BlogPost {
  title: string;
  description: string;
  pubDate: string;
  link: string;
  categories: string[];
  readTime: string;
}

const Blog = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate Medium API call - in real implementation, you'd integrate with Medium's RSS feed
    const fetchPosts = async () => {
      try {
        // Mock data - replace with actual Medium RSS feed integration
        const mockPosts: BlogPost[] = [
          {
            title: "Building Healthcare Recommendation Systems with LLMs & Edge Computing",
            description: "Healthcare Recommendation Systems powered by Large Language Models (LLMs) and Edge Computing are transforming personalized care. Explore how to build efficient, real-time systems that enhance patient outcomes.",
            pubDate: "Aug 25, 2025",
            link: "https://medium.com/@beyondtheboard/building-healthcare-recommendation-systems-with-llms-edge-computing-65558a37552b",
            categories: ["AI", "Edge Computing", "Machine Learning"],
            readTime: "3 min read"
          },
          {
            title: "The Untouched Frontiers of Chatbots: Where Research Hasn’t Looked (Yet)",
            description: "Chatbots have come a long way. From customer service bots to large language model (LLM) assistants, they’re now everywhere banking apps, healthcare portals, even children’s study apps.",
            pubDate: "Aug 31, 2025",
            link: "https://medium.com/@beyondtheboard/the-untouched-frontiers-of-chatbots-where-research-hasnt-looked-yet-and-how-we-can-fix-it-by-e8a907245e06",
            categories: ["AI", "LLM", "Chatbots"],
            readTime: "6 min read"
          },
          {
            title: "The Rise of Emotional AI: How Next-Gen Chatbots Are Revolutionising Human-Machine Interaction in 2025",
            description: "Emotional AI is transforming chatbots, enabling them to understand and respond to human emotions. Discover how this technology is revolutionizing human-machine interaction in 2025.",
            pubDate: "Sep 10, 2025",
            link: "https://medium.com/@beyondtheboard/the-rise-of-emotional-ai-how-next-gen-chatbots-are-revolutionising-human-machine-interaction-in-05eeae5c993f",
            categories: ["AI", "Chatbots", "Emotional Intelligence"],
            readTime: "6 min read"
          }
        ];
        
        setPosts(mockPosts);
      } catch (error) {
        console.error('Error fetching blog posts:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  return (
    <section id="blog" className="py-20 bg-gradient-secondary">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 gradient-primary-text">
              Latest Insights
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Sharing knowledge and insights from my journey in data science, AI research, 
              and emerging technologies through detailed articles and tutorials.
            </p>
          </div>

          {loading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(3)].map((_, index) => (
                <Card key={index} className="p-6 bg-card/50 animate-pulse">
                  <div className="h-4 bg-muted rounded mb-4"></div>
                  <div className="h-3 bg-muted rounded mb-2"></div>
                  <div className="h-3 bg-muted rounded mb-4"></div>
                  <div className="flex gap-2 mb-4">
                    <div className="h-6 w-16 bg-muted rounded"></div>
                    <div className="h-6 w-12 bg-muted rounded"></div>
                  </div>
                  <div className="h-10 bg-muted rounded"></div>
                </Card>
              ))}
            </div>
          ) : (
            <>
              {/* Blog Posts Grid */}
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                {posts.map((post, index) => (
                  <Card key={index} className="p-6 bg-card/50 glow-border interactive-card group">
                    <div className="mb-4">
                      <div className="flex items-center gap-4 text-xs text-muted-foreground mb-3">
                        <div className="flex items-center gap-1">
                          <Calendar size={12} />
                          {formatDate(post.pubDate)}
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock size={12} />
                          {post.readTime}
                        </div>
                      </div>
                      
                      <h3 className="text-lg font-semibold text-foreground mb-3 group-hover:gradient-text transition-all line-clamp-2">
                        {post.title}
                      </h3>
                      
                      <p className="text-sm text-muted-foreground leading-relaxed mb-4 line-clamp-3">
                        {post.description}
                      </p>
                    </div>

                    {/* Categories */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {post.categories.map((category, catIndex) => (
                        <Badge key={catIndex} variant="secondary" className="text-xs">
                          {category}
                        </Badge>
                      ))}
                    </div>

                    {/* Read More Button */}
                    <Button
                      variant="ghost"
                      size="sm"
                      className="w-full justify-between group-hover:bg-primary/10 group-hover:text-primary transition-all"
                      asChild
                    >
                      <a
                        href={post.link}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Read Article
                        <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                      </a>
                    </Button>
                  </Card>
                ))}
              </div>

              {/* View All Posts Button */}
              <div className="text-center">
                <Button
                  variant="outline"
                  size="lg"
                  className="glow-border hover:bg-primary/10 font-semibold px-8"
                  asChild
                >
                  <a
                    href="https://medium.com/@kshitizsikriwal"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2"
                  >
                    <ExternalLink size={16} />
                    View All Posts on Medium
                  </a>
                </Button>
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default Blog;