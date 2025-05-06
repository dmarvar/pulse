import { NextRequest, NextResponse } from 'next/server';

const invoiceSchema = {
    "description": "This schema describes the required and optional fields for creating an invoice. Use this structure to build a valid invoice payload.",
    "fields": {
        "providerName": {
            "type": "string",
            "required": true,
            "description": "Full name or registered company name of the provider issuing the invoice."
        },
        "clientName": {
            "type": "string",
            "required": true,
            "description": "Full name or registered company name of the client."
        },
        "products": {
            "type": "array",
            "required": true,
            "description": "List of products or services being invoiced.",
            "items": {
                "quantity": {
                    "type": "number",
                    "required": true,
                    "description": "Number of units for the product or service."
                },
                "description": {
                    "type": "string",
                    "required": true,
                    "description": "Brief description of the product or service."
                },
                "price": {
                    "type": "number",
                    "required": true,
                    "description": "Unit price of the product or service."
                }
            }
        },
        "notes": {
            "type": "string",
            "required": false,
            "description": "Additional notes or comments about the invoice."
        },
        "paymentMethod": {
            "type": "string",
            "required": false,
            "description": "Method of payment. One of the following options.",
            "options": [
                "cash",
                "credit_card",
                "bank_transfer",
                "paypal",
                "other"
            ]
        }
    },
    "xmlTemplate": "<invoice>\n  <providerName>{{providerName}}</providerName>\n  <clientName>{{clientName}}</clientName>\n  <products>\n    {{#each products}}\n    <product>\n      <quantity>{{quantity}}</quantity>\n      <description>{{description}}</description>\n      <price>{{price}}</price>\n    </product>\n    {{/each}}\n  </products>\n  {{#if notes}}\n  <notes>{{notes}}</notes>\n  {{/if}}\n  {{#if paymentMethod}}\n  <paymentMethod>{{paymentMethod}}</paymentMethod>\n  {{/if}}\n</invoice>"
}

/**
 * @swagger
 * /api/pdp/invoice-schema:
 *   get:
 *     tags:
 *       - pdp
 *     summary: Get invoice schema
 *     description: Retrieves the schema definition for creating invoices, including field constraints and XML template structure
 *     responses:
 *       200:
 *         description: Successful operation
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/InvoiceSchema'
 */
export async function GET(request: NextRequest) {
    return NextResponse.json(invoiceSchema);
}
