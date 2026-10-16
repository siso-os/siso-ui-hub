import { Button } from '../../../ui/button';
import { Badge } from '../../../ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '../../../ui/avatar';
import { Separator } from '../../../ui/separator';
import {
  QuoteIcon, MicIcon, CalendarIcon, ClockIcon, Share2Icon } from 'lucide-react';
import { Linkedin, Twitter } from '../../../ui/brand-icons';

// Define types
interface Interviewee {
  name: string;
  title: string;
  company: string;
  avatarUrl: string;
  bio: string;
  linkedinUrl?: string;
  twitterUrl?: string;
}

interface QnaPair {
  question: string;
  answer: string | string[]; // Allow string or array of paragraphs
}

interface InterviewPost {
  id: number;
  title: string;
  subtitle: string;
  category: string;
  date: string;
  readTime: string;
  interviewee: Interviewee;
  introduction: string;
  qna: QnaPair[];
  conclusion?: string;
}

// Data for the interview post
const interviewData: InterviewPost = {
  id: 1,
  title: 'Scaling Marketing Teams: An Interview with Jane Doe',
  subtitle:
    'Insights on structure, hiring, and fostering culture in high-growth marketing departments.',
  category: 'Leadership & Management',
  date: 'April 28, 2023',
  readTime: '15 min read',
  interviewee: {
    name: 'Jane Doe',
    title: 'VP of Marketing',
    company: 'Innovate Solutions Inc.',
    avatarUrl:
      'https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=256&q=80',
    bio: "Jane has over 12 years of experience leading marketing teams at fast-growing tech companies. She's passionate about building efficient, data-driven marketing engines.",
    linkedinUrl: '#',
    twitterUrl: '#',
  },
  introduction:
    'We sat down with Jane Doe, VP of Marketing at Innovate Solutions, to discuss the challenges and strategies involved in scaling marketing teams effectively. Jane shares her valuable insights on structuring teams for growth, hiring top talent, and maintaining a positive team culture during rapid expansion.',
  qna: [
    {
      question:
        "What's the biggest challenge you've faced when scaling a marketing team?",
      answer: [
        "The biggest challenge is often maintaining alignment and communication as the team grows. When you're small, everyone knows what everyone else is doing. As you add more people and potentially specialized roles (like SEO, PPC, content, social), ensuring everyone is working towards the same core objectives and that information flows freely becomes critical.",
        'It requires deliberate effort to establish clear goals, regular check-ins, and robust internal communication processes. Without this, you risk creating silos where teams optimize for their own metrics without considering the broader impact.',
      ],
    },
    {
      question:
        'How do you structure your marketing team for optimal growth and collaboration?',
      answer:
        "There's no single perfect structure, as it depends on the company's stage and goals. However, I've found success with a hybrid model. We have core functional teams (e.g., Demand Gen, Content, Product Marketing) but also create cross-functional 'pods' or 'squads' focused on specific initiatives or customer segments. This encourages collaboration and ensures different perspectives are considered. Clear roles, responsibilities, and reporting lines within this structure are essential.",
    },
    {
      question:
        'What key qualities do you look for when hiring for a rapidly growing team?',
      answer:
        "Beyond the necessary functional skills, adaptability and a proactive mindset are crucial. In a fast-growing environment, roles can evolve, priorities can shift, and individuals need to be comfortable with ambiguity and willing to take initiative. Strong communication skills and a collaborative spirit are also non-negotiable. I look for people who are not just skilled marketers, but also great team players who are eager to learn and contribute to the team's overall success.",
    },
    {
      question:
        'How do you maintain a positive team culture during periods of high growth and pressure?',
      answer: [
        "Culture is paramount. It starts with hiring people who align with the company's values. Transparency is key – being open about challenges and celebrating wins, big and small. Regular team-building activities, even simple virtual ones, help foster connections.",
        'Empowering team members and providing opportunities for growth and development are also vital. Making sure people feel valued, heard, and supported, even when things are hectic, goes a long way in maintaining morale and preventing burnout.',
      ],
    },
  ],
  conclusion:
    'Scaling a marketing team presents unique challenges, but with intentional structure, a focus on hiring adaptable talent, and a commitment to fostering a transparent and supportive culture, growth can be managed effectively. Thanks to Jane Doe for sharing her invaluable experience and insights.',
};

export default function BlogSectionInterviewFormat() {
  const {
    title,
    subtitle,
    category,
    date,
    readTime,
    interviewee,
    introduction,
    qna,
    conclusion,
  } = interviewData;

  return (
    <section className="bg-muted/40 py-24">
      <div className="container mx-auto max-w-4xl px-4 md:px-6 2xl:max-w-[1400px]">
        <article className="bg-background rounded-lg p-8 shadow-lg md:p-12">
          {/* Header */}
          <header className="mb-12 space-y-6">
            <div className="space-y-3">
              <Badge variant="outline">{category}</Badge>
              <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
                {title}
              </h1>
              <p className="text-muted-foreground text-lg">{subtitle}</p>
            </div>
            <div className="text-muted-foreground flex flex-wrap items-center gap-4 text-sm">
              <span className="flex items-center">
                <CalendarIcon className="mr-1.5 h-4 w-4" /> Published {date}
              </span>
              <span className="flex items-center">
                <ClockIcon className="mr-1.5 h-4 w-4" /> {readTime}
              </span>
            </div>
          </header>

          {/* Interviewee Profile */}
          <div className="bg-muted mb-12 flex flex-col items-start gap-6 rounded-md p-6 sm:flex-row">
            <Avatar className="border-background h-24 w-24 border-4">
              <AvatarImage src={interviewee.avatarUrl} alt={interviewee.name} />
              <AvatarFallback>
                {interviewee.name
                  .split(' ')
                  .map((n) => n[0])
                  .join('')}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <h2 className="text-xl font-semibold">{interviewee.name}</h2>
              <p className="text-primary font-medium">
                {interviewee.title}, {interviewee.company}
              </p>
              <p className="text-muted-foreground mt-2 text-sm">
                {interviewee.bio}
              </p>
              <div className="mt-3 flex gap-2">
                {interviewee.linkedinUrl && (
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-muted-foreground hover:text-foreground"
                    asChild
                  >
                    <a href={interviewee.linkedinUrl} target="_blank">
                      <Linkedin className="h-4 w-4" />
                    </a>
                  </Button>
                )}
                {interviewee.twitterUrl && (
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-muted-foreground hover:text-foreground"
                    asChild
                  >
                    <a href={interviewee.twitterUrl} target="_blank">
                      <Twitter className="h-4 w-4" />
                    </a>
                  </Button>
                )}
              </div>
            </div>
          </div>

          {/* Introduction */}
          <div className="prose prose-lg mb-12 max-w-none">
            <p className="lead text-muted-foreground text-xl">{introduction}</p>
          </div>

          <Separator className="mb-12" />

          {/* Q&A Section */}
          <div className="space-y-10">
            {qna.map((item, index) => (
              <div key={index} className="space-y-6">
                {/* Question */}
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 pt-1">
                    <MicIcon className="text-primary h-5 w-5" />
                  </div>
                  <h3 className="text-primary text-xl font-semibold">
                    {item.question}
                  </h3>
                </div>

                {/* Answer */}
                <div className="border-border relative ml-2.5 border-l-2 pl-8">
                  <QuoteIcon className="text-border bg-background absolute top-1 -left-3 h-5 w-5" />
                  <div className="prose prose-lg text-foreground max-w-none">
                    {Array.isArray(item.answer) ? (
                      item.answer.map((paragraph, pIndex) => (
                        <p key={pIndex}>{paragraph}</p>
                      ))
                    ) : (
                      <p>{item.answer}</p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Conclusion */}
          {conclusion && (
            <>
              <Separator className="my-12" />
              <div className="prose prose-lg mt-12 max-w-none">
                <p>{conclusion}</p>
              </div>
            </>
          )}

          {/* Footer/Share */}
          <Separator className="my-12" />
          <footer className="flex justify-center">
            <Button variant="outline" className="gap-2">
              <Share2Icon className="h-4 w-4" />
              Share this Interview
            </Button>
          </footer>
        </article>
      </div>
    </section>
  );
}

// Add basic prose styles if not already globally configured
// You might need to install @tailwindcss/typography
// and add require('@tailwindcss/typography') to your tailwind.config.js plugins.
// This is a basic placeholder - customize as needed.
const styles = `
.prose {
  color: var(--foreground);
}
.prose p {
  margin-bottom: 1.25em;
}
.prose h1, .prose h2, .prose h3 {
  color: var(--foreground);
  margin-bottom: 0.8em;
}
.prose a {
  color: var(--primary);
  text-decoration: none;
}
.prose a:hover {
  text-decoration: underline;
}
.prose blockquote {
  border-left-color: var(--border);
  color: var(--muted-foreground);
  font-style: italic;
  padding-left: 1em;
  margin-left: 0;
}
`;

// Append styles - In a real app, manage this through global CSS or a CSS-in-JS solution
if (typeof window !== 'undefined') {
  const styleSheet = document.createElement('style');
  styleSheet.type = 'text/css';
  styleSheet.innerText = styles;
  document.head.appendChild(styleSheet);
}
