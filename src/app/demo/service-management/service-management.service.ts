import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ServiceManagementService {
  public apiUrl = 'http://localhost:8001/services'

  constructor(private http: HttpClient) {}

  public getListService(request) {
    return this.http.get(this.apiUrl).pipe(map((res: any) => {
      for(let i=0; i < res.data.length; i++)
      {
        res.data[i].updated_at = res.data[i].updated_at * 1000;
        res.data[i].created_at = res.data[i].created_at * 1000;
      }
      var response = ({
        status: true,
        totalRecords: res.data.length,
        items: res.data
      });
      return response;
    }));
  }

  public deleteService(item) {
    return this.http.delete(this.apiUrl + '/' + item.name);
  }

  public updateService(item) {
    return this.http.patch(this.apiUrl + '/' + item.id, item);
  }

  public createService(item) {
    return this.http.post(this.apiUrl, item);
  }
}
