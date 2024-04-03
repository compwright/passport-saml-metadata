declare class MetadataReader {
    constructor(metadata: any, options?: {});
    query(query: any): any;
    get identifierFormat(): any;
    get identityProviderUrl(): any;
    get logoutUrl(): any;
    get encryptionCerts(): any;
    get encryptionCert(): any;
    get signingCerts(): any;
    get signingCert(): any;
    get claimSchema(): any;
    get entityId(): any;
    #private;
}

declare function claimsToCamelCase(claims: any, claimSchema: any): {};

declare function toPassportConfig(reader?: {}, options?: {
    multipleCerts: boolean;
}): {
    identityProviderUrl: any;
    entryPoint: any;
    logoutUrl: any;
    idpCert: any;
    identifierFormat: any;
};

declare function _default$1(config: any): () => void;

declare function fetchMetadata(config?: {}): Promise<any>;
declare function _default(config: any): Promise<MetadataReader>;

export { MetadataReader, claimsToCamelCase, _default as fetch, fetchMetadata, _default$1 as metadata, toPassportConfig };
