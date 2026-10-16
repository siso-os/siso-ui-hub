"use client";

import { useState } from "react";
import {
  ArrowUpIcon,
  AtomIcon,
  BookOpenIcon,
  BrainIcon,
  CalendarIcon,
  ChevronDownIcon,
  ChevronRightIcon,
  ChevronsUpDownIcon,
  CompassIcon,
  FileTextIcon,
  GithubIcon,
  GlobeIcon,
  ImageIcon,
  LayoutTemplateIcon,
  LightbulbIcon,
  LinkIcon,
  LogOutIcon,
  MailIcon,
  MicIcon,
  MoreHorizontalIcon,
  PaperclipIcon,
  PenLineIcon,
  PlusIcon,
  SettingsIcon,
  Share2Icon,
  SparklesIcon,
  Trash2Icon,
} from "lucide-react";
import { toast } from "sonner";

import {
  Attachment,
  AttachmentInfo,
  AttachmentPreview,
  AttachmentRemove,
  Attachments,
} from "../../../../../components/ui/attachments";
import {
  Avatar,
  AvatarFallback,
  AvatarGroup,
  AvatarImage,
} from "../../../../../../shadcn/ui/avatar";
import { Button } from "../../../../../../shadcn/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../../../../../../shadcn/ui/dropdown-menu";
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemTitle,
} from "../../../../../../shadcn/ui/item";
import { Kbd } from "../../../../../../shadcn/ui/kbd";
import {
  PromptInput,
  PromptInputBody,
  PromptInputButton,
  PromptInputFooter,
  PromptInputHeader,
  PromptInputSubmit,
  PromptInputTextarea,
  PromptInputTools,
  usePromptInputAttachments,
  type PromptInputMessage,
} from "../../../../../components/ui/prompt-input";
import { Separator } from "../../../../../../shadcn/ui/separator";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from "../../../../../../shadcn/ui/sidebar";
import { Toaster } from "../../../../../../shadcn/ui/sonner";
import { ToggleGroup, ToggleGroupItem } from "../../../../../../shadcn/ui/toggle-group";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "../../../../../../shadcn/ui/tooltip";

const navItems = [
  { title: "Explore", icon: CompassIcon },
  { title: "Knowledge Base", icon: BookOpenIcon },
  { title: "Templates", icon: LayoutTemplateIcon },
];

const history = [
  {
    label: "Today",
    chats: [
      "Summarize the Q3 board deck",
      "Polite follow up for the Acme proposal",
      "Startup ideas for pet owners",
    ],
  },
  {
    label: "Yesterday",
    chats: [
      "Explain vector databases simply",
      "Translate the onboarding guide to Spanish",
      "Five captions for the spring launch",
      "Debug a Python retry loop",
    ],
  },
  {
    label: "September",
    chats: ["Outline a blog post on pricing", "Weekly workout plan"],
  },
];

const models = ["Nexa Core 2", "Nexa Swift", "Nexa Reason"];

const integrations = [
  { name: "Gmail", icon: MailIcon },
  { name: "Calendar", icon: CalendarIcon },
  { name: "Docs", icon: FileTextIcon },
  { name: "GitHub", icon: GithubIcon },
];

const starters = [
  {
    title: "Summarize text",
    description: "Turn long articles into short, easy summaries.",
    prompt: "Summarize this article in five bullet points: ",
    icon: FileTextIcon,
  },
  {
    title: "Creative writing",
    description: "Draft stories, blog posts or fresh content ideas.",
    prompt: "Write a short blog intro about ",
    icon: PenLineIcon,
  },
  {
    title: "Answer questions",
    description: "Ask about facts, advice or anything in between.",
    prompt: "Help me understand ",
    icon: BrainIcon,
  },
];

function AppSidebar() {
  const [active, setActive] = useState(history[0].chats[0]);

  return (
    <Sidebar>
      <SidebarHeader className="gap-3 p-3">
        <div className="flex items-center gap-2 px-1 pt-1">
          <div className="bg-primary text-primary-foreground flex size-7 items-center justify-center rounded-lg">
            <SparklesIcon className="size-4" />
          </div>
          <span className="font-semibold">Nexa</span>
        </div>
        <Button
          className="justify-between"
          onClick={() => toast("New chat started")}
        >
          <span className="flex items-center gap-2">
            <PlusIcon />
            New chat
          </span>
          <Kbd className="bg-primary-foreground/15 text-primary-foreground">
            ⌘N
          </Kbd>
        </Button>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {navItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton>
                    <item.icon />
                    <span>{item.title}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        {history.map((group) => (
          <SidebarGroup key={group.label}>
            <SidebarGroupLabel>{group.label}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {group.chats.map((chat) => (
                  <SidebarMenuItem key={chat}>
                    <SidebarMenuButton
                      isActive={active === chat}
                      onClick={() => setActive(chat)}
                    >
                      <span>{chat}</span>
                    </SidebarMenuButton>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <SidebarMenuAction showOnHover>
                          <MoreHorizontalIcon />
                          <span className="sr-only">More</span>
                        </SidebarMenuAction>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent side="right" align="start">
                        <DropdownMenuItem>
                          <Share2Icon />
                          Share
                        </DropdownMenuItem>
                        <DropdownMenuItem variant="destructive">
                          <Trash2Icon />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton>
              <SettingsIcon />
              <span>Settings</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton size="lg">
                  <Avatar className="size-8">
                    <AvatarImage
                      src="https://i.pravatar.cc/80?img=12"
                      alt="Daniel Reyes"
                    />
                    <AvatarFallback>DR</AvatarFallback>
                  </Avatar>
                  <div className="grid flex-1 text-left leading-tight">
                    <span className="truncate text-sm font-medium">
                      Daniel Reyes
                    </span>
                    <span className="text-muted-foreground truncate text-xs">
                      Free plan
                    </span>
                  </div>
                  <ChevronsUpDownIcon className="text-muted-foreground ml-auto" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent side="top" align="start" className="w-56">
                <DropdownMenuLabel>daniel@nexa.ai</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <SparklesIcon />
                  Upgrade plan
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <LogOutIcon />
                  Sign out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}

function PromptAttachments() {
  const attachments = usePromptInputAttachments();

  if (attachments.files.length === 0) return null;

  return (
    <PromptInputHeader>
      <Attachments variant="inline">
        {attachments.files.map((file) => (
          <Attachment
            key={file.id}
            data={file}
            onRemove={() => attachments.remove(file.id)}
          >
            <AttachmentPreview />
            <AttachmentInfo className="max-w-40" />
            <AttachmentRemove />
          </Attachment>
        ))}
      </Attachments>
    </PromptInputHeader>
  );
}

function AttachButton() {
  const attachments = usePromptInputAttachments();

  return (
    <PromptInputButton
      tooltip="Attach files"
      aria-label="Attach files"
      onClick={attachments.openFileDialog}
    >
      <PaperclipIcon />
    </PromptInputButton>
  );
}

export default function AiChat() {
  const [model, setModel] = useState(models[0]);
  const [text, setText] = useState("");
  const [modes, setModes] = useState<string[]>(["research"]);
  const [webSearch, setWebSearch] = useState(false);

  const handleSubmit = (message: PromptInputMessage) => {
    if (!message.text.trim() && message.files.length === 0) return;
    setText("");
    toast("Message sent", { description: `Answering with ${model}` });
  };

  return (
    <SidebarProvider className="h-svh min-h-0 overflow-hidden">
      <AppSidebar />
      <SidebarInset className="min-h-0 min-w-0 overflow-hidden">
        <header className="flex h-14 shrink-0 items-center gap-2 border-b px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator
            orientation="vertical"
            className="mr-1 h-4 data-vertical:self-center"
          />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="px-2 font-medium">
                {model}
                <ChevronDownIcon className="text-muted-foreground" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-48">
              <DropdownMenuLabel>Model</DropdownMenuLabel>
              <DropdownMenuRadioGroup value={model} onValueChange={setModel}>
                {models.map((item) => (
                  <DropdownMenuRadioItem key={item} value={item}>
                    {item}
                  </DropdownMenuRadioItem>
                ))}
              </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </DropdownMenu>
          <div className="ml-auto flex items-center gap-1">
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  aria-label="Copy link"
                  onClick={() => toast("Link copied")}
                >
                  <LinkIcon />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Copy link</TooltipContent>
            </Tooltip>
            <Button
              variant="outline"
              onClick={() => toast("Share link created")}
            >
              <Share2Icon />
              Share
            </Button>
          </div>
        </header>

        <div className="flex min-h-0 flex-1 flex-col overflow-y-auto">
          <div className="mx-auto flex w-full max-w-3xl flex-1 flex-col items-center justify-center gap-8 px-4 py-10">
            <div className="flex flex-col items-center gap-5 text-center">
              <Button variant="outline" size="sm" className="rounded-full">
                <SparklesIcon />
                <span>
                  <span className="text-primary font-medium">Upgrade</span> for
                  full access
                </span>
              </Button>
              <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
                Let&apos;s start a smart conversation
              </h1>
            </div>

            <div className="bg-muted/60 w-full rounded-3xl">
              <PromptInput
                multiple
                onSubmit={handleSubmit}
                className="*:data-[slot=input-group]:bg-card *:data-[slot=input-group]:border-border *:data-[slot=input-group]:rounded-3xl *:data-[slot=input-group]:shadow-xs"
              >
                <PromptAttachments />
                <PromptInputBody>
                  <PromptInputTextarea
                    value={text}
                    onChange={(event) => setText(event.currentTarget.value)}
                    placeholder="Ask me anything..."
                    className="px-4 pt-4"
                  />
                </PromptInputBody>
                <PromptInputFooter className="p-3">
                  <ToggleGroup
                    type="multiple"
                    variant="outline"
                    size="sm"
                    value={modes}
                    onValueChange={setModes}
                  >
                    <ToggleGroupItem value="research" className="px-3">
                      <AtomIcon />
                      <span className="hidden sm:inline">Deep research</span>
                    </ToggleGroupItem>
                    <ToggleGroupItem value="image" aria-label="Create image">
                      <ImageIcon />
                    </ToggleGroupItem>
                    <ToggleGroupItem value="reason" aria-label="Think longer">
                      <LightbulbIcon />
                    </ToggleGroupItem>
                  </ToggleGroup>
                  <PromptInputTools>
                    <PromptInputButton
                      tooltip="Search the web"
                      aria-label="Search the web"
                      aria-pressed={webSearch}
                      variant={webSearch ? "secondary" : "ghost"}
                      onClick={() => setWebSearch((value) => !value)}
                    >
                      <GlobeIcon />
                    </PromptInputButton>
                    <AttachButton />
                    <PromptInputButton
                      tooltip="Voice input"
                      aria-label="Voice input"
                    >
                      <MicIcon />
                    </PromptInputButton>
                    <PromptInputSubmit className="rounded-full">
                      <ArrowUpIcon />
                    </PromptInputSubmit>
                  </PromptInputTools>
                </PromptInputFooter>
              </PromptInput>
              <Item
                asChild
                size="sm"
                className="text-muted-foreground hover:text-foreground rounded-none rounded-b-3xl px-5 text-left"
              >
                <button
                  type="button"
                  onClick={() => toast("Integrations opened")}
                >
                  <ItemContent className="truncate">
                    Connect your tools to Nexa
                  </ItemContent>
                  <ItemActions>
                    <AvatarGroup className="*:data-[slot=avatar]:size-6">
                      {integrations.map((item) => (
                        <Avatar key={item.name}>
                          <AvatarFallback className="bg-background">
                            <item.icon className="size-3" />
                          </AvatarFallback>
                        </Avatar>
                      ))}
                    </AvatarGroup>
                    <ChevronRightIcon className="size-4" />
                  </ItemActions>
                </button>
              </Item>
            </div>

            <div className="grid w-full gap-3 sm:grid-cols-3">
              {starters.map((item) => (
                <Item
                  key={item.title}
                  asChild
                  variant="outline"
                  className="hover:bg-muted/50 flex-col items-start gap-3 text-left"
                >
                  <button type="button" onClick={() => setText(item.prompt)}>
                    <ItemMedia variant="icon" className="text-muted-foreground">
                      <item.icon />
                    </ItemMedia>
                    <ItemContent>
                      <ItemTitle>{item.title}</ItemTitle>
                      <ItemDescription>{item.description}</ItemDescription>
                    </ItemContent>
                  </button>
                </Item>
              ))}
            </div>
          </div>
          <p className="text-muted-foreground shrink-0 px-4 pb-4 text-center text-xs">
            Nexa can make mistakes. Check important info.
          </p>
        </div>
      </SidebarInset>
      <Toaster />
    </SidebarProvider>
  );
}
