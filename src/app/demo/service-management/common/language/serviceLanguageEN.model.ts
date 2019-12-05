export class formLabelService {
    name: string;
    host: string;
    path: string;
    protocol: string;
    port: string;
    createdAt: string;
    updatedAt: string;
    required: string;
    retries: string;
    connectTimeout: string;
    writeTimeout: string;
    readTimeout: string;
    tags: string;
    option: string;
    semi: string;
    clientCertificate: string;

    constructor() {
        this.name = 'Name';
        this.host = 'Host';
        this.path = 'Path';
        this.protocol = 'Protocol';
        this.port = 'Port';
        this.createdAt = 'Created Date';
        this.updatedAt = 'Recent Update Date';
        this.required = 'Required*';
        this.retries = 'Retries';
        this.connectTimeout = 'Connect Timeout';
        this.writeTimeout = 'Write Timeout';
        this.readTimeout = 'Read Timeout';
        this.tags = 'Tags';
        this.option = 'Optional';
        this.semi = 'Semi-Optional';
        this.clientCertificate = 'Client Certificate';
    }
}

export class formDescriptionService {
    name: string;
    retries: string;
    protocol: string;
    host: string;
    port: string;
    path: string;
    connectTimeout: string;
    writeTimeout: string;
    readTimeout: string;
    tags: string;
    clientCertificate: string;

    constructor() {
        this.name = 'The Service name.';
        this.retries = 'The number of retries to execute upon failure to proxy. Defaults to <code style="background-color: gray">5</code>.';
        this.protocol = "The protocol used to communicate with the upstream. It can be one of <code>http</code> or <code style='backround-color: gray'>https</code>. Defaults to <code>http</code>.",
        this.host = 'The host of the upstream server.',
        this.port = 'The upstream server port. Defaults to <code>80</code>.',
        this.path = 'The path to be used in requests to the upstream server.',
        this.connectTimeout = 'The timeout in milliseconds for establishing a connection to the upstream server. Defaults to <code>60000</code>.',
        this.writeTimeout = 'The timeout in milliseconds between two successive write operations for transmitting a request to the upstream server. Defaults to <code>60000</code>.',
        this.readTimeout = 'The timeout in milliseconds between two successive read operations for transmitting a request to the upstream server. Defaults to <code>60000</code>.',
        this.tags = 'An optional set of strings associated with the Service, for grouping and filtering.',
        this.clientCertificate = "Certificate to be used as client certificate while TLS handshaking to the upstream server. With form-encoded, the notation is <code>client_certificate.id=&ltclient_certificate_id&gt</code>. With JSON, use <code>\"client_certificate\":{\"id\":\"&ltclient_certificate_id&gt\"}</code>."
    }
}

export class tableTitleService {
    name: string;
    host: string;
    id: string;
    port: string;
    timeCreate: string;
    timeUpdate: string;
    path: string;
    tag: string;

    constructor() {
        this.name = 'Name';
        this.host = 'Host';
        this.id = 'ID';
        this.port = 'Port';
        this.timeCreate = 'Time Created';
        this.timeUpdate = 'Recent Updated';
        this.path = 'Path';
        this.tag = 'Tag'
    }
}

export class tableAction {
    new: string;
    edit: string;
    refresh: string;
    delete: string;
    copy: string;
    save: string;
    import: string;
    export: string;
    template: string;

    constructor() {
        this.new = 'New';
        this.template = 'Template'
        this.edit = 'Edit';
        this.refresh = 'Refresh';
        this.delete = 'Delete';
        this.copy = 'Copy';
        this.save = 'Save';
        this.import = 'Import';
        this.export = 'Export';
    }
}

export class actionButton {
    new: string;
    edit: string;
    cancel: string;
    yes: string;
    no: string;
    refresh: string;
    delete: string;
    import: string;
    export: string;
    create: string;
    accept: string;

    constructor() {
        this.new = 'New';
        this.edit = 'Edit';
        this.refresh = 'Refresh';
        this.cancel = 'Cancel';
        this.no = 'No';
        this.yes = 'Yes';
        this.delete = 'Delete';
        this.export = 'Export';
        this.import = 'Import';
        this.create = 'Create';
        this.accept = 'Accept';
    }
}

export class actionTitle {
    addService: string;
    delete: string;
    import: string;
    export: string;

    editService(name): string {
        return 'Edit ' + name + ' service';
    }

    constructor() {
        this.addService = 'ADD NEW SERVICE';
        this.delete = 'DELETE';
        this.import = 'IMPORT SERVICE';
        this.export = 'EXPORT SERVICE'
    }
}

export class actionMessageService {
    deleteService(name): string {
        return 'Delete ' + name + ' service?';
    }

    deleteListService: string;

    constructor() {
        this.deleteListService = 'Delete all selected service?'
    }
}