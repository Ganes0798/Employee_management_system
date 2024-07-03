import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { AuthGuard } from './auth/login/auth.guard';

export const routes: Routes = [

    {path: 'login', component: LoginComponent},
    {path: '', redirectTo: '/login', pathMatch: 'full'},
    {
        path: 'dashboard', 
        loadComponent: () => import('./pages/dashboard/dashboard.component').then(m => {
          return m.DashboardComponent
        }),
        canActivate: [AuthGuard]
    },
    {
      path: 'employee',
      loadComponent: () => import('./pages/employee/employee.component').then(m => {
        return m.EmployeeComponent
      }),
      canActivate: [AuthGuard]
    },
    {
      path: 'forgot-pwd',
      loadComponent: () => import('./auth/forgot-pwd/forgot-pwd.component').then(m => {
        return m.ForgotPwdComponent
      }),
      canActivate: [AuthGuard]
    },
    {
      path: 'emp-role',
      loadComponent: () => import('./pages/employee-role/employee-role.component').then(m => {
        return m.EmployeeRoleComponent
      }),
      canActivate: [AuthGuard]
    }

];



@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })
  export class AppRoutingModule { }