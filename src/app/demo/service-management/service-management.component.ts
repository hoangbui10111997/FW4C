import { Component, ViewChild, ElementRef, OnInit, Input } from "@angular/core";
import { TableOption, ModalService, TemplateViewModel, TableComponent, ConfirmViewModel, TableMode, TableColumnType, TableAction, TableConstant, DataService, ValidationRule, ValidationOption, CustomValidationRule, ValidationService, RequiredValidationRule, AggregatorService, KeyConst } from "ngx-fw4c";
import { ServiceManagementService } from './service-management.service';
import { ServiceTemplateComponent } from './service-template/service-template.component'
import { Service, ServiceRequest, ServiceDeleteRequest, ServiceUpdateRequest, ServiceCreateRequest, ServiceSearchRequest } from './service.model';
import { tableTitleService, tableAction, actionButton, actionTitle, actionMessageService } from './common/language/serviceLanguageEN.model';
import { of } from 'rxjs';
import { ServiceTemplateService } from '../service-management/service-template/service-template.service'
import { ImportExcelComponent } from './import-excel/import-excel.component';
import { ExportDataComponent } from './export-data/export-data.component';
import { map } from 'rxjs/operators';
import { Router, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-service-management',
  templateUrl: './service-management.component.html'
})
export class ServiceManagementComponent implements OnInit {
  @ViewChild("formRef", { static: true }) public formRef: ElementRef;
  @ViewChild("tableTemplate", { static: true }) public tableTemplate: TableComponent;

  @Input() public view;

  public option: TableOption;
  public tableTitle: tableTitleService = new tableTitleService();
  public tableAction: tableAction = new tableAction();
  public actionButton: actionButton = new actionButton();
  public actionTitle: actionTitle = new actionTitle();
  public actionMessage: actionMessageService = new actionMessageService();
  public iserror = false;
  public error: string;
  public data;

  constructor(
    private _modalService: ModalService,
    private _serviceManagementService: ServiceManagementService,
    private _dataService: DataService,
    private _serviceTemplateService: ServiceTemplateService,
    private _agregatorService: AggregatorService,
    private _router: Router,
    private _route: ActivatedRoute) { }

  ngOnInit() {
    this.initTable();
    this.registerEvents();
    this._serviceManagementService.search(new ServiceRequest())
    .subscribe(res => {
      this.data = res.items;
    })
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
            console.log(this.view);
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
                this._serviceManagementService.createService(provider.item, new ServiceCreateRequest())
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
            if (this.tableTemplate.changedRows.length === 0) {
              return true;
            } else {
              return false;
            }
          },
          title: () => this.tableAction.save,
          executeAsync: () => {
            for (let i = 0; i < this.tableTemplate.changedRows.length; i++) {
              this._serviceManagementService.updateService(this.tableTemplate.changedRows[i].currentItem, new ServiceUpdateRequest({}))
                .subscribe(() => {
                  if (i === (this.tableTemplate.changedRows.length - 1)) {
                    this.tableTemplate.changedRows = [];
                    this.tableTemplate.reload();
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
                  this._serviceManagementService.exportExcel(data)
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
                for (let i = 0; i < items.length; i++) {
                  this._serviceManagementService.createService(items[i], new ServiceCreateRequest())
                    .subscribe(() => {
                      if (i === (items.length - 1)) {
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
          icon: "fa fa-wrench",
          customClass: "basic",
          executeAsync: (item) => {
            this._router.navigate([item.id], {relativeTo: this._route})
          }
        },
        {
          icon: "fa fa-edit",
          customClass: "default",
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
                this._serviceManagementService.updateService(provider.item, new ServiceUpdateRequest({}))
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
          customClass: "success",
          executeAsync: (item) => {
            var copyItem = this._dataService.cloneItem(item);
            var check = this.data.filter(x => x.name.includes(copyItem.name + '_copy'));
            copyItem.name = copyItem.name + '_copy' + (check.length + 1);
            this._serviceManagementService.copyService(copyItem)
              .subscribe(() => {
                this.data.push(copyItem);
                this.tableTemplate.reload();
              });
          }
        },
        {
          icon: "fa fa-trash-o",
          customClass: "danger",
          executeAsync: (item) => {
            this._modalService.showConfirmDialog(new ConfirmViewModel({
              title: this.actionTitle.delete,
              message: this.actionMessage.deleteService(item.name),
              btnAcceptTitle: this.actionButton.accept,
              btnCancelTitle: this.actionButton.cancel,
              acceptCallback: () => {
                this._serviceManagementService.deleteService(item, new ServiceDeleteRequest())
                  .subscribe(() => {
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
            console.log(this.data);
            var copyItems = this._dataService.cloneItems(provider.selectedItems);
            for (let i = 0; i < copyItems.length; i++) {
              var item = copyItems[i];
              var check = this.data.filter(x => x.name && x.name.includes(item.name + '_copy') && x.name.length >= item.name.length + 5 && x.name.length <= item.name.length + 8);
              item.name = item.name + '_copy' + (check.length + 1);
              this.data.push(this._serviceManagementService.mapData(item));
              this._serviceManagementService.copyService(item)
                .subscribe(() => {
                  if (i === (copyItems.length - 1)) {
                    this.tableTemplate.reload();
                  }
                }, error => {
                  this.tableTemplate.reload();
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
                for (let i = 0; i < provider.selectedItems.length; i++) {
                  this._serviceManagementService.deleteService(provider.selectedItems[i], new ServiceDeleteRequest())
                    .subscribe(() => {
                      if (i === (provider.selectedItems.length - 1)) {
                        this.tableTemplate.reload();
                      }
                    }, error => {
                      this.tableTemplate.reload();
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
          customClass: "warning",
          executeAsync: () => {
            for (let i = 0; i < this.tableTemplate.selectedItems.length; i++) {
              var search = this.tableTemplate.changedRows.find(x => x.currentItem.id === this.tableTemplate.selectedItems[i].id);
              if (search) {
                this._serviceManagementService.updateService(this.tableTemplate.selectedItems[i], new ServiceUpdateRequest({}))
                  .subscribe(() => {
                    this.tableTemplate.changedRows.splice(this.tableTemplate.changedRows.indexOf(search), 1);
                  });
              }
            }
          }
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
          title: () => this.tableTitle.timeCreate,
          valueRef: () => "createdAt",
          width: 180,
          allowFilter: false
        },
        {
          type: TableColumnType.DateTime,
          title: () => this.tableTitle.timeUpdate,
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

  private registerEvents(): void {
    this._agregatorService.subscribe(KeyConst.Search, (response: any) => {
      if(!response.all) {
        var filter = response.keyword;
        this.tableTemplate.setFilter('searchText', filter);
        this.tableTemplate.reload(true).subscribe();
      }
    });
  }
}
