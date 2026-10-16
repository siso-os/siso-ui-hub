import { Button } from '../../../ui/button';
import { Badge } from '../../../ui/badge';
import { Card } from '../../../ui/card';
import { useState } from 'react';

export default function HeroSectionWithApiPreview() {
  const [selectedLanguage, setSelectedLanguage] = useState('curl');

  const codeExamples = {
    curl: `curl -X POST https://api.example.com/v1/users \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "plan": "pro"
  }'`,
    python: `import requests

response = requests.post(
    'https://api.example.com/v1/users',
    headers={
        'Authorization': 'Bearer YOUR_API_KEY',
        'Content-Type': 'application/json'
    },
    json={
        'name': 'John Doe',
        'email': 'john@example.com',
        'plan': 'pro'
    }
)

print(response.json())`,
    javascript: `fetch('https://api.example.com/v1/users', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer YOUR_API_KEY',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    name: 'John Doe',
    email: 'john@example.com',
    plan: 'pro'
  })
})
.then(response => response.json())
.then(data => console.log(data))`,
  };

  const endpoints = [
    {
      method: 'GET',
      path: '/users',
      description: 'List all users',
    },
    {
      method: 'POST',
      path: '/users',
      description: 'Create a new user',
    },
    {
      method: 'PUT',
      path: '/users/{id}',
      description: 'Update user details',
    },
  ];

  return (
    <>
      {/* Hero */}
      <div className="">
        <div className="relative">
          {/* Background pattern */}
          <div className="absolute inset-0 -z-10 h-full w-full">
            <div className="absolute h-full w-full bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
            <div className="absolute top-0 right-0 bottom-0 left-0 bg-[radial-gradient(circle_800px_at_100%_200px,rgba(120,119,198,0.1),transparent)]"></div>
          </div>

          <div className="container mx-auto px-4 py-24 md:px-6 lg:py-32 2xl:max-w-[1400px]">
            <div className="mx-auto mb-16 max-w-3xl text-center">
              <Badge variant="outline" className="mb-4">
                REST API
              </Badge>
              <h1 className="mb-4 scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
                Powerful API, simple integration
              </h1>
              <p className="text-muted-foreground mb-8 text-xl">
                Build anything with our well-documented API. Get started in
                minutes with our comprehensive guides and examples.
              </p>
              <div className="flex flex-col justify-center gap-3 sm:flex-row">
                <Button size="lg">
                  View Documentation
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="ml-2 h-4 w-4"
                  >
                    <path d="M5 12h14" />
                    <path d="m12 5 7 7-7 7" />
                  </svg>
                </Button>
                <Button size="lg" variant="outline">
                  Get API Key
                </Button>
              </div>
            </div>

            {/* API Preview */}
            <div className="mx-auto max-w-5xl">
              <Card className="border-2">
                {/* API Header */}
                <div className="flex flex-col items-center justify-between gap-4 border-b p-4 sm:flex-row">
                  <div className="flex items-center gap-3">
                    <div className="flex gap-2">
                      <div className="h-3 w-3 rounded-full bg-red-500" />
                      <div className="h-3 w-3 rounded-full bg-yellow-500" />
                      <div className="h-3 w-3 rounded-full bg-green-500" />
                    </div>
                    <div className="font-mono text-sm">api.example.com</div>
                  </div>
                  <div className="flex items-center gap-2">
                    {['curl', 'python', 'javascript'].map((lang) => (
                      <Button
                        key={lang}
                        variant={
                          selectedLanguage === lang ? 'default' : 'outline'
                        }
                        size="sm"
                        onClick={() => setSelectedLanguage(lang)}
                      >
                        {lang.charAt(0).toUpperCase() + lang.slice(1)}
                      </Button>
                    ))}
                  </div>
                </div>

                <div className="grid lg:grid-cols-2">
                  {/* Code Example */}
                  <div className="bg-muted/50 border-r p-4">
                    <pre className="font-mono text-sm whitespace-pre-wrap">
                      <code>
                        {
                          codeExamples[
                            selectedLanguage as keyof typeof codeExamples
                          ]
                        }
                      </code>
                    </pre>
                  </div>

                  {/* Response Preview */}
                  <div className="p-4">
                    <div className="mb-4 font-mono text-sm text-green-500">
                      {'// Response 200 OK'}
                    </div>
                    <pre className="font-mono text-sm whitespace-pre-wrap">
                      <code>
                        {JSON.stringify(
                          {
                            id: 'usr_123',
                            name: 'John Doe',
                            email: 'john@example.com',
                            plan: 'pro',
                            created_at: '2024-02-28T09:00:00Z',
                          },
                          null,
                          2
                        )}
                      </code>
                    </pre>
                  </div>
                </div>
              </Card>

              {/* API Endpoints */}
              <div className="mt-8 grid gap-4">
                {endpoints.map((endpoint) => (
                  <Card
                    key={`${endpoint.path}-${endpoint.method}`}
                    className="p-4"
                  >
                    <div className="flex items-center gap-4">
                      <Badge
                        variant={
                          endpoint.method === 'GET'
                            ? 'outline'
                            : endpoint.method === 'POST'
                              ? 'default'
                              : 'secondary'
                        }
                        className="w-16 justify-center"
                      >
                        {endpoint.method}
                      </Badge>
                      <code className="font-mono text-sm">{endpoint.path}</code>
                      <p className="text-muted-foreground text-sm">
                        {endpoint.description}
                      </p>
                    </div>
                  </Card>
                ))}
              </div>

              {/* Features */}
              <div className="mt-12 grid gap-6 md:grid-cols-3">
                <Card className="p-6">
                  <div className="bg-primary/10 mb-4 flex h-12 w-12 items-center justify-center rounded-lg">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-primary"
                    >
                      <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
                    </svg>
                  </div>
                  <h3 className="mb-2 font-semibold">RESTful API</h3>
                  <p className="text-muted-foreground text-sm">
                    Simple and intuitive REST API following industry standards
                  </p>
                </Card>
                <Card className="p-6">
                  <div className="bg-primary/10 mb-4 flex h-12 w-12 items-center justify-center rounded-lg">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-primary"
                    >
                      <path d="M12 2v20" />
                      <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                    </svg>
                  </div>
                  <h3 className="mb-2 font-semibold">Rate Limiting</h3>
                  <p className="text-muted-foreground text-sm">
                    Generous rate limits with clear headers and documentation
                  </p>
                </Card>
                <Card className="p-6">
                  <div className="bg-primary/10 mb-4 flex h-12 w-12 items-center justify-center rounded-lg">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-primary"
                    >
                      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
                    </svg>
                  </div>
                  <h3 className="mb-2 font-semibold">Authentication</h3>
                  <p className="text-muted-foreground text-sm">
                    Secure API key and OAuth2 authentication methods
                  </p>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* End Hero */}
    </>
  );
}
