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
                    url: '/',
                    description: 'Current environment',
                },
                {
                    url: 'http://localhost:3000',
                    description: 'Local development server',
                },
                {
                    url: 'https://pulse-one-iota.vercel.com',
                    description: 'Production server',
                },
            ],
            tags: [
                {
                    name: 'pdp',
                    description: 'PDP API',
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
                    InvoiceSchema: {
                        type: 'object',
                        properties: {
                            description: { type: 'string' },
                            fields: {
                                type: 'object',
                                properties: {
                                    clientName: {
                                        type: 'object',
                                        properties: {
                                            type: { type: 'string' },
                                            required: { type: 'boolean' },
                                            description: { type: 'string' }
                                        }
                                    },
                                    products: {
                                        type: 'object',
                                        properties: {
                                            type: { type: 'string' },
                                            required: { type: 'boolean' },
                                            description: { type: 'string' },
                                            items: {
                                                type: 'object',
                                                properties: {
                                                    quantity: {
                                                        type: 'object',
                                                        properties: {
                                                            type: { type: 'string' },
                                                            required: { type: 'boolean' },
                                                            description: { type: 'string' }
                                                        }
                                                    },
                                                    description: {
                                                        type: 'object',
                                                        properties: {
                                                            type: { type: 'string' },
                                                            required: { type: 'boolean' },
                                                            description: { type: 'string' }
                                                        }
                                                    },
                                                    price: {
                                                        type: 'object',
                                                        properties: {
                                                            type: { type: 'string' },
                                                            required: { type: 'boolean' },
                                                            description: { type: 'string' }
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    },
                                    notes: {
                                        type: 'object',
                                        properties: {
                                            type: { type: 'string' },
                                            required: { type: 'boolean' },
                                            description: { type: 'string' }
                                        }
                                    },
                                    paymentMethod: {
                                        type: 'object',
                                        properties: {
                                            type: { type: 'string' },
                                            required: { type: 'boolean' },
                                            description: { type: 'string' },
                                            options: {
                                                type: 'array',
                                                items: { type: 'string' }
                                            }
                                        }
                                    }
                                }
                            },
                            xmlTemplate: { type: 'string' }
                        },
                        description: 'Schema defining constraints and template for creating invoices'
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
                                }
                            },
                            contact: {
                                type: 'object',
                                properties: {
                                    email: { type: 'string' },
                                    phone: { type: 'string' },
                                    website: { type: 'string' },
                                }
                            },
                            bankInfo: {
                                type: 'object',
                                properties: {
                                    accountName: { type: 'string' },
                                    iban: { type: 'string' },
                                    bic: { type: 'string' },
                                    bankName: { type: 'string' },
                                }
                            },
                            invoiceTerms: {
                                type: 'object',
                                properties: {
                                    paymentTerms: { type: 'string' },
                                    currency: { type: 'string' },
                                }
                            },
                            logo: { type: 'string' },
                        },
                        description: 'Company information used for invoice creation'
                    },
                },
            },
        },
    });
    return spec;
}; 