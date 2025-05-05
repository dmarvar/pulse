'use client';

import { useEffect, useRef } from 'react';
import SwaggerUIBundle from 'swagger-ui-dist/swagger-ui-bundle';
import SwaggerUIStandalonePreset from 'swagger-ui-dist/swagger-ui-standalone-preset';
import 'swagger-ui-dist/swagger-ui.css';

export default function ApiDocs() {
    const swaggerUIRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // Fetch the API specification
        fetch('/api/api-docs')
            .then(response => response.json())
            .then(spec => {
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
            })
            .catch(error => console.error('Error loading API specs:', error));
    }, []);

    return (
        <div className="container mx-auto py-10 px-4">
            <h1 className="text-3xl font-bold mb-6">API Documentation</h1>
            <div id="swagger-ui" ref={swaggerUIRef} />
        </div>
    );
} 