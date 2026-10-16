import { useState } from 'react';
import { Check, Copy, Search } from 'lucide-react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '../../../ui/accordion';
import { Button } from '../../../ui/button';
import { Input } from '../../../ui/input';
import { Tabs, TabsList, TabsTrigger } from '../../../ui/tabs';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../../../ui/select';

type LanguageId = 'javascript' | 'typescript' | 'python' | 'java';

const languageTabs = [
  { id: 'javascript' as const, label: 'JavaScript' },
  { id: 'typescript' as const, label: 'TypeScript' },
  { id: 'python' as const, label: 'Python' },
  { id: 'java' as const, label: 'Java' },
];

const faqs = [
  {
    category: 'Authentication',
    items: [
      {
        question: 'How do I authenticate API requests?',
        answer:
          'You can authenticate requests using an API key in the Authorization header. All API requests must be made over HTTPS.',
        examples: {
          javascript: `
// Using fetch API
fetch('https://api.example.com/v1/data', {
  method: 'GET',
  headers: {
    'Authorization': 'Bearer YOUR_API_KEY',
    'Content-Type': 'application/json'
  }
})
.then(response => response.json())
.then(data => console.log(data))
.catch(error => console.error('Error:', error));
`,
          typescript: `
// Using axios with TypeScript
import axios from 'axios';

interface ApiResponse {
  success: boolean;
  data: any;
}

async function fetchData(): Promise<ApiResponse> {
  try {
    const response = await axios.get<ApiResponse>('https://api.example.com/v1/data', {
      headers: {
        'Authorization': 'Bearer YOUR_API_KEY',
        'Content-Type': 'application/json'
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
}
`,
          python: `
# Using requests library
import requests

headers = {
    'Authorization': 'Bearer YOUR_API_KEY',
    'Content-Type': 'application/json'
}

response = requests.get('https://api.example.com/v1/data', headers=headers)

if response.status_code == 200:
    data = response.json()
    print(data)
else:
    print(f"Error: {response.status_code}")
    print(response.text)
`,
          java: `
// Using Java HttpClient (Java 11+)
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;

public class ApiClient {
    public static void main(String[] args) {
        HttpClient client = HttpClient.newHttpClient();
        
        HttpRequest request = HttpRequest.newBuilder()
            .uri(URI.create("https://api.example.com/v1/data"))
            .header("Authorization", "Bearer YOUR_API_KEY")
            .header("Content-Type", "application/json")
            .GET()
            .build();
            
        client.sendAsync(request, HttpResponse.BodyHandlers.ofString())
            .thenApply(HttpResponse::body)
            .thenAccept(System.out::println)
            .join();
    }
}
`,
        },
      },
      {
        question: 'How do I refresh an access token?',
        answer:
          'When an access token expires, use the refresh token to obtain a new one. This avoids interrupting the user experience by requiring them to log in again.',
        examples: {
          javascript: `
// Refresh token example
async function refreshAccessToken(refreshToken) {
  const response = await fetch('https://api.example.com/v1/auth/refresh', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      refresh_token: refreshToken
    })
  });
  
  const data = await response.json();
  
  if (!response.ok) {
    throw new Error('Failed to refresh token');
  }
  
  return {
    accessToken: data.access_token,
    refreshToken: data.refresh_token
  };
}
`,
          typescript: `
// Refresh token with TypeScript
interface TokenResponse {
  access_token: string;
  refresh_token: string;
  expires_in: number;
}

async function refreshAccessToken(refreshToken: string): Promise<TokenResponse> {
  const response = await fetch('https://api.example.com/v1/auth/refresh', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      refresh_token: refreshToken
    })
  });
  
  if (!response.ok) {
    throw new Error(\`Failed to refresh token: \${response.status}\`);
  }
  
  return await response.json() as TokenResponse;
}
`,
          python: `
# Refresh token in Python
import requests

def refresh_access_token(refresh_token):
    url = 'https://api.example.com/v1/auth/refresh'
    payload = {
        'refresh_token': refresh_token
    }
    
    response = requests.post(url, json=payload)
    
    if response.status_code == 200:
        token_data = response.json()
        return {
            'access_token': token_data['access_token'],
            'refresh_token': token_data['refresh_token']
        }
    else:
        raise Exception(f"Failed to refresh token: {response.status_code}")
`,
          java: `
// Refresh token in Java
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import org.json.JSONObject;

public class TokenRefresher {
    public static JSONObject refreshAccessToken(String refreshToken) throws Exception {
        HttpClient client = HttpClient.newHttpClient();
        
        JSONObject requestBody = new JSONObject();
        requestBody.put("refresh_token", refreshToken);
        
        HttpRequest request = HttpRequest.newBuilder()
            .uri(URI.create("https://api.example.com/v1/auth/refresh"))
            .header("Content-Type", "application/json")
            .POST(HttpRequest.BodyPublishers.ofString(requestBody.toString()))
            .build();
            
        HttpResponse<String> response = client.send(request, HttpResponse.BodyHandlers.ofString());
        
        if (response.statusCode() != 200) {
            throw new Exception("Failed to refresh token: " + response.statusCode());
        }
        
        return new JSONObject(response.body());
    }
}
`,
        },
      },
    ],
  },
  {
    category: 'Data Handling',
    items: [
      {
        question: 'How do I upload files to the API?',
        answer:
          'Use multipart/form-data encoding to upload files. The API supports various file formats including images, documents, and archives up to 100MB in size.',
        examples: {
          javascript: `
// File upload using FormData
function uploadFile(file) {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('description', 'File upload example');
  
  return fetch('https://api.example.com/v1/files/upload', {
    method: 'POST',
    headers: {
      'Authorization': 'Bearer YOUR_API_KEY'
      // No Content-Type header needed, it's set automatically with FormData
    },
    body: formData
  })
  .then(response => response.json());
}

// Example usage with file input
document.querySelector('#fileInput').addEventListener('change', (e) => {
  const file = e.target.files[0];
  uploadFile(file).then(result => console.log('Upload result:', result));
});
`,
          typescript: `
// File upload with TypeScript
interface UploadResponse {
  success: boolean;
  fileId: string;
  url: string;
}

async function uploadFile(file: File): Promise<UploadResponse> {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('description', 'File upload example');
  
  const response = await fetch('https://api.example.com/v1/files/upload', {
    method: 'POST',
    headers: {
      'Authorization': 'Bearer YOUR_API_KEY'
    },
    body: formData
  });
  
  if (!response.ok) {
    throw new Error(\`Upload failed: \${response.status}\`);
  }
  
  return await response.json() as UploadResponse;
}
`,
          python: `
# File upload in Python
import requests

def upload_file(file_path, description):
    url = 'https://api.example.com/v1/files/upload'
    
    headers = {
        'Authorization': 'Bearer YOUR_API_KEY'
    }
    
    files = {
        'file': open(file_path, 'rb')
    }
    
    data = {
        'description': description
    }
    
    response = requests.post(url, headers=headers, files=files, data=data)
    
    if response.status_code == 200:
        return response.json()
    else:
        raise Exception(f"Upload failed: {response.status_code}")
`,
          java: `
// File upload in Java
import java.io.File;
import java.nio.file.Files;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.util.UUID;

public class FileUploader {
    public static String uploadFile(File file, String description) throws Exception {
        String boundary = UUID.randomUUID().toString();
        
        HttpClient client = HttpClient.newHttpClient();
        
        // Create multipart form data
        String separator = "--" + boundary + "\\r\\n";
        String end = "--" + boundary + "--\\r\\n";
        
        byte[] fileBytes = Files.readAllBytes(file.toPath());
        
        String multipartBody = 
            separator + 
            "Content-Disposition: form-data; name=\\"description\\"\\r\\n\\r\\n" + 
            description + "\\r\\n" +
            separator + 
            "Content-Disposition: form-data; name=\\"file\\"; filename=\\"" + file.getName() + "\\"\\r\\n" +
            "Content-Type: application/octet-stream\\r\\n\\r\\n";
        
        byte[] multipartBodyBytes = multipartBody.getBytes();
        byte[] endBytes = ("\\r\\n" + end).getBytes();
        
        byte[] requestBody = new byte[multipartBodyBytes.length + fileBytes.length + endBytes.length];
        
        System.arraycopy(multipartBodyBytes, 0, requestBody, 0, multipartBodyBytes.length);
        System.arraycopy(fileBytes, 0, requestBody, multipartBodyBytes.length, fileBytes.length);
        System.arraycopy(endBytes, 0, requestBody, multipartBodyBytes.length + fileBytes.length, endBytes.length);
        
        HttpRequest request = HttpRequest.newBuilder()
            .uri(URI.create("https://api.example.com/v1/files/upload"))
            .header("Authorization", "Bearer YOUR_API_KEY")
            .header("Content-Type", "multipart/form-data; boundary=" + boundary)
            .POST(HttpRequest.BodyPublishers.ofByteArray(requestBody))
            .build();
            
        HttpResponse<String> response = client.send(request, HttpResponse.BodyHandlers.ofString());
        
        if (response.statusCode() != 200) {
            throw new Exception("Upload failed: " + response.statusCode());
        }
        
        return response.body();
    }
}
`,
        },
      },
      {
        question: 'How do I implement pagination with the API?',
        answer:
          "Our API uses cursor-based pagination for efficient results handling. Use the 'next_cursor' from the response to fetch the next page of results.",
        examples: {
          javascript: `
// Pagination example
async function fetchAllItems() {
  let allItems = [];
  let nextCursor = null;
  
  do {
    // Build URL with cursor if available
    let url = 'https://api.example.com/v1/items?limit=100';
    if (nextCursor) {
      url += \`&cursor=\${nextCursor}\`;
    }
    
    const response = await fetch(url, {
      headers: {
        'Authorization': 'Bearer YOUR_API_KEY'
      }
    });
    
    const data = await response.json();
    
    // Add results to our collection
    allItems = [...allItems, ...data.items];
    
    // Update cursor for next request
    nextCursor = data.next_cursor;
    
    // Continue until there's no next cursor
  } while (nextCursor);
  
  return allItems;
}
`,
          typescript: `
// Pagination with TypeScript
interface PaginatedResponse<T> {
  items: T[];
  next_cursor: string | null;
  total_count: number;
}

interface Item {
  id: string;
  name: string;
  created_at: string;
}

async function fetchAllItems(): Promise<Item[]> {
  let allItems: Item[] = [];
  let nextCursor: string | null = null;
  
  do {
    let url = 'https://api.example.com/v1/items?limit=100';
    if (nextCursor) {
      url += \`&cursor=\${nextCursor}\`;
    }
    
    const response = await fetch(url, {
      headers: {
        'Authorization': 'Bearer YOUR_API_KEY'
      }
    });
    
    const data = await response.json() as PaginatedResponse<Item>;
    
    allItems = [...allItems, ...data.items];
    nextCursor = data.next_cursor;
    
  } while (nextCursor);
  
  return allItems;
}
`,
          python: `
# Pagination in Python
import requests

def fetch_all_items():
    all_items = []
    next_cursor = None
    
    while True:
        # Build URL with cursor if available
        url = 'https://api.example.com/v1/items?limit=100'
        if next_cursor:
            url += f'&cursor={next_cursor}'
        
        headers = {
            'Authorization': 'Bearer YOUR_API_KEY'
        }
        
        response = requests.get(url, headers=headers)
        
        if response.status_code != 200:
            raise Exception(f"Failed to fetch items: {response.status_code}")
        
        data = response.json()
        
        # Add results to our collection
        all_items.extend(data['items'])
        
        # Update cursor for next request
        next_cursor = data.get('next_cursor')
        
        # Break if no more pages
        if not next_cursor:
            break
    
    return all_items
`,
          java: `
// Pagination in Java
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.util.ArrayList;
import java.util.List;
import org.json.JSONArray;
import org.json.JSONObject;

public class PaginatedFetcher {
    public static List<JSONObject> fetchAllItems() throws Exception {
        List<JSONObject> allItems = new ArrayList<>();
        String nextCursor = null;
        
        HttpClient client = HttpClient.newHttpClient();
        
        do {
            // Build URL with cursor if available
            String url = "https://api.example.com/v1/items?limit=100";
            if (nextCursor != null) {
                url += "&cursor=" + nextCursor;
            }
            
            HttpRequest request = HttpRequest.newBuilder()
                .uri(URI.create(url))
                .header("Authorization", "Bearer YOUR_API_KEY")
                .GET()
                .build();
                
            HttpResponse<String> response = client.send(request, HttpResponse.BodyHandlers.ofString());
            
            if (response.statusCode() != 200) {
                throw new Exception("Failed to fetch items: " + response.statusCode());
            }
            
            JSONObject data = new JSONObject(response.body());
            JSONArray items = data.getJSONArray("items");
            
            // Add items to our collection
            for (int i = 0; i < items.length(); i++) {
                allItems.add(items.getJSONObject(i));
            }
            
            // Update cursor for next request
            nextCursor = data.has("next_cursor") ? data.getString("next_cursor") : null;
            
        } while (nextCursor != null);
        
        return allItems;
    }
}
`,
        },
      },
    ],
  },
  {
    category: 'Error Handling',
    items: [
      {
        question: 'How should I handle API errors?',
        answer:
          'All API errors return appropriate HTTP status codes and a JSON response body with error details. Your code should check for non-200 status codes and handle errors accordingly.',
        examples: {
          javascript: `
// Error handling example
async function makeApiRequest(endpoint) {
  try {
    const response = await fetch(\`https://api.example.com/v1/\${endpoint}\`, {
      headers: {
        'Authorization': 'Bearer YOUR_API_KEY'
      }
    });
    
    const data = await response.json();
    
    if (!response.ok) {
      // Handle API errors with error info from the response
      console.error(\`API Error: \${data.error.code} - \${data.error.message}\`);
      throw new Error(data.error.message);
    }
    
    return data;
  } catch (error) {
    // Handle network errors or JSON parsing errors
    console.error('Request failed:', error);
    throw error;
  }
}
`,
          typescript: `
// Error handling with TypeScript
interface ApiError {
  error: {
    code: string;
    message: string;
    details?: any;
  }
}

interface ApiResponse<T> {
  success: boolean;
  data: T;
}

class ApiRequestError extends Error {
  code: string;
  details?: any;
  
  constructor(code: string, message: string, details?: any) {
    super(message);
    this.code = code;
    this.details = details;
  }
}

async function makeApiRequest<T>(endpoint: string): Promise<T> {
  try {
    const response = await fetch(\`https://api.example.com/v1/\${endpoint}\`, {
      headers: {
        'Authorization': 'Bearer YOUR_API_KEY'
      }
    });
    
    const responseData = await response.json();
    
    if (!response.ok) {
      const errorData = responseData as ApiError;
      throw new ApiRequestError(
        errorData.error.code,
        errorData.error.message,
        errorData.error.details
      );
    }
    
    return responseData as T;
  } catch (error) {
    if (error instanceof ApiRequestError) {
      // Handle API errors
      console.error(\`API Error: \${error.code} - \${error.message}\`);
    } else {
      // Handle network errors or JSON parsing errors
      console.error('Request failed:', error);
    }
    throw error;
  }
}
`,
          python: `
# Error handling in Python
import requests

class ApiError(Exception):
    def __init__(self, code, message, details=None):
        self.code = code
        self.message = message
        self.details = details
        super().__init__(f"{code}: {message}")

def make_api_request(endpoint):
    url = f'https://api.example.com/v1/{endpoint}'
    
    headers = {
        'Authorization': 'Bearer YOUR_API_KEY'
    }
    
    try:
        response = requests.get(url, headers=headers)
        response.raise_for_status()  # Raise exception for 4XX/5XX responses
        return response.json()
    except requests.exceptions.HTTPError as e:
        # Handle API errors
        try:
            error_data = response.json()
            raise ApiError(
                error_data['error']['code'],
                error_data['error']['message'],
                error_data['error'].get('details')
            )
        except (ValueError, KeyError):
            # Couldn't parse error JSON
            raise ApiError('unknown_error', str(e))
    except requests.exceptions.RequestException as e:
        # Handle network errors
        raise ApiError('network_error', str(e))
`,
          java: `
// Error handling in Java
import java.io.IOException;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import org.json.JSONObject;

class ApiError extends Exception {
    private String code;
    private Object details;
    
    public ApiError(String code, String message, Object details) {
        super(message);
        this.code = code;
        this.details = details;
    }
    
    public String getCode() {
        return code;
    }
    
    public Object getDetails() {
        return details;
    }
}

public class ApiClient {
    public static JSONObject makeApiRequest(String endpoint) throws Exception {
        HttpClient client = HttpClient.newHttpClient();
        
        HttpRequest request = HttpRequest.newBuilder()
            .uri(URI.create("https://api.example.com/v1/" + endpoint))
            .header("Authorization", "Bearer YOUR_API_KEY")
            .GET()
            .build();
            
        try {
            HttpResponse<String> response = client.send(request, HttpResponse.BodyHandlers.ofString());
            
            JSONObject responseData = new JSONObject(response.body());
            
            if (response.statusCode() < 200 || response.statusCode() >= 300) {
                // Handle API errors
                JSONObject error = responseData.getJSONObject("error");
                throw new ApiError(
                    error.getString("code"),
                    error.getString("message"),
                    error.has("details") ? error.get("details") : null
                );
            }
            
            return responseData;
        } catch (IOException e) {
            // Handle network errors
            throw new ApiError("network_error", "Network error occurred: " + e.getMessage(), null);
        } catch (InterruptedException e) {
            Thread.currentThread().interrupt();
            throw new ApiError("request_interrupted", "Request was interrupted", null);
        } catch (Exception e) {
            if (e instanceof ApiError) {
                throw e;
            }
            // Handle other errors
            throw new ApiError("unknown_error", "Unknown error: " + e.getMessage(), null);
        }
    }
}
`,
        },
      },
    ],
  },
];

export default function CodeSnippets() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLanguage, setSelectedLanguage] =
    useState<LanguageId>('javascript');
  const [copiedSnippet, setCopiedSnippet] = useState<string | null>(null);

  // Filter FAQs based on search query
  const filteredFaqs =
    searchQuery.trim() === ''
      ? faqs
      : faqs
          .map((category) => ({
            ...category,
            items: category.items.filter(
              (item) =>
                item.question
                  .toLowerCase()
                  .includes(searchQuery.toLowerCase()) ||
                item.answer.toLowerCase().includes(searchQuery.toLowerCase())
            ),
          }))
          .filter((category) => category.items.length > 0);

  const copyToClipboard = (text: string, snippetId: string) => {
    navigator.clipboard.writeText(text.trim());
    setCopiedSnippet(snippetId);
    setTimeout(() => setCopiedSnippet(null), 2000);
  };

  return (
    <div className="container mx-auto max-w-[85rem] px-4 py-24 md:px-6 lg:py-32 2xl:max-w-[1400px]">
      {/* Title */}
      <div className="mx-auto mb-10 max-w-2xl text-center lg:mb-14">
        <h2 className="text-2xl font-bold md:text-4xl md:leading-tight">
          Developer Documentation
        </h2>
        <p className="text-muted-foreground mt-4">
          Technical FAQ and code examples for developers
        </p>
      </div>
      {/* End Title */}

      {/* Search and Language Selection */}
      <div className="mx-auto mb-10 flex max-w-5xl flex-col gap-4 md:flex-row">
        {/* Search Input */}
        <div className="relative w-full md:w-[55%]">
          <Search className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />
          <Input
            placeholder="Search documentation..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Language Tabs (desktop) / Dropdown (mobile) */}
        <div className="w-full md:w-[45%]">
          {/* Tabs for larger screens */}
          <div className="hidden md:block">
            <Tabs
              value={selectedLanguage}
              onValueChange={(value) =>
                setSelectedLanguage(value as LanguageId)
              }
              className="w-full"
            >
              <TabsList className="grid w-full grid-cols-4">
                {languageTabs.map((tab) => (
                  <TabsTrigger key={tab.id} value={tab.id}>
                    {tab.label}
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>
          </div>

          {/* Dropdown for mobile */}
          <div className="md:hidden">
            <Select
              value={selectedLanguage}
              onValueChange={(value) =>
                setSelectedLanguage(value as LanguageId)
              }
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select language" />
              </SelectTrigger>
              <SelectContent>
                {languageTabs.map((tab) => (
                  <SelectItem key={tab.id} value={tab.id}>
                    {tab.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* FAQ Container */}
      <div className="mx-auto max-w-5xl">
        {filteredFaqs.length > 0 ? (
          filteredFaqs.map((category, categoryIndex) => (
            <div key={categoryIndex} className="py-8 first:pt-0 last:pb-0">
              <h3 className="mb-6 text-xl font-semibold">
                {category.category}
              </h3>

              <Accordion type="single" collapsible className="w-full">
                {category.items.map((item, itemIndex) => {
                  const snippetId = `${category.category}-${itemIndex}`;
                  const codeSnippet = item.examples[selectedLanguage] || '';
                  const isSnippetCopied = copiedSnippet === snippetId;

                  return (
                    <AccordionItem
                      key={itemIndex}
                      value={`${categoryIndex}-${itemIndex}`}
                      className="border-b"
                    >
                      <AccordionTrigger className="py-4 text-left hover:no-underline">
                        <span className="text-base font-medium">
                          {item.question}
                        </span>
                      </AccordionTrigger>
                      <AccordionContent className="pb-6">
                        <div className="text-muted-foreground mb-4">
                          {item.answer}
                        </div>

                        {/* Code Snippet */}
                        <div className="bg-muted overflow-hidden rounded-md">
                          <div className="bg-muted flex items-center justify-between border-b p-3">
                            <div className="font-mono text-sm">
                              Example (
                              {
                                languageTabs.find(
                                  (l) => l.id === selectedLanguage
                                )?.label
                              }
                              )
                            </div>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-8 gap-1 text-xs"
                              onClick={() =>
                                copyToClipboard(codeSnippet, snippetId)
                              }
                            >
                              {isSnippetCopied ? (
                                <>
                                  <Check className="h-3.5 w-3.5" />
                                  <span>Copied!</span>
                                </>
                              ) : (
                                <>
                                  <Copy className="h-3.5 w-3.5" />
                                  <span>Copy</span>
                                </>
                              )}
                            </Button>
                          </div>
                          <div className="overflow-x-auto p-4">
                            <pre className="text-foreground font-mono text-sm">
                              <code>{codeSnippet}</code>
                            </pre>
                          </div>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  );
                })}
              </Accordion>
            </div>
          ))
        ) : (
          <div className="py-16 text-center">
            <p className="text-muted-foreground">
              No results found for &quot;{searchQuery}&quot;. Try a different
              search term.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
