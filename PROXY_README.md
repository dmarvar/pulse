# Pulse Proxy Configuration

This proxy route (`/api/pulse`) forwards all HTTP requests to a configurable target endpoint while adding custom headers.

## Configuration

### Environment Variables

Set the following environment variable in your `.env.local` file:

```bash
PROXY_TARGET_URL=https://your-target-api.com
```

### Examples

```bash
# For JSONPlaceholder API
PROXY_TARGET_URL=https://jsonplaceholder.typicode.com

# For GitHub API
PROXY_TARGET_URL=https://api.github.com

# For local development
PROXY_TARGET_URL=http://localhost:3001
```

## Usage

### Basic Usage

All requests to `/api/pulse/*` will be forwarded to your target URL:

```bash
# GET request
curl http://localhost:3000/api/pulse/chat
# Forwards to: http://localhost:5000/chat

# POST request with data
curl -X POST http://localhost:3000/api/pulse/users \
  -H "Content-Type: application/json" \
  -d '{"name": "John", "email": "john@example.com"}'
# Forwards to: http://localhost:5000/users

# GET with query parameters
curl http://localhost:3000/api/pulse/search?q=test&limit=10
# Forwards to: http://localhost:5000/search?q=test&limit=10
```

### Custom Headers Added

The proxy automatically adds these headers to all forwarded requests:

- `X-Proxy-Source: pulse-proxy`
- `X-Forwarded-By: next-proxy`
- `X-Forwarded-For: [client-ip]`
- `X-Forwarded-Host: [original-host]`
- `X-Forwarded-Proto: [protocol]`

### Supported HTTP Methods

- GET
- POST
- PUT
- DELETE
- PATCH
- HEAD
- OPTIONS (handles CORS preflight)

## Customization

### Adding Custom Headers

Edit the `customHeaders` object in `src/app/api/pulse/[...path]/route.ts`:

```typescript
customHeaders: {
  'X-Proxy-Source': 'pulse-proxy',
  'X-Forwarded-By': 'next-proxy',
  'Authorization': 'Bearer your-token', // Add API keys
  'X-Custom-Header': 'your-value',     // Add custom headers
},
```

### Removing Headers

Add headers to the `headersToRemove` array to prevent them from being forwarded:

```typescript
headersToRemove: [
  'host',
  'connection',
  'your-sensitive-header', // Add headers to remove
]
```

## Error Handling

The proxy includes comprehensive error handling:

- Network errors return a 500 status with error details
- Original response status codes are preserved
- CORS headers are automatically added
- Request/response bodies are properly handled

## Security Considerations

- The proxy removes potentially problematic headers
- CORS is configured to allow all origins (adjust as needed)
- Consider adding authentication/authorization if needed
- Monitor proxy usage to prevent abuse 