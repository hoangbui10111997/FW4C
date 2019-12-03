import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Framework4CModule } from 'ngx-fw4c';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { ServiceManagementComponent } from './service-management.component';
import { ServiceTemplateComponent } from './service-template/service-template.component';
import { ImportExcelComponent } from './import-excel/import-excel.component';
import { ExportDataComponent } from './export-data/export-data.component';
import { DashboardDemoComponent } from '../dashboard';

const declarations = [
  ServiceManagementComponent,
  ServiceTemplateComponent,
  ImportExcelComponent,
  ExportDataComponent,
  DashboardDemoComponent
];

@NgModule({
  declarations: declarations,
  exports: declarations,
  entryComponents: declarations,
  imports: [
    FormsModule,
    HttpClientModule,
    Framework4CModule.forRoot(),
    BrowserModule
  ]
})

export class ServiceModule { }
