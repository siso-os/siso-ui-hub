import { Avatar, AvatarFallback, AvatarImage } from '../../../ui/avatar';
import { Mail, MapPin } from 'lucide-react';
import { Twitter } from '../../../ui/brand-icons';

export default function SimpleUserProfile() {
  return (
    <div className="container mx-auto px-4 py-24 md:px-6 lg:py-32 2xl:max-w-[1400px]">
      <div className="mx-auto max-w-3xl">
        {/* Profile Header */}
        <div className="flex items-center gap-x-3">
          <Avatar className="size-16">
            <AvatarImage
              src="https://images.unsplash.com/photo-1510706019500-d23a509eecd4?q=80&w=2667&auto=format&fit=facearea&facepad=3&w=320&h=320&q=80"
              alt="Eliana Garcia"
            />
            <AvatarFallback>EG</AvatarFallback>
          </Avatar>
          <div className="grow">
            <h1 className="text-lg font-medium">Eliana Garcia</h1>
            <p className="text-muted-foreground text-sm">
              Graphic Designer, Web designer/developer
            </p>
          </div>
        </div>

        {/* About */}
        <div className="mt-8">
          <p className="text-muted-foreground text-sm">
            I am a seasoned graphic designer with over 14 years of experience in
            creating visually appealing and user-centric designs. My expertise
            spans across UI design, design systems, and custom illustrations,
            helping clients bring their digital visions to life.
          </p>
          <p className="text-muted-foreground mt-3 text-sm">
            Currently, I work remotely for Notion, where I design template UIs,
            convert them into HTML and CSS, and provide comprehensive support to
            our users. I am passionate about crafting elegant and functional
            designs that enhance user experiences.
          </p>

          {/* Contact Links */}
          <ul className="mt-5 flex flex-col gap-y-3">
            <li>
              <a
                href="mailto:elianagarcia997@about.me"
                className="text-muted-foreground hover:text-foreground flex items-center gap-x-2.5 text-sm"
              >
                <Mail className="size-3.5" />
                elianagarcia997@about.me
              </a>
            </li>
            <li>
              <a
                href="https://twitter.com/elianagarcia997"
                className="text-muted-foreground hover:text-foreground flex items-center gap-x-2.5 text-sm"
              >
                <Twitter className="size-3.5" />
                @elianagarcia997
              </a>
            </li>
            <li>
              <a
                href="#"
                className="text-muted-foreground hover:text-foreground flex items-center gap-x-2.5 text-sm"
              >
                <MapPin className="size-3.5" />
                San Francisco, CA
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
