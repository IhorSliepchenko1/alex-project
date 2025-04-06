
import { useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ContactForm from "@/components/ContactForm";

const Contact = () => {
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
        <ContactForm />
        
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-6">
            <div className="max-w-3xl mx-auto text-center mb-16 reveal">
              <h2 className="text-2xl font-semibold mb-4">Visit Our Showroom</h2>
              <p className="text-gray-600">
                Experience our craftsmanship firsthand by visiting our showroom, where you can explore material samples,
                view completed project displays, and meet with our design team.
              </p>
            </div>
            
            <div className="reveal">
              <div className="bg-white rounded-2xl shadow-subtle overflow-hidden">
                <div className="aspect-w-16 aspect-h-9 relative h-[400px]">
                  <iframe 
                    title="Elegant Renovations Location"
                    className="w-full h-full"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d387193.30591910506!2d-74.25987584358124!3d40.697149422113014!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c24fa5d33f083b%3A0xc80b8f06e177fe62!2sNew%20York%2C%20NY%2C%20USA!5e0!3m2!1sen!2sca!4v1622839309319!5m2!1sen!2sca" 
                    style={{ border: 0 }} 
                    allowFullScreen 
                    loading="lazy"
                  ></iframe>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 bg-white">
          <div className="container mx-auto px-6">
            <div className="max-w-3xl mx-auto text-center mb-16 reveal">
              <h2 className="text-2xl font-semibold mb-4">Frequently Asked Questions</h2>
              <p className="text-gray-600">
                Find answers to common questions about our services, process, and policies.
              </p>
            </div>
            
            <div className="max-w-3xl mx-auto grid gap-6 reveal">
              {[
                {
                  question: "How long does a typical bathroom remodel take?",
                  answer: "The timeline for a bathroom remodel varies depending on the scope of work, but a typical full renovation takes 2-4 weeks. Factors that can affect the timeline include the size of the bathroom, extent of structural changes, and availability of materials."
                },
                {
                  question: "Do you provide free estimates?",
                  answer: "Yes, we provide free estimates for all projects. After an initial consultation, we'll assess your needs and provide a detailed quote that outlines all costs involved in your renovation or handyman service."
                },
                {
                  question: "Are you licensed and insured?",
                  answer: "Yes, we are fully licensed and insured. Our team of professionals holds all necessary certifications, and we maintain comprehensive insurance coverage to protect your property during the renovation process."
                },
                {
                  question: "What types of payment do you accept?",
                  answer: "We accept various payment methods including credit cards, checks, and electronic transfers. For larger projects, we typically structure payments in installments tied to project milestones."
                },
                {
                  question: "Do you offer warranties on your work?",
                  answer: "Yes, we stand behind our craftsmanship with a warranty on all work performed. Additionally, manufacturer warranties apply to products and materials installed during your renovation."
                }
              ].map((faq, index) => (
                <div key={index} className="bg-gray-50 rounded-xl p-6 border border-gray-100">
                  <h3 className="text-lg font-semibold mb-2">{faq.question}</h3>
                  <p className="text-gray-600">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Contact;
