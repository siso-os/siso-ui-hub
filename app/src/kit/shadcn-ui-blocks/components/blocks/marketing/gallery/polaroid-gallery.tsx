import * as React from 'react';
import { Calendar, MapPin } from 'lucide-react';

interface PolaroidImage {
  src: string;
  alt: string;
  width: number;
  height: number;
  location?: string;
  date?: string;
  rotation?: number;
}

export default function PolaroidGallery() {
  // Static images array wrapped in useMemo to maintain stable reference
  const images = React.useMemo<PolaroidImage[]>(
    () => [
      {
        src: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=80&w=1473&auto=format&fit=crop',
        alt: 'Paris with Eiffel Tower view',
        width: 1473,
        height: 982,
        location: 'Paris, France',
        date: 'June 2023',
        rotation: -3,
      },
      {
        src: 'https://images.unsplash.com/photo-1473496169904-658ba7c44d8a?q=80&w=1470&auto=format&fit=crop',
        alt: 'Beach sunset with palm tree silhouettes',
        width: 1470,
        height: 980,
        location: 'Bali, Indonesia',
        date: 'August 2023',
        rotation: 2,
      },
      {
        src: 'https://images.unsplash.com/photo-1517231925375-bf2cb42917a5?q=80&w=1471&auto=format&fit=crop',
        alt: 'Espresso and pastry at a sidewalk cafe',
        width: 1471,
        height: 981,
        location: 'Rome, Italy',
        date: 'September 2023',
        rotation: -2,
      },
      {
        src: 'https://images.unsplash.com/photo-1551524559-8af4e6624178?q=80&w=1526&auto=format&fit=crop',
        alt: 'Vintage car parked on colorful street',
        width: 1526,
        height: 1017,
        location: 'Havana, Cuba',
        date: 'May 2023',
        rotation: 3,
      },
      {
        src: 'https://images.unsplash.com/photo-1526498460520-4c246339dccb?q=80&w=1470&auto=format&fit=crop',
        alt: 'Person hiking on mountain trail at sunrise',
        width: 1470,
        height: 980,
        location: 'Swiss Alps',
        date: 'July 2023',
        rotation: -1,
      },
      {
        src: 'https://images.unsplash.com/photo-1543158266-0066955047b1?q=80&w=1470&auto=format&fit=crop',
        alt: 'Friends laughing together at outdoor party',
        width: 1470,
        height: 980,
        location: 'Barcelona, Spain',
        date: 'April 2023',
        rotation: 1,
      },
      {
        src: 'https://images.unsplash.com/photo-1551918120-9739cb430c6d?q=80&w=1374&auto=format&fit=crop',
        alt: 'Desert landscape with red sand dunes',
        width: 1374,
        height: 916,
        location: 'Marrakech, Morocco',
        date: 'October 2023',
        rotation: -2,
      },
      {
        src: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?q=80&w=1470&auto=format&fit=crop',
        alt: 'Starry night sky over mountain peaks',
        width: 1470,
        height: 980,
        location: 'Dolomites, Italy',
        date: 'January 2023',
        rotation: 2,
      },
      {
        src: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?q=80&w=1470&auto=format&fit=crop',
        alt: 'Sunset over calm lake with mountain reflections',
        width: 1470,
        height: 980,
        location: 'Lake Louise, Canada',
        date: 'June 2023',
        rotation: -1,
      },
    ],
    []
  );

  // Calculate random stagger for first render only
  const staggerOffsets = React.useMemo(
    () => images.map(() => Math.floor(Math.random() * 20) - 10),
    [images]
  );

  return (
    <div className="w-full p-4 md:p-6">
      <div className="flex flex-wrap justify-center gap-6 md:gap-8">
        {images.map((image, index) => {
          // Calculate polaroid dimensions - maintain image aspect ratio plus frame
          const aspectRatio = image.width / image.height;
          const polaroidWidth = 220; // fixed width for all polaroids
          const imageHeight = polaroidWidth / aspectRatio;

          return (
            <div
              key={index}
              className="group relative"
              style={{
                marginTop: `${staggerOffsets[index]}px`, // Random vertical stagger
                transform: `rotate(${image.rotation || 0}deg)`,
                transformOrigin: 'center',
                transition: 'transform 0.3s ease, z-index 0.3s ease',
                zIndex: 1,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.zIndex = '10';
                e.currentTarget.style.transform = `rotate(${image.rotation || 0}deg) scale(1.05)`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.zIndex = '1';
                e.currentTarget.style.transform = `rotate(${image.rotation || 0}deg)`;
              }}
            >
              {/* Polaroid frame */}
              <div className="flex h-full w-full flex-col overflow-hidden rounded-md bg-white p-3 shadow-md">
                {/* Image */}
                <div
                  className="relative w-full grow overflow-hidden"
                  style={{
                    height: `${imageHeight}px`,
                  }}
                >
                  <img
                    src={image.src}
                    alt={image.alt}
                    sizes={`${polaroidWidth}px`}
                    className="w-full object-cover"
                  />
                </div>

                {/* Caption */}
                <div className="mt-3 py-2">
                  <p className="font-handwriting mb-2 text-center text-sm font-medium">
                    {image.alt}
                  </p>

                  <div className="flex items-center justify-between text-xs text-gray-500">
                    {image.location && (
                      <div className="flex items-center">
                        <MapPin className="mr-1 h-3 w-3" />
                        <span>{image.location}</span>
                      </div>
                    )}

                    {image.date && (
                      <div className="flex items-center">
                        <Calendar className="mr-1 h-3 w-3" />
                        <span>{image.date}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Tape effect */}
              <div className="pointer-events-none absolute -top-3 left-1/2 h-6 w-16 -translate-x-1/2 rotate-3 bg-gray-100/80 shadow-sm" />
            </div>
          );
        })}
      </div>
    </div>
  );
}
