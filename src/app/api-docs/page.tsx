'use client';

import React, { useEffect, useRef, Suspense, useState } from 'react';
import dynamic from 'next/dynamic';

// Type for OpenAPI/Swagger specification
interface SwaggerSpec {
    openapi: string;
    info: {
        title: string;
        version: string;
        description?: string;
    };
    servers?: Array<{
        url: string;
        description?: string;
    }>;
    paths: Record<string, unknown>;
    components?: {
        schemas?: Record<string, unknown>;
        [key: string]: unknown;
    };
    tags?: Array<{
        name: string;
        description?: string;
    }>;
    [key: string]: unknown;
}

// Dynamically import Swagger UI components with no SSR
const SwaggerUI = dynamic(
    async () => {
        const SwaggerUIBundle = (await import('swagger-ui-dist/swagger-ui-bundle')).default;
        const SwaggerUIStandalonePreset = (await import('swagger-ui-dist/swagger-ui-standalone-preset')).default;
        await import('swagger-ui-dist/swagger-ui.css');

        return function SwaggerUIComponent({ spec }: { spec: SwaggerSpec }) {
            const swaggerUIRef = useRef<HTMLDivElement>(null);

            useEffect(() => {
                if (swaggerUIRef.current) {
                    // Initialize Swagger UI
                    SwaggerUIBundle({
                        spec,
                        dom_id: '#swagger-ui',
                        deepLinking: true,
                        presets: [
                            SwaggerUIBundle.presets.apis,
                            SwaggerUIStandalonePreset
                        ],
                        layout: 'StandaloneLayout',
                        plugins: [
                            SwaggerUIBundle.plugins.DownloadUrl
                        ],
                        defaultModelsExpandDepth: 2,
                        defaultModelExpandDepth: 2,
                        validatorUrl: null
                    });
                }
            }, [spec]);

            return <div id="swagger-ui" ref={swaggerUIRef} />;
        };
    },
    { ssr: false }
);

export default function ApiDocs() {
    const [spec, setSpec] = useState<SwaggerSpec | null>(null);

    useEffect(() => {
        // Fetch the API specification
        fetch('/api/api-docs')
            .then(response => response.json())
            .then(data => setSpec(data))
            .catch(error => console.error('Error loading API specs:', error));
    }, []);

    return (
        <div className="container mx-auto py-10 px-4">
            <h1 className="text-3xl font-bold mb-6">API Documentation</h1>
            <Suspense fallback={<div className="flex justify-center items-center h-96">
                <p className="text-xl">Loading API documentation...</p>
            </div>}>
                {spec ? <SwaggerUI spec={spec} /> :
                    <div className="flex justify-center items-center h-96">
                        <p className="text-xl">Loading API documentation...</p>
                    </div>
                }
            </Suspense>
        </div>
    );
} 