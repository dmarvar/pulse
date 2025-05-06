import { NextResponse } from 'next/server';

// Cegid company information
const cegidCompanyInfo = {
    companyName: "Cegid Group SA",
    legalName: "Cegid Group",
    taxId: "FR32327400289",
    vatNumber: "FR32327400289",
    registrationNumber: "327 400 289 RCS Lyon",
    address: {
        street: "52 Quai Paul Sédallian",
        city: "Lyon",
        postalCode: "69009",
        country: "France",
    },
    contact: {
        email: "contact@cegid.com",
        phone: "+33 4 26 29 50 00",
        website: "www.cegid.com",
    },
    bankInfo: {
        accountName: "Cegid Group SA",
        iban: "FR76 3000 1000 1234 5678 9012 345",
        bic: "BNPAFRPP",
        bankName: "BNP Paribas",
    },
    invoiceTerms: {
        paymentTerms: "30 days",
        currency: "EUR",
    },
    logo: "https://www.cegid.com/wp-content/themes/cegid/assets/images/logo-cegid.svg",
};

/**
 * @swagger
 * /api/pdp/provider:
 *   get:
 *     tags:
 *       - pdp
 *     summary: Get Cegid company information
 *     description: Retrieves Cegid company information for invoice creation
 *     responses:
 *       200:
 *         description: Successful operation
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ProviderInfo'
 */
export async function GET() {
    return NextResponse.json(cegidCompanyInfo);
}
