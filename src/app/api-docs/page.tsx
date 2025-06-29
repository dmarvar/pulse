'use client';

import React, { useEffect, useRef, Suspense, useState } from 'react';
import dynamic from 'next/dynamic';
import 'swagger-ui-dist/swagger-ui.css';

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
        <>
            {/* Custom CSS to force light mode */}
            <style jsx global>{`
                /* Force light mode for Swagger UI */
                .swagger-ui {
                    color: #3b4151 !important;
                    background-color: #ffffff !important;
                }
                
                .swagger-ui .info {
                    background-color: #ffffff !important;
                }
                
                .swagger-ui .scheme-container {
                    background-color: #ffffff !important;
                    border: 1px solid #d3d3d3 !important;
                }
                
                .swagger-ui .opblock-tag {
                    background-color: rgba(0, 0, 0, 0.02) !important;
                    border-bottom: 1px solid rgba(59, 65, 81, 0.1) !important;
                    color: #3b4151 !important;
                }
                
                .swagger-ui .opblock {
                    background-color: #ffffff !important;
                    border: 1px solid #d3d3d3 !important;
                    color: #3b4151 !important;
                }
                
                .swagger-ui .opblock .opblock-summary {
                    border-bottom: 1px solid #d3d3d3 !important;
                }
                
                .swagger-ui .opblock-description-wrapper,
                .swagger-ui .opblock-description-wrapper p {
                    color: #3b4151 !important;
                }
                
                .swagger-ui .parameter__name {
                    color: #3b4151 !important;
                }
                
                .swagger-ui .parameter__type {
                    color: #999999 !important;
                }
                
                .swagger-ui .response-col_status {
                    color: #3b4151 !important;
                }
                
                .swagger-ui .model-box {
                    background-color: #ffffff !important;
                    border: 1px solid #d3d3d3 !important;
                }
                
                .swagger-ui .model .property {
                    color: #3b4151 !important;
                }
                
                .swagger-ui textarea {
                    background-color: #ffffff !important;
                    color: #3b4151 !important;
                    border: 1px solid #d3d3d3 !important;
                }
                
                .swagger-ui .body-param-options {
                    background-color: #ffffff !important;
                }
                
                .swagger-ui .parameters-col_description {
                    color: #3b4151 !important;
                }
                
                .swagger-ui .tab {
                    background-color: #ffffff !important;
                    color: #3b4151 !important;
                }
                
                .swagger-ui .tab.active {
                    background-color: #f7f7f7 !important;
                }
                
                .swagger-ui .highlight-code {
                    background-color: #f7f7f7 !important;
                }
                
                .swagger-ui .microlight {
                    color: #3b4151 !important;
                    background-color: #f7f7f7 !important;
                }
                
                /* Fix syntax highlighting colors for better contrast */
                .swagger-ui .highlight-code .microlight {
                    color: #3b4151 !important;
                }
                
                /* String values in JSON - make green darker */
                .swagger-ui .highlight-code .microlight .hljs-string {
                    color: #067d17 !important;
                }
                
                /* JSON syntax highlighting improvements */
                .swagger-ui .highlight-code pre .hljs-string {
                    color: #067d17 !important;
                }
                
                .swagger-ui .highlight-code pre .hljs-number {
                    color: #d73a49 !important;
                }
                
                .swagger-ui .highlight-code pre .hljs-literal {
                    color: #005cc5 !important;
                }
                
                /* Additional JSON response styling */
                .swagger-ui .responses-inner pre {
                    color: #3b4151 !important;
                }
                
                .swagger-ui .responses-inner pre .hljs-string,
                .swagger-ui .response-col_description pre .hljs-string {
                    color: #067d17 !important;
                }
                
                /* Response body syntax highlighting */
                .swagger-ui .response-content-type pre .hljs-string {
                    color: #067d17 !important;
                }
                
                /* Fix light green text in server response section */
                .swagger-ui .live-responses-table .response-col_description pre,
                .swagger-ui .live-responses-table .response-col_description code {
                    color: #3b4151 !important;
                }
                
                .swagger-ui .live-responses-table .response-col_description pre .token.string,
                .swagger-ui .live-responses-table .response-col_description pre .hljs-string {
                    color: #067d17 !important;
                }
                
                .swagger-ui .live-responses-table .response-col_description pre .token.boolean,
                .swagger-ui .live-responses-table .response-col_description pre .hljs-literal {
                    color: #005cc5 !important;
                }
                
                .swagger-ui .live-responses-table .response-col_description pre .token.number,
                .swagger-ui .live-responses-table .response-col_description pre .hljs-number {
                    color: #d73a49 !important;
                }
                
                /* Target the specific response body area */
                .swagger-ui .responses-wrapper .response .response-col_description pre {
                    color: #3b4151 !important;
                }
                
                .swagger-ui .responses-wrapper .response .response-col_description pre * {
                    color: inherit !important;
                }
                
                .swagger-ui .responses-wrapper .response .response-col_description pre .hljs-string {
                    color: #067d17 !important;
                }
                
                /* Force override all syntax highlighting in response bodies */
                .swagger-ui .response-content-type code,
                .swagger-ui .response-content-type pre,
                .swagger-ui .live-responses-table pre {
                    color: #3b4151 !important;
                }
                
                .swagger-ui .response-content-type code .hljs-string,
                .swagger-ui .response-content-type pre .hljs-string,
                .swagger-ui .live-responses-table pre .hljs-string {
                    color: #067d17 !important;
                }
                
                /* Override any remaining light green text */
                .swagger-ui * {
                    --swagger-ui-string-color: #067d17 !important;
                }
                
                .swagger-ui pre[class*="language-"] .token.string,
                .swagger-ui code[class*="language-"] .token.string {
                    color: #067d17 !important;
                }
                
                /* Fix any dark backgrounds */
                .swagger-ui .topbar {
                    background-color: #89bf04 !important;
                }
                
                .swagger-ui .information-container {
                    background-color: #ffffff !important;
                }
            `}</style>
            
            <div className="w-full py-10 px-6 bg-white min-h-screen">
                <h1 className="text-3xl font-bold mb-6 text-gray-900">API Documentation</h1>
                <Suspense fallback={<div className="flex justify-center items-center h-96">
                    <p className="text-xl text-gray-900">Loading API documentation...</p>
                </div>}>
                    {spec ? <SwaggerUI spec={spec} /> :
                        <div className="flex justify-center items-center h-96">
                            <p className="text-xl text-gray-900">Loading API documentation...</p>
                        </div>
                    }
                </Suspense>
            </div>
        </>
    );
} 