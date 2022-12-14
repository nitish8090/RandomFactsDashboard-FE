import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminPanelComponent } from './admin-panel/admin-panel.component';
import { AdminGuard } from './admin.guard';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ForgotPasswordComponent } from './login-page/forgot-password/forgot-password.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { LoginComponent } from './login-page/login/login.component';
import { RegisterComponent } from './login-page/register/register.component';
import { ResetPasswordComponent } from './login-page/reset-password/reset-password.component';
import { UserProfileComponent } from './user-profile/user-profile.component';

const routes: Routes = [
  { path: '', children: [
    {path: '', component: LoginComponent},
    {path: 'register', component: RegisterComponent},
    {path: 'forgot-password', component: ForgotPasswordComponent},
    {path: 'reset-password', component: ResetPasswordComponent}
  ], component: LoginPageComponent },
  { 
    path: 'dashboard', 
    children:[
      {path: '', component: DashboardComponent},
      {path: 'profile', component: UserProfileComponent},
    ],
    canActivate: [AdminGuard]
   },
   {path: 'admin-panel', children:[
    {path: '', component: AdminPanelComponent},
    {path: 'profile', component: UserProfileComponent},
    {path: 'create', component: UserProfileComponent},
   ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
