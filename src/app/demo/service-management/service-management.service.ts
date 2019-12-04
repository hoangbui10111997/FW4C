import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { IgxExcelExporterService, IgxExcelExporterOptions } from 'igniteui-angular';
import  * as pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import { ServiceSearchRequest, ServiceSearchResponse, Service, KongService } from './service.model';
import { Observable } from 'rxjs';
pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Injectable({
  providedIn: 'root'
})
export class ServiceManagementService {
  public apiUrl = 'http://localhost:8001/services';

  constructor(private http: HttpClient, private excelExportService: IgxExcelExporterService) {}

  public search(request: ServiceSearchRequest): Observable<ServiceSearchResponse> {
    var items = [];
    return this.http.get<any>(this.apiUrl+'?size=999', { params: request as any }).pipe(map(s => 
      {
        for (let i = 0; i < s.data.length; i++) {
          items.push(this.mapData(s.data[i]));
        }
        var response = {
          status: true,
          totalRecords: s.data.length,
          items: items
        };
        return response;
      }
      ));
  }
  
  public deleteService(item: Service) {
    return this.http.delete(this.apiUrl + '/' + item.id);
  }

  public updateService(item: Service) {
    return this.http.patch(this.apiUrl + '/' + item.id, this.mapData(item, true));
  }

  public createService(item: Service): Observable<any> {
    return this.http.post(this.apiUrl, item);
  }

  public copyService(item: Service) {
    delete item.id;
    return this.http.post(this.apiUrl, this.mapData(item, true));
  }

  public exportExcel(data) {
    for (let index = 0; index < data.length; index++) {
      const element = data[index];
      delete element.create;
      delete element.update;
      element.tags = element.tags? element.tags.toString():null;
    }
    this.excelExportService.exportData(data, new IgxExcelExporterOptions('Service_' + Date.now().toString()));
  }

  public exportTemplate() {
    var data = [];
    data[0] = {
      name: '',
      host: '',
      tags: '',
      url: '',
      port: '',
      path: '',
      protocol: '',
      retries: '',
      connect_timeout: '',
      write_timeout: '',
      read_timeout: '',
      client_certificate: ''
    };
    this.excelExportService.exportData(data, new IgxExcelExporterOptions('Service_Template_' + Date.now().toString()));
  }

  public exportPDF(items) {
    for (let index = 0; index < items.length; index++) {
      const element = items[index];
      delete element.create;
      delete element.update;
      element.tags = element.tags? element.tags.toString():null;
    }
    var data = [];
    var columns = ['host', 'created_at', 'connect_timeout', 'id', 'protocol', 'name', 'read_timeout', 'port', 'path', 'updated_at', 'retries', 'write_timeout', 'tags', 'client_certificate']
    data.push(columns);
    items.forEach((row) => {
      var dataRow = [];
      columns.forEach((column) => {
        dataRow.push(row[column]);
      })
      data.push(dataRow);
    });
    var docDefinition = {
      pageSize: 'A1',
      content: 
      [
        {
          text: 'Services', style: 'header'
        },
        {
          layout: {
            fillColor: function (rowIndex, node, columnIndex) {
              return (rowIndex % 2 === 0 && rowIndex != 0) ? null : (rowIndex === 0) ? '#5D9AD2' : '#DAECF9';
            }
          },
          table: {
            headerRows: 1,
            body: data
          }
        }
      ]
    };
    pdfMake.createPdf(docDefinition).download('Service_Template_' + Date.now().toString());
  }

  private mapData(data?: any, reversed?: boolean) {
    var item: Service = new Service();
    var kongItem: KongService = new KongService();
    if(reversed) {
      kongItem.id = data.id;
      kongItem.name = data.name;
      kongItem.host = data.host;
      kongItem.tags = data.tags;
      kongItem.url = data.url;
      kongItem.port = data.port;
      kongItem.path = data.path;
      kongItem.created_at = data.createdAt / 1000;
      kongItem.updated_at = data.updatedAt / 1000;
      kongItem.protocol = data.protocol;
      kongItem.retries = data.retries;
      kongItem.connect_timeout = data.connectTimeout;
      kongItem.write_timeout = data.writeTimeout;
      kongItem.read_timeout = data.readTimeout;
      kongItem.client_certificate = data.clientCertificate;
      return kongItem;
    } else {
      item.id = data.id;
      item.name = data.name;
      item.host = data.host;
      item.tags = data.tags;
      item.url = data.url;
      item.port = data.port;
      item.path = data.path;
      item.createdAt = data.created_at * 1000;
      item.updatedAt = data.updated_at * 1000;
      item.protocol = data.protocol;
      item.retries = data.retries;
      item.connectTimeout = data.connect_timeout;
      item.writeTimeout = data.write_timeout;
      item.readTimeout = data.read_timeout;
      item.clientCertificate = data.client_certificate;
      return item;
    }
  }
}
