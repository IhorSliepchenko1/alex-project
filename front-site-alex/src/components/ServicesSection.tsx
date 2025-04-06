
import { Bath, Wrench, Clock, Check, User, PaintBucket } from "lucide-react";
import { cn } from "@/lib/utils";

interface ServiceCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  className?: string;
  delay: number;
}

const ServiceCard = ({ icon, title, description, className, delay }: ServiceCardProps) => (
  <div 
    className={cn(
      "bg-white rounded-2xl p-8 shadow-subtle card-hover reveal",
      className
    )}
    style={{ transitionDelay: `${delay}ms` }}
  >
    <div className="rounded-full bg-gray-50 w-12 h-12 flex items-center justify-center mb-6">
      {icon}
    </div>
    <h3 className="text-xl font-semibold mb-3">{title}</h3>
    <p className="text-gray-600">{description}</p>
  </div>
);

const ServicesSection = () => {
  return (
    <section id="services" className="py-24 bg-gray-50">
      <div className="container mx-auto px-6">
        <div className="max-w-3xl mx-auto text-center mb-16 reveal">
          <span className="inline-block py-1 px-3 rounded-full bg-gray-200 text-gray-700 text-sm font-medium mb-4">
            Our Expertise
          </span>
          <h2 className="mb-6">Transformative Services for Your Home</h2>
          <p className="text-gray-600 text-lg">
            We offer comprehensive solutions for bathroom renovations and general handyman services,
            executed with precision and care for exceptional results.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <ServiceCard
            icon={<Bath className="h-6 w-6 text-gray-700" />}
            title="Bathroom Remodels"
            description="Complete bathroom transformations that blend functionality with elegant design, tailored to your aesthetic preferences."
            delay={100}
          />
          
          <ServiceCard
            icon={<Wrench className="h-6 w-6 text-gray-700" />}
            title="Handyman Services"
            description="Professional solutions for repairs, installations, and maintenance tasks throughout your home."
            delay={200}
          />
          
          <ServiceCard
            icon={<PaintBucket className="h-6 w-6 text-gray-700" />}
            title="Custom Finishes"
            description="Premium painting and finishing touches that elevate your space with attention to detail."
            delay={300}
          />
          
          <ServiceCard
            icon={<User className="h-6 w-6 text-gray-700" />}
            title="Personalized Design"
            description="Collaborative design process that reflects your vision and lifestyle needs."
            delay={400}
          />
          
          <ServiceCard
            icon={<Clock className="h-6 w-6 text-gray-700" />}
            title="Timely Completion"
            description="Efficient project management ensuring your renovation is completed on schedule."
            delay={500}
          />
          
          <ServiceCard
            icon={<Check className="h-6 w-6 text-gray-700" />}
            title="Quality Guarantee"
            description="Craftsmanship backed by our satisfaction guarantee and premium materials."
            delay={600}
          />
        </div>

        <div id="bathroom-remodels" className="mt-24 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center reveal">
          <div>
            <span className="inline-block py-1 px-3 rounded-full bg-gray-200 text-gray-700 text-sm font-medium mb-4">
              Bathroom Remodels
            </span>
            <h2 className="mb-6">Elevate Your Bathroom Experience</h2>
            <p className="text-gray-600 mb-6">
              Our bathroom remodeling service transforms ordinary spaces into luxurious personal retreats. We handle every aspect of the renovation, from initial design to final installation.
            </p>
            <ul className="space-y-3 mb-8">
              {[
                "Custom shower and bath installations",
                "Premium fixtures and hardware",
                "Elegant tile work and stone surfaces",
                "Space-optimizing storage solutions",
                "Luxury lighting and ventilation systems",
                "Water-efficient toilet and faucet options"
              ].map((item, index) => (
                <li key={index} className="flex items-start">
                  <Check className="h-5 w-5 text-gray-700 mr-3 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-600">{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-2xl overflow-hidden shadow-elevation relative h-[500px]">
            <img 
              src="https://images.unsplash.com/photo-1595515106865-dd97b7d3a855?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1035&q=80" 
              alt="Luxury bathroom renovation" 
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        <div id="handyman-services" className="mt-24 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center reveal">
          <div className="order-2 lg:order-1 rounded-2xl overflow-hidden shadow-elevation relative h-[500px]">
            <img 
              src="https://images.unsplash.com/photo-1621905252507-b35492cc74b4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1035&q=80" 
              alt="Professional handyman services" 
              className="w-full h-full object-cover"
            />
          </div>
          <div className="order-1 lg:order-2">
            <span className="inline-block py-1 px-3 rounded-full bg-gray-200 text-gray-700 text-sm font-medium mb-4">
              Handyman Services
            </span>
            <h2 className="mb-6">Professional Solutions for Every Need</h2>
            <p className="text-gray-600 mb-6">
              Our skilled handyman services address all your home maintenance and improvement needs with professionalism and attention to detail.
            </p>
            <ul className="space-y-3 mb-8">
              {[
                "Plumbing repairs and installations",
                "Electrical work and lighting upgrades",
                "Drywall repair and installation",
                "Tile and flooring installation",
                "Door and window repairs",
                "Furniture assembly and installation"
              ].map((item, index) => (
                <li key={index} className="flex items-start">
                  <Check className="h-5 w-5 text-gray-700 mr-3 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-600">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
