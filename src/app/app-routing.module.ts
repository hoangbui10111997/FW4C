import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MenuTab, AdminLayoutComponent, AuthComponent } from 'ngx-fw4c';
import { DashboardDemoComponent } from './demo/dashboard';
import { ServiceManagementComponent } from './demo/service-management/service-management.component';

const menuTabs: MenuTab[] = [
  {
    role: 'SA',
    items: [
      {
        label: 'Dashboard',
        icon: 'fa fa-pie-chart ',
        children: [
          { state: 'dashboard', name: 'Dashboard', type: 'link', icon: 'fa fa-pie-chart' }
        ]
      },
      {
        label: 'Service Management',
        icon: 'fa fa-cloud',
        children: [
          { state: 'services', name: 'Service Management', type: 'link', icon: 'fa fa-cloud' }
        ]
      } 
    ]
  }
];

const routes: Routes = [
  {
    path: '', component: AdminLayoutComponent,
    data: {
      breadcrumb: {
        label: 'CMC Global',
        url: '/dashboard'
      },
      menuTabs: menuTabs,
      menuType: 'TOP',
      recommendation: {
        template: ServiceManagementComponent,
      }
    },
    children: [
      {
        path: 'dashboard',
        component: DashboardDemoComponent
      },
      {
        path: 'services',
        component: ServiceManagementComponent,
      },
      {
        path: 'auth',
        component: AuthComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
