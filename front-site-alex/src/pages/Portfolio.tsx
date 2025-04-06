
import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { cn } from "@/lib/utils";

interface Project {
  id: number;
  title: string;
  category: string;
  description: string;
  images: string[];
  challenge: string;
  solution: string;
  result: string;
}

const projects: Project[] = [
  {
    id: 1,
    title: "Modern Minimalist Bathroom",
    category: "Bathroom Remodel",
    description: "A complete transformation of an outdated bathroom into a sleek, modern space with clean lines and a minimalist aesthetic.",
    images: [
      "https://images.unsplash.com/photo-1584622781564-1d987f7333c1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
      "https://images.unsplash.com/photo-1620626011761-996317b8d101?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1469&q=80",
      "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
    ],
    challenge: "The original bathroom was cramped, with outdated fixtures, poor lighting, and inefficient storage. The client wanted a spacious, modern bathroom with improved functionality while working within the existing footprint.",
    solution: "We removed all existing fixtures and finishes, reconfigured the layout to maximize space, and installed a floating vanity to create a sense of openness. A walk-in shower with frameless glass enclosure replaced the old tub, and we added LED lighting throughout for a bright, inviting atmosphere.",
    result: "The transformed bathroom now features a cohesive design with a neutral color palette, premium materials, and state-of-the-art fixtures. The client gained significantly more functional space and storage without changing the room's footprint."
  },
  {
    id: 2,
    title: "Luxurious Master Bath Suite",
    category: "Bathroom Remodel",
    description: "A complete renovation of a master bathroom, transforming it into a spa-like retreat with premium fixtures and finishes.",
    images: [
      "https://images.unsplash.com/photo-1600566752355-35792bedcfea?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
      "https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1471&q=80",
      "https://images.unsplash.com/photo-1604709177225-055f99402ea3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
    ],
    challenge: "The homeowners wanted to transform their outdated master bathroom into a luxurious spa-like retreat that would serve as a relaxing escape from their busy lives. The existing bathroom had limited storage, poor lighting, and an inefficient layout.",
    solution: "We designed a comprehensive renovation that included a freestanding soaking tub, a spacious walk-in shower with multiple showerheads, heated floors, and custom cabinetry. Natural stone tiles and warm wood accents were used to create a serene atmosphere.",
    result: "The completed master bathroom now provides the homeowners with their desired spa-like experience, featuring premium materials, elegant design, and enhanced functionality. The space has become their favorite room in the house."
  },
  {
    id: 3,
    title: "Contemporary Kitchen Renovation",
    category: "Handyman Services",
    description: "A comprehensive update of a kitchen with modern appliances, custom cabinetry, and premium finishes.",
    images: [
      "https://images.unsplash.com/photo-1556911220-bda9f7f6b6b5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1635&q=80",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1453&q=80",
      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
    ],
    challenge: "The clients had an outdated kitchen with limited counter space, insufficient storage, and appliances that were no longer functioning optimally. They desired a modern, functional kitchen that would better accommodate their love of cooking and entertaining.",
    solution: "We completely gutted the existing kitchen and implemented a new layout that maximized efficiency and flow. Custom cabinetry was installed to address storage needs, along with quartz countertops, a large island with seating, and high-end stainless steel appliances.",
    result: "The renovated kitchen now serves as the heart of the home, providing ample space for cooking and gathering. The clients have reported that the improved functionality has significantly enhanced their daily life and entertaining capabilities."
  },
  {
    id: 4,
    title: "Elegant Powder Room Makeover",
    category: "Bathroom Remodel",
    description: "A sophisticated transformation of a small powder room into a stylish space with high-end fixtures and artistic details.",
    images: [
      "https://images.unsplash.com/photo-1600566752547-20e636909763?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
      "https://images.unsplash.com/photo-1604014237800-1c9102c219da?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
      "https://images.unsplash.com/photo-1620626011761-996317b8d101?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1469&q=80",
    ],
    challenge: "The clients wanted to transform their small, uninspiring powder room into a statement space that would impress guests while maintaining functionality. The limited square footage presented a significant design challenge.",
    solution: "We focused on high-impact elements that would maximize the visual appeal without overwhelming the small space. This included designer wallpaper, a floating vanity with a vessel sink, statement lighting, and high-end fixtures. Mirrors and strategic lighting were used to create an illusion of more space.",
    result: "The powder room is now a jewel box that makes a strong design statement. Despite its small size, it has become one of the most commented-on spaces in the clients' home, proving that thoughtful design can transform even the smallest areas into something special."
  },
  {
    id: 5,
    title: "Custom Built-In Cabinetry",
    category: "Handyman Services",
    description: "Custom designed and built storage solutions for a living room, featuring detailed craftsmanship and integrated lighting.",
    images: [
      "https://images.unsplash.com/photo-1601084881623-cdf9a8ea242c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
      "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1632&q=80",
      "https://images.unsplash.com/photo-1609347744403-2306e8a9ae27?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
    ],
    challenge: "The homeowners needed storage solutions that would accommodate their extensive book collection and media equipment while complementing their living room's aesthetic. They wanted built-ins that would look like architectural features rather than furniture.",
    solution: "We designed and constructed custom floor-to-ceiling built-in cabinetry that utilized the full height of the room. The design included open shelving for book display, closed storage for less attractive items, and an integrated media center. LED lighting was incorporated to highlight displayed objects.",
    result: "The custom cabinetry has transformed the living room, providing abundant storage while creating a sophisticated focal point. The clients now have a beautiful, organized space that perfectly addresses their functional needs while enhancing the room's overall design."
  },
  {
    id: 6,
    title: "Walk-In Shower Installation",
    category: "Bathroom Remodel",
    description: "Conversion of a traditional tub-shower combination into a spacious, accessible walk-in shower with luxury features.",
    images: [
      "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
      "https://images.unsplash.com/photo-1584622781564-1d987f7333c1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
      "https://images.unsplash.com/photo-1631889993959-41b4e9c6e3c5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1632&q=80",
    ],
    challenge: "The clients wanted to replace their outdated tub-shower combination with a spacious, accessible walk-in shower that would accommodate their aging-in-place needs while still looking stylish and contemporary.",
    solution: "We removed the existing tub and expanded the shower area to create a generous walk-in shower with a zero-threshold entry. The design included a built-in bench, multiple showerheads, recessed niches for toiletries, and grab bars that were integrated seamlessly into the design. Large-format porcelain tiles were used for a clean, modern look.",
    result: "The new walk-in shower provides the accessibility the clients needed without sacrificing style. The bathroom now has a more spacious feel, and the shower has become a luxurious retreat with its spa-like features. The project successfully balanced functional requirements with aesthetic preferences."
  },
];

const Portfolio = () => {
  const [filter, setFilter] = useState("All");
  const [filteredProjects, setFilteredProjects] = useState<Project[]>(projects);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    // Handle filtering
    if (filter === "All") {
      setFilteredProjects(projects);
    } else {
      setFilteredProjects(projects.filter(project => project.category === filter));
    }
  }, [filter]);

  useEffect(() => {
    // Handle animations on scroll
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
  }, [filteredProjects]);

  const openProjectDetails = (project: Project) => {
    setSelectedProject(project);
    setCurrentImageIndex(0);
    document.body.style.overflow = 'hidden';
  };

  const closeProjectDetails = () => {
    setSelectedProject(null);
    document.body.style.overflow = 'auto';
  };

  const nextImage = () => {
    if (selectedProject) {
      setCurrentImageIndex((prevIndex) => 
        prevIndex === selectedProject.images.length - 1 ? 0 : prevIndex + 1
      );
    }
  };

  const prevImage = () => {
    if (selectedProject) {
      setCurrentImageIndex((prevIndex) => 
        prevIndex === 0 ? selectedProject.images.length - 1 : prevIndex - 1
      );
    }
  };

  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="pt-20">
        <section className="bg-gray-50 py-24">
          <div className="container mx-auto px-6">
            <div className="max-w-3xl mx-auto text-center mb-16 reveal">
              <span className="inline-block py-1 px-3 rounded-full bg-gray-200 text-gray-700 text-sm font-medium mb-4">
                Our Work
              </span>
              <h1 className="mb-6">Portfolio</h1>
              <p className="text-gray-600 text-lg">
                Explore our collection of completed projects that showcase our commitment to quality,
                craftsmanship, and attention to detail.
              </p>
            </div>

            <div className="flex justify-center mb-10 reveal">
              <div className="inline-flex bg-gray-100 rounded-full p-1">
                {["All", "Bathroom Remodel", "Handyman Services"].map((category) => (
                  <button
                    key={category}
                    onClick={() => setFilter(category)}
                    className={cn(
                      "px-5 py-2 text-sm font-medium rounded-full transition-all",
                      filter === category
                        ? "bg-white shadow-sm text-gray-900"
                        : "text-gray-500 hover:text-gray-900"
                    )}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProjects.map((project, index) => (
                <div
                  key={project.id}
                  className="reveal"
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  <div 
                    className="group rounded-xl overflow-hidden shadow-subtle card-hover cursor-pointer"
                    onClick={() => openProjectDetails(project)}
                  >
                    <div className="relative h-64 overflow-hidden">
                      <img
                        src={project.images[0]}
                        alt={project.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="absolute bottom-0 w-full p-6">
                          <span className="text-white/80 text-sm">{project.category}</span>
                          <h3 className="text-white text-xl font-medium mt-1">{project.title}</h3>
                        </div>
                      </div>
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
                      <p className="text-gray-600 mb-4 line-clamp-2">{project.description}</p>
                      <span className="text-sm font-medium text-gray-500">{project.category}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* Project Details Modal */}
      {selectedProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 animate-fade-in">
          <div className="bg-white rounded-2xl max-w-5xl w-full max-h-[90vh] overflow-y-auto animate-scale-in relative">
            <button
              onClick={closeProjectDetails}
              className="absolute top-4 right-4 z-10 bg-white rounded-full p-2 shadow-subtle text-gray-500 hover:text-gray-900 transition-colors"
              aria-label="Close details"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            
            <div className="relative h-[40vh] md:h-[50vh] bg-gray-100">
              <img
                src={selectedProject.images[currentImageIndex]}
                alt={selectedProject.title}
                className="w-full h-full object-cover"
              />
              
              {selectedProject.images.length > 1 && (
                <>
                  <button
                    onClick={prevImage}
                    className="absolute top-1/2 left-4 -translate-y-1/2 bg-white/80 rounded-full p-2 shadow-subtle hover:bg-white transition-colors"
                    aria-label="Previous image"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute top-1/2 right-4 -translate-y-1/2 bg-white/80 rounded-full p-2 shadow-subtle hover:bg-white transition-colors"
                    aria-label="Next image"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </>
              )}
              
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
                {selectedProject.images.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={cn(
                      "w-2 h-2 rounded-full transition-all",
                      index === currentImageIndex ? "bg-white w-6" : "bg-white/50"
                    )}
                    aria-label={`Go to image ${index + 1}`}
                  />
                ))}
              </div>
            </div>
            
            <div className="p-8">
              <span className="inline-block py-1 px-3 rounded-full bg-gray-200 text-gray-700 text-sm font-medium mb-2">
                {selectedProject.category}
              </span>
              <h2 className="text-2xl md:text-3xl font-bold mb-4">{selectedProject.title}</h2>
              <p className="text-gray-600 mb-8">{selectedProject.description}</p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
                <div>
                  <h3 className="text-lg font-semibold mb-2">The Challenge</h3>
                  <p className="text-gray-600">{selectedProject.challenge}</p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">Our Solution</h3>
                  <p className="text-gray-600">{selectedProject.solution}</p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">The Result</h3>
                  <p className="text-gray-600">{selectedProject.result}</p>
                </div>
              </div>
              
              <div className="flex justify-center pt-4">
                <a href="/booking" className="bg-gray-900 text-white px-8 py-3 rounded-full hover:bg-gray-800 transition-colors">
                  Book a Similar Project
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default Portfolio;
