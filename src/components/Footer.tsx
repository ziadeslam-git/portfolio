import { Github, Linkedin, Mail, Facebook } from "lucide-react";
import { motion } from "framer-motion";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  const socialLinks = [
    { icon: <Github className="w-5 h-5" />, href: "https://github.com", label: "GitHub" },
    { icon: <Linkedin className="w-5 h-5" />, href: "https://www.linkedin.com/in/ziad-elkholy-065933367", label: "LinkedIn" },
    { icon: <Facebook className="w-5 h-5" />, href: "https://www.facebook.com/Ziadeslam53", label: "Facebook" },
    { icon: <Mail className="w-5 h-5" />, href: "mailto:ziadeslam.53200@gmail.com", label: "Email" },
  ];

  const scrollToSection = (sectionId: string) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="py-12 relative overflow-hidden border-t border-white/10">
      <div className="absolute inset-0 bg-background"></div>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-6xl mx-auto"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div>
              <button onClick={() => scrollToSection('hero')} className="text-2xl font-bold text-primary mb-4 block">
                Ziad ELkholy
              </button>
              <p className="text-white/60 text-sm">Backend Developer specializing in .NET</p>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Quick Links</h4>
              <div className="space-y-2">
                {['About', 'Skills', 'Projects', 'Contact'].map((item) => (
                  <button key={item} onClick={() => scrollToSection(item.toLowerCase())} className="block text-white/60 hover:text-primary transition-colors text-sm">
                    {item}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Connect</h4>
              <div className="flex gap-3">
                {socialLinks.map((social, index) => (
                  <a key={index} href={social.href} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white/60 hover:text-primary hover:border-primary transition-all">
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>
          </div>
          <div className="pt-8 border-t border-white/10 text-center">
            <p className="text-white/40 text-sm">© {currentYear} Ziad ELkholy. All rights reserved.</p>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
