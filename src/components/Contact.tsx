import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Mail, Phone, MapPin, Send, ArrowRight } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { motion } from "framer-motion";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const message = `*New Contact Form Submission*%0A%0A*Name:* ${formData.name}%0A*Email:* ${formData.email}%0A%0A*Message:*%0A${formData.message}`;
    const whatsappLink = `https://wa.me/201040603279?text=${message}`;
    
    window.open(whatsappLink, '_blank');
    
    toast.success("Opening WhatsApp with your message!");
    setFormData({ name: "", email: "", message: "" });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const contactInfo = [
    {
      icon: <Mail className="w-5 h-5" />,
      title: "Email",
      value: "ziadeslam.53200@gmail.com",
      link: "mailto:ziadeslam.53200@gmail.com"
    },
    {
      icon: <Phone className="w-5 h-5" />,
      title: "Phone",
      value: "+20 104 060 3279",
      link: "https://wa.me/201040603279"
    },
    {
      icon: <MapPin className="w-5 h-5" />,
      title: "Location",
      value: "Cairo, Egypt",
      link: "#"
    }
  ];

  return (
    <section id="contact" className="py-24 lg:py-32 relative overflow-hidden bg-black">
      <div className="absolute inset-0 bg-black"></div>

      <div className="container mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12 lg:mb-16"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/30 bg-primary/5 mb-6">
              <span className="text-primary text-sm font-medium">Get In Touch</span>
            </div>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">
              <span className="text-primary">Contact</span> Me
            </h2>
            <p className="text-white/70 text-lg sm:text-xl max-w-3xl mx-auto">
              Have a project in mind? Let's work together to bring your ideas to life
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5 }}
            >
              <Card className="p-6 lg:p-8 glass-card rounded-2xl border-white/10">
                <h3 className="text-2xl font-bold text-white mb-6">Send a Message</h3>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <Label htmlFor="name" className="text-white/80 font-medium">Name</Label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Your full name"
                      className="mt-2 bg-white/5 border-white/10 text-white placeholder:text-white/40 focus:border-primary focus:ring-primary/20 rounded-xl"
                      required
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="email" className="text-white/80 font-medium">Email</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="email@example.com"
                      className="mt-2 bg-white/5 border-white/10 text-white placeholder:text-white/40 focus:border-primary focus:ring-primary/20 rounded-xl"
                      required
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="message" className="text-white/80 font-medium">Message</Label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Tell me about your project..."
                      rows={5}
                      className="mt-2 bg-white/5 border-white/10 text-white placeholder:text-white/40 focus:border-primary focus:ring-primary/20 rounded-xl resize-none"
                      required
                    />
                  </div>
                  
                  <Button 
                    type="submit" 
                    className="w-full bg-primary hover:bg-primary-glow text-primary-foreground rounded-full py-6 text-base font-semibold transition-all duration-300 shadow-glow hover:shadow-neon group"
                  >
                    Send Message
                    <Send className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </form>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="space-y-6"
            >
              <div className="mb-8">
                <h3 className="text-2xl font-bold text-white mb-4">Contact Information</h3>
                <p className="text-white/60 leading-relaxed">
                  Feel free to reach out through any of these channels. I'm always excited to discuss new projects and opportunities.
                </p>
              </div>
              
              <div className="space-y-4">
                {contactInfo.map((info, index) => (
                  <motion.a
                    key={index}
                    href={info.link}
                    className="block"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                  >
                    <Card className="p-5 glass-card rounded-xl border-white/10 hover:border-primary/30 transition-all duration-300 group cursor-pointer">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
                          {info.icon}
                        </div>
                        <div>
                          <h4 className="font-medium text-white/60 text-sm">{info.title}</h4>
                          <p className="text-white group-hover:text-primary transition-colors">{info.value}</p>
                        </div>
                      </div>
                    </Card>
                  </motion.a>
                ))}
              </div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.6 }}
              >
                <Card className="p-6 bg-gradient-to-r from-primary to-accent rounded-2xl border-0 mt-8">
                  <h4 className="text-xl font-bold text-primary-foreground mb-2">Ready to start your project?</h4>
                  <p className="text-primary-foreground/80 mb-4 text-sm">
                    Let's turn your idea into a reality with clean code and modern architecture
                  </p>
                  <Button 
                    onClick={() => window.open('https://wa.me/201040603279', '_blank')}
                    className="bg-white/20 backdrop-blur-sm border border-white/30 text-white hover:bg-white/30 rounded-full group"
                  >
                    Get Started
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Card>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
