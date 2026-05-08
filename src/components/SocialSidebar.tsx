import { Phone, Facebook, Linkedin, Github, Instagram, Youtube } from "lucide-react";

const SocialSidebar = () => {
  const socials = [
    { 
      icon: <Phone className="w-5 h-5" />, 
      href: "https://wa.me/201040603279",
      label: "WhatsApp"
    },
    { 
      icon: <Facebook className="w-5 h-5" />, 
      href: "https://www.facebook.com/profile.php?id=61569333206342",
      label: "Facebook"
    },
    { 
      icon: <Linkedin className="w-5 h-5" />, 
      href: "https://www.linkedin.com/in/ziad-elkholy-065933367/",
      label: "LinkedIn"
    },
    { 
      icon: <Github className="w-5 h-5" />, 
      href: "https://github.com/ziadeslam-git",
      label: "GitHub"
    },
    { 
      icon: <Youtube className="w-5 h-5" />, 
      href: "http://www.youtube.com/@Ziad-Elkholy",
      label: "YouTube"
    },
    { 
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/>
        </svg>
      ), 
      href: "https://www.tiktok.com/@eng.zaid.elkholy?_r=1&_t=ZS-93tezuI5WQ3",
      label: "TikTok"
    },
  ];

  return (
    <div className="fixed left-6 sm:left-8 lg:left-12 top-1/2 -translate-y-1/2 z-40 hidden sm:flex flex-col gap-4 items-center">
      {socials.map((social, index) => (
        <a
          key={index}
          href={social.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={social.label}
          className="w-10 h-10 rounded-full border border-white/20 bg-background/50 backdrop-blur-sm flex items-center justify-center text-white/60 hover:text-primary hover:border-primary hover:shadow-glow transition-all duration-300 group"
          style={{ animationDelay: `${index * 0.1}s` }}
        >
          <span className="group-hover:scale-110 transition-transform duration-300">
            {social.icon}
          </span>
        </a>
      ))}
      
      {/* Vertical line */}
      <div className="w-[2px] h-32 bg-gradient-to-b from-white/20 via-white/10 to-transparent mt-4 rounded-full"></div>
    </div>
  );
};

export default SocialSidebar;
