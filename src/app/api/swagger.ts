// Manual Swagger specification to avoid next-swagger-doc compatibility issues
export const getApiDocs = () => {
    return {
        openapi: '3.0.0',
        info: {
            title: 'PulseOS Integration Team API Documentation',
            version: '1.0.0',
            description: 'API documentation for demostration purposes for the PulseOS Integration Team',
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
            '/api/pdp/clients': {
                get: {
                    tags: ['pdp'],
                    summary: 'Get a list of clients',
                    description: 'Retrieves a paginated list of clients with optional search functionality',
                    parameters: [
                        {
                            name: 'page',
                            in: 'query',
                            schema: { type: 'integer', default: 1 },
                            description: 'Page number for pagination',
                        },
                        {
                            name: 'limit',
                            in: 'query',
                            schema: { type: 'integer', default: 25 },
                            description: 'Number of records per page',
                        },
                        {
                            name: 'search',
                            in: 'query',
                            schema: { type: 'string' },
                            description: 'Search term to filter clients by company name, contact name, or email',
                        },
                    ],
                    responses: {
                        '200': {
                            description: 'Successful operation',
                            content: {
                                'application/json': {
                                    schema: {
                                        $ref: '#/components/schemas/PaginatedClientsResponse',
                                    },
                                },
                            },
                        },
                        '500': {
                            description: 'Server error',
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
            '/api/pdp/invoice-schema': {
                get: {
                    tags: ['pdp'],
                    summary: 'Get invoice schema',
                    description: 'Retrieves the schema definition for creating invoices, including field constraints and XML template structure',
                    responses: {
                        '200': {
                            description: 'Successful operation',
                            content: {
                                'application/json': {
                                    schema: {
                                        $ref: '#/components/schemas/InvoiceSchema',
                                    },
                                },
                            },
                        },
                    },
                },
            },
            '/api/pdp/provider': {
                get: {
                    tags: ['pdp'],
                    summary: 'Get Cegid company information',
                    description: 'Retrieves Cegid company information for invoice creation',
                    responses: {
                        '200': {
                            description: 'Successful operation',
                            content: {
                                'application/json': {
                                    schema: {
                                        $ref: '#/components/schemas/ProviderInfo',
                                    },
                                },
                            },
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
                Client: {
                    type: 'object',
                    properties: {
                        id: { type: 'string' },
                        companyName: { type: 'string' },
                        contactName: { type: 'string' },
                        contactTitle: { type: 'string' },
                        address: { type: 'string' },
                        city: { type: 'string' },
                        region: { type: 'string' },
                        postalCode: { type: 'string' },
                        country: { type: 'string' },
                        phone: { type: 'string' },
                        email: { type: 'string' },
                        taxId: { type: 'string' },
                        accountNumber: { type: 'string' },
                        creditLimit: { type: 'number' },
                        notes: { type: 'string' },
                        createdAt: { type: 'string', format: 'date-time' },
                        updatedAt: { type: 'string', format: 'date-time' },
                    },
                },
                PaginatedClientsResponse: {
                    type: 'object',
                    properties: {
                        status: { type: 'string', example: 'success' },
                        pagination: {
                            type: 'object',
                            properties: {
                                total: { type: 'integer' },
                                page: { type: 'integer' },
                                limit: { type: 'integer' },
                                totalPages: { type: 'integer' },
                                hasNextPage: { type: 'boolean' },
                                hasPrevPage: { type: 'boolean' },
                            },
                        },
                        data: {
                            type: 'array',
                            items: { $ref: '#/components/schemas/Client' },
                        },
                    },
                },
                InvoiceSchema: {
                    type: 'object',
                    properties: {
                        description: { type: 'string' },
                        fields: {
                            type: 'object',
                            properties: {
                                providerName: {
                                    type: 'object',
                                    properties: {
                                        type: { type: 'string' },
                                        required: { type: 'boolean' },
                                        description: { type: 'string' },
                                    },
                                },
                                clientName: {
                                    type: 'object',
                                    properties: {
                                        type: { type: 'string' },
                                        required: { type: 'boolean' },
                                        description: { type: 'string' },
                                    },
                                },
                                products: {
                                    type: 'object',
                                    properties: {
                                        type: { type: 'string' },
                                        required: { type: 'boolean' },
                                        description: { type: 'string' },
                                        items: { type: 'object' },
                                    },
                                },
                                notes: {
                                    type: 'object',
                                    properties: {
                                        type: { type: 'string' },
                                        required: { type: 'boolean' },
                                        description: { type: 'string' },
                                    },
                                },
                                paymentMethod: {
                                    type: 'object',
                                    properties: {
                                        type: { type: 'string' },
                                        required: { type: 'boolean' },
                                        description: { type: 'string' },
                                        options: {
                                            type: 'array',
                                            items: { type: 'string' },
                                        },
                                    },
                                },
                            },
                        },
                        xmlTemplate: { type: 'string' },
                    },
                },
                ProviderInfo: {
                    type: 'object',
                    properties: {
                        companyName: { type: 'string' },
                        legalName: { type: 'string' },
                        taxId: { type: 'string' },
                        vatNumber: { type: 'string' },
                        registrationNumber: { type: 'string' },
                        address: {
                            type: 'object',
                            properties: {
                                street: { type: 'string' },
                                city: { type: 'string' },
                                postalCode: { type: 'string' },
                                country: { type: 'string' },
                            },
                        },
                        contact: {
                            type: 'object',
                            properties: {
                                email: { type: 'string' },
                                phone: { type: 'string' },
                                website: { type: 'string' },
                            },
                        },
                        bankInfo: {
                            type: 'object',
                            properties: {
                                accountName: { type: 'string' },
                                iban: { type: 'string' },
                                bic: { type: 'string' },
                                bankName: { type: 'string' },
                            },
                        },
                        invoiceTerms: {
                            type: 'object',
                            properties: {
                                paymentTerms: { type: 'string' },
                                currency: { type: 'string' },
                            },
                        },
                        logo: { type: 'string' },
                    },
                },
            },
        },
    };
}; 