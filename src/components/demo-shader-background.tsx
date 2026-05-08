import ShaderBackground from "@/components/ui/shader-background";

const DemoOne = () => {
  return (
    <div className="relative w-full h-screen overflow-hidden text-white flex items-center justify-center">
      <ShaderBackground />
      <div className="z-10 text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-4 drop-shadow-lg">
          Shader Background
        </h1>
        <p className="text-lg md:text-xl text-slate-200">
          A WebGL powered background effect
        </p>
      </div>
    </div>
  );
};

export { DemoOne };
