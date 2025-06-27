import { NextRequest, NextResponse } from 'next/server';
// import { auth } from '@/auth';
// import { prisma } from '@/lib/prisma';

// Configuration for the proxy
const PROXY_CONFIG = {
  // Target endpoint to proxy requests to
  targetUrl: process.env.PROXY_TARGET_URL || 'http://localhost:8000',
  // targetUrl: process.env.PROXY_TARGET_URL || 'https://pulseos-inte.cegid.cloud/execution/api/v1',
  
  // Custom headers to add to proxied requests
  customHeaders: {
    'X-Proxy-Source': 'pulse-proxy',
    'X-Forwarded-By': 'next-proxy',
    // Add any other custom headers you need
  },
  
  // Optional: Headers to remove from the original request
  headersToRemove: [
    'host',
    'connection',
    'upgrade',
    'proxy-connection',
    'proxy-authenticate',
    'te',
    'trailers',
    'transfer-encoding'
  ]
};

// Generic handler function for all HTTP methods
async function handleProxyRequest(request: NextRequest, { params }: { params: Promise<{ path: string[] }> }) {
  try {
    // Check authentication first
    // const session = await auth();
    
    // if (!session?.user?.id) {
    //   return NextResponse.json(
    //     { 
    //       error: 'Authentication required',
    //       message: 'You must be signed in to access this endpoint',
    //       timestamp: new Date().toISOString()
    //     },
    //     { status: 401 }
    //   );
    // }

    // Get the user's access token from the database
    // const account = await prisma.account.findFirst({
    //   where: {
    //     userId: session.user.id,
    //     provider: 'myoauth', // Match the provider ID from auth.ts
    //   },
    //   select: {
    //     access_token: true,
    //   },
    // });

    // let accessToken = account?.access_token;
    // if (!accessToken) {
    //   console.warn(`No access token found for user ${session.user.id}, using fake token`);
    //   accessToken = 'fake-access-token-for-development';
    // }

    const { method, url } = request;
    const requestUrl = new URL(url);
    
    // Await params as required by Next.js 15+
    const resolvedParams = await params;
    
    // Extract the path from the catch-all route params
    const subPath = resolvedParams.path ? resolvedParams.path.join('/') : '';
    
    // Add query parameters if they exist
    const queryString = requestUrl.search;
    
    // Construct the target URL
    const targetUrl = `${PROXY_CONFIG.targetUrl}/${subPath}${queryString}`;
    
    // console.log(`Proxying ${method} ${requestUrl.pathname} -> ${targetUrl} for user ${session.user.id}`);
    
    // Prepare headers for the proxied request
    const proxyHeaders = new Headers();
    
    // Copy original headers (excluding those we want to remove)
    request.headers.forEach((value, key) => {
      if (!PROXY_CONFIG.headersToRemove.includes(key.toLowerCase())) {
        proxyHeaders.set(key, value);
      }
    });

    // console.log(accessToken);

    // Add the user's access token as Authorization header
    // proxyHeaders.set('Authorization', `Bearer ${accessToken}`);
    
    // Add custom headers
    Object.entries(PROXY_CONFIG.customHeaders).forEach(([key, value]) => {
      proxyHeaders.set(key, value);
    });
    
    // Add forwarded headers for transparency
    const forwardedFor = request.headers.get('x-forwarded-for') || 
                        request.headers.get('x-real-ip') || 
                        'unknown';
    proxyHeaders.set('X-Forwarded-For', forwardedFor);
    proxyHeaders.set('X-Forwarded-Host', requestUrl.host);
    proxyHeaders.set('X-Forwarded-Proto', requestUrl.protocol.slice(0, -1));
    // proxyHeaders.set('X-Forwarded-User', session.user.id);
    
    // Prepare the request body for methods that support it
    let body: BodyInit | null = null;
    if (['POST', 'PUT', 'PATCH', 'DELETE'].includes(method)) {
      try {
        body = await request.blob();
      } catch (error) {
        console.warn('Failed to read request body:', error);
      }
    }
    
    // Make the proxied request
    const proxyResponse = await fetch(targetUrl, {
      method,
      headers: proxyHeaders,
      body,
      // Don't follow redirects automatically - let the client handle them
      redirect: 'manual',
    });
    
    // Prepare response headers
    const responseHeaders = new Headers();
    
    // Copy response headers from the target
    proxyResponse.headers.forEach((value, key) => {
      // Skip headers that might cause issues
      if (!['content-encoding', 'content-length', 'transfer-encoding'].includes(key.toLowerCase())) {
        responseHeaders.set(key, value);
      }
    });
    
    // Add CORS headers if needed
    responseHeaders.set('Access-Control-Allow-Origin', '*');
    responseHeaders.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    responseHeaders.set('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With');
    
    // Get the response body
    const responseBody = await proxyResponse.arrayBuffer();
    
    // Return the proxied response
    return new NextResponse(responseBody, {
      status: proxyResponse.status,
      statusText: proxyResponse.statusText,
      headers: responseHeaders,
    });
    
  } catch (error) {
    console.error('Proxy error:', error);
    
    return NextResponse.json(
      { 
        error: 'Proxy request failed',
        message: error instanceof Error ? error.message : 'Unknown error',
        timestamp: new Date().toISOString(),
        targetUrl: PROXY_CONFIG.targetUrl
      },
      { status: 500 }
    );
  }
}

// Export handlers for all HTTP methods
export async function GET(request: NextRequest, context: { params: Promise<{ path: string[] }> }) {
  return handleProxyRequest(request, context);
}

export async function POST(request: NextRequest, context: { params: Promise<{ path: string[] }> }) {
  return handleProxyRequest(request, context);
}

export async function PUT(request: NextRequest, context: { params: Promise<{ path: string[] }> }) {
  return handleProxyRequest(request, context);
}

export async function DELETE(request: NextRequest, context: { params: Promise<{ path: string[] }> }) {
  return handleProxyRequest(request, context);
}

export async function PATCH(request: NextRequest, context: { params: Promise<{ path: string[] }> }) {
  return handleProxyRequest(request, context);
}

export async function HEAD(request: NextRequest, context: { params: Promise<{ path: string[] }> }) {
  return handleProxyRequest(request, context);
}

export async function OPTIONS(request: NextRequest, context: { params: Promise<{ path: string[] }> }) {
  // Handle preflight CORS requests - these don't require authentication
  // but should include user authentication headers in allowed headers
  
  // Log the OPTIONS request for debugging
  const resolvedParams = await context.params;
  const subPath = resolvedParams.path ? resolvedParams.path.join('/') : '';
  console.log('CORS preflight request for path:', subPath, 'from:', request.headers.get('origin'));
  
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS, HEAD',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Requested-With, X-Proxy-Source, Cookie',
      'Access-Control-Allow-Credentials': 'true',
      'Access-Control-Max-Age': '86400',
    },
  });
} 