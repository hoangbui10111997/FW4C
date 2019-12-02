import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { IgxExcelExporterService, IgxExcelExporterOptions } from 'igniteui-angular';
import { serviceAPI } from '../common/system/api.model';
import  * as pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Injectable({
  providedIn: 'root'
})
export class ServiceManagementService {
  public serviceAPI = new serviceAPI();
  public apiUrl = this.serviceAPI.serviceAPI;

  constructor(private http: HttpClient, private excelExportService: IgxExcelExporterService) {}

  public getListServiceLocal() {
    return this.http.get(this.apiUrl+'?size=999').pipe(map((res: any) => {
      for(let i=0; i < res.data.length; i++)
      {
        res.data[i].update = res.data[i].updated_at * 1000;
        res.data[i].create = res.data[i].created_at * 1000;
      }
      return res.data;
    }));
  }

  public deleteService(item) {
    return this.http.delete(this.apiUrl + '/' + item.id);
  }

  public updateService(item) {
    delete item.create;
    delete item.update;
    return this.http.patch(this.apiUrl + '/' + item.id, item);
  }

  public createService(item) {
    return this.http.post(this.apiUrl, item);
  }

  public copyService(item) {
    delete item.create;
    delete item.update;
    delete item.id;
    return this.http.post(this.apiUrl, item);
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

}
