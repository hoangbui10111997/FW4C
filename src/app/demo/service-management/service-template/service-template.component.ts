import { Component, OnInit, AfterViewInit, ViewChild, ElementRef, Input } from '@angular/core';
import { of, Observable } from 'rxjs';
import { Service } from '../service.model';
import { ValidationOption, RequiredValidationRule, ClientValidator, ValidationService, CustomValidationRule } from 'ngx-fw4c';
import { ServiceTemplateService } from './service-template.service';


@Component({
  selector: 'app-service-template',
  templateUrl: './service-template.component.html'
})
export class ServiceTemplateComponent implements OnInit, AfterViewInit {
  @ViewChild("formRef", {static: true}) public formRef: ElementRef;
  @Input() public item: Service = new Service();
  @Input() public action: String;

  public formLabel = {
    name: 'Name',
    host: 'Host',
    path: 'Path',
    protocol: 'Protocol',
    port: 'Port',
    created_at: 'Created Date',
    updated_at: 'Recent Update Date',
    required: 'Required',
    retries: 'Retries',
    connect_timeout: 'Connect Timeout',
    write_timeout: 'Write Timeout',
    read_timeout: 'Read Timeout',
    tags: 'Tags',
    option: 'Optional',
    semi: 'Semi-Optional',
    client_certificate: 'Client Certificate'
  }
  public formDes = {
    name: 'The Service name.',
    retries: 'The number of retries to execute upon failure to proxy. Defaults to 5.',
    protocol: 'The protocol used to communicate with the upstream. It can be one of http or https. Defaults to "http".',
    host: 'The host of the upstream server.',
    port: 'The upstream server port. Defaults to 80.',
    path: 'The path to be used in requests to the upstream server.',
    connect_timeout: 'The timeout in milliseconds for establishing a connection to the upstream server. Defaults to 60000.',
    write_timeout: 'The timeout in milliseconds between two successive write operations for transmitting a request to the upstream server. Defaults to 60000.',
    read_timeout: 'The timeout in milliseconds between two successive read operations for transmitting a request to the upstream server. Defaults to 60000.',
    tags: 'An optional set of strings associated with the Service, for grouping and filtering.',
    client_certificate: "Certificate to be used as client certificate while TLS handshaking to the upstream server. With form-encoded, the notation is client_certificate.id=<client_certificate_id>. With JSON, use \"client_certificate\":{\"id\":\"<client_certificate_id>\"}."
  }
  public apiUrl = "http://localhost:8001/services";

  constructor(private _validationService: ValidationService, private _serviceTemplateSerivce: ServiceTemplateService) {}

  ngAfterViewInit(): void {
    this.initValidations();
  }

  initValidations(): void {
    var options = [
      new ValidationOption({
        validationName: "Name",
        valueResolver: () => this.item.name,
        rules: [
          new RequiredValidationRule(),
          new CustomValidationRule((value) => {
            return this._serviceTemplateSerivce.validateName(value);
          })
        ]
      }),
      new ValidationOption({
        validationName: "Host",
        valueResolver: () => this.item.host,
        rules: [
          new RequiredValidationRule(),
          new CustomValidationRule((value) => {
            return this._serviceTemplateSerivce.validateHost(value);
          })
        ]
      }),
      new ValidationOption({
        validationName: "Tags",
        valueResolver: () => this.item.tags,
        rules: [
          new CustomValidationRule((value) => {
            return this._serviceTemplateSerivce.validateTag(value);
          })
        ]
      }),
      new ValidationOption({
        validationName: "Certificate",
        valueResolver: () => this.item.client_certificate,
        rules: [
          new CustomValidationRule((value) => {
            return this._serviceTemplateSerivce.validateCertificate(value);
          })
        ]
      })
    ]

    var validator = new ClientValidator({
      formRef: this.formRef,
      options: options
    });

    this._validationService.init({validator});
  }

  ngOnInit() {
    if(this.action === 'New') {
      this.loadDefaultValue();
    }
  }

  loadDefaultValue(): void {
    this.item = new Service();
    this.item.port = 80;
    this.item.retries = 5;
    this.item.protocol = 'http';
    this.item.connect_timeout = 60000;
    this.item.write_timeout = 60000;
    this.item.read_timeout = 60000;
  }
  isValid(): boolean {
    return this._validationService.isValid(false);
  }

  callback(): Observable<any> {
    return of(true);
  }

}
