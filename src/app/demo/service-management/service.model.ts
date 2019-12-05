import { BaseRequest, BaseResponse, SearchBaseRequest, SearchBaseResponse } from 'ngx-fw4c';

export class KongService {
    id: string;
    name: string;
    host: string;
    tags: string[];
    url: string;
    port: number;
    path: string;
    created_at: number;
    updated_at: number;
    protocol: string;
    retries: number;
    connect_timeout: number;
    write_timeout: number;
    read_timeout: number;
    client_certificate: string;
    constructor(init?: Partial<Service>) {
        Object.assign(this, init);
    }
}

export class Service {
    id: string;
    name: string;
    host: string;
    tags: string[];
    url: string;
    port: number;
    path: string;
    createdAt: number;
    updatedAt: number;
    protocol: string;
    retries: number;
    connectTimeout: number;
    writeTimeout: number;
    readTimeout: number;
    clientCertificate: string;
    constructor(init?: Partial<Service>) {
        Object.assign(this, init);
    }
}

export class ServiceRequest extends BaseRequest<Service> {
    token?: string;
    payload: Service = new Service({});
    constructor(init?: Partial<ServiceRequest>) {
        super();
        Object.assign(this, init);
    }
}

export class ServiceResponse extends BaseResponse<Service> {
    service?: Service;
    token?: string;
    constructor(init?: Partial<ServiceResponse>) {
        super();
        Object.assign(this, init);
    }
}

export class ServiceSearchRequest extends SearchBaseRequest {
    token?: string;
    constructor(init?: Partial<ServiceSearchRequest>) {
        super();
        Object.assign(this, init);
    }
}

export class ServiceSearchResponse extends SearchBaseResponse<Service> {
    token?: string;
    constructor(init?: Partial<ServiceSearchResponse>) {
        super();
        Object.assign(this, init);
    }
}

export class ServiceCreateRequest extends BaseRequest<Service> {
    token?: string;
    constructor(init?: Partial<ServiceCreateRequest>) {
        super();
        Object.assign(this, init);
    }
}

export class ServiceCreateResponse extends BaseResponse<Service> {
    token?: string;
    constructor(init?: Partial<ServiceCreateResponse>) {
        super();
        Object.assign(this, init);
    }
}

export class ServiceUpdateRequest extends BaseRequest<Service> {
    token?: string;
    constructor(init?: Partial<ServiceUpdateRequest>) {
        super();
        Object.assign(this, init);
    }
}

export class ServiceUpdateResponse extends BaseResponse<Service> {
    token?: string;
    constructor(init?: Partial<ServiceUpdateResponse>) {
        super();
        Object.assign(this, init);
    }
}

export class ServiceDeleteRequest extends BaseRequest<Service> {
    ids: string[];
    constructor(init?: Partial<ServiceDeleteRequest>) {
        super();
        Object.assign(this, init);
    }
}

export class ServiceDeleteResponse extends BaseResponse<Service> {
    constructor(init?: Partial<ServiceDeleteResponse>) {
        super();
        Object.assign(this, init);
    }
}
