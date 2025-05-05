import { createSwaggerSpec } from 'next-swagger-doc';

export const getApiDocs = () => {
    const spec = createSwaggerSpec({
        apiFolder: 'src/app/api',
        definition: {
            openapi: '3.0.0',
            info: {
                title: 'Pulse API Documentation',
                version: '1.0.0',
                description: 'API documentation for the Pulse application',
            },
            servers: [
                {
                    url: 'http://localhost:3000',
                    description: 'Local server',
                },
                {
                    url: 'https://pulse-one-iota.vercel.com',
                    description: 'Production server',
                },
            ],
            tags: [
                {
                    name: 'clients',
                    description: 'Clients API',
                },
            ],
            components: {
                schemas: {
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
                    PaginatedResponse: {
                        type: 'object',
                        properties: {
                            status: { type: 'string' },
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
                },
            },
        },
    });
    return spec;
}; 