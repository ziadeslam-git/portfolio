import { useState, useRef, useEffect } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { Button } from './ui/button';

const AmbientAudio = () => {
  const [isMuted, setIsMuted] = useState(true);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = 0.2; // Keep it low and ambient
      if (!isMuted) {
        audioRef.current.play().catch(e => console.log("Audio play prevented:", e));
      } else {
        audioRef.current.pause();
      }
    }
  }, [isMuted]);

  return (
    <>
      {/* Placeholder audio track */}
      <audio 
        ref={audioRef}
        loop 
        src={`${import.meta.env.BASE_URL}ambient-placeholder.mp3`} 
      />
      
      <Button
        variant="outline"
        size="icon"
        onClick={() => setIsMuted(!isMuted)}
        className="fixed bottom-6 right-6 z-[9990] bg-black/50 backdrop-blur-md border border-white/10 hover:border-primary/50 hover:bg-black/80 rounded-full w-12 h-12 flex items-center justify-center transition-all duration-300"
        aria-label={isMuted ? "Unmute audio" : "Mute audio"}
      >
        {isMuted ? (
          <VolumeX className="w-5 h-5 text-white/50 hover:text-primary transition-colors" />
        ) : (
          <Volume2 className="w-5 h-5 text-primary drop-shadow-[0_0_8px_rgba(124,58,237,0.8)]" />
        )}
      </Button>
    </>
  );
};

export default AmbientAudio;
