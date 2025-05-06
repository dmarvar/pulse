import { NextRequest, NextResponse } from 'next/server';
import { parseStringPromise } from 'xml2js';
import { jsPDF } from 'jspdf';

/**
 * @swagger
 * /api/pdp/invoice:
 *   post:
 *     tags:
 *       - pdp
 *     summary: Generate PDF from XML invoice
 *     description: Receives JSON with XML invoice schema and returns a PDF document. When sending XML inside JSON, ensure all newlines are properly escaped (\\n).
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - schema
 *             properties:
 *               schema:
 *                 type: string
 *                 description: XML invoice schema. In JSON requests, newlines must be escaped as \\n. The API will attempt to handle unescaped newlines, but proper escaping is recommended.
 *           example:
 *             schema: "<invoice>\n  <providerName>Tech Solutions S.A.S.</providerName>\n  <clientName>Inversiones El Roble Ltda.</clientName>\n  <products>\n    <product>\n      <quantity>2</quantity>\n      <description>Licencia Software ERP</description>\n      <price>1500000</price>\n    </product>\n    <product>\n      <quantity>1</quantity>\n      <description>Consultoría técnica mensual</description>\n      <price>800000</price>\n    </product>\n  </products>\n  <notes>Factura correspondiente a servicios prestados en abril.</notes>\n  <paymentMethod>Transferencia Bancaria</paymentMethod>\n</invoice>"
 *     responses:
 *       200:
 *         description: Successful operation
 *         content:
 *           application/pdf:
 *             schema:
 *               type: string
 *               format: binary
 *       400:
 *         description: Bad request - Invalid XML format or missing schema
 *       500:
 *         description: Internal server error
 */
export async function POST(request: NextRequest) {
    try {
        // Get the request body as text first (can only read the body once)
        const bodyText = await request.text();
        let xmlContent;

        // Log request information for debugging
        console.log('Request Content-Type:', request.headers.get('content-type'));
        console.log('Request body prefix:', bodyText.substring(0, 100)); // Log first 100 chars

        // Try parsing as direct JSON first
        if (bodyText.trim().startsWith('{')) {
            try {
                // Simple parse for valid JSON
                const jsonData = JSON.parse(bodyText);
                if (jsonData.schema) {
                    xmlContent = jsonData.schema;
                    console.log('Successfully parsed as JSON with schema');
                } else {
                    return NextResponse.json(
                        { error: "Missing schema field in JSON" },
                        { status: 400 }
                    );
                }
            } catch (jsonError: unknown) {
                if (jsonError instanceof Error) {
                    console.log('JSON parse error:', jsonError.message);
                }
                // Try with newline replacements
                try {
                    const cleanedText = bodyText.replace(/\n/g, '\\n').replace(/\r/g, '\\r');
                    const parsedBody = JSON.parse(cleanedText);
                    if (parsedBody.schema) {
                        xmlContent = parsedBody.schema;
                        console.log('Successfully parsed JSON after newline replacements');
                    } else {
                        return NextResponse.json(
                            { error: "Missing schema field in JSON" },
                            { status: 400 }
                        );
                    }
                } catch (error: unknown) {
                    if (error instanceof Error) {
                        console.log('Failed to parse even with newline replacements:', error.message);
                    }
                    return NextResponse.json(
                        {
                            error: "Invalid JSON format",
                            details: "Your JSON contains syntax errors"
                        },
                        { status: 400 }
                    );
                }
            }
        }
        // Try as XML if it looks like XML
        else if (bodyText.trim().startsWith('<')) {
            console.log('Treating as direct XML content');
            xmlContent = bodyText;
        }
        // Not recognized format
        else {
            console.log('Unrecognized content format');
            return NextResponse.json(
                {
                    error: "Invalid request format",
                    details: "Body must be JSON with a schema field or direct XML",
                    received: bodyText.substring(0, 50) + "..." // Show part of what was received
                },
                { status: 400 }
            );
        }

        if (!xmlContent) {
            return NextResponse.json(
                { error: "XML schema is required in the request body" },
                { status: 400 }
            );
        }

        // Parse the XML to JSON
        console.log('Attempting to parse XML, first 50 chars:', xmlContent.substring(0, 50));
        const result = await parseStringPromise(xmlContent, { explicitArray: false });

        if (!result.invoice) {
            return NextResponse.json(
                { error: "Invalid invoice XML format" },
                { status: 400 }
            );
        }

        const invoice = result.invoice;

        // Create a new PDF document
        const doc = new jsPDF();

        // Add content to the PDF
        // Header
        doc.setFontSize(20);
        doc.text("INVOICE", 105, 20, { align: "center" });

        // Provider and Client info
        doc.setFontSize(12);
        doc.text(`Provider: ${invoice.providerName}`, 20, 40);
        doc.text(`Client: ${invoice.clientName}`, 20, 50);

        // Products table
        doc.setFontSize(10);
        doc.text("Products:", 20, 70);

        let yPos = 80;
        doc.text("Quantity", 20, yPos);
        doc.text("Description", 60, yPos);
        doc.text("Price", 150, yPos);
        doc.text("Total", 180, yPos);

        // Add a line below headers
        yPos += 5;
        doc.line(20, yPos, 190, yPos);
        yPos += 10;

        // Products array handling - ensure it's an array even if there's only one product
        const products = Array.isArray(invoice.products.product)
            ? invoice.products.product
            : [invoice.products.product];

        let totalAmount = 0;

        // Add product rows
        for (const product of products) {
            const quantity = parseFloat(product.quantity);
            const price = parseFloat(product.price);
            const total = quantity * price;
            totalAmount += total;

            doc.text(product.quantity.toString(), 20, yPos);

            // Handle long descriptions with wrapping
            const descriptionLines = doc.splitTextToSize(product.description, 80);
            doc.text(descriptionLines, 60, yPos);

            doc.text(price.toFixed(2), 150, yPos);
            doc.text(total.toFixed(2), 180, yPos);

            // Move yPos down for the next product, account for multi-line descriptions
            yPos += Math.max(10, descriptionLines.length * 7);

            // Add a line separator between products
            doc.setDrawColor(200);
            doc.line(20, yPos - 5, 190, yPos - 5);
            doc.setDrawColor(0);
        }

        // Total amount
        yPos += 10;
        doc.setFontSize(12);
        doc.setFont('Helvetica', 'bold');
        doc.text(`Total Amount: ${totalAmount.toFixed(2)}`, 150, yPos);
        doc.setFont('Helvetica', 'normal');

        // Add notes if available
        if (invoice.notes) {
            yPos += 20;
            doc.setFontSize(10);
            doc.text("Notes:", 20, yPos);
            yPos += 7;
            const noteLines = doc.splitTextToSize(invoice.notes, 150);
            doc.text(noteLines, 20, yPos);
        }

        // Add payment method if available
        if (invoice.paymentMethod) {
            yPos += 20;
            doc.text(`Payment method: ${invoice.paymentMethod}`, 20, yPos);
        }

        // Generate the PDF
        const pdfOutput = doc.output('arraybuffer');

        // Create and return the response with appropriate headers
        return new NextResponse(pdfOutput, {
            headers: {
                'Content-Type': 'application/pdf',
                'Content-Disposition': 'attachment; filename="invoice.pdf"'
            }
        });

    } catch (error) {
        console.error('Error generating PDF:', error);
        return NextResponse.json(
            { error: "Failed to generate PDF" },
            { status: 500 }
        );
    }
} 