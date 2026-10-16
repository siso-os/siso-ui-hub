import { useState } from 'react';
import { ArrowRight } from 'lucide-react';

export default function InteractiveHoverReveal() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const projects = [
    {
      title: 'Photography Portfolio Website',
      category: 'Web Design',
      description:
        "A minimalist website designed to showcase a professional photographer's work with advanced filtering and gallery features.",
      image:
        'https://images.unsplash.com/photo-1488229297570-58520851e868?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      link: '#',
    },
    {
      title: 'Health & Fitness App',
      category: 'Mobile App Design',
      description:
        'A comprehensive fitness tracking application designed to help users maintain their health goals with personalized recommendations.',
      image:
        'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      link: '#',
    },
    {
      title: 'Eco-Friendly Product Packaging',
      category: 'Brand Design',
      description:
        'Sustainable packaging design for an eco-conscious beauty brand, focusing on recyclable materials and minimal waste.',
      image:
        'https://images.unsplash.com/photo-1606041011872-596597976b25?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      link: '#',
    },
    {
      title: 'Smart Home Dashboard',
      category: 'UI/UX Design',
      description:
        'An intuitive interface for controlling smart home devices with emphasis on accessibility and ease of use.',
      image:
        'https://images.unsplash.com/photo-1560439514-4e9645039924?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      link: '#',
    },
    {
      title: 'Restaurant Ordering System',
      category: 'Web Application',
      description:
        'A comprehensive online ordering system for restaurants that streamlines the takeout and delivery process.',
      image:
        'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=2074&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      link: '#',
    },
    {
      title: 'Travel Experience Platform',
      category: 'Web Design',
      description:
        'A platform connecting travelers with local experiences and hidden gems, featuring interactive maps and booking features.',
      image:
        'https://images.unsplash.com/photo-1501785888041-af3ef285b470?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      link: '#',
    },
  ];

  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4 md:px-6 2xl:max-w-[1400px]">
        {/* Section Header */}
        <div className="mb-12 text-center md:mb-16">
          <h2 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
            Portfolio Highlights
          </h2>
          <p className="text-muted-foreground mx-auto max-w-3xl text-lg">
            Explore a selection of my featured work across various disciplines
            and industries.
          </p>
        </div>

        {/* Project Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, index) => (
            <a
              href={project.link}
              key={index}
              className="group relative block h-80 overflow-hidden rounded-xl"
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              {/* Project Image */}
              <div className="absolute inset-0 h-full w-full">
                <img
                  src={project.image}
                  alt={project.title}
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-black/30 opacity-80 transition-opacity duration-300 group-hover:opacity-90" />
              </div>

              {/* Project Info - Initial State */}
              <div
                className={`absolute bottom-0 left-0 p-6 transition-all duration-300 ease-in-out ${
                  hoveredIndex === index ? 'opacity-0' : 'opacity-100'
                }`}
              >
                <div className="text-sm font-medium tracking-wider text-white uppercase">
                  {project.category}
                </div>
                <h3 className="text-xl font-bold text-white drop-shadow-md">
                  {project.title}
                </h3>
              </div>

              {/* Expanded Content on Hover */}
              <div
                className={`absolute inset-0 flex flex-col justify-end p-6 transition-all duration-300 ease-in-out ${
                  hoveredIndex === index
                    ? 'opacity-100'
                    : 'translate-y-4 opacity-0'
                }`}
              >
                <div className="text-sm font-medium tracking-wider text-white uppercase">
                  {project.category}
                </div>
                <h3 className="mb-2 text-xl font-bold text-white drop-shadow-md">
                  {project.title}
                </h3>
                <p className="mb-3 text-sm font-medium text-white drop-shadow">
                  {project.description}
                </p>
                <span className="inline-flex items-center text-sm font-medium text-white drop-shadow">
                  View Project <ArrowRight className="ml-1 h-3.5 w-3.5" />
                </span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
