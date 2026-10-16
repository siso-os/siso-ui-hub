import { useState } from 'react';

import { ChevronDown, ChevronUp, ArrowLeft, ArrowRight } from 'lucide-react';
import { Button } from '../../../ui/button';
import { Badge } from '../../../ui/badge';
import { cn } from '@/arc-shims/kit-utils';

// Sample case study data
const caseStudy = {
  title: 'Brand Redesign for Modern Finance',
  client: 'FinanceFlow',
  summary:
    'Complete visual overhaul of a financial platform that enhanced user engagement by 47%',
  tags: ['Branding', 'UI Design', 'Visual Identity'],
  year: '2023',
  sections: [
    {
      id: 'hero',
      title: 'The Challenge',
      subtitle: 'From Dated to Dynamic',
      description:
        'FinanceFlow needed a complete brand overhaul to appeal to a younger audience while maintaining trust with existing customers.',
      fullBleedImage:
        'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop',
      textPosition: 'left', // left, right, center
      darkOverlay: true,
    },
    {
      id: 'research',
      title: 'User Research',
      subtitle: 'Understanding the audience',
      description:
        'We conducted extensive interviews with both current and potential customers to identify key opportunities for improvement.',
      fullBleedImage:
        'https://images.unsplash.com/photo-1553877522-43269d4ea984?q=80&w=2070&auto=format&fit=crop',
      textPosition: 'right',
      darkOverlay: false,
    },
    {
      id: 'concept',
      title: 'Design Concept',
      subtitle: 'Bold new direction',
      description:
        'We developed a vibrant, modern visual language that balanced professionalism with approachability.',
      fullBleedImage:
        'https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?q=80&w=2070&auto=format&fit=crop',
      textPosition: 'center',
      darkOverlay: true,
    },
    {
      id: 'colors',
      title: 'Color System',
      subtitle: 'Vibrant yet trustworthy',
      description:
        'A carefully crafted palette that conveys both energy and stability, with accessibility at its core.',
      fullBleedImage:
        'https://images.unsplash.com/photo-1541701494587-cb58502866ab?q=80&w=2070&auto=format&fit=crop',
      textPosition: 'left',
      darkOverlay: true,
    },
    {
      id: 'typography',
      title: 'Typography',
      subtitle: 'Clarity and personality',
      description:
        'Custom typeface development that improved readability while establishing a distinct brand voice.',
      fullBleedImage:
        'https://images.unsplash.com/photo-1619632973808-4acf8041df42?q=80&w=2071&auto=format&fit=crop',
      textPosition: 'right',
      darkOverlay: true,
    },
    {
      id: 'mockups',
      title: 'Website Redesign',
      subtitle: 'Digital transformation',
      description:
        'The new brand identity applied to the digital platform, resulting in a 47% increase in engagement.',
      fullBleedImage:
        'https://images.unsplash.com/photo-1561070791-2526d30994b5?q=80&w=2000&auto=format&fit=crop',
      textPosition: 'center',
      darkOverlay: false,
    },
    {
      id: 'mobile',
      title: 'Mobile Experience',
      subtitle: 'On-the-go access',
      description:
        'Optimized for mobile with a focus on quick, essential actions for users on the move.',
      fullBleedImage:
        'https://images.unsplash.com/photo-1555421689-3f034debb7a6?q=80&w=2070&auto=format&fit=crop',
      textPosition: 'left',
      darkOverlay: true,
    },
    {
      id: 'results',
      title: 'The Results',
      subtitle: 'Measurable impact',
      description:
        '47% increase in user engagement, 32% increase in new customer acquisition, and 28% increase in mobile usage.',
      fullBleedImage:
        'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2015&auto=format&fit=crop',
      textPosition: 'right',
      darkOverlay: true,
    },
  ],
  testimonial: {
    quote:
      "The brand redesign has completely transformed how our customers perceive us. We're now seen as innovative and forward-thinking while maintaining our reputation for reliability.",
    author: 'Alexandra Chen',
    role: 'CMO, FinanceFlow',
  },
  link: '#',
};

export default function LargeVisualFocusCaseStudy() {
  const [activeSectionIndex, setActiveSectionIndex] = useState(0);
  const [isNavigationVisible, setIsNavigationVisible] = useState(false);

  const nextSection = () => {
    setActiveSectionIndex((prev) =>
      prev < caseStudy.sections.length - 1 ? prev + 1 : prev
    );
  };

  const prevSection = () => {
    setActiveSectionIndex((prev) => (prev > 0 ? prev - 1 : prev));
  };

  const toggleNavigation = () => {
    setIsNavigationVisible((prev) => !prev);
  };

  const goToSection = (index: number) => {
    setActiveSectionIndex(index);
    setIsNavigationVisible(false);
  };

  const activeSection = caseStudy.sections[activeSectionIndex]!;

  return (
    <section className="relative h-screen w-full overflow-hidden bg-black">
      {/* Current section */}
      <div className="relative h-full w-full">
        {/* Full-bleed image */}
        <div className="absolute inset-0 h-full w-full">
          <img
            src={activeSection.fullBleedImage}
            alt={activeSection.title}
            className="object-cover"
          />
          <div
            className={cn(
              'absolute inset-0',
              activeSection.darkOverlay
                ? 'bg-gradient-to-r from-black/80 via-black/50 to-black/30'
                : 'bg-gradient-to-r from-black/30 via-black/10 to-transparent'
            )}
          />
        </div>

        {/* Text overlay */}
        <div
          className={cn(
            'absolute inset-x-0 top-0 bottom-0 flex items-center p-8 md:p-16',
            activeSection.textPosition === 'left'
              ? 'justify-start text-left md:w-1/2'
              : activeSection.textPosition === 'right'
                ? 'justify-end text-right md:ml-auto md:w-1/2'
                : 'justify-center text-center'
          )}
        >
          <div className="max-w-lg">
            <div className="mb-2 flex flex-wrap gap-2">
              {caseStudy.tags.map((tag) => (
                <Badge key={tag} variant="secondary">
                  {tag}
                </Badge>
              ))}
            </div>

            <div className="relative space-y-2 rounded-xl p-6">
              <div
                className={cn(
                  'absolute inset-0 rounded-xl from-black/80 via-black/50 to-black/30 backdrop-blur-md',
                  activeSection.textPosition === 'right'
                    ? 'bg-gradient-to-l'
                    : 'bg-gradient-to-r'
                )}
              />
              <div className="relative z-10 space-y-2">
                <h2 className="text-4xl font-bold tracking-tight text-white md:text-5xl lg:text-6xl">
                  {activeSection.title}
                </h2>
                <p className="text-xl font-medium text-white/90 md:text-2xl">
                  {activeSection.subtitle}
                </p>
                <p className="text-white/70 md:text-lg">
                  {activeSection.description}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Section progress indicators (bottom) */}
        <div className="absolute bottom-8 left-1/2 flex -translate-x-1/2 transform gap-1.5">
          {caseStudy.sections.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSection(index)}
              className={cn(
                'h-1.5 rounded-full bg-white/50 transition-all',
                index === activeSectionIndex
                  ? 'w-8 bg-white'
                  : 'w-2 hover:bg-white/70'
              )}
              aria-label={`Go to section ${index + 1}`}
            />
          ))}
        </div>

        {/* Navigation toggle button */}
        <button
          onClick={toggleNavigation}
          className="absolute top-8 right-8 z-20 flex h-12 w-12 items-center justify-center rounded-full bg-black/50 text-white transition-colors hover:bg-black/70"
        >
          {isNavigationVisible ? (
            <ChevronUp className="h-6 w-6" />
          ) : (
            <ChevronDown className="h-6 w-6" />
          )}
        </button>

        {/* Navigation arrows */}
        <div className="absolute right-4 bottom-1/2 left-4 flex translate-y-1/2 transform items-center justify-between md:right-8 md:left-8">
          <Button
            variant="ghost"
            size="icon"
            onClick={prevSection}
            disabled={activeSectionIndex === 0}
            className={cn(
              'h-12 w-12 rounded-full bg-black/50 text-white hover:bg-black/70',
              activeSectionIndex === 0 && 'opacity-0'
            )}
          >
            <ArrowLeft className="h-6 w-6" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={nextSection}
            disabled={activeSectionIndex === caseStudy.sections.length - 1}
            className={cn(
              'h-12 w-12 rounded-full bg-black/50 text-white hover:bg-black/70',
              activeSectionIndex === caseStudy.sections.length - 1 &&
                'opacity-0'
            )}
          >
            <ArrowRight className="h-6 w-6" />
          </Button>
        </div>
      </div>

      {/* Expanded navigation overlay */}
      <div
        className={cn(
          'absolute inset-0 z-10 h-full w-full bg-black/90 transition-transform duration-500',
          isNavigationVisible ? 'translate-y-0' : 'translate-y-full'
        )}
      >
        <div className="container mx-auto h-full overflow-y-auto py-20">
          <div className="mb-8 space-y-2 text-center">
            <h2 className="text-3xl font-bold text-white md:text-4xl">
              {caseStudy.title}
            </h2>
            <p className="text-white/70 md:text-lg">{caseStudy.summary}</p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {caseStudy.sections.map((section, index) => (
              <button
                key={section.id}
                onClick={() => goToSection(index)}
                className={cn(
                  'group relative h-32 w-full overflow-hidden rounded-lg border-2 transition-all md:h-44',
                  index === activeSectionIndex
                    ? 'border-white'
                    : 'border-transparent hover:border-white/50'
                )}
              >
                <img
                  src={section.fullBleedImage}
                  alt={section.title}
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-black/40" />
                <div className="absolute inset-0 flex flex-col items-center justify-center space-y-1 p-4 text-center">
                  <h3 className="text-sm font-bold text-white md:text-base">
                    {section.title}
                  </h3>
                  <p className="text-xs text-white/80 md:text-sm">
                    {section.subtitle}
                  </p>
                </div>
              </button>
            ))}
          </div>

          {/* Testimonial */}
          {caseStudy.testimonial && (
            <div className="mx-auto mt-12 max-w-2xl rounded-lg bg-white/10 p-6 text-center">
              <p className="mb-4 text-lg text-white italic md:text-xl">
                &quot;{caseStudy.testimonial.quote}&quot;
              </p>
              <p className="font-medium text-white">
                {caseStudy.testimonial.author}
              </p>
              <p className="text-sm text-white/70">
                {caseStudy.testimonial.role}
              </p>
            </div>
          )}

          <div className="mt-12 text-center">
            <Button asChild>
              <a href={caseStudy.link}>View Complete Case Study</a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
