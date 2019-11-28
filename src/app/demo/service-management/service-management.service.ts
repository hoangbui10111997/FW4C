import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import * as FileSaver from 'file-saver';  
import * as XLSX from 'xlsx'; 
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServiceManagementService {
  public apiUrl = 'http://localhost:8001/services';

  constructor(private http: HttpClient) {}

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

  private saveAsExcel(buffer: any, fileName: string) {
    const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';  
    const EXCEL_EXTENSION = '.xlsx'; 
    const dataService = new Blob([buffer], {type: EXCEL_TYPE});
    FileSaver.saveAs(dataService, fileName+EXCEL_EXTENSION);
  }

  public exportExcel(datas: any[]) {
    var exelData = [];
    let fileName = 'Service_'+Date.now().toString();
    for(let i = 0; i < datas.length; i++) {
      const data = datas[i];
      delete data.create;
      delete data.update;
      data.tags = data.tags? data.tags.toString():null;
      exelData.push(data);
    }
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(datas);
    const workbook: XLSX.WorkBook = {Sheets:{'data': worksheet}, SheetNames: ['data']};
    const excelBuffer: any = XLSX.write(workbook, {bookType: 'xlsx', type: 'array'});
    this.saveAsExcel(excelBuffer, fileName);
  }

  public exportTemplate() {
    let fileName = 'Template_Service_'+Date.now().toString();
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
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(data);
    const workbook: XLSX.WorkBook = {Sheets:{'data': worksheet}, SheetNames: ['data']};
    const excelBuffer: any = XLSX.write(workbook, {bookType: 'xlsx', type: 'array'});
    this.saveAsExcel(excelBuffer, fileName);
  }
}
