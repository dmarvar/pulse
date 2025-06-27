// Manual Swagger specification to avoid next-swagger-doc compatibility issues
export const getApiDocs = () => {
    return {
        openapi: '3.0.0',
        info: {
            title: 'Pulse API Documentation',
            version: '1.0.0',
            description: 'API documentation for the Pulse application',
        },
        servers: [
            {
                url: '/',
                description: 'Current environment',
            },
            {
                url: 'http://localhost:8990',
                description: 'Local development server',
            },
            {
                url: 'https://pulse-one-iota.vercel.app',
                description: 'Production server',
            },
        ],
        tags: [
            {
                name: 'auth',
                description: 'Authentication endpoints',
            },
            {
                name: 'pdp',
                description: 'PDP API endpoints',
            },
            {
                name: 'proxy',
                description: 'Pulse proxy endpoints',
            },
        ],
        paths: {
            '/api/auth/signin': {
                get: {
                    tags: ['auth'],
                    summary: 'Sign in with OAuth',
                    description: 'Redirects to OAuth provider for authentication',
                    responses: {
                        '302': {
                            description: 'Redirect to OAuth provider',
                        },
                    },
                },
            },
            '/api/auth/session': {
                get: {
                    tags: ['auth'],
                    summary: 'Get current session',
                    description: 'Returns current user session information',
                    responses: {
                        '200': {
                            description: 'Session information',
                            content: {
                                'application/json': {
                                    schema: {
                                        type: 'object',
                                        properties: {
                                            authenticated: { type: 'boolean' },
                                            user: {
                                                type: 'object',
                                                properties: {
                                                    id: { type: 'string' },
                                                },
                                            },
                                        },
                                    },
                                },
                            },
                        },
                        '401': {
                            description: 'Not authenticated',
                        },
                    },
                },
            },
            '/api/pdp/invoice': {
                post: {
                    tags: ['pdp'],
                    summary: 'Generate PDF from XML invoice',
                    description: 'Receives JSON with XML invoice schema and returns a PDF document',
                    requestBody: {
                        required: true,
                        content: {
                            'application/json': {
                                schema: {
                                    type: 'object',
                                    required: ['schema'],
                                    properties: {
                                        schema: {
                                            type: 'string',
                                            description: 'XML invoice schema',
                                        },
                                    },
                                },
                                example: {
                                    schema: '<invoice><providerName>Tech Solutions S.A.S.</providerName><clientName>Inversiones El Roble Ltda.</clientName></invoice>',
                                },
                            },
                        },
                    },
                    responses: {
                        '200': {
                            description: 'PDF generated successfully',
                            content: {
                                'application/pdf': {
                                    schema: {
                                        type: 'string',
                                        format: 'binary',
                                    },
                                },
                            },
                        },
                        '400': {
                            description: 'Bad request - Invalid XML format',
                        },
                    },
                },
            },
            '/api/pulse/{path}': {
                get: {
                    tags: ['proxy'],
                    summary: 'Proxy requests to PulseOS',
                    description: 'Proxies requests to PulseOS with authentication',
                    parameters: [
                        {
                            name: 'path',
                            in: 'path',
                            required: true,
                            schema: { type: 'string' },
                            description: 'Path to proxy to PulseOS',
                        },
                    ],
                    responses: {
                        '200': {
                            description: 'Proxied response from PulseOS',
                        },
                        '401': {
                            description: 'Authentication required',
                        },
                    },
                },
                post: {
                    tags: ['proxy'],
                    summary: 'Proxy POST requests to PulseOS',
                    description: 'Proxies POST requests to PulseOS with authentication',
                    parameters: [
                        {
                            name: 'path',
                            in: 'path',
                            required: true,
                            schema: { type: 'string' },
                            description: 'Path to proxy to PulseOS',
                        },
                    ],
                    responses: {
                        '200': {
                            description: 'Proxied response from PulseOS',
                        },
                        '401': {
                            description: 'Authentication required',
                        },
                    },
                },
            },
        },
        components: {
            schemas: {
                Error: {
                    type: 'object',
                    properties: {
                        error: { type: 'string' },
                        message: { type: 'string' },
                        timestamp: { type: 'string' },
                    },
                },
            },
        },
    };
}; 