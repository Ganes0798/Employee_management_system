import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';

export const routes: Routes = [

    {path: 'login', component: LoginComponent},
    {path: '', redirectTo: '/login', pathMatch: 'full'},
    {
        path: 'dashboard', 
        loadComponent: () => import('./pages/dashboard/dashboard.component').then(m => {
          return m.DashboardComponent
        })
    },
    {
      path: 'employee',
      loadComponent: () => import('./pages/employee/employee.component').then(m => {
        return m.EmployeeComponent
      })
    },
    {
      path: 'forgot-pwd',
      loadComponent: () => import('./auth/forgot-pwd/forgot-pwd.component').then(m => {
        return m.ForgotPwdComponent
      })
    }

];



@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })
  export class AppRoutingModule { }