import { useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BookingCalendar from "@/components/BookingCalendar";
import { Bath, Wrench, ArrowRight, PhoneOff, MapPin, Camera, CalendarIcon } from "lucide-react";

const Booking = () => {
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
      <main className="pt-20">
        <section className="bg-gray-50 py-24">
          <div className="container mx-auto px-6">
            <div className="max-w-3xl mx-auto text-center mb-16 reveal">
              <span className="inline-block py-1 px-3 rounded-full bg-gray-200 text-gray-700 text-sm font-medium mb-4">
                Quick & Easy Booking
              </span>
              <h1 className="mb-6">Book Online - No Phone Call Required</h1>
              <p className="text-gray-600 text-lg">
                Schedule your service in minutes without any phone calls. Simply select a date and time, provide your address,
                upload photos of the project area, and we'll take care of the rest.
              </p>
            </div>

            <div className="max-w-3xl mx-auto mb-12 bg-white rounded-lg p-6 reveal">
              <div className="flex items-center">
                <div className="rounded-full bg-green-100 p-3 mr-4">
                  <PhoneOff className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <h3 className="text-lg font-medium mb-1">100% Online Booking Process</h3>
                  <p className="text-gray-600">
                    Skip the phone calls and book your appointment entirely online. Our simplified booking system gets you the help you need without the hassle.
                  </p>
                </div>
              </div>
            </div>

            <div className="max-w-3xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-4 mb-20 reveal">
              <div className="bg-white rounded-lg p-5 shadow-subtle flex flex-col items-center text-center">
                <div className="rounded-full bg-blue-100 p-3 mb-3">
                  <CalendarIcon className="h-5 w-5 text-blue-600" />
                </div>
                <h3 className="text-lg font-medium mb-2">Choose Your Time</h3>
                <p className="text-gray-600 text-sm">
                  Select from our available dates and times that work best for your schedule.
                </p>
              </div>
              
              <div className="bg-white rounded-lg p-5 shadow-subtle flex flex-col items-center text-center">
                <div className="rounded-full bg-blue-100 p-3 mb-3">
                  <MapPin className="h-5 w-5 text-blue-600" />
                </div>
                <h3 className="text-lg font-medium mb-2">Add Your Address</h3>
                <p className="text-gray-600 text-sm">
                  Provide your service location so our team knows exactly where to go.
                </p>
              </div>
              
              <div className="bg-white rounded-lg p-5 shadow-subtle flex flex-col items-center text-center">
                <div className="rounded-full bg-blue-100 p-3 mb-3">
                  <Camera className="h-5 w-5 text-blue-600" />
                </div>
                <h3 className="text-lg font-medium mb-2">Upload Photos</h3>
                <p className="text-gray-600 text-sm">
                  Share photos of your project area so we can better prepare for your service.
                </p>
              </div>
            </div>

            <div className="max-w-4xl mx-auto mb-20 reveal">
              <BookingCalendar />
            </div>

            <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 reveal">
              <div className="bg-white rounded-2xl p-8 border border-gray-100 shadow-subtle">
                <div className="flex items-center mb-6">
                  <div className="bg-gray-100 rounded-full w-12 h-12 flex items-center justify-center mr-4">
                    <Bath className="h-6 w-6 text-gray-700" />
                  </div>
                  <h3 className="text-xl font-semibold">Bathroom Remodels</h3>
                </div>
                <p className="text-gray-600 mb-6">
                  Our bathroom remodeling services cover everything from minor updates to full renovations. 
                  You can book completely online - just provide details and photos of your current bathroom.
                </p>
                <ul className="space-y-3 mb-6">
                  {[
                    "Book online without phone calls",
                    "Upload photos of your current bathroom",
                    "Receive a detailed quote based on your photos",
                    "Clear project timeline sent to your email",
                    "Keep track of your project status online"
                  ].map((item, index) => (
                    <li key={index} className="flex items-center text-gray-600">
                      <ArrowRight className="h-4 w-4 text-gray-400 mr-2 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-white rounded-2xl p-8 border border-gray-100 shadow-subtle">
                <div className="flex items-center mb-6">
                  <div className="bg-gray-100 rounded-full w-12 h-12 flex items-center justify-center mr-4">
                    <Wrench className="h-6 w-6 text-gray-700" />
                  </div>
                  <h3 className="text-xl font-semibold">Handyman Services</h3>
                </div>
                <p className="text-gray-600 mb-6">
                  For handyman services, our online booking makes it simple to explain what needs fixing. 
                  Add photos of the problem areas and we'll arrive prepared to solve your issues.
                </p>
                <ul className="space-y-3 mb-6">
                  {[
                    "Fully online scheduling - no calls needed",
                    "Upload photos of what needs repair",
                    "Describe the issues in our simple form",
                    "Get confirmation and appointment details by email",
                    "Same-day service often available"
                  ].map((item, index) => (
                    <li key={index} className="flex items-center text-gray-600">
                      <ArrowRight className="h-4 w-4 text-gray-400 mr-2 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Booking;
