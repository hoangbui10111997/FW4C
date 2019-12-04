import {Component, ViewChild, ElementRef, OnInit} from "@angular/core";
import {TableOption, ModalService, TemplateViewModel, TableComponent, ConfirmViewModel, TableMode, TableColumnType, TableAction, TableConstant, DataService, ValidationRule, ValidationOption, CustomValidationRule, ValidationService, RequiredValidationRule} from "ngx-fw4c";
import { ServiceManagementService } from './service-management.service';
import { ServiceTemplateComponent } from './service-template/service-template.component'
import { Service, ServiceRequest } from './service.model';
import { tableTitleService, tableAction, actionButton, actionTitle, actionMessageService } from './common/language/serviceLanguageEN.model';
import { of } from 'rxjs';
import { ServiceTemplateService } from '../service-management/service-template/service-template.service'
import { ImportExcelComponent } from './import-excel/import-excel.component';
import { ExportDataComponent } from './export-data/export-data.component';
import { map } from 'rxjs/operators';


@Component({
  selector: 'app-service-management',
  templateUrl: './service-management.component.html'
})
export class ServiceManagementComponent implements OnInit {
  @ViewChild("formRef", { static: true }) public formRef: ElementRef;
  @ViewChild("tableTemplate", { static: true }) public tableTemplate: TableComponent;
  
  public option: TableOption;
  public tableTitle: tableTitleService = new tableTitleService();
  public tableAction: tableAction = new tableAction(); 
  public actionButton: actionButton = new actionButton();
  public actionTitle: actionTitle = new actionTitle();
  public actionMessage: actionMessageService = new actionMessageService();
  public iserror = false;
  public error: string;

  constructor(private _modalService: ModalService, private _serviceManagementService: ServiceManagementService, private _dataService: DataService, private _serviceTemplateService: ServiceTemplateService, private _validationService: ValidationService) {}

  ngOnInit() {
    this.initTable();
  }

  private initTable() {
    this.option = new TableOption({
      localData: () => {
        return this._serviceManagementService.search(new ServiceRequest()).pipe(map(s => s.items));
      },

      inlineEdit: true,
      mode: TableMode.full,
      searchFields: ["name", "host"],
      topButtons: [
        {
          icon: "fa fa-plus",
          customClass: "primary",
          title: () => this.tableAction.new,
          executeAsync: (item: Service) => {
            this._modalService.showTemplateDialog(new TemplateViewModel({
              icon: "fa fa-plus",
              validationKey: 'ServiceTemplateComponent',
              customSize: 'modal-lg',
              title: this.actionTitle.addService,
              data: {
                item: item,
                action: 'New'
              },
              template: ServiceTemplateComponent,
              btnAcceptTitle: this.actionButton.accept,
              btnCancelTitle: this.actionButton.cancel,
              acceptCallback: (response: any, close, provider: any) => {
                this._serviceManagementService.createService(provider.item)
                .subscribe(() => {
                  this.tableTemplate.reload();
                }, error => {
                  this.iserror = true;
                  this.error = error.error.message;
                  setTimeout(() => this.iserror = false, 5000);
                });
              }
            }));
          }
        },
        {
          icon: "fa fa-save",
          customClass: "warning",
          hide: () => {
            if(this.tableTemplate.changedRows.length === 0) {
              return true;
            } else {
              return false;
            }
          },
          title: () => this.tableAction.save,
          executeAsync: () => {
            for(let i = 0; i < this.tableTemplate.changedRows.length; i++) {
              this._serviceManagementService.updateService(this.tableTemplate.changedRows[i].currentItem)
              .subscribe(() => {
                if (i === (this.tableTemplate.changedRows.length - 1)) {
                  this.tableTemplate.reload();
                  this.tableTemplate.changedRows = [];
                }
              });
            }
          }
        },
        {
          icon: "fa fa-download",
          customClass: "info",
          title: () => this.tableAction.export,
          executeAsync: (item: Service) => {
            this._modalService.showTemplateDialog(new TemplateViewModel({
              validationKey: 'ExportDataComponent',
              title: this.actionTitle.export,
              template: ExportDataComponent,
              btnAcceptTitle: this.actionButton.accept,
              btnCancelTitle: this.actionButton.cancel,
              acceptCallback: data => {
                if (data === 'Excel') {
                  var data = this._dataService.cloneItems(this.tableTemplate.items);
						      this._serviceManagementService.exportExcel(data);
                } else if (data === 'Template') {
                  this._serviceManagementService.exportTemplate();
                } else if (data === 'PDF') {
                  var data = this._dataService.cloneItems(this.tableTemplate.items);
						      this._serviceManagementService.exportPDF(data);
                }
              }
            }));
          }
        },
        {
          icon: "fa fa-upload",
          title: () => this.tableAction.import,
          customClass: 'info',
          executeAsync: () => {
            this._modalService.showTemplateDialog(new TemplateViewModel({
              template: ImportExcelComponent,
              icon: 'fa fa-upload',
              title: this.actionTitle.import,
              validationKey: 'ImportExcelComponent',
              acceptCallback: items => {
                for(let i = 0; i < items.length; i++) {
                  const item = items[i];
                  var element: Service = new Service();
                  element.name = item.name;
                  element.host = item.host;
                  element.clientCertificate = item.clientCertificate;
                  element.connectTimeout = item.connectTimeout;
                  element.path = item.path;
                  element.port = item.port;
                  element.protocol = item.protocol;
                  element.readTimeout = item.readTimeout;
                  element.retries = item.retries;
                  element.tags = item.tags? item.tags.split(','):[];
                  element.url = item.url;
                  element.writeTimeout = item.writeTimeout;
                  this._serviceManagementService.createService(element)
                  .subscribe(() => {
                    if (i === (items.length - 1))
                    {
                      this.tableTemplate.reload();
                    }
                  })
                }
              }
            }))
          }
        }
      ],
      actions: [
        {
          icon: "fa fa-edit",
          executeAsync: (item) => {
            this._modalService.showTemplateDialog(new TemplateViewModel({
              validationKey: 'ServiceTemplateComponent',
              icon: 'fa fa-edit',
              data: {
                item: this._dataService.cloneItem(item),
                action: 'Edit'
              },
              customSize: 'modal-lg',
              template: ServiceTemplateComponent,
              title: this.actionTitle.editService(item.name),
              btnAcceptTitle: this.actionButton.accept,
              btnCancelTitle: this.actionButton.cancel,
              acceptCallback: (response: any, close, provider: any) => {
                  this._serviceManagementService.updateService(provider.item)
                  .subscribe(() => {
                    this.tableTemplate.reload();
                  }, error => {
                    this.iserror = true;
                    this.error = error.error.message;
                    setTimeout(() => this.iserror = false, 5000);
                  })
              },
              cancelCallback: () => {
                this.tableTemplate.reload();
              }
            }))
          }
        },
        {
          icon: "fa fa-copy",
          executeAsync: (item) => {
            var copyItem = this._dataService.cloneItem(item);
            var check = this.tableTemplate.items.filter(x=>x.name.includes(copyItem.name+'copy'));
            copyItem.name=copyItem.name+'copy'+(check.length+1);
            this._serviceManagementService.copyService(copyItem)
            .subscribe(() => {
              this.tableTemplate.reload();
            });
          }
        },
        {
          icon: "fa fa-remove",
          executeAsync: (item) => {
            this._modalService.showConfirmDialog(new ConfirmViewModel({
              title: this.actionTitle.delete,
              message: this.actionMessage.deleteService(item.name),
              btnAcceptTitle: this.actionButton.accept,
              btnCancelTitle: this.actionButton.cancel,
              acceptCallback: () => {
                this._serviceManagementService.deleteService(item)
                .subscribe(()=>{
                  this.tableTemplate.reload();
                });
              }
            }))
          }
        },
        {
          type: TableConstant.ActionType.Toolbar,
          customClass: 'success',
          icon: "fa fa-copy",
          title: () => this.tableAction.copy,
          executeAsync: (item, e, provider: TableComponent) => {
            var copyItems = this._dataService.cloneItems(provider.selectedItems);
            for(let i = 0; i < copyItems.length; i++) {
              var item = copyItems[i];
              var check = item.name && this.tableTemplate.items.filter(x=>x.name.includes(item.name+'_copy') && x.name.length >= item.name.length + 5 && x.name.length <= item.name.length + 8);
              item.name=item.name+'_copy'+(check.length+1);
              this._serviceManagementService.copyService(item)
              .subscribe(() => {
                if(i === (copyItems.length - 1)) {
                  this.tableTemplate.reload();
                }
              });
            }
          }
        },
        {
          type: TableConstant.ActionType.Toolbar,
          customClass: 'danger',
          icon: "fa fa-trash-o",
          title: () => this.tableAction.delete,
          executeAsync: (item, e, provider: TableComponent) => {
            this._modalService.showConfirmDialog(new ConfirmViewModel({
              title: this.actionTitle.delete,
              message: this.actionMessage.deleteListService,
              btnAcceptTitle: this.actionButton.accept,
              btnCancelTitle: this.actionButton.cancel,
              acceptCallback: () => {
                for(let i=0; i < provider.selectedItems.length; i++){
                  this._serviceManagementService.deleteService(provider.selectedItems[i]).subscribe(() => {
                    if(i === (provider.selectedItems.length - 1)) {
                      this.tableTemplate.reload();
                    }
                  });
                }
              }
            }))
          }
        },
        {
          type: TableConstant.ActionType.Toolbar,
          icon: "fa fa-save",
          title: () => this.tableAction.save,
          customClass: "warning"
        }
      ],
      mainColumns: [
        {
          type: TableColumnType.String,
          title: () => this.tableTitle.name,
          valueRef: () => "name",
          width: 320,
          allowFilter: true,
          validationOption: new ValidationOption({
            rules: [
              new RequiredValidationRule(),
              new CustomValidationRule(value => {
                return this._serviceTemplateService.validateName(value);
              }),
              new CustomValidationRule(value => {
                return this._serviceTemplateService.validateInlineNameService(value, this.tableTemplate.items);
              }),
            ]
          })
        },
        {
          type: TableColumnType.String,
          title: () => this.tableTitle.host,
          valueRef: () => "host",
          width: 320,
          allowFilter: true,
          validationOption: new ValidationOption({
            rules: [
              new RequiredValidationRule(),
              new CustomValidationRule(value => {
                return this._serviceTemplateService.validateHost(value);
              }),
              new CustomValidationRule((value) => {
                return this._serviceTemplateService.validateHostEnd(value);
              })
            ]
          })
        },
        {
          type: TableColumnType.String,
          title: () => this.tableTitle.tag,
          valueRef: () => "tags",
          width: 150,
          allowFilter: true,
          validationOption: new ValidationOption({
            rules: [
              new CustomValidationRule(value => {
                return this._serviceTemplateService.validateName(value);
              })
            ]
          })
        },
        {
          type: TableColumnType.String,
          title: () => this.tableTitle.path,
          valueRef: () => "path",
          width: 150,
          allowFilter: false,
          validationOption: new ValidationOption({
            rules: [
              new CustomValidationRule(value => {
                return this._serviceTemplateService.validatePath(value);
              })
            ]
          })
        },
        {
          type: TableColumnType.Number,
          title: () => this.tableTitle.port,
          valueRef: () => "port",
          width: 70,
          allowFilter: false
        },
        {
          type: TableColumnType.DateTime,
          title: () => this.tableTitle.time_create,
          valueRef: () => "createdAt",
          width: 180,
          allowFilter: false
        },
        {
          type: TableColumnType.DateTime,
          title: () => this.tableTitle.time_update,
          valueRef: () => "updatedAt",
          width: 180,
          allowFilter: false
        }
      ],
      serviceProvider: {
        searchAsync: request => {
          return of(true);
        }
      }
    });
  }
}
