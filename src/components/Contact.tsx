import { useState, useRef, useEffect } from "react";
import { toast } from "sonner";
import { Mail, Linkedin, Github } from "lucide-react";
import { MorphElement } from "@/components/MorphElement";

interface TerminalLine {
  id: string;
  type: 'input' | 'output' | 'system' | 'error' | 'success';
  content: string;
}

const Contact = () => {
  const [lines, setLines] = useState<TerminalLine[]>([
    { id: '1', type: 'system', content: 'Connection established. Secure channel open.' },
    { id: '2', type: 'system', content: 'Type your message and press ENTER to send. Type "help" for options.' }
  ]);
  const [input, setInput] = useState("");
  const [mode, setMode] = useState<'command' | 'messaging'>('command');
  const [messageData, setMessageData] = useState({ name: '', email: '', message: '' });
  const [step, setStep] = useState<'name' | 'email' | 'message'>('name');
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [lines, input]);

  const addLine = (type: TerminalLine['type'], content: string) => {
    setLines(prev => [...prev, { id: Math.random().toString(36).substr(2, 9), type, content }]);
  };

  const handleCommand = (cmd: string) => {
    const trimmed = cmd.trim().toLowerCase();
    
    if (trimmed === 'clear') {
      setLines([]);
    } else if (trimmed === 'help') {
      addLine('output', 'Available commands:');
      addLine('output', '  contact   - Start message sequence');
      addLine('output', '  social    - List social links');
      addLine('output', '  clear     - Clear terminal');
    } else if (trimmed === 'social') {
      addLine('output', 'Email: ziadeslam.53200@gmail.com');
      addLine('output', 'LinkedIn: Available upon request');
      addLine('output', 'GitHub: github.com/ziadeslam-git');
    } else if (trimmed === 'contact' || trimmed === 'contact ziad') {
      setMode('messaging');
      setStep('name');
      addLine('system', 'Initiating contact sequence...');
      addLine('output', 'Please enter your Name:');
    } else if (trimmed !== '') {
      addLine('error', `Command not found: ${trimmed}. Type "help" for options.`);
    }
  };

  const handleMessaging = (val: string) => {
    if (val.trim() === '') {
      addLine('error', 'Input cannot be empty. Please try again.');
      return;
    }

    if (step === 'name') {
      setMessageData(prev => ({ ...prev, name: val }));
      setStep('email');
      addLine('output', 'Please enter your Email:');
    } else if (step === 'email') {
      if (!val.includes('@')) {
        addLine('error', 'Invalid email format. Please try again:');
        return;
      }
      setMessageData(prev => ({ ...prev, email: val }));
      setStep('message');
      addLine('output', 'Please enter your Message:');
    } else if (step === 'message') {
      const fullMessage = { ...messageData, message: val };
      
      addLine('system', 'Encrypting payload...');
      
      setTimeout(() => {
        const text = `*New Contact Form Submission*%0A%0A*Name:* ${encodeURIComponent(fullMessage.name)}%0A*Email:* ${encodeURIComponent(fullMessage.email)}%0A%0A*Message:*%0A${encodeURIComponent(fullMessage.message)}`;
        const whatsappLink = `https://wa.me/201040603279?text=${text}`;
        
        window.open(whatsappLink, '_blank');
        toast.success("Opening WhatsApp with your message!");
        
        addLine('success', 'Payload transmitted successfully via secure channel (WhatsApp).');
        setMode('command');
        setMessageData({ name: '', email: '', message: '' });
      }, 800);
    }
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addLine('input', `> ${input}`);
    
    if (mode === 'command') {
      handleCommand(input);
    } else {
      handleMessaging(input);
    }
    
    setInput("");
  };

  return (
    <section id="contact" className="py-24 lg:py-32 relative bg-transparent z-10">
      <div className="container mx-auto px-6 sm:px-8 relative z-20">
        <div className="max-w-4xl mx-auto">
          <MorphElement type="slide-up" delay={0.1} className="text-center mb-12">
            <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
              Initialize <span className="text-primary">Connection</span>
            </h2>
            <p className="text-white/60">Use the terminal below to securely transmit a message.</p>
          </MorphElement>

          <MorphElement type="scale" delay={0.2}>
            <div className="relative rounded-xl overflow-hidden border border-primary/30 bg-black/80 backdrop-blur-xl shadow-[0_0_50px_rgba(124,58,237,0.15)] font-mono text-sm sm:text-base">
              
              {/* CRT Scanline Overlay */}
              <div className="absolute inset-0 pointer-events-none z-10 opacity-10 mix-blend-overlay" style={{ backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, #000 2px, #000 4px)' }}></div>
              
              {/* Terminal Header */}
              <div className="bg-[#111] px-4 py-3 border-b border-primary/20 flex items-center gap-2 relative z-20">
                <div className="w-3 h-3 rounded-full bg-red-500/80 shadow-[0_0_10px_rgba(239,68,68,0.5)]"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500/80 shadow-[0_0_10px_rgba(234,179,8,0.5)]"></div>
                <div className="w-3 h-3 rounded-full bg-green-500/80 shadow-[0_0_10px_rgba(34,197,94,0.5)]"></div>
                <div className="ml-4 text-white/40 text-xs tracking-widest uppercase">guest@ziad-sys: ~/contact</div>
              </div>

              {/* Terminal Body */}
              <div className="p-6 h-[400px] overflow-y-auto custom-scrollbar flex flex-col relative z-20">
                {lines.map((line) => (
                  <div key={line.id} className="mb-2">
                    {line.type === 'input' && <span className="text-white font-medium">{line.content}</span>}
                    {line.type === 'output' && <span className="text-[#c084fc] drop-shadow-[0_0_5px_rgba(192,132,252,0.4)]">{line.content}</span>}
                    {line.type === 'system' && <span className="text-gray-500 italic">{line.content}</span>}
                    {line.type === 'error' && <span className="text-red-400 drop-shadow-[0_0_5px_rgba(248,113,113,0.4)]">{line.content}</span>}
                    {line.type === 'success' && <span className="text-green-400 drop-shadow-[0_0_5px_rgba(74,222,128,0.4)]">{line.content}</span>}
                  </div>
                ))}
                
                <form onSubmit={onSubmit} className="mt-2 flex items-center flex-wrap">
                  <span className="text-primary mr-2 font-bold drop-shadow-[0_0_5px_rgba(124,58,237,0.5)]">
                    {mode === 'command' ? 'guest@ziad-sys:~$ ' : '> '}
                  </span>
                  <div className="relative flex-1 min-w-[200px] flex items-center">
                    <input
                      type="text"
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      className="w-full bg-transparent border-none outline-none text-white shadow-none focus:ring-0 p-0 z-10"
                      autoFocus
                      autoComplete="off"
                      spellCheck="false"
                    />
                    {/* Blinking Cursor */}
                    <span className="absolute text-white animate-[pulse_1s_ease-in-out_infinite] pointer-events-none" style={{ left: `${input.length}ch` }}>
                      █
                    </span>
                  </div>
                </form>
                <div ref={bottomRef} />
              </div>
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
