import { BaseRequest, BaseResponse, SearchBaseRequest, SearchBaseResponse } from 'ngx-fw4c';

export class Service {
    name: string;
    host: string;
    tags: string[];
    url: string;
    port: number;
    path: string;
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

export class ServiceRequest extends BaseRequest<Service> {
    token?: string;
    payload: Service = new Service({});
    constructor(init?: Partial<ServiceRequest>) {
        super();
        Object.assign(this, init);
    }
}

export class ServiceResponse extends BaseResponse<Service> {
    consumer?: Service;
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
