import {Component, ViewChild, ElementRef, OnInit} from "@angular/core";
import {TableOption, ModalService, TemplateViewModel, TableComponent, ConfirmViewModel, TableMode, TableColumnType} from "ngx-fw4c";
import { ServiceManagementService } from './service-management.service';
import { ServiceTemplateComponent } from './service-template/service-template.component'
import { Service } from './service.model';

@Component({
  selector: 'app-service-management',
  templateUrl: './service-management.component.html'
})
export class ServiceManagementComponent implements OnInit {
  @ViewChild("formRef", { static: true }) public formRef: ElementRef;
  @ViewChild("tableTemplate", { static: true }) public tableTemplate: TableComponent;
  
  public option: TableOption;

  constructor(private _modalService: ModalService, private _serviceManagementService: ServiceManagementService) {}

  ngOnInit() {
    this.initTable();
  }

  private initTable() {
    this.option = new TableOption({
      inlineEdit: false,
      mode: TableMode.full,
      searchFields: ["name"],
      topButtons: [
        {
          icon: "fa fa-plus",
          customClass: "primary",
          title: () => "New",
          executeAsync: (item: Service) => {
            this._modalService.showTemplateDialog(new TemplateViewModel({
              customSize: 'modal-lg',
              title: 'Add New Service',
              data: {
                item: item,
                action: 'New'
              },
              template: ServiceTemplateComponent,
              btnAcceptTitle: 'Add',
              acceptCallback: (response: any, provider: any) => {
                this._serviceManagementService.createService(provider.item)
                .subscribe(() => {
                  this.tableTemplate.reload();
                });
              }
            }));
          }
        },
        {
          icon: "fa fa-refresh",
          title: () => "Reload",
          executeAsync: item => {
            this.tableTemplate.reload();
          }
        }
      ],
      actions: [
        {
          icon: "fa fa-edit",
          executeAsync: (item) => {
            this._modalService.showTemplateDialog(new TemplateViewModel({
              icon: 'fa fa-edit',
              data: {
                item: item,
                action: 'Edit'
              },
              customSize: 'modal-lg',
              template: ServiceTemplateComponent,
              title: 'Edit Service',
              btnAcceptTitle: 'Edit',
              acceptCallback: (response: any, provider: any) => {
                  this._serviceManagementService.updateService(provider.item)
                  .subscribe(() => {
                    this.tableTemplate.reload();
                  })
              },
              cancelCallback: () => {
                this.tableTemplate.reload();
              }
            }))
          }
        },
        {
          icon: "fa fa-remove",
          executeAsync: (item) => {
            this._modalService.showConfirmDialog(new ConfirmViewModel({
              title: 'Delete',
              message: 'Delete '+item.name+' service?',
              btnAcceptTitle: 'Yes',
              btnCancelTitle: 'No',
              acceptCallback: () => {
                this._serviceManagementService.deleteService(item)
                .subscribe(()=>{
                  this.tableTemplate.reload();
                });
              }
            }))
          }
        }
      ],
      mainColumns: [
        {
          type: TableColumnType.String,
          title: () => "Name",
          valueRef: () => "name",
          width: 320,
          allowFilter: false
        },
        {
          type: TableColumnType.String,
          title: () => "Host",
          valueRef: () => "host",
          width: 320,
          allowFilter: false
        },
        {
          type: TableColumnType.String,
          title: () => "ID",
          valueRef: () => "id",
          width: 300,
          allowFilter: false
        },
        {
          type: TableColumnType.Number,
          title: () => "Port",
          valueRef: () => "port",
          width: 70,
          allowFilter: false
        },
        {
          type: TableColumnType.DateTime,
          title: () => "Time Created",
          valueRef: () => "created_at",
          width: 180,
          allowFilter: false
        },
        {
          type: TableColumnType.DateTime,
          title: () => "Recent Updated",
          valueRef: () => "updated_at",
          width: 180,
          allowFilter: false
        }
      ],
      serviceProvider: {
        searchAsync: request => {
          return this._serviceManagementService.getListService(request);
        }
      }
    });
  }
}
