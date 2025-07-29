import { NextRequest, NextResponse } from 'next/server';

// Client type definition
type Client = {
    id: string;
    companyName: string;
    contactName: string;
    contactTitle: string;
    address: string;
    city: string;
    region: string;
    postalCode: string;
    country: string;
    phone: string;
    email: string;
    taxId: string;
    accountNumber: string;
    creditLimit: number;
    notes: string;
    createdAt: string;
    updatedAt: string;
};

// Generate fake client data
const generateClients = (): Client[] => {
    const clients: Client[] = [];

    // Add Microsoft and Apple as clients
    clients.push({
        id: '1',
        companyName: 'Microsoft Corporation',
        contactName: 'Satya Nadella',
        contactTitle: 'CEO',
        address: 'One Microsoft Way',
        city: 'Redmond',
        region: 'Washington',
        postalCode: '98052',
        country: 'USA',
        phone: '+1-425-882-8080',
        email: 'info@microsoft.com',
        taxId: 'MS12345678',
        accountNumber: 'MSFT-001',
        creditLimit: 1000000,
        notes: 'Premier technology company specializing in software and cloud services.',
        createdAt: new Date(2020, 0, 1).toISOString(),
        updatedAt: new Date().toISOString(),
    });

    clients.push({
        id: '2',
        companyName: 'Microsoft Corporation LLC',
        contactName: 'John Smith',
        contactTitle: 'CEO',
        address: '123 Business Center Drive',
        city: 'Seattle',
        region: 'Washington',
        postalCode: '98101',
        country: 'USA',
        phone: '+1-206-555-0123',
        email: 'contact@microsoftcorp-llc.com',
        taxId: 'MSCLLC98765',
        accountNumber: 'MSCLLC-002',
        creditLimit: 750000,
        notes: 'Microsoft Corporation LLC - A separate legal entity focused on enterprise solutions.',
        createdAt: new Date(2021, 3, 15).toISOString(),
        updatedAt: new Date().toISOString(),
    });

    clients.push({
        id: '3',
        companyName: 'Apple Inc.',
        contactName: 'Tim Cook',
        contactTitle: 'CEO',
        address: 'One Apple Park Way',
        city: 'Cupertino',
        region: 'California',
        postalCode: '95014',
        country: 'USA',
        phone: '+1-408-996-1010',
        email: 'info@apple.com',
        taxId: 'AP87654321',
        accountNumber: 'AAPL-001',
        creditLimit: 1000000,
        notes: 'Innovative technology company known for hardware and software products.',
        createdAt: new Date(2020, 0, 1).toISOString(),
        updatedAt: new Date().toISOString(),
    });

    clients.push({
        id: '4',
        companyName: 'ASSOCIATION LE BONHEUR D\'UN SOURIRE ROUGE',
        contactName: 'Marie Dubois',
        contactTitle: 'Présidente',
        address: '15 Rue de la Joie',
        city: 'Paris',
        region: 'Île-de-France',
        postalCode: '75001',
        country: 'France',
        phone: '+33-1-42-97-48-16',
        email: 'contact@bonheursourire-rouge.fr',
        taxId: 'FR12345678901',
        accountNumber: 'BSR-001',
        creditLimit: 250000,
        notes: 'Association caritative française dédiée aux enfants défavorisés. Projets éducatifs et sociaux.',
        createdAt: new Date(2021, 5, 15).toISOString(),
        updatedAt: new Date().toISOString(),
    });

    clients.push({
        id: '5',
        companyName: 'ASSOCIATION LE BONHEUR D\'UN SOURIRE BLUE',
        contactName: 'Jean-Pierre Martin',
        contactTitle: 'Directeur Général',
        address: '28 Avenue des Arts',
        city: 'Lyon',
        region: 'Auvergne-Rhône-Alpes',
        postalCode: '69001',
        country: 'France',
        phone: '+33-4-78-28-35-42',
        email: 'info@bonheursourire-blue.fr',
        taxId: 'FR98765432109',
        accountNumber: 'BSB-001',
        creditLimit: 300000,
        notes: 'Association à but non lucratif spécialisée dans l\'aide aux personnes âgées et l\'accompagnement social.',
        createdAt: new Date(2022, 2, 10).toISOString(),
        updatedAt: new Date().toISOString(),
    });

    // Generate 95 more fake clients
    for (let i = 6; i <= 100; i++) {
        const randomMonth = Math.floor(Math.random() * 12);
        const randomDay = Math.floor(Math.random() * 28) + 1;
        const randomYear = 2020 + Math.floor(Math.random() * 4);

        clients.push({
            id: i.toString(),
            companyName: `Company ${i}`,
            contactName: `Contact ${i}`,
            contactTitle: ['CEO', 'CTO', 'CFO', 'COO', 'Manager'][Math.floor(Math.random() * 5)],
            address: `${Math.floor(Math.random() * 9999) + 1} Main St`,
            city: ['New York', 'Los Angeles', 'Chicago', 'Houston', 'Phoenix', 'Philadelphia', 'San Antonio', 'San Diego', 'Dallas', 'San Jose'][Math.floor(Math.random() * 10)],
            region: ['California', 'Texas', 'Florida', 'New York', 'Pennsylvania', 'Illinois', 'Ohio', 'Georgia', 'North Carolina', 'Michigan'][Math.floor(Math.random() * 10)],
            postalCode: `${Math.floor(Math.random() * 90000) + 10000}`,
            country: 'USA',
            phone: `+1-${Math.floor(Math.random() * 900) + 100}-${Math.floor(Math.random() * 900) + 100}-${Math.floor(Math.random() * 9000) + 1000}`,
            email: `contact${i}@company${i}.com`,
            taxId: `TX${Math.floor(Math.random() * 90000000) + 10000000}`,
            accountNumber: `ACC-${Math.floor(Math.random() * 900000) + 100000}`,
            creditLimit: Math.floor(Math.random() * 500000) + 50000,
            notes: `Client ${i} information and details.`,
            createdAt: new Date(randomYear, randomMonth, randomDay).toISOString(),
            updatedAt: new Date().toISOString(),
        });
    }

    return clients;
};

// Create clients data once (would be persisted across requests in production)
const clients = generateClients();

/**
 * @swagger
 * /api/pdp/clients:
 *   get:
 *     tags:
 *       - pdp
 *     summary: Get a list of clients
 *     description: Retrieves a paginated list of clients with optional search functionality
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Page number for pagination
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 25
 *         description: Number of records per page
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         description: Search term to filter clients by company name, contact name, or email
 *     responses:
 *       200:
 *         description: Successful operation
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/PaginatedResponse'
 *       500:
 *         description: Server error
 */
export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url);

    // Get pagination parameters
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '25');

    // Get search query
    const search = searchParams.get('search') || '';

    // Filter clients based on search query
    let filteredClients = clients;
    if (search) {
        const searchLower = search.toLowerCase();
        filteredClients = clients.filter(
            client =>
                client.companyName.toLowerCase().includes(searchLower) ||
                client.contactName.toLowerCase().includes(searchLower) ||
                client.email.toLowerCase().includes(searchLower)
        );
    }

    // Calculate pagination
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    // Prepare pagination metadata
    const pagination = {
        total: filteredClients.length,
        page,
        limit,
        totalPages: Math.ceil(filteredClients.length / limit),
        hasNextPage: endIndex < filteredClients.length,
        hasPrevPage: page > 1
    };

    // Return paginated results
    return NextResponse.json({
        status: 'success',
        pagination,
        data: filteredClients.slice(startIndex, endIndex)
    });
} 