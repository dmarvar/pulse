declare module 'swagger-ui-react' {
    import { ComponentType } from 'react';

    interface SwaggerUIProps {
        spec: any;
        url?: string;
        layout?: string;
        docExpansion?: 'list' | 'full' | 'none';
        defaultModelsExpandDepth?: number;
        defaultModelExpandDepth?: number;
        validatorUrl?: string | null;
        showMutatedRequest?: boolean;
        supportedSubmitMethods?: Array<string>;
        [k: string]: any;
    }

    const SwaggerUI: ComponentType<SwaggerUIProps>;
    export default SwaggerUI;
} 