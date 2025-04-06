
import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import { cn } from "@/lib/utils";

interface Testimonial {
  id: number;
  name: string;
  role: string;
  image: string;
  comment: string;
  rating: number;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Emily Johnson",
    role: "Homeowner",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
    comment: "The bathroom renovation exceeded all our expectations. The attention to detail and quality of workmanship was exceptional. We're thrilled with our new space!",
    rating: 5
  },
  {
    id: 2,
    name: "Michael Rodriguez",
    role: "Property Manager",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
    comment: "We've hired Elegant Renovations for multiple properties. Their handyman services are reliable, professional, and consistently high-quality. Highly recommended!",
    rating: 5
  },
  {
    id: 3,
    name: "Sarah Chen",
    role: "Interior Designer",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=764&q=80",
    comment: "As an interior designer, I appreciate working with professionals who understand quality and craftsmanship. Their bathroom remodels are executed flawlessly.",
    rating: 5
  },
  {
    id: 4,
    name: "David Thompson",
    role: "Homeowner",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
    comment: "The team was punctual, organized, and maintained excellent communication throughout the project. Our bathroom is now the most beautiful room in our house!",
    rating: 5
  }
];

const TestimonialsSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [sliding, setSliding] = useState(false);

  const nextTestimonial = () => {
    if (!sliding) {
      setSliding(true);
      setActiveIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
    }
  };

  const prevTestimonial = () => {
    if (!sliding) {
      setSliding(true);
      setActiveIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setSliding(false);
    }, 500);

    return () => clearTimeout(timer);
  }, [activeIndex]);

  return (
    <section className="py-24 bg-gray-50 overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="max-w-3xl mx-auto text-center mb-16 reveal">
          <span className="inline-block py-1 px-3 rounded-full bg-gray-200 text-gray-700 text-sm font-medium mb-4">
            Client Testimonials
          </span>
          <h2 className="mb-6">What Our Clients Say</h2>
          <p className="text-gray-600 text-lg">
            We take pride in our work and the satisfaction of our clients. Here's what they have to say
            about their experience working with us.
          </p>
        </div>

        <div className="relative max-w-4xl mx-auto reveal">
          {/* Testimonials slider */}
          <div className="overflow-hidden relative">
            <div 
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${activeIndex * 100}%)` }}
            >
              {testimonials.map((testimonial) => (
                <div key={testimonial.id} className="min-w-full p-6">
                  <div className="bg-white rounded-2xl p-8 md:p-10 shadow-subtle text-center">
                    <div className="flex justify-center mb-6">
                      {Array.from({ length: 5 }).map((_, index) => (
                        <Star
                          key={index}
                          className={cn(
                            "h-5 w-5",
                            index < testimonial.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
                          )}
                        />
                      ))}
                    </div>
                    <p className="text-gray-700 text-lg mb-8 italic">"{testimonial.comment}"</p>
                    <div className="flex items-center justify-center">
                      <div className="w-12 h-12 rounded-full overflow-hidden mr-4">
                        <img
                          src={testimonial.image}
                          alt={testimonial.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="text-left">
                        <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                        <p className="text-gray-500 text-sm">{testimonial.role}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation buttons */}
          <button
            onClick={prevTestimonial}
            className="absolute top-1/2 left-0 -translate-y-1/2 -translate-x-1/2 bg-white rounded-full w-10 h-10 flex items-center justify-center shadow-subtle hover:bg-gray-50 transition-colors z-10 md:-translate-x-5"
            aria-label="Previous testimonial"
            disabled={sliding}
          >
            <ChevronLeft className="h-5 w-5 text-gray-700" />
          </button>
          <button
            onClick={nextTestimonial}
            className="absolute top-1/2 right-0 -translate-y-1/2 translate-x-1/2 bg-white rounded-full w-10 h-10 flex items-center justify-center shadow-subtle hover:bg-gray-50 transition-colors z-10 md:translate-x-5"
            aria-label="Next testimonial"
            disabled={sliding}
          >
            <ChevronRight className="h-5 w-5 text-gray-700" />
          </button>

          {/* Indicators */}
          <div className="flex justify-center mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => !sliding && setActiveIndex(index)}
                className={cn(
                  "w-2 h-2 rounded-full mx-1 transition-all duration-300",
                  index === activeIndex ? "bg-gray-700 w-6" : "bg-gray-300"
                )}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
