import { Button } from '../../../ui/button';
import { Card, CardContent } from '../../../ui/card';
import { ChevronRightIcon } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '../../../ui/avatar';
import { Input } from '../../../ui/input';
import { SendIcon } from 'lucide-react';

export default function HeroSectionChatPreview() {
  return (
    <>
      {/* Hero */}
      <div>
        <div className="container mx-auto px-4 py-24 md:px-6 lg:py-32 2xl:max-w-[1400px]">
          {/* Announcement Banner */}
          <div className="flex justify-center">
            <a
              className="inline-flex items-center gap-x-2 rounded-full border p-1 ps-3 text-sm transition"
              href="#"
            >
              PRO release - Join to waitlist
              <span className="bg-muted-foreground/15 inline-flex items-center justify-center gap-x-2 rounded-full px-2.5 py-1.5 text-sm font-semibold">
                <svg
                  className="h-4 w-4 flex-shrink-0"
                  xmlns="http://www.w3.org/2000/svg"
                  width={24}
                  height={24}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="m9 18 6-6-6-6" />
                </svg>
              </span>
            </a>
          </div>
          {/* End Announcement Banner */}
          {/* Title */}
          <div className="mx-auto mt-5 max-w-2xl text-center">
            <h1 className="text-primary max-w-4xl text-4xl leading-tight font-semibold tracking-tight text-balance lg:leading-[1.1] lg:font-semibold xl:text-5xl xl:tracking-tighter">
              Experience Instant Support
            </h1>
          </div>
          {/* End Title */}
          <div className="mx-auto mt-5 max-w-3xl text-center">
            <p className="text-foreground max-w-4xl text-base text-balance sm:text-lg">
              Chat with our AI assistant right from the start. Get answers,
              demos, and more in real-time.
            </p>
          </div>
          {/* Chat Preview */}
          <div className="mt-8 flex justify-center">
            <Card className="w-full max-w-md">
              <CardContent className="p-4">
                <div className="flex flex-col space-y-4">
                  <div className="flex items-start space-x-2">
                    <Avatar>
                      <AvatarImage
                        src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
                        alt="AI Assistant"
                      />
                      <AvatarFallback>AI</AvatarFallback>
                    </Avatar>
                    <div className="bg-muted rounded-lg p-3">
                      <p className="text-sm">
                        Hello! How can I help you today?
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start justify-end space-x-2">
                    <div className="bg-primary text-primary-foreground rounded-lg p-3">
                      <p className="text-sm">Tell me about your product.</p>
                    </div>
                    <Avatar>
                      <AvatarImage
                        src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
                        alt="User"
                      />
                      <AvatarFallback>US</AvatarFallback>
                    </Avatar>
                  </div>
                  <div className="flex items-start space-x-2">
                    <Avatar>
                      <AvatarImage
                        src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
                        alt="AI Assistant"
                      />
                      <AvatarFallback>AI</AvatarFallback>
                    </Avatar>
                    <div className="bg-muted rounded-lg p-3">
                      <p className="text-sm">
                        Our product is a revolutionary AI-powered tool...
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Input
                      placeholder="Type your message..."
                      className="flex-1"
                    />
                    <Button size="icon">
                      <SendIcon className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          {/* End Chat Preview */}
          {/* Buttons */}
          <div className="mt-8 flex justify-center gap-3">
            <Button size={'lg'}>Start Chatting</Button>
            <Button size={'lg'} variant={'outline'}>
              Learn more
            </Button>
          </div>
          {/* End Buttons */}
          <div className="mt-5 flex items-center justify-center gap-x-1 sm:gap-x-3">
            <span className="text-muted-foreground text-sm">
              Integrate with:
            </span>
            <span className="text-sm font-bold">Your Chat System</span>
            <svg
              className="text-muted-foreground h-5 w-5"
              width={16}
              height={16}
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path
                d="M6 13L10 3"
                stroke="currentColor"
                strokeLinecap="round"
              />
            </svg>
            <a
              className="inline-flex items-center gap-x-1 text-sm font-medium decoration-2 hover:underline"
              href="#"
            >
              Setup Guide
              <ChevronRightIcon className="h-4 w-4 flex-shrink-0" />
            </a>
          </div>
        </div>
      </div>
      {/* End Hero */}
    </>
  );
}
