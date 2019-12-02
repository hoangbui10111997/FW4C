import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ValidationService, ClientValidator } from 'ngx-fw4c';

@Component({
  selector: 'app-export-data',
  templateUrl: './export-data.component.html',
  styleUrls: ['./export-data.component.scss']
})
export class ExportDataComponent implements OnInit {
  private data: string;

  constructor(private _validationService: ValidationService) { }

  ngOnInit() {
    this.data = 'Excel';
  }

  public getSelection(input: any): void {
    this.data = input.target.value;
  }

  public isValid(): boolean {
		return this._validationService.isValid(true, true);
  }

  public getValidator(): ValidationService {
		return this._validationService;
  }
  
  callback(): Observable<any> {
    return of(this.data);
  }
}
