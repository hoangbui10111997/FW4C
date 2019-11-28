export class formLabelService {
    name: string;
    host: string;
    path: string;
    protocol: string;
    port: string;
    created_at: string;
    updated_at: string;
    required: string;
    retries: string;
    connect_timeout: string;
    write_timeout: string;
    read_timeout: string;
    tags: string;
    option: string;
    semi: string;
    client_certificate: string;

    constructor() {
        this.name = 'Tên';
        this.host = 'Host';
        this.path = 'Path';
        this.protocol = 'Giao thức';
        this.port = 'Cổng';
        this.created_at = 'Ngày tạo';
        this.updated_at = 'Cập nhật';
        this.required = 'Required*';
        this.retries = 'Thử lại';
        this.connect_timeout = 'Thời gian kết nối tối đa';
        this.write_timeout = 'Thời gian ghi tối đa';
        this.read_timeout = 'Thời gian đọc tối đa';
        this.tags = 'Tags';
        this.option = 'Optional';
        this.semi = 'Semi-Optional';
        this.client_certificate = 'Chứng chỉ an toàn';
    }
}

export class formDescriptionService {
    name: string;
    retries: string;
    protocol: string;
    host: string;
    port: string;
    path: string;
    connect_timeout: string;
    write_timeout: string;
    read_timeout: string;
    tags: string;
    client_certificate: string;

    constructor() {
        this.name = 'Tên Service.';
        this.retries = 'Số lần tối đa thử lại nếu xảy ra lỗi. Giá trị mặc định là <code style="background-color: gray">5</code>.';
        this.protocol = "Giao thức kết nối. Có hai giá trị <code>http</code> or <code style='backround-color: gray'>https</code>. Giá trị mặc định là <code>http</code>.",
        this.host = 'Host cần service trỏ tới.',
        this.port = 'Cổng kết nối. Giá trị mặc định là <code>80</code>.',
        this.path = 'The path to be used in requests to the upstream server.',
        this.connect_timeout = 'The timeout in milliseconds for establishing a connection to the upstream server. Defaults to <code>60000</code>.',
        this.write_timeout = 'The timeout in milliseconds between two successive write operations for transmitting a request to the upstream server. Defaults to <code>60000</code>.',
        this.read_timeout = 'The timeout in milliseconds between two successive read operations for transmitting a request to the upstream server. Defaults to <code>60000</code>.',
        this.tags = 'An optional set of strings associated with the Service, for grouping and filtering.',
        this.client_certificate = "Certificate to be used as client certificate while TLS handshaking to the upstream server. With form-encoded, the notation is <code>client_certificate.id=&ltclient_certificate_id&gt</code>. With JSON, use <code>\"client_certificate\":{\"id\":\"&ltclient_certificate_id&gt\"}</code>."
    }
}

export class tableTitleService {
    name: string;
    host: string;
    id: string;
    port: string;
    time_create: string;
    time_update: string;

    constructor() {
        this.name = 'Tên Service';
        this.host = 'Host';
        this.id = 'ID';
        this.port = 'Cổng';
        this.time_create = 'Ngày tạo';
        this.time_update = 'Cập nhật';
    }
}

export class tableAction {
    new: string;
    edit: string;
    refresh: string;
    delete: string;

    constructor() {
        this.new = 'Tạo mới';
        this.edit = 'Chỉnh sửa';
        this.refresh = 'Làm mới';
        this.delete = 'Xóa';
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

    constructor() {
        this.new = 'Tạo';
        this.edit = 'Chỉnh sửa';
        this.refresh = 'Làm mới';
        this.cancel = 'Hủy';
        this.no = 'Không';
        this.yes = 'Đồng ý';
        this.delete = 'Xóa'
    }
}

export class actionTitle {
    addService: string;
    delete: string;
    editService(name): string {
        return 'Chỉnh sửa service' + name;
    }

    constructor() {
        this.addService = 'Thêm service';
        this.delete = 'XÓA';
    }
}

export class actionMessageService {
    deleteService(name): string {
        return 'Xóa service ' + name + ' ?';
    }

    deleteListService: string;

    constructor() {
        this.deleteListService = 'Xóa tất cả Service được chọn?'
    }
}