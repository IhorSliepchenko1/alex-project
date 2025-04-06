
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";

interface GalleryItem {
  id: number;
  title: string;
  category: string;
  imageUrl: string;
}

const galleryItems: GalleryItem[] = [
  {
    id: 1,
    title: "Modern Minimalist Bathroom",
    category: "Bathroom Remodel",
    imageUrl: "https://images.unsplash.com/photo-1594032795150-35724f418a1c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"
  },
  {
    id: 2,
    title: "Luxurious Master Bath",
    category: "Bathroom Remodel",
    imageUrl: "https://images.unsplash.com/photo-1675887440520-0732fea9de51?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"
  },
  {
    id: 3,
    title: "Custom Shower Installation",
    category: "Handyman Services",
    imageUrl: "https://images.unsplash.com/photo-1584622781564-1d987f7333c1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"
  },
  {
    id: 4,
    title: "Elegant Vanity Setup",
    category: "Bathroom Remodel",
    imageUrl: "https://images.unsplash.com/photo-1620626011761-996317b8d101?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=869&q=80"
  },
  {
    id: 5,
    title: "Contemporary Tile Work",
    category: "Handyman Services",
    imageUrl: "https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=871&q=80"
  },
  {
    id: 6,
    title: "Spa-Inspired Bathroom",
    category: "Bathroom Remodel",
    imageUrl: "https://images.unsplash.com/photo-1600489000022-c2086d79f9d4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"
  }
];

const GallerySection = () => {
  const [filter, setFilter] = useState("All");
  const [filteredItems, setFilteredItems] = useState<GalleryItem[]>(galleryItems);
  const [animateItems, setAnimateItems] = useState(false);

  const filters = ["All", "Bathroom Remodel", "Handyman Services"];

  useEffect(() => {
    setAnimateItems(false);
    setTimeout(() => {
      if (filter === "All") {
        setFilteredItems(galleryItems);
      } else {
        setFilteredItems(galleryItems.filter(item => item.category === filter));
      }
      setAnimateItems(true);
    }, 300);
  }, [filter]);

  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-6">
        <div className="max-w-3xl mx-auto text-center mb-16 reveal">
          <span className="inline-block py-1 px-3 rounded-full bg-gray-200 text-gray-700 text-sm font-medium mb-4">
            Our Portfolio
          </span>
          <h2 className="mb-6">Showcasing Our Finest Work</h2>
          <p className="text-gray-600 text-lg">
            Browse through our portfolio of completed projects that demonstrate our commitment to quality,
            craftsmanship, and attention to detail.
          </p>
        </div>

        <div className="flex justify-center mb-10 reveal">
          <div className="inline-flex bg-gray-100 rounded-full p-1">
            {filters.map((filterName) => (
              <button
                key={filterName}
                onClick={() => setFilter(filterName)}
                className={cn(
                  "px-5 py-2 text-sm font-medium rounded-full transition-all",
                  filter === filterName
                    ? "bg-white shadow-sm text-gray-900"
                    : "text-gray-500 hover:text-gray-900"
                )}
              >
                {filterName}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className={cn(
                "group rounded-xl overflow-hidden shadow-subtle card-hover transition-all duration-500",
                animateItems ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              )}
              style={{ transitionDelay: `${(item.id % 6) * 100}ms` }}
            >
              <div className="relative h-64 overflow-hidden">
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-0 w-full p-6">
                    <span className="text-white/80 text-sm">{item.category}</span>
                    <h3 className="text-white text-xl font-medium mt-1">{item.title}</h3>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12 reveal">
          <Button asChild variant="outline" className="rounded-full px-8">
            <Link to="/portfolio" className="inline-flex items-center">
              View All Projects
              <ChevronRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default GallerySection;
