import { Card } from "@/components/ui/card";
import { Rocket, Settings, Smartphone } from "lucide-react";

export default function Features() {
  return (
    <section className="my-20 text-center max-w-[1200px] mx-auto px-4">
      <h2 className="text-3xl font-bold text-white mb-5">Features</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 p-6">
        <FeatureCard
          icon={<Rocket className="w-6 h-6" />}
          title="Easy Text Input"
          description="Simply input your text and we will generate flashcards for you. Creating flashcards has never been easier."
        />

        <FeatureCard
          icon={<Settings className="w-6 h-6" />}
          title="Customizable Options"
          description="Tailor your flashcards with customizable question and answers to suit your learning needs."
        />

        <FeatureCard
          icon={<Smartphone className="w-6 h-6" />}
          title="Accessible Anywhere"
          description="Access your flashcards on any device and continue your learning wherever you are."
        />
      </div>
    </section>
  );
}

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}
function FeatureCard({ icon, title, description }: FeatureCardProps) {
  return (
    <Card
      className="
      bg-white/10 p-6 rounded-xl backdrop-blur-sm
      border border-transparent 
      hover:border-gradient hover:border-gradient-to-r hover:from-[#BE123C] hover:to-black
      transition-all duration-200 hover:scale-105
      text-left flex flex-col h-full
    "
    >
      <div className="flex items-center mb-4">
        <div className="p-2 rounded-full bg-[#c53030]">
          {" "}
          {/* Changed here */}
          {icon}
        </div>
      </div>
      <h3 className="text-lg font-semibold text-white mb-2">{title}</h3>
      <p className="text-white/80">{description}</p>
    </Card>
  );
}
