import { Component, OnInit, AfterViewInit, ViewChild, ElementRef, Input } from '@angular/core';
import { of, Observable } from 'rxjs';
import { Service } from '../service.model';
import { ValidationOption, RequiredValidationRule, ClientValidator, ValidationService, CustomValidationRule, ValidationRuleResponse  } from 'ngx-fw4c';
import { ServiceTemplateService } from './service-template.service';
import { HttpClient } from '@angular/common/http';
import { formLabelService, formDescriptionService } from '../common/language/serviceLanguageEN.model';

@Component({
  selector: 'app-service-template',
  templateUrl: './service-template.component.html'
})
export class ServiceTemplateComponent implements OnInit, AfterViewInit {
  @ViewChild("formRef", {static: true}) public formRef: ElementRef;
  @Input() public item: Service = new Service();
  @Input() public action: String;

  public formLabel: formLabelService = new formLabelService();
  public formDes: formDescriptionService = new formDescriptionService();
  public apiUrl = 'http://localhost:8001/services'
  public data;

  constructor(private _validationService: ValidationService, private _serviceTemplateSerivce: ServiceTemplateService, private http: HttpClient) {}

  ngAfterViewInit(): void {
    this.initValidations();
  }

  getData(): void {
    this.data = [];
    this.http.get(this.apiUrl)
    .subscribe((res: any) => {
      for (let i = 0; i < res.data.length; i++) {
        if(res.data[i].name === this.item.name) {
          continue;
        }
        this.data.push(res.data[i]);
      }
    });
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
          }),
          new CustomValidationRule((value) => {
            return this._serviceTemplateSerivce.validateNameService(value, this.data);
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
          }),
          new CustomValidationRule((value) => {
            return this._serviceTemplateSerivce.validateHostEnd(value);
          })
        ]
      }),
      new ValidationOption({
        validationName: "Tags",
        valueResolver: () => this.item.tags,
        rules: [
          new CustomValidationRule((value) => {
            return this._serviceTemplateSerivce.validateTag(value);
          }),
          new CustomValidationRule((value) => {
            return of(new ValidationRuleResponse({
              status: this._serviceTemplateSerivce.validateTagSpace(value),
              message: 'Tag can\'t containe whitespace'
          }));
          })
        ]
      }),
      new ValidationOption({
        validationName: "Path",
        valueResolver: () => this.item.path,
        rules: [
          new CustomValidationRule((value) => {
            return this._serviceTemplateSerivce.validatePath(value);
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
    this.getData();
    if(this.action === 'New') {
      this.loadDefaultValue();
    }
  }

  loadDefaultValue(): void {
    this.item = new Service();
    this.item.port = 80;
    this.item.retries = 5;
    this.item.protocol = 'http';
    this.item.connectTimeout = 60000;
    this.item.writeTimeout = 60000;
    this.item.readTimeout = 60000;
  }
  isValid(): boolean {
    return this._validationService.isValid(true, false);
  }

  callback(): Observable<any> {
    return of(true);
  }

  public getValidator(): ValidationService {

    return this._validationService;
  }

}
