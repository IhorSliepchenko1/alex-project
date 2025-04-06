
import { useEffect } from "react";
import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ServicesSection from "@/components/ServicesSection";
import GallerySection from "@/components/GallerySection";
import TestimonialsSection from "@/components/TestimonialsSection";
import ContactForm from "@/components/ContactForm";
import PricingSection from "@/components/PricingSection";
import { PhoneOff, Calendar, Camera, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Index = () => {
  // Handle animations on scroll
  useEffect(() => {
    const handleIntersection = (entries: IntersectionObserverEntry[]) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersection, {
      root: null,
      rootMargin: '0px',
      threshold: 0.1
    });

    const elements = document.querySelectorAll('.reveal');
    elements.forEach(element => {
      observer.observe(element);
    });

    return () => {
      elements.forEach(element => {
        observer.unobserve(element);
      });
    };
  }, []);

  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        <Hero />
        
        {/* No Phone Call Required Feature Section */}
        <section className="pt-16 bg-gray-50">
          <div className="container mx-auto px-6">
            <div className="max-w-3xl mx-auto reveal">
              <div className="flex items-center justify-center mb-8">
                <div className="bg-indigo-100 p-3 rounded-full mr-4">
                  <PhoneOff className="h-6 w-6 text-indigo-600" />
                </div>
                <h2 className="text-2xl md:text-3xl font-bold">Book Without Phone Calls</h2>
              </div>
              
              <p className="text-gray-600 text-center mb-10">
                We understand that not everyone wants to make phone calls. Our streamlined online booking system allows you to schedule services entirely online without ever picking up the phone.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                <div className="bg-white p-6 rounded-xl shadow-subtle text-center">
                  <div className="bg-blue-50 w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Calendar className="h-6 w-6 text-blue-600" />
                  </div>
                  <h3 className="font-semibold mb-2">Choose Your Date & Time</h3>
                  <p className="text-gray-500 text-sm">Select from available time slots that fit your schedule</p>
                </div>
                
                <div className="bg-white p-6 rounded-xl shadow-subtle text-center">
                  <div className="bg-blue-50 w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Camera className="h-6 w-6 text-blue-600" />
                  </div>
                  <h3 className="font-semibold mb-2">Upload Photos</h3>
                  <p className="text-gray-500 text-sm">Show us your project area so we understand the scope</p>
                </div>
                
                <div className="bg-white p-6 rounded-xl shadow-subtle text-center">
                  <div className="bg-blue-50 w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4">
                    <ArrowRight className="h-6 w-6 text-blue-600" />
                  </div>
                  <h3 className="font-semibold mb-2">We'll Handle The Rest</h3>
                  <p className="text-gray-500 text-sm">Receive confirmation and updates without any calls</p>
                </div>
              </div>
              
              <div className="text-center">
                <Button asChild size="lg" className="rounded-full px-8">
                  <Link to="/booking">Schedule Now - No Calls Needed</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
        
        <ServicesSection />
        <PricingSection />
        <GallerySection />
        <TestimonialsSection />
        <ContactForm />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
