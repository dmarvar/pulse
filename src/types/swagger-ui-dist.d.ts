declare module 'swagger-ui-dist/swagger-ui-bundle' {
    interface SwaggerUIOptions {
        spec?: object;
        url?: string;
        dom_id?: string;
        domNode?: HTMLElement;
        deepLinking?: boolean;
        presets?: Array<unknown>;
        plugins?: Array<unknown>;
        layout?: string;
        defaultModelsExpandDepth?: number;
        defaultModelExpandDepth?: number;
        defaultModelRendering?: string;
        validatorUrl?: string | null;
        [key: string]: unknown;
    }

    interface SwaggerUIConstructor {
        (options: SwaggerUIOptions): unknown;
        presets: Record<string, unknown>;
        plugins: Record<string, unknown>;
    }

    const SwaggerUIBundle: SwaggerUIConstructor;
    export default SwaggerUIBundle;
}

declare module 'swagger-ui-dist/swagger-ui-standalone-preset' {
    const SwaggerUIStandalonePreset: unknown;
    export default SwaggerUIStandalonePreset;
}

declare module 'swagger-ui-dist/swagger-ui.css' {
    const content: { [className: string]: string };
    export default content;
} 