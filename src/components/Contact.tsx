import { useState } from "react";
import { toast } from "sonner";
import { Mail, Linkedin, Github, Send } from "lucide-react";
import { MorphElement } from "@/components/MorphElement";
import { Button } from "@/components/ui/button";

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      toast.error("Please fill in all fields.");
      return;
    }

    const text = `*New Contact Form Submission*%0A%0A*Name:* ${encodeURIComponent(formData.name)}%0A*Email:* ${encodeURIComponent(formData.email)}%0A%0A*Message:*%0A${encodeURIComponent(formData.message)}`;
    const whatsappLink = `https://wa.me/201040603279?text=${text}`;
    
    window.open(whatsappLink, '_blank');
    toast.success("Opening WhatsApp with your message!");
    
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <section id="contact" className="py-24 lg:py-32 relative bg-transparent z-10">
      <div className="container mx-auto px-6 sm:px-8 relative z-20">
        <div className="max-w-4xl mx-auto">
          <MorphElement type="slide-up" delay={0.1} className="text-center mb-12">
            <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
              Get in <span className="text-primary">Touch</span>
            </h2>
            <p className="text-white/60 text-lg">Have a project in mind? Let's connect.</p>
          </MorphElement>

          <MorphElement type="scale" delay={0.2}>
            <div className="relative rounded-2xl overflow-hidden border border-primary/30 bg-black/60 backdrop-blur-xl shadow-[0_0_50px_rgba(124,58,237,0.15)] p-8 sm:p-10 pointer-events-auto">
              {/* Mac Window Dots */}
              <div className="flex gap-1.5 mb-8">
                <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f56]"></div>
                <div className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]"></div>
                <div className="w-2.5 h-2.5 rounded-full bg-[#27c93f]"></div>
              </div>
              <form onSubmit={onSubmit} className="flex flex-col gap-6 relative z-30">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-sm font-medium text-white/80">Your Name</label>
                    <input
                      id="name"
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                      className="w-full bg-white/5 border border-white/10 focus:border-primary focus:ring-1 focus:ring-primary rounded-xl px-4 py-3 text-white outline-none transition-all"
                      placeholder="John Doe"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium text-white/80">Your Email</label>
                    <input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                      className="w-full bg-white/5 border border-white/10 focus:border-primary focus:ring-1 focus:ring-primary rounded-xl px-4 py-3 text-white outline-none transition-all"
                      placeholder="john@example.com"
                      required
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="message" className="text-sm font-medium text-white/80">Your Message</label>
                  <textarea
                    id="message"
                    value={formData.message}
                    onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                    className="w-full bg-white/5 border border-white/10 focus:border-primary focus:ring-1 focus:ring-primary rounded-xl px-4 py-3 text-white outline-none transition-all min-h-[150px] resize-y custom-scrollbar"
                    placeholder="Tell me about your project..."
                    required
                  ></textarea>
                </div>
                
                <Button type="submit" className="w-full sm:w-auto self-start bg-primary hover:bg-primary/90 text-white rounded-full px-8 py-6 text-base font-semibold transition-all duration-300 shadow-[0_0_20px_rgba(124,58,237,0.3)] hover:shadow-[0_0_30px_rgba(124,58,237,0.5)]">
                  <span className="flex items-center gap-2">
                    Send via WhatsApp
                    <Send className="w-4 h-4 ml-2" />
                  </span>
                </Button>
              </form>
            </div>
          </MorphElement>

          {/* Quick Links Fallback */}
          <MorphElement type="slide-up" delay={0.4}>
            <div className="mt-12 flex flex-wrap justify-center gap-6 relative z-20">
              <a href="https://wa.me/201040603279" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-white/60 hover:text-primary transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
                </svg>
                <span>WhatsApp</span>
              </a>
              <a href="mailto:ziadeslam.53200@gmail.com" className="flex items-center gap-2 text-white/60 hover:text-primary transition-colors">
                <Mail className="w-5 h-5" />
                <span>Email</span>
              </a>
              <a href="https://github.com/ziadeslam-git" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-white/60 hover:text-primary transition-colors">
                <Github className="w-5 h-5" />
                <span>GitHub</span>
              </a>
              <a href="https://www.linkedin.com/in/ziad-elkholy-065933367/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-white/60 hover:text-primary transition-colors">
                <Linkedin className="w-5 h-5" />
                <span>LinkedIn</span>
              </a>
            </div>
          </MorphElement>
        </div>
      </div>
    </section>
  );
};

export default Contact;
