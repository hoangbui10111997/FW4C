import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { IgxExcelExporterService, IgxExcelExporterOptions } from 'igniteui-angular';

@Injectable({
  providedIn: 'root'
})
export class ServiceManagementService {
  public apiUrl = 'http://localhost:8001/services';

  constructor(private http: HttpClient, private excelExportService: IgxExcelExporterService) {}

  public search(size: number = 999): Observable<any[]> {
    return this.http.get(`http://localhost:8001/services?size=${size}`)
    .pipe(map((res: any) => res.data));
  }

  private getListService() {
    return this.http.get(this.apiUrl).pipe(map((res: any) => {
      for(let i=0; i < res.data.length; i++)
      {
        res.data[i].update = res.data[i].updated_at * 1000;
        res.data[i].create = res.data[i].created_at * 1000;
      }
      var response = ({
        status: true,
        totalRecords: res.data.length,
        items: res.data
      });
      return response;
    }));
  }

  public getListServiceLocal() {
    return this.http.get(this.apiUrl).pipe(map((res: any) => {
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
}
