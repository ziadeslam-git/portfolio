import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  ArrowLeft,
  GraduationCap,
  Sparkles,
  ExternalLink,
  Github,
  MonitorPlay,
  Palette,
  BarChart,
} from "lucide-react";
import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const liveUrl = "https://edu-stream-digital-media-platform.vercel.app/";
const githubUrl = "https://github.com/ziadeslam-git/Edu-Stream";

const highlights = [
  "Integrated interactive learning environment focused on gamification and digital media skills.",
  "Structured curriculum with 6 learning modules, pre-skill assessment, and instant quizzes.",
  "Modern glassmorphism UI with WebGL shader backgrounds and GSAP animations.",
  "Authentication, user progress tracking, and Dark/Light mode support.",
];

const techStack = [
  "React 18",
  "TypeScript 5",
  "Vite",
  "Tailwind CSS 4",
  "GSAP 3",
  "Framer Motion",
  "WebGL (GLSL)",
  "Clerk Auth",
  "Radix UI",
  "shadcn/ui",
];

const featureGroups = [
  {
    icon: <GraduationCap className="h-5 w-5" />,
    title: "Educational Modules",
    body: "6 sequential learning modules covering integrated skill axes with cognitive assessments and real-time evaluations.",
  },
  {
    icon: <BarChart className="h-5 w-5" />,
    title: "Progress Tracking",
    body: "Live progress bar reflecting completion percentages and a pre-skill assessment of 40 questions across 8 dimensions.",
  },
  {
    icon: <Palette className="h-5 w-5" />,
    title: "Immersive Animations",
    body: "Custom WebGL shader backgrounds, GSAP ScrollTrigger animations, and Framer Motion transitions for a premium visual experience.",
  },
  {
    icon: <MonitorPlay className="h-5 w-5" />,
    title: "Modern UI/UX",
    body: "Glassmorphism design, mobile-first responsive layout, accessible Radix UI components, and seamless Dark/Light mode toggling.",
  },
  {
    icon: <Sparkles className="h-5 w-5" />,
    title: "Authentication & State",
    body: "Integrated with Clerk for identity management, utilizing TanStack Query for asynchronous data, and Zod for robust form validation.",
  },
];

const EduStreamProject = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "Edu-Stream Digital Media Platform | Project Details";

    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute(
        "content",
        "Edu-Stream is a React-based educational platform for digital media and gamification skills with WebGL animations and Clerk authentication."
      );
    }

    const ctx = gsap.context(() => {
      const tl = gsap.timeline();
      
      tl.fromTo(".hero-elem", 
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: "power3.out" }
      );
      
      tl.fromTo(".hero-img", 
        { scale: 0.9, opacity: 0, rotationY: 15 },
        { scale: 1, opacity: 1, rotationY: 0, duration: 1, ease: "power3.out" },
        "-=0.6"
      );

      gsap.fromTo(".highlight-item",
        { x: -30, opacity: 0 },
        { 
          x: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: "power2.out",
          scrollTrigger: {
            trigger: ".highlights-container",
            start: "top 80%",
            toggleActions: "play none none reverse"
          }
        }
      );

      gsap.fromTo(".feature-card",
        { y: 40, opacity: 0, scale: 0.95 },
        { 
          y: 0, opacity: 1, scale: 1, duration: 0.6, stagger: 0.1, ease: "back.out(1.2)",
          scrollTrigger: {
            trigger: ".features-container",
            start: "top 80%",
            toggleActions: "play none none reverse"
          }
        }
      );

      gsap.fromTo(".tech-badge",
        { scale: 0, opacity: 0 },
        { 
          scale: 1, opacity: 1, duration: 0.4, stagger: 0.05, ease: "back.out(2)",
          scrollTrigger: {
            trigger: ".tech-container",
            start: "top 85%",
            toggleActions: "play none none reverse"
          }
        }
      );

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <main ref={containerRef} className="min-h-screen bg-black text-white">
      <section className="relative overflow-hidden border-b border-white/10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,hsl(var(--primary)_/_0.18),transparent_36rem)]" />
        <div className="container relative z-10 mx-auto px-6 py-10 sm:px-8 lg:px-12 lg:py-16">
          <div className="hero-elem">
            <Button
              variant="outline"
              className="mb-10 rounded-full border-white/15 text-white/75 hover:border-primary/40 hover:bg-primary/10 hover:text-primary"
              asChild
            >
              <Link to="/#projects">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Projects
              </Link>
            </Button>
          </div>

          <div className="grid items-center gap-10 lg:grid-cols-[1fr_0.95fr]">
            <div>
              <div className="hero-elem mb-5 inline-flex rounded-full border border-primary/30 bg-primary/10 px-4 py-2 text-sm font-medium text-primary">
                Educational Platform Case Study
              </div>
              <h1 className="hero-elem mb-6 text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl">
                Edu-Stream <span className="text-primary">Digital Media</span>
              </h1>
              <p className="hero-elem max-w-3xl text-lg leading-8 text-white/70">
                Edu-Stream is a comprehensive digital learning environment designed to empower individuals with gamification and digital media skills. It features a structured curriculum, interactive quizzes, live progress tracking, and an immersive user experience powered by React, WebGL shaders, and GSAP animations.
              </p>
              <div className="hero-elem mt-8 flex flex-col gap-4 sm:flex-row">
                <Button className="rounded-full bg-primary px-7 py-6 font-semibold text-primary-foreground shadow-[0_0_20px_rgba(124,58,237,0.4)] hover:shadow-[0_0_30px_rgba(124,58,237,0.6)] transition-all" asChild>
                  <a href={liveUrl} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="mr-2 h-4 w-4" />
                    Open Live Platform
                  </a>
                </Button>
                <Button variant="outline" className="rounded-full border-white/20 px-7 py-6 font-semibold text-white hover:border-white/40 hover:bg-white/10" asChild>
                  <a href={githubUrl} target="_blank" rel="noopener noreferrer">
                    <Github className="mr-2 h-4 w-4" />
                    View Code
                  </a>
                </Button>
              </div>
            </div>

            <Card className="hero-img overflow-hidden rounded-2xl border-white/10 bg-white/5 shadow-lg transform-gpu perspective-1000">
              <img
                src={`${import.meta.env.BASE_URL}uploads/edu-stream.png`}
                alt="Edu-Stream production homepage"
                className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
              />
            </Card>
          </div>
        </div>
      </section>

      <section className="container mx-auto px-6 py-16 sm:px-8 lg:px-12">
        <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <Card className="highlights-container rounded-2xl border-white/10 bg-white/[0.03] p-6">
            <h2 className="mb-5 text-2xl font-bold text-white">Core Highlights</h2>
            <div className="space-y-4">
              {highlights.map((item) => (
                <div key={item} className="highlight-item rounded-xl border border-white/10 bg-black/30 p-4 text-sm leading-6 text-white/70">
                  {item}
                </div>
              ))}
            </div>
          </Card>

          <div className="features-container">
            <h2 className="mb-5 text-2xl font-bold text-white">Technical Scope</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              {featureGroups.map((feature) => (
                <Card key={feature.title} className="feature-card rounded-2xl border-white/10 bg-white/[0.03] p-5 hover:bg-white/[0.05] hover:border-primary/30 transition-colors">
                  <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    {feature.icon}
                  </div>
                  <h3 className="mb-2 font-semibold text-white">{feature.title}</h3>
                  <p className="text-sm leading-6 text-white/60">{feature.body}</p>
                </Card>
              ))}
            </div>
          </div>
        </div>

        <Card className="tech-container mt-8 rounded-2xl border-white/10 bg-white/[0.03] p-6">
          <h2 className="mb-5 text-2xl font-bold text-white">Tech Stack</h2>
          <div className="flex flex-wrap gap-3">
            {techStack.map((tech) => (
              <Badge key={tech} className="tech-badge border-white/10 bg-white/5 px-3 py-1.5 text-sm text-white/75 hover:border-primary/30 hover:bg-primary/10 hover:text-primary transition-colors cursor-default">
                {tech}
              </Badge>
            ))}
          </div>
        </Card>
      </section>
    </main>
  );
};

export default EduStreamProject;
