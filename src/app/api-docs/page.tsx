'use client';

import { useEffect, useState } from 'react';
import SwaggerUI from 'swagger-ui-react';
import 'swagger-ui-react/swagger-ui.css';

export default function ApiDocs() {
    const [spec, setSpec] = useState(null);

    useEffect(() => {
        fetch('/api/api-docs')
            .then(response => response.json())
            .then(data => setSpec(data))
            .catch(error => console.error('Error loading API specs:', error));
    }, []);

    return (
        <div className="container mx-auto py-10 px-4">
            <h1 className="text-3xl font-bold mb-6">API Documentation</h1>
            {spec ? (
                <SwaggerUI spec={spec} />
            ) : (
                <div className="flex justify-center items-center h-96">
                    <p className="text-xl">Loading API documentation...</p>
                </div>
            )}
        </div>
    );
} 