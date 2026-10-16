import { Code, Database, FileCode, Globe, Layers, Lightbulb, Palette, Server, Smartphone, Terminal } from 'lucide-react';
import { SiFigma, SiGithub } from '@icons-pack/react-simple-icons';
import { Progress } from "../../../ui/progress";
import { Badge } from "../../../ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../../ui/tabs";
import { cn } from "@/arc-shims/kit-utils";

// Technical Skills with proficiency levels
const technicalSkills = [
  { name: "JavaScript/TypeScript", proficiency: 95 },
  { name: "React & React Native", proficiency: 92 },
  { name: "Node.js & Express", proficiency: 88 },
  { name: "Next.js", proficiency: 90 },
  { name: "HTML/CSS/SASS", proficiency: 95 },
  { name: "GraphQL", proficiency: 85 },
  { name: "SQL & NoSQL Databases", proficiency: 82 },
  { name: "AWS & Cloud Services", proficiency: 78 },
  { name: "Docker & Kubernetes", proficiency: 75 },
  { name: "Testing (Jest, Cypress)", proficiency: 85 },
];

// Tools categorized by type
const tools = [
  {
    category: "Frontend",
    icon: <Globe className="h-5 w-5" />,
    items: [
      { name: "React", icon: <Code /> },
      { name: "Next.js", icon: <FileCode /> },
      { name: "TypeScript", icon: <FileCode /> },
      { name: "Tailwind CSS", icon: <Palette /> },
      { name: "Material UI", icon: <Palette /> },
      { name: "Redux", icon: <Layers /> },
    ],
  },
  {
    category: "Backend",
    icon: <Server className="h-5 w-5" />,
    items: [
      { name: "Node.js", icon: <Server /> },
      { name: "Express", icon: <Server /> },
      { name: "PostgreSQL", icon: <Database /> },
      { name: "MongoDB", icon: <Database /> },
      { name: "GraphQL", icon: <Code /> },
      { name: "REST API", icon: <Globe /> },
    ],
  },
  {
    category: "DevOps & Tools",
    icon: <Terminal className="h-5 w-5" />,
    items: [
      { name: "Git & GitHub", icon: <SiGithub /> },
      { name: "Docker", icon: <Terminal /> },
      { name: "AWS", icon: <Server /> },
      { name: "CI/CD", icon: <Terminal /> },
      { name: "Jest", icon: <Terminal /> },
      { name: "Figma", icon: <SiFigma /> },
    ],
  },
  {
    category: "Mobile",
    icon: <Smartphone className="h-5 w-5" />,
    items: [
      { name: "React Native", icon: <Smartphone /> },
      { name: "Flutter", icon: <Smartphone /> },
      { name: "iOS", icon: <Smartphone /> },
      { name: "Android", icon: <Smartphone /> },
      { name: "Firebase", icon: <Database /> },
      { name: "App Store Connect", icon: <Globe /> },
    ],
  },
];

export default function SkillsDisplay() {
  // Function to determine skill level label
  const getSkillLevel = (proficiency: number) => {
    if (proficiency >= 90) return "Expert";
    if (proficiency >= 80) return "Advanced";
    if (proficiency >= 70) return "Proficient";
    if (proficiency >= 50) return "Intermediate";
    return "Beginner";
  };

  // Function to get color class based on proficiency
  const getColorClass = (proficiency: number) => {
    if (proficiency >= 90) return "text-green-500";
    if (proficiency >= 80) return "text-blue-500";
    if (proficiency >= 70) return "text-indigo-500";
    if (proficiency >= 50) return "text-amber-500";
    return "text-gray-500";
  };

  return (
    <div className="bg-background py-16 md:py-24">
      <div className="container mx-auto px-4 2xl:max-w-[1400px]">
        <div className="mb-10 flex flex-col gap-3 text-center">
          <Badge
            variant="outline"
            className="border-primary/30 text-primary mx-auto px-3 py-1 text-xs font-medium tracking-wide uppercase"
          >
            My Toolkit
          </Badge>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
            Skills & Technologies
          </h2>
          <p className="text-muted-foreground mx-auto mt-4 max-w-2xl text-lg">
            A comprehensive overview of my technical skills, proficiency levels,
            and the tools I use to create exceptional digital experiences.
          </p>
        </div>

        <Tabs defaultValue="skills" className="max-w-4x mx-auto">
          <TabsList className="grid h-fit w-full grid-cols-1 md:grid-cols-2">
            <TabsTrigger value="skills">Technical Skills</TabsTrigger>
            <TabsTrigger value="tools">Tools & Technologies</TabsTrigger>
          </TabsList>

          {/* Technical Skills Tab */}
          <TabsContent value="skills" className="mt-6">
            <div className="bg-card rounded-xl border p-6">
              <h3 className="mb-4 text-xl font-semibold">
                <Lightbulb className="text-primary mr-2 inline h-5 w-5" />
                Skill Proficiency Levels
              </h3>

              <div className="mt-6 grid gap-5 sm:grid-cols-2">
                {technicalSkills.map((skill) => (
                  <div key={skill.name} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <p className="font-medium">{skill.name}</p>
                      <span
                        className={cn(
                          "text-sm font-semibold",
                          getColorClass(skill.proficiency),
                        )}
                      >
                        {getSkillLevel(skill.proficiency)}
                      </span>
                    </div>
                    <Progress value={skill.proficiency} className="h-2" />
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>

          {/* Tools & Technologies Tab */}
          <TabsContent value="tools" className="mt-6">
            <div className="bg-card rounded-xl border p-6">
              <h3 className="mb-6 text-xl font-semibold">
                <Terminal className="text-primary mr-2 inline h-5 w-5" />
                Tools & Technologies
              </h3>

              <div className="grid gap-8 sm:grid-cols-2">
                {tools.map((toolCategory) => (
                  <div
                    key={toolCategory.category}
                    className="space-y-4 rounded-lg border p-4"
                  >
                    <h4 className="flex items-center gap-2 font-medium">
                      {toolCategory.icon}
                      {toolCategory.category}
                    </h4>

                    <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                      {toolCategory.items.map((tool) => (
                        <div
                          key={tool.name}
                          className="bg-muted/40 hover:border-muted flex items-center gap-2 rounded-md border border-transparent px-3 py-2 text-sm transition-colors"
                        >
                          <span className="text-primary">{tool.icon}</span>
                          {tool.name}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
