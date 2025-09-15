"use client";

import { motion } from "framer-motion";
import { Calendar, MapPin } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 },
};

const Experience = () => {
  const experiences = [
    {
      title: "Data Science Research Intern",
      company: "National Institute of Technology (NIT), Kurukshetra",
      period: "June 2025 – Present",
      location: "Kurukshetra, India",
      type: "Research Internship",
      description:
        "Developed LLM-based recommendation systems for healthcare applications using Mistral-7B and Nous-Hermes-2.",
      achievements: [
        "Generated synthetic meal and activity data for patients with diabetes, cholesterol, and asthma",
        "Applied BERT embeddings and cosine similarity to connect nutrition and physical activity domains",
        "Conducted latent space analysis to connect nutrition and physical activity domains",
      ],
      technologies: [
        "Python",
        "LLMs",
        "BERT",
        "Healthcare Analytics",
        "Research",
      ],
    },
    {
      title: "Frontend Web Developer Intern",
      company: "Urja Mobility, Delhi",
      period: "July 2024 – Sept 2024",
      location: "Delhi, India",
      type: "Web Development",
      description:
        "Enhanced user experience and optimized frontend performance for EV mobility solutions.",
      achievements: [
        "Conducted user research and prioritized features for the landing page, improving engagement",
        "Led A/B testing of UI components, increasing click-through rates",
        "Developed an internal admin portal to streamline operations and reduce processing time",
        "Collaborated with cross-functional teams to align product roadmap with business goals",
      ],
      technologies: [
        "JavaScript",
        "React",
        "UI/UX",
        "A/B Testing",
        "Frontend Optimization",
      ],
    },
    {
      title: "Data Science Intern",
      company: "Cognifyz Technologies",
      period: "April 2025 - May 2025",
      location: "Virtual Internship",
      type: "Data Science",
      description:
        "Worked on diverse data science projects, applying statistical methods and analytical tools to extract insights and support data-driven decision-making.",
      achievements: [
        "Collected, cleaned, and preprocessed large datasets for analysis and model building",
    "Applied Python libraries (Pandas, Seaborn) for exploratory data analysis and visualization",
    "Developed data-driven solutions to business problems through statistical analysis",
    "Contributed to building Flask-based prototypes for deploying models and insights",
    "Collaborated with the team to transform raw data into actionable insights",
      ],
      technologies: [
        "Python", "Pandas", "Seaborn", "Flask", "Data Analysis", "Big Data Analytics" ,
      ],
    },
    {
      title: "Business Development Intern",
      company: "SolutionGraph",
      period: "July 2023 - August 2023",
      location: "Remote Internship",
      type: "Business Development",
      description:
        "Supported business development initiatives through data-driven insights and market analysis.",
      achievements: [
        "collaborated with team to identify potential client opportunities",
    "Assisted in market research to support business strategy",
    "Collaborated with the team to streamline lead generation and outreach processes"
      ],
      technologies: [
        "Team work", "Business Development", "Market Research", "Business Analytics",
      ],
    }
  ];

  const education = {
    degree: "B.Tech, Computer Science & Technology",
    institution: "Central University of Haryana, Mahendergarh",
    period: "Nov 2022 – Dec 2025",
    description:
      "Focused on data structures, algorithms, machine learning, and software engineering principles.",
  };

  return (
    <section id="experience" className="py-20 relative overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          {/* Section Header */}
          <motion.div
            className="text-center mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6 }}
            variants={fadeInUp}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4 gradient-primary-text">
              Experience & Education
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Professional journey through data science, research, and web
              development roles, building expertise in AI and healthcare
              analytics.
            </p>
          </motion.div>

          {/* Experience Timeline */}
          <div className="space-y-12 mb-20 relative">
            {experiences.map((exp, index) => (
              <motion.div
                key={index}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.15 }}
                transition={{
                  duration: 0.7,
                  delay: index * 0.2,
                  ease: "easeOut",
                }}
                variants={fadeInUp}
              >
                <Card className="p-8 bg-card/50 glow-border interactive-card hover:scale-[1.02] transition-transform duration-300">
                  <div className="flex flex-col lg:flex-row lg:items-start gap-6">
                    {/* Timeline Marker */}
                    <div className="flex-shrink-0">
                      <motion.div
                        className="w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center text-primary-foreground font-bold shadow-lg"
                        initial={{ scale: 0 }}
                        whileInView={{ scale: 1 }}
                        transition={{ delay: 0.2, duration: 0.5 }}
                      >
                        {index + 1}
                      </motion.div>
                    </div>

                    {/* Experience Details */}
                    <div className="flex-grow">
                      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-4">
                        <div>
                          <h3 className="text-xl font-bold text-foreground mb-1">
                            {exp.title}
                          </h3>
                          <h4 className="text-lg gradient-text font-semibold">
                            {exp.company}
                          </h4>
                        </div>
                        <div className="flex flex-col lg:items-end gap-2">
                          <Badge variant="outline" className="w-fit">
                            {exp.type}
                          </Badge>
                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <div className="flex items-center gap-1">
                              <Calendar size={14} />
                              {exp.period}
                            </div>
                            <div className="flex items-center gap-1">
                              <MapPin size={14} />
                              {exp.location}
                            </div>
                          </div>
                        </div>
                      </div>

                      <p className="text-muted-foreground mb-4 leading-relaxed">
                        {exp.description}
                      </p>

                      {/* Achievements */}
                      <div className="mb-6">
                        <h5 className="font-semibold mb-3 text-foreground">
                          Key Achievements:
                        </h5>
                        <ul className="space-y-2">
                          {exp.achievements.map((achievement, achIndex) => (
                            <motion.li
                              key={achIndex}
                              className="text-sm text-muted-foreground flex items-start gap-2"
                              initial={{ opacity: 0, x: -20 }}
                              whileInView={{ opacity: 1, x: 0 }}
                              transition={{
                                duration: 0.5,
                                delay: achIndex * 0.1,
                              }}
                              viewport={{ once: true }}
                            >
                              <span className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"></span>
                              {achievement}
                            </motion.li>
                          ))}
                        </ul>
                      </div>

                      {/* Technologies */}
                      <motion.div
                        className="flex flex-wrap gap-2"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        viewport={{ once: true }}
                      >
                        {exp.technologies.map((tech, techIndex) => (
                          <Badge
                            key={techIndex}
                            variant="secondary"
                            className="text-xs"
                          >
                            {tech}
                          </Badge>
                        ))}
                      </motion.div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Education Section */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7 }}
            variants={fadeInUp}
          >
            <Card className="p-8 bg-card/50 glow-border hover:scale-[1.01] transition-transform duration-300">
              <div className="flex items-center gap-4 mb-6">
                <motion.div
                  className="w-12 h-12 bg-accent/20 rounded-full flex items-center justify-center"
                  initial={{ rotate: -90, opacity: 0 }}
                  whileInView={{ rotate: 0, opacity: 1 }}
                  transition={{ duration: 0.6 }}
                >
                  <span className="text-2xl">🎓</span>
                </motion.div>
                <div>
                  <h3 className="text-2xl font-bold gradient-text">
                    Education
                  </h3>
                  <p className="text-muted-foreground">Academic Foundation</p>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <motion.div
                  initial={{ opacity: 0, x: -40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6 }}
                  viewport={{ once: true }}
                >
                  <h4 className="text-lg font-semibold text-foreground mb-2">
                    {education.degree}
                  </h4>
                  <h5 className="text-primary font-medium mb-2">
                    {education.institution}
                  </h5>
                  <div className="flex items-center gap-1 text-sm text-muted-foreground mb-4">
                    <Calendar size={14} />
                    {education.period}
                  </div>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {education.description}
                  </p>
                </motion.div>

                <motion.div
                  className="space-y-4"
                  initial={{ opacity: 0, x: 40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6 }}
                  viewport={{ once: true }}
                >
                  <h5 className="font-semibold text-foreground">
                    Core Subjects:
                  </h5>
                  <div className="flex flex-wrap gap-2">
                    {[
                      "Data Structures",
                      "Algorithms",
                      "Machine Learning",
                      "Database Systems",
                      "Software Engineering",
                      "Statistics",
                      "Data Mining",
                      "Cloud Computing",
                      "Computer Networks",
                      "Operating Systems",
                      "Distributed Systems",
                    ].map((subject, index) => (
                      <Badge
                        key={index}
                        variant="outline"
                        className="text-xs"
                      >
                        {subject}
                      </Badge>
                    ))}
                  </div>
                </motion.div>
              </div>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
