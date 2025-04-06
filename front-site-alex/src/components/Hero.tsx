
import { ChevronDown, PhoneOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Hero = () => {
  const scrollToServices = () => {
    const servicesSection = document.getElementById("services");
    if (servicesSection) {
      servicesSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Background image with overlay */}
      <div className="absolute inset-0 z-0">
        <div 
          className="absolute inset-0 bg-gradient-to-r from-black/50 to-black/30 z-10"
          style={{ 
            backgroundImage: `url('https://images.unsplash.com/photo-1584622650111-993a426fbf0a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80')`,
            backgroundPosition: 'center',
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            backgroundBlendMode: 'overlay'
          }}
        ></div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <span className="inline-block py-1 px-3 rounded-full bg-white/10 backdrop-blur-sm text-white text-sm font-medium mb-6 animate-fade-in">
            Premium Bathroom Remodeling & Handyman Services
          </span>
          <h1 className="text-white mb-6 animate-fade-in" style={{ animationDelay: '0.1s' }}>
            Transform Your Space with Exceptional Craftsmanship
          </h1>
          <p className="text-white/90 text-lg md:text-xl mb-8 animate-fade-in" style={{ animationDelay: '0.2s' }}>
            We specialize in creating elegant, functional spaces with meticulous attention to detail and superior quality materials.
          </p>
          
          {/* No Phone Call Required Banner */}
          <div className="bg-gradient-to-r from-purple-600/90 to-indigo-600/90 p-4 rounded-lg mb-8 backdrop-blur-sm shadow-lg animate-fade-in" style={{ animationDelay: '0.25s' }}>
            <div className="flex items-center justify-center">
              <PhoneOff className="h-6 w-6 text-white mr-3" />
              <p className="text-white font-medium">Book Online - No Phone Call Required!</p>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-4 animate-fade-in" style={{ animationDelay: '0.3s' }}>
            <Button asChild size="lg" className="rounded-full px-8 py-6 bg-white text-foreground hover:bg-white/90">
              <Link to="/booking">Book a Consultation</Link>
            </Button>
            <Button asChild size="lg" className="rounded-full px-8 py-6 bg-white text-foreground hover:bg-white/90">
              <Link to="/portfolio">View Our Work</Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
        <button onClick={scrollToServices} className="text-white/80 hover:text-white transition-colors" aria-label="Scroll to services">
          <ChevronDown className="h-8 w-8" />
        </button>
      </div>
    </section>
  );
};

export default Hero;
