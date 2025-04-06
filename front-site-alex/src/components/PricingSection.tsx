
import { DollarSign, Tag, Clock, BadgeCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

interface PricingCardProps {
  title: string;
  priceRange: string;
  description: string;
  features: string[];
  popular?: boolean;
  delay: number;
}

const PricingCard = ({ title, priceRange, description, features, popular, delay }: PricingCardProps) => (
  <div 
    className={`relative rounded-2xl p-8 border transition-all reveal ${
      popular 
        ? "bg-gradient-to-b from-indigo-50 to-white border-indigo-200 shadow-lg" 
        : "bg-white border-gray-200 hover:border-gray-300 hover:shadow-md"
    }`}
    style={{ transitionDelay: `${delay}ms` }}
  >
    {popular && (
      <span className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-indigo-600 text-white text-xs font-bold py-1 px-3 rounded-full">
        Most Popular
      </span>
    )}
    
    <div className="space-y-6 grid justify-center">
      <div>
        <h3 className="text-xl font-semibold mb-2">{title}</h3>
        <div className="flex items-baseline mb-4">
          <span className="text-3xl font-bold">{priceRange}</span>
        </div>
        <p className="text-gray-600 text-sm">{description}</p>
      </div>
      
      <div className="border-t border-gray-100 pt-6">
        <ul className="space-y-3">
          {features.map((feature, index) => (
            <li key={index} className="flex">
              <BadgeCheck className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
              <span className="text-gray-600 text-sm">{feature}</span>
            </li>
          ))}
        </ul>
      </div>
      
      <Button asChild variant={popular ? "default" : "outline"} className="w-full justify-center">
        <Link to="/booking">Book Now</Link>
      </Button>
    </div>
  </div>
);

const PricingSection = () => {
  return (
    <section id="pricing" className="pt-24 bg-white">
      <div className="container mx-auto px-6">
        <div className="max-w-3xl mx-auto text-center mb-16 reveal">
          <span className="inline-block py-1 px-3 rounded-full bg-indigo-100 text-indigo-700 text-sm font-medium mb-4">
            Transparent Pricing
          </span>
          <h2 className="mb-6">Upfront Service Rates</h2>
          <p className="text-gray-600 text-lg">
            Our service costs are transparent and competitive. Material costs are additional and will be discussed during consultation.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <PricingCard
            title="Basic Handyman Services"
            priceRange="$75 - $150"
            description="Per hour rate for general repairs and installations"
            features={[
              "Plumbing repairs",
              "Electrical fixes",
              "Furniture assembly",
              "Small installations",
              "Drywall patching"
            ]}
            delay={100}
          />
          
          <PricingCard
            title="Bathroom Remodeling"
            priceRange="$3,000 - $15,000"
            description="Depending on scope and complexity"
            features={[
              "Fixture replacement",
              "Tile installation",
              "Vanity installation",
              "Lighting upgrades",
              "Complete remodels"
            ]}
            popular={true}
            delay={200}
          />
          
          <PricingCard
            title="Custom Projects"
            priceRange="Custom Quote"
            description="Tailored to your specific requirements"
            features={[
              "Multi-room renovations",
              "Custom designs",
              "Premium finishes",
              "Complex installations",
              "Commercial spaces"
            ]}
            delay={300}
          />
        </div>

        <div className="mt-16 max-w-3xl mx-auto bg-gray-50 rounded-xl p-6 reveal">
          <div className="flex items-start mb-4">
            <DollarSign className="h-5 w-5 text-gray-700 mr-3 mt-1 flex-shrink-0" />
            <div>
              <h3 className="font-semibold mb-1">Cost Transparency</h3>
              <p className="text-gray-600 text-sm">
                All pricing estimates exclude material costs. We'll provide detailed quotes after assessing your specific needs.
              </p>
            </div>
          </div>
          
          <div className="flex items-start mb-4">
            <Tag className="h-5 w-5 text-gray-700 mr-3 mt-1 flex-shrink-0" />
            <div>
              <h3 className="font-semibold mb-1">No Hidden Fees</h3>
              <p className="text-gray-600 text-sm">
                We believe in transparent pricing with no unexpected charges. Any additional work will be discussed before proceeding.
              </p>
            </div>
          </div>
          
          <div className="flex items-start">
            <Clock className="h-5 w-5 text-gray-700 mr-3 mt-1 flex-shrink-0" />
            <div>
              <h3 className="font-semibold mb-1">Book Online and Save</h3>
              <p className="text-gray-600 text-sm">
                Take advantage of our online booking system to schedule your service at your convenience—no phone calls required.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
