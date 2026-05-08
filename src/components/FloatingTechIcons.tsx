interface FloatingIconProps {
  icon: React.ReactNode;
  className?: string;
  delay?: number;
  glowColor?: string;
  scale?: number;
  blur?: boolean;
}

const FloatingIcon = ({ icon, className = "", delay = 0, glowColor = "primary", scale = 1, blur = false }: FloatingIconProps) => {
  const glowClasses = {
    primary: "shadow-[0_0_40px_rgba(124,58,237,0.4)]",
    accent: "shadow-[0_0_40px_rgba(155,48,255,0.4)]",
    blue: "shadow-[0_0_40px_rgba(55,118,171,0.4)]",
    red: "shadow-[0_0_40px_rgba(204,41,39,0.4)]",
  };

  return (
    <div 
      className={`absolute animate-float-slow ${className}`}
      style={{ 
        animationDelay: `${delay}s`,
        transform: `scale(${scale})`,
        filter: blur ? 'blur(3px)' : 'none',
        opacity: blur ? 0.7 : 1
      }}
    >
      <div className={`w-14 h-14 sm:w-16 sm:h-16 lg:w-20 lg:h-20 rounded-2xl bg-[#0a0a0a] border border-white/5 flex items-center justify-center ${glowClasses[glowColor as keyof typeof glowClasses] || glowClasses.primary} transition-all duration-300`}>
        {icon}
      </div>
    </div>
  );
};

export const FloatingTechIcons = ({ layer }: { layer: "back" | "front" }) => {
  
  const allIcons = [
    {
      icon: <span className="text-xl font-bold text-[#9B4F96]">C#</span>,
      position: "top-[5%] left-[10%] lg:left-[5%]",
      delay: 0,
      glowColor: "accent",
      scale: 0.85,
      blur: true
    },
    {
      icon: (
        <svg className="w-8 h-8" viewBox="0 0 24 24" fill="#3776AB">
          <path d="M14.25.18l.9.2.73.26.59.3.45.32.34.34.25.34.16.33.1.3.04.26.02.2-.01.13V8.5l-.05.63-.13.55-.21.46-.26.38-.3.31-.33.25-.35.19-.35.14-.33.1-.3.07-.26.04-.21.02H8.77l-.69.05-.59.14-.5.22-.41.27-.33.32-.27.35-.2.36-.15.37-.1.35-.07.32-.04.28-.02.21v3.06H3.17l-.21-.03-.28-.07-.32-.12-.35-.18-.36-.26-.36-.36-.35-.46-.32-.59-.28-.73-.21-.88-.14-1.05-.05-1.23.06-1.22.16-1.04.24-.87.32-.71.36-.57.4-.44.42-.33.42-.24.4-.16.36-.1.32-.05.24-.01h.16l.06.01h8.16v-.83H6.18l-.01-2.75-.02-.37.05-.34.11-.31.17-.28.25-.26.31-.23.38-.2.44-.18.51-.15.58-.12.64-.1.71-.06.77-.04.84-.02 1.27.05zm-6.3 1.98l-.23.33-.08.41.08.41.23.34.33.22.41.09.41-.09.33-.22.23-.34.08-.41-.08-.41-.23-.33-.33-.22-.41-.09-.41.09zm13.09 3.95l.28.06.32.12.35.18.36.27.36.35.35.47.32.59.28.73.21.88.14 1.04.05 1.23-.06 1.23-.16 1.04-.24.86-.32.71-.36.57-.4.45-.42.33-.42.24-.4.16-.36.09-.32.05-.24.02-.16-.01h-8.22v.82h5.84l.01 2.76.02.36-.05.34-.11.31-.17.29-.25.25-.31.24-.38.2-.44.17-.51.15-.58.13-.64.09-.71.07-.77.04-.84.01-1.27-.04-1.07-.14-.9-.2-.73-.25-.59-.3-.45-.33-.34-.34-.25-.34-.16-.33-.1-.3-.04-.25-.02-.2.01-.13v-5.34l.05-.64.13-.54.21-.46.26-.38.3-.32.33-.24.35-.2.35-.14.33-.1.3-.06.26-.04.21-.02.13-.01h5.84l.69-.05.59-.14.5-.21.41-.28.33-.32.27-.35.2-.36.15-.36.1-.35.07-.32.04-.28.02-.21V6.07h2.09l.14.01zm-6.47 14.25l-.23.33-.08.41.08.41.23.33.33.23.41.08.41-.08.33-.23.23-.33.08-.41-.08-.41-.23-.33-.33-.23-.41-.08-.41.08z"/>
        </svg>
      ),
      position: "top-[10%] right-[10%] lg:-right-[5%]",
      delay: 1.5,
      glowColor: "blue",
      scale: 0.8,
      blur: true
    },
    {
      icon: <span className="text-xl font-bold text-[#CC2927]">SQL</span>,
      position: "bottom-[15%] left-[15%] lg:left-[5%]",
      delay: 1,
      glowColor: "red",
      scale: 0.9,
      blur: true
    },
    {
      icon: <span className="text-xl font-bold text-[#512BD4]">.NET</span>,
      position: "top-[45%] left-[5%] lg:-left-[15%]",
      delay: 0.5,
      glowColor: "accent",
      scale: 0.85,
      blur: true
    },
    {
      icon: (
        <svg className="w-8 h-8" viewBox="0 0 24 24" fill="#F05032">
          <path d="M23.546 10.93L13.067.452c-.604-.603-1.582-.603-2.188 0L8.708 2.627l2.76 2.76c.645-.215 1.379-.07 1.889.441.516.515.658 1.258.438 1.9l2.658 2.66c.645-.223 1.387-.078 1.9.435.721.72.721 1.884 0 2.604-.719.719-1.881.719-2.6 0-.539-.541-.674-1.337-.404-1.996L12.86 8.955v6.525c.176.086.342.203.488.348.713.721.713 1.883 0 2.6-.719.721-1.889.721-2.609 0-.719-.719-.719-1.879 0-2.598.182-.18.387-.316.605-.406V8.835c-.217-.091-.424-.222-.6-.401-.545-.545-.676-1.342-.396-2.009L7.636 3.7.45 10.881c-.6.605-.6 1.584 0 2.189l10.48 10.477c.604.604 1.582.604 2.186 0l10.43-10.43c.605-.603.605-1.582 0-2.187"/>
        </svg>
      ),
      position: "top-[55%] right-[5%] lg:-right-[10%]",
      delay: 2,
      glowColor: "accent",
      scale: 0.8,
      blur: true
    },
    {
      icon: <span className="text-2xl font-bold text-white">&lt;/&gt;</span>,
      position: "bottom-[20%] right-[10%] lg:right-[15%]",
      delay: 2.5,
      glowColor: "primary",
      scale: 0.9,
      blur: true
    },
  ];

  if (layer === "front") return null;

  return (
    <div className="absolute inset-0 pointer-events-none z-0">
      {allIcons.map((item, index) => (
        <FloatingIcon
          key={index}
          icon={item.icon}
          className={item.position}
          delay={item.delay}
          glowColor={item.glowColor}
          scale={item.scale}
          blur={item.blur}
        />
      ))}
    </div>
  );
};

export default FloatingTechIcons;
