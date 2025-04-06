
import { Link } from "react-router-dom";
import { Instagram, Facebook, Linkedin, Mail, Phone, MapPin } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-50 border-t border-gray-100 pt-20 pb-10">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-10">
          <div className="space-y-6">
            <Link to="/" className="text-xl font-semibold tracking-tight flex items-center gap-1">
              <span className="text-foreground">Daryna</span>
              <span className="text-foreground/80 font-normal">Construction</span>
            </Link>
            <p className="text-sm text-gray-500 max-w-xs">
              Transforming spaces with precision craftsmanship and timeless design.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-gray-700 transition-colors" aria-label="Instagram">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-gray-700 transition-colors" aria-label="Facebook">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-gray-700 transition-colors" aria-label="LinkedIn">
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">Services</h3>
            <ul className="space-y-3">
              <li><Link to="/#bathroom-remodels" className="text-gray-500 hover:text-gray-700 text-sm transition-colors">Bathroom Remodels</Link></li>
              <li><Link to="/#handyman-services" className="text-gray-500 hover:text-gray-700 text-sm transition-colors">Handyman Services</Link></li>
              <li><Link to="/portfolio" className="text-gray-500 hover:text-gray-700 text-sm transition-colors">Our Portfolio</Link></li>
              <li><Link to="/#process" className="text-gray-500 hover:text-gray-700 text-sm transition-colors">Our Process</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">Company</h3>
            <ul className="space-y-3">
              <li><Link to="/about" className="text-gray-500 hover:text-gray-700 text-sm transition-colors">About Us</Link></li>
              <li><Link to="/contact" className="text-gray-500 hover:text-gray-700 text-sm transition-colors">Contact</Link></li>
              <li><Link to="/booking" className="text-gray-500 hover:text-gray-700 text-sm transition-colors">Book a Consultation</Link></li>
              <li><a href="#" className="text-gray-500 hover:text-gray-700 text-sm transition-colors">Privacy Policy</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">Contact</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <MapPin className="h-5 w-5 text-gray-400 mr-3 mt-0.5" />
                <span className="text-gray-500 text-sm">123 Renovation Street, Suite 100<br />Your City, ST 12345</span>
              </li>
              <li className="flex items-center">
                <Phone className="h-5 w-5 text-gray-400 mr-3" />
                <a href="tel:+15551234567" className="text-gray-500 hover:text-gray-700 text-sm transition-colors">(555) 123-4567</a>
              </li>
              <li className="flex items-center">
                <Mail className="h-5 w-5 text-gray-400 mr-3" />
                <a href="mailto:info@darynaconstruction.com" className="text-gray-500 hover:text-gray-700 text-sm transition-colors">info@darynaconstruction.com</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-200 mt-16 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-gray-500">
            &copy; {currentYear} Daryna Construction. All rights reserved.
          </p>
          <div className="mt-4 md:mt-0">
            <ul className="flex space-x-6">
              <li><a href="#" className="text-gray-500 hover:text-gray-700 text-sm transition-colors">Terms</a></li>
              <li><a href="#" className="text-gray-500 hover:text-gray-700 text-sm transition-colors">Privacy</a></li>
              <li><a href="#" className="text-gray-500 hover:text-gray-700 text-sm transition-colors">Cookies</a></li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
