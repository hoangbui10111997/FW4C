import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DemoModule } from './demo';
import { HttpClientModule } from '@angular/common/http';
import { IgxExcelExporterService } from 'igniteui-angular'

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    DemoModule,
    HttpClientModule
  ],
  exports: [
    DemoModule
  ],
  providers: [IgxExcelExporterService],
  bootstrap: [AppComponent]
})

export class AppModule { }
