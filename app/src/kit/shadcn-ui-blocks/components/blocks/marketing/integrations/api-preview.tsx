import { Button } from '../../../ui/button';
import { Card, CardContent } from '../../../ui/card';
import { Badge } from '../../../ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../../ui/tabs';
import {
  ExternalLink,
  Star,
  Copy,
  Play,
  Code,
  Terminal,
  Zap,
  CheckCircle,
} from 'lucide-react';
import { useState } from 'react';

export default function IntegrationsApiPreview() {
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const integrations = [
    {
      id: 1,
      name: 'Stripe',
      category: 'Payments',
      description: 'Accept payments securely with just a few lines of code',
      logo: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?q=80&w=60&h=60&auto=format&fit=crop&ixlib=rb-4.0.3',
      rating: 4.9,
      difficulty: 'Easy',
      setupTime: '5 min',
      endpoints: 12,
      codeExamples: {
        javascript: `// Initialize Stripe
import Stripe from 'stripe';
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// Create a payment intent
const paymentIntent = await stripe.paymentIntents.create({
  amount: 2000,
  currency: 'usd',
  automatic_payment_methods: {
    enabled: true,
  },
});

console.log(paymentIntent.client_secret);`,
        python: `# Initialize Stripe
import stripe
stripe.api_key = "sk_test_..."

# Create a payment intent
stripe.PaymentIntent.create(
    amount=2000,
    currency='usd',
    automatic_payment_methods={
        'enabled': True,
    },
)`,
        curl: `curl https://api.stripe.com/v1/payment_intents \\
  -u sk_test_...: \\
  -d amount=2000 \\
  -d currency=usd \\
  -d "automatic_payment_methods[enabled]=true"`,
      },
      apiResponse: `{
  "id": "pi_1234567890",
  "object": "payment_intent",
  "amount": 2000,
  "currency": "usd",
  "status": "requires_payment_method",
  "client_secret": "pi_1234567890_secret_abc123"
}`,
    },
    {
      id: 2,
      name: 'GitHub',
      category: 'Developer Tools',
      description:
        "Integrate with GitHub's powerful API for repository management",
      logo: 'https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?q=80&w=60&h=60&auto=format&fit=crop&ixlib=rb-4.0.3',
      rating: 4.8,
      difficulty: 'Medium',
      setupTime: '3 min',
      endpoints: 25,
      codeExamples: {
        javascript: `// Using Octokit.js
import { Octokit } from "@octokit/rest";

const octokit = new Octokit({
  auth: process.env.GITHUB_TOKEN,
});

// Get repository information
const { data } = await octokit.rest.repos.get({
  owner: "octocat",
  repo: "Hello-World",
});

console.log(data.full_name);`,
        python: `# Using PyGithub
from github import Github

g = Github("your_token_here")

# Get repository
repo = g.get_repo("octocat/Hello-World")
print(f"Repo: {repo.full_name}")
print(f"Stars: {repo.stargazers_count}")`,
        curl: `curl -H "Authorization: token ghp_..." \\
  https://api.github.com/repos/octocat/Hello-World`,
      },
      apiResponse: `{
  "id": 1296269,
  "name": "Hello-World",
  "full_name": "octocat/Hello-World",
  "private": false,
  "stargazers_count": 80,
  "language": "C"
}`,
    },
    {
      id: 3,
      name: 'Slack',
      category: 'Communication',
      description: 'Send messages and manage workspaces programmatically',
      logo: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?q=80&w=60&h=60&auto=format&fit=crop&ixlib=rb-4.0.3',
      rating: 4.7,
      difficulty: 'Easy',
      setupTime: '2 min',
      endpoints: 18,
      codeExamples: {
        javascript: `// Using Slack Web API
import { WebClient } from '@slack/web-api';

const slack = new WebClient(process.env.SLACK_TOKEN);

// Send a message
const result = await slack.chat.postMessage({
  channel: '#general',
  text: 'Hello from your app! 🎉',
  username: 'MyBot',
});

console.log(result.ts);`,
        python: `# Using slack-sdk
from slack_sdk import WebClient

client = WebClient(token="xoxb-your-token")

# Send message
response = client.chat_postMessage(
    channel="#general",
    text="Hello from Python! 🐍"
)

print(f"Message sent: {response['ts']}")`,
        curl: `curl -X POST https://slack.com/api/chat.postMessage \\
  -H "Authorization: Bearer xoxb-your-token" \\
  -H "Content-Type: application/json" \\
  -d '{"channel":"#general","text":"Hello World!"}'`,
      },
      apiResponse: `{
  "ok": true,
  "channel": "C1234567890",
  "ts": "1234567890.123456",
  "message": {
    "text": "Hello from your app! 🎉",
    "username": "MyBot",
    "ts": "1234567890.123456"
  }
}`,
    },
  ];

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedCode(id);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy':
        return 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300';
      case 'Medium':
        return 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300';
      case 'Hard':
        return 'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300';
      default:
        return 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300';
    }
  };

  return (
    <>
      {/* API Preview Integrations Section */}
      <div className="py-24 lg:py-32">
        <div className="container mx-auto px-4 md:px-6 2xl:max-w-[1400px]">
          {/* Header */}
          <div className="mx-auto max-w-3xl text-center">
            <Badge className="mb-4" variant="outline">
              <Code className="mr-2 h-4 w-4" />
              API Integrations
            </Badge>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
              Code. Connect. Ship.
            </h2>
            <p className="text-muted-foreground mt-6 text-lg">
              Explore our API integrations with live code examples. See how easy
              it is to connect your application with powerful third-party
              services in just a few lines of code.
            </p>
          </div>

          {/* Integration Cards with Code Preview */}
          <div className="mt-16 space-y-12">
            {integrations.map((integration) => (
              <Card key={integration.id} className="overflow-hidden py-0">
                <div className="grid gap-8 lg:grid-cols-2">
                  {/* Left: Integration Info */}
                  <CardContent className="p-8">
                    {/* Header */}
                    <div className="flex items-center gap-4">
                      <div className="relative h-12 w-12 overflow-hidden rounded-lg">
                        <img
                          src={integration.logo}
                          alt={`${integration.name} logo`}
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold">
                          {integration.name}
                        </h3>
                        <p className="text-muted-foreground">
                          {integration.category}
                        </p>
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-muted-foreground mt-4">
                      {integration.description}
                    </p>

                    {/* Stats */}
                    <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
                      <div className="text-center">
                        <div className="text-2xl font-bold">
                          {integration.rating}
                        </div>
                        <div className="flex items-center justify-center gap-1">
                          <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                          <span className="text-muted-foreground text-xs">
                            Rating
                          </span>
                        </div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold">
                          {integration.endpoints}
                        </div>
                        <div className="text-muted-foreground text-xs">
                          Endpoints
                        </div>
                      </div>
                      <div className="text-center">
                        <Badge
                          className={`${getDifficultyColor(integration.difficulty)}`}
                        >
                          {integration.difficulty}
                        </Badge>
                        <div className="text-muted-foreground mt-1 text-xs">
                          Difficulty
                        </div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold">
                          {integration.setupTime}
                        </div>
                        <div className="text-muted-foreground text-xs">
                          Setup
                        </div>
                      </div>
                    </div>

                    {/* Quick Features */}
                    <div className="mt-6 space-y-2">
                      <div className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        <span className="text-sm">
                          Production-ready endpoints
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        <span className="text-sm">
                          Comprehensive documentation
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        <span className="text-sm">
                          Rate limiting & error handling
                        </span>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="mt-8 flex gap-3">
                      <Button>
                        Connect API
                        <Zap className="ml-2 h-4 w-4" />
                      </Button>
                      <Button variant="outline">
                        Documentation
                        <ExternalLink className="ml-2 h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>

                  {/* Right: Code Preview */}
                  <div className="bg-muted/30 overflow-auto p-8">
                    <div className="mb-4 flex items-center justify-between">
                      <h4 className="font-semibold">Code Example</h4>
                      <Badge variant="outline">
                        <Terminal className="mr-1 h-3 w-3" />
                        Live API
                      </Badge>
                    </div>

                    <Tabs defaultValue="javascript" className="w-full">
                      <TabsList className="grid h-fit w-full grid-cols-3">
                        <TabsTrigger value="javascript">JavaScript</TabsTrigger>
                        <TabsTrigger value="python">Python</TabsTrigger>
                        <TabsTrigger value="curl">cURL</TabsTrigger>
                      </TabsList>

                      {Object.entries(integration.codeExamples).map(
                        ([lang, code]) => (
                          <TabsContent key={lang} value={lang} className="mt-4">
                            <div className="relative">
                              <pre className="overflow-x-auto rounded-lg bg-black p-4 text-sm text-green-400">
                                <code>{code}</code>
                              </pre>
                              <Button
                                size="sm"
                                variant="outline"
                                className="absolute top-2 right-2"
                                onClick={() =>
                                  copyToClipboard(
                                    code,
                                    `${integration.id}-${lang}`
                                  )
                                }
                              >
                                {copiedCode === `${integration.id}-${lang}` ? (
                                  <CheckCircle className="h-4 w-4" />
                                ) : (
                                  <Copy className="h-4 w-4" />
                                )}
                              </Button>
                            </div>
                          </TabsContent>
                        )
                      )}
                    </Tabs>

                    {/* API Response Preview */}
                    <div className="mt-6">
                      <div className="mb-2 flex items-center justify-between">
                        <h5 className="text-sm font-medium">API Response</h5>
                        <Button size="sm" variant="outline">
                          <Play className="mr-1 h-3 w-3" />
                          Try it
                        </Button>
                      </div>
                      <pre className="overflow-x-auto rounded-lg bg-gray-900 p-4 text-xs text-blue-300">
                        <code>{integration.apiResponse}</code>
                      </pre>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {/* Bottom CTA */}
          <div className="mt-16 text-center">
            <Card className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
              <CardContent className="p-12">
                <Code className="text-primary mx-auto h-12 w-12" />
                <h3 className="mt-4 text-2xl font-bold">
                  Ready to Start Building?
                </h3>
                <p className="text-muted-foreground mt-2 text-lg">
                  Get your API keys and start integrating with our comprehensive
                  SDKs and documentation.
                </p>
                <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:justify-center">
                  <Button size="lg">
                    Get API Keys
                    <Zap className="ml-2 h-4 w-4" />
                  </Button>
                  <Button size="lg" variant="outline">
                    View All APIs
                  </Button>
                </div>
                <p className="text-muted-foreground mt-6 text-sm">
                  Free tier available • No credit card required • 10,000
                  requests/month
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      {/* End API Preview Integrations Section */}
    </>
  );
}
