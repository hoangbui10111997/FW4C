import { NgModule } from '@angular/core';
import { DashboardDemoComponent } from './dashboard';
import { FormsModule } from '@angular/forms';
import { Framework4CModule } from 'ngx-fw4c';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { ServiceManagementComponent } from './service-management/service-management.component';
import { ServiceTemplateComponent } from './service-management/service-template/service-template.component';
import { ImportExcelComponent } from './service-management/import-excel/import-excel.component';

const declarations = [
  DashboardDemoComponent,
  ServiceManagementComponent,
  ServiceTemplateComponent,
  ImportExcelComponent
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

export class DemoModule { }
